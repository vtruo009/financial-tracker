'use client';

import { Transaction } from '@/lib/mixins';
import CategorySymbol from './CategorySymbol';
import { TableCell, TableRow } from './ui/table';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { FieldGroup, Field } from './ui/field';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import CategorySelect from './CategorySelect';
import { useState } from 'react';
import { updateTransaction } from '@/lib/actions';
import { currencyFormatter } from '@/lib/utils';

const TransactionRow = ({
	id,
	amount,
	cleanName,
	category,
	notes,
	accountName,
}: Transaction) => {
	const [selectedCategory, setSelectedCategory] = useState(category);
	const [currentNotes, setCurrentNotes] = useState(notes || '');

	const handleSave = async () => {
		await updateTransaction(id, selectedCategory, currentNotes);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<TableRow className='border-0 cursor-pointer'>
					<TableCell>
						<CategorySymbol category={selectedCategory} />
					</TableCell>

					<TableCell>
						<div className='flex flex-col flex-1'>
							<p className='text-left text-lg font-semibold'>{cleanName}</p>
							<CategorySelect
								transactionId={id}
								selectedCategory={selectedCategory}
								setSelectedCategory={setSelectedCategory}
								notes={currentNotes}
							/>
						</div>
					</TableCell>

					<TableCell className='content-start'>
						<p className='font-bold text-lg text-right'>
							{currencyFormatter.format(amount)}
						</p>
					</TableCell>
				</TableRow>
			</DialogTrigger>
			<DialogContent className='sm:max-w-sm'>
				<DialogHeader>
					<DialogTitle className='font-bold'>Transaction Details</DialogTitle>
					<DialogDescription>
						Add a note here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					<Field orientation='vertical'>
						<p className='text-left text-lg font-semibold'>{cleanName}</p>
						<p className='text-left text-md'>{accountName}</p>
						<CategorySelect
							transactionId={id}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							notes={currentNotes}
						/>
					</Field>
					<Field>{currencyFormatter.format(amount)}</Field>
					<Field>
						<Label>Notes</Label>
						<Textarea
							id='notes'
							name='notes'
							defaultValue={currentNotes}
							placeholder='e.g. John Venmoed me'
							onChange={(e) => setCurrentNotes(e.target.value)}
						/>
					</Field>
				</FieldGroup>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={handleSave}>Save changes</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TransactionRow;
