"use client"

// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
import { subscribe, unSubscribe } from '@/app/lib/actions';

export function SubscribeUser({ name }: { name: string }) {
  return (
    <button 
      className="w-32 px-3 py-2 text-sm font-semibold bg-green-600 flex justify-center item-center rounded-md hover:bg-green-400"
      onClick={() => subscribe(name)}
    >
      <span>
        Subscribe
      </span>
    </button>
  );
}

export function UnsubscribeUser({ name }: { name: string }) {
  return (
    <button 
      className="w-32 px-3 py-2 text-sm font-semibold bg-red-600 flex justify-center item-center rounded-md hover:bg-red-400"
      onClick={() => unSubscribe(name)}
    >
      <span>
        Unsubscribe
      </span>
    </button>
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
