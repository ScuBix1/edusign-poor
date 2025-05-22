<!DOCTYPE html>
<html>

<head>
    <title>QR Code du cours</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <h1>QR Code du cours</h1>

    <img id="qr-code" src="data:image/png;base64, {{ $qr_code }}" alt="QR Code">

    <script>
        function updateQrCode() {
            fetch(`/api/courses/{{ $course->id }}/qr-code`, {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    }
                })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('qr-code').src = `data:image/png;base64, ${data.qr_code}`;
                });
        }
        setInterval(updateQrCode, 4000);
    </script>
</body>

</html>