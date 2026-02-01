import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import categories from '@/routes/admin/categories';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, userallgorders, usercompletedorders, userdashboard, userorders, userpendingorders } from '@/routes';
import { type NavItem, type NavGroup, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Clipboard, Folder, Layers, LayoutGrid, Plus, ShoppingBasket, ShoppingCartIcon, User, Home, ShoppingBag, Heart, Package, CreditCard, Bell, HelpCircle } from 'lucide-react';
import AppLogo from './app-logo';
import { title } from 'process';
import products from '@/routes/admin/products';
import {index,create} from '@/routes/user/products';
import users from '@/routes/admin/users';
import { completedorders, order, pendingorders } from '@/routes/admin';



export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const adminmainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        }
    ];

    const userMainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: userdashboard(),
            icon: LayoutGrid,
        },
    ];



    const adminNavItems: NavGroup[] = [
        {
            title: 'Products management',
            items: [
                {
                    title: 'All Products',
                    href: products.index(),
                    icon: ShoppingBasket,
                },
                {
                    title: 'Create Product',
                    href: products.create(),
                    icon: Plus,
                },
            ],
        },
        {
            title: 'Categories management',
            items: [
                {
                    title: 'Categories',
                    href: categories.index(),
                    icon: Layers,
                },
                // {
                //     title: 'Create Category',
                //     href: categories.create(),
                //     icon: Plus,
                // },
            ]
        },
        {
            title: 'Users management',
            items: [
                {
                    title: 'Users',
                    href: users.index(),
                    icon: User,
                },
            ]

        },
        {
            title: 'Orders management',
            items: [
                {
                    title: 'All Orders',
                    href: order.url(),
                    icon: Clipboard,
                },
                {
                    title: 'Completed Orders',
                    href: completedorders(),
                    icon: Clipboard,
                },
                {
                    title: 'Pending Orders',
                    href: pendingorders(),
                    icon: Clipboard,
                }
            ]
        }

    ];

    const userNavItems: NavGroup[] = [
        {
            title: 'My Orders',
            items: [
                {
                    title: 'Current Orders',
                    href: userorders(),
                    icon: Package,
                },
                {
                    title: 'Completed Orders',
                    href: usercompletedorders(),
                    icon: Package,
                },
                {
                    title: 'Pending Orders',
                    href: userpendingorders(),
                    icon: ShoppingCartIcon,
                },
                {
                    title: 'Order History',
                    href: userallgorders(),
                    icon: Package,
                },
            ]
        },
        {
            title: 'Products management',
            items: [
                {
                    title: 'All Products',
                    href: index(),
                    icon: ShoppingBasket,
                },
                {
                    title: 'Create Product',
                    href: create(),
                    icon: Plus,
                },
            ],
        },
    ];

    let mainNavItems: NavItem[] = [];
    let groupNavItems: NavGroup[] = [];
    if (auth.user.roles === 'admin') {
        mainNavItems = [...adminmainNavItems];
        groupNavItems = [...adminNavItems];
    }
    if (auth.user.roles === 'user') {
        mainNavItems = [...userMainNavItems];
        groupNavItems = [...userNavItems];
    }

    const footerNavItems: NavItem[] = [
        // {
        //     title: 'Repository',
        //     href: 'https://github.com/laravel/react-starter-kit',
        //     icon: Folder,
        // },
        // {
        //     title: 'Documentation',
        //     href: 'https://laravel.com/docs/starter-kits#react',
        //     icon: BookOpen,
        // },
    ];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groupNavItems={groupNavItems} items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}