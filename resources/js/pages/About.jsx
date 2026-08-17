import { Head } from '@inertiajs/react';
import PublicLayout from '../components/PublicLayout';

export default function About() {
    return (
        <PublicLayout>
            <Head title="About Us | RideEV" />

            <div className="border-b-[12px] border-black">
                {/* Massive Header section */}
                <section className="bg-white px-6 py-32 lg:px-12 lg:py-48 max-w-[1400px] mx-auto">
                    <h1 className="text-[10vw] leading-[0.85] font-black tracking-tighter uppercase break-words mb-12">
                        THE FUTURE<br/>IS ELECTRIC.
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-24 pt-12 border-t-[6px] border-black">
                        <div>
                            <p className="text-3xl font-black uppercase tracking-tighter">
                                WE BUILD MACHINES FOR THOSE WHO DEMAND MORE. NO NOISE, NO EMISSIONS, JUST PURE ADRENALINE.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <p className="text-xl font-bold uppercase leading-relaxed">
                                Founded with a single mission: to revolutionize urban mobility. RideEV isn't just about getting from point A to B. It's about how you feel when you twist the throttle.
                            </p>
                            <p className="text-xl font-bold uppercase leading-relaxed opacity-60">
                                We strip away the unnecessary. No complex maintenance, no expensive fuel. Just raw, instant torque wrapped in a design that refuses to be ignored.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Stats Block */}
            <section className="bg-black text-white border-b-[12px] border-black">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y-[6px] md:divide-y-0 md:divide-x-[6px] divide-white max-w-[1400px] mx-auto">
                    {[
                        { num: '10K+', label: 'VEHICLES ON ROAD' },
                        { num: '15M+', label: 'KILOMETERS DRIVEN' },
                        { num: '0', label: 'CARBON EMISSIONS' },
                    ].map((stat) => (
                        <div key={stat.label} className="p-16 lg:p-24 flex flex-col justify-center items-center text-center">
                            <p className="text-[6vw] font-black leading-none">{stat.num}</p>
                            <p className="text-xl font-black tracking-widest mt-6 uppercase opacity-80">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Design Philosophy */}
            <section className="bg-white py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
                <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-24 pb-8 border-b-[6px] border-black">
                    DESIGN PHILOSOPHY
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="border-[6px] border-black p-12 lg:p-20">
                        <p className="text-4xl font-black uppercase tracking-tighter mb-8">FORM FOLLOWS FUNCTION</p>
                        <p className="text-xl font-bold uppercase leading-relaxed">
                            Every angle, every line, every surface serves a purpose. We don't do fake vents or unnecessary plastics. Our design language is brutally honest and unapologetically bold.
                        </p>
                    </div>
                    <div className="bg-black text-white p-12 lg:p-20">
                        <p className="text-4xl font-black uppercase tracking-tighter mb-8">BUILT TO LAST</p>
                        <p className="text-xl font-bold uppercase leading-relaxed opacity-90">
                            We use high-grade steel, aerospace aluminum, and the most advanced battery tech available. Our scooters aren't toys; they are industrial-grade machines built for the streets.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
