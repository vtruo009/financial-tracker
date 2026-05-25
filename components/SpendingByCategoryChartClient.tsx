'use client';

import { CATEGORY, CategorySpendingPayload } from '@/lib/interfaces';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from './ui/chart';
import { Pie, PieChart } from 'recharts';

interface SpendingByCategoryChartClientProps {
	data: CategorySpendingPayload[];
}

const SpendingByCategoryChartClient = ({
	data,
}: SpendingByCategoryChartClientProps) => {
	const config: ChartConfig = {
		total_spending: {
			label: 'Spending',
		},
	};

	return (
		<ChartContainer config={config}>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={data}
					dataKey='total_spending'
					nameKey='category'
					innerRadius={60}
				/>
			</PieChart>
		</ChartContainer>
	);
};

export default SpendingByCategoryChartClient;
