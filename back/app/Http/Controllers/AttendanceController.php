<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    public function checkIn(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'qr_data' => 'required|string',
        ]);

        $qrData = json_decode($validated['qr_data'], true);

        if (!$qrData || !isset($qrData['course_id']) || $qrData['course_id'] != $validated['course_id']) {
            return response()->json(['error' => 'QR code invalide'], 400);
        }

        $course = Course::findOrFail($validated['course_id']);

        if (now() < $course->start_time || now() > $course->end_time) {
            return response()->json(['error' => 'Le cours n\'est pas en cours'], 400);
        }

        $existingAttendance = Attendance::where('course_id', $course->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingAttendance) {
            return response()->json(['error' => 'Vous avez déjà signé pour ce cours'], 400);
        }

        $attendance = Attendance::create([
            'course_id' => $course->id,
            'user_id' => Auth::id(),
            'check_in_time' => now(),
            'is_present' => true,
        ]);

        return response()->json($attendance, 201);
    }

    public function getCourseAttendance(Course $course)
    {
        $attendances = Attendance::with('user')
            ->where('course_id', $course->id)
            ->get();

        return response()->json($attendances);
    }

    public function getUserAttendance()
    {
        $attendances = Attendance::with('course')
            ->where('user_id', Auth::id())
            ->get();

        return response()->json($attendances);
    }
}
