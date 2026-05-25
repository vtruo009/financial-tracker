'use client';

import { UploadIcon } from 'lucide-react';
import { Button } from './ui/button';
import { uploadTransactions } from '@/lib/actions';
import { Input } from './ui/input';
import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Account } from '@/lib/mixins';
import { parseCSV } from '@/lib/utils';

interface FileUploadProps {
	accounts: Account[];
}

const FileUpload = ({ accounts }: FileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
	};

	const accountButton = (account: Account) => {
		return (
			<Button
				key={`${account.id}-${account.name}`}
				variant='ghost'
				className='cursor-pointer w-full justify-start'
				onClick={() => {
					setSelectedAccount(account);
					fileInputRef.current?.click();
				}}
			>
				{account.name}
			</Button>
		);
	};

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<Button className='cursor-pointer'>
					<UploadIcon />
					Upload CSV
				</Button>
			</PopoverTrigger>
			<PopoverContent align='start'>
				<Input
					type='file'
					name='file'
					ref={fileInputRef}
					accept='.csv'
					className='hidden'
					onChange={(e) => {
						if (e.target.files) {
							const file = e.target.files[0];
							const reader = new FileReader();

							reader.onload = async function (e) {
								const content = e.target?.result;
								const transactions = parseCSV(
									content?.toString() ?? '',
									selectedAccount,
								);

								await uploadTransactions(transactions);
							};

							reader.readAsText(file);
						}
						setIsOpen(false);
					}}
				/>
				{accounts.map((account: Account) => accountButton(account))}
			</PopoverContent>
		</Popover>
	);
};

export default FileUpload;
