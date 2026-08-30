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

function Logo({ settings, className = 'h-6 lg:h-8' }) {
    const src = settings?.logo_url || '/logo.png';
    return <img src={src} alt="RideEV Logo" className={`${className} w-auto object-contain`} />;
}

export default function PublicLayout({ children, hideToaster = false }) {
    const { props } = usePage();
    const categories = props.categories ?? [];
    const settings = props.siteSettings ?? {};
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null); // Mobile accordion state
    
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
        { name: 'About', href: '/about' },
        { name: 'Videos', href: '/videos' },
        { name: 'Accessories', href: '/accessories' },
        { name: 'Dealership', href: '/dealership' },
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
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-full relative">
                    
                    {/* Mobile Left: Menu Toggle */}
                    <div className="flex-1 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            className="relative z-50 p-2 -ml-2 transition-colors text-zinc-50"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Logo (Centered on Mobile, Left on Desktop) */}
                    <div className="flex-1 lg:flex-none flex justify-center lg:justify-start z-50">
                        <Link href="/" className="flex items-center">
                            <Logo settings={settings} className="h-10 lg:h-16" />
                        </Link>
                    </div>

                    {/* Mobile Right: Book Link */}
                    <div className="flex-1 lg:hidden flex justify-end z-50">
                        <Link
                            href="/book-a-test-ride"
                            className="text-[10px] font-bold tracking-widest uppercase text-white hover:text-zinc-400 transition-colors"
                        >
                            Book
                        </Link>
                    </div>

                    {/* Desktop Navigation (Absolute Center) */}
                    <nav className="hidden lg:flex items-center justify-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full z-[60]">

                        {/* Models Mega Menu */}
                        <div
                            className="h-full flex items-center"
                            onMouseEnter={handleMegaMenuEnter}
                            onMouseLeave={handleMegaMenuLeave}
                        >
                            {/* We add a large transparent padding box around the trigger so the mouse never falls into a "gap" */}
                            <div className="relative py-6 -my-6 flex items-center">
                                <button className="text-sm font-medium tracking-wide transition-opacity hover:opacity-60 flex items-center gap-2 cursor-pointer">
                                    Models
                                    <svg className={`w-3 h-3 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                            </div>
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

                    {/* Mega menu dropdown - positioned relative to the full-width header row, not the narrow centered nav */}
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
                                        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto thin-scrollbar pr-2">
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
                                        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto thin-scrollbar pr-2">
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
                                                    <Link href={`/scooters/${hoveredProduct.slug}`} onClick={() => setIsMegaMenuOpen(false)}>
                                                        <h4 className="text-4xl font-medium tracking-tight mb-4 hover:text-zinc-300 transition-colors">{hoveredProduct.name}</h4>
                                                    </Link>
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
                                                        <motion.div
                                                            key={`img-${hoveredProduct.id}`}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.4 }}
                                                        >
                                                            <Link href={`/scooters/${hoveredProduct.slug}`} onClick={() => setIsMegaMenuOpen(false)} className="block relative z-10 w-full h-full flex items-center justify-center">
                                                                <img
                                                                    src={hoveredProduct.images?.find(i => i.is_primary)?.image_url ?? hoveredProduct.images?.[0]?.image_url}
                                                                    className="w-full max-h-[300px] object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-700 cursor-pointer"
                                                                    alt={hoveredProduct.name}
                                                                />
                                                            </Link>
                                                        </motion.div>
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

                    <div className="hidden lg:flex flex-1 justify-end items-center z-50">
                        <Link
                            href="/book-a-test-ride"
                            className={`rounded-full px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950 text-zinc-50 bg-transparent`}
                        >
                            Test Ride
                        </Link>
                    </div>
                </div>
            </header>

            {/* Elegant Mobile Menu Drawer with Framer Motion */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Sidebar Drawer */}
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-y-0 left-0 z-[70] w-[85vw] max-w-sm bg-zinc-950/95 backdrop-blur-2xl border-r border-zinc-800 flex flex-col shadow-2xl lg:hidden will-change-transform"
                        >
                            {/* Sidebar Header (Sticky) */}
                            <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md">
                                <Link href="/" onClick={() => setMobileOpen(false)}>
                                    <Logo settings={settings} className="h-6" />
                                </Link>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 -mr-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900 rounded-full"
                                >
                                    <CloseIcon className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Sidebar Content */}
                            <div className="flex-1 flex flex-col py-8 px-6 gap-12 relative z-10 overflow-y-auto thin-scrollbar">
                                
                                {/* Products Section (Accordion) */}
                                <div>
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-6">Our Models</p>
                                    <div className="flex flex-col gap-4">
                                        {categories.map((cat, i) => (
                                            <motion.div 
                                                key={`mob-cat-${cat.id}`}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.1 + (i * 0.05), ease: "easeOut" }}
                                                className="border-b border-zinc-800/50 last:border-0 overflow-hidden"
                                            >
                                                {/* Accordion Header */}
                                                <button 
                                                    onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                                    className="w-full flex items-center justify-between py-5 text-left"
                                                >
                                                    <h3 className="text-base font-medium text-white tracking-tight">{cat.name}</h3>
                                                    <svg 
                                                        className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${expandedCategory === cat.id ? 'rotate-180' : ''}`} 
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {/* Accordion Content */}
                                                <AnimatePresence>
                                                    {expandedCategory === cat.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pb-5 pt-0 flex flex-col gap-4 mt-2 pt-2">
                                                                {cat.products?.map(prod => (
                                                                    <Link
                                                                        key={`mob-prod-${prod.id}`}
                                                                        href={`/scooters/${prod.slug}`}
                                                                        onClick={() => setMobileOpen(false)}
                                                                        className="flex items-center gap-4 group bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-all"
                                                                    >
                                                                        {/* Thumbnail Image */}
                                                                        <div className="w-16 h-12 bg-black rounded-lg flex items-center justify-center p-1 shrink-0">
                                                                            {prod.images?.length > 0 ? (
                                                                                <img 
                                                                                    src={prod.images.find(i => i.is_primary)?.image_url || prod.images[0].image_url} 
                                                                                    className="w-full h-full object-contain" 
                                                                                    alt={prod.name} 
                                                                                />
                                                                            ) : (
                                                                                <div className="text-[8px] text-zinc-600">No Img</div>
                                                                            )}
                                                                        </div>
                                                                        {/* Details */}
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">{prod.name}</p>
                                                                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">₹{Number(prod.price).toLocaleString('en-IN')}</p>
                                                                        </div>
                                                                        {/* Arrow */}
                                                                        <svg className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                                        </svg>
                                                                    </Link>
                                                                ))}
                                                                {(!cat.products || cat.products.length === 0) && (
                                                                    <p className="text-xs text-zinc-600 italic text-center py-2">Models coming soon</p>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Links Section */}
                                <div className="border-t border-zinc-800/50 pt-8">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-6">Explore</p>
                                    <nav className="flex flex-col gap-4">
                                        {navLinks.map((link, i) => (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.2 + (i * 0.05), ease: "easeOut" }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="text-2xl font-medium tracking-tight text-white hover:text-zinc-300 transition-colors"
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            {/* Sidebar Footer (Sticky Bottom) */}
                            <div className="mt-auto sticky bottom-0 p-6 border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-2xl">
                                <Link
                                    href="/book-a-test-ride"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full rounded-xl bg-white px-6 py-4 text-center text-sm font-bold tracking-[0.2em] uppercase text-black hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                >
                                    Book Test Ride
                                </Link>
                            </div>
                        </motion.div>
                    </>
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
                            <Link href="/" className="inline-block">
                                <Logo settings={settings} className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
                            </Link>
                            <p className="mt-6 text-sm text-zinc-400 max-w-xs leading-relaxed mb-6">
                                Redefining urban mobility with intelligent, zero-emission vehicles designed for the modern world.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                {settings.facebook_url && (
                                    <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-zinc-800 flex items-center justify-center hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:scale-110 transition-all" aria-label="Facebook">
                                        <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6c1.05 0 2.05.2 2.3.29V9h-1.6c-1.25 0-1.5.74-1.5 1.47V12h3.1l-.5 3h-2.6v6.8C18.56 20.87 22 16.84 22 12z"/></svg>
                                    </a>
                                )}
                                {settings.instagram_url && (
                                    <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-zinc-800 flex items-center justify-center hover:border-[#ee2a7b]/50 hover:bg-[#ee2a7b]/10 hover:scale-110 transition-all" aria-label="Instagram">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <defs>
                                                <linearGradient id="ig-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#f9ce34" />
                                                    <stop offset="50%" stopColor="#ee2a7b" />
                                                    <stop offset="100%" stopColor="#6228d7" />
                                                </linearGradient>
                                            </defs>
                                            <path fill="url(#ig-gradient-footer)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                )}
                                {settings.youtube_url && (
                                    <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-zinc-800 flex items-center justify-center hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 hover:scale-110 transition-all" aria-label="YouTube">
                                        <svg className="w-5 h-5" fill="#FF0000" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                    </a>
                                )}
                            </div>

                            {/* QR Codes: Scan to Follow / Review */}
                            {(settings.instagram_qr_url || settings.google_review_qr_url) && (
                                <div className="mt-8 flex items-start gap-6">
                                    {settings.instagram_qr_url && (
                                        <a
                                            href={settings.instagram_url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group text-center"
                                        >
                                            <div className="w-32 h-32 rounded-xl bg-white p-2 border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                                                <img
                                                    src={settings.instagram_qr_url}
                                                    alt="Scan to follow on Instagram"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <p className="mt-2 text-[10px] font-medium tracking-wide text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                Scan to Follow
                                            </p>
                                        </a>
                                    )}
                                    {settings.google_review_qr_url && (
                                        <a
                                            href={settings.google_review_url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group text-center"
                                        >
                                            <div className="w-32 h-32 rounded-xl bg-white p-2 border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                                                <img
                                                    src={settings.google_review_qr_url}
                                                    alt="Scan to review us on Google"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <p className="mt-2 text-[10px] font-medium tracking-wide text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                Scan to Review
                                            </p>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        <div>
                            <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-6">Explore</p>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/#scooters" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                        Models
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
