<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreVideoRequest;
use App\Http\Requests\Admin\UpdateVideoRequest;
use App\Models\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    public function index(Request $request): Response
    {
        $videos = Video::query()
            ->when($request->search, fn ($query, $search) => $query->where('title', 'like', "%{$search}%"))
            ->when($request->status, fn ($query, $status) => $query->where('is_active', $status === 'active'))
            ->orderBy('sort_order')
            ->orderBy('title')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Videos/Index', [
            'videos' => $videos,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Videos/Create');
    }

    public function store(StoreVideoRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('videos', 'public');
        }

        Video::create($data);

        return redirect()->route('admin.videos.index')->with('success', 'Video added successfully.');
    }

    public function edit(Video $video): Response
    {
        return Inertia::render('Admin/Videos/Edit', [
            'video' => $video,
        ]);
    }

    public function update(UpdateVideoRequest $request, Video $video): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            if ($video->thumbnail) {
                Storage::disk('public')->delete($video->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('videos', 'public');
        } else {
            unset($data['thumbnail']);
        }

        $video->update($data);

        return redirect()->route('admin.videos.index')->with('success', 'Video updated successfully.');
    }

    public function destroy(Video $video): RedirectResponse
    {
        if ($video->thumbnail) {
            Storage::disk('public')->delete($video->thumbnail);
        }

        $video->delete();

        return redirect()->route('admin.videos.index')->with('success', 'Video deleted successfully.');
    }
}
