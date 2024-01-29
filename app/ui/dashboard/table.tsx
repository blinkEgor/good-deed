import { getAuthUser } from "@/auth";

export default async function DashboardTable() {

  const user = await getAuthUser();

  return (
    <div className="mt-6 flow-root text-gray-200">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg flex flex-col p-2 md:pt-0">
            <div className="round-lg p-2 md:pt-0">
                <p className="flex gap-2">
                    <span>Your name: {user.username}</span>
                    <button className="bg-blue-400 py-1.5 px-1.5 rounded-md">Change<br/>name</button>
                </p>
            </div>
            <div className="round-lg p-2 md:pt-0">
                <p className="flex gap-2">
                    <span>Your email: {user.email}</span>
                    <button className="bg-blue-400 py-1.5 px-1.5 rounded-md">Change<br/>email</button>
                </p>
            </div>
            <div className="round-lg p-2 md:pt-0">
                <button className="bg-red-600 py-1.5 px-1.5 rounded-md">Delete Accaunt</button>
            </div>
        </div>
      </div>
    </div>
  );
}
