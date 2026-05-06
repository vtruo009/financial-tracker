import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Papa from 'papaparse';
import { Transaction } from './interfaces';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseCSV = (fileContent: string) => {
	const results: Papa.ParseResult<Transaction> = Papa.parse(fileContent, {
		header: true,
		skipEmptyLines: true,
	});

	if (results.errors.length > 0) {
		console.error('CSV parsing errors:', results.errors);
		// throw new Error('Failed to parse CSV')
	}

	return results.data;
};
