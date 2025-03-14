<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Scan Result</title>
    <script src="https://cdn.tailwindcss.com"></script>

</head>
<body class="flex items-center justify-center min-h-screen bg-gray-100">

    <!-- ✅ Success Page -->
    <div id="success-page" class="text-center p-8 bg-white shadow-lg rounded-lg border border-green-400">
        <h1 class="text-3xl font-bold text-green-600 opacity-0 animate-fade-in">Welcome!</h1>
        <p class="text-gray-600 mt-2">Your entry has been successfully scanned.</p>
        <button class="mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Button
        </button>
    </div>

    <!-- Tailwind Animations -->
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
    </style>

</body>
</html>