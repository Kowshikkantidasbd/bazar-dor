
import React from 'react';
import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import { RouterProvider } from '../context/RouterContext';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'বাজারদর',
  description: 'আজকের বাজারের দাম এক নজরে',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={hindSiliguri.variable}
    >
      <body className={hindSiliguri.className}>
        <AuthProvider>
          <RouterProvider>
            <div className="min-h-screen flex flex-col bg-[#f7faf8] text-slate-800">
              <Navbar />

              <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex-1 w-full">
                {children}
              </main>

              <Footer />

              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3500,
                  style: {
                    background: '#ffffff',
                    color: '#1e293b',
                    boxShadow:
                      '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '16px',
                    padding: '12px 18px',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: '1px solid #f1f5f9',
                  },
                  success: {
                    iconTheme: {
                      primary: '#0a7c42',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#e11d48',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
            </div>
          </RouterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

