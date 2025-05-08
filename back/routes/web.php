<?php

use App\Models\Course;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/courses/{course}/qr-code-view', function (Course $course) {
    return view('show-course', [
        'course' => $course
    ]);
});
