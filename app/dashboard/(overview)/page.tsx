import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import DashboardTable from '@/app/ui/dashboard/table';
 
export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-gray-200`}>
        Home
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <DashboardTable />
        </Suspense>
      </div>
    </main>
  );
}