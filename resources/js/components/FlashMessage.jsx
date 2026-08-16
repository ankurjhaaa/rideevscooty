import { useEffect, useState } from 'react';

export default function FlashMessage({ message, type = 'success' }) {
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setShow(true);
        setVisible(true);

        const fadeTimer = setTimeout(() => setVisible(false), 3500);
        const removeTimer = setTimeout(() => setShow(false), 4000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [message]);

    if (!show) return null;

    const styles =
        type === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400'
            : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-500/10 dark:text-red-400';

    return (
        <div
            className={`mb-4 rounded-lg border px-4 py-3 text-sm transition-opacity duration-500 ${styles} ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {message}
        </div>
    );
}
