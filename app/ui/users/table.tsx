// import Image from 'next/image';
// import { UpdateGoodDeed, DeleteGoodDeed } from '@/app/ui/good-deeds/buttons';
// import GoodDeedStatus from '@/app/ui/good-deeds/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredGoodDeeds } from '@/app/lib/data';
import {
  SubscribeUser,
  UnsubscribeUser,
} from '@/app/ui/users/buttons';
import { subscribe } from 'diagnostics_channel';

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredGoodDeeds(query, currentPage);

  return (
    <div className="mt-6 flow-root text-gray-200">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-700 p-2 md:pt-0">
          <div className="md:hidden">
            {users?.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        alt='User icon image'
                        src={user.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                      /> */}
                      <p>{user.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className='text-gray-100'>
                    <p>{user.deed}</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='text-gray-300 mt-3 text-xs'>
                        <p>{formatDateToLocal(user.date)}</p>
                    </div>
                    <td className="whitespace-nowrap px-3 py-3">
                      {SubscribeUser(user)}
                    </td>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Deed
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium"></th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        alt='good deed image'
                        src={user.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                      /> */}
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className='whitespace-wrap px-3 py-3'>
                    {user.deed}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(user.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {SubscribeUser(user)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
