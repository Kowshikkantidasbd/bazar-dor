'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LogOut, Edit3 } from 'lucide-react';
import { Avatar, Button, Card } from '@heroui/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/context/RouterContext';

export default function ProfilePage() {
  const { user, isLoading, logout, updateUser } = useAuth();
  const { navigate } = useRouter();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/signin?redirect=/profile', true);
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

  const handleQuickUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('নাম খালি রাখা যাবে না।');
      return;
    }
    setLoading(true);
    await updateUser({ name });
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4 sm:py-8">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      
      <Card className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-slate-100 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
         
          <Button
            onClick={() => navigate('/profile/update')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য পেজে আপডেট</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-rose-600 border border-rose-200 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </Button>
        </div>
      </Card>

      <Card className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">তথ্য</h3>

        <form onSubmit={handleQuickUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full bg-slate-50/70 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a7c42]/20 focus:border-[#0a7c42] transition-all"
            />
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full py-3 bg-[#0a7c42] hover:bg-[#086335] text-white font-medium text-sm sm:text-base rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
