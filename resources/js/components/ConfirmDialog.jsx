export default function ConfirmDialog({ open, title, description, confirmLabel = 'Delete', onConfirm, onCancel, processing }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-[#161615]">
                <h2 className="text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">{title}</h2>
                <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">{description}</p>
                <div className="mt-5 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="cursor-pointer rounded-lg border border-[#e3e3e0] px-4 py-2 text-sm text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Deleting...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
