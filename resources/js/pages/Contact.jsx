import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '../components/PublicLayout';

export default function Contact() {
    const { props } = usePage();
    const settings = props.siteSettings ?? {};

    const inputClass = "w-full rounded-none border-[6px] border-black bg-white px-6 py-6 text-xl font-black text-black uppercase transition-none focus:border-black focus:bg-black focus:text-white focus:outline-none";

    return (
        <PublicLayout>
            <Head title="Contact Us | RideEV" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    
                    {/* Info Side */}
                    <div>
                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-12">
                            LET'S TALK.
                        </h1>
                        <p className="text-2xl font-bold uppercase leading-relaxed mb-16">
                            WHETHER YOU HAVE A QUESTION ABOUT OUR MACHINES, NEED SUPPORT, OR WANT TO PARTNER WITH US, WE ARE HERE.
                        </p>

                        <div className="space-y-12">
                            {settings.address && (
                                <div>
                                    <p className="text-sm font-black tracking-widest uppercase mb-4 opacity-60">HEADQUARTERS</p>
                                    <p className="text-3xl font-black uppercase">{settings.address}</p>
                                </div>
                            )}
                            
                            {settings.phone && (
                                <div className="pt-12 border-t-[6px] border-black">
                                    <p className="text-sm font-black tracking-widest uppercase mb-4 opacity-60">PHONE SUPPORT</p>
                                    <a href={`tel:${settings.phone}`} className="text-5xl font-black uppercase hover:underline">
                                        {settings.phone}
                                    </a>
                                </div>
                            )}

                            {settings.email && (
                                <div className="pt-12 border-t-[6px] border-black">
                                    <p className="text-sm font-black tracking-widest uppercase mb-4 opacity-60">EMAIL ENQUIRIES</p>
                                    <a href={`mailto:${settings.email}`} className="text-4xl font-black uppercase hover:underline break-all">
                                        {settings.email}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-white border-[12px] border-black p-8 lg:p-16">
                        <h2 className="text-4xl font-black tracking-tighter uppercase mb-12 border-b-[6px] border-black pb-6">
                            SEND A MESSAGE
                        </h2>
                        
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-black tracking-widest uppercase mb-4">FULL NAME</label>
                                <input type="text" className={inputClass} placeholder="JOHN DOE" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-black tracking-widest uppercase mb-4">EMAIL ADDRESS</label>
                                <input type="email" className={inputClass} placeholder="YOU@EXAMPLE.COM" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-black tracking-widest uppercase mb-4">PHONE NUMBER</label>
                                <input type="tel" className={inputClass} placeholder="+91 98765 43210" />
                            </div>

                            <div>
                                <label className="block text-sm font-black tracking-widest uppercase mb-4">YOUR MESSAGE</label>
                                <textarea rows="5" className={inputClass} placeholder="HOW CAN WE HELP?"></textarea>
                            </div>

                            <button className="w-full bg-black text-white py-8 text-2xl font-black tracking-widest uppercase hover:bg-white hover:text-black border-[6px] border-transparent hover:border-black transition-none mt-8">
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
