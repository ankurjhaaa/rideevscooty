<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDealershipApplicationRequest;
use App\Mail\NewDealershipApplication;
use App\Models\DealershipApplication;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class DealershipController extends Controller
{
    public function store(StoreDealershipApplicationRequest $request): RedirectResponse
    {
        $application = DealershipApplication::create($request->validated());

        $this->notifyAdmin($application);

        return redirect()
            ->route('dealership')
            ->with('success', 'Application received! Our team will get back to you shortly.');
    }

    private function notifyAdmin(DealershipApplication $application): void
    {
        $recipient = SiteSetting::current()->email ?: config('mail.from.address');

        if (! $recipient) {
            return;
        }

        try {
            Mail::to($recipient)->send(new NewDealershipApplication($application));
            $application->update(['admin_notified' => true]);
        } catch (Throwable $e) {
            // Email failed - the application itself is already saved, so the lead is not lost.
            Log::error('Failed to send dealership application email: '.$e->getMessage());
        }
    }
}
