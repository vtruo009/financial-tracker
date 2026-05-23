import {
	getAllAccounts,
	getMonthlySummary,
	getSpendingByCategory,
	getTopMerchant,
	getTransactions,
} from '../lib/actions';
import {
	Account,
	ACCOUNT_TYPE,
	Transaction,
	TransactionWithAccount,
} from '../lib/interfaces';
import FileUpload from '@/components/FileUpload';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import TransactionRow from '@/components/TransactionRow';
import AddAccount from '@/components/AddAccount';

export default async function Home() {
	console.log(await getTopMerchant(1, 3));
	// const allTransactions = await getTransactions();
	// const groupedTransactions = allTransactions?.reduce(
	// 	(acc, transaction) => {
	// 		const date = new Date(transaction.date).toDateString();
	// 		if (!acc[date]) acc[date] = [];
	// 		const localTransaction: TransactionWithAccount = {
	// 			id: transaction.id,
	// 			refNum: transaction.ref_num,
	// 			amount: parseFloat(transaction.amount),
	// 			date: transaction.date,
	// 			rawName: transaction.raw_name,
	// 			cleanName: transaction.clean_name,
	// 			category: transaction.category,
	// 			userID: parseInt(transaction.user_id),
	// 			accountID: parseInt(transaction.account_id),
	// 			notes: transaction.notes,
	// 			account: {
	// 				id: parseInt(transaction.account_id),
	// 				name: transaction.account_name,
	// 				type: transaction.account_type as ACCOUNT_TYPE,
	// 				userID: parseInt(transaction.user_id),
	// 				bank: transaction.bank,
	// 			},
	// 		};
	// 		acc[date].push(localTransaction);
	// 		return acc;
	// 	},
	// 	{} as Record<string, TransactionWithAccount[]>,
	// );
	// const accounts = (await getAllAccounts()) as Account[];

	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				{/* <FileUpload accounts={accounts} /> */}
				<AddAccount />
				<h2>Transactions</h2>
				{/* <div className='border border-gray-200 rounded-sm overflow-hidden'>
					<Table>
						<TableBody>
							{groupedTransactions &&
								Object.entries(groupedTransactions).map(
									(entry: [string, Transaction[]]) => (
										<React.Fragment key={entry[0]}>
											<TableRow
												key={entry[0]}
												className='h-10 hover:bg-transparent'
											>
												<TableCell colSpan={3}>{entry[0]}</TableCell>
											</TableRow>
											{entry[1].map((transaction) => (
												<TransactionRow key={transaction.id} {...transaction} />
											))}
										</React.Fragment>
									),
								)}
						</TableBody>
					</Table>
				</div> */}
			</main>
		</div>
	);
}
