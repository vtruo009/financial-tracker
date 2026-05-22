import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Papa from 'papaparse';
import {
	Account,
	BANK_INSTITUTION,
	BankOfAmericaCSV,
	CATEGORY,
	ChaseCSV,
	TransactionWithAccountInput,
} from './interfaces';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const config = {
	header: true,
	skipEmptyLines: true,
};

const parseBOA = (fileContent: string, account: Account) => {
	const transactions: TransactionWithAccountInput[] = [];
	const results: Papa.ParseResult<BankOfAmericaCSV> = Papa.parse(
		fileContent,
		config,
	);

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

const parseChase = (fileContent: string, account: Account) => {
	const transactions: TransactionWithAccountInput[] = [];
	const results: Papa.ParseResult<ChaseCSV> = Papa.parse(fileContent, {
		header: true,
		skipEmptyLines: true,
	});

	for (const row of results.data) {
		const transaction: TransactionWithAccountInput = {
			amount: parseFloat(row.Amount),
			date: row['Transaction Date'],
			rawName: row.Description,
			cleanName: row.Description, // TODO: AI Renaming
			category: row.Category as CATEGORY,
			userID: 1, // TODO: Authentication
			accountID: account.id,
			notes: row.Memo,
		};

		transactions.push(transaction);
	}
	if (results.errors.length > 0) {
		console.error('CSV parsing errors:', results.errors);
		// throw new Error('Failed to parse CSV')
	}
	return transactions;
};

const parseCapitalOne = (fileContent: string, account: Account) => {
	const transactions: TransactionWithAccountInput[] = [];
	return transactions;
};

export const parseCSV = (fileContent: string, account: Account) => {
	console.log(account.bank);
	switch (account.bank) {
		case BANK_INSTITUTION.BANK_OF_AMERICA:
			return parseBOA(fileContent, account);
		case BANK_INSTITUTION.CHASE:
			return parseChase(fileContent, account);
		case BANK_INSTITUTION.CAPITAL_ONE:
			return parseCapitalOne(fileContent, account);
		default:
			console.log('Bank type does not match any available acount');
			return [];
	}
};
