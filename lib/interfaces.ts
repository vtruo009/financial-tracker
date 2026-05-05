export interface Transaction {
	id: string;
	amount: number;
	date: string;
	rawName: string;
	cleanName: string;
	category: CATEGORY;
	notes?: string | null;
	userID: number;
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
