// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { deleteGoodDeed } from '@/app/lib/actions';

export function SubscribeUser({ name }: { name: string }) {
  return (
    <div className="w-32 px-3 py-2 text-sm font-semibold bg-green-600 flex justify-center item-center rounded-md hover:bg-green-400">
      <span>
        Subscribe
      </span>
    </div>
  );
}

export function UnsubscribeUser({ id }: { id: string }) {
  return (
    <div></div>
  );
}

// export function DeleteGoodDeed({ id }: { id: string }) {
//   const deleteGoodDeedWithId = deleteGoodDeed.bind(null, id);

//   return (
//     <form action={deleteGoodDeedWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-500">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
