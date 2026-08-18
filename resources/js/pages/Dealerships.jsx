import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

export default function Dealerships() {
    const dealers = [
        { city: 'Mumbai', name: 'RideEV West', address: '123 Link Road, Andheri West, Mumbai 400053', phone: '022-12345678', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop' },
        { city: 'Delhi', name: 'RideEV North', address: '45 Connaught Place, New Delhi 110001', phone: '011-87654321', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop' },
        { city: 'Bengaluru', name: 'RideEV South', address: '78 Indiranagar 100ft Road, Bengaluru 560038', phone: '080-11223344', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop' },
        { city: 'Pune', name: 'RideEV Deccan', address: '12 Koregaon Park, Pune 411001', phone: '020-99887766', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop' },
        { city: 'Hyderabad', name: 'RideEV Deccan Pro', address: '55 Jubilee Hills, Hyderabad 500033', phone: '040-55443322', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop' },
        { city: 'Chennai', name: 'RideEV Coast', address: '89 ECR Road, Thiruvanmiyur, Chennai 600041', phone: '044-66778899', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop' },
    ];

    const [selectedDealer, setSelectedDealer] = useState(dealers[0]);

    return (
        <PublicLayout>
            <Head title="Dealerships | RideEV" />

            <div className="bg-zinc-950 min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-32 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
                    
                    {/* Left Sticky Sidebar (City Selector) */}
                    <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit z-20">
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4 ml-2">Our Locations</p>
                        <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-10 ml-2">
                            Locate Us.
                        </h1>

                        {/* City List */}
                        <div className="flex overflow-x-auto lg:flex-col gap-3 pb-6 lg:pb-0 thin-scrollbar">
                            {dealers.map(dealer => (
                                <button
                                    key={dealer.city}
                                    onClick={() => setSelectedDealer(dealer)}
                                    className={`whitespace-nowrap lg:whitespace-normal text-left px-6 py-4 rounded-2xl transition-all duration-300 border border-transparent ${
                                        selectedDealer.city === dealer.city 
                                        ? 'bg-zinc-900 border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]' 
                                        : 'hover:bg-zinc-900/50 hover:border-zinc-800/50'
                                    }`}
                                >
                                    <span className={`text-2xl lg:text-3xl font-medium tracking-tight block transition-colors ${selectedDealer.city === dealer.city ? 'text-white' : 'text-zinc-500'}`}>
                                        {dealer.city}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Dynamic Content */}
                    <div className="lg:w-2/3 min-w-0 pt-2 lg:pt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDealer.city}
                                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col gap-10"
                            >
                                {/* Showroom Image with Moderate Rounding */}
                                <div className="w-full h-[35vh] lg:h-[50vh] bg-zinc-900 rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800/50">
                                    <img 
                                        src={selectedDealer.image} 
                                        alt={selectedDealer.name} 
                                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 scale-105 hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                                    
                                    {/* Subtle City Badge on Image */}
                                    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">{selectedDealer.city}</span>
                                    </div>
                                </div>

                                {/* Dealership Details */}
                                <div className="flex flex-col lg:flex-row gap-10 lg:items-end justify-between border-b border-zinc-800/50 pb-16">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4">Experience Center</p>
                                        <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6">
                                            {selectedDealer.name}
                                        </h2>
                                        <p className="text-lg lg:text-xl font-light text-zinc-400 leading-relaxed max-w-md mb-10">
                                            {selectedDealer.address}
                                        </p>
                                        <a href={`tel:${selectedDealer.phone}`} className="text-3xl font-medium tracking-wide text-white hover:text-zinc-400 transition-colors inline-block">
                                            {selectedDealer.phone}
                                        </a>
                                    </div>

                                    {/* Action Buttons (Moderate Rounding) */}
                                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">
                                        <button className="rounded-2xl bg-white text-black px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] w-full lg:w-auto text-center border border-transparent">
                                            Get Directions
                                        </button>
                                        <button className="rounded-2xl bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-colors w-full lg:w-auto text-center">
                                            Call Dealer
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* Partner CTA (Moderate Rounding) */}
                        <div className="mt-16 bg-zinc-900/30 backdrop-blur-3xl border border-zinc-800/50 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden group hover:bg-zinc-900/50 transition-all duration-500">
                            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-8 border border-zinc-700/50">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Partnership</p>
                                <h3 className="text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6">
                                    Join the Revolution
                                </h3>
                                <p className="text-base font-light text-zinc-400 mb-10 max-w-lg">
                                    We are expanding rapidly across the nation. Become a RideEV dealer today and help us build the future of urban mobility.
                                </p>
                                <button className="rounded-xl bg-white text-black px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
