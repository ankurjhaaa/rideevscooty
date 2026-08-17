import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

export default function About() {
    return (
        <PublicLayout>
            <Head title="About Us | RideEV" />

            <div className="bg-[#fafafa]">
                {/* Hero Section */}
                <section className="pt-40 pb-20 lg:pt-56 lg:pb-32 max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-8">Our Vision</p>
                        <h1 className="text-6xl sm:text-7xl lg:text-[7rem] leading-[1.05] font-medium tracking-tight text-black mb-16 max-w-4xl">
                            The future is electric.
                        </h1>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 pt-16 border-t border-gray-200">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-3xl lg:text-4xl font-light text-black leading-snug">
                                We build machines for those who demand more. No noise, no emissions, just pure seamless performance.
                            </p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <p className="text-lg lg:text-xl font-light text-gray-500 leading-relaxed">
                                Founded with a single mission: to revolutionize urban mobility. RideEV isn't just about getting from point A to B. It's about elevating your everyday journey with intelligent technology.
                            </p>
                            <p className="text-lg lg:text-xl font-light text-gray-500 leading-relaxed">
                                We strip away the unnecessary. No complex maintenance, no expensive fuel. Just raw, instant torque wrapped in a design that refuses to compromise on elegance.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Stats Block */}
            <section className="bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {[
                            { num: '10K+', label: 'Vehicles on Road' },
                            { num: '15M+', label: 'Kilometers Driven' },
                            { num: '0', label: 'Carbon Emissions' },
                        ].map((stat, idx) => (
                            <motion.div 
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="py-20 lg:py-32 flex flex-col justify-center items-center text-center"
                            >
                                <p className="text-6xl lg:text-8xl font-medium tracking-tight text-black mb-4">{stat.num}</p>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Philosophy */}
            <section className="bg-white py-32 lg:py-48 px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-5xl lg:text-7xl font-medium tracking-tight text-black mb-12">
                        Design Philosophy
                    </h2>
                    <div className="w-24 h-[1px] bg-black"></div>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#fafafa] p-12 lg:p-20 rounded-[2.5rem]"
                    >
                        <p className="text-2xl font-medium text-black mb-6">Form Follows Function</p>
                        <p className="text-lg font-light text-gray-500 leading-relaxed">
                            Every angle, every line, every surface serves a purpose. We don't do fake vents or unnecessary plastics. Our design language is honest, minimalist, and unapologetically clean.
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-black text-white p-12 lg:p-20 rounded-[2.5rem]"
                    >
                        <p className="text-2xl font-medium mb-6">Built To Last</p>
                        <p className="text-lg font-light text-gray-400 leading-relaxed">
                            We use high-grade steel, aerospace aluminum, and the most advanced battery tech available. Our scooters are engineered for durability while maintaining a lightweight, agile profile.
                        </p>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
