'use client';

import { CATEGORY, Transaction } from '@/app/lib/interfaces';
import React from 'react';
import { Button } from './ui/button';
import { DollarSignIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select';

const TransactionRow = (transaction: Transaction) => {
	const [isDisabled, setIsDisabled] = React.useState(true);
	const [amount, setAmount] = React.useState(transaction.amount);

	return (
		<Button variant='ghost' className='w-fit'>
			<p>{new Date(transaction.date).toDateString()}</p>
			<p>{transaction.cleanName}</p>
			<p>{transaction.amount}</p>
			<p>{transaction.category}</p>
		</Button>
	);
};

export default TransactionRow;
