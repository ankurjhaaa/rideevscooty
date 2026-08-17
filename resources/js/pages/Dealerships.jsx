import { Head } from '@inertiajs/react';
import PublicLayout from '../components/PublicLayout';

export default function Dealerships() {
    const dealers = [
        { city: 'MUMBAI', name: 'RIDEEV WEST', address: '123 LINK ROAD, ANDHERI WEST, MUMBAI 400053', phone: '022-12345678' },
        { city: 'DELHI', name: 'RIDEEV NORTH', address: '45 CONNAUGHT PLACE, NEW DELHI 110001', phone: '011-87654321' },
        { city: 'BENGALURU', name: 'RIDEEV SOUTH', address: '78 INDIRANAGAR 100FT ROAD, BENGALURU 560038', phone: '080-11223344' },
        { city: 'PUNE', name: 'RIDEEV DECCAN', address: '12 KOREGAON PARK, PUNE 411001', phone: '020-99887766' },
        { city: 'HYDERABAD', name: 'RIDEEV DECCAN PRO', address: '55 JUBILEE HILLS, HYDERABAD 500033', phone: '040-55443322' },
        { city: 'CHENNAI', name: 'RIDEEV COAST', address: '89 ECR ROAD, THIRUVANMIYUR, CHENNAI 600041', phone: '044-66778899' },
    ];

    return (
        <PublicLayout>
            <Head title="Dealerships | RideEV" />

            <div className="bg-black text-white px-6 py-24 lg:px-12 border-b-[12px] border-black">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-8">
                        FIND A DEALER
                    </h1>
                    <p className="text-2xl font-bold uppercase tracking-widest opacity-80 max-w-3xl">
                        VISIT OUR EXPERIENCE CENTERS TO FEEL THE MACHINES IN PERSON.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dealers.map((dealer) => (
                        <div key={dealer.name} className="border-[6px] border-black p-8 hover:bg-black hover:text-white transition-none group flex flex-col h-full">
                            <div className="border-b-[4px] border-black group-hover:border-white pb-4 mb-6">
                                <p className="text-lg font-black tracking-widest uppercase mb-2">{dealer.city}</p>
                                <p className="text-3xl font-black tracking-tighter uppercase">{dealer.name}</p>
                            </div>
                            
                            <p className="text-lg font-bold uppercase leading-relaxed mb-8 flex-grow">
                                {dealer.address}
                            </p>
                            
                            <div className="mt-auto">
                                <p className="text-sm font-black tracking-widest uppercase opacity-60 mb-2">CALL</p>
                                <a href={`tel:${dealer.phone}`} className="text-2xl font-black uppercase hover:underline">
                                    {dealer.phone}
                                </a>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t-[4px] border-black group-hover:border-white">
                                <button className="w-full bg-black text-white group-hover:bg-white group-hover:text-black py-4 text-sm font-black tracking-widest uppercase transition-none">
                                    GET DIRECTIONS
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-32 border-[6px] border-black bg-black text-white p-16 text-center">
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-6">
                        WANT TO PARTNER WITH US?
                    </h2>
                    <p className="text-xl font-bold uppercase mb-12">
                        WE ARE EXPANDING RAPIDLY. BECOME A RIDEEV DEALER TODAY.
                    </p>
                    <button className="bg-white text-black px-12 py-6 text-xl font-black tracking-widest uppercase hover:bg-transparent hover:text-white border-[6px] border-white transition-none">
                        APPLY FOR DEALERSHIP
                    </button>
                </div>
            </div>
        </PublicLayout>
    );
}
