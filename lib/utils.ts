import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as fs from 'fs';
import { parse, parseString } from '@fast-csv/parse';
import { CATEGORY, Transaction } from './interfaces';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseCSV = (fileContent: string) => {
	return new Promise((resolve, reject) => {
		const transactions: Transaction[] = [];

		parseString(fileContent, { headers: true })
			.on('error', (error) => reject(error))
			.on('data', (row) => {
				const transaction: Transaction = {
					id: row['Reference Number'],
					amount: Math.abs(parseFloat(row['Amount'])),
					date: new Date(row['Posted Date']).toISOString().split('T')[0],
					rawName: row['Payee'],
					cleanName: row['Payee'],
					category: CATEGORY.MISC,
					userID: 1,
					notes: null,
				};
				transactions.push(transaction);
			})
			.on('end', () => resolve(transactions));
	});
};
