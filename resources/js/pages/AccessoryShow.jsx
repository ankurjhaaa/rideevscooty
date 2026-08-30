import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

function ArrowLeftIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0 6-6m-6 6 6 6" />
        </svg>
    );
}

function WhatsappIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.14-1.35a10 10 0 0 0 4.9 1.25h.01c5.52 0 10-4.48 10-10s-4.49-9.9-10.01-9.9Zm5.85 14.24c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.21-1.6-1.21-3.06s.76-2.16 1.03-2.46c.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.25.6.85 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.32-.29.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.61.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.29.4-.24.66-.15.27.1 1.72.81 2.02.96.29.15.49.22.56.35.07.13.07.75-.17 1.45Z" />
        </svg>
    );
}

export default function AccessoryShow({ accessory }) {
    const { props } = usePage();
    const settings = props.siteSettings ?? {};

    const pageTitle = `${accessory.name} | Ride EV Accessories`;
    const pageDescription = accessory.description || `${accessory.name} — genuine Ride EV accessory.`;

    const whatsappDigits = (settings.whatsapp ?? '').replace(/\D/g, '');
    const whatsappMessage = encodeURIComponent(`Hi, I'm interested in this product: ${accessory.name}`);
    const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${whatsappMessage}` : null;

    return (
        <PublicLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                {accessory.image_url && <meta property="og:image" content={accessory.image_url} />}
            </Head>

            <div className="bg-zinc-950 text-white min-h-screen pt-[140px] pb-24 px-6 lg:px-8 overflow-x-hidden">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/accessories"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-10"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Accessories
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-14 items-start"
                    >
                        <div className="md:col-span-2">
                            <div className="relative aspect-square max-w-xs mx-auto md:max-w-none bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                                {accessory.image_url ? (
                                    <img
                                        src={accessory.image_url}
                                        alt={accessory.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs uppercase tracking-widest">
                                        No image
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-3 min-w-0 pt-2">
                            <p className="text-[10px] lg:text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">
                                Genuine Part
                            </p>
                            <h1 className="text-3xl lg:text-4xl font-medium tracking-tight text-white mb-5 break-words">
                                {accessory.name}
                            </h1>
                            {accessory.description ? (
                                <p className="text-base font-light text-zinc-400 leading-relaxed whitespace-pre-line break-words">
                                    {accessory.description}
                                </p>
                            ) : (
                                <p className="text-base font-light text-zinc-600">
                                    No description available for this accessory.
                                </p>
                            )}

                            {whatsappUrl && (
                                <div className="mt-10 pt-8 border-t border-white/5">
                                    <p className="text-sm font-light text-zinc-500">
                                        Is accessory ke baare mein turant jaankari ke liye humein WhatsApp par
                                        message karo.
                                    </p>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-black px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#20bd5a] transition-colors"
                                    >
                                        <WhatsappIcon className="h-4 w-4" />
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </PublicLayout>
    );
}
