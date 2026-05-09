import { CATEGORY } from '@/lib/interfaces';
import {
	BalloonIcon,
	HamburgerIcon,
	LucideProps,
	PlaneIcon,
	ReceiptIcon,
	ShoppingBagIcon,
	WrenchIcon,
} from 'lucide-react';
import { JSX } from 'react';

const categoryColors: Record<string, string> = {
	'Food & Drinks': 'oklch(87% 0.1 47.43)',
	Bill: 'oklch(70% 0 0)',
	Travel: 'oklch(63.239% 0.16271 261.725)',
	Hobby: 'oklch(64.167% 0.17148 297.528)',
	Necessity: 'oklch(68.418% 0.18795 23.456)',
	'Materialistic Desires': 'oklch(89% 0.10531 178.236)',
};

const getCategoryIcon = (category: string, otherProps?: LucideProps) => {
	const icons: Record<string, JSX.Element> = {
		'Food & Drinks': <HamburgerIcon {...otherProps} />,
		Bill: <ReceiptIcon {...otherProps} />,
		Travel: <PlaneIcon {...otherProps} />,
		Hobby: <BalloonIcon {...otherProps} />,
		Necessity: <WrenchIcon {...otherProps} />,
		'Materialistic Desires': <ShoppingBagIcon {...otherProps} />,
	};

	return icons[category];
};

const CategorySymbol = ({ category }: { category: CATEGORY }) => {
	return (
		<div
			className='w-8 h-8 rounded-full flex items-center justify-center'
			style={{ backgroundColor: categoryColors[category] }}
		>
			{getCategoryIcon(category, { size: 20 })}
		</div>
	);
};

export default CategorySymbol;
