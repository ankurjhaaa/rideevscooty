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
                <img src={settings.logo_url} alt="RideEV" className="h-9 w-auto" />
            </Link>
        );
    }

    return (
        <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                R
            </span>
            <span className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                Ride<span className="text-emerald-600 dark:text-emerald-500">EV</span>
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
        <div className="absolute inset-x-0 top-full border-t border-[#e3e3e0] bg-white shadow-2xl dark:border-[#3E3E3A] dark:bg-[#161615]">
            <div className="mx-auto flex max-w-6xl">
                {/* Category sidebar */}
                <div className="w-48 shrink-0 border-r border-[#e3e3e0] py-6 dark:border-[#3E3E3A]">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onMouseEnter={() => setActiveCategoryId(category.id)}
                            className={`block w-full cursor-pointer px-6 py-2.5 text-left text-sm font-bold tracking-wide uppercase transition-colors ${
                                category.id === activeCategoryId
                                    ? 'text-[#1b1b18] dark:text-[#EDEDEC]'
                                    : 'text-[#c4c4c1] hover:text-[#706f6c] dark:text-[#4a4a47] dark:hover:text-[#706f6c]'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Products + preview */}
                <div className="flex-1 p-6">
                    {products.length === 0 ? (
                        <p className="text-sm text-[#a3a29e]">Models coming soon.</p>
                    ) : (
                        <>
                            <div className="flex flex-wrap items-center gap-6 border-b border-[#e3e3e0] pb-3 dark:border-[#3E3E3A]">
                                {products.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onMouseEnter={() => setActiveProductId(p.id)}
                                        className={`cursor-pointer border-b-2 pb-2 text-sm font-bold tracking-wide uppercase transition-colors ${
                                            p.id === activeProductId
                                                ? 'border-emerald-600 text-[#1b1b18] dark:text-[#EDEDEC]'
                                                : 'border-transparent text-[#c4c4c1] hover:text-[#706f6c] dark:text-[#4a4a47] dark:hover:text-[#706f6c]'
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
                                    className="mt-6 flex cursor-pointer items-center gap-10"
                                >
                                    {image ? (
                                        <img
                                            src={image.image_url}
                                            alt={product.name}
                                            className="h-36 w-auto object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-36 w-48 items-center justify-center rounded-lg bg-[#f4f4f3] text-xs text-[#a3a29e] dark:bg-[#1c1c1a]">
                                            No image
                                        </div>
                                    )}
                                    <div className="flex gap-8">
                                        {specs.map(([value, label]) => (
                                            <div key={label}>
                                                <p className="text-xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                                                    {value}
                                                </p>
                                                <p className="text-xs tracking-wide text-[#706f6c] uppercase dark:text-[#A1A09A]">
                                                    {label}
                                                </p>
                                            </div>
                                        ))}
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
        <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            <header className="sticky top-0 z-40 border-b border-[#e3e3e0] bg-white/95 backdrop-blur dark:border-[#3E3E3A] dark:bg-[#0a0a0a]/95">
                <div
                    className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
                    onMouseLeave={() => setScootersOpen(false)}
                >
                    <Logo />

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-1 md:flex">
                        <div onMouseEnter={() => setScootersOpen(true)}>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-[#1b1b18] hover:bg-[#f4f4f3] dark:text-[#EDEDEC] dark:hover:bg-[#161615]"
                            >
                                Electric Scooters
                                <ChevronDownIcon className={`h-4 w-4 transition-transform ${scootersOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <a
                            href="/#scooters"
                            className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-[#1b1b18] hover:bg-[#f4f4f3] dark:text-[#EDEDEC] dark:hover:bg-[#161615]"
                        >
                            Shop
                        </a>
                        <span className="cursor-not-allowed rounded-lg px-4 py-2 text-sm font-semibold text-[#c4c4c1] dark:text-[#4a4a47]">
                            About Us
                        </span>
                        <span className="cursor-not-allowed rounded-lg px-4 py-2 text-sm font-semibold text-[#c4c4c1] dark:text-[#4a4a47]">
                            More
                        </span>
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href="/book-a-test-ride"
                            className="cursor-pointer rounded-lg bg-[#1b1b18] px-5 py-2.5 text-sm font-bold tracking-wide text-white uppercase hover:bg-black dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-white"
                        >
                            Book a Test Ride
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="cursor-pointer text-[#1b1b18] md:hidden dark:text-[#EDEDEC]"
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
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
                    <div className="absolute inset-y-0 right-0 w-72 overflow-y-auto bg-white p-5 shadow-2xl dark:bg-[#161615]">
                        <div className="mb-6 flex items-center justify-between">
                            <Logo />
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="cursor-pointer text-[#706f6c] dark:text-[#A1A09A]"
                            >
                                <CloseIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="mb-2 text-xs font-semibold tracking-wide text-[#a3a29e] uppercase">
                            Electric Scooters
                        </p>
                        <div className="space-y-4">
                            {categories.map((category) => (
                                <div key={category.id}>
                                    <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                        {category.name}
                                    </p>
                                    {category.products.length === 0 ? (
                                        <p className="mt-1 text-xs text-[#a3a29e]">Coming soon</p>
                                    ) : (
                                        <ul className="mt-1 space-y-1.5 border-l border-[#e3e3e0] pl-3 dark:border-[#3E3E3A]">
                                            {category.products.map((product) => (
                                                <li key={product.id}>
                                                    <Link
                                                        href={`/scooters/${product.slug}`}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="cursor-pointer text-sm text-[#706f6c] hover:text-emerald-600 dark:text-[#A1A09A] dark:hover:text-emerald-500"
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

                        <div className="mt-6 space-y-1 border-t border-[#e3e3e0] pt-4 dark:border-[#3E3E3A]">
                            <a
                                href="/#scooters"
                                onClick={() => setMobileOpen(false)}
                                className="block cursor-pointer py-2 text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]"
                            >
                                Shop
                            </a>
                            <span className="block cursor-not-allowed py-2 text-sm font-medium text-[#c4c4c1] dark:text-[#4a4a47]">
                                About Us
                            </span>
                            <span className="block cursor-not-allowed py-2 text-sm font-medium text-[#c4c4c1] dark:text-[#4a4a47]">
                                More
                            </span>
                        </div>

                        <Link
                            href="/book-a-test-ride"
                            onClick={() => setMobileOpen(false)}
                            className="mt-6 block w-full cursor-pointer rounded-lg bg-[#1b1b18] px-5 py-2.5 text-center text-sm font-bold tracking-wide text-white uppercase dark:bg-[#EDEDEC] dark:text-[#1b1b18]"
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

            <footer className="border-t border-[#e3e3e0] bg-white dark:border-[#3E3E3A] dark:bg-[#0a0a0a]">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                    <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                            <Logo />
                            <p className="mt-3 max-w-sm text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Premium electric scooters built for everyday city rides — powerful, reliable
                                and eco-friendly.
                            </p>

                            {hasSocial && (
                                <div className="mt-4 flex items-center gap-3">
                                    {settings.instagram_url && (
                                        <a
                                            href={settings.instagram_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#706f6c] hover:text-emerald-600 dark:text-[#A1A09A] dark:hover:text-emerald-500"
                                        >
                                            <InstagramIcon className="h-5 w-5" />
                                        </a>
                                    )}
                                    {settings.facebook_url && (
                                        <a
                                            href={settings.facebook_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#706f6c] hover:text-emerald-600 dark:text-[#A1A09A] dark:hover:text-emerald-500"
                                        >
                                            <FacebookIcon className="h-5 w-5" />
                                        </a>
                                    )}
                                    {settings.youtube_url && (
                                        <a
                                            href={settings.youtube_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#706f6c] hover:text-emerald-600 dark:text-[#A1A09A] dark:hover:text-emerald-500"
                                        >
                                            <YoutubeIcon className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {(settings.phone || settings.whatsapp || settings.email || settings.address) && (
                            <div>
                                <p className="text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Contact</p>
                                <ul className="mt-3 space-y-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    {settings.phone && (
                                        <li>
                                            <a
                                                href={`tel:${settings.phone}`}
                                                className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-500"
                                            >
                                                {settings.phone}
                                            </a>
                                        </li>
                                    )}
                                    {settings.whatsapp && (
                                        <li>
                                            <a
                                                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-500"
                                            >
                                                WhatsApp: {settings.whatsapp}
                                            </a>
                                        </li>
                                    )}
                                    {settings.email && (
                                        <li>
                                            <a
                                                href={`mailto:${settings.email}`}
                                                className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-500"
                                            >
                                                {settings.email}
                                            </a>
                                        </li>
                                    )}
                                    {settings.address && (
                                        <li className="whitespace-pre-line">{settings.address}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <p className="mt-8 text-xs text-[#a3a29e]">
                        © {new Date().getFullYear()} RideEV. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
