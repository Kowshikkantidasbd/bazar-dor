import React from 'react';
import { Card, Chip } from '@heroui/react';
import { Product } from '../types';
import { useRouter } from '../context/RouterContext';
import { toBnNum, formatBnUnit } from '../utils/bengali';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate } = useRouter();

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';

  const handleClick = () => {
    navigate(`/product/${product.slug || product.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-emerald-200 transition-all duration-200 cursor-pointer flex flex-col justify-between group text-left"
    >
      
      <div className="flex items-start gap-3.5 mb-4 w-full">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-200">
          <span>{product.image || product.categoryIcon || '🛒'}</span>
        </div>

        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug truncate group-hover:text-[#0a7c42] transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {formatBnUnit(product.unit)}
          </p>
        </div>
      </div>

      
      <div className="flex items-end justify-between pt-2 border-t border-slate-50 w-full">
        <div>
          <span className="block text-[11px] text-slate-400 font-medium">আজকের দাম</span>
          <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {toBnNum(product.today)} টাকা
          </span>
        </div>

        
        <Chip
          variant="soft"
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isUp
              ? 'bg-rose-50 text-rose-600'
              : isDown
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-slate-100 text-slate-400'
          }`}
        >
          <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>{' '}
          <span>{toBnNum(product.change?.pct)}%</span>
        </Chip>
      </div>
    </Card>
  );
};
