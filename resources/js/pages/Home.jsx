import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '../components/PublicLayout';

function ProductCard({ product }) {
    const image = product.images?.find((img) => img.is_primary) ?? product.images?.[0];

    return (
        <Link
            href={`/scooters/${product.slug}`}
            className="group block overflow-hidden rounded-2xl border border-[#e3e3e0] bg-white transition-shadow hover:shadow-lg dark:border-[#3E3E3A] dark:bg-[#161615]"
        >
            <div className="aspect-[4/3] overflow-hidden bg-[#f4f4f3] dark:bg-[#1c1c1a]">
                {image ? (
                    <img
                        src={image.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#a3a29e]">No image</div>
                )}
            </div>
            <div className="p-5">
                <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-500">
                    {product.category?.name}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">{product.name}</h3>
                {product.short_description && (
                    <p className="mt-1 line-clamp-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        {product.short_description}
                    </p>
                )}
                <p className="mt-3 text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                </p>
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
            <section className="relative overflow-hidden bg-[#0a0a0a]">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
                    <div>
                        <p className="text-sm font-bold tracking-wide text-emerald-500 uppercase">
                            Power your every ride
                        </p>
                        <h1 className="mt-3 text-4xl leading-[1.1] font-extrabold tracking-tight text-white uppercase sm:text-5xl">
                            Electric scooters built for the modern rider.
                        </h1>
                        <p className="mt-5 max-w-md text-base text-[#A1A09A]">
                            Powerful motors, long range batteries and a design that turns heads — explore the
                            RideEV lineup.
                        </p>
                        <div className="mt-8">
                            <a
                                href="#scooters"
                                className="inline-block cursor-pointer rounded-lg bg-white px-6 py-3 text-sm font-bold tracking-wide text-[#0a0a0a] uppercase hover:bg-[#EDEDEC]"
                            >
                                Explore Scooters
                            </a>
                        </div>
                    </div>

                    {heroImage && (
                        <img
                            src={heroImage.image_url}
                            alt={heroProduct.name}
                            className="mx-auto h-auto w-full max-w-md object-contain drop-shadow-2xl"
                        />
                    )}
                </div>
            </section>

            {/* Browse by category */}
            <section id="scooters" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
                <h2 className="text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Browse by Category</h2>
                <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                    Find the perfect scooter for your ride.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="rounded-2xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]"
                        >
                            <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                {category.name}
                            </h3>
                            {category.description && (
                                <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    {category.description}
                                </p>
                            )}

                            {category.products.length === 0 ? (
                                <p className="mt-4 text-sm text-[#a3a29e]">Models coming soon.</p>
                            ) : (
                                <ul className="mt-4 space-y-2">
                                    {category.products.map((product) => (
                                        <li key={product.id}>
                                            <Link
                                                href={`/scooters/${product.slug}`}
                                                className="cursor-pointer text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-500"
                                            >
                                                {product.name} →
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured products */}
            {featuredProducts.length > 0 && (
                <section className="border-t border-[#e3e3e0] bg-[#F1F1EF] py-16 dark:border-[#3E3E3A] dark:bg-[#0d0d0c]">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <h2 className="text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                            Featured Scooters
                        </h2>
                        <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            Our most popular rides, handpicked for you.
                        </p>

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why RideEV */}
            <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
                <h2 className="text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Why RideEV</h2>

                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {[
                        { title: 'Zero Emissions', desc: 'Ride clean with 100% electric power, no fuel needed.' },
                        { title: 'Long Range', desc: 'Go further on a single charge with high-capacity batteries.' },
                        { title: 'Low Running Cost', desc: 'Save on fuel and maintenance every single ride.' },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]"
                        >
                            <h3 className="text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
