import { CATEGORY, Transaction } from './interfaces';

const transactions: Transaction[] = [
	{
		amount: 68.0,
		date: new Date(2026, 3, 24).toISOString().split('T')[0],
		rawName: 'SEN',
		cleanName: 'Sen Sushi',
		category: CATEGORY.FOODS_DRINKS,
		userID: 1,
	},
	{
		amount: 8.13,
		date: new Date(2026, 3, 24).toISOString().split('T')[0],
		rawName: 'store 1234',
		cleanName: 'Formosa Aroma',
		category: CATEGORY.FOODS_DRINKS,
		userID: 1,
	},
];

const PlaceHolderData = { transactions };
export default PlaceHolderData;
