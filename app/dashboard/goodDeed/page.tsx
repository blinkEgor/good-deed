import Pagination from '@/app/ui/good-deeds/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/good-deeds/table';
import { CreateInvoice } from '@/app/ui/good-deeds/buttons';
import { lusitana } from '@/app/ui/fonts';
import { GoodDeedsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Good deeds',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    return (
    <div className="w-full bg-gray-800">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-white`}>Good deeds</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search good deeds..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<GoodDeedsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
    );
}