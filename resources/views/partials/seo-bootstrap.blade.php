{{-- V27: HTTP-response metadata is usable without client JavaScript. --}}
@php
    $seoBootstrap = \App\Support\PublicSeo::forRequest(request());
    $seoPrivate = $seoBootstrap === null;
    $seoGraph = \App\Support\PublicSeo::organizationGraph();
@endphp
{{-- Sitewide entity schema stays present even when navigating from an
     authenticated Inertia page to a public page without a full reload. --}}
    <script type="application/ld+json" id="ayamil-sitewide-schema">{!! json_encode($seoGraph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>

@if($seoBootstrap)
    <script type="application/ld+json" id="ayamil-bootstrap-page-schema">{!! json_encode(\App\Support\PublicSeo::pageGraph($seoBootstrap), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
@endif
