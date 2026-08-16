import { Head, Link } from '@inertiajs/react';
import AdminLayout, { ArrowLeftIcon } from '../../../components/AdminLayout';

export default function Show({ product }) {
    return (
        <AdminLayout>
            <Head title={product.name} />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">{product.name}</h1>
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                product.is_active
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                    : 'bg-[#f4f4f3] text-[#706f6c] dark:bg-[#1c1c1a] dark:text-[#A1A09A]'
                            }`}
                        >
                            {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {product.is_featured && (
                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                Featured
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        {product.category?.name} · /{product.slug}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/products"
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm font-medium text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to list
                    </Link>
                    <Link
                        href={`/admin/products/${product.slug}/edit`}
                        className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        Edit Product
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <h2 className="mb-4 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Images</h2>
                        {product.images.length === 0 ? (
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Koi image upload nahi hui.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {product.images.map((image) => (
                                    <div key={image.id}>
                                        <img
                                            src={image.image_url}
                                            alt={image.type ?? product.name}
                                            className="aspect-square w-full rounded-lg border border-[#e3e3e0] object-cover dark:border-[#3E3E3A]"
                                        />
                                        <div className="mt-1 flex items-center justify-between">
                                            {image.type && (
                                                <span className="text-xs text-[#706f6c] capitalize dark:text-[#A1A09A]">
                                                    {image.type}
                                                </span>
                                            )}
                                            {image.is_primary && (
                                                <span className="text-xs font-medium text-emerald-600">Primary</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <h2 className="mb-3 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Description</h2>
                        {product.short_description && (
                            <p className="mb-2 text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                {product.short_description}
                            </p>
                        )}
                        <p className="text-sm whitespace-pre-line text-[#706f6c] dark:text-[#A1A09A]">
                            {product.description || 'Koi description nahi di gayi.'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <h2 className="mb-3 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Specifications</h2>
                        <dl className="grid gap-4 sm:grid-cols-2">
                            {[
                                ['Motor Power', product.motor_power],
                                ['Top Speed', product.top_speed],
                                ['Range', product.range],
                                ['Battery Capacity', product.battery_capacity],
                                ['Charging Time', product.charging_time],
                                ['EMI Info', product.emi_info],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <dt className="text-xs text-[#706f6c] dark:text-[#A1A09A]">{label}</dt>
                                    <dd className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">{value || '—'}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">Price</p>
                        <p className="mt-1 text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                            ₹{Number(product.price).toLocaleString('en-IN')}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <h2 className="mb-3 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Colors</h2>
                        {product.colors.length === 0 ? (
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Koi color add nahi hua.</p>
                        ) : (
                            <div className="space-y-3">
                                {product.colors.map((color) => (
                                    <div key={color.id} className="flex items-center gap-3">
                                        {color.image_url ? (
                                            <img
                                                src={color.image_url}
                                                alt={color.name}
                                                className="h-10 w-10 rounded-lg border border-[#e3e3e0] object-cover dark:border-[#3E3E3A]"
                                            />
                                        ) : (
                                            <span
                                                className="h-8 w-8 rounded-full border border-[#e3e3e0] dark:border-[#3E3E3A]"
                                                style={{ backgroundColor: color.hex_code ?? '#ccc' }}
                                            />
                                        )}
                                        <span className="text-sm text-[#1b1b18] dark:text-[#EDEDEC]">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
