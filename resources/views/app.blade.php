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

    <script src="/js/shared.js" defer></script>
</body>
</html>
