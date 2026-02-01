
import { buynow, dashboard, details, login, register, signinform } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage, Form } from '@inertiajs/react';
import Header from './header-footer/header';
import CartController from '@/actions/App/Http/Controllers/frontend/CartController';
import CheckoutController from '@/actions/App/Http/Controllers/CheckoutController';
interface Products {
    name: string,
    id: number,
    is_active: boolean,
    description: string,
    quantity: number,
    seller_id: number,
    seller: {
        name: string,
        email: string,

    },
    price: number,
    images: string[],
    created_at: string,
    category: {
        name: string
    } | null
}

interface flash {
    success?: string;
    error?: string;
}
export default function Welcome({
    canRegister = true,
    products,
}: {
    canRegister?: boolean;
    products: Products[]
}) {
    const { auth } = usePage<SharedData>().props;
    console.log('aujhfjygfyfyfth ', auth)
    const { flash } = usePage<{ flash: flash }>().props;
    // const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    console.log(products)


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
            <Head title="Welcome to 2nd Hand Products Marketplace">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>


            <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FDFDFC] to-[#F5F5F3] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-[#0a0a0a] dark:to-[#111111]">
                <Header canRegister={canRegister} />


                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-6xl">
                        {/* Hero Section */}
                        <div className="mb-12 text-center">
                            <h1 className="mb-4 font-instrument-sans text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] lg:text-5xl">
                                Welcome to <span className="bg-gradient-to-r from-[#f53003] to-[#ff6b35] bg-clip-text text-transparent dark:from-[#FF4433] dark:to-[#FF6B35]">SecondHandMart</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-[#706f6c] dark:text-[#A1A09A]">
                                Buy, sell, and manage pre-loved items in a sustainable marketplace.
                                Give products a second life while saving money and reducing waste.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="rounded-xl bg-white/80 p-6 backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="font-instrument-sans text-2xl font-semibold">
                                            Featured Products
                                        </h2>
                                        <Link
                                            href="#"
                                            className="text-sm font-medium text-[#f53003] hover:text-[#d42900] dark:text-[#FF4433]"
                                        >
                                            View all →
                                        </Link>
                                    </div>
                                    {/* Flash messages after form submission */}
                                    {flash?.success && (
                                        <div className="w-full px-4 bg-green-100 text-green-700 rounded-lg">
                                            {flash.success}
                                        </div>
                                    )}

                                    {flash?.error && (
                                        <div className="w-full px-4 w-full bg-red-100 text-red-700 rounded-lg">
                                            {flash.error}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Product 1 */}



                                        {products?.length > 0 ? (
                                            products.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="group overflow-hidden rounded-xl border border-[#e3e3e0] bg-white transition-all hover:border-[#f53003] hover:shadow-lg dark:border-[#3E3E3A] dark:bg-[#1c1c1a] dark:hover:border-[#FF4433]"
                                                >
                                                    {/* Image Section */}
                                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="h-32 w-32 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 shadow-inner dark:from-gray-700 dark:to-gray-800">
                                                                <div className="flex h-full items-center justify-center">
                                                                    {
                                                                        (() => {
                                                                            const productImages = getProductImages(product.images);
                                                                            const firstImage = productImages.length > 0 ? productImages[0] : '';
                                                                            return (
                                                                                <img
                                                                                    src={`storage/${firstImage}`}
                                                                                    alt={product.name}
                                                                                    className="h-full w-full object-cover rounded-lg"
                                                                                />
                                                                            );
                                                                        })()
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Category Badge */}
                                                        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#f53003] backdrop-blur-sm dark:bg-black/90 dark:text-[#FF4433]">
                                                            {product.category?.name ?? 'Uncategorized'}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-4">
                                                        <div className="mb-2 flex items-center justify-between">
                                                            <h3 className="font-medium">{product.name}</h3>
                                                            <span className="text-lg font-bold text-[#f53003] dark:text-[#FF4433]">
                                                                Rs. {product.price}
                                                            </span>
                                                        </div>

                                                        {/* Seller */}
                                                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                                                            Sold by: <span className="font-medium">{product.seller?.name ?? 'Unknown'}</span>
                                                        </p>

                                                        {/* Description */}
                                                        <p className="mb-4 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                            {product.description
                                                                ? product.description.length > 100
                                                                    ? product.description.substring(0, 100) + '...'
                                                                    : product.description
                                                                : 'No description available'}
                                                        </p>

                                                        {/* Buttons */}
                                                        <div className="mb-4 flex flex-wrap gap-2">
                                                            <Form {...buynow.form()}>


                                                                {({ processing }) => (
                                                                    <>
                                                                        <input type="hidden" name="product_id" value={product.id} />
                                                                        <button className="flex-1 rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-3 py-2 text-xs font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] dark:from-[#FF4433] dark:to-[#FF6B35]">
                                                                            {processing ? 'Buying' : 'Buy now'}
                                                                        </button>
                                                                    </>
                                                                )
                                                                }
                                                            </Form>


                                                            <div>
                                                                <Form {...CartController.store.form()}>
                                                                    {({ processing }) => (
                                                                        <>
                                                                            <input type="hidden" name="product_id" value={product.id} />
                                                                            <button
                                                                                disabled={processing}
                                                                                className="flex-1 rounded-lg border border-[#f53003] px-3 py-2 text-xs font-medium text-[#f53003] transition-all hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white"
                                                                            >
                                                                                {processing ? 'Adding...' : 'Add to Cart'}
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </Form>

                                                            </div>


                                                            <Link href={details.url(product.id)} className="w-full rounded-lg border border-[#e3e3e0] px-3 py-2 text-xs font-medium text-[#706f6c] transition-all hover:border-[#f53003] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#A1A09A] dark:hover:border-[#FF4433] dark:hover:text-[#FF4433]">
                                                                View Details
                                                            </Link>
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="flex items-center justify-between text-sm">
                                                            <div className="flex items-center gap-1">
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <svg
                                                                            key={i}
                                                                            className="h-4 w-4 text-yellow-400"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                        </svg>
                                                                    ))}
                                                                </div>
                                                                <span className="ml-1 font-medium">4.8</span>
                                                            </div>
                                                            <span className="text-[#706f6c] dark:text-[#A1A09A]">2 days ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">No products found.</p>
                                        )}






                                        {/* Product 2 */}

                                        {/* <div className="group overflow-hidden rounded-xl border border-[#e3e3e0] bg-white transition-all hover:border-[#f53003] hover:shadow-lg dark:border-[#3E3E3A] dark:bg-[#1c1c1a] dark:hover:border-[#FF4433]">
                                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="h-32 w-40 rounded-lg bg-gradient-to-br from-amber-200 to-amber-300 shadow-inner dark:from-amber-700 dark:to-amber-800">
                                                        <div className="flex h-full items-center justify-center">
                                                            <svg className="h-16 w-16 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#f53003] backdrop-blur-sm dark:bg-black/90 dark:text-[#FF4433]">
                                                    Furniture
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h3 className="font-medium">Modern Leather Sofa</h3>
                                                    <span className="text-lg font-bold text-[#f53003] dark:text-[#FF4433]">
                                                        $450
                                                    </span>
                                                </div>
                                                <p className="mb-4 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    Genuine leather, excellent condition. 3-seater with matching pillows.
                                                </p> */}

                                        {/* Added Buttons Section */}
                                        {/* <div className="mb-4 flex flex-wrap gap-2">
                                                    <button className="flex-1 rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-3 py-2 text-xs font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] dark:from-[#FF4433] dark:to-[#FF6B35]">
                                                        Buy Now
                                                    </button>
                                                    <button className="flex-1 rounded-lg border border-[#f53003] px-3 py-2 text-xs font-medium text-[#f53003] transition-all hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white">
                                                        Add to Cart
                                                    </button>
                                                    <button className="w-full rounded-lg border border-[#e3e3e0] px-3 py-2 text-xs font-medium text-[#706f6c] transition-all hover:border-[#f53003] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#A1A09A] dark:hover:border-[#FF4433] dark:hover:text-[#FF4433]">
                                                        View Details
                                                    </button>
                                                </div> */}

                                        {/* <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                            <svg className="h-4 w-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </div>
                                                        <span className="ml-1 font-medium">4.5</span>
                                                    </div>
                                                    <span className="text-[#706f6c] dark:text-[#A1A09A]">1 week ago</span>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* Product 3 */}
                                        {/* <div className="group overflow-hidden rounded-xl border border-[#e3e3e0] bg-white transition-all hover:border-[#f53003] hover:shadow-lg dark:border-[#3E3E3A] dark:bg-[#1c1c1a] dark:hover:border-[#FF4433]">
                                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brown-50 to-brown-100 dark:from-brown-900/20 dark:to-brown-800/20">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="h-32 w-32 rounded-lg bg-gradient-to-br from-brown-300 to-brown-400 shadow-inner dark:from-brown-700 dark:to-brown-800">
                                                        <div className="flex h-full items-center justify-center">
                                                            <svg className="h-16 w-16 text-brown-600 dark:text-brown-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#f53003] backdrop-blur-sm dark:bg-black/90 dark:text-[#FF4433]">
                                                    Clothing
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h3 className="font-medium">Designer Leather Jacket</h3>
                                                    <span className="text-lg font-bold text-[#f53003] dark:text-[#FF4433]">
                                                        $45
                                                    </span>
                                                </div>
                                                <p className="mb-4 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    Genuine leather, size M. Minimal wear, perfect condition.
                                                </p> */}

                                        {/* Added Buttons Section */}
                                        {/* <div className="mb-4 flex flex-wrap gap-2">
                                                    <button className="flex-1 rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-3 py-2 text-xs font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] dark:from-[#FF4433] dark:to-[#FF6B35]">
                                                        Buy Now
                                                    </button>
                                                    <button className="flex-1 rounded-lg border border-[#f53003] px-3 py-2 text-xs font-medium text-[#f53003] transition-all hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white">
                                                        Add to Cart
                                                    </button>
                                                    <button className="w-full rounded-lg border border-[#e3e3e0] px-3 py-2 text-xs font-medium text-[#706f6c] transition-all hover:border-[#f53003] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#A1A09A] dark:hover:border-[#FF4433] dark:hover:text-[#FF4433]">
                                                        View Details
                                                    </button>
                                                </div> 

                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="ml-1 font-medium">4.9</span>
                                                    </div>
                                                    <span className="text-[#706f6c] dark:text-[#A1A09A]">3 days ago</span>
                                                </div>
                                            </div>
                                        </div>
                                                    */}

                                        {/* Product 4 */}

                                        {/* <div className="group overflow-hidden rounded-xl border border-[#e3e3e0] bg-white transition-all hover:border-[#f53003] hover:shadow-lg dark:border-[#3E3E3A] dark:bg-[#1c1c1a] dark:hover:border-[#FF4433]">

                                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="h-32 w-40 rounded-lg bg-gradient-to-br from-green-300 to-green-400 shadow-inner dark:from-green-700 dark:to-green-800">
                                                        <div className="flex h-full items-center justify-center">
                                                            <svg className="h-16 w-16 text-green-600 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#f53003] backdrop-blur-sm dark:bg-black/90 dark:text-[#FF4433]">
                                                    Sports
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h3 className="font-medium">Mountain Bike</h3>
                                                    <span className="text-lg font-bold text-[#f53003] dark:text-[#FF4433]">
                                                        $120
                                                    </span>
                                                </div>
                                                <p className="mb-4 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    21-speed mountain bike, aluminum frame. Recently serviced.
                                                </p>  */}

                                        {/* Added Buttons Section */}
                                        {/* <div className="mb-4 flex flex-wrap gap-2">
                                                    <button className="flex-1 rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-3 py-2 text-xs font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] dark:from-[#FF4433] dark:to-[#FF6B35]">
                                                        Buy Now
                                                    </button>
                                                    <button className="flex-1 rounded-lg border border-[#f53003] px-3 py-2 text-xs font-medium text-[#f53003] transition-all hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white">
                                                        Add to Cart
                                                    </button>
                                                    <button className="w-full rounded-lg border border-[#e3e3e0] px-3 py-2 text-xs font-medium text-[#706f6c] transition-all hover:border-[#f53003] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#A1A09A] dark:hover:border-[#FF4433] dark:hover:text-[#FF4433]">
                                                        View Details
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                            <svg className="h-4 w-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </div>
                                                        <span className="ml-1 font-medium">4.7</span>
                                                    </div>
                                                    <span className="text-[#706f6c] dark:text-[#A1A09A]">5 days ago</span>
                                                </div>
                                            </div>
                                             */}

                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Stats Card */}
                                <div className="rounded-xl bg-gradient-to-br from-white to-[#FDFDFC] p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:from-[#161615] dark:to-[#1c1c1a] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <h3 className="mb-6 font-instrument-sans text-xl font-semibold">Marketplace Stats</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Active Listings", value: "2,458", change: "+12%" },
                                            { label: "Users Online", value: "1,234", change: "+8%" },
                                            { label: "Items Sold Today", value: "89", change: "+23%" },
                                            { label: "Average Rating", value: "4.7★", change: "+0.2" }
                                        ].map((stat, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="text-[#706f6c] dark:text-[#A1A09A]">{stat.label}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{stat.value}</span>
                                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                        {stat.change}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="rounded-xl bg-gradient-to-br from-white to-[#FDFDFC] p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:from-[#161615] dark:to-[#1c1c1a] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <h3 className="mb-6 font-instrument-sans text-xl font-semibold">Quick Start</h3>
                                    <div className="space-y-3">
                                        {auth.user ? (
                                            <>
                                                <Link
                                                    href={dashboard()}
                                                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-4 py-3 text-sm font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] dark:from-[#FF4433] dark:to-[#FF6B35]"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    View Dashboard
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="flex items-center justify-center gap-2 rounded-lg border border-[#f53003] px-4 py-3 text-center text-sm font-medium text-[#f53003] transition-all hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    List an Item
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={register()}
                                                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-4 py-3 text-sm font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] dark:from-[#FF4433] dark:to-[#FF6B35]"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                    </svg>
                                                    Create Account
                                                </Link>
                                                <Link
                                                    href={signinform()}
                                                    className="flex items-center justify-center gap-2 rounded-lg border border-[#f53003] px-4 py-3 text-center text-sm font-medium text-[#f53003] transition-all hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign In
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="rounded-xl bg-gradient-to-br from-white to-[#FDFDFC] p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:from-[#161615] dark:to-[#1c1c1a] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <h3 className="mb-6 font-instrument-sans text-xl font-semibold">Top Categories</h3>
                                    <div className="space-y-2">
                                        {[
                                            { name: "Electronics", count: "1,234", icon: "💻" },
                                            { name: "Furniture", count: "890", icon: "🛋️" },
                                            { name: "Clothing", count: "2,345", icon: "👕" },
                                            { name: "Books", count: "567", icon: "📚" },
                                            { name: "Sports Equipment", count: "432", icon: "⚽" },
                                            { name: "Home Appliances", count: "678", icon: "🏠" },
                                            { name: "Automotive", count: "234", icon: "🚗" },
                                            { name: "Toys", count: "456", icon: "🧸" }
                                        ].map((category) => (
                                            <a
                                                key={category.name}
                                                href="#"
                                                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-[#f53003]/5 hover:text-[#f53003] dark:hover:bg-[#FF4433]/10 dark:hover:text-[#FF4433]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">{category.icon}</span>
                                                    <span>{category.name}</span>
                                                </div>
                                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800">
                                                    {category.count}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[
                                {
                                    title: "Secure Transactions",
                                    description: "Protected payments and verified user profiles for safe trading",
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Quality Assurance",
                                    description: "All items verified and rated by community for quality assurance",
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Eco-Friendly",
                                    description: "Join sustainable shopping and reduce waste by giving products second life",
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    )
                                }
                            ].map((feature, index) => (
                                <div key={index} className="group rounded-xl bg-gradient-to-br from-white to-[#FDFDFC] p-6 text-center shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] transition-all hover:shadow-lg dark:from-[#161615] dark:to-[#1c1c1a] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#f53003] to-[#ff6b35] text-white transition-transform group-hover:scale-110 dark:from-[#FF4433] dark:to-[#FF6B35]">
                                        {feature.icon}
                                    </div>
                                    <h4 className="mb-2 font-medium">{feature.title}</h4>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="mt-12 w-full max-w-6xl border-t border-[#e3e3e0] pt-6 text-center text-sm text-[#706f6c] dark:border-[#3E3E3A] dark:text-[#A1A09A]">
                    <p>© 2024 SecondHandMart. All rights reserved. Making sustainable shopping accessible to everyone.</p>
                    <div className="mt-4 flex justify-center gap-6">
                        <a href="#" className="hover:text-[#f53003] dark:hover:text-[#FF4433]">Terms</a>
                        <a href="#" className="hover:text-[#f53003] dark:hover:text-[#FF4433]">Privacy</a>
                        <a href="#" className="hover:text-[#f53003] dark:hover:text-[#FF4433]">Help Center</a>
                        <a href="#" className="hover:text-[#f53003] dark:hover:text-[#FF4433]">Contact</a>
                    </div>
                </footer>
            </div>
        </>
    );
}