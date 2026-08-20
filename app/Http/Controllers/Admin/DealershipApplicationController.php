<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DealershipApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DealershipApplicationController extends Controller
{
    public function index(Request $request): Response
    {
        $applications = DealershipApplication::query()
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->when($request->search, fn ($query, $search) => $query->where(function ($query) use ($search) {
                $query->where('full_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('pincode', 'like', "%{$search}%");
            }))
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/DealershipApplications/Index', [
            'applications' => $applications,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function updateStatus(Request $request, DealershipApplication $dealershipApplication): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['new', 'contacted', 'completed', 'cancelled'])],
        ], [
            'status.required' => 'Please select a status.',
            'status.in' => 'Invalid status selected.',
        ]);

        $dealershipApplication->update($data);

        return back()->with('success', 'Application status updated.');
    }
}
