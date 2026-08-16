<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => SiteSetting::current(),
            'admin' => $request->user()->only('id', 'name', 'email'),
        ]);
    }

    public function updateWebsite(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'logo' => ['nullable', 'image', 'max:2048'],
            'phone' => ['nullable', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
        ], [
            'logo.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'logo.max' => 'Logo size should be under 2 MB.',
            'email.email' => 'Please enter a valid email address.',
        ]);

        $settings = SiteSetting::current();

        if ($request->hasFile('logo')) {
            if ($settings->logo) {
                Storage::disk('public')->delete($settings->logo);
            }
            $data['logo'] = $request->file('logo')->store('settings', 'public');
        } else {
            unset($data['logo']);
        }

        $settings->update($data);

        return back()->with('success', 'Website settings updated successfully.');
    }

    public function updateSocial(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'instagram_url' => ['nullable', 'url', 'max:255'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'youtube_url' => ['nullable', 'url', 'max:255'],
        ], [
            'instagram_url.url' => 'Please enter a valid Instagram URL.',
            'facebook_url.url' => 'Please enter a valid Facebook URL.',
            'youtube_url.url' => 'Please enter a valid YouTube URL.',
        ]);

        SiteSetting::current()->update($data);

        return back()->with('success', 'Social media links updated successfully.');
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($request->user()->id)],
        ], [
            'name.required' => 'Please enter your name.',
            'email.required' => 'Please enter your email.',
            'email.unique' => 'This email is already in use.',
        ]);

        $request->user()->update($data);

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ], [
            'current_password.required' => 'Please enter your current password.',
            'current_password.current_password' => 'The current password you entered is incorrect.',
            'password.required' => 'Please enter a new password.',
            'password.confirmed' => 'New password and confirmation do not match.',
            'password.min' => 'New password should be at least 8 characters.',
        ]);

        $request->user()->update([
            'password' => $data['password'],
        ]);

        return back()->with('success', 'Password changed successfully.');
    }
}
