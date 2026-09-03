<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceBookingRequest;
use App\Mail\NewServiceBooking;
use App\Models\Product;
use App\Models\ServiceBooking;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ServiceBookingController extends Controller
{
    public const MAX_BOOKINGS_PER_DAY = 5;

    public const TIME_SLOTS = [
        '9:30 AM - 10:00 AM',
        '10:00 AM - 10:30 AM',
        '10:30 AM - 11:00 AM',
        '11:00 AM - 11:30 AM',
        '11:30 AM - 12:00 PM',
        '12:00 PM - 12:30 PM',
    ];

    public const SERVICE_TYPES = [
        'first_service' => 'First Service',
        'regular_service' => 'Regular Service',
        'battery_check' => 'Battery Check',
        'motor_check' => 'Motor Check',
        'brake_check' => 'Brake Check',
        'electrical_issue' => 'Electrical Issue',
        'other' => 'Other',
    ];

    public function create(): Response
    {
        $fullyBookedDates = $this->fullyBookedDates();

        return Inertia::render('BookService', [
            'timeSlots' => self::TIME_SLOTS,
            'serviceTypes' => self::SERVICE_TYPES,
            'fullyBookedDates' => $fullyBookedDates,
        ]);
    }

    public function store(StoreServiceBookingRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $product = Product::find($data['product_id'] ?? null);
        $data['vehicle_model'] = $product?->name ?? $data['vehicle_model'] ?? '';

        $booking = ServiceBooking::create($data);

        $this->notifyAdmin($booking);

        return redirect()
            ->route('service.create')
            ->with('success', 'Service request submitted! Our team will contact you shortly.');
    }

    /**
     * Dates in the next 14 days that already have MAX_BOOKINGS_PER_DAY active bookings.
     *
     * @return array<int, string>
     */
    private function fullyBookedDates(): array
    {
        $today = Carbon::today();
        $end = $today->copy()->addDays(13);

        return ServiceBooking::where('status', '!=', 'cancelled')
            ->whereBetween('preferred_date', [$today, $end])
            ->selectRaw('preferred_date, count(*) as total')
            ->groupBy('preferred_date')
            ->havingRaw('count(*) >= ?', [self::MAX_BOOKINGS_PER_DAY])
            ->pluck('preferred_date')
            ->map(fn ($date) => Carbon::parse($date)->toDateString())
            ->values()
            ->all();
    }

    private function notifyAdmin(ServiceBooking $booking): void
    {
        $recipient = SiteSetting::current()->email ?: config('mail.from.address');

        if (! $recipient) {
            return;
        }

        try {
            Mail::to($recipient)->send(new NewServiceBooking($booking));
            $booking->update(['admin_notified' => true]);
        } catch (Throwable $e) {
            Log::error('Failed to send service booking email: '.$e->getMessage());
        }
    }
}
