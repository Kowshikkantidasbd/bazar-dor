'use client';

import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductSkeleton';
import { fetchAllProducts } from '../services/api';
import { Product } from '../types';
import { toBnNum } from '../utils/bengali';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  
  const risers = [...products]
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  
  const fallers = [...products]
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-12 sm:space-y-16">
      
      <Hero />

      
      <section>
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="text-rose-600 font-black text-lg">▲</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

     
      <section>
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="text-emerald-600 font-black text-lg">▼</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            আজ দাম কমেছে
          </h2>
        </div>

        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

   
      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            মোট {toBnNum(products.length)}টি পণ্য পাওয়া গেছে
          </p>
        </div>

        {loading ? (
          <ProductGridSkeleton count={12} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
