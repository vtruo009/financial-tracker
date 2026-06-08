import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const useFilterParams = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const setParams = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set(key, value);
		replace(`${pathname}?${params.toString()}`);
	};

	const deleteParams = (key: string) => {
		const params = new URLSearchParams(searchParams);
		params.delete(key);
		replace(`${pathname}?${params.toString()}`);
	};

	return { searchParams, setParams, deleteParams };
};

export default useFilterParams;
