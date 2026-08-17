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
            <Head title={product.name} />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to showroom
                </Link>

                <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                    {/* Gallery */}
                    <div className="sticky top-28">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-50 ring-1 ring-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            {activeImage ? (
                                <img
                                    src={activeImage.image_url}
                                    alt={product.name}
                                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105 p-8"
                                />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center text-center p-8">
                                    <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Image Coming Soon</span>
                                </div>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="mt-4 flex gap-4 overflow-x-auto pb-2 thin-scrollbar">
                                {product.images.map((image) => (
                                    <button
                                        key={image.id}
                                        type="button"
                                        onClick={() => setActiveImage(image)}
                                        className={`relative h-20 w-28 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-50 transition-all duration-200 ${
                                            activeImage?.id === image.id
                                                ? 'ring-2 ring-emerald-500 ring-offset-2'
                                                : 'ring-1 ring-gray-200 hover:ring-gray-300'
                                        }`}
                                    >
                                        <img
                                            src={image.image_url}
                                            alt={image.type ?? product.name}
                                            className="h-full w-full object-contain mix-blend-multiply p-2"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="py-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold tracking-wide text-emerald-700 uppercase">
                            {product.category?.name}
                        </div>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
                        
                        <div className="mt-6 flex items-baseline gap-4">
                            <p className="text-4xl font-extrabold text-gray-900">
                                ₹{Number(product.price).toLocaleString('en-IN')}
                            </p>
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Ex-Showroom</span>
                        </div>
                        
                        {product.emi_info && (
                            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-semibold text-gray-700">{product.emi_info}</p>
                            </div>
                        )}

                        {product.short_description && (
                            <p className="mt-8 text-lg leading-relaxed text-gray-600">
                                {product.short_description}
                            </p>
                        )}

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href={`/book-a-test-ride?product=${product.slug}`}
                                className="group relative overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-gray-900/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gray-900/30"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Book a Test Ride
                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                            </Link>
                        </div>

                        {product.colors.length > 0 && (
                            <div className="mt-12 pt-10 border-t border-gray-100">
                                <p className="mb-4 text-sm font-bold tracking-wide text-gray-900 uppercase">
                                    Available Colors
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    {product.colors.map((color) => (
                                        <div key={color.id} className="group flex flex-col items-center gap-2">
                                            <div
                                                className="relative h-10 w-10 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: color.hex_code ?? '#ccc' }}
                                                title={color.name}
                                            >
                                                {/* Glossy reflection effect */}
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/30" />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500">
                                                {color.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {specs.length > 0 && (
                            <div className="mt-12 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
                                    <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">
                                        Key Specifications
                                    </p>
                                </div>
                                <dl className="grid grid-cols-2 divide-x divide-y divide-gray-100 sm:grid-cols-2">
                                    {specs.map(([label, value]) => (
                                        <div key={label} className="p-6 transition-colors hover:bg-gray-50/50">
                                            <dt className="text-xs font-bold tracking-wider text-gray-500 uppercase">{label}</dt>
                                            <dd className="mt-2 text-lg font-extrabold text-gray-900">
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}

                        {product.description && (
                            <div className="mt-12 border-t border-gray-100 pt-10">
                                <h2 className="text-xl font-bold text-gray-900">About this scooter</h2>
                                <div className="mt-4 prose prose-emerald prose-gray max-w-none">
                                    <p className="whitespace-pre-line leading-relaxed text-gray-600">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
