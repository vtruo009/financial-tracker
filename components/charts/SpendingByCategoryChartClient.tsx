'use client';

import { CategorySpendingPayload } from '@/lib/mixins';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../ui/chart';
import { Label, Pie, PieChart } from 'recharts';
import { currencyFormatter } from '@/lib/utils';

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
	let grandTotal = 0;
	for (const row of data) {
		grandTotal += row.total_spending;
	}

	return (
		<ChartContainer
			config={config}
			className='mx-auto aspect-square max-h-65 h-65'
		>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel className='min-w-40' />}
				/>
				<Pie
					data={data}
					dataKey='total_spending'
					nameKey='category'
					innerRadius={65}
					strokeWidth={10}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor='middle'
										dominantBaseline='middle'
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className='fill-foreground text-3xl font-bold'
										>
											{currencyFormatter.format(grandTotal)}
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
};

export default SpendingByCategoryChartClient;
