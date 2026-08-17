import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import PublicLayout from '../components/PublicLayout';

const inputClass = "w-full rounded-none border-[6px] border-black bg-white px-6 py-6 text-2xl font-black text-black uppercase transition-none focus:border-black focus:bg-black focus:text-white focus:outline-none";
const labelClass = "mb-4 block text-sm font-black tracking-widest text-black uppercase opacity-60";
const stepLabelClass = "text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-16";

function generateDateOptions(days = 14) {
    const options = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        options.push({
            value: date.toISOString().slice(0, 10),
            weekday: i === 0 ? 'TODAY' : date.toLocaleDateString('en-IN', { weekday: 'short' }).toUpperCase(),
            day: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }).toUpperCase(),
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
    const colors = selectedProduct?.colors ?? [];
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
                <div className="flex items-center justify-center min-h-[500px] border-b-[12px] border-black">
                    <h1 className="text-6xl font-black tracking-tighter uppercase">NO MODELS AVAILABLE YET</h1>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Book a Test Ride | RideEV" />

            <div className="bg-black text-white px-6 py-24 lg:px-12 border-b-[12px] border-black text-center">
                <h1 className="text-[10vw] lg:text-[8vw] leading-none font-black tracking-tighter uppercase">
                    TEST RIDE.
                </h1>
            </div>

            <form onSubmit={submit} className="bg-white">
                
                {/* STEP 1: MODEL */}
                <section className="border-b-[12px] border-black">
                    <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y-[6px] lg:divide-y-0 lg:divide-x-[6px] divide-black">
                        
                        <div className="lg:col-span-5 p-12 lg:p-24 bg-black text-white flex flex-col justify-center">
                            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-4">01. CHOOSE MACHINE</h2>
                            <p className="text-xl font-bold uppercase opacity-80">SELECT YOUR PREFERRED VEHICLE FOR THE TEST RIDE.</p>
                        </div>
                        
                        <div className="lg:col-span-7 p-12 lg:p-24 bg-white">
                            
                            <div className="mb-16">
                                <label className={labelClass}>SERIES</label>
                                <div className="flex flex-wrap gap-4">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => selectCategory(category.id)}
                                            className={`px-8 py-4 text-xl font-black tracking-widest uppercase border-[6px] border-black transition-none ${
                                                category.id === activeCategoryId ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-16">
                                <label className={labelClass}>MODEL</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {products.map((product) => (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() => selectProduct(product.id)}
                                            className={`p-6 text-left border-[6px] border-black transition-none group ${
                                                product.id === data.product_id ? 'bg-black' : 'bg-white hover:bg-black'
                                            }`}
                                        >
                                            <span className={`block text-3xl font-black uppercase tracking-tighter ${
                                                product.id === data.product_id ? 'text-white' : 'text-black group-hover:text-white'
                                            }`}>
                                                {product.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {errors.product_id && <p className="mt-4 text-lg font-black uppercase text-red-600">{errors.product_id}</p>}
                            </div>

                            {/* Live Preview */}
                            <div className="border-[6px] border-black bg-white p-8 relative min-h-[300px] flex items-center justify-center mt-16">
                                <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-sm font-black tracking-widest uppercase">
                                    CURRENT SELECTION
                                </div>
                                {image ? (
                                    <img src={image.image_url} alt="Selected Model" className="w-full h-full object-contain mix-blend-multiply max-h-[300px]" />
                                ) : (
                                    <span className="text-2xl font-black uppercase tracking-widest opacity-50">NO IMAGE</span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEP 2: RIDER DETAILS */}
                <section className="border-b-[12px] border-black">
                    <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y-[6px] lg:divide-y-0 lg:divide-x-[6px] divide-black">
                        
                        <div className="lg:col-span-5 p-12 lg:p-24 bg-black text-white flex flex-col justify-center">
                            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-4">02. RIDER PROFILE</h2>
                            <p className="text-xl font-bold uppercase opacity-80">ENTER YOUR DETAILS. WE WILL CONTACT YOU TO CONFIRM.</p>
                        </div>
                        
                        <div className="lg:col-span-7 p-12 lg:p-24 bg-white space-y-12">
                            <div>
                                <label htmlFor="full_name" className={labelClass}>FULL NAME</label>
                                <input
                                    id="full_name"
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    placeholder="JOHN DOE"
                                    className={inputClass}
                                />
                                {errors.full_name && <p className="mt-2 text-sm font-black uppercase text-red-600">{errors.full_name}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className={labelClass}>PHONE NUMBER</label>
                                <div className="flex border-[6px] border-black bg-white focus-within:bg-black group">
                                    <span className="flex items-center justify-center border-r-[6px] border-black px-6 text-2xl font-black text-black group-focus-within:border-white">
                                        +91
                                    </span>
                                    <input
                                        id="phone"
                                        type="text"
                                        inputMode="numeric"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="98765 43210"
                                        className="w-full bg-transparent px-6 py-6 text-2xl font-black text-black uppercase focus:outline-none group-focus-within:text-white"
                                    />
                                </div>
                                {errors.phone && <p className="mt-2 text-sm font-black uppercase text-red-600">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className={labelClass}>EMAIL (OPTIONAL)</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="YOU@EXAMPLE.COM"
                                    className={inputClass}
                                />
                                {errors.email && <p className="mt-2 text-sm font-black uppercase text-red-600">{errors.email}</p>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEP 3: SCHEDULE */}
                <section>
                    <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y-[6px] lg:divide-y-0 lg:divide-x-[6px] divide-black">
                        
                        <div className="lg:col-span-5 p-12 lg:p-24 bg-black text-white flex flex-col justify-center">
                            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-4">03. TIME & PLACE</h2>
                            <p className="text-xl font-bold uppercase opacity-80">WHEN AND WHERE DO YOU WANT TO RIDE?</p>
                        </div>
                        
                        <div className="lg:col-span-7 p-12 lg:p-24 bg-white">
                            
                            {/* Location */}
                            <div className="mb-16">
                                <label className={labelClass}>LOCATION PREFERENCE</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        ['home', 'AT HOME', 'WE BRING IT TO YOU'],
                                        ['dealer', 'AT DEALERSHIP', 'VISIT SHOWROOM'],
                                    ].map(([val, label, desc]) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setData('mode', val)}
                                            className={`p-8 text-left border-[6px] border-black transition-none group ${
                                                data.mode === val ? 'bg-black border-black' : 'bg-white border-black hover:bg-black'
                                            }`}
                                        >
                                            <p className={`text-3xl font-black uppercase tracking-tighter ${data.mode === val ? 'text-white' : 'text-black group-hover:text-white'}`}>{label}</p>
                                            <p className={`mt-2 text-sm font-bold uppercase tracking-widest ${data.mode === val ? 'text-white opacity-80' : 'text-black opacity-60 group-hover:text-white group-hover:opacity-80'}`}>{desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pincode (if home) */}
                            {data.mode === 'home' && (
                                <div className="mb-16 border-[6px] border-black p-8 bg-black">
                                    <label htmlFor="pincode" className="mb-4 block text-sm font-black tracking-widest text-white uppercase opacity-80">YOUR PINCODE</label>
                                    <input
                                        id="pincode"
                                        type="text"
                                        inputMode="numeric"
                                        value={data.pincode}
                                        onChange={(e) => setData('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="6-DIGIT PINCODE"
                                        className="w-full rounded-none border-[6px] border-white bg-black px-6 py-6 text-2xl font-black text-white uppercase transition-none focus:bg-white focus:text-black focus:outline-none placeholder:text-gray-600"
                                    />
                                    {errors.pincode && <p className="mt-4 text-sm font-black uppercase text-red-400">{errors.pincode}</p>}
                                </div>
                            )}

                            {/* Date */}
                            <div className="mb-16">
                                <label className={labelClass}>DATE</label>
                                <div className="flex gap-4 overflow-x-auto pb-6 border-b-[6px] border-black thin-scrollbar">
                                    {dateOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setData('preferred_date', opt.value)}
                                            className={`shrink-0 p-6 border-[6px] border-black text-center transition-none group ${
                                                data.preferred_date === opt.value ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'
                                            }`}
                                        >
                                            <p className="text-xl font-black uppercase">{opt.weekday}</p>
                                            <p className="mt-1 text-sm font-bold uppercase opacity-80">{opt.day}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.preferred_date && <p className="mt-2 text-sm font-black uppercase text-red-600">{errors.preferred_date}</p>}
                            </div>

                            {/* Time Slot */}
                            <div className="mb-16">
                                <label className={labelClass}>SLOT</label>
                                {availableTimeSlots.length === 0 ? (
                                    <div className="border-[6px] border-black p-8 text-center bg-white">
                                        <p className="text-2xl font-black uppercase">NO SLOTS TODAY.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        {availableTimeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setData('time_slot', slot)}
                                                className={`p-4 border-[6px] border-black text-xl font-black uppercase transition-none ${
                                                    data.time_slot === slot ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                                                }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {errors.time_slot && <p className="mt-2 text-sm font-black uppercase text-red-600">{errors.time_slot}</p>}
                            </div>

                        </div>
                    </div>
                </section>

                {/* SUBMIT */}
                <div className="border-t-[12px] border-black bg-white p-12 lg:p-24 flex flex-col items-center justify-center text-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black text-white px-12 lg:px-24 py-8 lg:py-12 text-3xl lg:text-5xl font-black tracking-widest uppercase border-[8px] border-transparent hover:border-black hover:bg-white hover:text-black transition-none disabled:opacity-50"
                    >
                        {processing ? 'PROCESSING...' : 'CONFIRM TEST RIDE'}
                    </button>
                    <p className="mt-8 text-sm font-bold uppercase tracking-widest opacity-60">
                        BY BOOKING, YOU AGREE TO OUR TERMS OF SERVICE.
                    </p>
                </div>
            </form>
        </PublicLayout>
    );
}
