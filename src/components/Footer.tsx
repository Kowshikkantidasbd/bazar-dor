import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-slate-200/80 bg-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 text-center sm:text-left">
          <p className="font-medium text-slate-700">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p className="text-slate-400">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};
