<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use Inertia\Inertia;
use Inertia\Response;

class AccessoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Accessories', [
            'accessories' => Accessory::where('is_active', true)
                ->orderBy('name')
                ->paginate(12)
                ->withQueryString(),
        ]);
    }

    public function show(Accessory $accessory): Response
    {
        abort_unless($accessory->is_active, 404);

        return Inertia::render('AccessoryShow', [
            'accessory' => $accessory,
        ]);
    }
}
