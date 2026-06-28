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
        <!-- Google Fonts: loaded non-blocking via preload + onload swap,
             with a noscript fallback for JS-disabled clients. -->
        <link rel="preload" as="style"
              href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&family=Manrope:wght@600;700;800&display=swap"
              onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
        </noscript>

        <!-- Favicon -->
        <link rel="icon" href="/logo/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <!-- Shared Styles & Scripts (static assets in public/css/ and public/js/) -->
        <link rel="stylesheet" href="/css/shared.css">

        <!-- Sitewide Organization + WebSite JSON-LD, server-rendered so it is
             visible to crawlers/LLM bots that do not execute JavaScript
             (GPTBot, PerplexityBot, ClaudeBot, etc.) — GEO/LLMO/AISEO. -->
        <script type="application/ld+json" id="ayamil-sitewide-schema">
        {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": "https://ayamilcoders.com/#website",
                    "name": "Ayamil Coders",
                    "url": "https://ayamilcoders.com",
                    "publisher": { "@id": "https://ayamilcoders.com/#organization" }
                },
                {
                    "@type": "ProfessionalService",
                    "@id": "https://ayamilcoders.com/#organization",
                    "name": "Ayamil Coders",
                    "url": "https://ayamilcoders.com",
                    "logo": "https://ayamilcoders.com/logo/ac.jpg",
                    "foundingDate": "2023-07-21",
                    "founder": { "@type": "Person", "name": "Muhammad Muzamil" },
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
                    "areaServed": { "@type": "Place", "name": "Worldwide" },
                    "sameAs": [
                        "https://facebook.com/ayamilcoders",
                        "https://www.linkedin.com/company/ayamilcoders",
                        "https://www.instagram.com/ayamilcoders",
                        "https://www.fiverr.com/muzamil516"
                    ],
                    "knowsAbout": ["Web Development", "Blockchain Development", "AI Development", "Bug Fixing"],
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Ayamil Coders Services",
                        "itemListElement": [
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain Development" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Development" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bug Fixing" } }
                        ]
                    }
                }
            ]
        }
        </script>

        {{-- DON'T include individual page files here! --}}
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        
        <x-inertia::head>
            <title>{{ config('app.name', 'Ayamil Coders') }}</title>
        </x-inertia::head>
    </head>
    <body>
        <x-inertia::app />
        <!-- Shared JS loaded after body so DOM is available -->
        <script src="/js/shared.js" defer></script>
    </body>
</html>