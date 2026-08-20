import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

function PhoneIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .95.68l1.2 3.6a1 1 0 0 1-.27 1.05L7.6 9.9a12.4 12.4 0 0 0 6.5 6.5l1.57-1.56a1 1 0 0 1 1.05-.27l3.6 1.2a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.1 21 3 14.9 3 6V5Z" />
        </svg>
    );
}

function MailIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
        </svg>
    );
}

function MapPinIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </svg>
    );
}

export default function ContactUs() {
    const { props } = usePage();
    const settings = props.siteSettings ?? {};

    const hasMap = settings.latitude && settings.longitude;
    const hasAnyInfo = settings.phone || settings.email || settings.address;

    return (
        <PublicLayout>
            <Head title="Contact Us | RideEV" />

            <div className="bg-zinc-950 text-white min-h-screen pt-[140px] pb-24 px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <p className="text-[10px] lg:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-4">
                            Get In Touch
                        </p>
                        <h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-white">Contact Us</h1>
                        <p className="mt-4 text-lg text-zinc-500 font-light max-w-xl mx-auto">
                            Visit our showroom or reach out — we're happy to help.
                        </p>
                    </motion.div>

                    {!hasAnyInfo ? (
                        <p className="text-center text-zinc-500 font-light">
                            Contact details coming soon.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {settings.phone && (
                                <motion.a
                                    href={`tel:${settings.phone}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5 }}
                                    className="group bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] p-8 flex flex-col gap-4 hover:border-white/20 transition-colors"
                                >
                                    <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <PhoneIcon className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">
                                            Call Us
                                        </p>
                                        <p className="text-lg font-light text-white group-hover:text-zinc-300 transition-colors break-words">
                                            {settings.phone}
                                        </p>
                                    </div>
                                </motion.a>
                            )}

                            {settings.email && (
                                <motion.a
                                    href={`mailto:${settings.email}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="group bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] p-8 flex flex-col gap-4 hover:border-white/20 transition-colors"
                                >
                                    <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <MailIcon className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">
                                            Email Us
                                        </p>
                                        <p className="text-lg font-light text-white group-hover:text-zinc-300 transition-colors break-words">
                                            {settings.email}
                                        </p>
                                    </div>
                                </motion.a>
                            )}

                            {settings.address && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] p-8 flex flex-col gap-4"
                                >
                                    <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <MapPinIcon className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">
                                            Visit Us
                                        </p>
                                        <p className="text-lg font-light text-white leading-relaxed">
                                            {settings.address}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {hasMap && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6 }}
                            className="rounded-[1.5rem] overflow-hidden border border-white/5"
                        >
                            <iframe
                                title="RideEV Showroom Location"
                                src={`https://www.google.com/maps?q=${settings.latitude},${settings.longitude}&z=15&output=embed`}
                                className="w-full h-[400px] lg:h-[480px] border-0 grayscale invert-[92%] contrast-[90%]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
