import ProductController from '@/actions/App/Http/Controllers/ProductController';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/admin/products';
import { type BreadcrumbItem } from '@/types';
import { Head, InfiniteScroll, Link, router } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index.url(),
    },
];

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
    images: string,
    created_at: string,
    category: {
        name: string
    } | null
}
export default function Index({ prooducts }: { prooducts: Products[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Products" />
            <InfiniteScroll data="prooducts" buffer={500} preserveUrl>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="overflow-x-auto">
                        <Link href={ProductController.create()} className="mb-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Add New Product
                        </Link>
                        <table className="w-full border border-gray-300 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-3 py-2">ID</th>
                                    <th className="border px-3 py-2">Product</th>
                                    <th className="border px-3 py-2">Category</th>
                                    <th className="border px-3 py-2">Price</th>
                                    <th className="border px-3 py-2">Images</th>
                                    <th className="border px-3 py-2">Status</th>
                                    <th className="border px-3 py-2">Quantity</th>
                                    <th className="border px-3 py-2">Seller Details</th>
                                    <th className="border px-3 py-2">Created</th>
                                    <th className="border px-3 py-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* <InfiniteScroll data="products"> */}

                                {prooducts.data.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="border px-3 py-2 text-center">
                                            {product.id}
                                        </td>

                                        <td className="border px-3 py-2">
                                            <Link href={ProductController.show.url(product.id)}>{product.name}</Link>
                                        </td>

                                        <td className="border px-3 py-2">
                                            {product.category?.name}
                                        </td>

                                        <td className="border px-3 py-2">
                                            Rs. {product.price}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {/* <div className="flex gap-2">
                                            {Array(product.images).map((img) => (
                                                <img
                                                    key={img}
                                                    src={`/storage/${img}`}
                                                    alt=""
                                                    className="w-10 h-10 rounded border"
                                                />
                                            ))}
                                        </div> */}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {product.is_active ? (
                                                <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-800">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {product.quantity}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {product.seller?.name}
                                            <br />
                                            {product.seller?.email}
                                        </td>

                                        <td className="border px-3 py-2 text-xs text-gray-600">
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="border px-3 py-2">
                                            <div className="flex">
                                                <Link
                                                    href={ProductController.edit.url(product.id)}
                                                    className="mr-2 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this product?')) {
                                                            router.delete(ProductController.destroy.url(product.id));
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                >
                                                    Delete Product
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {/* </InfiniteScroll> */}
                            </tbody>
                        </table>

                    </div>
                </div>
            </InfiniteScroll>
        </AppLayout>
    );
}