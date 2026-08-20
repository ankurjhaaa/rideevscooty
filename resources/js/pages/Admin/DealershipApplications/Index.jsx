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

function formatDate(value) {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function StatusSelect({ application }) {
    function handleChange(e) {
        router.patch(
            `/admin/dealership-applications/${application.id}/status`,
            { status: e.target.value },
            { preserveScroll: true },
        );
    }

    return (
        <select
            value={application.status}
            onChange={handleChange}
            className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none ${STATUS_STYLES[application.status]}`}
        >
            {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default function Index({ applications, filters }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const [search, setSearch] = useState(filters?.search ?? '');
    const [status, setStatus] = useState(filters?.status ?? '');

    const hasActiveFilters = Boolean(filters?.search || filters?.status);

    function applyFilters() {
        router.get(
            '/admin/dealership-applications',
            { search: search || undefined, status: status || undefined },
            { preserveState: true, replace: true },
        );
        setFilterOpen(false);
    }

    function clearFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/dealership-applications', {}, { preserveState: true, replace: true });
        setFilterOpen(false);
    }

    return (
        <AdminLayout>
            <Head title="Dealership Applications" />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Dealership Applications</h1>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Dealership partnership applications manage karo.
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
                        placeholder="Name, phone or pincode..."
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

            {applications.data.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#e3e3e0] bg-white p-10 text-center dark:border-[#3E3E3A] dark:bg-[#161615]">
                    {hasActiveFilters ? (
                        <>
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Filter se koi application nahi mili.
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
                            Abhi koi dealership application nahi hai. Jab koi apply karega, wo yahan dikhegi.
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
                                    <th className="px-5 py-3 font-medium">Applicant</th>
                                    <th className="px-5 py-3 font-medium">Pincode</th>
                                    <th className="px-5 py-3 font-medium">Area Available</th>
                                    <th className="px-5 py-3 font-medium">Investment</th>
                                    <th className="px-5 py-3 font-medium">Status</th>
                                    <th className="px-5 py-3 font-medium">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e3e3e0] dark:divide-[#3E3E3A]">
                                {applications.data.map((application) => (
                                    <tr key={application.id}>
                                        <td className="px-5 py-3">
                                            <p className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                                {application.full_name}
                                            </p>
                                            <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                                {application.phone}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3 text-[#1b1b18] dark:text-[#EDEDEC]">
                                            {application.pincode}
                                        </td>
                                        <td className="px-5 py-3 text-[#706f6c] dark:text-[#A1A09A]">
                                            {application.area_available}
                                        </td>
                                        <td className="px-5 py-3 text-[#706f6c] dark:text-[#A1A09A]">
                                            {application.investment}
                                        </td>
                                        <td className="px-5 py-3">
                                            <StatusSelect application={application} />
                                        </td>
                                        <td className="px-5 py-3 text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                            {formatDate(application.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="grid gap-3 md:hidden">
                        {applications.data.map((application) => (
                            <div
                                key={application.id}
                                className="rounded-xl border border-[#e3e3e0] bg-white p-4 dark:border-[#3E3E3A] dark:bg-[#161615]"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                            {application.full_name}
                                        </p>
                                        <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">{application.phone}</p>
                                    </div>
                                    <StatusSelect application={application} />
                                </div>

                                <div className="mt-3 space-y-1 border-t border-[#e3e3e0] pt-3 text-sm dark:border-[#3E3E3A]">
                                    <p className="text-[#1b1b18] dark:text-[#EDEDEC]">
                                        Pincode: {application.pincode}
                                    </p>
                                    <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                        {application.area_available} · {application.investment}
                                    </p>
                                    <p className="text-xs text-[#a3a29e]">
                                        Submitted {formatDate(application.created_at)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination links={applications.links} />
                </>
            )}
        </AdminLayout>
    );
}
