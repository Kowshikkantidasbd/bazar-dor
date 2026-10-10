'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ChevronRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/context/RouterContext';
import { fetchProductByIdOrSlug } from '../../../services/api';
import { Product } from '../../../types';
import { toBnNum, formatBnUnit } from '@/utils/bengali';

interface ProductDetailPageProps {
  params?: { slug: string };
  slug?: string;
}

export default function ProductDetailPage({ params, slug: propSlug }: ProductDetailPageProps) {
  
  const { user, isLoading: authLoading } = useAuth();
  
  const { navigate } = useRouter();
  
  const slug = propSlug || params?.slug || '';
  
  const [product, setProduct] = useState<Product | null>(null);
  
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
  
    if (!authLoading && !user) {
  
      toast.error('বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন।');
  
      navigate(`/signin?redirect=/product/${slug}`, true);
    }
  }, [user, authLoading, slug, navigate]);

  useEffect(() => {
    if (!slug) return;
  
    setLoading(true);
    fetchProductByIdOrSlug(slug)
  
    .then((data) => {
        setProduct(data);
      })
      .finally(() => {
  
        setLoading(false);
      });
  }, [slug]);

  if (authLoading || !user) {
  
    return (
  
  <div className="py-20 flex justify-center items-center">
  
        <div className="w-10 h-10 border-4 border-[#0a7c42] border-t-transparent rounded-full animate-spin" />
  
      </div>
    );
  }

  if (!loading && !product) {
  
    return (
      <div className="py-16 text-center max-w-md mx-auto">
  
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
          <AlertCircle className="w-8 h-8" />
  
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          দুঃখিত, আপনি যে পণ্যের বিবরণ খুঁজছেন তা ডাটাবেজে উপস্থিত নেই।
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

  if (loading || !product) {
  
    return (
      <div className="space-y-6 animate-pulse">
  
        <div className="h-4 bg-slate-200 rounded w-48 mb-4" />
  
        <div className="h-48 bg-white rounded-3xl p-8 border border-slate-100" />
  
        <div className="h-32 bg-white rounded-3xl p-8 border border-slate-100" />
  
        <div className="h-64 bg-white rounded-3xl p-8 border border-slate-100" />
      </div>
    );
  }

  
  const markets = product.markets || [];
  
  let minPrice = product.today;
  
  let maxPrice = product.today;
  
  let lowestMarketName = 'সাধারণ বাজার';
  
  let highestMarketName = 'আড়ৎ বাজার';

  if (markets.length > 0) {
  
    minPrice = Math.min(...markets.map((m) => m.min));
    maxPrice = Math.max(...markets.map((m) => m.max));
    const lowestMarket = markets.find((m) => m.min === minPrice);
  
    const highestMarket = markets.find((m) => m.max === maxPrice);
    if (lowestMarket) lowestMarketName = lowestMarket.market;
  
    if (highestMarket) highestMarketName = highestMarket.market;
  }

  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  
  const priceDiff = (product.today || 0) - (product.yesterday || 0);
  
  const diffText =
    priceDiff > 0
      ? `গতকালকের তুলনায় আজ দাম বেড়েছে ${toBnNum(Math.abs(priceDiff))} টাকা`
      : priceDiff < 0
      ? `গতকালকের তুলনায় আজ দাম কমেছে ${toBnNum(Math.abs(priceDiff))} টাকা`
      : 'গতকালকের তুলনায় আজ দাম অপরিবর্তিত';

  const isUp = product.change?.dir === 'up';
  
  const isDown = product.change?.dir === 'down';

  return (
    <div className="space-y-6">
      
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
  
        <button
          onClick={() => navigate('/')}
          className="hover:text-slate-900 transition-colors"
        >
          হোম
        </button>
  
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => navigate(`/category/${product.category}`)}
          className="hover:text-slate-900 transition-colors"
        >
          {product.categoryNameBn || product.category}
        </button>
  
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
  
        <span className="text-slate-800 font-medium truncate max-w-xs">
          {product.nameBn}
        </span>
      </nav>

      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
  
        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl shrink-0">
  
            <span>{product.image || product.categoryIcon || '🍚'}</span>
          </div>

          <div>
  
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {formatBnUnit(product.unit)} • {product.categoryNameBn || product.category}
            </p>
  
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              {diffText}
            </p>
          </div>
  
        </div>

   
        <div className="w-full md:w-auto bg-slate-50/80 border border-slate-100 rounded-2xl p-4 sm:p-5 text-left md:text-right shrink-0">
  
          <span className="block text-xs text-slate-500 font-medium mb-1">
            আজকের গড় দাম
          </span>
  
          <div className="flex items-baseline md:justify-end gap-1.5">
  
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {toBnNum(product.today)}
            </span>
  
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              টাকা / {product.unit === 'kg' ? 'কেজি' : product.unit === 'liter' ? 'লিটার' : product.unit}
            </span>
          </div>
  
          <div
            className={`text-xs font-semibold flex items-center md:justify-end gap-1 mt-1 ${
              isUp ? 'text-rose-600' : isDown ? 'text-emerald-600' : 'text-slate-500'
            }`}
          >
            <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
            <span>{toBnNum(product.change?.pct)}%</span>
  
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
  
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 tracking-tight">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="bg-[#f7faf8] border border-emerald-100/70 rounded-2xl p-5">
  
            <span className="block text-xs font-medium text-slate-500 mb-1">
              সর্বনিম্ন দাম
            </span>
  
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0a7c42] tracking-tight">
              {toBnNum(minPrice)} টাকা
            </div>
  
            <p className="text-xs text-slate-400 mt-2 truncate">
              {lowestMarketName}
            </p>
          </div>

          
          <div className="bg-rose-50/40 border border-rose-100/70 rounded-2xl p-5">
  
            <span className="block text-xs font-medium text-slate-500 mb-1">
              সর্বাধিক দাম
            </span>
  
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight">
              {toBnNum(maxPrice)} টাকা
            </div>
  
            <p className="text-xs text-slate-400 mt-2 truncate">
              {highestMarketName}
            </p>
          </div>

        
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
  
            <span className="block text-xs font-medium text-slate-500 mb-1">
              গড় দাম
            </span>
  
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              {toBnNum(avgPrice)} টাকা
            </div>
  
            <p className="text-xs text-slate-400 mt-2 truncate">
              {formatBnUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
  
        </div>
      </div>

      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
  
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 tracking-tight">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length === 0 ? (
         
         <p className="text-xs sm:text-sm text-slate-500 py-4">
            বর্তমানে কোনো নির্দিষ্ট বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
         
            <table className="w-full min-w-[500px] text-left text-xs sm:text-sm">
              <thead>
         
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
  
                  <th className="py-3 px-4">বাজার</th>
         
                  <th className="py-3 px-4">বিভাগ</th>
         
                  <th className="py-3 px-4">সর্বনিম্ন</th>
         
                  <th className="py-3 px-4">সর্বাধিক</th>
         
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
         
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {markets.map((m, idx) => {
         
         const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {m.market}
                      </td>
         
                      <td className="py-3 px-4 text-slate-600">
                        {m.division}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
         
                        {toBnNum(m.min)} টাকা
                      </td>
         
                      <td className="py-3 px-4 text-slate-700">
                        {toBnNum(m.max)} টাকা
                      </td>
         
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {toBnNum(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
         
            </table>
         
          </div>
        )}
      
      </div>
    </div>
  );
}
