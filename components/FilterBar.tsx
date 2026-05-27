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
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Field } from './ui/field';
import { Input } from './ui/input';
import { useState } from 'react';

const CategoryFilter = () => {
	const filterParams = useSearchParams();

	const selectedCategory = filterParams.get('category') ?? '';
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleChange(filter: string) {
		const params = new URLSearchParams(filterParams);
		if (selectedCategory == filter) {
			params.delete('category');
		} else {
			params.set('category', filter);
		}
		replace(`${pathname}?${params.toString()}`);
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

const Search = () => {
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(
		searchParams.get('search') ?? '',
	);
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleClick = (term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('search', term);
		} else {
			params.delete('search');
		}
		replace(`${pathname}?${params.toString()}`);
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
			<Search />
		</>
	);
};

export default FilterBar;
