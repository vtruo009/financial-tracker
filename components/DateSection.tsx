import { Transaction } from '@/app/lib/interfaces';
import React from 'react';
import TransactionRow from './TransactionRow';

interface DateSectionProps {
	transactionDate: string;
	transactions: Transaction[];
}

function DateSection({ transactionDate, transactions }: DateSectionProps) {
	return (
		<div>
			<p className='text-gray-500 border-b-2 border-gray-400'>
				{transactionDate}
			</p>
			{transactions.map((transaction) => (
				<TransactionRow key={transaction.id} {...transaction} />
			))}
		</div>
	);
}

export default DateSection;
