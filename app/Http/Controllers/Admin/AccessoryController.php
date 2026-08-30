<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAccessoryRequest;
use App\Http\Requests\Admin\UpdateAccessoryRequest;
use App\Models\Accessory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AccessoryController extends Controller
{
    public function index(Request $request): Response
    {
        $accessories = Accessory::query()
            ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->when($request->status, fn ($query, $status) => $query->where('is_active', $status === 'active'))
            ->orderBy('name')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Accessories/Index', [
            'accessories' => $accessories,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Accessories/Create');
    }

    public function store(StoreAccessoryRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('accessories', 'public');
        }

        Accessory::create($data);

        return redirect()->route('admin.accessories.index')->with('success', 'Accessory added successfully.');
    }

    public function edit(Accessory $accessory): Response
    {
        return Inertia::render('Admin/Accessories/Edit', [
            'accessory' => $accessory,
        ]);
    }

    public function update(UpdateAccessoryRequest $request, Accessory $accessory): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($accessory->image) {
                Storage::disk('public')->delete($accessory->image);
            }
            $data['image'] = $request->file('image')->store('accessories', 'public');
        } else {
            unset($data['image']);
        }

        $accessory->update($data);

        return redirect()->route('admin.accessories.index')->with('success', 'Accessory updated successfully.');
    }

    public function destroy(Accessory $accessory): RedirectResponse
    {
        if ($accessory->image) {
            Storage::disk('public')->delete($accessory->image);
        }

        $accessory->delete();

        return redirect()->route('admin.accessories.index')->with('success', 'Accessory deleted successfully.');
    }
}
