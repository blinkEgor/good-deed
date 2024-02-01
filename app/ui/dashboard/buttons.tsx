'use server'

import Link from 'next/link';
import {
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { deleteUser } from '@/app/lib/actions';

export async function ChangeUsername({id}:{id:string}){
    return (
        <Link 
            className="bg-blue-500 py-1.5 px-1.5 rounded-md hover:bg-blue-400 flex"
            href={`/dashboard/${id}/change_userdata`}
        >Change<br/>name<PencilIcon className="w-5 ml-1" /></Link>
    );
}

export async function ChangeEmail({id}:{id:string}){
    return(
        <Link 
            className="bg-blue-500 py-1.5 px-1.5 rounded-md hover:bg-blue-400 flex"
            href={`/dashboard/${id}/change_userdata`}
        >Change<br/>email<PencilIcon className="w-5 ml-1" /></Link>
    );
}

export async function DeleteUser({ id }: { id: string }) {
    const deleteUserWithId = deleteUser.bind(null, id);
  
    return (
      <form action={deleteUserWithId}>
        <button className="bg-red-600 py-1.5 px-1.5 rounded-md hover:bg-red-500 flex">
          <span>Delete Accaunt</span>
          <TrashIcon className="w-5 ml-0.5" />
        </button>
      </form>
    );
  }
  