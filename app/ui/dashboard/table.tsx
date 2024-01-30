// import { getAuthUser } from "@/auth";
import { getAuthUser } from "@/app/lib/data";
import { auth } from "@/auth";
import {
  ChangeUsername,
  ChangeEmail,
} from '@/app/ui/dashboard/buttons';

export default async function DashboardTable() {
  auth();
  const user = await getAuthUser();

  return (
    <div className="mt-6 flow-root text-gray-200">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg flex flex-col p-2 md:pt-0">
          <div className="round-lg p-2 md:pt-0">
            <p className="flex justify-between gap-2">
              <span>Your name: {user.username}</span>
              <ChangeUsername id={user.user_id}/>
            </p>
          </div>
          <div className="round-lg p-2 md:pt-0">
            <p className="flex justify-between gap-2">
              <span>Your email: {user.email}</span>
              <ChangeEmail id={user.user_id}/>
            </p>
          </div>
          <div className="round-lg p-2 md:pt-0">
            <button className="bg-red-600 py-1.5 px-1.5 rounded-md hover:bg-red-500">Delete Accaunt</button>
          </div>
        </div>
      </div>
    </div>
  );
}
