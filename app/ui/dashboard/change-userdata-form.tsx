'use client';

import { lusitana } from '@/app/ui/fonts';
import { UserCircleIcon, } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { changeUserdata } from '@/app/lib/actions';

function ChangeButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" type="submit" disabled={pending}>
            Change Userdata <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}

export default function ChangeUserdataForm() {
    const [state, formAction] = useFormState(changeUserdata, null);
    return (
        // <form action={''} className="space-y-3">
        <form action={formAction} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-600 text-gray-100 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Please registration to application.
                </h1>
                <div className="w-full">
                    {/* Username */}
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-50"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-200 bg-gray-600"
                                id="username"
                                type="name"
                                name="username"
                                placeholder="Enter your username"
                                required
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <ChangeButton />
                <div
                    className="flex h-4 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                </div>
            </div>
        </form>
    );
}