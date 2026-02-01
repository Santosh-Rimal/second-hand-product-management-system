import AppLayout from '@/layouts/app-layout';
import users from '@/routes/admin/users';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface User {
    id?: number;
    name: string;
    email: string;
    roles: string[];
    password?: string;
    password_confirmation?: string;
}

interface PageProps {
    user?: User;
    isEditing: boolean;
}

export default function Users({ user, isEditing }: PageProps) {
    const [showPasswordFields, setShowPasswordFields] = useState(!isEditing);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: users.index.url(),
        },
        {
            title: `${isEditing ? `Edit User ${user?.name}` : 'Create User'}`,
            href: isEditing ? users.edit.url({ user: user?.id || 0 }) : users.create.url(),
        },

    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        roles: user?.roles || '',
        id: user?.id || undefined,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Convert comma-separated roles string to array
        const formData = {
            ...data,
            roles: data.roles
        };


        if (isEditing && user?.id) {
            put(users.update.url(user.id), {
                onSuccess: () => {
                    reset();
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            post(users.store.url(), {
                onSuccess: () => {
                    reset();
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit User' : 'Create User'} />
            <div className="p-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {isEditing ? 'Edit User' : 'Create New User'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {isEditing
                            ? 'Update user information and permissions'
                            : 'Add a new user to the system'}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Roles as Text Box */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    User Roles
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Enter roles (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.roles}
                                        onChange={e => setData('roles', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="admin, user, manager, editor"
                                    />
                                    {errors.roles && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.roles}</p>
                                    )}
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Enter roles separated by commas. Example: admin, user, manager
                                    </p>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Password
                                    </h2>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordFields(!showPasswordFields)}
                                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {showPasswordFields ? 'Hide Password Fields' : 'Change Password'}
                                        </button>
                                    )}
                                </div>

                                {showPasswordFields && (
                                    <div className="space-y-4">
                                        {!isEditing && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Set a password for the new user
                                            </p>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isEditing ? 'New Password' : 'Password *'}
                                                    {isEditing && !showPasswordFields && ' (Leave blank to keep current)'}
                                                </label>
                                                <input
                                                    type="password"
                                                    value={data.password}
                                                    onChange={e => setData('password', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                    placeholder={isEditing && !showPasswordFields ? 'Leave blank to keep current' : 'Enter password'}
                                                    required={!isEditing}
                                                />
                                                {errors.password && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isEditing ? 'Confirm New Password' : 'Confirm Password *'}
                                                    {isEditing && !showPasswordFields && ' (Leave blank to keep current)'}
                                                </label>
                                                <input
                                                    type="password"
                                                    value={data.password_confirmation}
                                                    onChange={e => setData('password_confirmation', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                    placeholder={isEditing && !showPasswordFields ? 'Leave blank to keep current' : 'Confirm password'}
                                                    required={!isEditing}
                                                />
                                                {errors.password_confirmation && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password_confirmation}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-between items-center pt-6 border-t border-sidebar-border/70 dark:border-sidebar-border">
                                <Link
                                    href={users.index.url()}
                                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                                >
                                    Cancel
                                </Link>

                                <div className="flex gap-3">
                                    {isEditing && user?.id && (
                                        <Link
                                            href={users.show.url(user.id)}
                                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                                        >
                                            View User
                                        </Link>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing || isSubmitting}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                {isEditing ? 'Updating...' : 'Creating...'}
                                            </>
                                        ) : (
                                            isEditing ? 'Update User' : 'Create User'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}