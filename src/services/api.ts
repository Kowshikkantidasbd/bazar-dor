/* 
import { Category, Product } from "@/services/api";

const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(
  endpoint: string,
  fallbackData: T
): Promise<T> {
  


try {
  const res = await fetch(`${BASE_URL_1}${endpoint}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });
  
  if (res.ok) {
    const data = await res.json();
    
    if (data && !data.error) {
      return data as T;
    }
  }
} catch (err) {
  console.warn(
    `Primary API failed for ${endpoint}, trying backup:`,
    err
  );
}

// Backup API
try {
  const res = await fetch(`${BASE_URL_2}${endpoint}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    
    if (data && !data.error) {
      return data as T;
    }
  }
} catch (err) {
  console.warn(
    `Backup API failed for ${endpoint}:`,
    err
  );
}

return fallbackData;
}



export async function fetchAllProducts(): Promise<Product[]> {
  const data = await fetchWithFallback<Product[]>(
    "/products",
    []
  );
  
  return Array.isArray(data) ? data : [];
}




export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchWithFallback<Category[]>(
    "/categories",
    []
  );
  
  return Array.isArray(data) ? data : [];
}



export async function fetchProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  try {
    const all = await fetchAllProducts();
    
    const filtered = all.filter(
      (product) =>
      product.category === categorySlug ||
      product.slug === categorySlug
    );

    if (filtered.length > 0) {
      return filtered;
    }
    
    const res = await fetchWithFallback<Product[]>(
      `/products?category=${encodeURIComponent(categorySlug)}`,
      []
    );
    
    if (Array.isArray(res) && res.length > 0) {
      return res;
    }
    
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
  
  const searchValue = idOrSlug.toString().toLowerCase();
  
  const match = all.find(
    (product) =>
    product.id.toString() === searchValue ||
    product.slug.toLowerCase() === searchValue
  );
  
  if (match) {
    return match;
  }
  
  try {
    const data = await fetchWithFallback<Product | null>(
      `/products/${encodeURIComponent(idOrSlug.toString())}`,
      null
    );
    
    if (data && data.nameBn) {
      return data;
    }
  } catch (err) {
    console.warn("Failed to fetch product:", err);
  }
  
  return null;
}


export async function fetchCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const categories = await fetchCategories();
  
  const found = categories.find(
    (category) =>
    category.slug === slug ||
    category.id === slug
  );
  
  if (found) {
    return found;
  }
  
  try {
    const category = await fetchWithFallback<Category | null>(
      `/categories/${encodeURIComponent(slug)}`,
      null
    );
    
    if (category && category.nameBn) {
      return category;
    }
  } catch (err) {
    console.warn("Failed to fetch category:", err);
  }
  
  return null;
}
*/