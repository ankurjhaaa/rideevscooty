import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PublicLayout from '../components/PublicLayout';

const timeline = [
    { year: "2018", title: "The Inception", desc: "A small team of engineers working out of a garage with a vision to eliminate urban emissions." },
    { year: "2020", title: "First Prototype", desc: "After countless failures, the Alpha prototype hits the road. It was raw, but it proved the concept." },
    { year: "2022", title: "Series Production", desc: "Launch of our first flagship model. Changing the way thousands commute every single day." },
    { year: "2024", title: "The Next Leap", desc: "Introducing advanced battery architectures and AI-driven performance modes." },
    { year: "Future", title: "Beyond Mobility", desc: "Building an ecosystem where vehicles, grids, and cities communicate seamlessly." },
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

    // Vertical Timeline Glowing Line
    const timelineRef = useRef(null);
    const { scrollYProgress: timelineScroll } = useScroll({
        target: timelineRef,
        offset: ["start 60%", "end 60%"]
    });
    const lineHeight = useTransform(timelineScroll, [0, 1], ["0%", "100%"]);

    return (
        <PublicLayout>
            <Head title="About Us | RideEV" />

            <div className="bg-zinc-950 text-white min-h-screen selection:bg-white selection:text-black">
                
                {/* 1. Cinematic Parallax Hero */}
                <section ref={heroRef} className="h-[70vh] lg:h-screen relative overflow-hidden flex items-center justify-center">
                    {/* Dark gradient mask at bottom to blend into next section */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent z-20" />
                    
                    <motion.div 
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
                        
                        <p className="text-[10px] lg:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8 relative z-10">
                            We Engineer The Future
                        </p>
                        <h1 className="text-5xl sm:text-7xl lg:text-[9rem] leading-[0.9] font-medium tracking-tighter text-white relative z-10">
                            BEYOND<br />MOBILITY.
                        </h1>
                    </motion.div>
                </section>

                {/* 2. Highlight-on-Scroll Typography (The Manifesto) */}
                <section className="py-20 lg:py-64 px-6 lg:px-8 max-w-6xl mx-auto relative z-20">
                    <div ref={manifestoRef}>
                        <h2 className="text-2xl lg:text-6xl font-medium leading-[1.4] lg:leading-[1.2] tracking-tight text-white">
                            <Phrase progress={manifestoScroll} range={[0, 0.2]}>We strip away the unnecessary. </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.2, 0.4]}>No fake vents, no complex maintenance, </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.4, 0.6]}>no fragile plastics. </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.6, 0.8]}>Just pure, instant torque </Phrase>
                            <Phrase progress={manifestoScroll} range={[0.8, 1]}>wrapped in unapologetic elegance.</Phrase>
                        </h2>
                    </div>
                </section>

                {/* 3. Bento-Box 2.0 (Glass & Neon) */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-32 relative">
                    {/* Glowing Orb behind Bento Grid */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 relative z-10"
                    >
                        <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4">By The Numbers.</h2>
                        <p className="text-zinc-500 font-light text-lg">The impact we've made so far.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                        {/* Box 1 (Wide) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="md:col-span-2 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-14 relative overflow-hidden flex flex-col justify-end min-h-[250px] lg:min-h-[300px] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                        >
                            <div className="relative z-10">
                                <p className="text-5xl lg:text-7xl font-medium text-white tracking-tight mb-2">15M+</p>
                                <p className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-500">Kilometers Driven</p>
                            </div>
                        </motion.div>

                        {/* Box 2 (Square) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-14 flex flex-col justify-end min-h-[250px] lg:min-h-[300px] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                        >
                            <p className="text-5xl lg:text-7xl font-medium text-white tracking-tight mb-2">10K+</p>
                            <p className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-500">Active Riders</p>
                        </motion.div>

                        {/* Box 3 (Full Width Green) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="md:col-span-3 bg-gradient-to-br from-emerald-500/5 to-emerald-900/20 backdrop-blur-3xl border border-emerald-500/20 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-14 flex flex-col justify-center items-center text-center min-h-[250px] lg:min-h-[300px] relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]"
                        >
                            <div className="relative z-10">
                                <p className="text-6xl lg:text-8xl font-medium text-white tracking-tight mb-4 drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">0</p>
                                <p className="text-sm lg:text-base font-bold tracking-[0.2em] uppercase text-emerald-400">Grams of Carbon Emissions</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 4. Vertical Glowing Journey */}
                <section className="py-24 lg:py-64 max-w-5xl mx-auto px-6 relative overflow-hidden">
                    
                    <div className="text-center mb-16 lg:mb-32 relative z-20">
                        <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-white mb-6">The Journey.</h2>
                        <p className="text-lg text-zinc-500 font-light max-w-xl mx-auto">From a garage concept to revolutionizing urban streets.</p>
                    </div>

                    <div ref={timelineRef} className="relative pb-32">
                        {/* Background Dark Line */}
                        <div className="absolute left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 z-0" />
                        
                        {/* Glowing Animated Line */}
                        <motion.div 
                            style={{ height: lineHeight }} 
                            className="absolute left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-0 w-[1px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10 origin-top" 
                        />

                        <div className="space-y-16 lg:space-y-48">
                            {timeline.map((item, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={item.year} className="relative z-20 flex flex-col lg:flex-row items-start lg:items-center justify-between group">
                                        
                                        {/* Timeline Node (Lights up when scrolled past) */}
                                        <motion.div 
                                            initial={{ backgroundColor: "#09090b", borderColor: "#27272a" }}
                                            whileInView={{ backgroundColor: "#10b981", borderColor: "#10b981", boxShadow: "0 0 20px rgba(16,185,129,0.5)" }}
                                            viewport={{ margin: "-50% 0px -50% 0px" }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute left-[15px] lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-20 mt-1.5 lg:mt-0"
                                        />

                                        {/* Desktop Layout: Alternating Left/Right */}
                                        <div className={`hidden lg:block w-1/2 ${isEven ? 'pr-20 text-right' : 'pl-20 ml-auto text-left'}`}>
                                            <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-500 mb-4">{item.year}</span>
                                            <h3 className="text-4xl font-medium text-white mb-4">{item.title}</h3>
                                            <p className="text-lg text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                                        </div>

                                        {/* Mobile Layout: Always Right of line */}
                                        <div className="lg:hidden pl-10 w-full">
                                            <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-500 mb-3">{item.year}</span>
                                            <h3 className="text-2xl font-medium text-white mb-2">{item.title}</h3>
                                            <p className="text-sm text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 5. The Grand Finale (CTA) */}
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
