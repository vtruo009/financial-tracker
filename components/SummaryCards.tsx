import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import {
	getMonthlySummary,
	getSpendingByCategory,
	getTopMerchant,
} from '@/lib/actions';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

const MonthlySummaryCard = async () => {
	const monthlySummary = await getMonthlySummary(1); // TODO: Authorization

	if (!monthlySummary) return <p>Unable to fetch monthly summary</p>;

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle>Montly Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<Label>Total Income</Label>
				<p>{formatter.format(parseFloat(monthlySummary.total_income))}</p>
				<Separator orientation='vertical' />
				<Label>Total Spending</Label>
				<p>-{formatter.format(parseFloat(monthlySummary.total_spending))}</p>
			</CardContent>
		</Card>
	);
};

const CategorySpendingsCard = async () => {
	const categorySpendings = await getSpendingByCategory(1);

	if (!categorySpendings) return <p>Unable to fetch spendings by category</p>;

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle>Total Spending in each Category</CardTitle>
			</CardHeader>
			<CardContent>
				{categorySpendings.map((spending) => (
					<div key={spending.category} className='flex justify-between'>
						<Label>{spending.category}</Label>
						<p>{formatter.format(parseFloat(spending.total_spending))}</p>
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
				<CardTitle>Spendings on Top Merchants</CardTitle>
			</CardHeader>
			<CardContent>
				{topMerchants.map((merchant) => (
					<div key={merchant.merchant} className='flex justify-between'>
						<Label>{merchant.merchant}</Label>
						<p>{formatter.format(parseFloat(merchant.total_spending))}</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

const SummaryCards = async () => {
	return (
		<>
			<MonthlySummaryCard />
			<CategorySpendingsCard />
			<TopMerchantsCard />
		</>
	);
};

export default SummaryCards;
