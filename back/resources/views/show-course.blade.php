<!DOCTYPE html>
<html>

<head>
    <title>QR Code du cours</title>
</head>

<body>
    <h1>QR Code du cours</h1>

    <img src="data:image/png;base64, {{ $course->qr_code }}" alt="QR Code">

</body>

</html>