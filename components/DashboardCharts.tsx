import { getMonthlyTrends, getSpendingByCategory } from '@/lib/actions';

import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import MonthlyTrendsChartClient from './MonthlyTrendsChartClient';
import SpendingByCategoryChartClient from './SpendingByCategoryChartClient';
import { DEFAULT_USER_ID } from '@/lib/mixins';

const MonthlyTrendsChart = async () => {
	const data = await getMonthlyTrends(DEFAULT_USER_ID);

	if (!data || data.length === 0)
		return <p>Unable to retrieve monthly trends</p>;

	return (
		<Card className='mx-auto w-full h-full'>
			<CardHeader>
				<CardTitle>Spendings Trend in the last 6 Months</CardTitle>
			</CardHeader>
			<CardContent>
				<MonthlyTrendsChartClient data={data} />
			</CardContent>
		</Card>
	);
};

const SpendingByCategoryChart = async () => {
	const data = await getSpendingByCategory(DEFAULT_USER_ID); // TODO: Authorization

	if (!data || data.length === 0)
		return <p>Unable to retrieve spendings by category</p>;

	const chartData = data.map((item, index) => ({
		...item,
		fill: `var(--chart-${index + 1})`,
	}));

	return (
		<Card className='mx-auto w-full h-full'>
			<CardHeader>
				<CardTitle>Spending by Category</CardTitle>
			</CardHeader>
			<CardContent>
				<SpendingByCategoryChartClient data={chartData} />
			</CardContent>
		</Card>
	);
};

const DashboardCharts = async () => {
	return (
		<>
			<MonthlyTrendsChart />
			<SpendingByCategoryChart />
		</>
	);
};

export default DashboardCharts;
