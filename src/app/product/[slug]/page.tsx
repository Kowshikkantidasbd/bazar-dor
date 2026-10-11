import { Suspense } from 'react';
import ProductDetailClient from './ProductDetailClient';

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-48 bg-white rounded-3xl border border-slate-100" />
          <div className="h-32 bg-white rounded-3xl border border-slate-100" />
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}