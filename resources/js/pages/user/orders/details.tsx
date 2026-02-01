import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { order, ordersdetails } from '@/routes/admin';
import ProductController from '@/actions/App/Http/Controllers/ProductController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: order.url(),
    },
    {
        title: 'Order Details',
        href: order.url(),
    },
];
// types/orders.ts
export interface Product {
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

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    two_factor_confirmed_at: string | null;
    roles: string;
}

export interface Order {
    id: number;
    user_id: number;
    total_price: number;
    status: string;
    created_at: string;
    updated_at: string;
    transactionuuid: string | null;
    orderitems: OrderItem[];
    user: User;
}

export interface OrderDetailsProps {
    ordersdetails: Order;
}

export interface OrdersListProps {
    orders: Order[];
}

const OrdersDetails = ({ ordersdetails }: OrderDetailsProps) => {
    if (!ordersdetails) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Order Not Found" />
                <div className="p-6">
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900">Order not found</h3>
                        <p className="mt-1 text-sm text-gray-500">The order you're looking for doesn't exist.</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

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

    const parseImages = (imagesString: string): string[] => {
        try {
            const parsed = JSON.parse(imagesString);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            return imagesString.split(',').map(img => img.trim()).filter(img => img);
        }
    };

    const calculateSubtotal = () => {
        return ordersdetails.orderitems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        const subtotal = calculateSubtotal();
        return subtotal * 0.10; // Assuming 10% tax
    };

    const calculateShipping = () => {
        return ordersdetails.total_price > 100 ? 0 : 10; // Free shipping over $100
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order details #${ordersdetails.id}`} />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Order #{ordersdetails.id}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Placed on {formatDate(ordersdetails.created_at)}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href={order.url()}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back to Orders
                            </Link>
                            {getStatusBadge(ordersdetails.status)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Details - Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Name:</span>
                                    <p className="text-gray-900">{ordersdetails.user.name}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Email:</span>
                                    <p className="text-gray-900">{ordersdetails.user.email}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Role:</span>
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {ordersdetails.user.roles}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Member Since:</span>
                                    <p className="text-gray-900">
                                        {new Date(ordersdetails.user.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
                            </div>
                            <div className="divide-y">
                                {ordersdetails.orderitems.map((item) => {
                                    const images = parseImages(item.product.images);
                                    return (
                                        <div key={item.id} className="p-6 flex items-center">
                                            <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                                                {images.length > 0 ? (
                                                    <img
                                                        src={`/storage/${images[0]}`}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://placehold.co/100x100/cccccc/666666?text=${encodeURIComponent(item.product.name.substring(0, 2))}`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                                                        <span className="text-gray-400 text-xs">No image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    <Link href={ProductController.show.url(item.product.id)}>
                                                        {item.product.name}
                                                    </Link>
                                                </h3>
                                                <p className="text-sm text-gray-500 line-clamp-1">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                            <div className="ml-4 text-right">
                                                <p className="text-sm font-medium text-gray-900">
                                                    ${item.price.toFixed(2)} × {item.quantity}
                                                </p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary - Right Column */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">
                                        ${calculateShipping().toFixed(2)}
                                    </span>
                                </div>
                                <div className="border-t pt-3 flex justify-between">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        ${ordersdetails.total_price.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Information</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Transaction UUID:</span>
                                    <p className="text-gray-900 font-mono text-sm break-all">
                                        {ordersdetails.transactionuuid || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Order ID:</span>
                                    <p className="text-gray-900">#{ordersdetails.id}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Order Date:</span>
                                    <p className="text-gray-900">{formatDate(ordersdetails.created_at)}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                                    <p className="text-gray-900">{formatDate(ordersdetails.updated_at)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h2>
                            <div className="space-y-3">
                                <button
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={() => window.print()}
                                >
                                    Print Invoice
                                </button>
                                <Link
                                    href={`mailto:${ordersdetails.user.email}`}
                                    className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Contact Customer
                                </Link>
                                <button
                                    className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to cancel this order?')) {
                                            // Handle cancel order
                                        }
                                    }}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default OrdersDetails;