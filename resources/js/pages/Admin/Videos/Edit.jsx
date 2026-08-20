import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout, { ArrowLeftIcon } from '../../../components/AdminLayout';
import VideoForm from '../../../components/VideoForm';

export default function Edit({ video }) {
    const { data, setData, post, processing, errors } = useForm({
        title: video.title,
        video_url: video.video_url,
        thumbnail: null,
        is_active: video.is_active,
        _method: 'put',
    });

    function submit(e) {
        e.preventDefault();
        post(`/admin/videos/${video.id}`, { forceFormData: true });
    }

    return (
        <AdminLayout>
            <Head title={`Edit ${video.title}`} />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Edit Video</h1>
                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        {video.title} ki details update karo.
                    </p>
                </div>
                <Link
                    href="/admin/videos"
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
                <VideoForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    existingThumbnailUrl={video.thumbnail_url}
                />

                <div className="mt-6 flex gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Update Video'}
                    </button>
                    <Link
                        href="/admin/videos"
                        className="cursor-pointer rounded-lg border border-[#e3e3e0] px-5 py-2 text-sm text-[#1b1b18] hover:bg-[#f4f4f3] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#1c1c1a]"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
