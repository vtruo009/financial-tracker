import { getMonthlyTrends } from '@/lib/actions';

import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import MonthlyTrendsChartClient from './MonthlyTrendsChartClient';

const MonthlyTrendsChart = async () => {
	const data = await getMonthlyTrends(1);

	if (!data || data.length == 0)
		return <p>Unable to retrieve monthly trends</p>;

	return (
		<Card className='mx-auto w-full h-full'>
			<CardHeader className='h-full'>
				<CardTitle>Spendings Trend in the last 6 Months</CardTitle>
			</CardHeader>
			<CardContent>
				<MonthlyTrendsChartClient data={data} />
			</CardContent>
		</Card>
	);
};

const DashboardCharts = async () => {
	return (
		<>
			<MonthlyTrendsChart />
		</>
	);
};

export default DashboardCharts;
