import { useState } from "react";

const IMAGE_TYPES = [
    { value: 'main', label: 'Main' },
    { value: 'side', label: 'Side' },
    { value: 'front', label: 'Front' },
    { value: 'back', label: 'Back' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'other', label: 'Other' },
];

function slugify(value){
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
const inputClass =
    'w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]';
const labelClass = 'mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]';

export default function ProductForm({
     data,
    setData,
    errors,
    categories,
    existingImages = [],
    existingColors = [],
    onRemoveExistingImage,
    onRemoveExistingColor,
}){
    const [slugTouched, setSlugTouched] = useState(false);

    function handleNameChange(value) {
        setData('name', value);
        if (!slugTouched) {
            setData('slug', slugify(value));
        }
    }

     function addImageRow() {
        setData('images', [...data.images, { file: null, type: 'main', preview: null }]);
    }

     function updateImageRow(index, key, value) {
        const updated = [...data.images];
        updated[index] = { ...updated[index], [key]: value };
        setData('images', updated);
    }


      function handleImageFile(index, file) {
        const updated = [...data.images];
        updated[index] = {
            ...updated[index],
            file,
            preview: file ? URL.createObjectURL(file) : null,
        };
        setData('images', updated);
    }

    function removeImageRow(index) {
        setData('images', data.images.filter((_, i) => i !== index));
    }

        function addColorRow() {
        setData('colors', [...data.colors, { name: '', hex_code: '#1b1b18', image: null, preview: null }]);
    }


     function updateColorRow(index, key, value) {
        const updated = [...data.colors];
        updated[index] = { ...updated[index], [key]: value };
        setData('colors', updated);
    }


    function handleColorImageFile(index, file) {
        const updated = [...data.colors];
        updated[index] = {
            ...updated[index],
            image: file,
            preview: file ? URL.createObjectURL(file) : null,
        };
        setData('colors', updated);
    }

        function removeColorRow(index) {
        setData('colors', data.colors.filter((_, i) => i !== index));
    }

        return (
        <div className="space-y-8">
            {/* Basic details */}
            <div className="space-y-5">
                <div>
                    <label htmlFor="category_id" className={labelClass}>
                        Category
                    </label>
                    <select
                        id="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className={labelClass}>
                            Product Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="e.g. Nexus EX+"
                            className={inputClass}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="price" className={labelClass}>
                            Price (₹)
                        </label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="e.g. 99999"
                            className={inputClass}
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="slug" className={labelClass}>
                        URL Slug
                    </label>
                    <input
                        id="slug"
                        type="text"
                        value={data.slug}
                        onChange={(e) => {
                            setSlugTouched(true);
                            setData('slug', e.target.value);
                        }}
                        placeholder="e.g. nexus-ex-plus"
                        className={inputClass}
                    />
                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                </div>

                <div>
                    <label htmlFor="short_description" className={labelClass}>
                        Short Description <span className="text-[#a3a29e]">(listing card ke liye)</span>
                    </label>
                    <input
                        id="short_description"
                        type="text"
                        value={data.short_description}
                        onChange={(e) => setData('short_description', e.target.value)}
                        className={inputClass}
                    />
                    {errors.short_description && <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>}
                </div>

                <div>
                    <label htmlFor="description" className={labelClass}>
                        Full Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={inputClass}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
            </div>

            {/* Specs */}
            <div>
                <h3 className="mb-3 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Specifications</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                    {[
                        ['motor_power', 'Motor Power', 'e.g. 1500W BLDC'],
                        ['top_speed', 'Top Speed', 'e.g. 65 km/h'],
                        ['range', 'Range', 'e.g. 120 km'],
                        ['battery_capacity', 'Battery Capacity', 'e.g. 2.5 kWh'],
                        ['charging_time', 'Charging Time', 'e.g. 4-5 hrs'],
                        ['emi_info', 'EMI Info', 'e.g. Starting ₹1999/mo'],
                    ].map(([field, label, placeholder]) => (
                        <div key={field}>
                            <label htmlFor={field} className={labelClass}>
                                {label}
                            </label>
                            <input
                                id={field}
                                type="text"
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                                placeholder={placeholder}
                                className={inputClass}
                            />
                            {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded border-[#e3e3e0] text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-[#1b1b18] dark:text-[#EDEDEC]">Show on website</span>
                </label>
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={data.is_featured}
                        onChange={(e) => setData('is_featured', e.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded border-[#e3e3e0] text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-[#1b1b18] dark:text-[#EDEDEC]">Featured on homepage</span>
                </label>
            </div>

            {/* Images */}
            <div>
                <h3 className="mb-3 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Images</h3>

                {existingImages.length > 0 && (
                    <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {existingImages.map((image) => (
                            <div key={image.id} className="relative">
                                <img
                                    src={image.image_url}
                                    alt={image.type ?? 'Product image'}
                                    className="h-24 w-full rounded-lg border border-[#e3e3e0] object-cover dark:border-[#3E3E3A]"
                                />
                                <button
                                    type="button"
                                    onClick={() => onRemoveExistingImage(image)}
                                    className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-red-600 px-1.5 py-0.5 text-xs text-white hover:bg-red-700"
                                >
                                    ✕
                                </button>
                                {image.type && (
                                    <span className="mt-1 block text-center text-xs text-[#706f6c] dark:text-[#A1A09A] capitalize">
                                        {image.type}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-3">
                    {data.images.map((row, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap items-center gap-3 rounded-lg border border-[#e3e3e0] p-3 dark:border-[#3E3E3A]"
                        >
                            {row.preview && (
                                <img src={row.preview} alt="Preview" className="h-12 w-12 rounded-lg object-cover" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageFile(index, e.target.files?.[0] ?? null)}
                                className="flex-1 text-sm text-[#706f6c] dark:text-[#A1A09A]"
                            />
                            <select
                                value={row.type}
                                onChange={(e) => updateImageRow(index, 'type', e.target.value)}
                                className="rounded-lg border border-[#e3e3e0] bg-white px-2 py-1.5 text-sm dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                            >
                                {IMAGE_TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => removeImageRow(index)}
                                className="cursor-pointer text-sm font-medium text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                            {errors[`images.${index}.file`] && (
                                <p className="w-full text-sm text-red-600">{errors[`images.${index}.file`]}</p>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addImageRow}
                        className="cursor-pointer text-sm font-medium text-emerald-600 hover:underline"
                    >
                        + Add Image
                    </button>
                </div>
            </div>

            {/* Colors */}
            <div>
                <h3 className="mb-3 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Colors</h3>

                {existingColors.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-3">
                        {existingColors.map((color) => (
                            <div
                                key={color.id}
                                className="flex items-center gap-2 rounded-lg border border-[#e3e3e0] px-3 py-2 dark:border-[#3E3E3A]"
                            >
                                <span
                                    className="h-5 w-5 rounded-full border border-[#e3e3e0] dark:border-[#3E3E3A]"
                                    style={{ backgroundColor: color.hex_code ?? '#ccc' }}
                                />
                                <span className="text-sm text-[#1b1b18] dark:text-[#EDEDEC]">{color.name}</span>
                                <button
                                    type="button"
                                    onClick={() => onRemoveExistingColor(color)}
                                    className="cursor-pointer text-xs font-medium text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-3">
                    {data.colors.map((row, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap items-center gap-3 rounded-lg border border-[#e3e3e0] p-3 dark:border-[#3E3E3A]"
                        >
                            <input
                                type="text"
                                value={row.name}
                                onChange={(e) => updateColorRow(index, 'name', e.target.value)}
                                placeholder="Color name e.g. Carbon Knight"
                                className="flex-1 rounded-lg border border-[#e3e3e0] bg-white px-3 py-1.5 text-sm dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                            />
                            <input
                                type="color"
                                value={row.hex_code}
                                onChange={(e) => updateColorRow(index, 'hex_code', e.target.value)}
                                className="h-9 w-12 cursor-pointer rounded border border-[#e3e3e0] dark:border-[#3E3E3A]"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleColorImageFile(index, e.target.files?.[0] ?? null)}
                                className="text-sm text-[#706f6c] dark:text-[#A1A09A]"
                            />
                            <button
                                type="button"
                                onClick={() => removeColorRow(index)}
                                className="cursor-pointer text-sm font-medium text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                            {errors[`colors.${index}.name`] && (
                                <p className="w-full text-sm text-red-600">{errors[`colors.${index}.name`]}</p>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addColorRow}
                        className="cursor-pointer text-sm font-medium text-emerald-600 hover:underline"
                    >
                        + Add Color
                    </button>
                </div>
            </div>
        </div>
    );




}