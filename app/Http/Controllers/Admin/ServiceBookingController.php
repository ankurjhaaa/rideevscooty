<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceBooking;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ServiceBookingController extends Controller
{
    public function index(Request $request): Response
    {
        $bookings = ServiceBooking::query()
            ->select('service_bookings.*')
            // Total number of service bookings ever made by this phone number (any status),
            // so the admin can spot repeat customers without cross-referencing manually.
            ->selectSub(function (QueryBuilder $query) {
                $query->from('service_bookings as sb2')
                    ->selectRaw('count(*)')
                    ->whereColumn('sb2.phone', 'service_bookings.phone');
            }, 'total_visits')
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->when($request->search, fn ($query, $search) => $query->where(function ($query) use ($search) {
                $query->where('full_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            }))
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/ServiceBookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function updateStatus(Request $request, ServiceBooking $serviceBooking): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['new', 'contacted', 'completed', 'cancelled'])],
        ], [
            'status.required' => 'Please select a status.',
            'status.in' => 'Invalid status selected.',
        ]);

        $serviceBooking->update($data);

        return back()->with('success', 'Service booking status updated.');
    }
}
