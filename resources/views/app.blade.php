<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#060d1a" id="theme-meta">
    <meta name="color-scheme" content="dark">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&family=Manrope:wght@600;700;800&display=optional"
        onload="this.onload=null;this.rel='stylesheet'">

    <noscript>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&family=Manrope:wght@600;700;800&display=optional" rel="stylesheet">
    </noscript>

    <!-- Favicons -->
    <link rel="icon" href="/logo/favicon.ico?v=2026" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Shared CSS -->
    <!-- Deferred non-blocking load (matches the Google Fonts pattern above)
         so shared.css no longer blocks first paint (~630ms in PageSpeed).
         Paired with the critical-CSS shim below, which pins #sb/#tbar to
         their fixed positions from the very first frame — otherwise
         deferring this stylesheet would make the #tbar layout shift
         PageSpeed flagged (CLS 0.140) worse, not better. -->
    <link
        rel="preload"
        as="style"
        href="/css/shared.css"
        onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
        <link href="/css/shared.css" rel="stylesheet">
    </noscript>

    <!-- CRITICAL LAYOUT SHIM — keep in sync with shared.css.
         Only the positioning skeleton, not colors/decoration, so it's
         cheap to inline and safe to duplicate once shared.css loads.
         NOTE: verify these values (height, z-index) against the real
         rules in shared.css and adjust if they differ — this is a
         best-effort mirror written without that file in hand. -->
    <style>
        #sb{position:sticky;top:0;z-index:40}
        #tbar{position:fixed;left:0;right:0;bottom:0;z-index:40;
              padding-bottom:env(safe-area-inset-bottom,0px);
              min-height:64px;box-sizing:border-box}
    </style>

    <!-- JSON-LD -->
    @verbatim
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://ayamilcoders.com/#website",
          "name": "Ayamil Coders",
          "url": "https://ayamilcoders.com",
          "publisher": {
            "@id": "https://ayamilcoders.com/#organization"
          }
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://ayamilcoders.com/#organization",
          "name": "Ayamil Coders",
          "url": "https://ayamilcoders.com",
          "logo": "https://ayamilcoders.com/logo/ac-512.png",
          "foundingDate": "2023-07-21",
          "founder": {
            "@type": "Person",
            "name": "Muhammad Muzamil"
          },
          "employee": [
            {
              "@type": "Person",
              "name": "Hidden Partner",
              "jobTitle": "Chief Executive Officer",
              "description": "Ayamil Coders' CEO, known publicly as the Hidden Partner. Their real-world identity is intentionally kept private by company policy."
            }
          ],
          "email": "info@ayamilcoders.com",
          "telephone": "+92-312-759-2672",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sadiqabad",
            "addressRegion": "Punjab",
            "addressCountry": "PK"
          },
          "areaServed": {
            "@type": "Place",
            "name": "Worldwide"
          },
          "sameAs": [
            "https://facebook.com/ayamilcoders",
            "https://www.linkedin.com/company/ayamilcoders",
            "https://www.instagram.com/ayamilcoders",
            "https://www.fiverr.com/muzamil516"
          ],
          "knowsAbout": [
            "Web Development",
            "Blockchain Development",
            "AI Development",
            "Bug Fixing"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Ayamil Coders Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web Development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Blockchain Development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bug Fixing"
                }
              }
            ]
          }
        }
      ]
    }
    </script>
    @endverbatim

    @viteReactRefresh
    @vite([
        'resources/css/app.css',
        'resources/js/app.tsx'
    ])

    <x-inertia::head>
        <title>{{ config('app.name', 'Ayamil Coders') }}</title>
    </x-inertia::head>
</head>

<body class="font-sans antialiased">
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
        #wskel{position:fixed;inset:0;background:#060d1a;z-index:1;display:flex;flex-direction:column;overflow:hidden}
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
    <script>
        // Move the skeleton inside #app so React's mount (which replaces
        // #app's children) clears it automatically — no manual teardown,
        // no risk of it lingering if a route change is fast.
        (function(){
            var app = document.getElementById('app');
            var skel = document.getElementById('wskel');
            if (app && skel) app.appendChild(skel);
        })();
    </script>
    @endif

    <script src="/js/shared.js" defer></script>
</body>
</html>
