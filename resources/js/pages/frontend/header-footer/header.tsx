import CartController from '@/actions/App/Http/Controllers/frontend/CartController';
import { dashboard, userdashboard, login, register, signinform } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Home,
    Package,
    Info,
    Phone,
    ShoppingCart,
    LogIn,
    UserPlus,
} from 'lucide-react';

const Header = ({ canRegister }: { canRegister: boolean }) => {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();
    const { totalCarts } = usePage<{ totalCarts: number }>().props;


    const isActive = (path: string) =>
        url === path || url.startsWith(path + '/');
    return (
        <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
            <nav className="flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-xl px-6 py-4 shadow-lg ring-1 ring-gray-200/50">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#f53003] to-[#ff6b35] shadow-lg shadow-orange-500/20 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                        SecondHand<span className="text-[#f53003]">Mart</span>
                    </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${isActive('/')
                            ? 'text-[#f53003] bg-orange-50 font-semibold shadow-sm'
                            : 'text-gray-700 hover:text-[#f53003] hover:bg-orange-50/50'}`}
                    >
                        <Home size={18} /> Home
                    </Link>

                    <Link
                        href="/products"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${isActive('/products')
                            ? 'text-[#f53003] bg-orange-50 font-semibold shadow-sm'
                            : 'text-gray-700 hover:text-[#f53003] hover:bg-orange-50/50'}`}
                    >
                        <Package size={18} /> Products
                    </Link>

                    <Link
                        href="/about"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${isActive('/about')
                            ? 'text-[#f53003] bg-orange-50 font-semibold shadow-sm'
                            : 'text-gray-700 hover:text-[#f53003] hover:bg-orange-50/50'}`}
                    >
                        <Info size={18} /> About
                    </Link>

                    <Link
                        href="/contact"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${isActive('/contact')
                            ? 'text-[#f53003] bg-orange-50 font-semibold shadow-sm'
                            : 'text-gray-700 hover:text-[#f53003] hover:bg-orange-50/50'}`}
                    >
                        <Phone size={18} /> Contact
                    </Link>

                    <Link
                        href={CartController.index.url()}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${isActive('/user/cart')
                            ? 'text-[#f53003] bg-orange-50 font-semibold shadow-sm'
                            : 'text-gray-700 hover:text-[#f53003] hover:bg-orange-50/50'}`}
                    >
                        <ShoppingCart size={18} /> Cart <span className='text-xl text-red-500'>
                            <sup>{totalCarts}</sup>
                        </span>
                    </Link>

                    {auth.user && auth.user.roles == 'admin' && (
                        <Link
                            href={dashboard()}
                            className="flex items-center gap-2 px-5 py-2.5 ml-2 rounded-full bg-gradient-to-r from-[#f53003] to-[#ff6b35] text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-200"
                        >
                            <Home size={18} />Goto Admin Dashboard
                        </Link>
                    )}
                    {
                        auth.user && auth.user.roles === 'user' && (
                            <Link
                                href={userdashboard()}
                                className="flex items-center gap-2 px-5 py-2.5 ml-2 rounded-full bg-gradient-to-r from-[#f53003] to-[#ff6b35] text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-200"
                            >
                                <Home size={18} /> Dashboard
                            </Link>
                        )
                    }


                    {/* Auth */}
                    {!auth.user && (
                        <div className="flex items-center gap-2 ml-2 border-l pl-4 border-gray-200">
                            <Link
                                href={signinform()}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:border-[#f53003] hover:text-[#f53003] hover:bg-orange-50/50 transition-all duration-200"
                            >
                                <LogIn size={18} /> Login
                            </Link>

                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#f53003] to-[#ff6b35] text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-200"
                                >
                                    <UserPlus size={18} /> Register
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;