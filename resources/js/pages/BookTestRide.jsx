import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import PublicLayout from '../components/PublicLayout';

const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 transition-all hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm';
const labelClass = 'mb-1.5 block text-sm font-bold text-gray-700';
const sectionLabelClass = 'mb-4 text-xs font-extrabold tracking-widest text-emerald-600 uppercase';

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

function todayValue() {
    return new Date().toISOString().slice(0, 10);
}

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
    const selectedColor = colors.find((color) => color.id === data.color_id);

    const availableTimeSlots = timeSlots.filter((slot) => !isSlotPast(slot, data.preferred_date));

    useEffect(() => {
        if (data.time_slot && isSlotPast(data.time_slot, data.preferred_date)) {
            setData('time_slot', '');
        }
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
            onSuccess: () => reset(),
        });
    }

    if (categories.length === 0) {
        return (
            <PublicLayout>
                <Head title="Book a Test Ride" />
                <div className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                        <svg className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Test Rides Unavailable</h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Our scooter lineup is currently being updated. Please check back shortly to book your test ride.
                    </p>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Book a Test Ride" />

            {/* Header banner */}
            <div className="bg-gray-900 px-4 py-16 sm:px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute -top-[50%] -left-[10%] h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-3xl" />
                </div>
                <div className="relative z-10 mx-auto max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Book a Test Ride</h1>
                    <p className="mt-4 text-lg text-gray-400">
                        Experience the thrill of electric. Pick your scooter, choose a slot, and our team will bring the ride to you.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 relative -mt-8">
                <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[400px_1fr]">
                    {/* Left: product preview (sticky) */}
                    <div className="lg:sticky lg:top-32 lg:h-fit">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 ring-1 ring-gray-100 p-6">
                            <div className="relative aspect-square flex items-center justify-center rounded-2xl bg-gray-50 mb-6">
                                {image ? (
                                    <img
                                        src={image.image_url}
                                        alt={selectedProduct?.name}
                                        className="h-full w-full object-contain p-6 mix-blend-multiply transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <svg className="mb-2 h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Preview Unavailable</span>
                                    </div>
                                )}
                            </div>
                            
                            {selectedProduct && (
                                <div className="text-center">
                                    <p className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase mb-2">
                                        {categories.find(c => c.id === activeCategoryId)?.name}
                                    </p>
                                    <p className="text-2xl font-extrabold text-gray-900 mb-1">
                                        {selectedProduct.name}
                                    </p>
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                                        ₹{Number(selectedProduct.price).toLocaleString('en-IN')}
                                    </div>
                                    {selectedProduct.emi_info && (
                                        <p className="mt-4 text-sm font-medium text-gray-500 border-t border-gray-100 pt-4">
                                            {selectedProduct.emi_info}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-xl shadow-gray-200/50 ring-1 ring-gray-100">
                        <div className="space-y-12">
                            
                            {/* Scooter selection */}
                            <section>
                                <div className="mb-6 flex items-center gap-4 border-b border-gray-100 pb-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">1</div>
                                    <h2 className="text-xl font-extrabold text-gray-900">Select Model</h2>
                                </div>
                                
                                <p className={sectionLabelClass}>Category</p>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => selectCategory(category.id)}
                                            className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 shadow-sm ${
                                                category.id === activeCategoryId
                                                    ? 'bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2'
                                                    : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>

                                {products.length > 0 && (
                                    <div className="mt-8">
                                        <p className={sectionLabelClass}>Scooter Model</p>
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                            {products.map((product) => (
                                                <button
                                                    key={product.id}
                                                    type="button"
                                                    onClick={() => selectProduct(product.id)}
                                                    className={`cursor-pointer rounded-2xl p-4 text-center transition-all duration-200 ${
                                                        product.id === data.product_id
                                                            ? 'bg-emerald-50 ring-2 ring-emerald-500'
                                                            : 'bg-white ring-1 ring-gray-200 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <span className={`block text-sm font-bold ${product.id === data.product_id ? 'text-emerald-700' : 'text-gray-900'}`}>
                                                        {product.name}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {errors.product_id && <p className="mt-2 text-sm font-medium text-red-500">{errors.product_id}</p>}

                                {/* Color */}
                                {colors.length > 0 && (
                                    <div className="mt-8">
                                        <p className={sectionLabelClass}>Preferred Color</p>
                                        <div className="flex flex-wrap items-center gap-4">
                                            {colors.map((color) => (
                                                <button
                                                    key={color.id}
                                                    type="button"
                                                    onClick={() => setData('color_id', color.id)}
                                                    title={color.name}
                                                    className={`group relative h-12 w-12 cursor-pointer rounded-full p-1 transition-all duration-200 ${
                                                        data.color_id === color.id ? 'ring-2 ring-emerald-500 ring-offset-2' : 'ring-1 ring-transparent hover:ring-gray-300 hover:ring-offset-1'
                                                    }`}
                                                >
                                                    <span
                                                        className="block h-full w-full rounded-full shadow-inner"
                                                        style={{ backgroundColor: color.hex_code ?? '#ccc' }}
                                                    />
                                                </button>
                                            ))}
                                            {selectedColor && (
                                                <span className="ml-2 text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                                    {selectedColor.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Contact details */}
                            <section>
                                <div className="mb-6 flex items-center gap-4 border-b border-gray-100 pb-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">2</div>
                                    <h2 className="text-xl font-extrabold text-gray-900">Your Details</h2>
                                </div>
                                
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="full_name" className={labelClass}>
                                            Full Name
                                        </label>
                                        <input
                                            id="full_name"
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            placeholder="John Doe"
                                            className={inputClass}
                                        />
                                        {errors.full_name && (
                                            <p className="mt-1.5 text-sm font-medium text-red-500">{errors.full_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className={labelClass}>
                                            Phone Number
                                        </label>
                                        <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 hover:border-gray-300">
                                            <span className="flex items-center justify-center border-r border-gray-200 bg-gray-50 px-4 text-sm font-bold text-gray-500">
                                                +91
                                            </span>
                                            <input
                                                id="phone"
                                                type="text"
                                                inputMode="numeric"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData('phone', e.target.value.replace(/\D/g, '').slice(0, 10))
                                                }
                                                placeholder="98765 43210"
                                                className="w-full bg-transparent px-4 py-3.5 text-sm font-medium text-gray-900 focus:outline-none"
                                            />
                                            {data.phone.length > 0 && (
                                                <span className="flex items-center px-4 text-xs font-bold text-gray-400">
                                                    {data.phone.length}/10
                                                </span>
                                            )}
                                        </div>
                                        {errors.phone && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className={labelClass}>
                                            Email <span className="text-gray-400 font-normal">(optional)</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="you@example.com"
                                            className={inputClass}
                                        />
                                        {errors.email && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="pincode" className={labelClass}>
                                            Pincode
                                        </label>
                                        <input
                                            id="pincode"
                                            type="text"
                                            inputMode="numeric"
                                            value={data.pincode}
                                            onChange={(e) =>
                                                setData('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))
                                            }
                                            placeholder="6-digit Pincode"
                                            className={inputClass}
                                        />
                                        {errors.pincode && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.pincode}</p>}
                                    </div>
                                </div>
                            </section>

                            {/* Scheduling */}
                            <section>
                                <div className="mb-6 flex items-center gap-4 border-b border-gray-100 pb-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">3</div>
                                    <h2 className="text-xl font-extrabold text-gray-900">Schedule Ride</h2>
                                </div>

                                {/* Mode */}
                                <div>
                                    <p className={sectionLabelClass}>Test Ride Location</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            ['home', 'At My Home', 'We bring the scooter to you'],
                                            ['dealer', 'At Dealership', 'Visit our nearest showroom'],
                                        ].map(([value, label, desc]) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => setData('mode', value)}
                                                className={`cursor-pointer rounded-2xl p-4 text-left transition-all duration-200 ${
                                                    data.mode === value
                                                        ? 'bg-emerald-50 ring-2 ring-emerald-500'
                                                        : 'bg-white ring-1 ring-gray-200 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 mb-1">
                                                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${data.mode === value ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}>
                                                        {data.mode === value && <div className="h-2 w-2 rounded-full bg-white" />}
                                                    </div>
                                                    <p className={`text-base font-bold ${data.mode === value ? 'text-emerald-900' : 'text-gray-900'}`}>
                                                        {label}
                                                    </p>
                                                </div>
                                                <p className="ml-8 text-xs font-medium text-gray-500">{desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="mt-8">
                                    <p className={sectionLabelClass}>Preferred Date</p>
                                    <div className="thin-scrollbar flex gap-3 overflow-x-auto pb-4 pt-1">
                                        {dateOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setData('preferred_date', option.value)}
                                                className={`shrink-0 cursor-pointer rounded-2xl px-5 py-3 text-center transition-all duration-200 shadow-sm ${
                                                    data.preferred_date === option.value
                                                        ? 'bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2'
                                                        : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
                                                }`}
                                            >
                                                <p className="text-sm font-extrabold uppercase tracking-wide">{option.weekday}</p>
                                                <p className={`mt-1 text-xs font-medium ${data.preferred_date === option.value ? 'text-gray-300' : 'text-gray-500'}`}>{option.day}</p>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.preferred_date && (
                                        <p className="mt-1 text-sm font-medium text-red-500">{errors.preferred_date}</p>
                                    )}
                                </div>

                                {/* Time slot */}
                                <div className="mt-6">
                                    <p className={sectionLabelClass}>Time Slot</p>
                                    {availableTimeSlots.length === 0 ? (
                                        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                                            <p className="text-sm font-medium text-gray-500">
                                                No slots available for this date. Please select another date.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {availableTimeSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setData('time_slot', slot)}
                                                    className={`cursor-pointer rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                                                        data.time_slot === slot
                                                            ? 'bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500'
                                                            : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {errors.time_slot && <p className="mt-2 text-sm font-medium text-red-500">{errors.time_slot}</p>}
                                </div>

                                {/* Message */}
                                <div className="mt-8">
                                    <label htmlFor="message" className={labelClass}>
                                        Additional Notes <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={3}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Any specific requirements for the test ride?"
                                        className={inputClass}
                                    />
                                </div>
                            </section>

                            <div className="border-t border-gray-100 pt-8 mt-12">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full overflow-hidden rounded-2xl bg-gray-900 py-4.5 text-base font-extrabold tracking-wide text-white uppercase shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_-6px_rgba(0,0,0,0.4)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    <span className="relative z-10">{processing ? 'Processing...' : 'Confirm Test Ride Booking'}</span>
                                    <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                                </button>
                                <p className="mt-4 text-center text-xs font-medium text-gray-500">
                                    By booking, you agree to our terms of service. Our executive will call you to confirm.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
