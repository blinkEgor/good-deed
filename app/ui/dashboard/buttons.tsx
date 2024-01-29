'use server'

import Link from 'next/link';
import {
    changeUsername,
    changeEmail,
} from '@/app/lib/actions';

export async function ChangeUsername({id}:{id:string}){
    return (
        <Link 
            className="bg-blue-400 py-1.5 px-1.5 rounded-md"
            href={`/dashboard/${id}/change_username`}
        >Change<br/>name</Link>
    );
}

export async function ChangeEmail({id}:{id:string}){
    return(
        <Link 
            className="bg-blue-400 py-1.5 px-1.5 rounded-md"
            href={`/dashboard/${id}/change_email`}
        >Change<br/>email</Link>
    );
}