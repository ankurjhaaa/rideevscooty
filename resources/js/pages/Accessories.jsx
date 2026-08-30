import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';
import PublicPagination from '../components/PublicPagination';

export default function Accessories({ accessories }) {
    const pageTitle = 'Accessories & Spare Parts | Ride EV';
    const pageDescription = 'Browse genuine Ride EV accessories and spare parts for your electric scooter.';

    return (
        <PublicLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
            </Head>

            <div className="bg-zinc-950 text-white min-h-screen pt-[140px] pb-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <p className="text-[10px] lg:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-4">
                            Genuine Parts
                        </p>
                        <h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-white">Accessories</h1>
                    </motion.div>

                    {accessories.data.length === 0 ? (
                        <p className="text-center text-zinc-500 font-light">No accessories yet. Check back soon.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                            {accessories.data.map((accessory, index) => (
                                <motion.div
                                    key={accessory.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                    className="group bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:border-white/20 transition-colors"
                                >
                                    <Link href={`/accessories/${accessory.id}`} className="block">
                                        <div className="relative aspect-square bg-zinc-900 overflow-hidden">
                                            {accessory.image_url ? (
                                                <img
                                                    src={accessory.image_url}
                                                    alt={accessory.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-[10px] uppercase tracking-widest">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 lg:p-5">
                                            <h3 className="text-base font-medium text-white leading-snug truncate">
                                                {accessory.name}
                                            </h3>
                                            {accessory.description && (
                                                <p className="mt-1.5 text-sm font-light text-zinc-400 leading-relaxed line-clamp-2">
                                                    {accessory.description}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <PublicPagination links={accessories.links} />
                </div>
            </div>
        </PublicLayout>
    );
}
