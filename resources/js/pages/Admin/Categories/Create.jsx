import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout, { ArrowLeftIcon } from '../../../components/AdminLayout';
import CategoryForm from '../../../components/CategoryForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        image: null,
        is_active: true,
    });

    function submit(e) {
        e.preventDefault();
        post('/admin/categories', { forceFormData: true });
    }

    return (
        <AdminLayout>
            <Head title="Add Category" />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Add Category</h1>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">Naya scooter category add karo.</p>
                </div>
                <Link
                    href="/admin/categories"
                    className="inline-flex cursor-pointer items-center gap-1.5 self-start rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm font-medium whitespace-nowrap text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to list
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="max-w-xl rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]"
            >
                <CategoryForm data={data} setData={setData} errors={errors} />

                <div className="mt-6 flex gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Category'}
                    </button>
                    <Link
                        href="/admin/categories"
                        className="cursor-pointer rounded-lg border border-[#e3e3e0] px-5 py-2 text-sm text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
