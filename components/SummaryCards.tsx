import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import {
	getMonthlySummary,
	getSpendingByCategory,
	getTopMerchant,
} from '@/lib/actions';
import { currencyFormatter } from '@/lib/utils';
import { DEFAULT_USER_ID } from '@/lib/mixins';

const MonthlySummaryCard = async () => {
	const monthlySummary = await getMonthlySummary(DEFAULT_USER_ID); // TODO: Authorization

	if (!monthlySummary) return <p>Unable to fetch monthly summary</p>;

	const percentage =
		monthlySummary.total_spending / monthlySummary.total_income;

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle className='font-bold'>Monthly Summary</CardTitle>
			</CardHeader>
			<CardContent className='flex justify-evenly'>
				<div className='flex flex-col items-center'>
					<p className='text-3xl text-income'>
						{currencyFormatter.format(monthlySummary.total_income)}
					</p>
					<p className='font-semibold'>Total Income</p>
				</div>
				<Separator orientation='vertical' className='h-12 w-0.5!' />
				<div className='flex flex-col items-center'>
					<p className={`text-3xl ${percentage > 0.85 ? 'text-spending' : ''}`}>
						{currencyFormatter.format(monthlySummary.total_spending)}
					</p>
					<p className='font-semibold'>Total Spending</p>
				</div>
			</CardContent>
		</Card>
	);
};

const CategorySpendingsCard = async () => {
	const categorySpendings = await getSpendingByCategory(DEFAULT_USER_ID);

	if (!categorySpendings) return <p>Unable to fetch spendings by category</p>;

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle className='font-bold'>
					Total Spending in each Category
				</CardTitle>
			</CardHeader>
			<CardContent>
				{categorySpendings.map((spending) => (
					<div key={spending.category} className='flex justify-between'>
						<Label>{spending.category}</Label>
						<p>{currencyFormatter.format(spending.total_spending)}</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

const TopMerchantsCard = async () => {
	const topMerchants = await getTopMerchant(1, 3);

	if (!topMerchants) return <p>Unable to fetch top merchants</p>;

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle className='font-bold'>Spendings on Top Merchants</CardTitle>
			</CardHeader>
			<CardContent>
				{topMerchants.map((merchant) => (
					<div key={merchant.merchant} className='flex justify-between'>
						<Label>{merchant.merchant}</Label>
						<p>{currencyFormatter.format(merchant.total_spending)}</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

const SummaryCards = async () => {
	return (
		<div className='flex w-full gap-3 py-5'>
			<MonthlySummaryCard />
			<CategorySpendingsCard />
			<TopMerchantsCard />
		</div>
	);
};

export default SummaryCards;
