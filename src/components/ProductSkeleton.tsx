import React from 'react';
import { Skeleton } from '@heroui/react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div className="flex items-start gap-3.5 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 rounded-md w-3/4" />
          <Skeleton className="h-3 rounded-md w-1/2" />
        </div>
      </div>
      <div className="flex items-end justify-between pt-2 border-t border-slate-50">
        <div className="space-y-1.5">
          <Skeleton className="h-2.5 rounded-md w-14" />
          <Skeleton className="h-5 rounded-md w-20" />
        </div>
        <Skeleton className="h-4 rounded-md w-12" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
