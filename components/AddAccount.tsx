'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';
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
import { Field, FieldGroup } from './ui/field';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { ACCOUNT_TYPE, BANK_INSTITUTION } from '@/lib/interfaces';
import { addAccount } from '@/lib/actions';

const AddAccount = () => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [bank, setBank] = useState('');

	const handleClick = async () => {
		await addAccount({
			name,
			type: type as ACCOUNT_TYPE,
			userID: 1,
			bank: bank as BANK_INSTITUTION,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='cursor-pointer'>
					<PlusIcon />
					Add Account
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-sm font-nunito'>
				<DialogHeader>
					<DialogTitle>Add an Account</DialogTitle>
					<DialogDescription>
						Fill in information about your account
					</DialogDescription>
				</DialogHeader>
				<Field>
					<Label htmlFor='name'>Name</Label>
					<Input
						id='name'
						name='name'
						placeholder='Bank of America - Checking'
						className='focus-visible:ring-0'
						onChange={(e) => setName(e.target.value)}
					/>
				</Field>
				<Field>
					<Label htmlFor='n'>Account Type</Label>
					<Select onValueChange={(value) => setType(value)}>
						<SelectTrigger
							size='sm'
							className='border-0 focus-visible:ring-0 p-0 items-start text-muted-foreground'
						>
							<SelectValue placeholder='Select Account Type' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={ACCOUNT_TYPE.CHECKING}>Checking</SelectItem>
							<SelectItem value={ACCOUNT_TYPE.CREDIT}>Credit</SelectItem>
							<SelectItem value={ACCOUNT_TYPE.SAVINGS}>Savings</SelectItem>
						</SelectContent>
					</Select>
				</Field>
				<Field>
					<Label htmlFor='n'>Bank Institution</Label>
					<Select onValueChange={(value) => setBank(value)}>
						<SelectTrigger
							size='sm'
							className='border-0 focus-visible:ring-0 p-0 items-start text-muted-foreground'
						>
							<SelectValue placeholder='Select Account Type' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={BANK_INSTITUTION.BANK_OF_AMERICA}>
								{BANK_INSTITUTION.BANK_OF_AMERICA}
							</SelectItem>
							<SelectItem value={BANK_INSTITUTION.CAPITAL_ONE}>
								{BANK_INSTITUTION.CAPITAL_ONE}
							</SelectItem>
							<SelectItem value={BANK_INSTITUTION.CHASE}>
								{BANK_INSTITUTION.CHASE}
							</SelectItem>
						</SelectContent>
					</Select>
				</Field>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={handleClick}>Add</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddAccount;
