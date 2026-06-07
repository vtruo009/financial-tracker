'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
	PaginationEllipsis,
} from './ui/pagination';
import { LIMIT } from '@/lib/mixins';

interface TransactionPaginationProps {
	totalTransactions: number;
}

const CompactPagination = ({
	currPage,
	totalPages,
	handleClick,
}: {
	currPage: number;
	totalPages: number;
	handleClick: (newPage: number) => void;
}) => {
	if (currPage <= 3) {
		return (
			<>
				{Array.from({ length: currPage }, (_, i) => i + 2).map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							isActive={page == currPage}
							aria-disabled={page == currPage}
							className={page == currPage ? 'pointer-events-none' : ''}
							onClick={() => handleClick(page)}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationEllipsis />
			</>
		);
	} else if (currPage >= totalPages - 2) {
		return (
			<>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				{Array.from(
					{ length: totalPages - currPage + 1 },
					(_, i) => i + currPage - 1,
				).map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							isActive={page == currPage}
							aria-disabled={page == currPage}
							className={page == currPage ? 'pointer-events-none' : ''}
							onClick={() => handleClick(page)}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
			</>
		);
	} else {
		return (
			<>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink onClick={() => handleClick(currPage - 1)}>
						{currPage - 1}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						isActive={true}
						aria-disabled={true}
						className='pointer-events-none'
					>
						{currPage}
					</PaginationLink>
				</PaginationItem>
				{currPage + 1 < totalPages && (
					<>
						<PaginationItem>
							<PaginationLink onClick={() => handleClick(currPage + 1)}>
								{currPage + 1}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</>
				)}
			</>
		);
	}
};

const SmartPagination = ({ totalTransactions }: TransactionPaginationProps) => {
	const pageParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const currentPage = parseInt(pageParams.get('page') ?? '1');
	const totalPages = Math.ceil(totalTransactions / LIMIT);

	function handleClick(newPage: number) {
		const params = new URLSearchParams(pageParams);
		if (currentPage != newPage) {
			params.set('page', newPage.toString());
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						aria-disabled={currentPage <= 1}
						className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
						onClick={() => handleClick(currentPage - 1)}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						isActive={currentPage == 1}
						aria-disabled={currentPage == 1}
						className={currentPage == 1 ? 'pointer-events-none' : ''}
						onClick={() => handleClick(1)}
					>
						1
					</PaginationLink>
				</PaginationItem>

				{totalPages > 7 ? (
					<CompactPagination
						currPage={currentPage}
						totalPages={totalPages}
						handleClick={handleClick}
					/>
				) : (
					Array.from({ length: totalPages - 2 }, (_, i) => i + 2).map(
						(page) => (
							<PaginationItem key={page}>
								<PaginationLink
									isActive={page == currentPage}
									aria-disabled={page == currentPage}
									className={page == currentPage ? 'pointer-events-none' : ''}
									onClick={() => handleClick(page)}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						),
					)
				)}

				{totalPages > 1 && (
					<PaginationItem>
						<PaginationLink
							isActive={currentPage == totalPages}
							onClick={() => handleClick(totalPages)}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext
						aria-disabled={currentPage == totalPages}
						className={
							currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
						}
						onClick={() => handleClick(currentPage + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default SmartPagination;
