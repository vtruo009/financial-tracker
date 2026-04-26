export interface Transaction {
	amount: number;
	date: string;
	rawName: string;
	cleanName: string;
	categoryID: number;
	userID: number;
}
