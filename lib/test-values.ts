import { CATEGORY, TransactionInput } from './mixins';

export const testTransactions: TransactionInput[] = [
	{
		amount: -15.98,
		date: new Date().toDateString(),
		raw_name: 'YI FANG TAIWAN FRUIT T Arcadia CA',
		clean_name: '',
		category: CATEGORY.DINING,
		user_id: 0,
		account_id: 0,
		ref_num: '',
		notes: '',
	},
	{
		amount: -16.55,
		date: new Date().toDateString(),
		raw_name: 'STARBUCKS STORE 27215 SOUTH EL MONTCA',
		clean_name: '',
		category: CATEGORY.UNCATEGORIZED,
		user_id: 0,
		account_id: 0,
		ref_num: '24692166116401149450473',
		notes: '',
	},
	{
		amount: -12.75,
		date: new Date().toDateString(),
		raw_name: 'TST*CHA REDEFINE-K TOWN Los Angeles CA',
		clean_name: '',
		category: CATEGORY.UNCATEGORIZED,
		user_id: 0,
		account_id: 0,
		ref_num: '24692166109404471891875',
		notes: '',
	},
];
