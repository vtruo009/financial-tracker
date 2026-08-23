import { GoogleGenAI } from '@google/genai';
import * as z from 'zod';
import {
	CATEGORY,
	CHUNK_LIMIT,
	GeminiInput,
	GeminiPayload,
	TransactionInput,
} from './mixins';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY || 'No API Key',
});
// Response schema
const transactionJsonSchema = z.object({
	transactions: z
		.array(
			z.object({
				index: z.number().int(),
				clean_name: z
					.string()
					.describe(
						'A human-readable merchant name with junk like store numbers, codes, and locations stripped out.',
					),
				category: z
					.string()
					.describe(
						'The category that AI determines this transaction should be categorized as based on the clean name.',
					),
			}),
		)
		.describe('List of transactions'),
});
const transactionSchema = z.toJSONSchema(transactionJsonSchema, {
	reused: 'inline',
});

export async function cleanUpItems(
	transactions: TransactionInput[],
): Promise<TransactionInput[]> {
	const geminiInputs: GeminiInput[] = [];

	transactions.forEach((t, i) => {
		if (!t.category || t.category == CATEGORY.UNCATEGORIZED) {
			geminiInputs.push({
				index: i,
				raw_name: t.raw_name,
				amount: t.amount,
			});
		}
	});

	const total = geminiInputs.length;
	const chunks = Math.ceil(total / CHUNK_LIMIT);
	const cleanedUpItems: GeminiPayload[] = [];

	for (let i = 0; i < chunks; ++i) {
		const chunk = geminiInputs.slice(CHUNK_LIMIT * i, CHUNK_LIMIT * (i + 1));

		const prompt = `
			You are a financial transaction categorizer.
			You must categorize the transactions using the categories from this list: ${Object.values(CATEGORY).join(', ')}. Never add new categories. If unsure, use Miscellaneous. For input, you will receive an array of JSON objects containing fields: index, raw_name, amount. You can use the amount to help categorize as well. The raw_name is a string of text that contains the merchant name. Sometimes the format would be "cashier merchant (e.g. TST, SQ) + store name + location". Sometimes it's simply the store name and location. It could be all caps or contain weird characters. Your job is to clean up the name, like produce a human readable name. That should be returned in a JSON in the shape of { index: number, clean_name: string, category: string }. The input index and returned index must be the same for each item. It is used to map results back to the original transactions.

			Here is the list of transactions:
			${JSON.stringify(chunk)}
		`;

		const response = await ai.models.generateContent({
			model: 'gemini-3.6-flash',
			contents: prompt,
			config: {
				responseMimeType: 'application/json',
				responseSchema: transactionSchema,
			},
		});

		const rawJson = JSON.parse(response.text ?? 'NO response');
		cleanedUpItems.push(...rawJson.transactions);
	}

	cleanedUpItems.forEach((item: GeminiPayload) => {
		transactions[item.index].clean_name = item.clean_name;
		transactions[item.index].category = item.category;
	});

	return transactions;
}
