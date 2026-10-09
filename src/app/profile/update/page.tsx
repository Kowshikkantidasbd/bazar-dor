'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { Button, Card } from '@heroui/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/context/RouterContext';

export default function UpdateProfilePage() {
  const { user, isLoading, updateUser } = useAuth();
  const { navigate } = useRouter();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/signin?redirect=/profile/update', true);
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  if (isLoading || !user) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-[#0a7c42] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('অনুগ্রহ করে নাম প্রদান করুন।');
      return;
    }
    setLoading(true);
    const success = await updateUser({ name });
    setLoading(false);
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 sm:py-12">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/profile')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </button>
      </div>

      <Card className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          তথ্য আপডেট করুন
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          BetterAuth স্ট্যান্ডার্ড অনুযায়ী ব্যবহারকারীর নাম এবং প্রোফাইল তথ্য সংশোধন করুন।
        </p>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              নাম (Name)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম"
              required
              className="w-full bg-slate-50/70 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a7c42]/20 focus:border-[#0a7c42] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              ইমেইল (অপরিবর্তনযোগ্য)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full bg-slate-100 text-slate-500 border border-slate-200 text-sm rounded-xl px-4 py-3 cursor-not-allowed select-none"
            />
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full py-3 bg-[#0a7c42] hover:bg-[#086335] text-white font-medium text-sm sm:text-base rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'সংরক্ষণ হচ্ছে...' : 'তথ্য আপডেট করুন'}</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
