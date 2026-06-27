'use server';

import { neon } from '@neondatabase/serverless';
import {
	AccountInput,
	CATEGORY,
	CategorySpendingPayload,
	MonthlySummaryPayload,
	MonthlyTrendPayload,
	TopMerchantPayload,
	TotalTransactionCount,
	Transaction,
	TransactionInput,
	TransactionPayload,
} from './mixins';

const DATABASE_URL = process.env.DATABASE_URL || '';
const sql = neon(DATABASE_URL);

export async function getData() {
	const data = await sql`...`;
	return data;
}

/******************************** TRANSACTIONS ********************************/
export const uploadTransactions = async (transactions: TransactionInput[]) => {
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
					account_id,
					ref_num,
					notes
				) VALUES (
					${row.amount},
					${row.date},
					${row.raw_name},
					${row.clean_name},
					${row.category},
					${row.user_id},
					${row.account_id},
					${row.ref_num},
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
	userId: number,
	page: number = 1,
	limit: number = 10,
	category?: string,
	startDate?: string,
	search?: string,
): Promise<Transaction[] | undefined> => {
	const offset = (page - 1) * limit;

	try {
		const data: TransactionPayload[] = (await sql.query(
			`
			SELECT transactions.*, accounts.name AS account_name, accounts.type AS account_type
			FROM transactions
			JOIN accounts ON transactions.account_id = accounts.id
			WHERE
				transactions.user_id = $1 AND
				(category = $2 OR $2 IS NULL) AND
				((date >= $3) OR $3 IS NULL) AND
				((clean_name ILIKE '%' || $4 || '%') OR $4 IS NULL)
			ORDER BY date DESC
			LIMIT $5
			OFFSET $6
			`,
			[userId, category, startDate, search, limit, offset],
		)) as TransactionPayload[];

		const results: Transaction[] = data.map((row) => ({
			id: row.id,
			amount: parseFloat(row.amount),
			date: new Date(row.date),
			cleanName: row.clean_name,
			category: row.category as CATEGORY,
			notes: row.notes,
			accountName: row.account_name,
		}));

		return results;
	} catch (error) {
		console.error('[getTransactions]', error);
	}
};

export const getTransactionCount = async (
	userId: number,
	category?: string,
	startDate?: string,
	search?: string,
): Promise<number | undefined> => {
	try {
		const data = await sql.query(
			`
			SELECT COUNT(*) AS total_transactions
			FROM transactions
			WHERE
			transactions.user_id = $1 AND
			(category = $2 OR $2 IS NULL) AND
			((date >= $3) OR $3 IS NULL) AND
			((clean_name ILIKE '%' || $4 || '%') OR $4 IS NULL)
			`,
			[userId, category, startDate, search],
		);

		if (data.length === 0)
			throw new Error(
				`Unable to get total number of transactions for user ${userId}`,
			);

		return data[0].total_transactions;
	} catch (error) {
		console.error('[getTransactionCount]', error);
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
	category: string,
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

/******************************** AGGREGATION ********************************/
/**
 * returns total spent and total income for the current month
 * @param userId
 */
export const getMonthlySummary = async (
	userId: number,
): Promise<MonthlySummaryPayload | undefined> => {
	try {
		const data = await sql`
			SELECT 
				SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS total_income,
				ABS(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END)) AS total_spending
			FROM transactions
			WHERE
				EXTRACT(month FROM date) = EXTRACT(month FROM CURRENT_DATE) AND
				EXTRACT(year from date) = EXTRACT(year from CURRENT_DATE) AND
				category NOT IN ('Credit Card Payment', 'Debt Payment') AND
				user_id = ${userId}
		`;

		return {
			total_income: parseFloat(data[0].total_income ?? '0'),
			total_spending: parseFloat(data[0].total_spending ?? '0'),
		};
	} catch (error) {
		console.error('[getMonthlySummary]:', error);
	}
};

/**
 * Returns total spent per category for the current month
 * @param userId
 */
export const getSpendingByCategory = async (
	userId: number,
): Promise<CategorySpendingPayload[] | undefined> => {
	try {
		const data = await sql`
			SELECT 
				category,
				ABS(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END)) as total_spending
			FROM transactions
			WHERE
				EXTRACT(month FROM date) = EXTRACT(month FROM CURRENT_DATE) AND
				EXTRACT(year from date) = EXTRACT(year from CURRENT_DATE) AND
				category NOT IN ('Credit Card Payment', 'Debt Payment') AND
				amount < 0 AND
				user_id = ${userId}
			GROUP BY category
			ORDER BY total_spending DESC
		`;

		const results: CategorySpendingPayload[] = data.map((row) => ({
			category: row.category ?? '',
			total_spending: parseFloat(row.total_spending ?? '0'),
		}));
		return results;
	} catch (error) {
		console.error('[getSpendingByCategory]:', error);
	}
};

/**
 * Returns top N merchants by total spend
 * @param userId
 * @param limit
 */
export const getTopMerchant = async (
	userId: number,
	limit: number,
): Promise<TopMerchantPayload[] | undefined> => {
	try {
		const data = await sql`
			SELECT 
				clean_name as merchant,
				ABS(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END)) as total_spending
			FROM transactions
			WHERE
				EXTRACT(month FROM date) = EXTRACT(month FROM CURRENT_DATE) AND
				EXTRACT(year from date) = EXTRACT(year from CURRENT_DATE) AND
				category NOT IN ('Credit Card Payment', 'Debt Payment') AND
				amount < 0 AND
				user_id = ${userId}
			GROUP BY clean_name
			ORDER BY total_spending DESC
			LIMIT ${limit}
		`;

		const results: TopMerchantPayload[] = data.map((row) => ({
			merchant: row.merchant ?? '',
			total_spending: parseFloat(row.total_spending ?? '0'),
		}));
		return results;
	} catch (error) {
		console.error('[getTopMerchant]:', error);
	}
};

/**
 * Returns total spent and income per month for the last 6 months
 * @param userId
 */
export const getMonthlyTrends = async (
	userId: number,
): Promise<MonthlyTrendPayload[] | undefined> => {
	try {
		const data = await sql`
			SELECT 
				DATE_TRUNC('month', date) as month,
				SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END) as total_spending,
				SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) as total_income
			FROM transactions 
			WHERE
				(date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '6 month') AND
				category NOT IN ('Credit Card Payment', 'Debt Payment') AND
				(user_id = ${userId})
			GROUP BY month
			ORDER BY month ASC;
		`;

		const results: MonthlyTrendPayload[] = data.map((row) => ({
			month: row.month ?? '',
			total_spending: parseFloat(row.total_spending ?? '0'),
			total_income: parseFloat(row.total_income ?? '0'),
		}));
		return results;
	} catch (error) {
		console.error('[getMonthlyTrends]:', error);
	}
};
