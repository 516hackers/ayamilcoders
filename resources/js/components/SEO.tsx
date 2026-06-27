// resources/js/components/SEO.tsx

import { Head } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    schema?: object;
}

export default function SEO({ 
    title = 'Ayamil Coders - Web Development, Blockchain Development, AI Development & Bug Fixing',
    description = "Ayamil Coders is a Pakistan-based software house offering four core services: Web Development, Blockchain Development, AI Development, and Bug Fixing for clients worldwide.",
    keywords = 'web development, blockchain development, AI development, bug fixing service, software house Pakistan, debug code, smart contract developer',
    image = 'https://ayamilcoders.com/logo/ac.jpg',
    url = 'https://ayamilcoders.com',
    type = 'website',
    schema
}: SEOProps) {
    const fullTitle = title.includes('Ayamil Coders') ? title : `${title} - Ayamil Coders`;

    return (
        <Head>
            {/* Basic Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="author" content="Muhammad Muzamil - Ayamil Coders" />
            <meta name="geo.region" content="PK-PB" />
            <meta name="geo.placename" content="Sadiqabad, Punjab, Pakistan" />
            <link rel="canonical" href={url} />
            <link rel="sitemap" type="application/xml" title="Sitemap" href="https://ayamilcoders.com/sitemap.xml" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Ayamil Coders" />
            <meta property="og:locale" content="en_US" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            
            
            {/* JSON-LD for AI Search */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Head>
    );
}