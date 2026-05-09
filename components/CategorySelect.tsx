import { CATEGORY } from '@/lib/interfaces';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectItem,
} from './ui/select';
import { Dispatch, SetStateAction } from 'react';
import { updateTransaction } from '@/lib/actions';

interface CategorySelectProps {
	transactionId: string;
	selectedCategory: string;
	setSelectedCategory: Dispatch<SetStateAction<CATEGORY>>;
	notes: string;
}

const CategorySelect = ({
	transactionId,
	selectedCategory,
	setSelectedCategory,
	notes,
}: CategorySelectProps) => {
	return (
		<Select
			value={selectedCategory.toString()}
			onValueChange={async (value) => {
				setSelectedCategory(value as CATEGORY);
				await updateTransaction(transactionId, value as CATEGORY, notes);
			}}
		>
			<SelectTrigger
				size='sm'
				className='border-0 focus-visible:ring-0 p-0 items-start text-muted-foreground'
			>
				<SelectValue placeholder={selectedCategory} />
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
	);
};

export default CategorySelect;
