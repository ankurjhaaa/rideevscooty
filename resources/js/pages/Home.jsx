import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PublicLayout from '../components/PublicLayout';

// ==========================================
// ULTRA CLEAN SLIDING HERO CAROUSEL (DARK)
// ==========================================
function HeroCarousel({ products, onScrollDown }) {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = Math.abs(page % products.length);
    const activeProduct = products[imageIndex];

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        if (!products || products.length <= 1) return;
        const timer = setInterval(() => paginate(1), 6000);
        return () => clearInterval(timer);
    }, [page, products]);

    if (!products || products.length === 0) return null;

    const image = activeProduct?.images?.find(img => img.is_primary) ?? activeProduct?.images?.[0];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 200 : -200,
            opacity: 0,
            scale: 1.05
        })
    };

    return (
        <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-zinc-950 z-0 pt-16 border-b border-zinc-900">

            {/* Minimal Grid Background (Dark) */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Ambient Glow (Moody) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-800/30 rounded-full blur-[120px] z-0" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-12 items-center h-[85vh] lg:h-[70vh]">

                    {/* Left: Typography & Specs */}
                    <div className="w-full lg:col-span-5 flex flex-col justify-end lg:justify-center h-[40vh] lg:h-full pt-16 lg:pt-0 pb-4 lg:pb-0 z-20">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`text-${page}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full"
                            >
                                <div className="mb-4 lg:mb-6 flex items-center gap-4">
                                    <span className="w-8 lg:w-12 h-[1px] bg-zinc-50"></span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-50">
                                        Featured Model
                                    </span>
                                </div>

                                {/* Product Name - Truncated to 1 line */}
                                <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-tight text-white leading-[1.05] mb-4 lg:mb-6 truncate w-full">
                                    {activeProduct.name}
                                </h1>

                                <p className="text-lg lg:text-xl text-zinc-400 font-light mb-6 lg:mb-10 max-w-md">
                                    Starting at ₹{Number(activeProduct.price).toLocaleString('en-IN')}
                                </p>

                                <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10 border-t border-zinc-800/60 pt-6 lg:pt-8">
                                    <div>
                                        <p className="text-2xl lg:text-3xl font-semibold text-white">{activeProduct.range || '--'}</p>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 lg:mt-2">Certified Range</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl lg:text-3xl font-semibold text-white">{activeProduct.top_speed || '--'}</p>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 lg:mt-2">Top Speed</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <Link
                                        href={`/scooters/${activeProduct.slug}`}
                                        className="text-xs font-bold tracking-widest uppercase text-white border-b-2 border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors"
                                    >
                                        Explore
                                    </Link>
                                    <Link
                                        href="/book-a-test-ride"
                                        className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white hover:border-b-2 hover:border-white pb-1 border-b-2 border-transparent transition-all"
                                    >
                                        Test Ride
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Slider Image */}
                    <div className="w-full lg:col-span-7 h-[40vh] lg:h-full relative flex items-center justify-center z-10">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.4 }
                                }}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                            >
                                {image ? (
                                    <>
                                        {/* Subtle background text perfectly behind the image */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
                                            <h2 className="text-[20vw] lg:text-[15vw] font-black text-white whitespace-nowrap select-none opacity-[0.03]">
                                                {activeProduct.name}
                                            </h2>
                                        </div>
                                        {/* Massive image scaling to fill space */}
                                        <img
                                            src={image.image_url}
                                            className="w-auto h-full max-h-[100%] max-w-[100%] lg:w-[90%] lg:max-w-[800px] object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
                                            alt={activeProduct.name}
                                        />
                                    </>
                                ) : (
                                    <span className="text-zinc-600 uppercase tracking-widest text-sm border border-zinc-800 rounded-full px-6 py-3">No Image</span>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>

            {/* Pagination Controls */}
            {products.length > 1 && (
                <div className="absolute bottom-6 lg:bottom-12 right-6 lg:right-12 z-20 flex items-center gap-4 lg:gap-8">
                    <div className="flex items-center gap-3">
                        <span className="text-xs lg:text-sm font-semibold text-white">
                            {String(imageIndex + 1).padStart(2, '0')}
                        </span>
                        <div className="w-16 lg:w-24 h-[2px] bg-zinc-800 relative overflow-hidden">
                            <motion.div
                                key={`progress-${page}`}
                                initial={{ x: '-100%' }}
                                animate={{ x: '0%' }}
                                transition={{ duration: 6, ease: "linear" }}
                                className="absolute inset-0 bg-white"
                            />
                        </div>
                        <span className="text-xs lg:text-sm font-semibold text-zinc-500">
                            {String(products.length).padStart(2, '0')}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => paginate(-1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors bg-zinc-950/50 backdrop-blur"
                            aria-label="Previous Slide"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors bg-zinc-950/50 backdrop-blur"
                            aria-label="Next Slide"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

// ==========================================
// Full Screen Product Section Component (Sticky Wipe)
// ==========================================
function FullScreenProduct({ product, index, setActiveIndex, isFirst }) {
    const image = product.images?.find((img) => img.is_primary) ?? product.images?.[0];

    // Deep dark flat backgrounds
    const bgColors = ['bg-[#0a0a0a]', 'bg-black', 'bg-zinc-950'];
    const bgColor = bgColors[index % bgColors.length];

    // Hero section has image on the Right.
    // To create a perfect Zig-Zag, the first product (index 0) should have the Image on the LEFT.
    const isImageLeft = index % 2 === 0;

    const wrapperRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveIndex(index);
                }
            },
            { threshold: 0.4 }
        );
        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }
        return () => observer.disconnect();
    }, [index, setActiveIndex]);

    return (
        <div
            id={isFirst ? 'scooters' : `product-${index}`}
            ref={wrapperRef}
            className="h-[120vh] relative w-full"
        >
            <div className={`h-[100dvh] w-full sticky top-0 flex flex-col items-center justify-center overflow-hidden ${bgColor} border-t border-zinc-900`}>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
                >
                    <h2 className="text-[25vw] md:text-[20vw] font-bold text-white/[0.02] whitespace-nowrap tracking-tighter uppercase select-none px-10">
                        {product.name}
                    </h2>
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 h-[85vh] lg:h-full gap-4 lg:gap-16 pt-10 lg:pt-0">

                    {/* Text Section: Alternates left/right on desktop */}
                    <div className={`w-full flex flex-col justify-end lg:justify-center h-[40vh] lg:h-full pt-16 lg:pt-0 z-20 ${isImageLeft ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'}`}>
                        <motion.div
                            initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="w-full"
                        >
                            {/* Product Name - Truncated to 1 line */}
                            <h3 className="text-5xl sm:text-6xl md:text-6xl xl:text-7xl font-medium text-white mb-4 lg:mb-6 leading-[1.05] tracking-tight truncate w-full">
                                {product.name}
                            </h3>

                            <p className="text-lg lg:text-xl text-zinc-400 font-light mb-6 lg:mb-10 max-w-md">
                                Starting at ₹{Number(product.price).toLocaleString('en-IN')}
                            </p>

                            <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-10 border-t border-zinc-800/60 pt-6 lg:pt-8">
                                <div>
                                    <p className="text-2xl lg:text-3xl font-semibold text-white">{product.range || '--'}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 lg:mt-2">Estimated Range</p>
                                </div>
                                <div>
                                    <p className="text-2xl lg:text-3xl font-semibold text-white">{product.top_speed || '--'}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 lg:mt-2">Top Speed</p>
                                </div>
                            </div>

                            <Link
                                href={`/scooters/${product.slug}`}
                                className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.15em] uppercase text-white border-b-2 border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors"
                            >
                                Explore Vehicle
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Reveal Section: Alternates left/right on desktop */}
                    <div className={`w-full flex items-start lg:items-center justify-center h-[40vh] lg:h-full relative z-10 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: isImageLeft ? -30 : 30 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full flex flex-col items-center justify-center relative"
                        >
                            {image ? (
                                <img
                                    src={image.image_url}
                                    alt={product.name}
                                    className="w-auto h-full max-h-[100%] max-w-[100%] lg:w-[90%] lg:max-h-[60vh] object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
                                />
                            ) : (
                                <span className="text-zinc-600 font-light tracking-widest uppercase flex h-full items-center justify-center relative z-10">Render Pending</span>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// ==========================================
// Spinning EV Badge Component
// ==========================================
function EVBadge() {
    return (
        <div className="fixed bottom-10 left-10 z-50 hidden lg:flex items-center justify-center w-32 h-32 pointer-events-none">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <defs>
                        <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fontSize="11.5" fontWeight="bold" letterSpacing="2.5" fill="currentColor">
                        <textPath href="#circle">
                            100% ELECTRIC • ZERO EMISSIONS •
                        </textPath>
                    </text>
                </svg>
            </motion.div>
            <div className="w-2 h-2 bg-white rounded-full mix-blend-difference" />
        </div>
    );
}

// ==========================================
// Home Component
// ==========================================
export default function Home({ heroProducts, products }) {
    const { props } = usePage();
    const [activeProductIndex, setActiveProductIndex] = useState(-1);

    const displayHeroProducts = heroProducts?.length > 0 ? heroProducts : products;
    const displayProducts = products?.length > 0 ? products : [];

    const scrollToSection = (index) => {
        let targetId = '';
        if (index === -1) targetId = 'hero';
        else if (index >= 0 && index < displayProducts.length) {
            targetId = index === 0 ? 'scooters' : `product-${index}`;
        } else if (index === displayProducts.length) {
            targetId = 'features';
        }

        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Observer for Hero Section
    const heroRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveProductIndex(-1);
                }
            },
            { threshold: 0.5 }
        );
        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    // Observer for Features Section
    const featuresRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveProductIndex(displayProducts.length);
                }
            },
            { threshold: 0.2 }
        );
        if (featuresRef.current) observer.observe(featuresRef.current);
        return () => observer.disconnect();
    }, [displayProducts.length]);

    // Check if we are currently viewing the product sticky wipes
    const isViewingProducts = activeProductIndex >= 0 && activeProductIndex < displayProducts.length;

    return (
        <PublicLayout>
            <Head title="RideEV — The Future is Electric" />

            <EVBadge />

            {/* Floating Right Navigation (Up/Down Arrows) - Only visible on Products section */}
            <AnimatePresence>
                {isViewingProducts && displayProducts.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed right-4 lg:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
                    >
                        <button
                            onClick={() => scrollToSection(activeProductIndex - 1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 border border-zinc-800 rounded-full flex items-center justify-center bg-zinc-950/80 backdrop-blur text-white hover:bg-white hover:text-black transition-colors"
                            aria-label="Previous Product"
                        >
                            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollToSection(activeProductIndex + 1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 border border-zinc-800 rounded-full flex items-center justify-center bg-zinc-950/80 backdrop-blur text-white hover:bg-white hover:text-black transition-colors"
                            aria-label="Next Product"
                        >
                            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEW: ULTRA CLEAN SLIDING HERO CAROUSEL */}
            <div ref={heroRef}>
                <HeroCarousel products={displayHeroProducts} onScrollDown={() => scrollToSection(0)} />
            </div>

            {/* FULL SCREEN STICKY WIPE (Deep Dive, Alternating Layout) */}
            <div className="relative z-10 bg-zinc-950">
                {displayProducts?.map((product, idx) => (
                    <FullScreenProduct
                        key={`full-${product.id}`}
                        product={product}
                        index={idx}
                        setActiveIndex={setActiveProductIndex}
                        isFirst={idx === 0}
                    />
                ))}
            </div>

            {/* View All Scooters CTA */}
            {displayProducts.length > 0 && (
                <div className="relative z-10 bg-zinc-950 border-t border-zinc-800/60 py-20 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-zinc-500 font-light mb-6">Explore the complete RideEV lineup.</p>
                        <Link
                            href="/scooters"
                            className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-black transition-colors"
                        >
                            View All Scooters
                        </Link>
                    </motion.div>
                </div>
            )}

            {/* ELEGANT FEATURES SHOWCASE */}
            <section id="features" ref={featuresRef} className="py-24 lg:py-48 bg-zinc-950 z-20 relative border-t border-zinc-800/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="mb-16 lg:mb-32 text-center"
                    >
                        <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-white">A New Era of Mobility.</h2>
                        <p className="text-lg lg:text-xl text-zinc-400 mt-4 lg:mt-6 max-w-2xl mx-auto font-light">Engineered to outperform, designed to turn heads.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                        {[
                            { title: 'Intelligent Range', desc: 'Advanced battery management ensuring you reach your destination with confidence.' },
                            { title: 'Aerospace Materials', desc: 'Ultra-lightweight frame crafted from high-grade aluminum for ultimate agility.' },
                            { title: 'Connected Ride', desc: 'Seamlessly sync with your smartphone for navigation, diagnostics, and security.' },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-zinc-900/40 rounded-3xl transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out -z-10" />
                                <div className="p-8 lg:p-10">
                                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border border-zinc-800 flex items-center justify-center text-sm font-semibold mb-6 lg:mb-10 text-white group-hover:bg-white group-hover:text-black transition-colors duration-500">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="text-xl lg:text-3xl font-medium text-white mb-3 lg:mb-6">{feature.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed font-light text-base lg:text-lg">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
