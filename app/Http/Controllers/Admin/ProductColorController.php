<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductColor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ProductColorController extends Controller
{
    public function destroy(Product $product, ProductColor $color): RedirectResponse
    {
        abort_if($color->product_id !== $product->id, 404);

        if ($color->image_path) {
            Storage::disk('public')->delete($color->image_path);
        }
        $color->delete();

        return back()->with('success', 'Color removed.');
    }
}
