import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function GoodDeedStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-500 text-white': status === 'doing',
          'bg-green-600 text-white': status === 'done',
        },
      )}
    >
      {status === 'doing' ? (
        <>
          Doing
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'done' ? (
        <>
          Done
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
