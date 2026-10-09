'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'github', redirectTo?: string) => Promise<void>;
  updateUser: (data: { name: string; image?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;


const defaultAvatar: string =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#d1fae5"/>
      <circle cx="12" cy="9" r="4" fill="#0a7c42"/>
      <path d="M4.5 20c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" fill="#0a7c42"/>
    </svg>`
  );

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: string }).message;
    if (message) return message;
  }
  return fallback;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  

  const { data: session, isPending, refetch } = authClient.useSession();

  const user: User | null = useMemo(() => {
    if (!session?.user) return null;
    const u = session.user;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      image: u.image || defaultAvatar,
      createdAt: new Date(u.createdAt).toISOString(),
    };
  }, [session]);

  const login = useCallback(
    async (email: string, pass: string): Promise<boolean> => {
      const cleanEmail = email.trim();

      if (!cleanEmail || !pass) {
        toast.error('ইমেইল এবং পাসওয়ার্ড উভয়ই প্রদান করুন।');
        return false;
      }
      if (!EMAIL_REGEX.test(cleanEmail)) {
        toast.error('সঠিক ইমেইল ঠিকানা দিন।');
        return false;
      }
      if (pass.length < MIN_PASSWORD_LENGTH) {
        toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
        return false;
      }

      try {
        const { error } = await authClient.signIn.email({
          email: cleanEmail,
          password: pass,
        });

        if (error) {
          toast.error(getErrorMessage(error, 'ইমেইল বা পাসওয়ার্ড ভুল।'));
          return false;
        }

        await refetch();
        toast.success('সফলভাবে সাইন ইন করেছেন!');
        return true;
      } catch (e) {
        console.error('Login failed:', e);
        toast.error('সাইন ইন করা যায়নি। আবার চেষ্টা করুন।');
        return false;
      }
    },
    [refetch]
  );

  const signup = useCallback(
    async (name: string, email: string, pass: string): Promise<boolean> => {
      const cleanName = name.trim();
      const cleanEmail = email.trim();

      if (!cleanName || !cleanEmail || !pass) {
        toast.error('অনুগ্রহ করে সকল তথ্য পূরণ করুন।');
        return false;
      }
      if (!EMAIL_REGEX.test(cleanEmail)) {
        toast.error('সঠিক ইমেইল ঠিকানা দিন।');
        return false;
      }
      if (pass.length < MIN_PASSWORD_LENGTH) {
        toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
        return false;
      }

      try {
        const { error } = await authClient.signUp.email({
          email: cleanEmail,
          password: pass,
          name: cleanName,
        });

        if (error) {
          toast.error(getErrorMessage(error, 'অ্যাকাউন্ট তৈরি করা যায়নি।'));
          return false;
        }

        await refetch();
        toast.success('অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে!');
        return true;
      } catch (e) {
        console.error('Signup failed:', e);
        toast.error('অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।');
        return false;
      }
    },
    [refetch]
  );

 
  const socialLogin = useCallback(
    async (provider: 'google' | 'github', redirectTo: string = '/'): Promise<void> => {
    const providerName = provider === 'google' ? 'Google' : 'GitHub';

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: redirectTo.startsWith('/') ? redirectTo : '/',
      });

      if (error) {
        toast.error(getErrorMessage(error, `${providerName} দিয়ে সাইন ইন করা যায়নি।`));
      }
      
    } catch (e) {
      console.error(`${providerName} social login failed:`, e);
      toast.error(`${providerName} দিয়ে সাইন ইন করা যায়নি।`);
    }
    },
    []
  );

  
  const updateUser = useCallback(
    async (data: { name: string; image?: string }): Promise<boolean> => {
      if (!user) {
        toast.error('কোন সক্রিয় ব্যবহারকারী পাওয়া যায়নি।');
        return false;
      }

      const cleanName = data.name?.trim();
      if (!cleanName) {
        toast.error('নাম খালি রাখা যাবে না।');
        return false;
      }

      try {
        const { error } = await authClient.updateUser({
          name: cleanName,
          ...(data.image ? { image: data.image } : {}),
        });

        if (error) {
          toast.error(getErrorMessage(error, 'তথ্য আপডেট করা যায়নি।'));
          return false;
        }

        await refetch();
        toast.success('ব্যবহারকারীর তথ্য সফলভাবে আপডেট করা হয়েছে!');
        return true;
      } catch (e) {
        console.error('Update user failed:', e);
        toast.error('তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।');
        return false;
      }
    },
    [user, refetch]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(getErrorMessage(error, 'সাইন আউট করা যায়নি।'));
        return;
      }
      await refetch();
      toast.success('সফলভাবে সাইন আউট করা হয়েছে।');
    } catch (e) {
      console.error('Logout failed:', e);
      toast.error('সাইন আউট করা যায়নি।');
    }
  }, [refetch]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading: isPending,
      login,
      signup,
      socialLogin,
      updateUser,
      logout,
    }),
    [user, isPending, login, signup, socialLogin, updateUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};