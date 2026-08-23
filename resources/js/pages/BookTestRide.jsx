import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

const inputClass = "w-full border-b border-zinc-700 bg-transparent px-2 py-3 text-lg font-light text-white transition-colors focus:border-white focus:outline-none placeholder:text-zinc-600";
const labelClass = "mb-2 block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase";

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
    const [showSuccessModal, setShowSuccessModal] = useState(false);
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

    // Form Validation Logic
    const isFormValid = data.product_id && 
                        data.full_name && 
                        data.phone.length === 10 && 
                        data.mode && 
                        data.preferred_date && 
                        data.time_slot && 
                        (data.mode !== 'home' || data.pincode.length === 6);

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
        post('/book-a-test-ride', { 
            preserveScroll: true, 
            onSuccess: () => {
                setShowSuccessModal(true);
                reset();
            } 
        });
    }

    if (categories.length === 0) {
        return (
            <PublicLayout hideToaster={true}>
                <Head>
                    <title>Book a Test Ride | Ride EV</title>
                </Head>
                <div className="flex items-center justify-center min-h-[70vh] bg-zinc-950">
                    <div className="text-center">
                        <h1 className="text-3xl font-light text-zinc-500 mb-4">No models available yet</h1>
                        <p className="text-zinc-600">Please check back later.</p>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    const seo = props.seo || {};
    const pageTitle = "Book a Test Ride | Ride EV";
    const pageDescription = "Book a free test ride of your favorite Ride EV electric scooter. Experience the performance and comfort before you buy.";

    return (
        <PublicLayout hideToaster={true}>
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

            <div className="min-h-screen bg-zinc-950 flex flex-col lg:flex-row pt-[72px] lg:pt-[88px]">
                
                {/* LEFT: Live Preview Window (Sticky) */}
                <div className="w-full lg:w-1/2 h-[45vh] lg:h-[calc(100vh-88px)] bg-black sticky top-[72px] lg:top-[88px] border-r border-zinc-900 z-10 flex flex-col">
                    
                    {/* Floating Title */}
                    <div className="absolute top-4 lg:top-12 left-4 lg:left-12 z-30">
                        <p className="text-[9px] lg:text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-1 lg:mb-2">Test Ride Configurator</p>
                        <h1 className="text-2xl lg:text-5xl font-medium tracking-tighter text-white">
                            Configure<br />Your Ride.
                        </h1>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                        {/* Studio Lighting Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-zinc-800/30 rounded-full blur-[100px] pointer-events-none z-0" />
                        
                        <AnimatePresence mode="wait">
                            {image ? (
                                <motion.img 
                                    key={image.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    src={image.image_url} 
                                    alt="Selected Model" 
                                    className="w-full h-full object-contain max-h-[300px] lg:max-h-[500px] p-8 lg:p-16 relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" 
                                />
                            ) : (
                                <span className="text-sm font-light uppercase tracking-widest text-zinc-700 relative z-10">Select a model</span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Floating Model Name */}
                    <div className="absolute bottom-10 lg:bottom-12 right-4 lg:right-12 z-30 text-right">
                        <AnimatePresence mode="wait">
                            {selectedProduct && (
                                <motion.div
                                    key={selectedProduct.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <p className="text-xl lg:text-4xl font-medium tracking-tight text-white mb-1">{selectedProduct.name}</p>
                                    <p className="text-xs lg:text-sm font-light text-zinc-400">Starting at ₹{Number(selectedProduct.price).toLocaleString('en-IN')}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT: Scrollable Form */}
                <div className="w-full lg:w-1/2 bg-zinc-950 flex flex-col relative z-20 -mt-6 lg:mt-0 rounded-t-3xl lg:rounded-none shadow-[0_-20px_40px_rgba(0,0,0,0.8)] lg:shadow-none pb-24 lg:pb-0">
                    <form onSubmit={submit} className="flex-1 px-4 lg:px-16 py-6 lg:py-12 lg:space-y-8">
                        
                        {/* SECTION 1: Model Selection */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">1. Select Model</h2>
                            
                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <label className={labelClass}>Series</label>
                                    <div className="flex flex-wrap gap-3">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() => selectCategory(category.id)}
                                                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                                                    category.id === activeCategoryId 
                                                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                                                        : 'bg-zinc-900 lg:bg-zinc-800/50 text-zinc-500 hover:text-white'
                                                }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Vehicle</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {products.map((product) => (
                                            <button
                                                key={product.id}
                                                type="button"
                                                onClick={() => selectProduct(product.id)}
                                                className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                                                    product.id === data.product_id 
                                                        ? 'border-white bg-zinc-900 lg:bg-zinc-800/80 shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-white' 
                                                        : 'border-zinc-800 lg:border-transparent bg-transparent lg:hover:bg-zinc-800/50 text-zinc-500'
                                                }`}
                                            >
                                                <span className={`block text-base lg:text-lg font-medium tracking-tight ${
                                                    product.id === data.product_id ? 'text-white' : 'text-zinc-400'
                                                }`}>
                                                    {product.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.product_id && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{errors.product_id}</p>}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: Contact Details */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">2. Contact Details</h2>
                            
                            <div className="space-y-6 lg:space-y-8">
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
                                    {errors.full_name && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                                    <div className="flex border-b border-zinc-700 focus-within:border-white transition-colors">
                                        <span className="flex items-center justify-center pr-3 pl-2 text-lg font-light text-zinc-500">
                                            +91
                                        </span>
                                        <input
                                            id="phone"
                                            type="text"
                                            inputMode="numeric"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="98765 43210"
                                            className="w-full bg-transparent py-3 text-lg font-light text-white focus:outline-none placeholder:text-zinc-600"
                                        />
                                    </div>
                                    {errors.phone && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{errors.phone}</p>}
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
                                    {errors.email && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: Scheduling */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">3. Schedule Time & Place</h2>
                            
                            <div className="space-y-8 lg:space-y-12">
                                
                                {/* Location */}
                                <div>
                                    <label className={labelClass}>Location Preference</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            ['home', 'At Home', 'We bring the ride to you.'],
                                            ['dealer', 'At Dealership', 'Visit our nearest showroom.'],
                                        ].map(([val, label, desc]) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => setData('mode', val)}
                                                className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                                                    data.mode === val 
                                                        ? 'border-white bg-zinc-900 lg:bg-zinc-800/80 ring-1 ring-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                                                        : 'border-zinc-800 lg:border-transparent bg-transparent'
                                                }`}
                                            >
                                                <p className={`text-base lg:text-lg font-medium tracking-tight ${data.mode === val ? 'text-white' : 'text-zinc-400'}`}>{label}</p>
                                                <p className={`mt-1 text-[10px] lg:text-xs font-light ${data.mode === val ? 'text-zinc-400' : 'text-zinc-600'}`}>{desc}</p>
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
                                            <div className="bg-zinc-900/50 p-4 lg:p-6 rounded-xl border border-zinc-800 mt-2">
                                                <label htmlFor="pincode" className={labelClass}>Your Pincode</label>
                                                <input
                                                    id="pincode"
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={data.pincode}
                                                    onChange={(e) => setData('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    placeholder="e.g. 400001"
                                                    className="w-full border-b border-zinc-700 bg-transparent px-2 py-2 text-base lg:text-lg font-light text-white transition-colors focus:border-white focus:outline-none placeholder:text-zinc-600"
                                                />
                                                {errors.pincode && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{errors.pincode}</p>}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Date */}
                                <div>
                                    <label className={labelClass}>Select Date</label>
                                    <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-4 thin-scrollbar">
                                        {dateOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => setData('preferred_date', opt.value)}
                                                className={`shrink-0 p-3 lg:p-4 rounded-xl text-center transition-all duration-300 border min-w-[90px] lg:min-w-[100px] ${
                                                    data.preferred_date === opt.value 
                                                        ? 'border-white ring-1 ring-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                                                        : 'border-zinc-800 lg:border-transparent bg-zinc-900 lg:bg-transparent text-zinc-500'
                                                }`}
                                            >
                                                <p className={`text-[10px] lg:text-xs font-bold tracking-widest uppercase ${data.preferred_date === opt.value ? 'text-black' : 'text-zinc-400'}`}>{opt.weekday}</p>
                                                <p className={`mt-1 text-[10px] lg:text-xs font-light ${data.preferred_date === opt.value ? 'text-zinc-700' : 'text-zinc-500'}`}>{opt.day}</p>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.preferred_date && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{errors.preferred_date}</p>}
                                </div>

                                {/* Time Slot */}
                                <div>
                                    <label className={labelClass}>Select Time Slot</label>
                                    {availableTimeSlots.length === 0 ? (
                                        <div className="bg-zinc-900/50 rounded-xl p-6 text-center border border-zinc-800">
                                            <p className="text-sm font-light text-zinc-500">No slots available for the selected date.</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2 lg:gap-3">
                                            {availableTimeSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setData('time_slot', slot)}
                                                    className={`px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 border ${
                                                        data.time_slot === slot 
                                                            ? 'border-white ring-1 ring-white bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] text-black' 
                                                            : 'border-zinc-800 lg:border-transparent bg-zinc-900 lg:bg-transparent text-zinc-400'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {errors.time_slot && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">{errors.time_slot}</p>}
                                </div>

                            </div>
                        </div>

                        {/* Floating Submit Button (Sticky Bottom) */}
                        <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto bg-zinc-950/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-t border-zinc-900 lg:border-none p-4 lg:p-0 lg:pt-8 z-50">
                            <button
                                type="submit"
                                disabled={processing || !isFormValid}
                                className="bg-white text-black px-12 py-4 rounded-full text-xs lg:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:shadow-none"
                            >
                                {processing ? 'Processing...' : 'Confirm Test Ride'}
                            </button>
                            <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-widest text-zinc-600 hidden lg:block">
                                By booking, you agree to our Terms of Service.
                            </p>
                        </div>

                    </form>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-0">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        
                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 lg:p-12 text-center shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                        >
                            <div className="w-20 h-20 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-8 ring-1 ring-white shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            
                            <h3 className="text-3xl font-medium text-white tracking-tight mb-4">
                                Booking Confirmed
                            </h3>
                            <p className="text-base font-light text-zinc-400 mb-10 leading-relaxed">
                                Your test ride has been successfully scheduled. Our team will contact you shortly to confirm the details.
                            </p>
                            
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full bg-white text-black px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors shadow-lg"
                            >
                                Done
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
