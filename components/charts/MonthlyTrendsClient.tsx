'use client';

import { CartesianGrid, XAxis, Line, LineChart, YAxis } from 'recharts';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../ui/chart';
import { MonthlyTrendPayload } from '@/lib/mixins';
import { currencyFormatter, dateFormatter } from '@/lib/utils';

interface MonthlyTrendsChartClientProps {
	data: MonthlyTrendPayload[];
}

const MonthlyTrendsChartClient = ({ data }: MonthlyTrendsChartClientProps) => {
	const config: ChartConfig = {
		month: {
			label: 'Desktop',
			color: '#2563eb',
		},
	};

	return (
		<ChartContainer config={config} className='min-h-50 w-full h-50'>
			<LineChart
				accessibilityLayer
				data={data}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='month'
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => dateFormatter.format(value)}
				/>
				<YAxis
					dataKey='total_spending'
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => currencyFormatter.format(value)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel className='min-w-45' />}
				/>
				<Line
					dataKey='total_spending'
					type='linear'
					stroke='var(--color-spending)'
					strokeWidth={2}
					dot={false}
					name='Total Spending'
				/>
				<Line
					dataKey='total_income'
					type='linear'
					stroke='var(--color-income)'
					strokeWidth={2}
					dot={false}
					name='Total Income'
				/>
			</LineChart>
		</ChartContainer>
	);
};

export default MonthlyTrendsChartClient;
