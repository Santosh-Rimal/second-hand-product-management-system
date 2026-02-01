import { Head, Link, router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import Header from '../frontend/header-footer/header';
import CartController from '@/actions/App/Http/Controllers/frontend/CartController';
import CheckoutController from '@/actions/App/Http/Controllers/CheckoutController';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        images: string; // JSON string
        quantity: number; // stock
    };
    user: {
        id: number;
        name: string; // seller
        email: string;
    };
}

export default function Cart({
    canRegister = true,
    cartItems,
}: {
    canRegister?: boolean;
    cartItems: CartItem[];
}) {
    const { auth } = usePage<SharedData>().props;

    // ✅ Calculate Cart Summary
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const cartSummary = {
        subtotal,
        shipping: 0,
        discount: 0,
        total: subtotal,
    };

    // ✅ Update quantity handler
    const updateQuantity = (cart_id: number, quantity: number) => {
        router.post(CartController.update(), {
            cart_id: cart_id, quantity: quantity
        })
    };

    // ✅ Remove item handler
    const removeItem = (cart_id: number) => {
        router.delete(CartController.destroy(cart_id), {
            preserveScroll: true,

        })
    };
    const checkout = (price: number) => {
        router.post(CheckoutController.store(), {
            
        });
    }
    return (
        <>
            <Head title="Shopping Cart | SecondHandMart" />

            <div className="min-h-screen bg-gradient-to-b from-[#FDFDFC] to-[#F5F5F3] p-6">
                <Header canRegister={canRegister} />

                <main className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-6 text-sm text-gray-500">
                        <Link href="/" className="hover:text-red-500">
                            Home
                        </Link>{' '}
                        / Shopping Cart
                    </div>

                    <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.length === 0 && (
                                <p className="text-gray-500">Your cart is empty</p>
                            )}

                            {cartItems.map(item => {
                                // const images = JSON.parse(item.product.images);
                                // const image = `/storage/products/${images[0]}`;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 rounded-xl border bg-white p-4"
                                    >
                                        {/* <img
                                            src={image}
                                            alt={item.product.name}
                                            className="h-24 w-24 rounded-lg object-cover"
                                        /> */}

                                        <div className="flex-1">
                                            <h2 className="font-semibold text-lg">
                                                {item.product.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Seller: {item.user.name} ({item.user.email})
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Stock: {item.product.quantity}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    className="px-2 py-1 border rounded"
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    disabled={item.quantity >= item.product.quantity}
                                                    className="px-2 py-1 border rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right flex flex-col items-end justify-between">
                                            <p className="font-semibold">
                                                Rs. {item.product.price * item.quantity}
                                            </p>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 t   router.post(CartController.destroy(),{
                                                })ext-sm mt-2"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="rounded-xl border bg-white p-6">
                            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>Rs. {cartSummary.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Rs. {cartSummary.shipping}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span>- Rs. {cartSummary.discount}</span>
                                </div>
                                <hr />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>Rs. {cartSummary.total}</span>
                                </div>
                            </div>

                            <button onClick={() => checkout(cartSummary.total)} className="mt-6 w-full rounded-xl bg-red-500 py-3 text-white font-semibold hover:bg-red-600">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </main >

                <footer className="mt-12 text-center text-sm text-gray-500">
                    © 2024 SecondHandMart. All rights reserved.
                </footer>
            </div >
        </>
    );
}
