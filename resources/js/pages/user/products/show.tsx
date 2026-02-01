import UserProductController from '@/actions/App/Http/Controllers/user/UserProductController';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/user/products';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[] | string; // Could be array or string depending on your storage method
    category_id: number;
    category: Category;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    product: Product;
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index.url(),
    },
    {
        title: 'Single Product',
        href: products.index.url(),
    },
];

export default function Show({ product }: PageProps) {
    const { flash } = usePage<{ flash?: { success?: string, error?: string } }>().props;
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Helper function to get images array
    const getImages = (): string[] => {
        if (!product.images) return [];

        if (Array.isArray(product.images)) {
            return product.images;
        }

        // If images is stored as JSON string
        try {
            const parsed = JSON.parse(product.images);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            // If images is stored as comma-separated string
            if (typeof product.images === 'string') {
                return product.images.split(',').map(img => img.trim()).filter(img => img);
            }
        }

        return [];
    };

    const images = getImages();

    // Format price with currency
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {flash.error}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Product Header */}
                    <div className="px-8 py-6 border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Added on {formatDate(product.created_at)}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <a
                                    href={products.edit.url({ product: product.id })}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Edit Product
                                </a>
                                <a
                                    href={products.index.url()}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Back to Products
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Product Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Image Gallery */}
                        <div>
                            {images.length > 0 ? (
                                <>
                                    {/* Main Image */}
                                    <div className="mb-4">
                                        <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                                src={`/storage/${images[activeImageIndex]}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {images.length > 1 && (
                                        <div className="flex space-x-4 overflow-x-auto pb-2">
                                            {images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveImageIndex(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${index === activeImageIndex
                                                        ? 'border-blue-500'
                                                        : 'border-transparent'
                                                        } hover:border-gray-300 transition-colors`}
                                                >
                                                    <img
                                                        src={`/storage/${image}`}
                                                        alt={`${product.name} - ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <svg
                                            className="w-16 h-16 mx-auto"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="mt-2">No images available</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            {/* Price */}
                            <div className="bg-blue-50 rounded-lg p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-blue-900">
                                            {formatPrice(product.price)}
                                        </h2>
                                        <p className="text-blue-700 text-sm mt-1">Price</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-gray-900">
                                            {product.category.name}
                                        </div>
                                        <p className="text-gray-600 text-sm">Category</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Description
                                </h3>
                                <div className="prose max-w-none">
                                    {product.description ? (
                                        <p className="text-gray-700 whitespace-pre-line">
                                            {product.description}
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 italic">
                                            No description provided
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Product Details
                                </h3>
                                <dl className="grid grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Product ID
                                        </dt>
                                        <dd className="text-sm text-gray-900">#{product.id}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Last Updated
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                            {formatDate(product.updated_at)}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Category
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                            {product.category.name}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Images
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                            {images.length} image{images.length !== 1 ? 's' : ''}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Category Description */}
                            {product.category.description && (
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        About {product.category.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {product.category.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="px-8 py-6 border-t bg-gray-50 flex justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Product ID: <span className="font-medium">{product.id}</span>
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this product?')) {
                                        router.delete(UserProductController.destroy.url(product.id));
                                    }
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete Product
                            </button>
                            <a
                                href={products.edit.url({ product: product.id })}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Edit Product
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}