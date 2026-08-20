import { Link } from '@inertiajs/react';

export default function PublicPagination({ links }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
            {links.map((link, index) => {
                const label = link.label.replace('&laquo;', '←').replace('&raquo;', '→');

                if (!link.url) {
                    return (
                        <span
                            key={index}
                            className="cursor-not-allowed rounded-full px-4 py-2 text-sm text-zinc-700"
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
                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            link.active
                                ? 'bg-emerald-600 text-white'
                                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
