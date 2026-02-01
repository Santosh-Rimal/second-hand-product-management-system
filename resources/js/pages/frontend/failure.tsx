import { Head, Link } from '@inertiajs/react';

interface Props {
    payload: Record<string, any>;
}

export default function EsewaFailure({ payload }: Props) {
    return (
        <>
            <Head title="Payment Failed" />

            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">
                        Payment Failed ❌
                    </h1>

                    <p className="text-gray-600 mb-4">
                        Your payment could not be completed.
                    </p>

                    <pre className="bg-gray-100 text-xs p-3 rounded text-left overflow-auto">
                        {JSON.stringify(payload, null, 2)}
                    </pre>

                    <Link
                        href="/cart"
                        className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Back to Cart
                    </Link>
                </div>
            </div>
        </>
    );
}
