import AppLayout from '@/layouts/app-layout';
import products from '@/routes/admin/products';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface flash {
    success?: string;
    error?: string;
}

interface Product {
    id: number;
    name: string;
    category_id: number;
    is_active: boolean;
    quantity: number;
    price: number;
    description: string;
    images: string;
    created_at: string;
    _method?: string;
}

interface PageProps {
    categories: Category[];
    canEdit: boolean;
    product?: Product;
}

export default function Products({ categories, canEdit, product }: PageProps) {
    const { flash } = usePage<{ flash: flash }>().props;
    const [flashState, setFlashState] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'All Products',
            href: products.index.url(),
        },
        {
            title: `${canEdit ? `Edit Product ${product?.name}` : 'Add New Product'}`,
            href: canEdit ? products.edit.url({ product: product?.id || 0 }) : products.create.url(),
        },
    ];

    // Initialize form data based on whether we're editing or creating
    const initialData = {
        name: product?.name || '',
        category_id: product?.category_id?.toString() || '',
        quantity: product?.quantity?.toString() || '0',
        price: product?.price?.toString() || '',
        is_active: product?.is_active ?? true, // Default to true for new products
        description: product?.description || '',
        images: null as File[] | null,
        _method: canEdit ? 'PUT' : 'POST',
    };

    const { data, setData, post, processing, errors, reset } = useForm(initialData);

    // Handle image previews
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // If editing, parse existing images
    const [existingImages, setExistingImages] = useState<string[]>([]);

    useEffect(() => {
        if (canEdit && product?.images) {
            try {
                // Try to parse as JSON
                const parsed = JSON.parse(product.images);
                if (Array.isArray(parsed)) {
                    setExistingImages(parsed);
                } else if (typeof parsed === 'string') {
                    setExistingImages([parsed]);
                }
            } catch {
                // If not JSON, check if it's a comma-separated string
                if (product.images.includes(',')) {
                    setExistingImages(product.images.split(',').map(img => img.trim()));
                } else if (product.images) {
                    setExistingImages([product.images]);
                }
            }
        }
    }, [canEdit, product]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (canEdit && product) {
            // For edit, use PUT method
            post(products.update.url({ product: product.id }), {
                onSuccess: () => {
                    setFlashState(true);
                },
            });
        } else {
            // For create
            post(products.store.url(), {
                onSuccess: () => {
                    reset();
                    setImagePreviews([]);
                    setExistingImages([]);
                    setFlashState(true);
                },
            });
        }
    };

    useEffect(() => {
        if (!flashState) return;

        const timer = setTimeout(() => {
            setFlashState(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flashState]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData('images', files);

            // Create previews for new files
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const removeNewImage = (index: number) => {
        if (data.images) {
            const updatedFiles = [...data.images];
            updatedFiles.splice(index, 1);
            setData('images', updatedFiles);

            // Also remove preview
            const updatedPreviews = [...imagePreviews];
            URL.revokeObjectURL(updatedPreviews[index]); // Clean up memory
            updatedPreviews.splice(index, 1);
            setImagePreviews(updatedPreviews);
        }
    };

    const removeExistingImage = (index: number) => {
        const updatedImages = [...existingImages];
        const removedImage = updatedImages.splice(index, 1)[0];
        setExistingImages(updatedImages);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={canEdit ? "Edit Product" : "Add New Product"} />
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">
                    {canEdit ? 'Edit Product' : 'Add New Product'}
                </h1>

                {flash.success && flashState && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Category Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                        )}
                    </div>

                    {/* Quantity and Status Fields - Side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Quantity Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.quantity}
                                onChange={(e) => {
                                    const value = Math.max(0, parseInt(e.target.value) || 0);
                                    setData('quantity', value.toString());
                                }}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                            )}
                        </div>

                        {/* Status Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <div className="flex items-center mt-2">
                                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className={`block h-6 rounded-full w-12 cursor-pointer ${data.is_active ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    >
                                        <span
                                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${data.is_active ? 'transform translate-x-6' : ''}`}
                                        />
                                    </label>
                                </div>
                                <label htmlFor="is_active" className="text-sm text-gray-700 cursor-pointer">
                                    {data.is_active ? 'Active' : 'Inactive'}
                                </label>
                            </div>
                            {errors.is_active && (
                                <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>
                            )}
                        </div>
                    </div>

                    {/* Price Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                        )}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product description"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>

                    {/* Images Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Images
                            <span className="text-sm text-gray-500 ml-2">
                                {canEdit ? '(New images will be added to existing ones)' : ''}
                            </span>
                        </label>

                        {/* Display existing images when editing */}
                        {canEdit && existingImages.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                                <div className="flex flex-wrap gap-4">
                                    {existingImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={`/storage/${image}`}
                                                alt={`Product ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                title="Remove image"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* File input for new images */}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.images && (
                            <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                        )}

                        {/* Preview new images */}
                        {imagePreviews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">New Image Previews:</p>
                                <div className="flex flex-wrap gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                title="Remove preview"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <a
                            href={products.index.url()}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing
                                ? (canEdit ? 'Updating...' : 'Saving...')
                                : (canEdit ? 'Update Product' : 'Save Product')
                            }
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}