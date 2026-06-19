'use client';

import { LayoutDashboardIcon, Table, WalletCardsIcon } from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const AppSidebar = () => {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className='pl-6 py-6'>
				<Link href='/' className='flex items-center gap-1'>
					<Image src='/parsley.png' alt='brand logo' width={45} height={45} />
					<span className='font-bold text-4xl'>Parsley</span>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu className='pl-6'>
					<SidebarMenuItem className='py-1'>
						<SidebarMenuButton
							asChild
							isActive={pathname == '/'}
							className='bg-transparent! rounded-none data-[active=true]:border-r-3 data-[active=true]:border-r-sidebar-accent-foreground'
						>
							<Link href='/'>
								<Table />
								<span className='text-base'>Activity</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem className='py-1'>
						<SidebarMenuButton
							asChild
							isActive={pathname == '/dashboard'}
							className='bg-transparent! rounded-none data-[active=true]:border-r-3 data-[active=true]:border-r-sidebar-accent-foreground'
						>
							<Link href='/dashboard'>
								<LayoutDashboardIcon />
								<span className='text-base'>Dashboard</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem className='py-1'>
						<SidebarMenuButton
							asChild
							isActive={pathname == '/accounts'}
							className='bg-transparent! rounded-none data-[active=true]:border-r-3 data-[active=true]:border-r-sidebar-accent-foreground'
						>
							<Link href='/accounts'>
								<WalletCardsIcon />
								<span className='text-base'>Accounts</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default AppSidebar;
