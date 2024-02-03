import Form from '@/app/ui/good-deeds/create-form';
import Breadcrumbs from '@/app/ui/good-deeds/breadcrumbs';
import { getAuthUser } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create',
};
 
export default async function Page() {
  const [username, user_id] = await Promise.all([
    (await getAuthUser()).username,
    (await getAuthUser()).user_id,
  ]);
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Good deeds', href: '/dashboard/goodDeed' },
          {
            label: 'Create',
            href: '/dashboard/goodDeed/create',
            active: true,
          },
        ]}
      />
      <Form username={username} user_id={user_id} />
    </main>
  );
}