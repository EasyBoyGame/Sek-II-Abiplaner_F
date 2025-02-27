<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Scan Result</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-100">

    <!-- ❌ Failure Page -->
    <div id="error-page" class="text-center p-8 bg-white shadow-lg rounded-lg border border-red-400 animate-pulse-glow">
        <h1 class="text-3xl font-bold text-red-600">Invalid QR Code</h1>
    </div>

    <!-- Tailwind Animations -->
    <style>
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.4); }
            50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.7); }
        }
        .animate-pulse-glow {
            animation: pulseGlow 1.5s infinite;
        }
    </style>

</body>
</html>