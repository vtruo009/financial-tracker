export const DEFAULT_USER_ID = 1;
export const LIMIT = 10;

// ******************** INTERFACES ********************
export interface Transaction {
	id: number;
	amount: number;
	date: Date;
	cleanName: string;
	category: CATEGORY;
	notes: string;
	accountName: string;
}

export interface TransactionInput {
	amount: number;
	date: string;
	raw_name: string;
	clean_name: string;
	category: string;
	user_id: number;
	account_id: number;
	ref_num: string;
	notes: string;
}

export interface TransactionPayload {
	id: number;
	amount: string;
	date: string;
	raw_name: string;
	clean_name: string;
	category: string;
	user_id: number;
	account_id: number;
	ref_num: string;
	notes: string;
	created_at: Date;
	account_name: string;
	account_type: string;
}

export interface Account {
	id: number;
	name: string;
	type: ACCOUNT_TYPE;
	userID: number;
	bank: BANK_INSTITUTION;
}

export type AccountInput = Omit<Account, 'id'>;

// ******************** CSV ********************
export interface BankOfAmericaCSV {
	Address: string;
	Amount: string;
	Payee: string;
	'Posted Date': string;
	'Reference Number': string;
}

export interface ChaseCSV {
	'Transaction Date': string;
	'Post Date': string;
	Description: string;
	Category: string;
	Type: string;
	Amount: string;
	Memo: string;
}

/******************** ENUMS ********************/
export enum CATEGORY {
	HOUSING = 'Housing', // rent, utils, internet
	DINING = 'Dining', // food, boba, starbucks
	GROCERIES = 'Groceries',
	TRANSPORTATION = 'Transportation', // gas, charging, fares
	HEALTH_WELLBEING = 'Health & Wellbeing', // skin care, haircut, target, copays, curology
	MATERIALIST_DESIRE = 'Materialistic Desire', // hobby, Legos, fishing gears
	TRAVEL = 'Travel', // vacations, flying to other places
	CREDIT_CARD_PAYMENT = 'Credit Card Payment',
	DEBT_PAYMENT = 'Debt Payment',
	MISC = 'Miscellaneous',
}

export const EXCLUDED_CATEGORIES = [
	CATEGORY.CREDIT_CARD_PAYMENT,
	CATEGORY.DEBT_PAYMENT,
];

export enum ACCOUNT_TYPE {
	CHECKING = 'checking',
	SAVINGS = 'savings',
	CREDIT = 'credit',
}

export enum BANK_INSTITUTION {
	BANK_OF_AMERICA = 'Bank of America',
	CHASE = 'Chase',
	CAPITAL_ONE = 'Capital One',
}

/******************* DATABASE *******************/
interface SpendingsPayload {
	total_spending: number;
}

export interface MonthlySummaryPayload extends SpendingsPayload {
	total_income: number;
}

export interface CategorySpendingPayload extends SpendingsPayload {
	category: string;
}

export interface TopMerchantPayload extends SpendingsPayload {
	merchant: string;
}

export interface MonthlyTrendPayload extends SpendingsPayload {
	month: string;
	total_income: number;
}

export interface TotalTransactionCount {
	total_transactions: number;
}
