<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <!-- AYAMIL THEME V4: match public CSS and React appearance before first paint. -->
        <script>
        (function () {
            var html = document.documentElement;
            var mode = 'dark';
            try {
                var appearance = localStorage.getItem('appearance');
                var theme = localStorage.getItem('theme');
                if (appearance === 'dark' || appearance === 'light') mode = appearance;
                else if (appearance === 'system') mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                else if (theme === 'dark' || theme === 'light') mode = theme;
            } catch (_err) { /* Storage can be unavailable in privacy-restricted browsers. */ }
            html.setAttribute('data-theme', mode);
            html.classList.toggle('dark', mode === 'dark');
            html.style.colorScheme = mode;
        })();
        </script>
        <meta name="theme-color" content="#060d1a" id="theme-meta">
        <meta name="color-scheme" content="light dark">
        <script>
        /* Keep browser toolbar color in sync with the first-paint theme. */
        (function () {
            var meta = document.getElementById('theme-meta');
            if (meta) meta.setAttribute('content', document.documentElement.getAttribute('data-theme') === 'light' ? '#f8faff' : '#060d1a');
        })();
        </script>
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <!-- Google Fonts: loaded non-blocking via preload + onload swap,
             with a noscript fallback for JS-disabled clients.
             Using display=optional (not swap): on slow connections the
             browser keeps the fallback font instead of swapping fonts
             after first paint, which was causing a large layout shift
             (CLS ~0.95) when DM Sans/Manrope arrived late and reflowed
             the whole hero section. -->
        <link rel="preload" as="style"
              href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&family=Manrope:wght@600;700;800&display=optional"
              onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&family=Manrope:wght@600;700;800&display=optional" rel="stylesheet">
        </noscript>

        <!-- Favicon -->
        <link rel="icon" href="/logo/favicon.ico" sizes="any">
            <link rel="apple-touch-icon" href="/logo/apple-touch-icon.png">

        <!-- Shared Styles & Scripts (static assets in public/css/ and public/js/) -->
        <link rel="stylesheet" href="/css/shared.css?v=23-nav-footer">

        @include('partials.seo-bootstrap')

        {{-- DON'T include individual page files here! --}}
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        
        <x-inertia::head>
        @include('partials.seo-fallback')
    </x-inertia::head>
    </head>
    <body>
        <x-inertia::app />
        <!-- Shared JS loaded after body so DOM is available -->
        {{-- Legacy shared.js DOM effects are handled by AyamilLayout.tsx; avoid duplicate ticker, glow and scroll listeners. --}}
    </body>
</html>