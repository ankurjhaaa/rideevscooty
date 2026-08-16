function FilterIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
        </svg>
    );
}

export function FilterToggleButton({ onClick, active }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium ${
                active
                    ? 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'border-[#e3e3e0] bg-white text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]'
            }`}
        >
            <FilterIcon className="h-4 w-4" />
            Filters
            {active && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-emerald-700">
                    •
                </span>
            )}
        </button>
    );
}

export default function FilterDrawer({ open, onClose, onApply, onClear, children }) {
    if (!open) return null;

    return (
        <>
            {/* Mobile: bottom sheet, jaisa app mein neeche se khulta hai */}
            <div className="fixed inset-0 z-50 md:hidden">
                <div className="absolute inset-0 bg-black/40" onClick={onClose} />
                <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl dark:bg-[#161615]">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                            <FilterIcon className="h-5 w-5" />
                            Filters
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer text-xl leading-none text-[#706f6c] dark:text-[#A1A09A]"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="space-y-4">{children}</div>
                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={onClear}
                            className="flex-1 cursor-pointer rounded-lg border border-[#e3e3e0] py-2.5 text-sm font-medium text-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC]"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={onApply}
                            className="flex-1 cursor-pointer rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop: header ke neeche full-width card */}
            <div className="mb-6 hidden rounded-xl border border-[#e3e3e0] bg-white p-5 md:block dark:border-[#3E3E3A] dark:bg-[#161615]">
                <div className="flex flex-wrap items-end gap-4">
                    {children}
                    <div className="ml-auto flex gap-3">
                        <button
                            type="button"
                            onClick={onClear}
                            className="cursor-pointer rounded-lg border border-[#e3e3e0] px-4 py-2 text-sm font-medium text-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC]"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={onApply}
                            className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
