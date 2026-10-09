'use client';

import React from 'react';
import { ArrowLeft, SearchX } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function NotFound() {
  const { navigate } = useRouter();

  return (
    <div className="py-20 text-center max-w-md mx-auto px-4">
      <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-[#0a7c42] flex items-center justify-center mx-auto mb-6 border border-emerald-100/60 shadow-xs">
        <SearchX className="w-10 h-10" />
      </div>

      <span className="inline-block text-xs font-bold tracking-widest text-[#0a7c42] uppercase mb-2">
        ৪০৪ ত্রুটি (Error 404)
      </span>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
        দুঃখিত, আপনি যে লিংক বা ঠিকানায় প্রবেশ করেছেন তা বিদ্যমান নেই অথবা সরানো হয়েছে।
      </p>

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a7c42] hover:bg-[#086335] text-white text-sm sm:text-base font-medium rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </button>
    </div>
  );
}
