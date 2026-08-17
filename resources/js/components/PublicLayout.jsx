import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FlashMessage from './FlashMessage';

function ChevronDownIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
    );
}

function MenuIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

function CloseIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18 18 6" />
        </svg>
    );
}

function InstagramIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
    );
}

function FacebookIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path
                strokeLinejoin="round"
                d="M14 21v-7h2.5l.5-3H14V9a1 1 0 0 1 1-1h1.5V5H14a3 3 0 0 0-3 3v3H9v3h2v7Z"
            />
        </svg>
    );
}

function YoutubeIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="6" width="18" height="12" rx="3" />
            <path d="M11 10.3v3.4l3-1.7Z" fill="currentColor" stroke="none" strokeLinejoin="round" />
        </svg>
    );
}

function Logo() {
    const { props } = usePage();
    const settings = props.siteSettings ?? {};

    if (settings.logo_url) {
        return (
            <Link href="/" className="flex items-center">
                <img src={settings.logo_url} alt="RideEV" className="h-9 w-auto drop-shadow-md" />
            </Link>
        );
    }

    return (
        <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-base font-extrabold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-emerald-500/30">
                R
            </span>
            <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-emerald-700">
                Ride<span className="text-emerald-600">EV</span>
            </span>
        </Link>
    );
}

function productSpecs(product) {
    if (!product) return [];

    return [
        [product.battery_capacity, 'Battery'],
        [product.motor_power, 'Motor Power'],
        [product.range, 'Range'],
    ].filter(([value]) => value);
}

function ScootersMegaMenu({ categories, onNavigate }) {
    const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
    const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];
    const products = activeCategory?.products ?? [];
    const [activeProductId, setActiveProductId] = useState(products[0]?.id);

    useEffect(() => {
        setActiveProductId(activeCategory?.products?.[0]?.id);
    }, [activeCategoryId, activeCategory?.products]);

    const product = products.find((p) => p.id === activeProductId) ?? products[0];
    const image = product?.images?.find((img) => img.is_primary) ?? product?.images?.[0];
    const specs = productSpecs(product);

    return (
        <div className="absolute inset-x-0 top-full border-t border-gray-100 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="mx-auto flex max-w-6xl">
                {/* Category sidebar */}
                <div className="w-56 shrink-0 border-r border-gray-100 bg-gray-50/50 py-6">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onMouseEnter={() => setActiveCategoryId(category.id)}
                            className={`block w-full cursor-pointer px-6 py-3 text-left text-sm font-bold tracking-wide uppercase transition-all duration-200 ${
                                category.id === activeCategoryId
                                    ? 'bg-white text-emerald-700 shadow-[2px_0_0_inset] shadow-emerald-500'
                                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Products + preview */}
                <div className="flex-1 p-8">
                    {products.length === 0 ? (
                        <p className="text-sm text-gray-400">Models coming soon.</p>
                    ) : (
                        <>
                            <div className="flex flex-wrap items-center gap-8 border-b border-gray-100 pb-4">
                                {products.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onMouseEnter={() => setActiveProductId(p.id)}
                                        className={`cursor-pointer border-b-2 pb-2 text-sm font-bold tracking-wide uppercase transition-all duration-200 ${
                                            p.id === activeProductId
                                                ? 'border-emerald-500 text-gray-900'
                                                : 'border-transparent text-gray-400 hover:text-gray-700'
                                        }`}
                                    >
                                        {p.name}
                                    </button>
                                ))}
                            </div>

                            {product && (
                                <Link
                                    href={`/scooters/${product.slug}`}
                                    onClick={onNavigate}
                                    className="group mt-8 flex cursor-pointer items-center gap-12 rounded-2xl p-4 transition-colors hover:bg-gray-50"
                                >
                                    {image ? (
                                        <div className="relative h-40 w-56 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                            <img
                                                src={image.image_url}
                                                alt={product.name}
                                                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-40 w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
                                            <svg className="mb-2 h-8 w-8 text-gray-300 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-xs font-medium text-gray-400">Coming Soon</span>
                                        </div>
                                    )}
                                    <div className="flex flex-1 gap-10">
                                        {specs.map(([value, label]) => (
                                            <div key={label}>
                                                <p className="text-2xl font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                    {value}
                                                </p>
                                                <p className="mt-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                    {label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 group-hover:bg-emerald-50 group-hover:shadow-lg">
                                        <svg className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PublicLayout({ children }) {
    const { props } = usePage();
    const categories = props.categories ?? [];
    const settings = props.siteSettings ?? {};
    const [scootersOpen, setScootersOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const hasSocial = settings.instagram_url || settings.facebook_url || settings.youtube_url;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <header className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-sm transition-all duration-300">
                <div
                    className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
                    onMouseLeave={() => setScootersOpen(false)}
                >
                    <Logo />

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-2 md:flex">
                        <div onMouseEnter={() => setScootersOpen(true)}>
                            <button
                                type="button"
                                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                                    scootersOpen ? 'bg-gray-100 text-emerald-700 shadow-inner' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Electric Scooters
                                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${scootersOpen ? 'rotate-180 text-emerald-600' : 'text-gray-400'}`} />
                            </button>
                        </div>

                        <a
                            href="/#scooters"
                            className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Shop
                        </a>
                        <span className="cursor-not-allowed rounded-full px-5 py-2.5 text-sm font-bold text-gray-400">
                            About Us
                        </span>
                    </nav>

                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href="/book-a-test-ride"
                            className="group relative overflow-hidden rounded-full bg-gray-900 px-6 py-2.5 text-sm font-bold tracking-wide text-white uppercase shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_20px_-6px_rgba(0,0,0,0.4)]"
                        >
                            <span className="relative z-10">Book a Test Ride</span>
                            <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="cursor-pointer rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden transition-colors"
                    >
                        <MenuIcon className="h-6 w-6" />
                    </button>

                    {scootersOpen && categories.length > 0 && (
                        <ScootersMegaMenu categories={categories} onNavigate={() => setScootersOpen(false)} />
                    )}
                </div>
            </header>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setMobileOpen(false)} />
                    <div className="absolute inset-y-0 right-0 w-80 overflow-y-auto bg-white p-6 shadow-2xl transition-transform">
                        <div className="mb-8 flex items-center justify-between">
                            <Logo />
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="cursor-pointer rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <CloseIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="mb-3 text-xs font-bold tracking-wider text-emerald-600 uppercase">
                            Electric Scooters
                        </p>
                        <div className="space-y-5">
                            {categories.map((category) => (
                                <div key={category.id}>
                                    <p className="text-base font-bold text-gray-900">
                                        {category.name}
                                    </p>
                                    {category.products.length === 0 ? (
                                        <p className="mt-1 text-sm text-gray-400">Coming soon</p>
                                    ) : (
                                        <ul className="mt-2 space-y-2 border-l-2 border-gray-100 pl-4">
                                            {category.products.map((product) => (
                                                <li key={product.id}>
                                                    <Link
                                                        href={`/scooters/${product.slug}`}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="cursor-pointer block text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 space-y-2 border-t border-gray-100 pt-6">
                            <a
                                href="/#scooters"
                                onClick={() => setMobileOpen(false)}
                                className="block cursor-pointer rounded-lg px-4 py-3 text-base font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                Shop
                            </a>
                            <span className="block cursor-not-allowed rounded-lg px-4 py-3 text-base font-bold text-gray-400">
                                About Us
                            </span>
                        </div>

                        <Link
                            href="/book-a-test-ride"
                            onClick={() => setMobileOpen(false)}
                            className="mt-8 block w-full cursor-pointer rounded-xl bg-gray-900 px-5 py-3.5 text-center text-sm font-extrabold tracking-wide text-white uppercase shadow-lg transition-all hover:bg-emerald-600 hover:shadow-emerald-500/30"
                        >
                            Book a Test Ride
                        </Link>
                    </div>
                </div>
            )}

            <main className="flex-1">
                {(props.flash?.success || props.flash?.error) && (
                    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
                        <FlashMessage message={props.flash?.success} type="success" />
                        <FlashMessage message={props.flash?.error} type="error" />
                    </div>
                )}
                {children}
            </main>

            <footer className="mt-20 border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <Logo />
                            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-500">
                                Premium electric scooters built for everyday city rides. Discover a world of powerful, reliable and eco-friendly commutes that don't compromise on style.
                            </p>

                            {hasSocial && (
                                <div className="mt-8 flex items-center gap-4">
                                    {settings.instagram_url && (
                                        <a
                                            href={settings.instagram_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        >
                                            <InstagramIcon className="h-5 w-5" />
                                        </a>
                                    )}
                                    {settings.facebook_url && (
                                        <a
                                            href={settings.facebook_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        >
                                            <FacebookIcon className="h-5 w-5" />
                                        </a>
                                    )}
                                    {settings.youtube_url && (
                                        <a
                                            href={settings.youtube_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        >
                                            <YoutubeIcon className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {(settings.phone || settings.whatsapp || settings.email || settings.address) && (
                            <div className="lg:col-span-2 lg:ml-auto">
                                <p className="text-lg font-bold text-gray-900">Contact Us</p>
                                <ul className="mt-6 space-y-4 text-sm font-medium text-gray-600">
                                    {settings.phone && (
                                        <li className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <a href={`tel:${settings.phone}`} className="hover:text-emerald-600 transition-colors">
                                                {settings.phone}
                                            </a>
                                        </li>
                                    )}
                                    {settings.email && (
                                        <li className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <a href={`mailto:${settings.email}`} className="hover:text-emerald-600 transition-colors">
                                                {settings.email}
                                            </a>
                                        </li>
                                    )}
                                    {settings.address && (
                                        <li className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <span className="whitespace-pre-line leading-relaxed">{settings.address}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm font-medium text-gray-500">
                            © {new Date().getFullYear()} RideEV. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm font-medium text-gray-400">
                            <span className="cursor-pointer hover:text-gray-600 transition-colors">Privacy Policy</span>
                            <span className="cursor-pointer hover:text-gray-600 transition-colors">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
