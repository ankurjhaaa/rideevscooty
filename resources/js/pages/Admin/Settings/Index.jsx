import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';

const inputClass =
    'w-full rounded-lg border border-[#e3e3e0] bg-white px-3 py-2 text-sm text-[#1b1b18] focus:border-emerald-500 focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]';
const labelClass = 'mb-1 block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]';

function Card({ title, description, children }) {
    return (
        <div className="rounded-xl border border-[#e3e3e0] bg-white p-6 dark:border-[#3E3E3A] dark:bg-[#161615]">
            <h2 className="text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">{title}</h2>
            {description && (
                <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">{description}</p>
            )}
            <div className="mt-5">{children}</div>
        </div>
    );
}

function SaveButton({ processing, children = 'Save Changes' }) {
    return (
        <button
            type="submit"
            disabled={processing}
            className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {processing ? 'Saving...' : children}
        </button>
    );
}

function WebsiteSettingsCard({ settings }) {
    const [logoPreview, setLogoPreview] = useState(settings.logo_url);
    const { data, setData, post, processing, errors } = useForm({
        logo: null,
        phone: settings.phone ?? '',
        whatsapp: settings.whatsapp ?? '',
        email: settings.email ?? '',
        address: settings.address ?? '',
        _method: 'put',
    });

    function handleLogoChange(e) {
        const file = e.target.files?.[0] ?? null;
        setData('logo', file);
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    }

    function submit(e) {
        e.preventDefault();
        post('/admin/settings/website', { forceFormData: true, preserveScroll: true });
    }

    return (
        <Card title="Website Settings" description="Ye information website ke navbar/footer mein dikhegi.">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className={labelClass}>Website Logo</label>
                    <div className="flex items-center gap-4">
                        {logoPreview ? (
                            <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="h-16 w-16 rounded-lg border border-[#e3e3e0] object-contain p-1 dark:border-[#3E3E3A]"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f4f4f3] text-[10px] text-[#a3a29e] dark:bg-[#1c1c1a]">
                                No logo
                            </div>
                        )}
                        <label
                            htmlFor="logo"
                            className="cursor-pointer rounded-lg border border-dashed border-[#e3e3e0] px-4 py-2 text-sm text-[#706f6c] hover:border-emerald-500 hover:text-emerald-600 dark:border-[#3E3E3A] dark:text-[#A1A09A]"
                        >
                            {logoPreview ? 'Change logo' : 'Upload logo'}
                            <input id="logo" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                        </label>
                    </div>
                    <p className="mt-1 text-xs text-[#706f6c] dark:text-[#A1A09A]">JPG or PNG, max 2 MB.</p>
                    {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="phone" className={labelClass}>
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="e.g. 9876543210"
                            className={inputClass}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="whatsapp" className={labelClass}>
                            WhatsApp Number
                        </label>
                        <input
                            id="whatsapp"
                            type="text"
                            value={data.whatsapp}
                            onChange={(e) => setData('whatsapp', e.target.value)}
                            placeholder="e.g. 9876543210"
                            className={inputClass}
                        />
                        {errors.whatsapp && <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className={labelClass}>
                        Contact Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="e.g. contact@rideev.com"
                        className={inputClass}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="address" className={labelClass}>
                        Showroom Address
                    </label>
                    <textarea
                        id="address"
                        rows={3}
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className={inputClass}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <SaveButton processing={processing} />
            </form>
        </Card>
    );
}

function SocialMediaCard({ settings }) {
    const { data, setData, put, processing, errors } = useForm({
        instagram_url: settings.instagram_url ?? '',
        facebook_url: settings.facebook_url ?? '',
        youtube_url: settings.youtube_url ?? '',
    });

    function submit(e) {
        e.preventDefault();
        put('/admin/settings/social', { preserveScroll: true });
    }

    return (
        <Card title="Social Media" description="Khali chhode gaye links website par nahi dikhenge.">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="instagram_url" className={labelClass}>
                        Instagram URL
                    </label>
                    <input
                        id="instagram_url"
                        type="text"
                        value={data.instagram_url}
                        onChange={(e) => setData('instagram_url', e.target.value)}
                        placeholder="https://instagram.com/rideev"
                        className={inputClass}
                    />
                    {errors.instagram_url && <p className="mt-1 text-sm text-red-600">{errors.instagram_url}</p>}
                </div>
                <div>
                    <label htmlFor="facebook_url" className={labelClass}>
                        Facebook URL
                    </label>
                    <input
                        id="facebook_url"
                        type="text"
                        value={data.facebook_url}
                        onChange={(e) => setData('facebook_url', e.target.value)}
                        placeholder="https://facebook.com/rideev"
                        className={inputClass}
                    />
                    {errors.facebook_url && <p className="mt-1 text-sm text-red-600">{errors.facebook_url}</p>}
                </div>
                <div>
                    <label htmlFor="youtube_url" className={labelClass}>
                        YouTube URL
                    </label>
                    <input
                        id="youtube_url"
                        type="text"
                        value={data.youtube_url}
                        onChange={(e) => setData('youtube_url', e.target.value)}
                        placeholder="https://youtube.com/@rideev"
                        className={inputClass}
                    />
                    {errors.youtube_url && <p className="mt-1 text-sm text-red-600">{errors.youtube_url}</p>}
                </div>

                <SaveButton processing={processing} />
            </form>
        </Card>
    );
}

function ProfileCard({ admin }) {
    const { data, setData, put, processing, errors } = useForm({
        name: admin.name,
        email: admin.email,
    });

    function submit(e) {
        e.preventDefault();
        put('/admin/settings/profile', { preserveScroll: true });
    }

    return (
        <Card title="Account Settings" description="Apna naam aur login email update karo.">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className={labelClass}>
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={inputClass}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="account_email" className={labelClass}>
                        Email
                    </label>
                    <input
                        id="account_email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={inputClass}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <SaveButton processing={processing}>Save Profile</SaveButton>
            </form>
        </Card>
    );
}

function PasswordCard() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        put('/admin/settings/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <Card title="Change Password" description="Password change karne ke liye current password verify hoga.">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="current_password" className={labelClass}>
                        Current Password
                    </label>
                    <input
                        id="current_password"
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className={inputClass}
                    />
                    {errors.current_password && (
                        <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>
                    )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="password" className={labelClass}>
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={inputClass}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className={labelClass}>
                            Confirm New Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={inputClass}
                        />
                    </div>
                </div>

                <SaveButton processing={processing}>Change Password</SaveButton>
            </form>
        </Card>
    );
}

export default function Index({ settings, admin }) {
    return (
        <AdminLayout>
            <Head title="Settings" />

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Settings</h1>
                <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                    Website ki basic information aur apna account manage karo.
                </p>
            </div>

            <div className="grid max-w-2xl gap-6">
                <WebsiteSettingsCard settings={settings} />
                <SocialMediaCard settings={settings} />
                <ProfileCard admin={admin} />
                <PasswordCard />
            </div>
        </AdminLayout>
    );
}
