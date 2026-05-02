import { CATEGORY } from '@/app/lib/interfaces';
import {
	BalloonIcon,
	HamburgerIcon,
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

const getCategoryIcon = (category: string, className: string = '') => {
	const icons: Record<string, JSX.Element> = {
		'Food & Drinks': <HamburgerIcon className={className} />,
		Bill: <ReceiptIcon className={className} />,
		Travel: <PlaneIcon className={className} />,
		Hobby: <BalloonIcon className={className} />,
		Necessity: <WrenchIcon className={className} />,
		'Materialistic Desires': <ShoppingBagIcon className={className} />,
	};

	return icons[category];
};

const CategorySymbol = ({ category }: { category: CATEGORY }) => {
	return (
		<div
			className='rounded-full p-2'
			style={{ backgroundColor: categoryColors[category] }}
		>
			{getCategoryIcon(category)}
		</div>
	);
};

export default CategorySymbol;
