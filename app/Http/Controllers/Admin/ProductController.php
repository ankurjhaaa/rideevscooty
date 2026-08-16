<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $products = Product::with(['category', 'images'])
            ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->when($request->category_id, fn ($query, $categoryId) => $query->where('category_id', $categoryId))
            ->when($request->status, fn ($query, $status) => $query->where('is_active', $status === 'active'))
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'filters' => $request->only(['search', 'category_id', 'status']),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data         = $request->safe()->except(['images', 'colors']);
        $data['slug'] = $data['slug'] ?: Str::slug($data['name']);

        DB::transaction(function () use ($data, $request) {
            $product = Product::create($data);
            $this->syncImages($product, $request);
            $this->syncColors($product, $request);
        });

        return redirect()->route('admin.products.index')->with('success', 'Product added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        $product->load(['category', 'images', 'colors']);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        $product->load(['images', 'colors']);

        return Inertia::render('Admin/Products/Edit', [
            'product'    => $product,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->safe()->except(['images', 'colors']);
        $data['slug'] = $data['slug'] ?: Str::slug($data['name']);

        DB::transaction(function () use ($data, $request, $product) {
            $product->update($data);
            $this->syncImages($product, $request);
            $this->syncColors($product, $request);
        });

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(Product $product): RedirectResponse
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        foreach ($product->colors as $color) {
            if ($color->image_path) {
                Storage::disk('public')->delete($color->image_path);
            }
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }

    private function syncImages(Product $product, $request): void
    {
        $existingCount = $product->images()->count();

        foreach ($request->input('images', []) as $index => $imageData) {
            if (! $request->hasFile("images.$index.file")) {
                continue;
            }

            $product->images()->create([
                'image_path' => $request->file("images.$index.file")->store('products', 'public'),
                'type' => $imageData['type'] ?? null,
                'is_primary' => $existingCount === 0 && $index === 0,
                'sort_order' => $existingCount + $index,
            ]);
        }
    }

    private function syncColors(Product $product, $request): void
    {
        $existingCount = $product->colors()->count();

        foreach ($request->input('colors', []) as $index => $color) {
            $product->colors()->create([
                'name' => $color['name'],
                'hex_code' => $color['hex_code'] ?? null,
                'image_path' => $request->hasFile("colors.$index.image")
                    ? $request->file("colors.$index.image")->store('colors', 'public')
                    : null,
                'sort_order' => $existingCount + $index,
            ]);
        }
    }
}
