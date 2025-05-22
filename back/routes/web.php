<?php

use App\Models\Course;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/courses/{course}/qr-code-view', function (App\Models\Course $course) {
    $qrData = [
        'course_id' => $course->id,
        'timestamp' => now()->timestamp,
        'token' => Str::random(32)
    ];
    $qrCode = QrCode::format('png')->size(300)->generate(json_encode($qrData));
    $base64 = base64_encode($qrCode);

    return view('show-course', [
        'course' => $course,
        'qr_code' => $base64
    ]);
});
