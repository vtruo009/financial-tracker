import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Papa from 'papaparse';
import {
	Account,
	BANK_INSTITUTION,
	BankOfAmericaCSV,
	CATEGORY,
	ChaseCSV,
	TransactionInput,
} from './mixins';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const config = {
	header: true,
	skipEmptyLines: true,
};

const parseBOA = (fileContent: string, account: Account) => {
	const transactions: TransactionInput[] = [];
	const results: Papa.ParseResult<BankOfAmericaCSV> = Papa.parse(
		fileContent,
		config,
	);

	for (const row of results.data) {
		const transaction: TransactionInput = {
			amount: parseFloat(row.Amount),
			date: row['Posted Date'],
			raw_name: row.Payee,
			clean_name: row.Payee, // TODO: AI Renaming
			category: CATEGORY.MISC, // TODO: AI auto-categorization
			user_id: 1, // TODO: Authentication
			account_id: account.id,
			ref_num: row['Reference Number'],
			notes: '',
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
	const transactions: TransactionInput[] = [];
	const results: Papa.ParseResult<ChaseCSV> = Papa.parse(fileContent, {
		header: true,
		skipEmptyLines: true,
	});

	for (const row of results.data) {
		const transaction: TransactionInput = {
			amount: parseFloat(row.Amount),
			date: row['Transaction Date'],
			raw_name: row.Description,
			clean_name: row.Description, // TODO: AI Renaming
			category: row.Category as CATEGORY,
			user_id: 1, // TODO: Authentication
			account_id: account.id,
			ref_num: '',
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
	const transactions: TransactionInput[] = [];
	return transactions;
};

export const parseCSV = (
	fileContent: string,
	account: Account,
): TransactionInput[] => {
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

export const currencyFormatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export const dateFormatter = Intl.DateTimeFormat('en-US', {
	timeZone: 'UTC',
	month: 'short',
});
