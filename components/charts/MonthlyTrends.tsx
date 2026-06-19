import { getMonthlyTrends } from '@/lib/actions';
import { DEFAULT_USER_ID } from '@/lib/mixins';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import MonthlyTrendsChartClient from './MonthlyTrendsClient';

const MonthlyTrendsChart = async () => {
	const data = await getMonthlyTrends(DEFAULT_USER_ID);

	if (!data || data.length === 0)
		return <p>Unable to retrieve monthly trends</p>;

	return (
		<Card className='mx-auto w-full col-span-full'>
			<CardHeader>
				{/** TODO: create class for card title */}
				<CardTitle className='font-bold'>
					Spendings Trend in the last 6 Months
				</CardTitle>
			</CardHeader>
			<CardContent>
				<MonthlyTrendsChartClient data={data} />
			</CardContent>
		</Card>
	);
};

export default MonthlyTrendsChart;
