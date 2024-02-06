"use client"

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