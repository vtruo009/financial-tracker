import {
	AppleIcon,
	BalloonIcon,
	BicepsFlexedIcon,
	CarFrontIcon,
	CreditCardIcon,
	FolderIcon,
	LandmarkIcon,
	LucideProps,
	PizzaIcon,
	ReceiptIcon,
	ShoppingBagIcon,
	TreePalmIcon,
	WrenchIcon,
} from 'lucide-react';
import { JSX } from 'react';

const categoryColors: Record<string, string> = {
	Housing: '#fff9d9',
	Dining: '#ffefe0',
	'Health & Wellbeing': '#e6fdff',
	Groceries: '#ffe1e1',
	Transportation: '#e6f0ff',
	Travel: '#ffeaff',
	'Materialistic Desire': '#f7f0ff',
	'Credit Card Payment': '#e9e9e9',
	'Debt Payment': '#e9e9e9',
	Miscellaneous: '#e9e9e9',
};

const getCategoryIcon = (category: string, otherProps?: LucideProps) => {
	const icons: Record<string, JSX.Element> = {
		Dining: <PizzaIcon {...otherProps} />,
		'Health & Wellbeing': <BicepsFlexedIcon {...otherProps} />,
		Transportation: <CarFrontIcon {...otherProps} />,
		Travel: <TreePalmIcon {...otherProps} />,
		Groceries: <AppleIcon {...otherProps} />,
		'Materialistic Desire': <ShoppingBagIcon {...otherProps} />,
		'Credit Card Payment': <CreditCardIcon {...otherProps} />,
		'Debt Payment': <LandmarkIcon {...otherProps} />,
		Miscellaneous: <FolderIcon {...otherProps} />,
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
