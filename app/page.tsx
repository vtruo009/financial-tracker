import { getAllAccounts, getTransactions } from '../lib/actions';
import { Account, Transaction } from '../lib/mixins';
import FileUpload from '@/components/FileUpload';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import TransactionRow from '@/components/TransactionRow';
import AddAccount from '@/components/AddAccount';
import SummaryCards from '@/components/SummaryCards';
import Link from 'next/link';
import FilterBar from '@/components/FilterBar';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ category?: string; month?: string; search?: string }>;
}) {
	const { category, month, search } = await searchParams;
	const allTransactions = await getTransactions(1, category, month, search);

	const groupedTransactions = allTransactions?.reduce(
		(acc, transaction) => {
			const date = new Date(transaction.date).toDateString();
			if (!acc[date]) acc[date] = [];
			acc[date].push(transaction);
			return acc;
		},
		{} as Record<string, Transaction[]>,
	);
	const accounts = (await getAllAccounts()) as Account[];

	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				<FileUpload accounts={accounts} />
				<Link href='/dashboard'>Dashboard</Link>
				<AddAccount />
				<SummaryCards />
				<h2>Transactions</h2>
				<FilterBar />
				<div className='border border-gray-200 rounded-sm overflow-hidden'>
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
				</div>
			</main>
		</div>
	);
}
