import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { dashboard, login, register } from '@/routes';
import Header from './header-footer/header';

export default function About({canRegister=true }: {canRegister?:boolean}) {
    const { auth } = usePage<SharedData>().props;

    const stats = [
        { value: '50,000+', label: 'Happy Customers' },
        { value: '200,000+', label: 'Products Listed' },
        { value: 'Rs. 100M+', label: 'Saved by Users' },
        { value: '4.8★', label: 'Average Rating' },
    ];

    const team = [
        { name: 'John Doe', role: 'Founder & CEO', image: '' },
        { name: 'Jane Smith', role: 'Head of Operations', image: '' },
        { name: 'Mike Johnson', role: 'Lead Developer', image: '' },
        { name: 'Sarah Williams', role: 'Community Manager', image: '' },
    ];

    return (
        <>
            <Head title="About Us | SecondHandMart">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-[#FDFDFC] to-[#F5F5F3] p-6 text-[#1b1b18] dark:from-[#0a0a0a] dark:to-[#111111]">
                {/* Header */}
                <Header canRegister={canRegister} />

                <main className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 font-instrument-sans text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] lg:text-5xl">
                            Our <span className="bg-gradient-to-r from-[#f53003] to-[#ff6b35] bg-clip-text text-transparent dark:from-[#FF4433] dark:to-[#FF6B35]">Mission</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-[#706f6c] dark:text-[#A1A09A]">
                            At SecondHandMart, we're revolutionizing the way people buy and sell pre-owned items.
                            Our platform connects millions of buyers and sellers in a trusted, sustainable marketplace.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mb-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="rounded-xl bg-white/80 p-6 text-center backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                <div className="text-3xl font-bold text-[#f53003] dark:text-[#FF4433]">
                                    {stat.value}
                                </div>
                                <div className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Our Story */}
                    <div className="mb-12 rounded-xl bg-white/80 p-8 backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                        <h2 className="mb-6 font-instrument-sans text-2xl font-semibold">Our Story</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                Founded in 2020, SecondHandMart began as a simple idea: to create a better way
                                for people to buy and sell second-hand items. We noticed that existing platforms
                                were either too complicated, lacked trust features, or weren't focused on sustainability.
                            </p>
                            <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                Today, we've grown into a community of millions who believe in giving products
                                a second life. Every transaction on our platform represents a step toward
                                reducing waste, saving money, and building a more sustainable future.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-12">
                        <h2 className="mb-6 text-center font-instrument-sans text-2xl font-semibold">
                            Our Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Sustainability First',
                                    description: 'We measure success by the positive environmental impact we create.',
                                    icon: '🌱'
                                },
                                {
                                    title: 'Community Trust',
                                    description: 'Built on verified profiles, secure payments, and honest reviews.',
                                    icon: '🤝'
                                },
                                {
                                    title: 'Accessibility',
                                    description: 'Making sustainable shopping available to everyone, everywhere.',
                                    icon: '🌍'
                                }
                            ].map((value, index) => (
                                <div key={index} className="rounded-xl bg-white/80 p-6 text-center backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <div className="mb-4 text-4xl">{value.icon}</div>
                                    <h3 className="mb-2 font-semibold">{value.title}</h3>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team */}
                    <div className="mb-12">
                        <h2 className="mb-6 text-center font-instrument-sans text-2xl font-semibold">
                            Meet Our Team
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {team.map((member, index) => (
                                <div key={index} className="rounded-xl bg-white/80 p-6 text-center backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"></div>
                                    <h3 className="font-semibold">{member.name}</h3>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="rounded-xl bg-gradient-to-r from-[#f53003] to-[#ff6b35] p-8 text-center dark:from-[#FF4433] dark:to-[#FF6B35]">
                        <h2 className="mb-4 text-2xl font-bold text-white">
                            Join Our Sustainable Revolution
                        </h2>
                        <p className="mb-6 text-white/90">
                            Start buying and selling pre-loved items today. Together, we can make a difference.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/products"
                                className="rounded-lg bg-white px-6 py-3 font-medium text-[#f53003] transition-all hover:bg-gray-100 dark:text-[#FF4433]"
                            >
                                Browse Products
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={register()}
                                    className="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white/20"
                                >
                                    Create Account
                                </Link>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-12 max-w-7xl mx-auto border-t border-[#e3e3e0] pt-6 text-center text-sm text-[#706f6c] dark:border-[#3E3E3A] dark:text-[#A1A09A]">
                    <p>© 2024 SecondHandMart. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}