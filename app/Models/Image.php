<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'user_id',
        'path',
        'mime_type',
        'size',
        'width',
        'height',
        'original_name',
        'alt_text',
    ];
}
