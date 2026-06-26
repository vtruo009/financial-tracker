import { getSpendingByCategory } from '@/lib/actions';
import { DEFAULT_USER_ID } from '@/lib/mixins';
import SpendingByCategoryChartClient from './SpendingByCategoryChartClient';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const SpendingByCategoryChart = async () => {
	const data = await getSpendingByCategory(DEFAULT_USER_ID); // TODO: Authorization

	if (!data || data.length === 0)
		return <p>Unable to retrieve spendings by category</p>;

	const chartData = data.map((item, index) => ({
		...item,
		fill: `var(--chart-${index + 1})`,
	}));

	return (
		<Card>
			<CardHeader>
				<CardTitle className='font-bold'>Spending by Category</CardTitle>
			</CardHeader>
			<CardContent>
				<SpendingByCategoryChartClient data={chartData} />
			</CardContent>
		</Card>
	);
};

export default SpendingByCategoryChart;
