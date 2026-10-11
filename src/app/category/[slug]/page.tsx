import { Suspense } from 'react';
import CategoryPageClient from './CategoryPageClient';

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategoryPageClient slug={slug} />;
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
          <div className="h-24 bg-white rounded-2xl border border-slate-100" />
          <div className="h-64 bg-white rounded-2xl border border-slate-100" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}