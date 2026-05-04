import { getTransactions } from './lib/actions';
import { Transaction } from './lib/interfaces';
import DateSection from '@/components/DateSection';

export default async function Home() {
	const allTransactions = await getTransactions();
	const groupedTransactions = allTransactions?.reduce(
		(acc, transaction) => {
			const date = new Date(transaction.date).toDateString();
			if (!acc[date]) acc[date] = [];
			const localTransaction: Transaction = {
				id: transaction.id,
				amount: parseFloat(transaction.amount),
				date: transaction.date,
				rawName: transaction.raw_name,
				cleanName: transaction.clean_name,
				category: transaction.category,
				userID: parseInt(transaction.user_id),
				notes: transaction.notes,
			};
			acc[date].push(localTransaction);
			return acc;
		},
		{} as Record<string, Transaction[]>,
	);

	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-nunito dark:bg-black'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				{groupedTransactions &&
					Object.entries(groupedTransactions).map(
						(entry: [string, Transaction[]]) => (
							<DateSection
								key={entry[0]}
								transactionDate={entry[0]}
								transactions={entry[1]}
							/>
						),
					)}
			</main>
		</div>
	);
}
