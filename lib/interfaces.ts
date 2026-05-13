export interface Transaction {
	id: string;
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
	name: string;
	type: ACCOUNT_TYPE;
	userID: number;
}

export interface TransactionWithAccount extends Transaction {
	account: Account;
}

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
