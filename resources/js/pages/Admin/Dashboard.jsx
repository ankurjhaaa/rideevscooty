import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../components/AdminLayout';

const STATUS_STYLES = {
    new: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    contacted: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    cancelled: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

function formatDate(value) {
    return new Date(value).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
    });
}

export default function Dashboard({ stats = {}, recentEnquiries = [] }) {
    const cards = [
        { label: 'Categories', value: stats.categories ?? 0 },
        { label: 'Products', value: stats.products ?? 0 },
        { label: 'Total Enquiries', value: stats.enquiries ?? 0 },
        { label: 'New Enquiries', value: stats.newEnquiries ?? 0, highlight: true },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                    RideEV showroom ka overview.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-[#e3e3e0] bg-white p-5 shadow-sm dark:border-[#3E3E3A] dark:bg-[#161615]"
                    >
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">{card.label}</p>
                        <p
                            className={`mt-2 text-3xl font-semibold ${
                                card.highlight
                                    ? 'text-emerald-600 dark:text-emerald-500'
                                    : 'text-[#1b1b18] dark:text-[#EDEDEC]'
                            }`}
                        >
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#e3e3e0] bg-white p-5 dark:border-[#3E3E3A] dark:bg-[#161615]">
                <div className="mb-1 flex items-center justify-between">
                    <h2 className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                        Recent Enquiries
                    </h2>
                    {recentEnquiries.length > 0 && (
                        <Link
                            href="/admin/enquiries"
                            className="cursor-pointer text-sm font-medium text-emerald-600 hover:underline"
                        >
                            View all
                        </Link>
                    )}
                </div>

                {recentEnquiries.length === 0 ? (
                    <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Abhi koi enquiry nahi hai. Test ride enquiries yahan dikhengi jab public form
                        live hoga.
                    </p>
                ) : (
                    <div className="mt-3 divide-y divide-[#e3e3e0] dark:divide-[#3E3E3A]">
                        {recentEnquiries.map((enquiry) => (
                            <div key={enquiry.id} className="flex items-center justify-between gap-3 py-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                        {enquiry.full_name}
                                    </p>
                                    <p className="truncate text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                        {enquiry.product_name} · {formatDate(enquiry.created_at)}
                                    </p>
                                </div>
                                <span
                                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[enquiry.status]}`}
                                >
                                    {enquiry.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
