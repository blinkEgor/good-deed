import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { AuthUser } from '@/app/lib/definitions';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          await sql<User>`
            UPDATE auth_user
            SET user_id = ${user.id},
                username = ${user.name},
                email = ${user.email}
              
            WHERE password = '111';
          `;
          // const auth_user = await sql`SELECT user_id,username,email FROM auth_user`;
          // console.log(user);
          // console.log(auth_user.rows[0]);

          if (passwordsMatch) return user;
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export async function getAuthUser() {
  try {
    const user = await sql`SELECT user_id,username,email FROM auth_user`;
    return user.rows[0] as AuthUser;
  } catch(error) {
    console.error('Failed query:',error);
    throw new Error('Failed query.');
  }
}