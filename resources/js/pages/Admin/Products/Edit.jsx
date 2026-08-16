import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout, { ArrowLeftIcon } from '../../../components/AdminLayout';
import ProductForm from '../../../components/ProductForm';
import ConfirmDialog from '../../../components/ConfirmDialog';

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: product.category_id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        short_description: product.short_description ?? '',
        description: product.description ?? '',
        motor_power: product.motor_power ?? '',
        top_speed: product.top_speed ?? '',
        range: product.range ?? '',
        battery_capacity: product.battery_capacity ?? '',
        charging_time: product.charging_time ?? '',
        emi_info: product.emi_info ?? '',
        is_active: product.is_active,
        is_featured: product.is_featured,
        images: [],
        colors: [],
        _method: 'put',
    });

    const [removeImageTarget, setRemoveImageTarget] = useState(null);
    const [removeColorTarget, setRemoveColorTarget] = useState(null);
    const [removing, setRemoving] = useState(false);

    function submit(e) {
        e.preventDefault();
        post(`/admin/products/${product.slug}`, { forceFormData: true });
    }

    function confirmRemoveImage() {
        if (!removeImageTarget) return;
        setRemoving(true);
        router.delete(`/admin/products/${product.slug}/images/${removeImageTarget.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setRemoving(false);
                setRemoveImageTarget(null);
            },
        });
    }

    function confirmRemoveColor() {
        if (!removeColorTarget) return;
        setRemoving(true);
        router.delete(`/admin/products/${product.slug}/colors/${removeColorTarget.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setRemoving(false);
                setRemoveColorTarget(null);
            },
        });
    }

    return (
        <AdminLayout>
            <Head title={`Edit ${product.name}`} />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Edit Product</h1>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">{product.name} ki details update karo.</p>
                </div>
                <Link
                    href="/admin/products"
                    className="inline-flex cursor-pointer items-center gap-1.5 self-start rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm font-medium whitespace-nowrap text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to list
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="max-w-3xl rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]"
            >
                <ProductForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    categories={categories}
                    existingImages={product.images}
                    existingColors={product.colors}
                    onRemoveExistingImage={setRemoveImageTarget}
                    onRemoveExistingColor={setRemoveColorTarget}
                />

                <div className="mt-8 flex gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Update Product'}
                    </button>
                    <Link
                        href="/admin/products"
                        className="cursor-pointer rounded-lg border border-[#e3e3e0] px-5 py-2 text-sm text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                    >
                        Cancel
                    </Link>
                </div>
            </form>

            <ConfirmDialog
                open={!!removeImageTarget}
                title="Remove this image?"
                description="Ye image permanently hat jayegi."
                onConfirm={confirmRemoveImage}
                onCancel={() => setRemoveImageTarget(null)}
                processing={removing}
            />
            <ConfirmDialog
                open={!!removeColorTarget}
                title="Remove this color?"
                description={`"${removeColorTarget?.name}" color permanently hat jayega.`}
                onConfirm={confirmRemoveColor}
                onCancel={() => setRemoveColorTarget(null)}
                processing={removing}
            />
        </AdminLayout>
    );
}
