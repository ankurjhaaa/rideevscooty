import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
            {links.map((link, index) => {
                const label = link.label.replace('&laquo;', '←').replace('&raquo;', '→');

                if (!link.url) {
                    return (
                        <span
                            key={index}
                            className="cursor-not-allowed rounded-lg px-3 py-1.5 text-sm text-[#a3a29e] dark:text-[#5a5954]"
                        >
                            {label}
                        </span>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll
                        className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium ${
                            link.active
                                ? 'bg-emerald-600 text-white'
                                : 'text-[#1b1b18] hover:bg-[#f4f4f3] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]'
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
