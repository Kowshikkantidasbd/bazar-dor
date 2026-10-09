'use client';

import React, { useState, useEffect, useRef } from 'react';


import { Button } from '@heroui/react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { Category } from '../types';
import { fetchCategories } from '../services/api';
import { getBnFormattedDate } from '../utils/bengali';
import { HeadlineTicker } from './HeadlineTicker';
import logoIcon from '../assets/logo-icon.png';
import { ShoppingCart, ChevronDown, User as UserIcon, LogOut } from 'lucide-react';


const LOGO_BOX = 44;  
const LOGO_ZOOM = 2;  

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentPath, navigate } = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [todayDateStr, setTodayDateStr] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  
  useEffect(() => {
    setTodayDateStr(getBnFormattedDate(new Date()));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 border-b border-slate-100">
            
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3.5 cursor-pointer group select-none"
            >
            <div
  style={{ width: LOGO_BOX, height: LOGO_BOX }}
  className="rounded-xl bg-[#0a7c42] flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 shrink-0"
>
  <img
    src={logoIcon.src}
    alt="বাজার দর"
    style={{ width: 50, height: 30, filter: 'brightness(0) invert(1)' }}
    className="object-contain"
  />
</div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#0a7c42] transition-colors leading-tight">
                  বাজার দর
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  {todayDateStr || '\u00A0'}
                </span>
              </div>
            </div>

            
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100/80 transition-colors focus:outline-none"
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-sm font-medium text-slate-800 hidden sm:inline">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 px-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 leading-snug">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>

                      <div className="pt-1.5 space-y-1">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#0a7c42] rounded-xl transition-colors text-left"
                        >
                          <UserIcon className="w-4 h-4 text-slate-500" />
                          <span>আমার প্রোফাইল</span>
                        </button>

                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>সাইন আউট</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/signin')}
                    className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#0a7c42]"
                  >
                    সাইন ইন
                  </Button>
                  <Button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#0a7c42] hover:bg-[#086335] rounded-xl shadow-sm"
                  >
                    সাইন আপ
                  </Button>
                </div>
              )}
            </div>
          </div>

          
          <div className="py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2 text-sm -mx-4 sm:mx-0 px-4 sm:px-0 touch-pan-x">
            {categories.map((cat) => {
              const isActive = currentPath === `/category/${cat.slug}`;
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-xs sm:text-sm transition-all flex items-center gap-1.5 font-medium ${
                    isActive
                      ? 'bg-[#0a7c42] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>


      <HeadlineTicker />
    </>
  );
};