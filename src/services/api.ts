import { Category, Product } from "@/types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

type Rec = Record<string, unknown>;

// { data: [...] } / { products: [...] } ধরনের র‍্যাপার খুলে আসল ডেটা বের করে
function unwrap<T>(json: unknown): T {
  if (json && typeof json === "object" && !Array.isArray(json)) {
    const obj = json as Rec;
    for (const key of ["data", "products", "categories", "items", "result"]) {
      if (key in obj) return obj[key] as T;
    }
  }
  return json as T;
}

const safeDecode = (v: string): string => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

const norm = (v: unknown): string =>
  safeDecode(String(v ?? "")).trim().toLowerCase();

async function fetchWithFallback<T>(
  endpoint: string,
  fallbackData: T
): Promise<T> {
  for (const base of BASE_URLS) {
    const url = `${base}${endpoint}`;
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        console.warn(`[API] ${url} -> HTTP ${res.status}`);
        continue;
      }

      const json = await res.json();

      if (json && typeof json === "object" && (json as Rec).error) {
        console.warn(`[API] ${url} -> error:`, (json as Rec).error);
        continue;
      }

      return unwrap<T>(json);
    } catch (err) {
      console.warn(`[API] ${url} failed:`, err);
    }
  }

  console.error(`[API] সব সার্ভার ফেইল করেছে: ${endpoint}`);
  return fallbackData;
}

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await fetchWithFallback<Product[]>("/products", []);
  if (!Array.isArray(data)) {
    console.warn("[API] /products থেকে অ্যারে আসেনি:", data);
    return [];
  }
  return data;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchWithFallback<Category[]>("/categories", []);
  if (!Array.isArray(data)) {
    console.warn("[API] /categories থেকে অ্যারে আসেনি:", data);
    return [];
  }
  return data;
}

export async function fetchCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const target = norm(slug);
  const categories = await fetchCategories();

  const found = categories.find((c) => {
    const r = c as unknown as Rec;
    return [r.slug, r.id, r.nameBn, r.name].some(
      (v) => v != null && norm(v) === target
    );
  });

  if (found) return found;

  const category = await fetchWithFallback<Category | null>(
    `/categories/${encodeURIComponent(safeDecode(slug))}`,
    null
  );

  if (category && (category as unknown as Rec).nameBn) {
    return category;
  }

  console.warn("[API] ক্যাটাগরি পাওয়া যায়নি:", slug, "| ক্যাটাগরি সংখ্যা:", categories.length);
  return null;
}

export async function fetchProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  try {
    const [all, cat] = await Promise.all([
      fetchAllProducts(),
      fetchCategoryBySlug(categorySlug),
    ]);

    
    const keys = new Set<string>([norm(categorySlug)]);
    if (cat) {
      const r = cat as unknown as Rec;
      [r.slug, r.id, r.nameBn, r.name].forEach((v) => {
        if (v != null) keys.add(norm(v));
      });
    }

    const filtered = all.filter((p) => {
      const r = p as unknown as Rec;
      return [r.category, r.categorySlug, r.categoryId, r.categoryNameBn].some(
        (v) => v != null && keys.has(norm(v))
      );
    });

    if (filtered.length > 0) return filtered;

    const res = await fetchWithFallback<Product[]>(
      `/products?category=${encodeURIComponent(safeDecode(categorySlug))}`,
      []
    );

    if (Array.isArray(res) && res.length > 0) return res;

    console.warn(
      "[API] কোনো পণ্য মেলেনি। slug:", categorySlug,
      "| মোট পণ্য:", all.length,
      "| নমুনা category মান:", all.slice(0, 3).map((p) => (p as unknown as Rec).category)
    );
    return [];
  } catch (err) {
    console.warn("Failed to fetch products by category:", err);
    return [];
  }
}

export async function fetchProductByIdOrSlug(
  idOrSlug: string | number
): Promise<Product | null> {
  const all = await fetchAllProducts();
  const searchValue = norm(idOrSlug);

  const match = all.find((p) => {
    const r = p as unknown as Rec;
    return norm(r.id) === searchValue || norm(r.slug) === searchValue;
  });

  if (match) return match;

  const data = await fetchWithFallback<Product | null>(
    `/products/${encodeURIComponent(safeDecode(idOrSlug.toString()))}`,
    null
  );

  if (data && (data as unknown as Rec).nameBn) return data;

  return null;
}