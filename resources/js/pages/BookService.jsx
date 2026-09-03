import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';

const inputClass = "w-full border-b border-zinc-700 bg-transparent px-2 py-3 text-lg font-light text-white transition-colors focus:border-white focus:outline-none placeholder:text-zinc-600";
const labelClass = "mb-2 block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase";
const errorClass = "mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500";

function ScrollableSelect({ id, value, onChange, options, placeholder }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const selected = options.find((opt) => String(opt.value) === String(value));

    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <button
                id={id}
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between border-b border-zinc-700 bg-transparent px-2 py-3 text-lg font-light text-white transition-colors focus:border-white focus:outline-none"
            >
                <span className={selected ? 'text-white' : 'text-zinc-600'}>
                    {selected ? selected.label : placeholder}
                </span>
                <svg className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-30 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 shadow-[0_20px_40px_rgba(0,0,0,0.6)] thin-scrollbar"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                    String(opt.value) === String(value)
                                        ? 'bg-white text-black font-medium'
                                        : 'text-zinc-300 hover:bg-zinc-900'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

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

export default function BookService({ timeSlots, serviceTypes, fullyBookedDates }) {
    const { props } = usePage();
    const categories = (props.categories ?? []).filter((category) => category.products.length > 0);
    const products = categories.flatMap((category) => category.products);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const dateOptions = useMemo(() => generateDateOptions(), []);
    const fullyBookedSet = useMemo(() => new Set(fullyBookedDates ?? []), [fullyBookedDates]);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: '',
        full_name: '',
        phone: '',
        whatsapp: '',
        vehicle_purchase_date: '',
        service_type: '',
        complaint: '',
        preferred_date: '',
        preferred_time: '',
        location_type: 'showroom',
        address: '',
    });

    const availableTimeSlots = timeSlots.filter((slot) => !isSlotPast(slot, data.preferred_date));

    useEffect(() => {
        if (data.preferred_time && isSlotPast(data.preferred_time, data.preferred_date)) setData('preferred_time', '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.preferred_date]);

    function submit(e) {
        e.preventDefault();
        post('/book-a-service', {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccessModal(true);
                reset();
            },
        });
    }

    const pageTitle = "Book a Service | Ride EV";
    const pageDescription = "Keep your Ride EV ready. Book a service appointment for your electric scooter — battery check, motor check, brake check and more.";

    return (
        <PublicLayout hideToaster={true}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
            </Head>

            <div className="min-h-screen bg-zinc-950 flex flex-col lg:flex-row pt-[72px] lg:pt-[88px]">

                {/* LEFT: Information Column (Sticky) */}
                <div className="w-full lg:w-1/2 min-h-[35vh] lg:h-[calc(100vh-88px)] bg-black lg:sticky lg:top-[88px] border-r border-zinc-900 z-10 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[70%] h-[70%] bg-zinc-800/30 rounded-full blur-[120px] pointer-events-none z-0" />

                    <div className="relative z-10 px-8 py-16 lg:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Book a Service</p>
                            <h1 className="text-4xl lg:text-6xl font-medium tracking-tighter text-white mb-6">
                                Keep Your Ride<br />Ready.
                            </h1>
                            <p className="text-lg lg:text-xl font-light text-zinc-400 max-w-sm mb-8">
                                We'll take care of the rest.
                            </p>
                            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-xs font-medium text-zinc-400">Service window: 9:30 AM – 12:30 PM</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT: Scrollable Form */}
                <div className="w-full lg:w-1/2 bg-zinc-950 flex flex-col relative z-20 -mt-6 lg:mt-0 rounded-t-3xl lg:rounded-none shadow-[0_-20px_40px_rgba(0,0,0,0.8)] lg:shadow-none pb-24 lg:pb-0">
                    <form onSubmit={submit} className="flex-1 px-4 lg:px-16 py-6 lg:py-12 lg:space-y-8">

                        {/* SECTION 1: Customer Information */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">1. Customer Information</h2>

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
                                    {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className={labelClass}>Mobile Number</label>
                                    <div className="flex border-b border-zinc-700 focus-within:border-white transition-colors">
                                        <span className="flex items-center justify-center pr-3 pl-2 text-lg font-light text-zinc-500">+91</span>
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
                                    {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                                </div>

                                <div>
                                    <label htmlFor="whatsapp" className={labelClass}>WhatsApp Number <span className="text-zinc-600 normal-case">(optional)</span></label>
                                    <div className="flex border-b border-zinc-700 focus-within:border-white transition-colors">
                                        <span className="flex items-center justify-center pr-3 pl-2 text-lg font-light text-zinc-500">+91</span>
                                        <input
                                            id="whatsapp"
                                            type="text"
                                            inputMode="numeric"
                                            value={data.whatsapp}
                                            onChange={(e) => setData('whatsapp', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="98765 43210"
                                            className="w-full bg-transparent py-3 text-lg font-light text-white focus:outline-none placeholder:text-zinc-600"
                                        />
                                    </div>
                                    {errors.whatsapp && <p className={errorClass}>{errors.whatsapp}</p>}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: Vehicle Information */}
                        <div className="relative z-20 lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">2. Vehicle Information</h2>

                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <label htmlFor="product_id" className={labelClass}>Vehicle Model</label>
                                    <ScrollableSelect
                                        id="product_id"
                                        value={data.product_id}
                                        onChange={(value) => setData('product_id', value)}
                                        placeholder="Select your scooter model"
                                        options={products.map((product) => ({ value: product.id, label: product.name }))}
                                    />
                                    {errors.product_id && <p className={errorClass}>{errors.product_id}</p>}
                                </div>

                                <div>
                                    <label htmlFor="vehicle_purchase_date" className={labelClass}>Vehicle Purchase Date <span className="text-zinc-600 normal-case">(optional)</span></label>
                                    <input
                                        id="vehicle_purchase_date"
                                        type="date"
                                        max={todayValue()}
                                        value={data.vehicle_purchase_date}
                                        onChange={(e) => setData('vehicle_purchase_date', e.target.value)}
                                        className={`${inputClass} [color-scheme:dark]`}
                                    />
                                    {errors.vehicle_purchase_date && <p className={errorClass}>{errors.vehicle_purchase_date}</p>}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: Service Information */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">3. Service Information</h2>

                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <label className={labelClass}>Service Type</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-3">
                                        {Object.entries(serviceTypes).map(([value, label]) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => setData('service_type', value)}
                                                className={`px-3 py-2.5 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium text-center transition-all duration-300 border ${
                                                    data.service_type === value
                                                        ? 'border-white ring-1 ring-white bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                                        : 'border-zinc-800 bg-zinc-900 lg:bg-zinc-800/50 text-zinc-400'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.service_type && <p className={errorClass}>{errors.service_type}</p>}
                                </div>

                                <div>
                                    <label htmlFor="complaint" className={labelClass}>Describe Your Problem / Complaint</label>
                                    <textarea
                                        id="complaint"
                                        rows={4}
                                        value={data.complaint}
                                        onChange={(e) => setData('complaint', e.target.value)}
                                        placeholder="Tell us what's wrong with your scooter..."
                                        className={`${inputClass} resize-none`}
                                    />
                                    {errors.complaint && <p className={errorClass}>{errors.complaint}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Preferred Service Date</label>
                                    <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-4 thin-scrollbar">
                                        {dateOptions.map((opt) => {
                                            const isFull = fullyBookedSet.has(opt.value);
                                            return (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    disabled={isFull}
                                                    onClick={() => setData('preferred_date', opt.value)}
                                                    className={`shrink-0 p-3 lg:p-4 rounded-xl text-center transition-all duration-300 border min-w-[90px] lg:min-w-[100px] ${
                                                        isFull
                                                            ? 'border-zinc-900 bg-zinc-900/50 text-zinc-700 cursor-not-allowed opacity-50'
                                                            : data.preferred_date === opt.value
                                                            ? 'border-white ring-1 ring-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                                            : 'border-zinc-800 lg:border-transparent bg-zinc-900 lg:bg-transparent text-zinc-500'
                                                    }`}
                                                >
                                                    <p className={`text-[10px] lg:text-xs font-bold tracking-widest uppercase ${data.preferred_date === opt.value && !isFull ? 'text-black' : 'text-zinc-400'}`}>{opt.weekday}</p>
                                                    <p className={`mt-1 text-[10px] lg:text-xs font-light ${data.preferred_date === opt.value && !isFull ? 'text-zinc-700' : 'text-zinc-500'}`}>{opt.day}</p>
                                                    {isFull && <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-red-500">Full</p>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.preferred_date && <p className={errorClass}>{errors.preferred_date}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Preferred Time</label>
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
                                                    onClick={() => setData('preferred_time', slot)}
                                                    className={`px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 border ${
                                                        data.preferred_time === slot
                                                            ? 'border-white ring-1 ring-white bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] text-black'
                                                            : 'border-zinc-800 lg:border-transparent bg-zinc-900 lg:bg-transparent text-zinc-400'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {errors.preferred_time && <p className={errorClass}>{errors.preferred_time}</p>}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 4: Service Location */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">4. Service Location</h2>

                            <div className="space-y-6 lg:space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        ['showroom', 'Visit Showroom', 'Bring your scooter to us.'],
                                        ['pickup_drop', 'Pickup & Drop', 'We collect and return your scooter.'],
                                    ].map(([val, label, desc]) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setData('location_type', val)}
                                            className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                                                data.location_type === val
                                                    ? 'border-white bg-zinc-900 lg:bg-zinc-800/80 ring-1 ring-white shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                                    : 'border-zinc-800 lg:border-transparent bg-transparent'
                                            }`}
                                        >
                                            <p className={`text-base lg:text-lg font-medium tracking-tight ${data.location_type === val ? 'text-white' : 'text-zinc-400'}`}>{label}</p>
                                            <p className={`mt-1 text-[10px] lg:text-xs font-light ${data.location_type === val ? 'text-zinc-400' : 'text-zinc-600'}`}>{desc}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.location_type && <p className={errorClass}>{errors.location_type}</p>}

                                <AnimatePresence>
                                    {data.location_type === 'pickup_drop' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-zinc-900/50 p-4 lg:p-6 rounded-xl border border-zinc-800 mt-2">
                                                <label htmlFor="address" className={labelClass}>Address / Additional Details</label>
                                                <textarea
                                                    id="address"
                                                    rows={3}
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    placeholder="Full address for pickup & drop"
                                                    className="w-full border-b border-zinc-700 bg-transparent px-2 py-2 text-base lg:text-lg font-light text-white transition-colors focus:border-white focus:outline-none placeholder:text-zinc-600 resize-none"
                                                />
                                                {errors.address && <p className={errorClass}>{errors.address}</p>}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Floating Submit Button (Sticky Bottom) */}
                        <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto bg-zinc-950/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-t border-zinc-900 lg:border-none p-4 lg:p-0 lg:pt-8 z-50">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-white text-black px-12 py-4 rounded-full text-xs lg:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:shadow-none"
                            >
                                {processing ? 'Submitting...' : 'Book Service Now'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
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
                                Service Request Submitted
                            </h3>
                            <p className="text-base font-light text-zinc-400 mb-10 leading-relaxed">
                                Thank you for choosing RIDE EV. Our service team will contact you shortly.
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
