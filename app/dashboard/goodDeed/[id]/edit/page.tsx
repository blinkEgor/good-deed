import Form from '@/app/ui/good-deeds/edit-form';
import Breadcrumbs from '@/app/ui/good-deeds/breadcrumbs';
import { fetchGoodDeedById, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [goodDeed, users] = await Promise.all([
        fetchGoodDeedById(id),
        fetchUsers(),
    ]);

    if(!goodDeed) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Good deeds', href: '/dashboard/goodDeed' },
                    {
                        label: 'Edit',
                        href: `/dashboard/goodDeed/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form good_deed={goodDeed} users={users} />
        </main>
    );
}