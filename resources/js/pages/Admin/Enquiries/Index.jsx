import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import Pagination from '../../../components/Pagination';
import FilterDrawer, { FilterToggleButton } from '../../../components/FilterDrawer';

const inputClass =
    'w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]';
const labelClass = 'mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]';

const STATUS_OPTIONS = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_STYLES = {
    new: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    contacted: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    cancelled: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

const MODE_LABELS = {
    home: 'Home Visit',
    dealer: 'At Dealer',
};

function formatDate(value) {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function StatusSelect({ enquiry }) {
    function handleChange(e) {
        router.patch(
            `/admin/enquiries/${enquiry.id}/status`,
            { status: e.target.value },
            { preserveScroll: true },
        );
    }

    return (
        <select
            value={enquiry.status}
            onChange={handleChange}
            className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none ${STATUS_STYLES[enquiry.status]}`}
        >
            {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default function Index({ enquiries, filters }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const [search, setSearch] = useState(filters?.search ?? '');
    const [status, setStatus] = useState(filters?.status ?? '');

    const hasActiveFilters = Boolean(filters?.search || filters?.status);

    function applyFilters() {
        router.get(
            '/admin/enquiries',
            { search: search || undefined, status: status || undefined },
            { preserveState: true, replace: true },
        );
        setFilterOpen(false);
    }

    function clearFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/enquiries', {}, { preserveState: true, replace: true });
        setFilterOpen(false);
    }

    return (
        <AdminLayout>
            <Head title="Enquiries" />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Enquiries</h1>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Test ride enquiries aur leads manage karo.
                    </p>
                </div>
                <FilterToggleButton onClick={() => setFilterOpen((open) => !open)} active={hasActiveFilters} />
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
                        placeholder="Name or phone..."
                        className={inputClass}
                    />
                </div>
                <div className="w-full sm:w-48">
                    <label htmlFor="status" className={labelClass}>
                        Status
                    </label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                        <option value="">All</option>
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </FilterDrawer>

            {enquiries.data.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#e3e3e0] bg-white p-10 text-center dark:border-[#3E3E3A] dark:bg-[#161615]">
                    {hasActiveFilters ? (
                        <>
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Filter se koi enquiry nahi mili.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="mt-3 cursor-pointer text-sm font-medium text-emerald-600 hover:underline"
                            >
                                Filters clear karo
                            </button>
                        </>
                    ) : (
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            Abhi koi enquiry nahi hai. Jab customer test ride book karega, wo yahan dikhegi.
                        </p>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-xl border border-[#e3e3e0] bg-white md:block dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-[#e3e3e0] bg-[#FAFAF9] text-xs text-[#706f6c] uppercase dark:border-[#3E3E3A] dark:bg-[#1c1c1a] dark:text-[#A1A09A]">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Customer</th>
                                    <th className="px-5 py-3 font-medium">Product</th>
                                    <th className="px-5 py-3 font-medium">Visit Details</th>
                                    <th className="px-5 py-3 font-medium">Status</th>
                                    <th className="px-5 py-3 font-medium">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e3e3e0] dark:divide-[#3E3E3A]">
                                {enquiries.data.map((enquiry) => (
                                    <tr key={enquiry.id}>
                                        <td className="px-5 py-3">
                                            <p className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                {enquiry.full_name}
                                            </p>
                                            <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                                {enquiry.phone}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3 text-[#1b1b18] dark:text-[#EDEDEC]">
                                            {enquiry.product_name}
                                            {enquiry.color_name && (
                                                <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                                    {enquiry.color_name}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-[#706f6c] dark:text-[#A1A09A]">
                                            <p>{MODE_LABELS[enquiry.mode] ?? enquiry.mode}</p>
                                            <p className="text-xs">
                                                {formatDate(enquiry.preferred_date)} · {enquiry.time_slot}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3">
                                            <StatusSelect enquiry={enquiry} />
                                        </td>
                                        <td className="px-5 py-3 text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                            {formatDate(enquiry.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="grid gap-3 md:hidden">
                        {enquiries.data.map((enquiry) => (
                            <div
                                key={enquiry.id}
                                className="rounded-xl border border-[#e3e3e0] bg-white p-4 dark:border-[#3E3E3A] dark:bg-[#161615]"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                            {enquiry.full_name}
                                        </p>
                                        <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">{enquiry.phone}</p>
                                    </div>
                                    <StatusSelect enquiry={enquiry} />
                                </div>

                                <div className="mt-3 space-y-1 border-t border-[#e3e3e0] pt-3 text-sm dark:border-[#3E3E3A]">
                                    <p className="text-[#1b1b18] dark:text-[#EDEDEC]">
                                        {enquiry.product_name}
                                        {enquiry.color_name && ` · ${enquiry.color_name}`}
                                    </p>
                                    <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                        {MODE_LABELS[enquiry.mode] ?? enquiry.mode} · {formatDate(enquiry.preferred_date)} ·{' '}
                                        {enquiry.time_slot}
                                    </p>
                                    <p className="text-xs text-[#a3a29e]">
                                        Submitted {formatDate(enquiry.created_at)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination links={enquiries.links} />
                </>
            )}
        </AdminLayout>
    );
}
