import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Package, ShoppingCart, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface AdminDashboardProps {
    orders: number;
    completeorders: number;
    pendingorders: number;
    totalproducts: number;
    recentOrders?: Array<any>; // Optional: Add if you have recent orders data
    revenue?: number; // Optional: Add if you have revenue data
}

export default function AdminDashboard({
    orders,
    completeorders,
    pendingorders,
    totalproducts,
    recentOrders = [],
    revenue = 0
}: AdminDashboardProps) {
    const { auth } = usePage<SharedData>().props;

    // Calculate statistics
    const completionRate = orders > 0 ? Math.round((completeorders / orders) * 100) : 0;
    const pendingRate = orders > 0 ? Math.round((pendingorders / orders) * 100) : 0;

    const statCards = [
        {
            title: 'Total Products',
            value: totalproducts.toLocaleString(),
            icon: Package,
            color: 'bg-blue-500',
            textColor: 'text-blue-600',
            description: 'Products in catalog',
            trend: '+12%' // You can make this dynamic
        },
        {
            title: 'Total Orders',
            value: orders.toLocaleString(),
            icon: ShoppingCart,
            color: 'bg-green-500',
            textColor: 'text-green-600',
            description: 'All-time orders',
            trend: '+24%'
        },
        {
            title: 'Completed Orders',
            value: completeorders.toLocaleString(),
            icon: CheckCircle,
            color: 'bg-emerald-500',
            textColor: 'text-emerald-600',
            description: `${completionRate}% completion rate`,
            trend: `+${completionRate}%`
        },
        {
            title: 'Pending Orders',
            value: pendingorders.toLocaleString(),
            icon: Clock,
            color: 'bg-amber-500',
            textColor: 'text-amber-600',
            description: `${pendingRate}% pending rate`,
            trend: `${pendingorders > 0 ? 'Attention' : 'All clear'}`
        },
        {
            title: 'Total Revenue',
            value: `$${revenue.toLocaleString()}`,
            icon: TrendingUp,
            color: 'bg-purple-500',
            textColor: 'text-purple-600',
            description: 'Gross revenue',
            trend: '+18%'
        },
    ];
    const pieData = [
        { name: 'Completed', value: completeorders },
        { name: 'Pending', value: pendingorders },
    ];

    const COLORS = ['#10b981', '#f59e0b']; // emerald & amber
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Header */}
                <div className="mb-2">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {auth.user?.name || 'Admin'}. Here's what's happening with your store today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`rounded-full p-2 ${stat.color} bg-opacity-10`}>
                                        <Icon className={`h-4 w-4 ${stat.textColor}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stat.description}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <span className={`text-xs font-medium ${stat.textColor}`}>
                                            {stat.trend}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Pie Chart */}
                <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Orders Distribution</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Orders Overview */}
                    <Card className="lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Orders Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Total Orders</p>
                                        <p className="text-2xl font-bold">{orders.toLocaleString()}</p>
                                    </div>
                                    <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                                                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Completed</p>
                                                <p className="text-2xl font-bold">{completeorders.toLocaleString()}</p>
                                                <p className="text-xs text-muted-foreground">{completionRate}% of total</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                                                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Pending</p>
                                                <p className="text-2xl font-bold">{pendingorders.toLocaleString()}</p>
                                                <p className="text-xs text-muted-foreground">{pendingRate}% of total</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Order Completion</span>
                                        <span>{completionRate}%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                        <div
                                            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                            style={{ width: `${completionRate}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}