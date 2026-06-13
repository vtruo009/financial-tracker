'use client';

import { LayoutDashboardIcon, Table } from 'lucide-react';
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
			<SidebarHeader className='flex flex-row items-center gap-3'>
				<Image src='/parsley.png' alt='brand logo' width={64} height={64} />
				<span className='font-semibold text-2xl'>Parsley</span>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu className='pl-3'>
					<SidebarMenuItem className='py-1'>
						<SidebarMenuButton
							asChild
							isActive={pathname == '/'}
							className='bg-transparent! rounded-none data-[active=true]:border-r-3 data-[active=true]:border-r-sidebar-accent-foreground'
						>
							<Link href='/'>
								<Table />
								<span>Activity</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem className='py-1'>
						<SidebarMenuButton asChild isActive={pathname == '/dashboard'}>
							<Link href='/dashboard'>
								<LayoutDashboardIcon />
								<span>Dashboard</span>
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
