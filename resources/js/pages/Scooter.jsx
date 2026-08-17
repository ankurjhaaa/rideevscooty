import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

export default function Scooter({ product }) {
    const [activeImage, setActiveImage] = useState(
        product.images.find((img) => img.is_primary) ?? product.images[0] ?? null,
    );

    const specs = [
        ['Motor Power', product.motor_power],
        ['Top Speed', product.top_speed],
        ['Range', product.range],
        ['Battery Capacity', product.battery_capacity],
        ['Charging Time', product.charging_time],
        ['EMI', product.emi_info],
    ].filter(([, value]) => value);

    return (
        <PublicLayout>
            <Head title={`${product.name} | RideEV`} />

            {/* Top Minimalist Breadcrumb/Nav */}
            <div className="bg-white px-6 lg:px-12 py-6 flex items-center justify-between sticky top-[72px] lg:top-[88px] z-30 border-b border-gray-100">
                <Link
                    href="/#scooters"
                    className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Models
                </Link>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-black">{product.name}</span>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-140px)]">
                
                {/* Left: Sticky Gallery Side */}
                <div className="lg:col-span-7 bg-[#fafafa] relative">
                    <div className="lg:sticky lg:top-[140px] h-[50vh] lg:h-[calc(100vh-140px)] flex flex-col p-8 lg:p-16">
                        
                        {/* Main Image with AnimatePresence */}
                        <div className="flex-1 flex items-center justify-center relative w-full h-full">
                            <AnimatePresence mode="wait">
                                {activeImage ? (
                                    <motion.img
                                        key={activeImage.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        src={activeImage.image_url}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply drop-shadow-none"
                                    />
                                ) : (
                                    <span className="text-sm font-light tracking-widest uppercase text-gray-400">Render Pending</span>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-4 overflow-x-auto pb-4">
                                {product.images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setActiveImage(image)}
                                        className={`shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center p-2 transition-all duration-300 ${
                                            activeImage?.id === image.id 
                                                ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-gray-200' 
                                                : 'bg-transparent opacity-60 hover:opacity-100 hover:bg-white/50'
                                        }`}
                                    >
                                        <img
                                            src={image.image_url}
                                            alt={image.type ?? product.name}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Scrollable Info Side */}
                <div className="lg:col-span-5 bg-white flex flex-col px-8 lg:px-16 py-12 lg:py-24">
                    
                    {/* Header Info */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-gray-300"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                                {product.category?.name || 'Electric Vehicle'}
                            </span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-medium tracking-tight text-black mb-4 leading-[1.05]">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-baseline gap-2 mb-10">
                            <p className="text-3xl lg:text-4xl font-semibold text-black">
                                ₹{Number(product.price).toLocaleString('en-IN')}
                            </p>
                            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Ex-Showroom</span>
                        </div>

                        {product.short_description && (
                            <p className="text-lg lg:text-xl font-light text-gray-500 leading-relaxed mb-12">
                                {product.short_description}
                            </p>
                        )}

                        <div className="flex items-center gap-6">
                            <Link
                                href={`/book-a-test-ride?product=${product.slug}`}
                                className="w-full lg:w-auto inline-flex items-center justify-center rounded-full bg-black text-white px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors"
                            >
                                Book a Test Ride
                            </Link>
                        </div>
                    </motion.div>

                    {/* Colors */}
                    {product.colors.length > 0 && (
                        <div className="mb-16 pt-16 border-t border-gray-100">
                            <p className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-8">Available Finishes</p>
                            <div className="flex flex-wrap gap-8">
                                {product.colors.map((color) => (
                                    <div key={color.id} className="flex flex-col items-center gap-3">
                                        <div
                                            className="h-10 w-10 rounded-full shadow-inner ring-1 ring-black/5"
                                            style={{ backgroundColor: color.hex_code ?? '#000' }}
                                            title={color.name}
                                        />
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Technical Specifications Datasheet */}
                    {specs.length > 0 && (
                        <div className="mb-16 pt-16 border-t border-gray-100">
                            <p className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-8">Technical Specifications</p>
                            
                            <div className="flex flex-col gap-6">
                                {specs.map(([label, value]) => (
                                    <div key={label} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-gray-100 pb-4">
                                        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 sm:mb-0">{label}</p>
                                        <p className="text-lg lg:text-xl font-medium text-black text-right">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Full Description */}
                    {product.description && (
                        <div className="pt-16 border-t border-gray-100">
                            <p className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-8">Overview</p>
                            <div className="text-base lg:text-lg font-light text-gray-500 leading-relaxed whitespace-pre-line">
                                {product.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
