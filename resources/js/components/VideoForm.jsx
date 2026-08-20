const inputClass =
    'w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]';
const labelClass = 'mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]';

export default function VideoForm({ data, setData, errors, existingThumbnailUrl }) {
    function handleThumbnailChange(e) {
        const file = e.target.files?.[0] ?? null;
        setData('thumbnail', file);
    }

    return (
        <div className="space-y-5">
            <div>
                <label htmlFor="title" className={labelClass}>
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="e.g. Nexus EX+ First Ride Review"
                    className={inputClass}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="video_url" className={labelClass}>
                    Video Link
                </label>
                <input
                    id="video_url"
                    type="text"
                    value={data.video_url}
                    onChange={(e) => setData('video_url', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/..."
                    className={inputClass}
                />
                <p className="mt-1 text-xs text-[#706f6c] dark:text-[#A1A09A]">
                    YouTube ya Instagram ka video link paste karo.
                </p>
                {errors.video_url && <p className="mt-1 text-sm text-red-600">{errors.video_url}</p>}
            </div>

            <div>
                <label className={labelClass}>
                    Thumbnail <span className="text-[#a3a29e]">(optional)</span>
                </label>
                <div className="flex items-center gap-4">
                    {existingThumbnailUrl ? (
                        <img
                            src={existingThumbnailUrl}
                            alt="Thumbnail preview"
                            className="h-16 w-24 rounded-lg border border-[#e3e3e0] object-cover dark:border-[#3E3E3A]"
                        />
                    ) : (
                        <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-[#f4f4f3] text-[10px] text-[#a3a29e] dark:bg-[#1c1c1a]">
                            No image
                        </div>
                    )}
                    <label
                        htmlFor="thumbnail"
                        className="cursor-pointer rounded-lg border border-dashed border-[#e3e3e0] px-4 py-2 text-sm text-[#706f6c] hover:border-emerald-500 hover:text-emerald-600 dark:border-[#3E3E3A] dark:text-[#A1A09A]"
                    >
                        {existingThumbnailUrl ? 'Change thumbnail' : 'Upload thumbnail'}
                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleThumbnailChange}
                        />
                    </label>
                </div>
                <p className="mt-1 text-xs text-[#706f6c] dark:text-[#A1A09A]">JPG or PNG, max 2 MB.</p>
                {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
            </div>

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-[#e3e3e0] text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-[#1b1b18] dark:text-[#EDEDEC]">
                    Show this video on the website
                </span>
            </label>
        </div>
    );
}
