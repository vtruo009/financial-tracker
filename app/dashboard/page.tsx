import MonthlyTrendsChart from '@/components/charts/MonthlyTrends';
import SpendingByCategoryChart from '@/components/charts/SpendingByCategory';

const Dashboard = () => {
	return (
		<section className='py-8 px-16 grid grid-flow-row gap-4 md:grid-cols-2 xl:grid-cols-3'>
			<MonthlyTrendsChart />
			<SpendingByCategoryChart />
		</section>
	);
};

export default Dashboard;
