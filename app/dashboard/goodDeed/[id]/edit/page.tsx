import Form from '@/app/ui/good-deeds/edit-form';
import Breadcrumbs from '@/app/ui/good-deeds/breadcrumbs';
import { fetchGoodDeedById, getAuthUser } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [goodDeed, username, user_id] = await Promise.all([
        fetchGoodDeedById(id),
        (await getAuthUser()).username,
        (await getAuthUser()).user_id,
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
            <Form good_deed={goodDeed} username={username} user_id={user_id} />
        </main>
    );
}