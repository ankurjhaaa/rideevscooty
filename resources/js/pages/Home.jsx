import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '../components/PublicLayout';

function ProductCard({ product }) {
    const image = product.images?.find((img) => img.is_primary) ?? product.images?.[0];

    return (
        <Link
            href={`/scooters/${product.slug}`}
            className="group block overflow-hidden rounded-3xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {image ? (
                    <img
                        src={image.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                        <svg className="mb-2 h-10 w-10 text-gray-300 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Coming Soon</span>
                    </div>
                )}
                
                {/* Badge */}
                {product.is_featured && (
                    <div className="absolute top-4 left-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-wider text-emerald-600 shadow-sm backdrop-blur-sm">
                        Bestseller
                    </div>
                )}
            </div>
            
            <div className="p-6 md:p-8">
                <p className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">
                    {product.category?.name}
                </p>
                <div className="mt-2 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-emerald-700">
                        {product.name}
                    </h3>
                    <p className="text-xl font-extrabold text-gray-900 shrink-0">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                    </p>
                </div>
                {product.short_description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
                        {product.short_description}
                    </p>
                )}
                
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        View Details
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function Home({ featuredProducts }) {
    const { props } = usePage();
    const categories = props.categories ?? [];

    const heroProduct = featuredProducts[0];
    const heroImage = heroProduct?.images?.find((img) => img.is_primary) ?? heroProduct?.images?.[0];

    return (
        <PublicLayout>
            <Head title="RideEV — Premium Electric Scooters" />

            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-50 pt-8 pb-20 lg:pt-16 lg:pb-28">
                {/* Background decorative elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute -top-[30%] -right-[10%] h-[1000px] w-[1000px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-50/20 blur-3xl" />
                    <div className="absolute -bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-50/40 to-emerald-50/20 blur-3xl" />
                </div>
                
                <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/50 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700 uppercase">
                            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                            Power your every ride
                        </div>
                        <h1 className="mt-8 text-5xl leading-[1.05] font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-[4rem]">
                            Electric <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">scooters</span> built for the modern rider.
                        </h1>
                        <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                            Experience the perfect blend of power, range, and design. Zero emissions, zero noise, 100% thrill.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href="#scooters"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-gray-800 hover:shadow-xl"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Lineup
                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </a>
                            <Link
                                href="/book-a-test-ride"
                                className="inline-flex items-center justify-center rounded-full border-2 border-gray-200 bg-transparent px-8 py-3.5 text-sm font-bold tracking-wide text-gray-900 transition-colors hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50"
                            >
                                Book Test Ride
                            </Link>
                        </div>
                        
                        {/* Trust indicators */}
                        <div className="mt-12 flex items-center gap-8 border-t border-gray-200/60 pt-8">
                            <div>
                                <p className="text-3xl font-extrabold text-gray-900">10k+</p>
                                <p className="text-sm font-medium text-gray-500">Happy Riders</p>
                            </div>
                            <div className="h-10 w-px bg-gray-200" />
                            <div>
                                <p className="text-3xl font-extrabold text-gray-900">5yr</p>
                                <p className="text-sm font-medium text-gray-500">Battery Warranty</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        {heroImage ? (
                            <div className="relative">
                                {/* Decorative circle behind scooter */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] w-[110%] rounded-full bg-gradient-to-tr from-emerald-100 to-transparent blur-2xl opacity-60" />
                                <img
                                    src={heroImage.image_url}
                                    alt={heroProduct.name}
                                    className="relative z-10 w-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.15)] animate-[float_6s_ease-in-out_infinite]"
                                    style={{ animation: 'float 6s ease-in-out infinite' }}
                                />
                                <style>{`
                                    @keyframes float {
                                        0% { transform: translateY(0px); }
                                        50% { transform: translateY(-15px); }
                                        100% { transform: translateY(0px); }
                                    }
                                `}</style>
                            </div>
                        ) : (
                            <div className="mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur-sm">
                                <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Scooter Image Pending</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Featured products */}
            {featuredProducts.length > 0 && (
                <section className="relative z-20 -mt-8 px-4 sm:px-6">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Browse by category */}
            <section id="scooters" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Find your perfect match</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Whether you need a daily city commuter or a heavy-duty delivery partner, we have an EV for you.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-xl hover:ring-emerald-100"
                        >
                            {/* Decorative accent */}
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                    {category.name}
                                </h3>
                                {category.description && (
                                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                        {category.description}
                                    </p>
                                )}

                                <div className="mt-8 border-t border-gray-100 pt-6">
                                    {category.products.length === 0 ? (
                                        <p className="text-sm font-medium italic text-gray-400">Models coming soon.</p>
                                    ) : (
                                        <ul className="space-y-4">
                                            {category.products.map((product) => (
                                                <li key={product.id}>
                                                    <Link
                                                        href={`/scooters/${product.slug}`}
                                                        className="group/link flex items-center justify-between font-bold text-gray-700 transition-colors hover:text-emerald-600"
                                                    >
                                                        {product.name}
                                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all group-hover/link:bg-emerald-50 group-hover/link:text-emerald-600">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why RideEV */}
            <section className="bg-white py-24 border-t border-gray-100">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Why choose RideEV?</h2>
                        <p className="mt-4 text-lg text-gray-500">
                            We're rethinking urban mobility from the ground up to bring you the best riding experience.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-3">
                        {[
                            { 
                                title: 'Zero Emissions', 
                                desc: 'Ride clean with 100% electric power, no fuel needed. Better for you, better for the planet.',
                                icon: (
                                    <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            { 
                                title: 'Long Range', 
                                desc: 'Go further on a single charge with high-capacity smart batteries that eliminate range anxiety.',
                                icon: (
                                    <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            { 
                                title: 'Low Running Cost', 
                                desc: 'Save thousands on fuel and maintenance every single year compared to petrol scooters.',
                                icon: (
                                    <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-gray-100 bg-gray-50/50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:bg-white"
                            >
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
