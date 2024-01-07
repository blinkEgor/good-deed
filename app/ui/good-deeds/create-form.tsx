'use client';

import { UserField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  // CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createGoodDeed } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ users }: { users: UserField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createGoodDeed, initialState);
  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-700 text-gray-200 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            User
          </label>
          <div className="relative">
            <select
              id="user"
              name="userId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-500 py-2 pl-10 text-sm outline-2 bg-gray-600 placeholder:text-gray-100"
              defaultValue=""
              aria-describedby="user-error"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-100" />
          </div>
          <div id="user-error" aria-live="polite" aria-atomic="true">
            {state.errors?.userId &&
              state.errors.userId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Invoice Amount
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-500 py-2 pl-10 text-sm outline-2 placeholder:text-gray-100 bg-gray-600"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-100" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div> */}

        {/* Deed */}
        <div className="mb-4">
          <label htmlFor="deed" className="mb-2 block text-sm font-medium">
            Choose a deed
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="deed"
                name="deed"
                type="text"
                step="0.01"
                placeholder="Enter your deed"
                className="peer block w-full rounded-md border border-gray-500 py-2 text-sm outline-2 placeholder:text-gray-100 bg-gray-600"
              />
            </div>
            <div id="deed-error" aria-live="polite" aria-atomic="true">
              {state.errors?.deed &&
                state.errors.deed.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* GoodDeed Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the good deed status
          </legend>
          <div className="rounded-md border border-gray-500 bg-gray-600 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="doing"
                  name="status"
                  type="radio"
                  value="doing"
                  className="h-4 w-4 cursor-pointer border-gray-200 bg-gray-500 text-gray-300 focus:ring-2"
                />
                <label
                  htmlFor="doing"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1.5 text-xs font-medium text-gray-200"
                >
                  Doing <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="done"
                  name="status"
                  type="radio"
                  value="done"
                  className="h-4 w-4 cursor-pointer border-gray-200 bg-gray-500 text-gray-300 focus:ring-2"
                />
                <label
                  htmlFor="done"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Done <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/goodDeed"
          className="flex h-10 items-center rounded-lg bg-gray-500 px-4 text-sm font-medium text-gray-50 transition-colors hover:bg-gray-400"
        >
          Cancel
        </Link>
        <Button type="submit">Create Good deed</Button>
      </div>
    </form>
  );
}
