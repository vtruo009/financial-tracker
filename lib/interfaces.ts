export interface Transaction {
	id: number;
	refNum?: string;
	amount: number;
	date: string;
	rawName: string;
	cleanName: string;
	category: CATEGORY;
	userID: number;
	accountID: number;
	notes?: string | null;
}

export interface Account {
	id: number;
	name: string;
	type: ACCOUNT_TYPE;
	userID: number;
	bank: BANK_INSTITUTION;
}

export interface TransactionWithAccount extends Transaction {
	account: Account;
}

export type TransactionWithAccountInput = Omit<
	TransactionWithAccount,
	'id' | 'account'
>;

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
	FOODS_DRINK = 'Food & Drink',
	MATERIALIST_DESIRE = 'Materialistic Desire',
	HOBBY = 'Hobby',
	TRAVEL = 'Travel',
	BILL = 'Bill',
	NECESSITY = 'Necessity',
	MISC = 'Miscelaneous',
}

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
	total_spending: string;
}

export interface MonthlySummaryPayload extends SpendingsPayload {
	total_income: string;
}

export interface CategorySpendingPayload extends SpendingsPayload {
	category: string;
}

export interface TopMerchantPayload extends SpendingsPayload {
	merchant: string;
}

export interface MonthlyTrendPayload extends SpendingsPayload {
	month: string;
}
