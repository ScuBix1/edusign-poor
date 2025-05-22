<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

class Course extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'start_time',
        'end_time',
        'qr_code',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function generateQrCode()
    {
        $qrData = [
            'course_id' => $this->id,
            'timestamp' => now()->timestamp,
            'token' => Str::random(32)
        ];
        $qrCode = QrCode::format('png')->size(300)->generate(json_encode($qrData));
        return base64_encode($qrCode);
    }
}
