'use server';
import { neon } from '@neondatabase/serverless';
import { Account, CATEGORY, Transaction } from './interfaces';
import { parseCSV } from './utils';

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
			'SELECT * FROM transactions JOIN accounts ON transactions.account_id = accounts.id WHERE transactions.user_id = $1 AND (category = $2 OR $2 IS NULL) ORDER BY date DESC',
			[userId, category],
		);
	} catch (error) {
		console.error('[getTransactions]', error);
	}
};

export const getTransaction = async (transactionId: string) => {
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
	transactionId: string,
	category: CATEGORY,
	notes: string | null,
) => {
	try {
		await sql`
			UPDATE transactions
			SET (
				category,
				notes
			) = (
				${category},
				${notes}
			) WHERE id = ${transactionId};
		`;
	} catch (error) {
		console.error('[updateTransaction]', error);
	}
};

export const deleteTransaction = async (transactionId: string) => {
	try {
		await sql`
			DELETE FROM transactions
			WHERE id = ${transactionId};
		`;
	} catch (error) {
		console.error('[deleteTransaction]', error);
	}
};

export const handleUpload = async (formData: FormData) => {
	'use server';
	const file = formData.get('file');
	if (!(file instanceof File)) throw new Error('No file uploaded');
	const fileContent: string = await file.text();
	const data: Transaction[] = parseCSV(fileContent);
	await uploadTransactions(data);
};

/********************************
  Accounts
 ********************************/
export const addAccount = async (account: Account) => {
	try {
		const data = await sql`
			INSERT INTO accounts (
				name,
				type,
				user_id
			) VALUES (
				${account.name},
				${account.type},
				${account.userID} 
			)
		`;

		console.log(data);
	} catch (error) {
		console.error('[addAccount', error);
	}
};
