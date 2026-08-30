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
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
        ], [
            'logo.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'logo.max' => 'Logo size should be under 2 MB.',
            'email.email' => 'Please enter a valid email address.',
            'latitude.numeric' => 'Latitude should be a number (e.g. 25.5941).',
            'latitude.between' => 'Latitude should be between -90 and 90.',
            'longitude.numeric' => 'Longitude should be a number (e.g. 85.1376).',
            'longitude.between' => 'Longitude should be between -180 and 180.',
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
            'google_review_url' => ['nullable', 'url', 'max:255'],
            'google_review_qr' => ['nullable', 'image', 'max:2048'],
            'instagram_qr' => ['nullable', 'image', 'max:2048'],
        ], [
            'instagram_url.url' => 'Please enter a valid Instagram URL.',
            'facebook_url.url' => 'Please enter a valid Facebook URL.',
            'youtube_url.url' => 'Please enter a valid YouTube URL.',
            'google_review_url.url' => 'Please enter a valid Google Review URL.',
            'google_review_qr.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'google_review_qr.max' => 'QR image size should be under 2 MB.',
            'instagram_qr.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'instagram_qr.max' => 'QR image size should be under 2 MB.',
        ]);

        $settings = SiteSetting::current();

        foreach (['google_review_qr', 'instagram_qr'] as $field) {
            if ($request->hasFile($field)) {
                if ($settings->$field) {
                    Storage::disk('public')->delete($settings->$field);
                }
                $data[$field] = $request->file($field)->store('settings', 'public');
            } else {
                unset($data[$field]);
            }
        }

        $settings->update($data);

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
