<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\URL;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $products = Product::where('is_active', true)->get();

        $urls = [
            ['loc' => URL::to('/'), 'lastmod' => date('Y-m-d'), 'priority' => '1.0'],
            ['loc' => URL::to('/scooters'), 'lastmod' => date('Y-m-d'), 'priority' => '0.9'],
            ['loc' => URL::to('/book-a-test-ride'), 'lastmod' => date('Y-m-d'), 'priority' => '0.8'],
            ['loc' => URL::to('/dealership'), 'lastmod' => date('Y-m-d'), 'priority' => '0.8'],
            ['loc' => URL::to('/about-us'), 'lastmod' => date('Y-m-d'), 'priority' => '0.7'],
            ['loc' => URL::to('/contact'), 'lastmod' => date('Y-m-d'), 'priority' => '0.7'],
            ['loc' => URL::to('/videos'), 'lastmod' => date('Y-m-d'), 'priority' => '0.6'],
        ];

        foreach ($products as $product) {
            $urls[] = [
                'loc' => URL::to("/scooters/{$product->slug}"),
                'lastmod' => $product->updated_at->format('Y-m-d'),
                'priority' => '0.9',
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($url['loc']) . '</loc>';
            $xml .= '<lastmod>' . $url['lastmod'] . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>' . $url['priority'] . '</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml'
        ]);
    }
}
