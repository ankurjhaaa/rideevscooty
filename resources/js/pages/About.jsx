import { Head, Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PublicLayout from '../components/PublicLayout';

const reasons = [
    { title: 'Modern & Stylish', desc: 'Electric scooters designed to look as good as they ride.' },
    { title: 'Powerful Motors', desc: 'Efficient electric motors built for smooth, everyday performance.' },
    { title: 'Reliable Battery Options', desc: 'Dependable batteries that keep you moving, ride after ride.' },
    { title: 'Comfortable Riding', desc: 'Engineered for a comfortable, confident ride every single day.' },
    { title: 'Low Running Cost', desc: 'Low running and maintenance cost compared to petrol vehicles.' },
    { title: 'Practical Features', desc: 'Modern features paired with genuinely practical design.' },
    { title: 'Customer-First Support', desc: 'Customer-focused service and support, before and after your purchase.' },
];

const values = [
    {
        label: 'Vision',
        title: 'A trusted electric mobility brand.',
        desc: 'To build a trusted electric mobility brand that makes clean, economical and smart transportation accessible to more people.',
    },
    {
        label: 'Mission',
        title: 'Quality, technology, and service.',
        desc: 'To deliver quality electric scooters with modern technology, practical performance and customer-first service — while contributing towards a cleaner and greener future.',
    },
];

function Phrase({ children, progress, range }) {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <motion.span style={{ opacity }} className="transition-opacity duration-100">
            {children}
        </motion.span>
    );
}

export default function About() {
    // Hero Parallax
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(heroScroll, [0, 1], ["0%", "60%"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

    // Manifesto Text Highlight
    const manifestoRef = useRef(null);
    const { scrollYProgress: manifestoScroll } = useScroll({
        target: manifestoRef,
        offset: ["start 70%", "end 50%"]
    });

    // Vertical Vision/Mission Glowing Line
    const valuesRef = useRef(null);
    const { scrollYProgress: valuesScroll } = useScroll({
        target: valuesRef,
        offset: ["start 60%", "end 60%"]
    });
    const lineHeight = useTransform(valuesScroll, [0, 1], ["0%", "100%"]);

    const { props } = usePage();
    const seo = props.seo || {};
    const pageTitle = "About Us | Ride EV";
    const pageDescription = "Learn about Ride EV's mission to revolutionize urban mobility with zero-emission, high-performance electric scooters.";

    return (
        <PublicLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={seo.image} />
                <meta property="og:url" content={seo.url} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
            </Head>

            <div className="bg-zinc-950 text-white min-h-screen selection:bg-white selection:text-black">

                {/* 1. Cinematic Parallax Hero */}
                <section ref={heroRef} className="h-[70vh] lg:h-screen relative overflow-hidden flex items-center justify-center">
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent z-20" />

                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                        <p className="text-[10px] lg:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8 relative z-10">
                            About RideEV
                        </p>
                        <h1 className="text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] font-medium tracking-tighter text-white relative z-10">
                            SMART MOBILITY<br />FOR A BETTER<br />TOMORROW.
                        </h1>
                    </motion.div>
                </section>

                {/* 2. Highlight-on-Scroll Typography (Intro) */}
                <section className="py-20 lg:py-48 px-6 lg:px-8 max-w-6xl mx-auto relative z-20">
                    <div ref={manifestoRef}>
                        <h2 className="text-2xl lg:text-6xl font-medium leading-[1.4] lg:leading-[1.2] tracking-tight text-white">
                            <Phrase progress={manifestoScroll} range={[0, 0.2]}>RideEV is an electric two-wheeler brand </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.2, 0.4]}>focused on providing stylish, reliable </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.4, 0.6]}>and affordable electric scooters </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.6, 0.8]}>for everyday travel — making electric mobility </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.8, 1]}>simple, practical and accessible for everyone.</Phrase>
                        </h2>

                        <p className="mt-12 text-lg lg:text-xl text-zinc-500 font-light max-w-2xl leading-relaxed">
                            We offer a range of electric scooters designed with modern features, efficient
                            electric motors and dependable battery options to meet the needs of daily
                            commuters.
                        </p>
                    </div>
                </section>

                {/* 3. Why Choose RideEV - Bento Grid */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 relative z-10"
                    >
                        <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4">Why Choose RideEV?</h2>
                        <p className="text-zinc-500 font-light text-lg">What makes riding with us different.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 lg:p-10 flex flex-col gap-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                            >
                                <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">{reason.title}</h3>
                                    <p className="text-sm text-zinc-500 font-light leading-relaxed">{reason.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Vision & Mission */}
                <section className="py-24 lg:py-48 max-w-5xl mx-auto px-6 relative overflow-hidden">
                    <div className="text-center mb-16 lg:mb-32 relative z-20">
                        <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-white mb-6">What Drives Us.</h2>
                        <p className="text-lg text-zinc-500 font-light max-w-xl mx-auto">Our vision and mission at RideEV.</p>
                    </div>

                    <div ref={valuesRef} className="relative pb-16">
                        <div className="absolute left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 z-0" />

                        <motion.div
                            style={{ height: lineHeight }}
                            className="absolute left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-0 w-[1px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10 origin-top"
                        />

                        <div className="space-y-16 lg:space-y-32">
                            {values.map((item, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={item.label} className="relative z-20 flex flex-col lg:flex-row items-start lg:items-center justify-between group">
                                        <motion.div
                                            initial={{ backgroundColor: "#09090b", borderColor: "#27272a" }}
                                            whileInView={{ backgroundColor: "#10b981", borderColor: "#10b981", boxShadow: "0 0 20px rgba(16,185,129,0.5)" }}
                                            viewport={{ margin: "-50% 0px -50% 0px" }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute left-[15px] lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-20 mt-1.5 lg:mt-0"
                                        />

                                        {/* Desktop Layout: Alternating Left/Right */}
                                        <div className={`hidden lg:block w-1/2 ${isEven ? 'pr-20 text-right' : 'pl-20 ml-auto text-left'}`}>
                                            <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-500 mb-4">{item.label}</span>
                                            <h3 className="text-4xl font-medium text-white mb-4">{item.title}</h3>
                                            <p className="text-lg text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                                        </div>

                                        {/* Mobile Layout */}
                                        <div className="lg:hidden pl-10 w-full">
                                            <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-500 mb-3">{item.label}</span>
                                            <h3 className="text-2xl font-medium text-white mb-2">{item.title}</h3>
                                            <p className="text-sm text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 5. Commitment + Tagline */}
                <section className="py-24 lg:py-40 px-6 max-w-4xl mx-auto text-center relative border-t border-zinc-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-12">
                            At RideEV, we believe the future of transportation is electric. We are committed to
                            providing our customers with quality products, honest guidance and dependable
                            after-sales support.
                        </p>
                        <p className="text-3xl lg:text-5xl font-medium tracking-tight text-white">
                            Ride Electric. Ride Smart. <span className="text-emerald-500">Ride EV.</span>
                        </p>
                    </motion.div>
                </section>

                {/* 6. The Grand Finale (CTA) */}
                <section className="py-32 lg:h-screen flex flex-col items-center justify-center text-center px-6 relative border-t border-zinc-900">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ margin: "-200px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 max-w-4xl"
                    >
                        <h2 className="text-4xl lg:text-8xl font-medium tracking-tight text-white mb-8 lg:mb-12">
                            Experience it<br />yourself.
                        </h2>

                        <Link
                            href="/book-a-test-ride"
                            className="inline-block bg-white text-black px-12 py-5 rounded-full text-sm font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-500"
                        >
                            Book a Test Ride
                        </Link>
                    </motion.div>
                </section>

            </div>
        </PublicLayout>
    );
}
