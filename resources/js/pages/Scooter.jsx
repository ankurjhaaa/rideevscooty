import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
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

            {/* Top Navigation Bar for Product */}
            <div className="border-b-[6px] border-black bg-black text-white px-6 lg:px-12 py-4 flex items-center justify-between sticky top-[96px] lg:top-[128px] z-30">
                <Link
                    href="/"
                    className="flex items-center gap-4 text-sm font-black tracking-widest uppercase hover:underline"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    SHOWROOM
                </Link>
                <span className="text-xl font-black tracking-widest uppercase">{product.name}</span>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                
                {/* Left: Sticky Gallery Side */}
                <div className="lg:col-span-7 border-b-[6px] lg:border-b-0 lg:border-r-[6px] border-black relative bg-white">
                    <div className="lg:sticky lg:top-[188px] h-auto lg:h-[calc(100vh-188px)] flex flex-col">
                        
                        {/* Main Image */}
                        <div className="flex-1 flex items-center justify-center p-12 lg:p-24 min-h-[500px]">
                            {activeImage ? (
                                <img
                                    src={activeImage.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            ) : (
                                <span className="text-4xl font-black text-black tracking-widest uppercase">NO IMAGE</span>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="h-32 border-t-[6px] border-black flex overflow-x-auto bg-black">
                                {product.images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setActiveImage(image)}
                                        className={`shrink-0 w-32 h-full border-r-[6px] border-black transition-none flex items-center justify-center p-4 bg-white ${
                                            activeImage?.id === image.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'
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
                <div className="lg:col-span-5 bg-white flex flex-col">
                    
                    {/* Header Info */}
                    <div className="p-8 lg:p-16 border-b-[6px] border-black">
                        <div className="inline-block border-[4px] border-black px-4 py-2 text-sm font-black tracking-widest uppercase mb-8">
                            {product.category?.name}
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-8">
                            {product.name}
                        </h1>
                        <p className="text-5xl lg:text-6xl font-black uppercase mb-2">
                            ₹{Number(product.price).toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm font-black tracking-widest uppercase opacity-60 mb-12">
                            EX-SHOWROOM PRICE
                        </p>

                        <Link
                            href={`/book-a-test-ride?product=${product.slug}`}
                            className="block w-full text-center bg-black text-white py-6 text-2xl font-black tracking-widest uppercase border-[6px] border-transparent hover:bg-white hover:text-black hover:border-black transition-none"
                        >
                            BOOK A TEST RIDE
                        </Link>
                    </div>

                    {/* Colors */}
                    {product.colors.length > 0 && (
                        <div className="p-8 lg:p-16 border-b-[6px] border-black">
                            <p className="text-2xl font-black tracking-widest uppercase mb-8">AVAILABLE COLORS</p>
                            <div className="flex flex-wrap gap-8">
                                {product.colors.map((color) => (
                                    <div key={color.id} className="flex flex-col items-center gap-4">
                                        <div
                                            className="h-16 w-16 border-[6px] border-black"
                                            style={{ backgroundColor: color.hex_code ?? '#000' }}
                                            title={color.name}
                                        />
                                        <span className="text-xs font-black tracking-widest uppercase">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Short Description */}
                    {product.short_description && (
                        <div className="p-8 lg:p-16 border-b-[6px] border-black bg-black text-white">
                            <p className="text-2xl font-bold uppercase leading-relaxed">
                                {product.short_description}
                            </p>
                        </div>
                    )}

                    {/* Technical Specifications Datasheet */}
                    {specs.length > 0 && (
                        <div className="flex-1 flex flex-col border-b-[6px] border-black">
                            <div className="p-8 lg:px-16 lg:py-12 border-b-[6px] border-black bg-white">
                                <p className="text-4xl font-black tracking-tighter uppercase">TECHNICAL DATASHEET</p>
                            </div>
                            
                            <div className="grid grid-cols-1 divide-y-[6px] divide-black">
                                {specs.map(([label, value]) => (
                                    <div key={label} className="grid grid-cols-3 hover:bg-black hover:text-white transition-none group">
                                        <div className="col-span-1 p-6 lg:p-8 border-r-[6px] border-black group-hover:border-white flex items-center">
                                            <p className="text-sm font-black tracking-widest uppercase">{label}</p>
                                        </div>
                                        <div className="col-span-2 p-6 lg:p-8 flex items-center">
                                            <p className="text-2xl lg:text-3xl font-black uppercase">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Full Description */}
                    {product.description && (
                        <div className="p-8 lg:p-16 bg-white">
                            <p className="text-2xl font-black tracking-widest uppercase mb-8">OVERVIEW</p>
                            <div className="text-lg font-bold uppercase leading-relaxed whitespace-pre-line opacity-80">
                                {product.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
