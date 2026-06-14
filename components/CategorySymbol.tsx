import {
	BalloonIcon,
	CarFrontIcon,
	LucideProps,
	PizzaIcon,
	ReceiptIcon,
	ShoppingBagIcon,
	WrenchIcon,
} from 'lucide-react';
import { JSX } from 'react';

const categoryColors: Record<string, string> = {
	'Food & Drink': '#ffefe0',
	Bill: '#e9e9e9',
	Travel: '#e6f0ff',
	Hobby: '#e6fdff',
	Necessity: '#ffe1e1',
	'Materialistic Desire': '#f7f0ff',
};

const getCategoryIcon = (category: string, otherProps?: LucideProps) => {
	const icons: Record<string, JSX.Element> = {
		'Food & Drink': <PizzaIcon {...otherProps} />,
		Bill: <ReceiptIcon {...otherProps} />,
		Travel: <CarFrontIcon {...otherProps} />,
		Hobby: <BalloonIcon {...otherProps} />,
		Necessity: <WrenchIcon {...otherProps} />,
		'Materialistic Desire': <ShoppingBagIcon {...otherProps} />,
	};

	return icons[category];
};

const CategorySymbol = ({ category }: { category: string }) => {
	return (
		<div
			className='w-10 h-10 rounded-full flex items-center justify-center'
			style={{ backgroundColor: categoryColors[category] }}
		>
			{getCategoryIcon(category, {
				height: 25,
				width: 25,
				strokeWidth: 1.5,
			})}
		</div>
	);
};

export default CategorySymbol;
