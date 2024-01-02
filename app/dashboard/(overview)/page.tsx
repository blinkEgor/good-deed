import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { 
  RevenueChartSkeleton, 
  LatestGoodDeedsSkeleton,
  CardsSkeleton,  
} from '@/app/ui/skeletons';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-gray-200`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          
        </Suspense>
        <Suspense fallback={<LatestGoodDeedsSkeleton />}>
          
        </Suspense>
      </div>
    </main>
  );
}