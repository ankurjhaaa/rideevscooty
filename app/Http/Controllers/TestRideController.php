<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTestRideRequest;
use App\Mail\NewTestRideEnquiry;
use App\Models\Enquiry;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class TestRideController extends Controller
{
    public const TIME_SLOTS = [
        '10:00 AM - 12:00 PM',
        '12:00 PM - 2:00 PM',
        '2:00 PM - 4:00 PM',
        '4:00 PM - 6:00 PM',
    ];

    public function create(Request $request): Response
    {
        $preselectedProduct = null;

        if ($request->filled('product')) {
            $preselectedProduct = Product::where('slug', $request->query('product'))
                ->where('is_active', true)
                ->first();
        }

        return Inertia::render('BookTestRide', [
            'timeSlots' => self::TIME_SLOTS,
            'preselectedProductId' => $preselectedProduct?->id,
        ]);
    }

    public function store(StoreTestRideRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $product = Product::findOrFail($data['product_id']);
        $color = empty($data['color_id']) ? null : ProductColor::find($data['color_id']);

        $data['product_name'] = $product->name;
        $data['color_name'] = $color?->name;

        $enquiry = Enquiry::create($data);

        $this->notifyAdmin($enquiry);

        return redirect()
            ->route('test-ride.create')
            ->with('success', 'Test ride booked! Our team will reach out to confirm the details.');
    }

    private function notifyAdmin(Enquiry $enquiry): void
    {
        $recipient = SiteSetting::current()->email ?: config('mail.from.address');

        if (! $recipient) {
            return;
        }

        try {
            Mail::to($recipient)->send(new NewTestRideEnquiry($enquiry));
            $enquiry->update(['admin_notified' => true]);
        } catch (Throwable $e) {
            // Email failed - the enquiry itself is already saved, so the lead is not lost.
            Log::error('Failed to send test ride enquiry email: '.$e->getMessage());
        }
    }
}
