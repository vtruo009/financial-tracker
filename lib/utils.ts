import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Papa from 'papaparse';
import {
	Account,
	BankOfAmericaCSV,
	CATEGORY,
	TransactionWithAccountInput,
} from './interfaces';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseCSV = (fileContent: string, account: Account) => {
	const results: Papa.ParseResult<BankOfAmericaCSV> = Papa.parse(fileContent, {
		header: true,
		skipEmptyLines: true,
	});

	const transactions: TransactionWithAccountInput[] = [];
	for (const row of results.data) {
		const transaction: TransactionWithAccountInput = {
			refNum: row['Reference Number'],
			amount: parseFloat(row.Amount),
			date: row['Posted Date'],
			rawName: row.Payee,
			cleanName: row.Payee, // TODO: AI Renaming
			category: CATEGORY.MISC, // TODO: AI auto-categorization
			userID: 1, // TODO: Authentication
			accountID: account.id,
		};

		transactions.push(transaction);
	}

	if (results.errors.length > 0) {
		console.error('CSV parsing errors:', results.errors);
		// throw new Error('Failed to parse CSV')
	}

	return transactions;
};
