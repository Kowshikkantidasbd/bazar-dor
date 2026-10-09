'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { Button, Card } from '@heroui/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/context/RouterContext';

export default function SignUpPage() {
  const { signup, socialLogin } = useAuth();
  const { navigate, queryParams } = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectUrl = queryParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('সকল প্রয়োজনীয় তথ্য পূরণ করুন।');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }
    if (password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }

    setLoading(true);
    const ok = await signup(name, email, password);
    setLoading(false);
    if (ok) {
      navigate(redirectUrl);
    }
  };

  const handleSocial = async (provider: 'google' | 'github') => {
    
    await socialLogin(provider, redirectUrl);
  };

  return (
    <div className="py-8 sm:py-12 flex justify-center items-center">
      <Card className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm text-center">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="মোঃ রহিম উদ্দিন"
              required
              className="w-full bg-slate-50/70 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a7c42]/20 focus:border-[#0a7c42] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-slate-50/70 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a7c42]/20 focus:border-[#0a7c42] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="w-full bg-slate-50/70 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a7c42]/20 focus:border-[#0a7c42] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              required
              className="w-full bg-slate-50/70 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a7c42]/20 focus:border-[#0a7c42] transition-all"
            />
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full py-3 bg-[#0a7c42] hover:bg-[#086335] text-white font-medium text-sm sm:text-base rounded-xl transition-colors shadow-sm mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'অপেক্ষা করুন...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </Button>
        </form>

        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-400 font-medium">অথবা</span>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocial('google')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google দিয়ে চালান</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSocial('github')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0 fill-current text-slate-900" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালান</span>
          </Button>
        </div>

        
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-3 text-xs">
          <p className="text-slate-600">
            অ্যাকাউন্ট আছে?{' '}
            <button
              onClick={() => navigate(`/signin?redirect=${encodeURIComponent(redirectUrl)}`)}
              className="font-bold text-[#0a7c42] hover:underline cursor-pointer"
            >
              সাইন ইন করুন
            </button>
          </p>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোম পেজে ফিরে যান</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
