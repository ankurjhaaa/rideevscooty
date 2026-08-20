import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import ConfirmDialog from '../../../components/ConfirmDialog';
import Pagination from '../../../components/Pagination';
import FilterDrawer, { FilterToggleButton } from '../../../components/FilterDrawer';

const inputClass =
    'w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]';
const labelClass = 'mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]';

const PLATFORM_LABELS = {
    youtube: 'YouTube',
    instagram: 'Instagram',
};

export default function Index({ videos, filters }) {
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [search, setSearch] = useState(filters?.search ?? '');
    const [status, setStatus] = useState(filters?.status ?? '');

    const hasActiveFilters = Boolean(filters?.search || filters?.status);

    function confirmDelete() {
        if (!deleteTarget) return;
        setDeleting(true);
        router.delete(`/admin/videos/${deleteTarget.id}`, {
            onFinish: () => {
                setDeleting(false);
                setDeleteTarget(null);
            },
        });
    }

    function applyFilters() {
        router.get(
            '/admin/videos',
            { search: search || undefined, status: status || undefined },
            { preserveState: true, replace: true },
        );
        setFilterOpen(false);
    }

    function clearFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/videos', {}, { preserveState: true, replace: true });
        setFilterOpen(false);
    }

    return (
        <AdminLayout>
            <Head title="Videos" />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Videos</h1>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        YouTube/Instagram video cards manage karo.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <FilterToggleButton onClick={() => setFilterOpen((open) => !open)} active={hasActiveFilters} />
                    <Link
                        href="/admin/videos/create"
                        className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium whitespace-nowrap text-white hover:bg-emerald-700"
                    >
                        + Add Video
                    </Link>
                </div>
            </div>

            <FilterDrawer
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                onApply={applyFilters}
                onClear={clearFilters}
            >
                <div className="w-full sm:w-56">
                    <label htmlFor="search" className={labelClass}>
                        Search
                    </label>
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Video title..."
                        className={inputClass}
                    />
                </div>
                <div className="w-full sm:w-48">
                    <label htmlFor="status" className={labelClass}>
                        Status
                    </label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </FilterDrawer>

            {videos.data.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#e3e3e0] bg-white p-10 text-center dark:border-[#3E3E3A] dark:bg-[#161615]">
                    {hasActiveFilters ? (
                        <>
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Filter se koi video nahi mila.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-3 cursor-pointer text-sm font-medium text-emerald-600 hover:underline"
                            >
                                Filters clear karo
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Abhi koi video nahi hai.</p>
                            <Link
                                href="/admin/videos/create"
                                className="mt-3 inline-block cursor-pointer text-sm font-medium text-emerald-600 hover:underline"
                            >
                                Pehla video add karo →
                            </Link>
                        </>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-xl border border-[#e3e3e0] bg-white md:block dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-[#e3e3e0] bg-[#FAFAF9] text-xs text-[#706f6c] uppercase dark:border-[#3E3E3A] dark:bg-[#1c1c1a] dark:text-[#A1A09A]">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Video</th>
                                    <th className="px-5 py-3 font-medium">Platform</th>
                                    <th className="px-5 py-3 font-medium">Status</th>
                                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e3e3e0] dark:divide-[#3E3E3A]">
                                {videos.data.map((video) => (
                                    <tr key={video.id}>
                                        <td className="flex items-center gap-3 px-5 py-3">
                                            {video.thumbnail_url ? (
                                                <img
                                                    src={video.thumbnail_url}
                                                    alt={video.title}
                                                    className="h-10 w-16 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-[#f4f4f3] text-[10px] text-[#a3a29e] dark:bg-[#1c1c1a]">
                                                    No img
                                                </div>
                                            )}
                                            <span className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                {video.title}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-[#706f6c] dark:text-[#A1A09A]">
                                            {PLATFORM_LABELS[video.platform] ?? '—'}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    video.is_active
                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                        : 'bg-[#f4f4f3] text-[#706f6c] dark:bg-[#1c1c1a] dark:text-[#A1A09A]'
                                                }`}
                                            >
                                                {video.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <Link
                                                href={`/admin/videos/${video.id}/edit`}
                                                className="cursor-pointer text-sm font-medium text-emerald-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(video)}
                                                className="ml-4 cursor-pointer text-sm font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="grid gap-3 md:hidden">
                        {videos.data.map((video) => (
                            <div
                                key={video.id}
                                className="rounded-xl border border-[#e3e3e0] bg-white p-4 dark:border-[#3E3E3A] dark:bg-[#161615]"
                            >
                                <div className="flex items-center gap-3">
                                    {video.thumbnail_url ? (
                                        <img
                                            src={video.thumbnail_url}
                                            alt={video.title}
                                            className="h-12 w-20 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-[#f4f4f3] text-[10px] text-[#a3a29e] dark:bg-[#1c1c1a]">
                                            No img
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <p className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">{video.title}</p>
                                        <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                            {PLATFORM_LABELS[video.platform] ?? '—'}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                            video.is_active
                                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                : 'bg-[#f4f4f3] text-[#706f6c] dark:bg-[#1c1c1a] dark:text-[#A1A09A]'
                                        }`}
                                    >
                                        {video.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="mt-3 flex gap-3 border-t border-[#e3e3e0] pt-3 dark:border-[#3E3E3A]">
                                    <Link
                                        href={`/admin/videos/${video.id}/edit`}
                                        className="flex-1 cursor-pointer rounded-lg border border-[#e3e3e0] py-2 text-center text-sm font-medium text-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC]"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => setDeleteTarget(video)}
                                        className="flex-1 cursor-pointer rounded-lg border border-red-200 py-2 text-center text-sm font-medium text-red-600 dark:border-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination links={videos.links} />
                </>
            )}

            <ConfirmDialog
                open={!!deleteTarget}
                title="Delete video?"
                description={`"${deleteTarget?.title}" ko delete karne se ye permanently hat jayega. Ye action wapas nahi ho sakta.`}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
                processing={deleting}
            />
        </AdminLayout>
    );
}
