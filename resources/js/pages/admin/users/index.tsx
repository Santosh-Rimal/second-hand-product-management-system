import UserController from '@/actions/App/Http/Controllers/UserController';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/admin/users';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: users.index.url(),
    },
];

interface User {
    id: number;
    name: string;
    roles: string[];
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export default function Index({ users }: { users: User[] }) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Users ({users.length})
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage system users and their permissions
                            </p>
                        </div>
                        <Link
                            href={UserController.create.url()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add User
                        </Link>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-gray-100">User</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-gray-100">Roles</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-gray-100">Email Verified</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-gray-100">Created</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-sidebar-border/70 dark:border-sidebar-border hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap gap-2">

                                                <span

                                                    className={`px-3 py-1 text-xs font-medium rounded-full ${user.roles == `admin` ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}
                                                >
                                                    {user.roles}
                                                </span>

                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                {user.email_verified_at ? (
                                                    <>
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {formatDate(user.email_verified_at)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            Not Verified
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(user.created_at)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={UserController.show.url(user.id)}
                                                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={UserController.edit.url(user.id)}
                                                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this user?')) {
                                                            router.delete(UserController.destroy.url(user.id), {
                                                                preserveScroll: true,
                                                            });
                                                        }
                                                    }}
                                                    className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {users.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                No users found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Get started by creating your first user
                            </p>
                            <Link
                                href={UserController.create.url()}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Add User
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}