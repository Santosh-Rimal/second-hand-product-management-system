import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { dashboard, login, register } from '@/routes';
import { useState } from 'react';
import Header from './header-footer/header';

export default function Contact({canRegister=true}:{canRegister?:boolean}) {
    const { auth } = usePage<SharedData>().props;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Handle form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            title: 'Customer Support',
            email: 'support@secondhandmart.com',
            phone: '+1 (555) 123-4567',
            hours: 'Mon-Fri: 9AM-6PM EST'
        },
        {
            title: 'Seller Support',
            email: 'sellers@secondhandmart.com',
            phone: '+1 (555) 987-6543',
            hours: 'Mon-Fri: 9AM-8PM EST'
        },
        {
            title: 'Business Inquiries',
            email: 'business@secondhandmart.com',
            phone: '+1 (555) 456-7890',
            hours: 'Mon-Fri: 10AM-4PM EST'
        }
    ];

    const faqs = [
        {
            question: 'How do I report a problem with my order?',
            answer: 'Contact our support team within 24 hours of delivery.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for most items.'
        },
        {
            question: 'How do I become a verified seller?',
            answer: 'Complete your profile and submit verification documents.'
        }
    ];

    return (
        <>
            <Head title="Contact Us | SecondHandMart">
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
                            Get in <span className="bg-gradient-to-r from-[#f53003] to-[#ff6b35] bg-clip-text text-transparent dark:from-[#FF4433] dark:to-[#FF6B35]">Touch</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-[#706f6c] dark:text-[#A1A09A]">
                            Have questions? We're here to help. Contact our team for support,
                            partnership inquiries, or just to say hello.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Contact Form */}
                        <div className="lg:w-2/3">
                            <div className="rounded-xl bg-white/80 p-8 backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                <h2 className="mb-6 font-instrument-sans text-2xl font-semibold">
                                    Send us a Message
                                </h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full rounded-lg border border-[#e3e3e0] bg-white px-4 py-3 dark:border-[#3E3E3A] dark:bg-[#1c1c1a]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full rounded-lg border border-[#e3e3e0] bg-white px-4 py-3 dark:border-[#3E3E3A] dark:bg-[#1c1c1a]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label className="mb-2 block text-sm font-medium">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full rounded-lg border border-[#e3e3e0] bg-white px-4 py-3 dark:border-[#3E3E3A] dark:bg-[#1c1c1a]"
                                            required
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <label className="mb-2 block text-sm font-medium">
                                            Message
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={6}
                                            className="w-full rounded-lg border border-[#e3e3e0] bg-white px-4 py-3 dark:border-[#3E3E3A] dark:bg-[#1c1c1a]"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#f53003] to-[#ff6b35] px-6 py-3 font-medium text-white transition-all hover:from-[#d42900] hover:to-[#e64a19] disabled:opacity-50 dark:from-[#FF4433] dark:to-[#FF6B35]"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:w-1/3">
                            <div className="space-y-6">
                                {/* Contact Cards */}
                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <div key={index} className="rounded-xl bg-white/80 p-6 backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                            <h3 className="mb-3 font-semibold">{info.title}</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>{info.email}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span>{info.phone}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{info.hours}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* FAQ */}
                                <div className="rounded-xl bg-white/80 p-6 backdrop-blur-sm shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615]/80 dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <h3 className="mb-4 font-semibold">Frequently Asked Questions</h3>
                                    <div className="space-y-3">
                                        {faqs.map((faq, index) => (
                                            <div key={index}>
                                                <h4 className="text-sm font-medium">{faq.question}</h4>
                                                <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href="/faq"
                                        className="mt-4 inline-block text-sm font-medium text-[#f53003] hover:text-[#d42900] dark:text-[#FF4433]"
                                    >
                                        View all FAQs →
                                    </Link>
                                </div>
                            </div>
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