<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageController extends Controller
{
    public function index(){
        sleep(1);
        $images = Image::latest()->get();

        return inertia('Images/index',[
        'images' => $images,
    ]);
    }

    public function uploadFile(){
        sleep(1);

        return inertia('Images/upload_file');
    }

    public function saveImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $manager = new ImageManager(new Driver());

        $image = $manager->read($request->file('image'));

        $image = $image->scale(width: 1200);

        $filename = uniqid() . '.jpg';
        $path = 'images/' . $filename;

        $result = Storage::disk('public')->put(
            $path,
            (string) $image->toJpeg(85)
        );

        Image::create([
            'user_id' => auth()->id(),
            'path' => $path,
            'mime_type' => 'image/jpeg',
            'size' => Storage::disk('public')->size($path),
            'width' => $image->width(),
            'height' => $image->height(),
            'original_name' => $request->file('image')->getClientOriginalName(),
            'alt_text' => $request->file('image')->getClientOriginalName(),
        ]);

        return redirect()
        ->route('image.index')
        ->with('success', 'Image has been created successfully.');
    }

    public function destroy(Image $image)
    {
        sleep(1);
        // 1. Delete file from storage (if it exists)
        if (Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        // 2. Delete database record
        $image->delete();

        return redirect()
            ->route('image.index')
            ->with('message', 'Image deleted permanently');
    }

}
