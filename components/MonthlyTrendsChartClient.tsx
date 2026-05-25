'use client';

import { CartesianGrid, XAxis, Line, LineChart, YAxis } from 'recharts';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from './ui/chart';
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
		<ChartContainer config={config}>
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
					content={<ChartTooltipContent hideLabel />}
				/>
				<Line
					dataKey='total_spending'
					type='linear'
					stroke='var(--color-month)'
					strokeWidth={2}
					dot={false}
					name='Total Spending'
				/>
			</LineChart>
		</ChartContainer>
	);
};

export default MonthlyTrendsChartClient;
