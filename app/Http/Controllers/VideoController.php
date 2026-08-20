<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Videos', [
            'videos' => Video::where('is_active', true)
                ->orderBy('sort_order')
                ->orderByDesc('created_at')
                ->paginate(12)
                ->withQueryString(),
        ]);
    }
}
