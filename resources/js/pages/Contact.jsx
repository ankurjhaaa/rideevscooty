import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

export default function Contact() {
    const { props } = usePage();
    const settings = props.siteSettings ?? {};

    const inputClass = "w-full border-b border-gray-200 bg-transparent px-4 py-4 text-lg lg:text-xl font-light text-black transition-colors focus:border-black focus:outline-none placeholder:text-gray-300";

    return (
        <PublicLayout>
            <Head title="Contact Us | RideEV" />

            {/* Clean Hero Header */}
            <div className="bg-[#fafafa] pt-32 pb-16 lg:pt-48 lg:pb-24 border-b border-gray-100 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto px-6"
                >
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Get in Touch</p>
                    <h1 className="text-5xl lg:text-7xl font-medium tracking-tight text-black mb-6">
                        Let's Talk.
                    </h1>
                    <p className="text-lg lg:text-xl font-light text-gray-500">
                        Whether you have a question about our machines, need support, or want to partner with us, we are here.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Info Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 space-y-16"
                    >
                        {settings.address && (
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Headquarters</p>
                                <p className="text-xl lg:text-2xl font-light text-black leading-relaxed">{settings.address}</p>
                            </div>
                        )}
                        
                        {settings.phone && (
                            <div className="pt-12 border-t border-gray-100">
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Phone Support</p>
                                <a href={`tel:${settings.phone}`} className="text-2xl lg:text-4xl font-light text-black hover:text-gray-500 transition-colors">
                                    {settings.phone}
                                </a>
                            </div>
                        )}

                        {settings.email && (
                            <div className="pt-12 border-t border-gray-100">
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Email Enquiries</p>
                                <a href={`mailto:${settings.email}`} className="text-2xl lg:text-3xl font-light text-black hover:text-gray-500 transition-colors break-all">
                                    {settings.email}
                                </a>
                            </div>
                        )}
                    </motion.div>

                    {/* Form Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-7 bg-[#fafafa] p-8 lg:p-16 rounded-[2.5rem]"
                    >
                        <div className="mb-12">
                            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight text-black mb-4">
                                Send a Message
                            </h2>
                            <p className="text-gray-500 font-light">We typically reply within 24 hours.</p>
                        </div>
                        
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Full Name</label>
                                <input type="text" className={inputClass} placeholder="John Doe" />
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Email Address</label>
                                <input type="email" className={inputClass} placeholder="you@example.com" />
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Phone Number</label>
                                <input type="tel" className={inputClass} placeholder="+91 98765 43210" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Your Message</label>
                                <textarea rows="4" className={`${inputClass} resize-none`} placeholder="How can we help you?"></textarea>
                            </div>

                            <div className="pt-8">
                                <button className="w-full sm:w-auto px-12 py-5 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </PublicLayout>
    );
}
