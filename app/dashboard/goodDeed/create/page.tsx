import Form from '@/app/ui/good-deeds/create-form';
import Breadcrumbs from '@/app/ui/good-deeds/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create',
};
 
export default async function Page() {
  const customers = await fetchCustomers();
 
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
      <Form customers={customers} />
    </main>
  );
}