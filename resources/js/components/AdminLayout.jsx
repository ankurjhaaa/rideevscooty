import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { dashboard, logout } from '../routes/admin';
import FlashMessage from './FlashMessage';

function DashboardIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-16v5h6V4h-6Z" />
        </svg>
    );
}

function CategoriesIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.59 13.41 12 22l-9-9 8.59-8.59A2 2 0 0 1 13 4h6a1 1 0 0 1 1 1v6a2 2 0 0 1-.41 1.41ZM16.5 8.5h.01" />
        </svg>
    );
}

function ProductsIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8 12 3 3 8m18 0-9 5m9-5v9l-9 5m0-9L3 8m9 5v9M3 8v9l9 5" />
        </svg>
    );
}

function EnquiriesIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
        </svg>
    );
}

function LogoutIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
        </svg>
    );
}

function MenuIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

function CloseIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18 18 6" />
        </svg>
    );
}

export function ArrowLeftIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0 6-6m-6 6 6 6" />
        </svg>
    );
}

function SettingsIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
            />
        </svg>
    );
}
function VideosIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="2.5" y="5.5" width="14" height="13" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.5 8.5 v7l-4-2.5v-2Z" />
        </svg>
    );
}

function DealershipIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5 12 3l9 6.5M5 9.5V21h14V9.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6h6v6" />
        </svg>
    );
}


const navItems = [
    { label: 'Dashboard', href: dashboard.url(), icon: DashboardIcon },
    { label: 'Categories', href: '/admin/categories', icon: CategoriesIcon },
    { label: 'Products', href: '/admin/products', icon: ProductsIcon },
    { label: 'Enquiries', href: '/admin/enquiries', icon: EnquiriesIcon },
    { label: 'Dealership Applications', href: '/admin/dealership-applications', icon: DealershipIcon },
    { label: 'Videos', href: '/admin/videos', icon: VideosIcon },

    { label: 'Settings', href: '/admin/settings', icon: SettingsIcon },
    
];

export default function AdminLayout({ children }) {
    const { props, url: currentUrl } = usePage();
    const { auth ,flash } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function handleLogout(e) {
        e.preventDefault();
        router.post(logout.url());
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#F1F1EF] dark:bg-[#0d0d0c]">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-[#e3e3e0] bg-white transition-transform duration-200 dark:border-[#3E3E3A] dark:bg-[#0a0a0a] md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-[#e3e3e0] px-5 py-4 dark:border-[#3E3E3A]">
                    <span className="text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                        RideEV <span className="text-emerald-600 dark:text-emerald-500">Admin</span>
                    </span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="cursor-pointer text-[#706f6c] hover:text-[#1b1b18] md:hidden dark:text-[#A1A09A] dark:hover:text-[#EDEDEC]"
                    >
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>

                <nav className="thin-scrollbar flex-1 space-y-1 overflow-y-auto p-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        if (item.comingSoon) {
                            return (
                                <div
                                    key={item.label}
                                    className="flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-2 text-sm text-[#a3a29e] dark:text-[#5a5954]"
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </span>
                                    <span className="rounded-full bg-[#f4f4f3] px-2 py-0.5 text-[11px] dark:bg-[#1c1c1a]">
                                        Soon
                                    </span>
                                </div>
                            );
                        }

                        const isActive = currentUrl === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                        : 'text-[#1b1b18] hover:bg-[#f4f4f3] dark:text-[#EDEDEC] dark:hover:bg-[#161615]'
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="shrink-0 border-t border-[#e3e3e0] p-3 dark:border-[#3E3E3A]">
                    <button
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#1b1b18] hover:bg-[#f4f4f3] dark:text-[#EDEDEC] dark:hover:bg-[#161615]"
                    >
                        <LogoutIcon className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            <div className="flex h-screen flex-1 flex-col overflow-hidden">
                <header className="flex shrink-0 items-center justify-between border-b border-[#e3e3e0] bg-white px-4 py-3 dark:border-[#3E3E3A] dark:bg-[#0a0a0a] md:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="cursor-pointer text-[#1b1b18] md:hidden dark:text-[#EDEDEC]"
                    >
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <span className="text-sm font-medium text-[#1b1b18] md:hidden dark:text-[#EDEDEC]">
                        RideEV Admin
                    </span>
                    <div className="ml-auto flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                                {auth.user?.name}
                            </p>
                            <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                {auth.user?.email}
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                            {auth.user?.name?.charAt(0) ?? 'A'}
                        </div>
                    </div>
                </header>

                <main className="thin-scrollbar flex-1 overflow-y-auto p-4 md:p-8">
                    <FlashMessage message={flash?.success} type="success" />
                    <FlashMessage message={flash?.error} type="error" />
                    {children}
                </main>
            </div>
        </div>
    );
}
