<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AuthController;
use App\Models\User;
use App\Models\Course;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/test-token', function () {
    $user = User::first();
    return $user->createToken('test')->plainTextToken;
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('courses', CourseController::class);
    Route::delete('courses/{course}/attendances', [CourseController::class, 'deleteAttendances']);
    Route::post('attendance/check-in', [AttendanceController::class, 'checkIn']);
    Route::get('courses/{course}/attendance', [AttendanceController::class, 'getCourseAttendance']);
    Route::get('user/attendance', [AttendanceController::class, 'getUserAttendance']);
    Route::post('attendance/manual', [AttendanceController::class, 'markAttendanceManually']);
});

Route::get('/courses/{course}/qr-code', function (Course $course) {
    return response()->json([
        'qr_code' => $course->generateQrCode()
    ]);
});
