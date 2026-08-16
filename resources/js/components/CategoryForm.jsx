import { useState } from "react";

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function CategoryForm({ data, setData, errors, existingImageUrl }) {
    const [imagePreview, setImagePreview] = useState(existingImageUrl ?? null);
    const [slugTouched, setSlugTouched] = useState(false);

    function handleNameChange(value) {
        setData('name', value);
        if (!slugTouched) {
            setData('slug', slugify(value));
        }
    }

    function handleImageChange(e) {
        const file = e.target.files?.[0];
        setData('image', file ?? null);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    }

    return (
        <div className="space-y-5">
            <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                    Category Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. NEXUS"
                    className="w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}

            </div>
            <div>
                <label htmlFor="slug" className="mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
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
                    placeholder="e.g. nexus"
                    className="w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                />
                <p className="mt-1 text-xs text-[#706f6c] dark:text-[#A1A09A]">
                    Website URL mein yeh dikhega. Khali chhodo toh naam se apne aap ban jayega.
                </p>
                {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
            </div>
            <div>
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                    Description <span className="text-[#a3a29e]">(optional)</span>
                </label>
                <textarea
                    id="description"
                    rows={3}
                    value={data.description ?? ''}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                    Category Image <span className="text-[#a3a29e]">(optional)</span>
                </label>
                <div className="flex items-center gap-4">
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-16 w-16 rounded-lg border border-[#e3e3e0] object-cover dark:border-[#3E3E3A]"
                        />
                    )}
                    <label
                        htmlFor="image"
                        className="cursor-pointer rounded-lg border border-dashed border-[#e3e3e0] px-4 py-2 text-sm text-[#706f6c] hover:border-emerald-500 hover:text-emerald-600 dark:border-[#3E3E3A] dark:text-[#A1A09A]"
                    >
                        {imagePreview ? 'Change image' : 'Upload image'}
                        <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                </div>
                <p className="mt-1 text-xs text-[#706f6c] dark:text-[#A1A09A]">JPG or PNG, max 2 MB.</p>
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-[#e3e3e0] text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-[#1b1b18] dark:text-[#EDEDEC]">
                    Show this category on the website
                </span>
            </label>

        </div>
    );


}