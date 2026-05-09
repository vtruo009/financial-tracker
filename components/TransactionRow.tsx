'use client';

import { CATEGORY, Transaction } from '@/lib/interfaces';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import CategorySymbol from './CategorySymbol';
import { TableCell, TableRow } from './ui/table';

const TransactionRow = ({ category, cleanName, amount }: Transaction) => {
	return (
		<TableRow className='border-0'>
			<TableCell>
				<CategorySymbol category={category} />
			</TableCell>

			<TableCell>
				<div className='flex flex-col flex-1'>
					<p className='text-left text-lg font-semibold'>{cleanName}</p>
					<Select>
						<SelectTrigger
							size='sm'
							className='border-0 focus-visible:ring-0 p-0 items-start'
						>
							<SelectValue placeholder={category} className='text-gray-400' />
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
			</TableCell>

			<TableCell className='content-start'>
				<p className='font-bold text-lg text-right'>${amount.toFixed(2)}</p>
			</TableCell>
		</TableRow>
	);
};

export default TransactionRow;
