'use server';
import { neon } from '@neondatabase/serverless';
import { CATEGORY, Transaction } from './interfaces';

const DATABASE_URL = process.env.DATABASE_URL || '';
const sql = neon(DATABASE_URL);

export async function getData() {
	const data = await sql`...`;
	return data;
}

export const uploadTransactions = async (transactions: Transaction[]) => {
	try {
		const promises = transactions.map((row) => {
			return sql`
				INSERT INTO transactions (
					id,
					amount,
					date,
					raw_name,
					clean_name,
					category,
					user_id,
					notes
				) VALUES (
				 	${row.id},
					${row.amount},
					${row.date},
					${row.rawName},
					${row.cleanName},
					${row.category},
					${row.userID},
					${row.notes}
				);
			`;
		});

		await Promise.all(promises);
	} catch (error) {
		console.error('[uploadTransaction]', error);
	}
};

export const getTransactions = async (
	userId: number = 1,
	category?: CATEGORY,
) => {
	try {
		return await sql.query(
			'SELECT * FROM transactions WHERE user_id = $1 AND (category = $2 OR $2 IS NULL) ORDER BY date DESC',
			[userId, category],
		);
	} catch (error) {
		console.error('[getTransactions]', error);
	}
};

export const getTransaction = async (transactionId: number) => {
	try {
		return await sql`
			SELECT * FROM transactions
			WHERE id = ${transactionId};
		`;
	} catch (error) {
		console.error('[getTransaction]', error);
	}
};

export const updateTransaction = async (
	transactionId: number,
	newValues: Transaction,
) => {
	try {
		await sql`
			UPDATE transactions
			SET (
				amount,
				date,
				clean_name,
				category
			) = (
				${newValues.amount},
				${newValues.date},
				${newValues.cleanName},
				${newValues.category}
			) WHERE id = ${transactionId};
		`;
	} catch (error) {
		console.error('[updateTransaction]', error);
	}
};

export const deleteTransaction = async (transactionId: number) => {
	try {
		await sql`
			DELETE FROM transactions
			WHERE id = ${transactionId};
		`;
	} catch (error) {
		console.error('[deleteTransaction]', error);
	}
};
