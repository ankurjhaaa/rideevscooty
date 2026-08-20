import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';
import PublicPagination from '../components/PublicPagination';

export default function Scooters({ products }) {
    return (
        <PublicLayout>
            <Head title="All Scooters | RideEV" />

            <div className="bg-zinc-950 text-white min-h-screen pt-[140px] pb-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <p className="text-[10px] lg:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-4">
                            The Full Lineup
                        </p>
                        <h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-white">All Scooters</h1>
                    </motion.div>

                    {products.data.length === 0 ? (
                        <p className="text-center text-zinc-500 font-light">No scooters available right now.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {products.data.map((product, index) => {
                                const image =
                                    product.images?.find((img) => img.is_primary) ?? product.images?.[0];

                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
                                    >
                                        <Link
                                            href={`/scooters/${product.slug}`}
                                            className="group block bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] overflow-hidden hover:border-white/20 transition-colors"
                                        >
                                            <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                                                {image ? (
                                                    <img
                                                        src={image.image_url}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs uppercase tracking-widest">
                                                        Render Pending
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6">
                                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-500 mb-2">
                                                    {product.category?.name}
                                                </p>
                                                <h3 className="text-xl font-medium text-white mb-2 truncate">
                                                    {product.name}
                                                </h3>
                                                <p className="text-zinc-400 font-light">
                                                    ₹{Number(product.price).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}

                    <PublicPagination links={products.links} />
                </div>
            </div>
        </PublicLayout>
    );
}
