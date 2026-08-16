import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout, { ArrowLeftIcon } from '../../../components/AdminLayout';
import ProductForm from '../../../components/ProductForm';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        slug: '',
        price: '',
        short_description: '',
        description: '',
        motor_power: '',
        top_speed: '',
        range: '',
        battery_capacity: '',
        charging_time: '',
        emi_info: '',
        is_active: true,
        is_featured: false,
        images: [],
        colors: [],
    });


    function submit(e) {
        e.preventDefault();
        post('/admin/products', { forceFormData: true });


    }
    return (
        <AdminLayout>
            <Head title='Add Product' />
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Add Product</h1>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">Naya scooter add karo.</p>
                </div>
                <Link
                    href="/admin/products"
                    className="inline-flex cursor-pointer items-center gap-1.5 self-start rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm font-medium whitespace-nowrap text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to list
                </Link>
            </div>
            <form onSubmit={submit}
                className="max-w-3xl rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
                <ProductForm data={data} setData={setData} errors={errors} categories={categories} />
                <div className="mt-8 flex gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Product'}
                    </button>
                    <Link
                        href="/admin/products"
                        className="cursor-pointer rounded-lg border border-[#e3e3e0] px-5 py-2 text-sm text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                    >
                        Cancel
                    </Link>
                </div>

            </form>

        </AdminLayout>
    );

}