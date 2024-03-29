const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-700 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-600" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-500 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-gray-600 px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-500" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function GoodDeedSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-500" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-500" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-500" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-500" />
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-600`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-500"></div>
          <div className="h-6 w-24 rounded bg-gray-500"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-500"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
        </div>
      </td>
    </tr>
  );
}

export function UsersTableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Name */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-500"></div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-64 rounded bg-gray-500"></div>
      </td>
      {/* Subscribe */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
    </tr>
  );
}

export function GoodDeedsMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-gray-700 p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-500"></div>
          <div className="h-6 w-16 rounded bg-gray-500"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-600"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-500"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-500"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-500"></div>
          <div className="h-10 w-10 rounded bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
}

export function UsersMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-gray-700 p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="h-6 w-32 rounded bg-gray-500"></div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-64 rounded bg-gray-500"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-24 rounded bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
}

export function GoodDeedsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-700 p-2 md:pt-0">
          <div className="md:hidden">
            <GoodDeedsMobileSkeleton />
            <GoodDeedsMobileSkeleton />
            <GoodDeedsMobileSkeleton />
            <GoodDeedsMobileSkeleton />
            <GoodDeedsMobileSkeleton />
            <GoodDeedsMobileSkeleton />
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
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-700 p-2 md:pt-0">
          <div className="md:hidden">
            <UsersMobileSkeleton />
            <UsersMobileSkeleton />
            <UsersMobileSkeleton />
            <UsersMobileSkeleton />
            <UsersMobileSkeleton />
            <UsersMobileSkeleton />
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
                  Subscribe
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}