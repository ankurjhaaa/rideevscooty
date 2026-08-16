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

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <Link
                    href="/"
                    className="cursor-pointer text-sm font-medium text-[#706f6c] hover:text-emerald-600 dark:text-[#A1A09A] dark:hover:text-emerald-500"
                >
                    ← Back to home
                </Link>

                <div className="mt-6 grid gap-10 lg:grid-cols-2">
                    {/* Gallery */}
                    <div>
                        <div className="aspect-square overflow-hidden rounded-2xl border border-[#e3e3e0] bg-[#f4f4f3] dark:border-[#3E3E3A] dark:bg-[#1c1c1a]">
                            {activeImage ? (
                                <img
                                    src={activeImage.image_url}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-[#a3a29e]">
                                    No image available
                                </div>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="mt-3 grid grid-cols-5 gap-3">
                                {product.images.map((image) => (
                                    <button
                                        key={image.id}
                                        type="button"
                                        onClick={() => setActiveImage(image)}
                                        className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 ${
                                            activeImage?.id === image.id
                                                ? 'border-emerald-600'
                                                : 'border-transparent'
                                        }`}
                                    >
                                        <img
                                            src={image.image_url}
                                            alt={image.type ?? product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div>
                        <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-500">
                            {product.category?.name}
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">{product.name}</h1>
                        <p className="mt-3 text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                            ₹{Number(product.price).toLocaleString('en-IN')}
                        </p>
                        {product.emi_info && (
                            <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">{product.emi_info}</p>
                        )}

                        {product.short_description && (
                            <p className="mt-5 text-base text-[#1b1b18] dark:text-[#EDEDEC]">
                                {product.short_description}
                            </p>
                        )}

                        <Link
                            href={`/book-a-test-ride?product=${product.slug}`}
                            className="mt-6 inline-block cursor-pointer rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase hover:bg-emerald-700"
                        >
                            Book a Test Ride
                        </Link>

                        {product.colors.length > 0 && (
                            <div className="mt-6">
                                <p className="mb-2 text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                    Available Colors
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color) => (
                                        <div key={color.id} className="flex items-center gap-2">
                                            <span
                                                className="h-6 w-6 rounded-full border border-[#e3e3e0] dark:border-[#3E3E3A]"
                                                style={{ backgroundColor: color.hex_code ?? '#ccc' }}
                                                title={color.name}
                                            />
                                            <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                {color.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {specs.length > 0 && (
                            <div className="mt-8 rounded-2xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
                                <p className="mb-4 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                    Specifications
                                </p>
                                <dl className="grid grid-cols-2 gap-4">
                                    {specs.map(([label, value]) => (
                                        <div key={label}>
                                            <dt className="text-xs text-[#706f6c] dark:text-[#A1A09A]">{label}</dt>
                                            <dd className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>
                </div>

                {product.description && (
                    <div className="mt-12 max-w-3xl">
                        <h2 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">About this scooter</h2>
                        <p className="mt-3 text-sm whitespace-pre-line text-[#706f6c] dark:text-[#A1A09A]">
                            {product.description}
                        </p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
