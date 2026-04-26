// app/actions.ts
'use server';
import { neon } from '@neondatabase/serverless';
import { Transaction } from './interfaces';

const DATABASE_URL = process.env.DATABASE_URL || '';
const sql = neon(DATABASE_URL);

export async function getData() {
	const data = await sql`...`;
	return data;
}

export const uploadTransactions = async (transactions: Transaction[]) => {
	try {
		const promises = transactions.map((row) => {
			sql`
				INSERT INTO transactions (
				amount,
				date,
				raw_name,
				clean_name,
				category_id,
				user_id
				) VALUES (
					${row.amount},
					${row.date},
					${row.rawName},
					${row.cleanName},
					${row.categoryID},	 
					${row.userID}
				);
			`;
		});

		await Promise.all(promises);
	} catch (error) {
		console.error('[uploadTransaction]', error);
	}
};
