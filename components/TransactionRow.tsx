'use client';

import { CATEGORY, Transaction } from '@/app/lib/interfaces';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

const TransactionRow = (transaction: Transaction) => {
	return (
		<div className='w-full h-fit flex justify-between'>
			<div className='flex flex-col'>
				<p className='text-left text-lg font-semibold'>
					{transaction.cleanName}
				</p>
				<Select>
					<SelectTrigger className='border-0 focus-visible:ring-0 p-0 items-start'>
						<SelectValue
							placeholder={transaction.category}
							className='text-gray-400'
						/>
					</SelectTrigger>
					<SelectContent position='popper'>
						<SelectGroup>
							{Object.values(CATEGORY).map((value) => {
								return (
									<SelectItem
										key={value}
										value={value}
										className='font-nunito text-sm'
									>
										{value}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<p className='font-bold text-lg'>${transaction.amount.toFixed(2)}</p>
		</div>
	);
};

export default TransactionRow;
