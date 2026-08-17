import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FlashMessage from './FlashMessage';

function MenuIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

function CloseIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18 18 6" />
        </svg>
    );
}

export default function PublicLayout({ children }) {
    const { props } = usePage();
    const categories = props.categories ?? [];
    const settings = props.siteSettings ?? {};
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileOpen]);

    const navLinks = [
        { name: 'Scooters', href: '/#scooters' },
        { name: 'Dealerships', href: '/dealerships' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-[#fafafa] text-gray-900 font-sans antialiased selection:bg-black selection:text-white">
            
            {/* Elegant, clean, transparent Navbar */}
            <header 
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${
                    scrolled 
                        ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-black py-4' 
                        : 'bg-gradient-to-b from-black/40 to-transparent text-white py-6'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                    
                    {/* Logo */}
                    <Link href="/" className="relative z-50 flex items-center">
                        <span className="text-2xl font-semibold tracking-tight">
                            RideEV
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium tracking-wide transition-opacity hover:opacity-60 ${
                                    scrolled ? 'text-gray-900' : 'text-white'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center">
                        <Link
                            href="/book-a-test-ride"
                            className={`rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                                scrolled 
                                    ? 'bg-black text-white hover:bg-gray-800' 
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            Test Ride
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`lg:hidden relative z-50 p-2 -mr-2 transition-colors ${
                            mobileOpen ? 'text-black' : (scrolled ? 'text-black' : 'text-white')
                        }`}
                    >
                        {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </header>

            {/* Elegant Mobile Menu Overlay with Framer Motion */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col pt-32 px-6 pb-12"
                    >
                        <nav className="flex flex-col gap-6 mt-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-4xl font-semibold tracking-tight text-black"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-auto"
                        >
                            <Link
                                href="/book-a-test-ride"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full rounded-2xl bg-black px-6 py-4 text-center text-sm font-semibold tracking-widest uppercase text-white hover:bg-gray-800 transition-colors"
                            >
                                Book a Test Ride
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 relative">
                {(props.flash?.success || props.flash?.error) && (
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 max-w-sm">
                        <FlashMessage message={props.flash?.success} type="success" />
                        <FlashMessage message={props.flash?.error} type="error" />
                    </div>
                )}
                {children}
            </main>

            {/* Clean, Modern Footer */}
            <footer className="bg-white border-t border-gray-200 pt-24 pb-12 mt-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-20">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <Link href="/" className="text-2xl font-semibold tracking-tight text-black">
                                RideEV
                            </Link>
                            <p className="mt-6 text-sm text-gray-500 max-w-xs leading-relaxed">
                                Redefining urban mobility with intelligent, zero-emission vehicles designed for the modern world.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase text-black mb-6">Explore</p>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-gray-500 hover:text-black transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Models */}
                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase text-black mb-6">Models</p>
                            <ul className="space-y-4">
                                {categories.flatMap(c => c.products).map(p => (
                                    <li key={p.id}>
                                        <Link href={`/scooters/${p.slug}`} className="text-sm text-gray-500 hover:text-black transition-colors">
                                            {p.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase text-black mb-6">Contact</p>
                            <ul className="space-y-4 text-sm text-gray-500">
                                {settings.phone && (
                                    <li>
                                        <a href={`tel:${settings.phone}`} className="hover:text-black transition-colors">{settings.phone}</a>
                                    </li>
                                )}
                                {settings.email && (
                                    <li>
                                        <a href={`mailto:${settings.email}`} className="hover:text-black transition-colors">{settings.email}</a>
                                    </li>
                                )}
                                {settings.address && (
                                    <li className="leading-relaxed pt-2">
                                        {settings.address}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-6">
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} RideEV. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-xs text-gray-400">
                            <span className="cursor-pointer hover:text-black transition-colors">Privacy Policy</span>
                            <span className="cursor-pointer hover:text-black transition-colors">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
