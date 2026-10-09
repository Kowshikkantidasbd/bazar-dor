'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowLeft, AlertCircle } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ProductSkeleton';
import { useRouter } from '@/context/RouterContext';
import { fetchCategoryBySlug, fetchProductsByCategory } from '../../../services/api';
import { Category, Product, SortOption } from '../../../types';
import { toBnNum } from '@/utils/bengali';

interface CategoryPageProps {
  params?: { slug: string };
  slug?: string;
}

export default function CategoryPage({ params, slug: propSlug }: CategoryPageProps) {
  const { navigate } = useRouter();
  const slug = propSlug || params?.slug || '';
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>('default');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([fetchCategoryBySlug(slug), fetchProductsByCategory(slug)])
      .then(([catData, prodsData]) => {
        setCategory(catData);
        setProducts(prodsData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.today - b.today;
    }
    if (sortOption === 'price-desc') {
      return b.today - a.today;
    }
    return 0; 
  });

  if (!loading && (!category && products.length === 0)) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          ক্যাটাগরি পাওয়া যায়নি
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন তা খুঁজে পাওয়া যায়নি অথবা বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a7c42] hover:bg-[#086335] text-white text-sm font-medium rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm flex items-center gap-4 sm:gap-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
          <span>{category?.icon || '📦'}</span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {category?.nameBn || slug}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            প্রতি পণ্যের আজকের দর ও পরিবর্তন
          </p>
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          মোট {toBnNum(products.length)}টি পণ্য পাওয়া গেছে
        </p>

        
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <span className="text-xs sm:text-sm font-medium text-slate-600">
            সাজান:
          </span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium rounded-xl py-2 pl-3 pr-8 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-[#0a7c42]/20 transition-all cursor-pointer shadow-xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      
      {loading ? (
        <ProductGridSkeleton count={6} />
      ) : products.length === 0 ? (
        <div className="py-12 text-center bg-white rounded-2xl border border-slate-100 p-8">
          <p className="text-slate-500 text-sm">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
