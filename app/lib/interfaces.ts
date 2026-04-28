export interface Transaction {
	amount: number;
	date: string;
	rawName: string;
	cleanName: string;
	category: CATEGORY;
	userID: number;
}

export enum CATEGORY {
	FOODS_DRINKS = 'Food & Drinks',
	MATERIALIST_DESIRES = 'Materialistic Desires',
	HOBBY = 'Hobby',
	TRAVEL = 'Travel',
	BILL = 'Bill',
	NECESSITY = 'Necessity',
}
