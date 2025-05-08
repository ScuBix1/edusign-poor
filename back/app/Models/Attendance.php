<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'course_id',
        'user_id',
        'check_in_time',
        'is_present',
    ];

    protected $casts = [
        'check_in_time' => 'datetime',
        'is_present' => 'boolean',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
