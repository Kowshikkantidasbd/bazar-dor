'use client';
import React, { useEffect, useState } from 'react';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';
import { fetchAllProducts } from '../services/api';
import { Product } from '../types';
import { toBnNum } from '../utils/bengali';
import { useRouter } from '../context/RouterContext';

export const HeadlineTicker: React.FC = () => {
  const { navigate } = useRouter();
  const [tickerProducts, setTickerProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadTicker = async () => {
      try {
        const prods = await fetchAllProducts();
        setTickerProducts(prods.slice(0, 15));
      } catch (err) {
        console.error('Ticker data error:', err);
      }
    };
    loadTicker();
  }, []);

  if (tickerProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50 border-t border-b border-slate-200/70 overflow-hidden relative select-none py-1.5">
      <MarqueeText
        duration={10}
        direction="right"
        pauseOnHover={true}
        className="cursor-pointer text-xs sm:text-sm text-slate-700"
      >
        <span className="inline-flex items-center gap-6">
          {tickerProducts.map((item, idx) => {
            const isUp = item.change?.dir === 'up';
            const isDown = item.change?.dir === 'down';
            const unitLabel = item.unit === 'kg' ? 'কেজি' : item.unit === 'liter' ? 'লিটার' : item.unit;

            return (
              <span
                key={`${item.id}-${idx}`}
                onClick={() => navigate(`/product/${item.slug || item.id}`)}
                className="inline-flex items-center gap-1.5 mx-3 hover:text-[#0a7c42] transition-colors"
              >
                <span>{item.image || item.categoryIcon || '🛒'}</span>
                <span className="font-semibold text-slate-900">{item.nameBn}</span>
                <span className="text-slate-600">
                  {toBnNum(item.today)} টাকা/{unitLabel}
                </span>
                <span
                  className={`font-bold flex items-center text-[11px] ${
                    isUp ? 'text-rose-600' : isDown ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {isUp ? '▲' : isDown ? '▼' : '—'} {toBnNum(item.change?.pct)}%
                </span>
                <span className="text-slate-300 ml-3">|</span>
              </span>
            );
          })}
        </span>
      </MarqueeText>
    </div>
  );
};

export default HeadlineTicker;
