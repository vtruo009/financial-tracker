'use server';

import { neon } from '@neondatabase/serverless';
import {
	AccountInput,
	CATEGORY,
	TransactionWithAccountInput,
} from './interfaces';

const DATABASE_URL = process.env.DATABASE_URL || '';
const sql = neon(DATABASE_URL);

export async function getData() {
	const data = await sql`...`;
	return data;
}

/******************************** TRANSACTIONS ********************************/
export const uploadTransactions = async (
	transactions: TransactionWithAccountInput[],
) => {
	try {
		const promises = transactions.map((row) => {
			return sql`
				INSERT INTO transactions (
					amount,
					date,
					raw_name,
					clean_name,
					category,
					user_id,
					notes,
					account_id,
					ref_num
				) VALUES (
					${row.amount},
					${row.date},
					${row.rawName},
					${row.cleanName},
					${row.category},
					${row.userID},
					${row.notes},
					${row.accountID},
					${row.refNum}
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
			'SELECT transactions.*, accounts.name AS account_name, accounts.type AS account_type FROM transactions JOIN accounts ON transactions.account_id = accounts.id WHERE transactions.user_id = $1 AND (category = $2 OR $2 IS NULL) ORDER BY date DESC',
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
	transactionId: number,
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

/******************************** ACCOUNTS ********************************/
export const addAccount = async (account: AccountInput) => {
	try {
		return await sql`
			INSERT INTO accounts (
				name,
				type,
				user_id,
				bank
			) VALUES (
				${account.name},
				${account.type},
				${account.userID},
				${account.bank}
			)
		`;
	} catch (error) {
		console.error('[addAccount]:', error);
	}
};

export const getAllAccounts = async (userId: number = 1) => {
	try {
		return await sql`
			SELECT * FROM accounts
			WHERE user_id = ${userId}
		`;
	} catch (error) {
		console.error('[getAllAccounts]', error);
	}
};

/******************************** AGGREATION ********************************/
/**
 * returns total spent and total income for the current month
 * @param userId
 */
export const getMonthlySummary = async (userId: number) => {
	try {
		const data = await sql`
			SELECT 
				SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS total_income,
				ABS(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END)) AS total_spending
			FROM transactions
			WHERE
				EXTRACT(month FROM date) = EXTRACT(month FROM CURRENT_DATE) AND
				EXTRACT(year from date) = EXTRACT(year from CURRENT_DATE) AND
				user_id = ${userId}
		`;

		if (!data[0].total_income && !data[0].total_spending) {
			throw new Error('No total returned!');
		}

		return data[0];
	} catch (error) {
		console.error('[getMonthlySummary]:', error);
	}
};

export const getSpendingByCategory = async (userId: number) => {};

export const getTopMerchant = async (userId: number, limit: number) => {};

export const getMonthlyTrends = async (userId: number) => {};
