<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AuthController;
use App\Models\User;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/test-token', function () {
    $user = User::first();
    return $user->createToken('test')->plainTextToken;
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('courses', CourseController::class);
    Route::post('courses/{course}/generate-qr', [CourseController::class, 'generateQrCode']);

    Route::post('attendance/check-in', [AttendanceController::class, 'checkIn']);
    Route::get('courses/{course}/attendance', [AttendanceController::class, 'getCourseAttendance']);
    Route::get('user/attendance', [AttendanceController::class, 'getUserAttendance']);
});
