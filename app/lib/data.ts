import { sql } from '@vercel/postgres';
import {
  CustomerField,
  FriendsTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  noStore();

  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch complete after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT good_deeds.amount, customers.name, customers.image_url, customers.email, good_deeds.id
      FROM good_deeds
      JOIN customers ON good_deeds.customer_id = customers.id
      ORDER BY good_deeds.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((good_deed) => ({
      ...good_deed,
      amount: formatCurrency(good_deed.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest good_deeds.');
  }
}

export async function fetchCardData() {
  noStore();
  
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM good_deeds`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'done' THEN amount ELSE 0 END) AS "done",
         SUM(CASE WHEN status = 'doing' THEN amount ELSE 0 END) AS "doing"
         FROM good_deeds`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        good_deeds.id,
        good_deeds.amount,
        good_deeds.deed,
        good_deeds.date,
        good_deeds.status,
        customers.name,
        customers.image_url
      FROM good_deeds
      JOIN customers ON good_deeds.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        good_deeds.deed ILIKE ${`%${query}%`} OR
        good_deeds.amount::text ILIKE ${`%${query}%`} OR
        good_deeds.date::text ILIKE ${`%${query}%`} OR
        good_deeds.status ILIKE ${`%${query}%`}
      ORDER BY good_deeds.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch good_deeds.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  
  try {
    const count = await sql`SELECT COUNT(*)
    FROM good_deeds
    JOIN customers ON good_deeds.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      good_deeds.amount::text ILIKE ${`%${query}%`} OR
      good_deeds.date::text ILIKE ${`%${query}%`} OR
      good_deeds.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        good_deeds.id,
        good_deeds.customer_id,
        good_deeds.amount,
        good_deeds.status
      FROM good_deeds
      WHERE good_deeds.id = ${id};
    `;

    const good_deed = data.rows.map((good_deed) => ({
      ...good_deed,
      amount: good_deed.amount / 100,
    }));

    return good_deed[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch good_deeds.');
  }
}

export async function fetchCustomers() {
  noStore();
  
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  
  try {
    const data = await sql<FriendsTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(good_deeds.id) AS total_invoices,
		  SUM(CASE WHEN good_deeds.status = 'doing' THEN good_deeds.amount ELSE 0 END) AS total_doing,
		  SUM(CASE WHEN good_deeds.status = 'done' THEN good_deeds.amount ELSE 0 END) AS total_done
		FROM customers
		LEFT JOIN good_deeds ON customers.id = good_deeds.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
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
