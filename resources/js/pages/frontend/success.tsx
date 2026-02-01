import { Head, Link } from '@inertiajs/react';

interface Paymentpayment {
    transaction_uuid?: string;
    transaction_code?: string;
    total_amount?: string;
    product_code?: string;
    status?: string;
    signed_field_names?: string;
    signature?: string;
    [key: string]: any; // For any additional fields
}

interface Props {
    payment: Paymentpayment;
}

export default function EsewaSuccess({ payment }: Props) {
    const isSuccess = payment.status === 'COMPLETE';

    return (
        <>
            <Head title={isSuccess ? "Payment Successful" : "Payment Status"} />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className={`bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full ${isSuccess ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'}`}>
                    {/* Status Icon */}
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isSuccess ? 'bg-green-100' : 'bg-blue-100'}`}>
                        {isSuccess ? (
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        ) : (
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className={`text-2xl font-bold mb-2 ${isSuccess ? 'text-green-600' : 'text-blue-600'}`}>
                        {isSuccess ? 'Payment Successful 🎉' : 'Payment Processing'}
                    </h1>

                    {/* Message */}
                    <p className="text-gray-600 mb-6">
                        {isSuccess
                            ? 'Your payment has been completed successfully. Thank you for your purchase!'
                            : 'Your payment is being processed. You will be notified once it\'s completed.'}
                    </p>

                    {/* Transaction Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-medium text-gray-700 mb-3">Transaction Details</h3>

                        {payment.transaction_uuid && (
                            <div className="mb-2">
                                <span className="text-sm text-gray-500">Transaction ID:</span>
                                <p className="text-sm font-mono font-medium">{payment.transaction_uuid}</p>
                            </div>
                        )}

                        {payment.transaction_code && (
                            <div className="mb-2">
                                <span className="text-sm text-gray-500">Reference:</span>
                                <p className="text-sm font-medium">{payment.transaction_code}</p>
                            </div>
                        )}

                        {payment.total_amount && (
                            <div className="mb-2">
                                <span className="text-sm text-gray-500">Amount:</span>
                                <p className="text-sm font-medium">NPR {parseFloat(payment.total_amount).toLocaleString()}</p>
                            </div>
                        )}

                        {payment.status && (
                            <div className="mb-2">
                                <span className="text-sm text-gray-500">Status:</span>
                                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${payment.status === 'COMPLETE'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {payment.status}
                                </span>
                            </div>
                        )}

                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                                Date: {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/orders"
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 text-center"
                        >
                            View Orders
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-200 text-center"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                    {/* Debug Info (Optional - can be removed in production) */}
                    <details className="mt-6 text-left">
                        <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                            View raw payment data
                        </summary>
                        <pre className="mt-2 bg-gray-100 text-xs p-3 rounded text-left overflow-auto max-h-40">
                            {JSON.stringify(payment, null, 2)}
                        </pre>
                    </details>

                    {/* Note */}
                    <p className="mt-6 text-xs text-gray-500">
                        A confirmation email has been sent to your registered email address.
                        For any queries, please contact our support team.
                    </p>
                </div>
            </div>
        </>
    );
}