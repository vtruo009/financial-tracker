'use client';

import { CATEGORY } from '@/lib/mixins';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Field } from './ui/field';
import { Input } from './ui/input';
import { useState } from 'react';
import useFilterParams from '@/lib/hooks';

const CategoryFilter = () => {
	const { searchParams, setParams, deleteParams } = useFilterParams();
	const selectedCategory = searchParams.get('category') ?? '';

	function handleChange(filter: string) {
		if (selectedCategory == filter) {
			deleteParams('category');
		} else {
			setParams('category', filter);
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='focus-visible:ring-0'>
				<Button variant='outline'>Category</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={selectedCategory}
					onValueChange={handleChange}
				>
					{Object.values(CATEGORY).map((value) => {
						return (
							<DropdownMenuRadioItem key={value} value={value}>
								{value}
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const DateFilter = () => {
	const today = new Date();
	const dateRangeMap: { [key: string]: string } = {
		'This Month': new Date(today.getFullYear(), today.getMonth(), 1)
			.toISOString()
			.split('T')[0],
		'Last Month': new Date(
			today.getFullYear(),
			today.getMonth() - 1,
			today.getDate(),
		)
			.toISOString()
			.split('T')[0],
		'Last 3 Months': new Date(
			today.getFullYear(),
			today.getMonth() - 3,
			today.getDate(),
		)
			.toISOString()
			.split('T')[0],
	};

	const { searchParams, setParams, deleteParams } = useFilterParams();
	const selectedDate = searchParams.get('startDate') ?? '';

	function handleChange(filter: string) {
		if (selectedDate == filter) {
			deleteParams('startDate');
		} else {
			setParams('startDate', filter);
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Date Range</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={selectedDate}
					onValueChange={handleChange}
				>
					{Object.entries(dateRangeMap).map((entry) => (
						<DropdownMenuRadioItem key={entry[0]} value={entry[1]}>
							{entry[0]}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const Search = () => {
	const { searchParams, setParams, deleteParams } = useFilterParams();
	const [searchTerm, setSearchTerm] = useState(
		searchParams.get('search') ?? '',
	);

	const handleClick = (searchTerm: string) => {
		if (searchTerm) {
			setParams('search', searchTerm);
		} else {
			deleteParams('search');
		}
	};

	return (
		<Field orientation='horizontal'>
			<Input
				type='search'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Button onClick={() => handleClick(searchTerm)}>Search</Button>
		</Field>
	);
};

const FilterBar = () => {
	return (
		<>
			<CategoryFilter />
			<DateFilter />
			<Search />
		</>
	);
};

export default FilterBar;
