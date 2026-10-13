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

    <!-- Original public-site font request from the first Ayamil Coders homepage.
         Correct separate weights: DM Sans 300-800, Manrope 600/700/800, DM Mono 400/500.
         Keep the same original display=optional strategy (no replacement fonts). -->
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

    <!-- Favicons -->
    <link rel="icon" href="/logo/favicon.ico?v=2026" sizes="any">
    <link rel="apple-touch-icon" href="/logo/apple-touch-icon.png">

    <!-- Shared tokens and styling load before content to prevent layout/theme flash. -->
    <link rel="stylesheet" href="/css/shared.css?v=23-nav-footer">

    @php
        // Shared with both included SEO partials; each Blade include has its own scope.
        $seoBootstrap = \App\Support\PublicSeo::forRequest(request());
    @endphp

    @include('partials.seo-bootstrap')

    @viteReactRefresh
    @vite([
        'resources/css/app.css',
        'resources/js/app.tsx'
    ])

    <x-inertia::head>
        @include('partials.seo-fallback')
    </x-inertia::head>
</head>

    @php
        // The original public Blade root used <body> without Tailwind font-sans.
        // Authenticated views keep their existing Tailwind typography.
        $ayamilPublicSite = request()->routeIs('home', 'about', 'services', 'contact', 'careers', 'privacy-policy', 'terms', 'refund-policy', 'cookie-policy', 'disclaimer', 'ceo', 'founder', 'sadiqabad-it-company', 'solutions', 'benefits', 'updates', 'best-software-house-pakistan', 'company-registration');
    @endphp
    <body class="{{ $ayamilPublicSite ? 'antialiased' : 'font-sans antialiased' }}">
    <x-inertia::app />

    {{-- ═══════════ HOMEPAGE SKELETON ═══════════
         Only for '/', shown the instant the raw HTML paints — before the
         JS bundle even starts loading — and automatically cleared the
         moment React mounts real content into #app (mounting replaces the
         container's children, no manual removal needed). Mirrors the real
         hero layout instead of a generic spinner/progress bar. Styled
         inline and self-contained so it renders correctly even before
         shared.css has loaded. --}}
    @if(request()->is('/'))
    <style>
        #wskel{pointer-events:none;position:fixed;inset:0;background:#060d1a;z-index:1;display:flex;flex-direction:column;overflow:hidden}
        /* Unlike V5, the pre-React skeleton honors the saved light mode. */
        html[data-theme="light"] #wskel{background:#f8faff}
        html[data-theme="light"] .wskel-b{background:linear-gradient(90deg,#e9f0fb,#d9e5f5,#e9f0fb)}
        #wskel *{box-sizing:border-box}
        @keyframes wskel-pulse{0%,100%{opacity:.55}50%{opacity:1}}
        .wskel-b{background:linear-gradient(90deg,rgba(148,163,184,.09),rgba(148,163,184,.16),rgba(148,163,184,.09));background-size:200% 100%;border-radius:8px;animation:wskel-pulse 1.6s ease-in-out infinite}
        #wskel-topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;flex-shrink:0}
        #wskel-topbar .wskel-b:first-child{width:130px;height:26px;border-radius:9px}
        #wskel-topbar .wskel-b:last-child{width:38px;height:38px;border-radius:11px}
        #wskel-body{flex:1;padding:28px 20px;display:flex;flex-direction:column;align-items:center;text-align:center}
        #wskel-badge{width:190px;height:24px;border-radius:999px;margin-bottom:22px}
        .wskel-h{height:34px;border-radius:9px;margin-bottom:10px}
        #wskel-h1{width:72%}
        #wskel-h2{width:58%}
        #wskel-h3{width:45%}
        #wskel-sub1{width:80%;height:13px;margin-top:16px;border-radius:6px}
        #wskel-sub2{width:60%;height:13px;margin-top:8px;border-radius:6px;margin-bottom:24px}
        #wskel-btns{display:flex;gap:10px;margin-bottom:36px}
        #wskel-btns .wskel-b:first-child{width:132px;height:42px;border-radius:12px}
        #wskel-btns .wskel-b:last-child{width:112px;height:42px;border-radius:12px}
        #wskel-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:100%;max-width:360px}
        .wskel-stat{display:flex;flex-direction:column;align-items:center;gap:6px}
        .wskel-stat .wskel-b:first-child{width:38px;height:20px;border-radius:6px}
        .wskel-stat .wskel-b:last-child{width:50px;height:9px;border-radius:5px}
        @media(min-width:640px){ #wskel{display:none} }
    </style>
    <div id="wskel" aria-hidden="true">
        <div id="wskel-topbar">
            <div class="wskel-b"></div>
            <div class="wskel-b"></div>
            <div class="wskel-b"></div>
        </div>
        <div id="wskel-body">
            <div id="wskel-badge" class="wskel-b"></div>
            <div id="wskel-h1" class="wskel-h wskel-b"></div>
            <div id="wskel-h2" class="wskel-h wskel-b"></div>
            <div id="wskel-h3" class="wskel-h wskel-b"></div>
            <div id="wskel-sub1" class="wskel-b"></div>
            <div id="wskel-sub2" class="wskel-b"></div>
            <div id="wskel-btns">
                <div class="wskel-b"></div>
                <div class="wskel-b"></div>
            </div>
            <div id="wskel-stats">
                <div class="wskel-stat"><div class="wskel-b"></div><div class="wskel-b"></div></div>
                <div class="wskel-stat"><div class="wskel-b"></div><div class="wskel-b"></div></div>
                <div class="wskel-stat"><div class="wskel-b"></div><div class="wskel-b"></div></div>
                <div class="wskel-stat"><div class="wskel-b"></div><div class="wskel-b"></div></div>
            </div>
        </div>
    </div>
    {{-- The skeleton is deliberately a SIBLING of #app, never a child.
         React/Inertia must be the only owner of the hydrated #app subtree.
         AyamilLayout removes #wskel after mounting, including StrictMode. --}}
    @endif

    {{-- Legacy shared.js DOM effects are handled by AyamilLayout.tsx; avoid duplicate ticker, glow and scroll listeners. --}}
</body>
</html>