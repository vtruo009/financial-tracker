import TransactionRow from '@/components/TransactionRow';
import PlaceHolderData from './lib/placeholder-data';
import { uploadTransactions } from './lib/actions';
import { CATEGORY } from './lib/interfaces';

export default async function Home() {
	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			{/* <div className='w-full'> */}
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				{/* <main> */}
				<TransactionRow {...PlaceHolderData.transactions[0]} />
			</main>
		</div>
	);
}
