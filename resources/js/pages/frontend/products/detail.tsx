import { dashboard, details, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Header from '../header-footer/header';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[] | string; // Updated to accept both array and string
    quantity: number;
    is_active: number | boolean;
    seller_id: number;
    category_id: number;
    created_at: string;
    updated_at: string;
    category: {
        id: number;
        name: string;
        description: string;
        created_at: string | null;
        updated_at: string | null;
    } | null;
    seller: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
        two_factor_confirmed_at: string | null;
        roles: string;
    };
}

interface ProductPageProps {
    product: Product;
    relatedProducts?: Product[];
    canRegister?: boolean;
}

export default function ProductPage({
    product,
    relatedProducts = [],
    canRegister = true,
}: ProductPageProps) {
    const { auth } = usePage<SharedData>().props;
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // Convert is_active to boolean for easier handling
    const isActive = Boolean(product.is_active);

    // Fix: Ensure productImages is always an array
    const getProductImages = (): string[] => {
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

    const productImages = getProductImages();
    const imageCount = productImages.length;
    const hasImages = imageCount > 0;

    // Format date
    const formattedDate = new Date(product.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Handle quantity changes
    const handleQuantityChange = (value: number) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1 && newQuantity <= product.quantity) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        console.log('Added to cart:', {
            productId: product.id,
            productName: product.name,
            quantity,
            price: product.price,
            total: product.price * quantity
        });
        // Implement cart logic here
    };

    const handleBuyNow = () => {
        console.log('Buy now:', {
            productId: product.id,
            productName: product.name,
            quantity,
            price: product.price,
            total: product.price * quantity
        });
        // Implement buy now logic here
    };

    const handleContactSeller = () => {
        console.log('Contact seller:', product.seller.email);
        // Implement contact logic here
    };

    // Function to get full image URL (adjust based on your setup)
    const getImageUrl = (imagePath: string) => {
        // If imagePath is already a full URL, return it
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        // Otherwise, construct the URL from your storage
        return `/storage/${imagePath}`;
    };

    return (
        <>
            <Head title={`${product.name} - SecondHandMart`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                {/* Add meta tags for SEO */}
                <meta name="description" content={product.description.substring(0, 160)} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description.substring(0, 160)} />
                {hasImages && (
                    <meta property="og:image" content={getImageUrl(productImages[0])} />
                )}
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FDFDFC] to-[#F5F5F3] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-[#0a0a0a] dark:to-[#111111]">
                {/* Header */}
                <Header canRegister={canRegister} />

                {/* Main Content */}
                <div className="w-full max-w-6xl">
                    {/* Breadcrumb */}
                    <div className="mb-6 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        <Link href="/" className="hover:text-[#f53003] dark:hover:text-[#FF4433]">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        {product.category && (
                            <>
                                <Link
                                    href={`/category/${product.category.id}`}
                                    className="hover:text-[#f53003] dark:hover:text-[#FF4433]"
                                >
                                    {product.category.name}
                                </Link>
                                <span className="mx-2">/</span>
                            </>
                        )}
                        <span className="text-[#1b1b18] dark:text-[#EDEDEC]">{product.name}</span>
                    </div>

                    {/* Product Details */}
                    <div className="mb-12 rounded-xl bg-white/80 backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                        <div className="p-6 lg:p-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {/* Product Images - Updated with admin show component style */}
                                <div>
                                    {imageCount > 0 ? (
                                        <>
                                            {/* Main Image */}
                                            <div className="mb-4">
                                                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    <img
                                                        src={getImageUrl(productImages[selectedImage])}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://placehold.co/600x600/ff6b35/white?text=${encodeURIComponent(product.name.substring(0, 1))}`;
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Thumbnail Gallery */}
                                            {imageCount > 1 && (
                                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                                    {productImages.map((image, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setSelectedImage(index)}
                                                            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 ${index === selectedImage
                                                                ? 'border-blue-500 ring-2 ring-blue-500 dark:border-[#FF4433] dark:ring-[#FF4433]'
                                                                : 'border-transparent dark:border-transparent'
                                                                } hover:border-gray-300 dark:hover:border-gray-600 transition-colors`}
                                                        >
                                                            <div className="w-full h-full bg-gray-100 dark:bg-gray-700">
                                                                <img
                                                                    src={getImageUrl(image)}
                                                                    alt={`${product.name} - ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = `https://placehold.co/100x100/ff6b35/white?text=${index + 1}`;
                                                                    }}
                                                                />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Image Counter */}
                                            {imageCount > 0 && (
                                                <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                                                    Image {selectedImage + 1} of {imageCount}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
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
                                                <p className="mt-2 dark:text-gray-500">No images available</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div>
                                    {/* Category & Status */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {product.category && (
                                                <span className="rounded-full bg-[#f53003]/10 px-3 py-1 text-xs font-medium text-[#f53003] dark:bg-[#FF4433]/10 dark:text-[#FF4433]">
                                                    {product.category.name}
                                                </span>
                                            )}
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${isActive && product.quantity > 0
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                {isActive && product.quantity > 0 ? 'Available' : 'Sold Out'}
                                            </span>
                                        </div>
                                        <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Listed {formattedDate}
                                        </span>
                                    </div>

                                    {/* Product Name & Price */}
                                    <h1 className="mb-2 font-instrument-sans text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] lg:text-4xl">
                                        {product.name}
                                    </h1>
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-[#f53003] dark:text-[#FF4433]">
                                                Rs. {product.price.toLocaleString()}
                                            </span>
                                            {product.quantity > 1 && (
                                                <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    (Rs. {product.price} each)
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-sm ${product.quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {product.quantity > 0
                                                ? `${product.quantity} ${product.quantity === 1 ? 'item' : 'items'} in stock`
                                                : 'Out of stock'}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-8">
                                        <h3 className="mb-3 text-lg font-medium">Description</h3>
                                        <div className="rounded-lg border border-[#e3e3e0] p-4 dark:border-[#3E3E3A]">
                                            <p className="text-[#706f6c] dark:text-[#A1A09A] whitespace-pre-line">
                                                {product.description || 'No description available for this product.'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Seller Info */}
                                    <div className="mb-8 rounded-lg border border-[#e3e3e0] p-4 dark:border-[#3E3E3A]">
                                        <h3 className="mb-3 text-lg font-medium">Seller Information</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#f53003] to-[#ff6b35] text-lg font-bold text-white dark:from-[#FF4433] dark:to-[#FF6B35]">
                                                {product.seller.name.substring(0, 1)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{product.seller.name}</p>
                                                <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    {product.seller.email}
                                                </p>
                                                <div className="mt-1 flex items-center gap-1">
                                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                                        {product.seller.roles}
                                                    </span>
                                                    <span className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                                        Member since {new Date(product.seller.created_at).getFullYear()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-4">
                                        {/* Quantity Selector */}
                                        {product.quantity > 1 && (
                                            <div className="flex items-center gap-4">
                                                <span className="font-medium">Quantity:</span>
                                                <div className="flex items-center rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
                                                    <button
                                                        onClick={() => handleQuantityChange(-1)}
                                                        disabled={quantity <= 1}
                                                        className="px-3 py-2 text-[#706f6c] hover:text-[#1b1b18] disabled:opacity-50 dark:text-[#A1A09A] dark:hover:text-[#EDEDEC]"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(1)}
                                                        disabled={quantity >= product.quantity}
                                                        className="px-3 py-2 text-[#706f6c] hover:text-[#1b1b18] disabled:opacity-50 dark:text-[#A1A09A] dark:hover:text-[#EDEDEC]"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    {product.quantity} available
                                                </span>
                                            </div>
                                        )}

                                        {/* Total Price */}
                                        {product.quantity > 1 && quantity > 1 && (
                                            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                                <div className="flex justify-between">
                                                    <span>Unit Price:</span>
                                                    <span>Rs. {product.price.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Quantity:</span>
                                                    <span>{quantity}</span>
                                                </div>
                                                <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                                                    <span className="font-bold">Total:</span>
                                                    <span className="font-bold text-[#f53003] dark:text-[#FF4433]">
                                                        Rs. {(product.price * quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Buttons */}
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <button
                                                onClick={handleBuyNow}
                                                disabled={!isActive || product.quantity === 0}
                                                className="flex-1 rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-6 py-3 font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] disabled:opacity-50 dark:from-[#FF4433] dark:to-[#FF6B35]"
                                            >
                                                Buy Now
                                            </button>
                                            <button
                                                onClick={handleAddToCart}
                                                disabled={!isActive || product.quantity === 0}
                                                className="flex-1 rounded-lg border border-[#f53003] px-6 py-3 font-medium text-[#f53003] transition-all hover:bg-[#f53003] hover:text-white disabled:opacity-50 dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>

                                        {/* Contact Seller */}
                                        <button
                                            onClick={handleContactSeller}
                                            className="w-full rounded-lg border border-[#e3e3e0] px-6 py-3 font-medium text-[#706f6c] transition-all hover:border-[#f53003] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#A1A09A] dark:hover:border-[#FF4433] dark:hover:text-[#FF4433]"
                                        >
                                            Contact Seller
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="font-instrument-sans text-2xl font-semibold">
                                    Related Products
                                </h2>
                                <Link
                                    href={`/category/${product.category?.id}`}
                                    className="text-sm font-medium text-[#f53003] hover:text-[#d42900] dark:text-[#FF4433]"
                                >
                                    View all in {product.category?.name} →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {relatedProducts.slice(0, 3).map((relatedProduct) => {
                                    // Fix for related products images too
                                    const getRelatedImages = (): string[] => {
                                        if (!relatedProduct.images) return [];

                                        if (Array.isArray(relatedProduct.images)) {
                                            return relatedProduct.images;
                                        }

                                        try {
                                            const parsed = JSON.parse(relatedProduct.images as string);
                                            return Array.isArray(parsed) ? parsed : [parsed];
                                        } catch {
                                            if (typeof relatedProduct.images === 'string') {
                                                return relatedProduct.images.split(',').map(img => img.trim()).filter(img => img);
                                            }
                                        }

                                        return [];
                                    };

                                    const relatedImages = getRelatedImages();

                                    return (
                                        <div
                                            key={relatedProduct.id}
                                            className="group overflow-hidden rounded-xl border border-[#e3e3e0] bg-white transition-all hover:border-[#f53003] hover:shadow-lg dark:border-[#3E3E3A] dark:bg-[#1c1c1a] dark:hover:border-[#FF4433]"
                                        >
                                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                                                {relatedImages.length > 0 ? (
                                                    <img
                                                        src={getImageUrl(relatedImages[0])}
                                                        alt={relatedProduct.name}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://placehold.co/600x400/ff6b35/white?text=${encodeURIComponent(relatedProduct.name.substring(0, 2))}`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center">
                                                        <svg
                                                            className="h-12 w-12 text-gray-500 dark:text-gray-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={1}
                                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                                {relatedProduct.category && (
                                                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#f53003] backdrop-blur-sm dark:bg-black/90 dark:text-[#FF4433]">
                                                        {relatedProduct.category.name}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                                                    <span className="text-lg font-bold text-[#f53003] dark:text-[#FF4433]">
                                                        Rs. {relatedProduct.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="mb-4 line-clamp-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    {relatedProduct.description || 'No description'}
                                                </p>
                                                <Link
                                                    href={details.url(relatedProduct.id)}
                                                    className="block w-full rounded-lg border border-[#e3e3e0] px-3 py-2 text-center text-xs font-medium text-[#706f6c] transition-all hover:border-[#f53003] hover:text-[#f53003] dark:border-[#3E3E3A] dark:text-[#A1A09A] dark:hover:border-[#FF4433] dark:hover:text-[#FF4433]"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
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