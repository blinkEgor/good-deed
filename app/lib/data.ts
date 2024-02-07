import { sql } from '@vercel/postgres';
import {
  UserField,
  UserPage,
  GoodDeedForm,
  GoodDeedsTable,
  LatestGoodDeedRaw,
  User,
  AuthUser,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

export async function fetchLatestGoodDeeds() {
  noStore();
  
  try {
    const data = await sql<LatestGoodDeedRaw>`
      SELECT users.name, good_deeds.id
      FROM good_deeds
      JOIN users ON good_deeds.user_id = users.id
      ORDER BY good_deeds.date DESC
      LIMIT 5`;

    const latestGoodDeeds = data.rows.map((deed) => ({
      ...deed,
    }));
    return latestGoodDeeds;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest good_deeds.');
  }
}

export async function fetchCardData() {
  noStore();
  
  try {
    const goodDeedCountPromise = sql`SELECT COUNT(*) FROM good_deeds`;
    const userCountPromise = sql`SELECT COUNT(*) FROM users`;

    const data = await Promise.all([
      goodDeedCountPromise,
      userCountPromise,
    ]);

    const numberOfGoodDeeds = Number(data[0].rows[0].count ?? '0');
    const numberOfUsers = Number(data[1].rows[0].count ?? '0');

    return {
      numberOfUsers,
      numberOfGoodDeeds,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredGoodDeeds(
  query: string,
  currentPage: number,
) {
  noStore();
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const goodDeeds = await sql<GoodDeedsTable>`
      SELECT
        good_deeds.id,
        good_deeds.deed,
        good_deeds.date,
        good_deeds.status,
        users.name
      FROM good_deeds
      JOIN users ON good_deeds.user_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        good_deeds.deed::text ILIKE ${`%${query}%`} OR
        good_deeds.date::text ILIKE ${`%${query}%`} OR
        good_deeds.status ILIKE ${`%${query}%`}
      ORDER BY good_deeds.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return goodDeeds.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch good_deeds.');
  }
}

export async function fetchFilteredUsersPage(
  query: string,
  currentPage: number,
) {
  noStore();
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UserPage>`
      SELECT
        id,
        name,
        email
      FROM users
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchGoodDeedsPages(query: string) {
  noStore();
  
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM good_deeds
      JOIN users ON good_deeds.user_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        good_deeds.deed::text ILIKE ${`%${query}%`} OR
        good_deeds.date::text ILIKE ${`%${query}%`} OR
        good_deeds.status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of good deeds.');
  }
}

export async function fetchUsersPages(query: string) {
  noStore();
  
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.id::text ILIKE ${`%${query}%`} OR
        users.email::text ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of good deeds.');
  }
}

export async function fetchGoodDeedById(id: string) {
  noStore();
  
  try {
    const data = await sql<GoodDeedForm>`
      SELECT
        good_deeds.id,
        good_deeds.user_id,
        good_deeds.deed,
        good_deeds.status
      FROM good_deeds
      WHERE good_deeds.id = ${id};
    `;

    const good_deed = data.rows.map((good_deed) => ({
      ...good_deed,
    }));

    return good_deed[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch good deeds.');
  }
}

export async function fetchUsers() {
  noStore();
  
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredUsers(query: string) {
  noStore();
  
  try {
    const data = await sql<User>`
		SELECT
		  users.id,
		  users.name,

		FROM users
		LEFT JOIN good_deeds ON users.id = good_deeds.user_id
		WHERE
		  users.name ILIKE ${`%${query}%`}
		GROUP BY users.id, users.name
		ORDER BY users.name ASC
	  `;

    const users = data.rows.map((user) => ({
      ...user,
    }));

    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user table.');
  }
}

export async function getUser(email: string) {
  noStore();
  
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getAuthUser() {
  noStore();
  auth();
  try {
    const user = await sql`SELECT user_id,username,email FROM auth_user`;
    return user.rows[0] as AuthUser;
  } catch(error) {
    console.error('Failed query:',error);
    throw new Error('Failed query.');
  }
}

export async function getFriends(auth_username:string) {
  noStore();
  auth();
  try{
    const friends_list = await sql`SELECT friends FROM users WHERE users.name = ${auth_username};`;
    if(friends_list.rows[0]['friends']===null){
      return [''] as string[];
    }
    return friends_list.rows[0]['friends'] as string[];
  }catch(error){
    console.error('Failed query:',error);
    throw new Error('Failed query.');
  }
}