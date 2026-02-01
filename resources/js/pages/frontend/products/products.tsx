import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { dashboard, details, login, register } from '@/routes';
import Header from '../header-footer/header';

/* =======================
   TYPES
======================= */

interface Category {
    id: number;
    name: string;
    icon?: string;
    product_count?: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    original_price?: number;
    discount_percent?: number;
    rating: number;
    review_count: number;
    images: string;

    category: {
        id: number;
        name: string;
    };

    is_new: boolean;
    is_featured: boolean;
    stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';

    seller: {
        name: string;
        verified: boolean;
    };
}

/* =======================
   COMPONENT
======================= */

export default function Products({
    products,
    categories,
    canRegister = true,

}: {
    canRegister?: boolean;
    products: Product[];
    categories: Category[];
}) {
    const { auth } = usePage<SharedData>().props;

    const getProductImages = (images: string | string[]): string[] => {
        if (Array.isArray(images)) {
            return images;
        }
        try {
            return JSON.parse(images);
        } catch {
            return [];
        }
    };


    return (
        <>
            <Head title="Browse Products | SecondHandMart" />

            <div className="min-h-screen bg-gray-50 p-6">
                <Header canRegister={canRegister} />
                <main className="max-w-7xl mx-auto flex gap-8">

                    {/* =======================
                       SIDEBAR
                    ======================= */}
                    <aside className="w-1/4">
                        <div className="bg-white rounded-xl p-6 shadow">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>

                            <div className="space-y-2">
                                {categories.map(category => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{category.icon ?? '📦'}</span>
                                            <span className="text-sm">{category.name}</span>
                                        </div>

                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                            {category.product_count ?? 0}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* =======================
                       PRODUCTS
                    ======================= */}
                    <section className="w-3/4">
                        {products.length ? (
                            <div className="grid grid-cols-3 gap-6">
                                {products.map(product => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-xl p-4 shadow flex flex-col"
                                    >
                                        <h3 className="font-medium line-clamp-1">
                                            {product.name}
                                        </h3>

                                        {/* ✅ FIXED: category is object */}
                                        <p className="text-sm text-gray-500 mb-2">
                                            {product.category.name}
                                        </p>

                                        {
                                            (() => {
                                                const productImages = getProductImages(product.images);
                                                const firstImage = productImages.length > 0 ? productImages[0] : '';
                                                return (
                                                    <div className="h-40 w-full overflow-hidden rounded-lg mb-3">
                                                        <img
                                                            src={`storage/${firstImage}`}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                );
                                            })()
                                        }

                                        <div className="mt-auto">
                                            <p className="text-lg font-bold text-red-500 mb-3">
                                                Rs. {product.price.toLocaleString()}
                                            </p>

                                            <Link
                                                href={details.url(product.id)}
                                                className="block text-center rounded-lg bg-red-500 hover:bg-red-600 text-white py-2.5 text-sm transition-colors duration-200"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-12 text-center shadow">
                                <p className="text-gray-500 text-lg">No products found</p>
                            </div>
                        )}
                    </section>

                </main>
            </div>
        </>
    );
}
