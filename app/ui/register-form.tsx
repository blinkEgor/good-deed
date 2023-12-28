'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
//   ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
// import { register } from 'module';
// import { registration } from '@/app/lib/actions';
// import { authenticate } from '@/app/lib/actions';
// import handler from '@/app/api/register';
import { registration } from '@/app/lib/actions';

export default function RegisterForm() {
    // const [errorMessage, dispatch] = useFormState(registration, undefined);
    // const [errorMessage, dispatch] = useFormState(handler, undefined);
    // const [,dispatch] = useFormState(registration, undefined);

    return (
        <form action={''} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-600 text-gray-100 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Please registration to application.
                </h1>
                <div className="w-full">
                    {/* Name */}
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-50"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-200 bg-gray-600"
                                id="name"
                                type="name"
                                name="name"
                                placeholder="Enter your username"
                                required
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-50"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-200 bg-gray-600"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-50"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-200 bg-gray-600"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <RegisterButton />
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {/* {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )} */}
                </div>
            </div>
        </form>
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();
   
    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}