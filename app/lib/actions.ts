'use server';

import { User } from '@/app/lib/definitions';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
import * as bcrypt from 'bcrypt';
import { getAuthUser } from '@/app/lib/data';

const FormSchema = z.object({
  id: z.string(),
  userId: z.string({
    invalid_type_error: 'Please select a user.',
  }),
  deed: z.string({
    invalid_type_error: 'Please write a text.',
  }),
  status: z.enum(['doing', 'done'], {
    invalid_type_error: 'Please select an good deed status.',
  }),
  date: z.string(),
});

const CreateGoodDeed = FormSchema.omit({ id: true, date: true });
const UpdateGoodDeed = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    userId?: string[];
    deed?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createGoodDeed(prevState: State, formData: FormData) {
  const validatedFields = CreateGoodDeed.safeParse({
    userId: formData.get('userId'),
    deed: formData.get('deed'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Good deed.',
    };
  }
 
  const { userId, deed, status } = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO good_deeds (user_id, deed, status, date)
      VALUES (${userId}, ${deed}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Good deed.',
    };
  }
 
  revalidatePath('/dashboard/goodDeed');
  redirect('/dashboard/goodDeed');
}

export async function updateGoodDeed(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateGoodDeed.safeParse({
    userId: formData.get('userId'),
    // amount: formData.get('amount'),
    deed: formData.get('deed'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Good deed.',
    };
  }
 
  const { userId, deed, status } = validatedFields.data;
 
  try {
    await sql`
      UPDATE good_deeds
      SET user_id = ${userId}, deed = ${deed}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Good deed.' };
  }
 
  revalidatePath('/dashboard/goodDeed');
  redirect('/dashboard/goodDeed');
}

export async function deleteGoodDeed(id: string) {
  try {
    await sql`DELETE FROM good_deeds WHERE id = ${id}`;
    revalidatePath('/dashboard/goodDeed');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Good deed.',
    }
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function registration(
  previousState: any,
  formData: FormData,
) {

  const user = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const { name, email, password } = <User>user;

  const saltRounds = 10;
  const myPlaintextPassword = password;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(myPlaintextPassword, salt);

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hash})
    `;
  } catch (error) {
    throw error;
  }
  revalidatePath('/');
  redirect('/');
}

export async function changeUserdata(
  previousState: any,
  formData: FormData,
){
  try{
    auth();
    const prevData = await getAuthUser();

    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
    };
    const { name, email } = <User>user;
    
    await sql`
      UPDATE users
      SET name = ${name},
          email = ${email}
      WHERE email = ${prevData.email}
    `;

    await sql<User>`
      UPDATE auth_user
      SET user_id = ${prevData.user_id},
          username = ${name},
          email = ${email}
        
      WHERE password = '111';
    `;
  }catch(error){
    console.log('something wrong!!!');
    throw error;
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteUser(id: string){
  try{
    await sql`DELETE FROM users WHERE id = ${id}`;
    await signOut();
  }catch(error){
    throw error;
  }
  revalidatePath('/');
  redirect('/');
}

export async function subscribe(name: string) {
  // console.log(`Name is __ ${name} __`);
  // console.log(`Current user is __ ${(await getAuthUser()).username} __`);
  const auth_username = (await getAuthUser()).username;

  try{
    await sql`
      UPDATE  users 
      SET friends = array_append(users.friends, ${name})
      WHERE users.name = ${auth_username};
    `;
  }catch(error){
    throw error;
  }
}