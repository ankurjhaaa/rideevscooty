import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
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

export default function PublicLayout({ children, hideToaster = false }) {
    const { props } = usePage();
    const categories = props.categories ?? [];
    const settings = props.siteSettings ?? {};
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Mega Menu States
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const megaMenuTimeoutRef = useRef(null);

    const handleMegaMenuEnter = () => {
        if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
        setIsMegaMenuOpen(true);
    };

    const handleMegaMenuLeave = () => {
        megaMenuTimeoutRef.current = setTimeout(() => {
            setIsMegaMenuOpen(false);
        }, 200); // 200ms buffer to allow diagonal mouse movement without closing
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // Fire once to set initial state
        handleScroll();
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

    // Set default hovered category when mega menu opens
    useEffect(() => {
        if (isMegaMenuOpen && categories.length > 0) {
            if (!hoveredCategory) {
                setHoveredCategory(categories[0]);
                setHoveredProduct(categories[0].products?.[0] ?? null);
            }
        }
    }, [isMegaMenuOpen, categories, hoveredCategory]);

    const navLinks = [
        { name: 'Dealerships', href: '/dealerships' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-white selection:text-black">
            
            {/* Elegant, clean Navbar */}
            <header 
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${
                    scrolled || isMegaMenuOpen
                        ? 'bg-zinc-950/80 backdrop-blur-xl text-zinc-50 py-4' 
                        : 'bg-transparent text-zinc-50 py-6'
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
                    <nav className="hidden lg:flex items-center gap-10 h-full">
                        
                        {/* Scooters Mega Menu */}
                        <div 
                            className="h-full flex items-center"
                            onMouseEnter={handleMegaMenuEnter}
                            onMouseLeave={handleMegaMenuLeave}
                        >
                            {/* We add a large transparent padding box around the trigger so the mouse never falls into a "gap" */}
                            <div className="relative py-6 -my-6 flex items-center">
                                <button className="text-sm font-medium tracking-wide transition-opacity hover:opacity-60 flex items-center gap-2 cursor-pointer">
                                    Scooters
                                    <svg className={`w-3 h-3 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                            </div>

                            <AnimatePresence>
                                {isMegaMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 top-full w-full bg-zinc-900 border-t border-zinc-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden text-zinc-50 cursor-default z-50"
                                        onMouseEnter={handleMegaMenuEnter}
                                        onMouseLeave={handleMegaMenuLeave}
                                    >
                                        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex">
                                            
                                            {/* Left Column: Categories */}
                                            <div className="w-1/4 pr-8 border-r border-zinc-800">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">Categories</p>
                                                <div className="flex flex-col gap-4">
                                                    {categories.map(cat => (
                                                        <button 
                                                            key={`cat-${cat.id}`} 
                                                            onMouseEnter={() => {
                                                                setHoveredCategory(cat);
                                                                setHoveredProduct(cat.products?.[0] ?? null);
                                                            }}
                                                            className={`text-left text-lg font-medium transition-colors ${hoveredCategory?.id === cat.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
                                                        >
                                                            {cat.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Middle Column: Products */}
                                            <div className="w-1/4 px-8 border-r border-zinc-800">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">Models</p>
                                                <div className="flex flex-col gap-4">
                                                    {hoveredCategory?.products?.map(prod => (
                                                        <button
                                                            key={`prod-${prod.id}`}
                                                            onMouseEnter={() => setHoveredProduct(prod)}
                                                            className={`text-left text-lg font-medium transition-colors ${hoveredProduct?.id === prod.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
                                                        >
                                                            {prod.name}
                                                        </button>
                                                    ))}
                                                    {(!hoveredCategory?.products || hoveredCategory.products.length === 0) && (
                                                        <p className="text-sm text-zinc-500 italic">No models available</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right Column: Details & Image */}
                                            <div className="w-2/4 pl-12 flex items-center justify-between">
                                                {hoveredProduct ? (
                                                    <>
                                                        <div className="flex-1 pr-8">
                                                            <h4 className="text-4xl font-medium tracking-tight mb-4">{hoveredProduct.name}</h4>
                                                            <p className="text-sm text-zinc-400 mb-8 max-w-sm font-light leading-relaxed line-clamp-2">
                                                                {hoveredProduct.description || 'Experience the ultimate performance and zero emissions.'}
                                                            </p>
                                                            
                                                            <div className="grid grid-cols-2 gap-8 mb-8 border-t border-zinc-800 pt-6">
                                                                <div>
                                                                    <p className="text-xl font-semibold">{hoveredProduct.range || '--'}</p>
                                                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">Range</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xl font-semibold">{hoveredProduct.top_speed || '--'}</p>
                                                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">Top Speed</p>
                                                                </div>
                                                            </div>

                                                            <Link 
                                                                href={`/scooters/${hoveredProduct.slug}`}
                                                                onClick={() => setIsMegaMenuOpen(false)} 
                                                                className="inline-block border-b-2 border-zinc-50 pb-1 text-xs font-bold uppercase tracking-widest hover:text-zinc-400 hover:border-zinc-400 transition-colors"
                                                            >
                                                                Explore Vehicle
                                                            </Link>
                                                        </div>
                                                        <div className="w-1/2 flex items-center justify-center">
                                                            {hoveredProduct.images?.length > 0 ? (
                                                                <motion.img 
                                                                    key={`img-${hoveredProduct.id}`}
                                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ duration: 0.4 }}
                                                                    src={hoveredProduct.images.find(i => i.is_primary)?.image_url || hoveredProduct.images[0].image_url} 
                                                                    className="w-full h-auto max-h-[300px] object-contain drop-shadow-2xl" 
                                                                    alt={hoveredProduct.name} 
                                                                />
                                                            ) : (
                                                                <div className="w-full h-40 bg-zinc-800/50 flex items-center justify-center text-xs text-zinc-500 border border-dashed border-zinc-700">No Image</div>
                                                            )}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                                                        <p className="text-sm">Hover over a model to see details</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium tracking-wide transition-opacity hover:opacity-60 text-zinc-50`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center">
                        <Link
                            href="/book-a-test-ride"
                            className={`rounded-full px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950 text-zinc-50 bg-transparent`}
                        >
                            Test Ride
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`lg:hidden relative z-50 p-2 -mr-2 transition-colors text-zinc-50`}
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
                        className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl flex flex-col pt-32 px-6 pb-12"
                    >
                        <nav className="flex flex-col gap-6 mt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link
                                    href="/#scooters"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-4xl font-semibold tracking-tight text-white"
                                >
                                    Scooters
                                </Link>
                            </motion.div>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i + 1) * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-4xl font-semibold tracking-tight text-white"
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
                                className="block w-full rounded-2xl bg-white px-6 py-4 text-center text-sm font-semibold tracking-widest uppercase text-black hover:bg-zinc-200 transition-colors"
                            >
                                Book a Test Ride
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 relative">
                {!hideToaster && (props.flash?.success || props.flash?.error) && (
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 max-w-sm">
                        <FlashMessage message={props.flash?.success} type="success" />
                        <FlashMessage message={props.flash?.error} type="error" />
                    </div>
                )}
                {children}
            </main>

            {/* Clean, Modern Footer (Gap Removed) */}
            <footer className="bg-zinc-950 border-t border-zinc-800/50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-20">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <Link href="/" className="text-2xl font-semibold tracking-tight text-zinc-50">
                                RideEV
                            </Link>
                            <p className="mt-6 text-sm text-zinc-400 max-w-xs leading-relaxed">
                                Redefining urban mobility with intelligent, zero-emission vehicles designed for the modern world.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-6">Explore</p>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/#scooters" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                        Scooters
                                    </Link>
                                </li>
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Models */}
                        <div>
                            <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-6">Models</p>
                            <ul className="space-y-4">
                                {categories.flatMap(c => c.products).map(p => (
                                    <li key={`footer-prod-${p.id}`}>
                                        <Link href={`/scooters/${p.slug}`} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                            {p.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-6">Contact</p>
                            <ul className="space-y-4 text-sm font-medium text-zinc-300">
                                {settings.phone && (
                                    <li>
                                        <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
                                    </li>
                                )}
                                {settings.email && (
                                    <li>
                                        <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
                                    </li>
                                )}
                                {settings.address && (
                                    <li className="leading-relaxed pt-2 text-zinc-400 font-normal">
                                        {settings.address}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-800/50 gap-6">
                        <p className="text-xs text-zinc-500">
                            © {new Date().getFullYear()} RideEV. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-xs text-zinc-500">
                            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
