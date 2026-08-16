<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTestRideRequest;
use App\Models\Enquiry;
use App\Models\Product;
use App\Models\ProductColor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
        $color = $data['color_id'] ? ProductColor::find($data['color_id']) : null;

        $data['product_name'] = $product->name;
        $data['color_name'] = $color?->name;

        $enquiry = Enquiry::create($data);

        $this->notifyAdmin($enquiry);

        return redirect()
            ->route('test-ride.create')
            ->with('success', 'Test ride booked! Our team will reach out to confirm the details.');
    }

    // SMTP is not configured yet, so enquiries only land in the admin panel for now.
    // Once ready: send a mail here and set $enquiry->update(['admin_notified' => true]).
    private function notifyAdmin(Enquiry $enquiry): void
    {
        //
    }
}
