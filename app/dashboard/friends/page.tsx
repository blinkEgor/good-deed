import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Suspense } from 'react';
import FriendsTable from '@/app/ui/friends/table';
 
export const metadata: Metadata = {
  title: 'Friends',
};

export default function Page() {
    return (
        <main>
            <div>
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-gray-200`}>Friends</h1>
            </div>
        </main>
    )
}