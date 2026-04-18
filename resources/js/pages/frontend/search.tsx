import { buynow, dashboard, details, login, register, signinform } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage, Form } from '@inertiajs/react';
import Header from './header-footer/header';
import CartController from '@/actions/App/Http/Controllers/frontend/CartController';

interface Products {
    name: string;
    id: number;
    is_active: boolean;
    description: string;
    quantity: number;
    views: number;
    total_sold: number;
    seller_id: number;
    seller: {
        name: string;
        email: string;
    };
    price: number;
    images: string | string[];
    created_at: string;
    category: {
        name: string;
    } | null;
}

interface Flash {
    success?: string;
    error?: string;
}

export default function Welcome({
    canRegister = true,
    products,
}: {
    canRegister?: boolean;
    products: Products[];
}) {
    const { auth } = usePage<SharedData>().props;
    const { flash } = usePage<{ flash: Flash }>().props;

    const safeProducts = products ?? [];

    const getProductImages = (images: string | string[]): string[] => {
        if (Array.isArray(images)) return images;
        try {
            return JSON.parse(images);
        } catch {
            return [];
        }
    };

    return (
        <>
            <Head title="Welcome to 2nd Hand Products Marketplace" />

            <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FDFDFC] to-[#F5F5F3] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-[#0a0a0a] dark:to-[#111111]">

                <Header canRegister={canRegister} />

                <main className="w-full max-w-6xl">

                    {/* HERO */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
                            Welcome to <span className="text-transparent bg-gradient-to-r from-[#f53003] to-[#ff6b35] bg-clip-text">
                                SecondHandMart
                            </span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-[#706f6c] dark:text-[#A1A09A]">
                            Buy, sell, and manage pre-loved items in a sustainable marketplace.
                        </p>
                    </div>

                    {/* FLASH */}
                    {flash?.success && (
                        <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-700">
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">
                            {flash.error}
                        </div>
                    )}

                    {/* PRODUCTS GRID */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {safeProducts.length > 0 ? (
                            safeProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-lg dark:bg-[#1c1c1a]"
                                >

                                    {/* IMAGE */}
                                    <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        {(() => {
                                            const imgs = getProductImages(product.images);
                                            const img = imgs[0] || '';
                                            return (
                                                <img
                                                    src={`storage/${img}`}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            );
                                        })()}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4">

                                        <div className="flex justify-between">
                                            <h3 className="font-medium">{product.name}</h3>
                                            <span className="font-bold text-[#f53003]">
                                                Rs. {product.price}
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-500">
                                            {product.seller?.name ?? 'Unknown'}
                                        </p>

                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                            {product.description?.slice(0, 100) ?? 'No description'}
                                        </p>

                                        {/* BUTTONS */}
                                        <div className="mt-4 flex flex-wrap gap-2">

                                            {/* BUY NOW */}
                                            <Form {...buynow.form()}>
                                                {({ processing }) => (
                                                    <>
                                                        <input type="hidden" name="product_id" value={product.id} />
                                                        <button className="flex-1 bg-orange-500 px-3 py-2 text-white text-xs rounded">
                                                            {processing ? 'Buying...' : 'Buy Now'}
                                                        </button>
                                                    </>
                                                )}
                                            </Form>

                                            {/* CART */}
                                            <Form {...CartController.store.form()}>
                                                {({ processing }) => (
                                                    <>
                                                        <input type="hidden" name="product_id" value={product.id} />
                                                        <button className="flex-1 border px-3 py-2 text-xs rounded">
                                                            {processing ? 'Adding...' : 'Add to Cart'}
                                                        </button>
                                                    </>
                                                )}
                                            </Form>

                                            {/* DETAILS */}
                                            <Link
                                                href={details.url(product.id)}
                                                className="w-full text-center border px-3 py-2 text-xs rounded"
                                            >
                                                View Details
                                            </Link>

                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                No products found
                            </p>
                        )}

                    </div>

                </main>
            </div>
        </>
    );
}