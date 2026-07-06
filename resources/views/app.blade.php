<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#060d1a" id="theme-meta">
    <meta name="color-scheme" content="dark">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- ══════════════════════════════════════════════════════════
         SELF-HOSTED FONTS (replaces Google Fonts CSS API)
         ══════════════════════════════════════════════════════════
         Previously this was a <link rel="preconnect"> pair to
         fonts.googleapis.com / fonts.gstatic.com + a synchronous
         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">.
         That created a 2-hop serial chain on the critical path:
         HTML -> googleapis.com CSS (~780ms) -> gstatic.com font file
         (~617ms) -> ~1.4s before a single font byte arrived, all of it
         blocking paint (PageSpeed's "Render-blocking requests" +
         "Network dependency tree" audits, ~1,730ms estimated savings).

         Self-hosting collapses that to one hop: the @font-face rule is
         inline in the HTML (no CSS file to fetch to find it), so the
         browser can start fetching the woff2 file immediately, in
         parallel with app.css/app.js, from the same origin (no extra
         DNS/TLS handshake to a third-party domain either).

         font-display:optional is preserved — this is what keeps CLS
         at 0. Because the rule is inline and parsed before first paint,
         the browser knows about it immediately regardless of network
         speed, same as before.

         SETUP REQUIRED (see chat for full steps):
         1. Download the actual .woff2 files Google serves for this
            font config (open the old Google Fonts CSS2 URL in a real
            Chrome tab -> View Page Source -> copy each url(...)).
         2. Place them at public/fonts/ with the filenames below
            (rename after downloading, Google's filenames are hashes).
         3. If Google served separate static files per weight instead
            of one variable file per family, replace the single
            @font-face block below with one block per weight, each
            pointing at its own file - same idea, just more blocks.
    -->
    <style>
        @font-face{font-family:'DM Sans';font-style:normal;font-weight:300 800;font-display:optional;src:url('/fonts/dm-sans.woff2') format('woff2')}
        @font-face{font-family:'DM Mono';font-style:normal;font-weight:400 500;font-display:optional;src:url('/fonts/dm-mono.woff2') format('woff2')}
        @font-face{font-family:'Manrope';font-style:normal;font-weight:600 800;font-display:optional;src:url('/fonts/manrope.woff2') format('woff2')}
    </style>

    <!-- Favicons -->
    <link rel="icon" href="/logo/favicon.ico?v=2026" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Shared CSS -->
    <!-- NOTE: this must stay render-blocking. It was briefly deferred to
         shave paint time, but shared.css defines the site-wide CSS custom
         properties (--font, --mono, --disp, theme colors, etc.) that
         nearly everything depends on. Deferring it meant text rendered in
         the browser's raw default font until it loaded, then jumped to
         the real font stack — a second, uncontrolled font-swap on top of
         the @font-face rule's own (already CLS-safe) display:optional
         handling above. That's what caused the 0.222 CLS regression. -->
    <link rel="stylesheet" href="/css/shared.css">

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