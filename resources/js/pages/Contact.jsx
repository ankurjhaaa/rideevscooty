import { Head, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';

const AREA_OPTIONS = [
    'Below 500 sq.ft',
    '500 - 1,000 sq.ft',
    '1,000 - 2,000 sq.ft',
    'Above 2,000 sq.ft',
];

const INVESTMENT_OPTIONS = [
    'Below ₹5 Lakhs',
    '₹5 - 10 Lakhs',
    '₹10 - 25 Lakhs',
    'Above ₹25 Lakhs',
];

export default function Contact() {
    const { props } = usePage();
    const settings = props.siteSettings ?? {};

    const email = settings.email ?? "contact@rideev.com";
    const phone = settings.phone ?? "+1 (800) 555-RIDE";
    const address = settings.address ?? "100 Innovation Drive, Tech City, TX 75000";

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        phone: '',
        pincode: '',
        area_available: '',
        investment: '',
    });

    // Exact input classes from BookTestRide.jsx
    const inputClass = "w-full border-b border-zinc-700 bg-transparent px-2 py-3 text-lg font-light text-white transition-colors focus:border-white focus:outline-none placeholder:text-zinc-600";
    const selectClass = "w-full appearance-none cursor-pointer border-b border-zinc-700 bg-transparent px-2 py-3 text-lg font-light text-white transition-colors focus:border-white focus:outline-none";
    const labelClass = "mb-2 block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase";
    const errorClass = "mt-2 text-xs font-medium text-red-400";

    function submit(e) {
        e.preventDefault();
        post('/dealership', {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccessModal(true);
                reset();
            },
        });
    }

    return (
        <PublicLayout>
            <Head title="Dealership | RideEV" />

            {/* Exactly matching the BookTestRide structure */}
            <div className="min-h-screen bg-zinc-950 flex flex-col lg:flex-row pt-[72px] lg:pt-[88px]">

                {/* LEFT: Information Column (Sticky) */}
                <div className="w-full lg:w-1/2 min-h-[45vh] lg:h-[calc(100vh-88px)] bg-black lg:sticky lg:top-[88px] border-r border-zinc-900 z-10 flex flex-col justify-center relative overflow-hidden">

                    {/* Studio Lighting Glow */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[70%] h-[70%] bg-zinc-800/30 rounded-full blur-[120px] pointer-events-none z-0" />

                    <div className="relative z-10 px-8 py-16 lg:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Become a Partner</p>
                            <h1 className="text-5xl lg:text-7xl font-medium tracking-tighter text-white mb-6">
                                Fill Your Dealership<br />Application Here.
                            </h1>
                            <p className="text-lg lg:text-xl font-light text-zinc-400 max-w-sm mb-16 lg:mb-24">
                                Partner with RideEV and bring electric mobility to your city.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="space-y-10"
                        >
                            {settings.email !== false && (
                                <div className="group">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-2 transition-colors group-hover:text-white">Email Support</p>
                                    <a href={`mailto:${email}`} className="text-2xl lg:text-3xl font-light text-white hover:text-zinc-300 transition-colors break-words">{email}</a>
                                </div>
                            )}
                            {settings.phone !== false && (
                                <div className="group">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-2 transition-colors group-hover:text-white">Direct Line</p>
                                    <a href={`tel:${phone}`} className="text-2xl lg:text-3xl font-light text-white hover:text-zinc-300 transition-colors">{phone}</a>
                                </div>
                            )}
                            {settings.address !== false && (
                                <div className="group pt-6 border-t border-zinc-900">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-2 transition-colors group-hover:text-white">Headquarters</p>
                                    <p className="text-lg lg:text-xl font-light text-zinc-400 max-w-sm leading-relaxed">{address}</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT: Scrollable Form */}
                <div className="w-full lg:w-1/2 bg-zinc-950 flex flex-col relative z-20 -mt-6 lg:mt-0 rounded-t-3xl lg:rounded-none shadow-[0_-20px_40px_rgba(0,0,0,0.8)] lg:shadow-none pb-24 lg:pb-0">
                    <form onSubmit={submit} className="flex-1 px-4 lg:px-16 py-6 lg:py-12 lg:space-y-8">

                        {/* SECTION 1: Personal Details */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">1. Personal Details</h2>

                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className={inputClass}
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        required
                                    />
                                    {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Phone Number</label>
                                    <div className="flex border-b border-zinc-700 focus-within:border-white transition-colors">
                                        <span className="flex items-center justify-center pr-3 pl-2 text-lg font-light text-zinc-500">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            placeholder="98765 43210"
                                            className="w-full bg-transparent py-3 text-lg font-light text-white focus:outline-none placeholder:text-zinc-600"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Pincode</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="e.g. 800001"
                                        className={inputClass}
                                        value={data.pincode}
                                        onChange={(e) => setData('pincode', e.target.value)}
                                        required
                                    />
                                    {errors.pincode && <p className={errorClass}>{errors.pincode}</p>}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: Dealership Details */}
                        <div className="lg:bg-zinc-900/40 lg:backdrop-blur-md lg:rounded-2xl py-6 lg:p-10 border-b lg:border border-zinc-900 lg:border-zinc-800">
                            <h2 className="text-lg lg:text-xl font-medium text-white mb-6 lg:mb-8">2. Dealership Details</h2>

                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <label className={labelClass}>Area Available</label>
                                    <div className="relative">
                                        <select
                                            className={selectClass}
                                            value={data.area_available}
                                            onChange={(e) => setData('area_available', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled className="bg-zinc-950 text-zinc-600">Select</option>
                                            {AREA_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt} className="bg-zinc-950 text-white">
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {errors.area_available && <p className={errorClass}>{errors.area_available}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Investment</label>
                                    <div className="relative">
                                        <select
                                            className={selectClass}
                                            value={data.investment}
                                            onChange={(e) => setData('investment', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled className="bg-zinc-950 text-zinc-600">Select</option>
                                            {INVESTMENT_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt} className="bg-zinc-950 text-white">
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {errors.investment && <p className={errorClass}>{errors.investment}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Floating Submit Button (Sticky Bottom) */}
                        <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto bg-zinc-950/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-t border-zinc-900 lg:border-none p-4 lg:p-0 lg:pt-8 z-50">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-white text-black px-12 py-4 rounded-full text-xs lg:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 w-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Submitting...' : 'Submit Application'}
                            </button>
                            <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-widest text-zinc-600 hidden lg:block">
                                We typically reply within 24 hours.
                            </p>
                        </div>

                    </form>
                </div>
            </div>

            {/* Success Modal matching BookTestRide */}
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
                                Application Received
                            </h3>
                            <p className="text-base font-light text-zinc-400 mb-10 leading-relaxed">
                                Thank you for your interest in a RideEV dealership. Our team has received your
                                application and will get back to you shortly.
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
