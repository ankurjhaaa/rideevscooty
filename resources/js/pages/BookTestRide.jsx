import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

const inputClass = "w-full border-b border-gray-200 bg-transparent px-4 py-4 text-lg lg:text-xl font-light text-black transition-colors focus:border-black focus:outline-none placeholder:text-gray-300";
const labelClass = "mb-2 block text-[10px] font-bold tracking-widest text-gray-400 uppercase";
const stepLabelClass = "text-3xl lg:text-5xl font-medium tracking-tight text-black mb-8";

function generateDateOptions(days = 14) {
    const options = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        options.push({
            value: date.toISOString().slice(0, 10),
            weekday: i === 0 ? 'Today' : date.toLocaleDateString('en-IN', { weekday: 'short' }),
            day: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        });
    }
    return options;
}

function todayValue() { return new Date().toISOString().slice(0, 10); }

function parseTimeToMinutes(timeStr) {
    const [time, period] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
}

function isSlotPast(slot, preferredDate) {
    if (preferredDate !== todayValue()) return false;
    const startTime = slot.split(' - ')[0];
    const now = new Date();
    return parseTimeToMinutes(startTime) <= now.getHours() * 60 + now.getMinutes();
}

export default function BookTestRide({ timeSlots, preselectedProductId }) {
    const { props } = usePage();
    const categories = (props.categories ?? []).filter((category) => category.products.length > 0);

    const initialMatch = useMemo(() => {
        if (!preselectedProductId) return null;
        for (const category of categories) {
            const product = category.products.find((p) => p.id === preselectedProductId);
            if (product) return { categoryId: category.id, productId: product.id };
        }
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [activeCategoryId, setActiveCategoryId] = useState(initialMatch?.categoryId ?? categories[0]?.id ?? null);
    const activeCategory = categories.find((category) => category.id === activeCategoryId);
    const products = activeCategory?.products ?? [];
    const dateOptions = useMemo(() => generateDateOptions(), []);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: initialMatch?.productId ?? products[0]?.id ?? '',
        color_id: '',
        full_name: '',
        phone: '',
        email: '',
        pincode: '',
        mode: 'home',
        preferred_date: '',
        time_slot: '',
        message: '',
    });

    const selectedProduct = categories
        .flatMap((category) => category.products)
        .find((product) => product.id === data.product_id);

    const image = selectedProduct?.images?.find((img) => img.is_primary) ?? selectedProduct?.images?.[0];
    const availableTimeSlots = timeSlots.filter((slot) => !isSlotPast(slot, data.preferred_date));

    useEffect(() => {
        if (data.time_slot && isSlotPast(data.time_slot, data.preferred_date)) setData('time_slot', '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.preferred_date]);

    function selectCategory(categoryId) {
        setActiveCategoryId(categoryId);
        const category = categories.find((c) => c.id === categoryId);
        setData('product_id', category?.products?.[0]?.id ?? '');
        setData('color_id', '');
    }

    function selectProduct(productId) {
        setData('product_id', productId);
        setData('color_id', '');
    }

    function submit(e) {
        e.preventDefault();
        post('/book-a-test-ride', { preserveScroll: true, onSuccess: () => reset() });
    }

    if (categories.length === 0) {
        return (
            <PublicLayout>
                <Head title="Book a Test Ride | RideEV" />
                <div className="flex items-center justify-center min-h-[70vh] bg-[#fafafa]">
                    <div className="text-center">
                        <h1 className="text-3xl font-light text-gray-500 mb-4">No models available yet</h1>
                        <p className="text-gray-400">Please check back later.</p>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Book a Test Ride | RideEV" />

            {/* Clean Hero Header */}
            <div className="bg-[#fafafa] pt-32 pb-16 lg:pt-48 lg:pb-24 border-b border-gray-100 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto px-6"
                >
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Experience RideEV</p>
                    <h1 className="text-5xl lg:text-7xl font-medium tracking-tight text-black mb-6">
                        Book a Test Ride.
                    </h1>
                    <p className="text-lg lg:text-xl font-light text-gray-500">
                        Get behind the handlebars and feel the future of urban mobility.
                    </p>
                </motion.div>
            </div>

            <form onSubmit={submit} className="bg-white pb-32">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 divide-y divide-gray-100">
                    
                    {/* STEP 1: MODEL */}
                    <section className="py-16 lg:py-24">
                        <div className="mb-12">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-2">Step 01</span>
                            <h2 className={stepLabelClass}>Choose your vehicle.</h2>
                        </div>
                        
                        <div className="space-y-12">
                            <div>
                                <label className={labelClass}>Series</label>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => selectCategory(category.id)}
                                            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                                                category.id === activeCategoryId 
                                                    ? 'bg-black text-white' 
                                                    : 'bg-[#fafafa] text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Model</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {products.map((product) => (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() => selectProduct(product.id)}
                                            className={`p-6 rounded-2xl text-left transition-all duration-300 border ${
                                                product.id === data.product_id 
                                                    ? 'border-black ring-1 ring-black bg-white shadow-sm' 
                                                    : 'border-transparent bg-[#fafafa] hover:bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            <span className={`block text-xl font-medium ${
                                                product.id === data.product_id ? 'text-black' : 'text-gray-600'
                                            }`}>
                                                {product.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {errors.product_id && <p className="mt-3 text-xs font-bold uppercase tracking-widest text-red-500">{errors.product_id}</p>}
                            </div>

                            {/* Live Preview */}
                            <div className="bg-[#fafafa] rounded-3xl p-8 lg:p-12 relative min-h-[300px] flex items-center justify-center mt-12 overflow-hidden">
                                {image ? (
                                    <motion.img 
                                        key={image.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        src={image.image_url} 
                                        alt="Selected Model" 
                                        className="w-full h-full object-contain mix-blend-multiply max-h-[400px] relative z-10 drop-shadow-none" 
                                    />
                                ) : (
                                    <span className="text-sm font-light uppercase tracking-widest text-gray-400">Render Pending</span>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* STEP 2: RIDER DETAILS */}
                    <section className="py-16 lg:py-24">
                        <div className="mb-12">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-2">Step 02</span>
                            <h2 className={stepLabelClass}>Your details.</h2>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <label htmlFor="full_name" className={labelClass}>Full Name</label>
                                <input
                                    id="full_name"
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                />
                                {errors.full_name && <p className="mt-2 text-xs font-bold uppercase tracking-widest text-red-500">{errors.full_name}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                                <div className="flex border-b border-gray-200 focus-within:border-black transition-colors">
                                    <span className="flex items-center justify-center pr-4 text-lg lg:text-xl font-light text-gray-400">
                                        +91
                                    </span>
                                    <input
                                        id="phone"
                                        type="text"
                                        inputMode="numeric"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="98765 43210"
                                        className="w-full bg-transparent py-4 text-lg lg:text-xl font-light text-black focus:outline-none placeholder:text-gray-300"
                                    />
                                </div>
                                {errors.phone && <p className="mt-2 text-xs font-bold uppercase tracking-widest text-red-500">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className={labelClass}>Email (Optional)</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                                {errors.email && <p className="mt-2 text-xs font-bold uppercase tracking-widest text-red-500">{errors.email}</p>}
                            </div>
                        </div>
                    </section>

                    {/* STEP 3: SCHEDULE */}
                    <section className="py-16 lg:py-24">
                        <div className="mb-12">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-2">Step 03</span>
                            <h2 className={stepLabelClass}>Time & Place.</h2>
                        </div>
                        
                        <div className="space-y-12">
                            
                            {/* Location */}
                            <div>
                                <label className={labelClass}>Location Preference</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        ['home', 'At Home', 'We bring the ride to you.'],
                                        ['dealer', 'At Dealership', 'Visit our nearest showroom.'],
                                    ].map(([val, label, desc]) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setData('mode', val)}
                                            className={`p-6 rounded-2xl text-left transition-all duration-300 border ${
                                                data.mode === val 
                                                    ? 'border-black ring-1 ring-black bg-white shadow-sm' 
                                                    : 'border-transparent bg-[#fafafa] hover:bg-gray-100'
                                            }`}
                                        >
                                            <p className={`text-xl font-medium ${data.mode === val ? 'text-black' : 'text-gray-600'}`}>{label}</p>
                                            <p className={`mt-2 text-sm font-light ${data.mode === val ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pincode (if home) */}
                            <AnimatePresence>
                                {data.mode === 'home' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-[#fafafa] p-8 rounded-2xl mt-4">
                                            <label htmlFor="pincode" className={labelClass}>Your Pincode</label>
                                            <input
                                                id="pincode"
                                                type="text"
                                                inputMode="numeric"
                                                value={data.pincode}
                                                onChange={(e) => setData('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                placeholder="e.g. 400001"
                                                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-lg font-light text-black transition-colors focus:border-black focus:outline-none placeholder:text-gray-400"
                                            />
                                            {errors.pincode && <p className="mt-3 text-xs font-bold uppercase tracking-widest text-red-500">{errors.pincode}</p>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Date */}
                            <div>
                                <label className={labelClass}>Select Date</label>
                                <div className="flex gap-3 overflow-x-auto pb-4 thin-scrollbar">
                                    {dateOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setData('preferred_date', opt.value)}
                                            className={`shrink-0 p-4 rounded-2xl text-center transition-all duration-300 border min-w-[100px] ${
                                                data.preferred_date === opt.value 
                                                    ? 'border-black ring-1 ring-black bg-black text-white shadow-md' 
                                                    : 'border-transparent bg-[#fafafa] text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <p className={`text-sm font-medium ${data.preferred_date === opt.value ? 'text-white' : 'text-gray-800'}`}>{opt.weekday}</p>
                                            <p className={`mt-1 text-xs font-light ${data.preferred_date === opt.value ? 'text-gray-300' : 'text-gray-500'}`}>{opt.day}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.preferred_date && <p className="mt-2 text-xs font-bold uppercase tracking-widest text-red-500">{errors.preferred_date}</p>}
                            </div>

                            {/* Time Slot */}
                            <div>
                                <label className={labelClass}>Select Time Slot</label>
                                {availableTimeSlots.length === 0 ? (
                                    <div className="bg-[#fafafa] rounded-2xl p-8 text-center">
                                        <p className="text-sm font-light text-gray-500">No slots available for the selected date.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {availableTimeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setData('time_slot', slot)}
                                                className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                                                    data.time_slot === slot 
                                                        ? 'border-black ring-1 ring-black bg-white shadow-sm text-black' 
                                                        : 'border-transparent bg-[#fafafa] hover:bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {errors.time_slot && <p className="mt-3 text-xs font-bold uppercase tracking-widest text-red-500">{errors.time_slot}</p>}
                            </div>

                        </div>
                    </section>

                    {/* SUBMIT */}
                    <div className="pt-16 lg:pt-24 flex flex-col items-center justify-center text-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-black text-white px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-w-[300px]"
                        >
                            {processing ? 'Processing...' : 'Confirm Test Ride'}
                        </button>
                        <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            By booking, you agree to our Terms of Service.
                        </p>
                    </div>
                </div>
            </form>
        </PublicLayout>
    );
}
