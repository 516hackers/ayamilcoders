{{-- V28: output only when Inertia SSR is unavailable. SSR Head owns metadata otherwise. --}}
@if(isset($seoBootstrap) && is_array($seoBootstrap))
    <title>{{ $seoBootstrap['title'] }}</title>
    <meta data-inertia="description" name="description" content="{{ $seoBootstrap['description'] }}">
    <meta data-inertia="robots" name="robots" content="{{ $seoBootstrap['robots'] }}">
    <meta data-inertia="author" name="author" content="Ayamil Coders">
    <link data-inertia="canonical" rel="canonical" href="{{ $seoBootstrap['canonical'] }}">
    <meta data-inertia="og-type" property="og:type" content="website">
    <meta data-inertia="og-site-name" property="og:site_name" content="Ayamil Coders">
    <meta data-inertia="og-locale" property="og:locale" content="en_US">
    <meta data-inertia="og-title" property="og:title" content="{{ $seoBootstrap['title'] }}">
    <meta data-inertia="og-description" property="og:description" content="{{ $seoBootstrap['description'] }}">
    <meta data-inertia="og-url" property="og:url" content="{{ $seoBootstrap['canonical'] }}">
    <meta data-inertia="og-image" property="og:image" content="https://ayamilcoders.com/logo/ac-512.png">
    <meta data-inertia="og-image-alt" property="og:image:alt" content="Ayamil Coders brand identity">
    <meta data-inertia="twitter-card" name="twitter:card" content="summary">
    <meta data-inertia="twitter-title" name="twitter:title" content="{{ $seoBootstrap['title'] }}">
    <meta data-inertia="twitter-description" name="twitter:description" content="{{ $seoBootstrap['description'] }}">
    <meta data-inertia="twitter-image" name="twitter:image" content="https://ayamilcoders.com/logo/ac-512.png">
    <meta data-inertia="twitter-image-alt" name="twitter:image:alt" content="Ayamil Coders brand identity">
@else
    <meta name="robots" content="noindex,nofollow,noarchive">
@endif
