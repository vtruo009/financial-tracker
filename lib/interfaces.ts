export interface Transaction {
	id: number;
	refNum: string;
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
}

export interface TransactionWithAccount extends Transaction {
	account: Account;
}

export type TransactionWithAccountInput = Omit<
	TransactionWithAccount,
	'id' | 'account'
>;

// ******************** CSV ********************
export interface BankOfAmericaCSV {
	Address: string;
	Amount: string;
	Payee: string;
	'Posted Date': string;
	'Reference Number': string;
}

/******************** ENUMS ********************/
export enum CATEGORY {
	FOODS_DRINKS = 'Food & Drinks',
	MATERIALIST_DESIRES = 'Materialistic Desires',
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
