<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'categories' => fn () => $request->routeIs('admin.*') ? [] : Category::where('is_active', true)
                ->with(['products' => fn ($query) => $query->where('is_active', true)
                    ->with([
                        'images',
                        'colors' => fn ($colorQuery) => $colorQuery->where('is_active', true)->orderBy('sort_order'),
                    ])
                    ->orderBy('sort_order')])
                ->orderBy('sort_order')
                ->get(),
            'siteSettings' => fn () => $request->routeIs('admin.*') ? null : SiteSetting::current(),
            'seo' => fn () => $request->routeIs('admin.*') ? null : [
                'title' => 'Ride EV | Premium Electric Scooters & Two Wheelers in Bihar',
                'description' => 'Discover Ride EV\'s premium range of zero-emission electric scooters. Experience modern styling, smooth performance, low running costs, and easy maintenance. Buy your electric scooty today.',
                'keywords' => 'Ride EV, Electric Scooty, Electric Two Wheeler, EV Bihar, Zero Emission, Electric Scooter India',
                'image' => asset('images/image_product.png'),
                'url' => url()->current(),
            ],
        ];
    }
}
