'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
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
    customerId?: string[];
    deed?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createGoodDeed(prevState: State, formData: FormData) {
  const validatedFields = CreateGoodDeed.safeParse({
    customerId: formData.get('customerId'),
    deed: formData.get('deed'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Good deed.',
    };
  }
 
  const { customerId, deed, status } = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO good_deeds (customer_id, deed, status, date)
      VALUES (${customerId}, ${deed}, ${status}, ${date})
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
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    deed: formData.get('deed'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Good deed.',
    };
  }
 
  const { customerId, deed, status } = validatedFields.data;
 
  try {
    await sql`
      UPDATE good_deeds
      SET customer_id = ${customerId}, deed = ${deed}, status = ${status}
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
  type User = {
    id: string,
    name: string,
    email: string,
    password: string,
  };

  const user = {
    id: randomUUID(),
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const { id, name, email, password } = <User>user;

  const saltRounds = 10;
  const myPlaintextPassword = password;

  try {
    console.log('registration success!');

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(myPlaintextPassword, salt);

    await sql`
      INSERT INTO Users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hash})
    `;
  } catch (error) {
    console.log('comething wrong!!!');
    throw error;
  }
  revalidatePath('/');
  redirect('/');
}