import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteGoodDeed } from '@/app/lib/actions';

export function CreateGoodDeed() {
  return (
    <Link
      href="/dashboard/goodDeed/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Good deed</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateGoodDeed({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/goodDeed/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-500"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteGoodDeed({ id }: { id: string }) {
  const deleteGoodDeedWithId = deleteGoodDeed.bind(null, id);

  return (
    <form action={deleteGoodDeedWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-500">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
