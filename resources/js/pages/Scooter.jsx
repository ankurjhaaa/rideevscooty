import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

export default function Scooter({ product }) {
    const [activeImage, setActiveImage] = useState(
        product.images.find((img) => img.is_primary) ?? product.images[0] ?? null,
    );

    const numericSpecs = [
        ['Top Speed', product.top_speed, 'km/h', 120], // Assuming 120 is max for progress bar
        ['Range', product.range, 'km', 200],         // Assuming 200 is max
    ].filter(([, value]) => value);

    const otherSpecs = [
        ['Motor Power', product.motor_power],
        ['Battery', product.battery_capacity],
        ['Charging', product.charging_time],
    ].filter(([, value]) => value);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <PublicLayout>
            <Head title={`${product.name} | RideEV`} />

            <div className="bg-black min-h-screen relative pt-[88px] pb-24">
                <div className="max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-start relative">
                    
                    {/* Left: Gallery (Sticky) */}
                    <div className="lg:col-span-7 relative h-[60vh] lg:h-[calc(100vh-88px)] lg:sticky lg:top-[88px] z-10 flex flex-row">
                        
                        {/* Vertical Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="w-20 lg:w-32 h-full flex flex-col justify-center gap-4 py-8 px-4 lg:px-8 border-r border-zinc-900/50 z-20">
                                {product.images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setActiveImage(image)}
                                        className={`w-full aspect-square rounded-xl p-2 transition-all duration-300 relative overflow-hidden group ${
                                            activeImage?.id === image.id 
                                                ? 'bg-zinc-900/80 ring-1 ring-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                                                : 'bg-zinc-900/30 hover:bg-zinc-900/80 opacity-50 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={image.image_url}
                                            alt={image.type ?? product.name}
                                            className="w-full h-full object-contain mix-blend-screen"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main Image Area */}
                        <div className="flex-1 relative h-full flex items-center justify-center overflow-hidden">
                            {/* Studio Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none z-0" />
                            
                            {/* Fake UI Badges */}
                            <div className="absolute top-8 left-8 z-20 flex gap-4">
                                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-800 text-[10px] font-bold tracking-widest uppercase text-white cursor-pointer hover:bg-white hover:text-black transition-colors">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    360° View
                                </span>
                            </div>

                            <AnimatePresence mode="wait">
                                {activeImage ? (
                                    <motion.img
                                        key={activeImage.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        style={{ willChange: "transform, opacity" }}
                                        src={activeImage.image_url}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-contain p-8 z-10"
                                    />
                                ) : (
                                    <span className="text-sm font-light tracking-widest uppercase text-zinc-600">Render Pending</span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Info Side */}
                    <div className="lg:col-span-5 flex flex-col px-8 lg:px-16 py-12 lg:py-16 relative z-20">
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                            
                            {/* Header */}
                            <motion.div variants={itemVariants} className="mb-14">
                                <h1 className="text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-4 leading-[1.05]">
                                    {product.name}
                                </h1>
                                <p className="text-base lg:text-xl font-light text-zinc-400 leading-relaxed">
                                    {product.short_description || 'The future of electric mobility, engineered for performance.'}
                                </p>
                            </motion.div>

                            {/* Minimalist Specs with Progress Bars */}
                            {(numericSpecs.length > 0 || otherSpecs.length > 0) && (
                                <motion.div variants={itemVariants} className="mb-16">
                                    <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-zinc-600 mb-8">Performance</h3>
                                    
                                    <div className="flex flex-col gap-8">
                                        {numericSpecs.map(([label, value, unit, max]) => {
                                            const numValue = parseInt(value) || 0;
                                            const percentage = Math.min((numValue / max) * 100, 100);
                                            return (
                                                <div key={label} className="w-full">
                                                    <div className="flex justify-between items-end mb-4">
                                                        <span className="text-sm font-bold tracking-widest uppercase text-zinc-400">{label}</span>
                                                        <span className="text-3xl font-medium text-white tracking-tight">{value} <span className="text-sm text-zinc-600">{unit}</span></span>
                                                    </div>
                                                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${percentage}%` }}
                                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                            viewport={{ once: true }}
                                                            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <div className="grid grid-cols-2 gap-x-12 gap-y-10 mt-6 pt-10 border-t border-zinc-900">
                                            {otherSpecs.map(([label, value]) => (
                                                <div key={label}>
                                                    <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-600 mb-2">{label}</span>
                                                    <span className="block text-xl font-medium text-white">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Colors */}
                            {product.colors.length > 0 && (
                                <motion.div variants={itemVariants} className="mb-16">
                                    <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-zinc-600 mb-8">Finishes</h3>
                                    <div className="flex flex-wrap gap-6">
                                        {product.colors.map((color) => (
                                            <div key={color.id} className="flex flex-col items-center gap-3 group cursor-pointer">
                                                <div
                                                    className="h-14 w-14 rounded-full shadow-inner ring-1 ring-zinc-800 group-hover:ring-white transition-all duration-500 group-hover:scale-110"
                                                    style={{ backgroundColor: color.hex_code ?? '#000' }}
                                                    title={color.name}
                                                />
                                                <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors">{color.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Core Technology (New Section) */}
                            <motion.div variants={itemVariants} className="mb-16">
                                <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-zinc-600 mb-8">Core Technology</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 text-white">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-white mb-2">Hyperdrive Motor</h4>
                                            <p className="text-sm font-light text-zinc-500 leading-relaxed">Instant torque delivery for unparalleled acceleration in city traffic.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 text-white">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-white mb-2">Smart Connectivity</h4>
                                            <p className="text-sm font-light text-zinc-500 leading-relaxed">Over-the-air updates, GPS tracking, and ride analytics directly to your phone.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Full Description */}
                            {product.description && (
                                <motion.div variants={itemVariants} className="pb-16">
                                    <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-zinc-600 mb-8">Design Philosophy</h3>
                                    <div className="text-lg font-light text-zinc-400 leading-relaxed whitespace-pre-line">
                                        {product.description}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Floating Action Bar (Sticky Bottom) */}
            <div className="fixed bottom-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800/50 py-4 px-6 lg:px-12 transform translate-y-0 transition-transform duration-500">
                <div className="max-w-[2000px] mx-auto flex items-center justify-between">
                    <div className="hidden sm:block">
                        <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">{product.name}</p>
                        <p className="text-2xl font-semibold text-white tracking-tight">₹{Number(product.price).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="w-full sm:w-auto flex justify-end">
                        <Link
                            href={`/book-a-test-ride?product=${product.slug}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white text-black px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        >
                            Book a Test Ride
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
