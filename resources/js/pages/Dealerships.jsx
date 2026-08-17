import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

export default function Dealerships() {
    const dealers = [
        { city: 'Mumbai', name: 'RideEV West', address: '123 Link Road, Andheri West, Mumbai 400053', phone: '022-12345678' },
        { city: 'Delhi', name: 'RideEV North', address: '45 Connaught Place, New Delhi 110001', phone: '011-87654321' },
        { city: 'Bengaluru', name: 'RideEV South', address: '78 Indiranagar 100ft Road, Bengaluru 560038', phone: '080-11223344' },
        { city: 'Pune', name: 'RideEV Deccan', address: '12 Koregaon Park, Pune 411001', phone: '020-99887766' },
        { city: 'Hyderabad', name: 'RideEV Deccan Pro', address: '55 Jubilee Hills, Hyderabad 500033', phone: '040-55443322' },
        { city: 'Chennai', name: 'RideEV Coast', address: '89 ECR Road, Thiruvanmiyur, Chennai 600041', phone: '044-66778899' },
    ];

    return (
        <PublicLayout>
            <Head title="Dealerships | RideEV" />

            {/* Clean Hero Header */}
            <div className="bg-[#fafafa] pt-32 pb-16 lg:pt-48 lg:pb-24 border-b border-gray-100 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto px-6"
                >
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Our Locations</p>
                    <h1 className="text-5xl lg:text-7xl font-medium tracking-tight text-black mb-6">
                        Find a Dealer.
                    </h1>
                    <p className="text-lg lg:text-xl font-light text-gray-500">
                        Visit our experience centers to feel the machines in person.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dealers.map((dealer, idx) => (
                        <motion.div 
                            key={dealer.name} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-[#fafafa] border border-gray-100 rounded-[2rem] p-10 flex flex-col h-full hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                        >
                            <div className="mb-8">
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">{dealer.city}</p>
                                <p className="text-2xl font-medium tracking-tight text-black">{dealer.name}</p>
                            </div>
                            
                            <p className="text-base font-light text-gray-500 leading-relaxed mb-10 flex-grow">
                                {dealer.address}
                            </p>
                            
                            <div className="mt-auto border-t border-gray-200 pt-8">
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Call</p>
                                <a href={`tel:${dealer.phone}`} className="text-lg font-medium text-black hover:text-gray-500 transition-colors inline-block mb-6">
                                    {dealer.phone}
                                </a>
                                <button className="w-full bg-white border border-gray-200 text-black hover:bg-black hover:text-white hover:border-black py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors">
                                    Get Directions
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Partner CTA */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-32 bg-black text-white rounded-[2.5rem] p-16 lg:p-24 text-center overflow-hidden relative"
                >
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Partnership</p>
                        <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-6">
                            Want to partner with us?
                        </h2>
                        <p className="text-lg lg:text-xl font-light text-gray-400 mb-12 max-w-2xl mx-auto">
                            We are expanding rapidly across the nation. Join the electric revolution and become a RideEV dealer today.
                        </p>
                        <button className="bg-white text-black px-10 py-5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                            Apply for Dealership
                        </button>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
