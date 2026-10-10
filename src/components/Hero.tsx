import React, { useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@heroui/react';
import heroImageImport from '@/assets/bazar-hero.png';

import { useRouter } from '../context/RouterContext';

const PRODUCTS_SECTION_ID = 'সব-পণ্য';

const heroImage: string =
  typeof heroImageImport === 'string'
    ? heroImageImport
    : (heroImageImport as { src: string }).src;

const scrollToProducts = () => {
  document
    .getElementById(PRODUCTS_SECTION_ID)
    ?.scrollIntoView({ behavior: 'smooth' });
};

export const Hero: React.FC = () => {
  const { navigate, currentPath } = useRouter();

  const isHome = currentPath.split('#')[0] === '/';

  useEffect(() => {
    if (!isHome) return;
    if (decodeURIComponent(window.location.hash) === `#${PRODUCTS_SECTION_ID}`) {
      const id = requestAnimationFrame(scrollToProducts);
      return () => cancelAnimationFrame(id);
    }
  }, [isHome, currentPath]);

  const handleScrollToProducts = () => {
    if (!isHome) {
      navigate(`/#${PRODUCTS_SECTION_ID}`);
      return;
    }
    scrollToProducts();
  };

  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-white border border-emerald-100/80 shadow-sm p-6 sm:p-10 mb-8 sm:mb-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-12">
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0a7c42] text-xs font-semibold mb-4 border border-emerald-200/50">
            <span>আজকের বাজারের দর</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-[1.2] mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং আগের পরিবর্তন এক জায়গায়।
          </p>

          <div>
            <Button
              onPress={handleScrollToProducts}
              className="w-full sm:w-auto justify-center px-6 py-3 bg-[#0a7c42] hover:bg-[#086335] text-white font-medium text-sm sm:text-base rounded-xl transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>সব পণ্য দেখুন</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center items-center">
  <img
    src={heroImage}
    alt="বাজারের তাজা পণ্যের ঝুড়ি"
    width={400}
    height={400}
    loading="eager"
    draggable={false}
    className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain"
  />
</div>
      </div>
    </div>
  );
};