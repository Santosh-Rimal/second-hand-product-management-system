import { useEffect, useRef } from 'react';

interface EsewaData {
    amount: number;
    tax_amount: number;
    total_amount: number;
    transaction_uuid: string;
    product_code: string;
    product_service_charge: number;
    product_delivery_charge: number;
    success_url: string;
    failure_url: string;
}

interface Props {
    data: EsewaData;
    signature: string;
    signedFieldNames: string;
}

export default function Pay({ data, signature, signedFieldNames }: Props) {
    const formRef = useRef<HTMLFormElement>(null);

    // Auto submit on load (optional)
    // useEffect(() => {
    //     formRef.current?.submit();
    // }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        eSewa Payment Gateway
                    </h2>
                    <p className="text-green-100 mt-1">Secure digital payment processing</p>
                </div>

                {/* Payment Summary */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Payment Summary</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                            Secure
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Product Amount:</span>
                            <span className="font-medium">NPR {data.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax Amount:</span>
                            <span className="font-medium">NPR {data.tax_amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Service Charge:</span>
                            <span className="font-medium">NPR {data.product_service_charge.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Charge:</span>
                            <span className="font-medium">NPR {data.product_delivery_charge.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-gray-800">Total Amount:</span>
                                <span className="text-green-700">NPR {data.total_amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="p-6">
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Transaction Details</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600 break-all">
                                <span className="font-medium">Transaction ID:</span> {data.transaction_uuid}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Product Code:</span> {data.product_code}
                            </p>
                        </div>
                    </div>

                    <form
                        ref={formRef}
                        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                        method="POST"
                        className="hidden"
                    >
                        <input type="hidden" id="amount" name="amount" value={data.amount} />
                        <input type="hidden" id="tax_amount" name="tax_amount" value={data.tax_amount} />
                        <input type="hidden" id="total_amount" name="total_amount" value={data.total_amount} />
                        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={data.transaction_uuid} />
                        <input type="hidden" id="product_code" name="product_code" value={data.product_code} />
                        <input type="hidden" id="product_service_charge" name="product_service_charge" value={data.product_service_charge} />
                        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={data.product_delivery_charge} />
                        <input type="hidden" id="success_url" name="success_url" value={data.success_url} />
                        <input type="hidden" id="failure_url" name="failure_url" value={data.failure_url} />
                        <input type="hidden" id="signed_field_names" name="signed_field_names" value={signedFieldNames} />
                        <input type="hidden" id="signature" name="signature" value={signature} />
                    </form>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => formRef.current?.submit()}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            Pay with eSewa
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            Cancel Payment
                        </button>
                    </div>

                    {/* Security Badges */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>256-bit SSL Secured</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>PCI DSS Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        You will be securely redirected to eSewa's payment page to complete your transaction.
                    </p>
                </div>

                {/* Fallback for users with JS disabled */}
                <noscript>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    JavaScript is required for automatic payment processing.
                                </p>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Pay with eSewa (NPR {data.total_amount.toLocaleString()})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </noscript>
            </div>
        </div>
    );
}