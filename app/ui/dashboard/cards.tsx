import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  doing: ClockIcon,
  good_deeds: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfGoodDeeds,
    numberOfCustomers,
    // totalDoneGoodDeeds,
    // totalDoingGoodDeeds,
  } = await fetchCardData();

  return (
    <>
      {/* <Card title="Collected" value={totalDoneGoodDeeds} type="collected" />
      <Card title="Doing" value={totalDoingGoodDeeds} type="doing" /> */}
      <Card title="Total Good Deeds" value={numberOfGoodDeeds} type="good_deeds" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'good_deeds' | 'customers' | 'doing' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
