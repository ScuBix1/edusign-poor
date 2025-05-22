<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index()
    {
        return Course::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:courses',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $course = Course::create($validated);

        // Générer un QR code unique pour le cours
        $qrData = [
            'course_id' => $course->id,
            'timestamp' => now()->timestamp,
            'token' => Str::random(32)
        ];

        $qrCode = QrCode::format('png')->size(300)->generate(json_encode($qrData));

        $base64 = base64_encode($qrCode);

        $course->update(['qr_code' => $base64]);

        return response()->json($course, 201);
    }

    public function show(Course $course)
    {
        return $course;
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|required|string|max:50|unique:courses,code,' . $course->id,
            'description' => 'nullable|string',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date|after:start_time',
        ]);

        $course->update($validated);
        return response()->json($course);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(null, 204);
    }

    public function deleteAttendances(Course $course)
    {
        $course->attendances()->delete();
        return response()->json(['message' => 'Toutes les présences ont été supprimées']);
    }
}
