<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'title',
        'description',
        'duration_minutes',
        'pass_percentage',
        'shuffle_questions',
        'is_published',
        'created_by'
    ];

    protected $casts = [
        'shuffle_questions' => 'boolean',
        'is_published' => 'boolean',
    ];

    public function questions() { return $this->hasMany(Question::class)->orderBy('order'); }
    public function attempts() { return $this->hasMany(QuizAttempt::class); }
}
