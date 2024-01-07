import { sql } from '@vercel/postgres';
import {
  UserField,
  FriendsTable,
  // CustomerField,
  GoodDeedsCountUsers,
  GoodDeedForm,
  GoodDeedsTable,
  LatestGoodDeedRaw,
  User,
  // Revenue,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

// export async function fetchRevenue() {
//   noStore();

//   try {
//     console.log('Fetching revenue data...');
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue>`SELECT * FROM revenue`;

//     console.log('Data fetch complete after 3 seconds.');

//     return data.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

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
    // const goodDeedStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'done' THEN amount ELSE 0 END) AS "done",
    //      SUM(CASE WHEN status = 'doing' THEN amount ELSE 0 END) AS "doing"
    //      FROM good_deeds`;

    const data = await Promise.all([
      goodDeedCountPromise,
      userCountPromise,
      // goodDeedStatusPromise,
    ]);

    const numberOfGoodDeeds = Number(data[0].rows[0].count ?? '0');
    const numberOfUsers = Number(data[1].rows[0].count ?? '0');
    // const totalDoneGoodDeeds = formatCurrency(data[2].rows[0].done ?? '0');
    // const totalDoingGoodDeeds = formatCurrency(data[2].rows[0].doing ?? '0');

    return {
      numberOfUsers,
      numberOfGoodDeeds,
      // totalDoneGoodDeeds,
      // totalDoingGoodDeeds,
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

// export async function fetchCustomers() {
//   noStore();
  
//   try {
//     const data = await sql<CustomerField>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     const customers = data.rows;
//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

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

// export async function fetchFilteredCustomers(query: string) {
//   noStore();
  
//   try {
//     const data = await sql<FriendsTable>`
// 		SELECT
// 		  users.id,
// 		  users.name,
// 		  users.email,
// 		  COUNT(good_deeds.id) AS total_good_deeds,
// 		FROM users
// 		LEFT JOIN good_deeds ON users.id = good_deeds.user_id

// 		WHERE
//       users.name ILIKE ${`%${query}%`} OR
//       users.email ILIKE ${`%${query}%`}
//       GROUP BY users.id, users.name, users.email
//       ORDER BY users.name ASC
// 	  `;

//     const users = data.rows.map((user) => ({
//       ...user,
//     }));

//     return users;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

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
