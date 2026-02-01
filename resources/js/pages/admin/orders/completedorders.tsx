import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { completedorders, ordersdetails } from '@/routes/admin';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Completed Orders',
        href: completedorders.url(), // Update with your actual route
    },
];

// Define TypeScript interfaces
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string;
    quantity: number;
    is_active: number;
    seller_id: number;
    category_id: number;
    created_at: string;
    updated_at: string;
}

interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    two_factor_confirmed_at: string | null;
    roles: string;
}

interface Order {
    id: number;
    user_id: number;
    total_price: number;
    status: string;
    created_at: string;
    updated_at: string;
    transactionuuid: string;
    orderitems: OrderItem[];
    user: User;
}

interface IndexProps {
    orders: Order[];
}

const CompletedOrders = ({ orders }: IndexProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
        };

        const style = statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getTotalRevenue = () => {
        return orders.reduce((total, order) => total + order.total_price, 0);
    };

    const parseImages = (imagesString: string): string[] => {
        try {
            const parsed = JSON.parse(imagesString);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            return imagesString.split(',').map(img => img.trim());
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Completed Orders" />
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-gray-600 mt-1">
                            {orders.length} orders • Total Revenue: ${getTotalRevenue().toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        View Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                #{order.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {order.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.user.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={ordersdetails(order.transactionuuid)}>Click Here to view details</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-2">
                                                {order.orderitems.length}
                                                {/* {order.orderitems.map((item) => (
                                                    <div key={item.id} className="flex items-center space-x-3">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                                                            {(() => {
                                                                const images = parseImages(item.product.images);
                                                                return images.length > 0 ? (
                                                                    <img
                                                                        src={`/storage/${images[0]}`}
                                                                        alt={item.product.name}
                                                                        className="h-full w-full object-cover rounded-md"
                                                                    />
                                                                ) : (
                                                                    <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-md">
                                                                        <span className="text-gray-400">No image</span>
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {item.product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                Qty: {item.quantity} × ${item.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))} */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ${order.total_price.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(order.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 font-mono text-xs">
                                                {order.transactionuuid}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">📦</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                            <p className="text-gray-500">When orders are placed, they will appear here.</p>
                        </div>
                    )}
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{orders.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            ${getTotalRevenue().toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
                        <p className="text-2xl font-bold text-yellow-600 mt-2">
                            {orders.filter(o => o.status === 'pending').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Unique Products</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            {new Set(orders.flatMap(o => o.orderitems.map(i => i.product_id))).size}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CompletedOrders;