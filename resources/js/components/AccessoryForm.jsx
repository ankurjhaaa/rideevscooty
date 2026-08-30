const inputClass =
    'w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]';
const labelClass = 'mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]';

export default function AccessoryForm({ data, setData, errors, existingImageUrl }) {
    function handleImageChange(e) {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
    }

    return (
        <div className="space-y-5">
            <div>
                <label htmlFor="name" className={labelClass}>
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. Swing Arm Cover Set"
                    className={inputClass}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="description" className={labelClass}>
                    Description <span className="text-[#a3a29e]">(optional)</span>
                </label>
                <textarea
                    id="description"
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Short details about this accessory..."
                    className={inputClass}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
                <label className={labelClass}>
                    Image <span className="text-[#a3a29e]">(optional)</span>
                </label>
                <div className="flex items-center gap-4">
                    {existingImageUrl ? (
                        <img
                            src={existingImageUrl}
                            alt="Accessory preview"
                            className="h-16 w-16 rounded-lg border border-[#e3e3e0] object-cover dark:border-[#3E3E3A]"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f4f4f3] text-[10px] text-[#a3a29e] dark:bg-[#1c1c1a]">
                            No image
                        </div>
                    )}
                    <label
                        htmlFor="image"
                        className="cursor-pointer rounded-lg border border-dashed border-[#e3e3e0] px-4 py-2 text-sm text-[#706f6c] hover:border-emerald-500 hover:text-emerald-600 dark:border-[#3E3E3A] dark:text-[#A1A09A]"
                    >
                        {existingImageUrl ? 'Change image' : 'Upload image'}
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
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
                    Show this accessory on the website
                </span>
            </label>
        </div>
    );
}
