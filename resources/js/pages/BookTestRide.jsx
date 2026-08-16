import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import PublicLayout from '../components/PublicLayout';

const inputClass =
    'w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2.5 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]';
const labelClass = 'mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]';
const sectionLabelClass = 'mb-3 text-xs font-bold tracking-wide text-[#1b1b18] uppercase dark:text-[#EDEDEC]';

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
                <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
                    <h1 className="text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">Book a Test Ride</h1>
                    <p className="mt-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Scooters coming soon. Please check back shortly.
                    </p>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Book a Test Ride" />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">Book a Test Ride</h1>
                    <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Pick your scooter, choose a slot, and our team will confirm your ride.
                    </p>
                </div>

                <form onSubmit={submit} className="grid gap-10 lg:grid-cols-2">
                    {/* Left: product preview */}
                    <div className="lg:sticky lg:top-24 lg:h-fit">
                        <div className="flex aspect-square items-center justify-center rounded-2xl border border-[#e3e3e0] bg-[#f4f4f3] dark:border-[#3E3E3A] dark:bg-[#1c1c1a]">
                            {image ? (
                                <img
                                    src={image.image_url}
                                    alt={selectedProduct?.name}
                                    className="h-full w-full object-contain p-8"
                                />
                            ) : (
                                <p className="text-sm text-[#a3a29e]">No image available</p>
                            )}
                        </div>
                        {selectedProduct && (
                            <div className="mt-4 rounded-xl border border-[#e3e3e0] bg-white p-4 dark:border-[#3E3E3A] dark:bg-[#161615]">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        {selectedProduct.name}
                                    </p>
                                    <p className="text-base font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        ₹{Number(selectedProduct.price).toLocaleString('en-IN')}
                                    </p>
                                </div>
                                {selectedProduct.emi_info && (
                                    <p className="mt-1 text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                        {selectedProduct.emi_info}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: form */}
                    <div className="space-y-8">
                        {/* Contact details */}
                        <div>
                            <p className={sectionLabelClass}>Give us your details</p>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="phone" className={labelClass}>
                                        Phone Number
                                    </label>
                                    <div className="flex items-center overflow-hidden rounded-lg border border-[#e3e3e0] bg-white focus-within:border-emerald-500 dark:border-[#3E3E3A] dark:bg-[#0a0a0a]">
                                        <span className="border-r border-[#e3e3e0] px-3 py-2.5 text-sm text-[#706f6c] dark:border-[#3E3E3A] dark:text-[#A1A09A]">
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
                                            placeholder="Phone Number"
                                            className="w-full px-3 py-2.5 text-sm text-[#1b1b18] focus:outline-none dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                                        />
                                        <span className="px-3 text-xs whitespace-nowrap text-[#a3a29e]">
                                            {data.phone.length}/10 digits
                                        </span>
                                    </div>
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label htmlFor="full_name" className={labelClass}>
                                        Full Name
                                    </label>
                                    <input
                                        id="full_name"
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        placeholder="Full Name"
                                        className={inputClass}
                                    />
                                    {errors.full_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClass}>
                                        Email <span className="text-[#a3a29e]">(optional)</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                                        placeholder="Enter Pincode"
                                        className={inputClass}
                                    />
                                    {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Scooter selection */}
                        <div>
                            <p className={sectionLabelClass}>Choose your scooter</p>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => selectCategory(category.id)}
                                        className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-bold uppercase transition-colors ${
                                            category.id === activeCategoryId
                                                ? 'border-[#1b1b18] bg-[#1b1b18] text-white dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18]'
                                                : 'border-[#e3e3e0] text-[#1b1b18] hover:border-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC]'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {products.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {products.map((product) => (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() => selectProduct(product.id)}
                                            className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                                                product.id === data.product_id
                                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'border-[#e3e3e0] text-[#1b1b18] hover:border-emerald-500 dark:border-[#3E3E3A] dark:text-[#EDEDEC]'
                                            }`}
                                        >
                                            {product.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {errors.product_id && <p className="mt-2 text-sm text-red-600">{errors.product_id}</p>}
                        </div>

                        {/* Color */}
                        {colors.length > 0 && (
                            <div>
                                <p className={sectionLabelClass}>Preferred Color</p>
                                <div className="flex flex-wrap items-center gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color.id}
                                            type="button"
                                            onClick={() => setData('color_id', color.id)}
                                            title={color.name}
                                            className={`h-9 w-9 cursor-pointer rounded-full border-2 p-0.5 ${
                                                data.color_id === color.id ? 'border-emerald-600' : 'border-transparent'
                                            }`}
                                        >
                                            <span
                                                className="block h-full w-full rounded-full border border-black/10"
                                                style={{ backgroundColor: color.hex_code ?? '#ccc' }}
                                            />
                                        </button>
                                    ))}
                                    {selectedColor && (
                                        <span className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                            {selectedColor.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Mode */}
                        <div>
                            <p className={sectionLabelClass}>Mode of Test Ride</p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    ['home', 'Home'],
                                    ['dealer', 'Dealer'],
                                ].map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setData('mode', value)}
                                        className={`cursor-pointer rounded-lg border py-2.5 text-sm font-bold uppercase transition-colors ${
                                            data.mode === value
                                                ? 'border-[#1b1b18] bg-[#1b1b18] text-white dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18]'
                                                : 'border-[#e3e3e0] text-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC]'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <p className={sectionLabelClass}>Preferred Date</p>
                            <div className="thin-scrollbar flex gap-2 overflow-x-auto pb-2">
                                {dateOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setData('preferred_date', option.value)}
                                        className={`shrink-0 cursor-pointer rounded-lg border px-4 py-2 text-center text-sm transition-colors ${
                                            data.preferred_date === option.value
                                                ? 'border-[#1b1b18] bg-[#1b1b18] text-white dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18]'
                                                : 'border-[#e3e3e0] text-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC]'
                                        }`}
                                    >
                                        <p className="font-semibold">{option.weekday}</p>
                                        <p className="text-xs opacity-80">{option.day}</p>
                                    </button>
                                ))}
                            </div>
                            {errors.preferred_date && (
                                <p className="mt-2 text-sm text-red-600">{errors.preferred_date}</p>
                            )}
                        </div>

                        {/* Time slot */}
                        <div>
                            <p className={sectionLabelClass}>Time Slot</p>
                            {availableTimeSlots.length === 0 ? (
                                <p className="text-sm text-[#a3a29e]">
                                    No slots left for today. Please choose another date.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {availableTimeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setData('time_slot', slot)}
                                            className={`cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                                                data.time_slot === slot
                                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'border-[#e3e3e0] text-[#1b1b18] hover:border-emerald-500 dark:border-[#3E3E3A] dark:text-[#EDEDEC]'
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {errors.time_slot && <p className="mt-2 text-sm text-red-600">{errors.time_slot}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className={labelClass}>
                                Anything else we should know? <span className="text-[#a3a29e]">(optional)</span>
                            </label>
                            <textarea
                                id="message"
                                rows={3}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full cursor-pointer rounded-lg bg-emerald-600 py-3.5 text-sm font-bold tracking-wide text-white uppercase hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Booking...' : 'Confirm Test Ride'}
                        </button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
