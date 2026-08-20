<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ScooterController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Scooters', [
            'products' => Product::with(['category', 'images'])
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->paginate(12)
                ->withQueryString(),
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        $product->load([
            'category',
            'images',
            'colors' => fn ($query) => $query->where('is_active', true),
        ]);

        return Inertia::render('Scooter', [
            'product' => $product,
        ]);
    }
}
