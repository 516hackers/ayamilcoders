import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface PublicSeoData {
    title: string;
    description: string;
    canonical: string;
    robots: string;
    path: string;
    label: string;
}
interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string; // Legacy callers supported; Google does not use meta keywords.
    image?: string;
    url?: string;
    type?: string;
    schema?: object;
}
const ORIGIN = 'https://ayamilcoders.com';
const BRAND_IMAGE = `${ORIGIN}/logo/ac-512.png`;
const BRAND_ALT = 'Ayamil Coders brand identity';

export default function SEO({
    title = 'Ayamil Coders | Custom Software Development & Bug Fixing',
    description = 'Custom web, blockchain and AI software development and bug fixing from Ayamil Coders, Pakistan.',
    image = BRAND_IMAGE,
    url = ORIGIN + '/',
    type = 'website',
    schema,
}: SEOProps) {
    // Inertia shares the same metadata catalogue used for initial Laravel HTML.
    const page = usePage();
    const publicSeo = (page.props as { publicSeo?: PublicSeoData | null }).publicSeo;
    const pageTitle = publicSeo?.title || (title.includes('Ayamil Coders') ? title : `${title} | Ayamil Coders`);
    const pageDescription = publicSeo?.description || description;
    const canonical = publicSeo?.canonical || url;
    const robots = publicSeo?.robots || 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';

    useEffect(() => {
        // Keep server-rendered WebPage/BreadcrumbList schema synchronized
        // across Inertia navigation; otherwise SPA visits retain the old URL.
        if (publicSeo) {
            const items: Array<Record<string, unknown>> = [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            ];
            if (publicSeo.path !== '/') {
                items.push({ '@type': 'ListItem', position: 2, name: publicSeo.label, item: canonical });
            }
            let script = document.getElementById('ayamil-bootstrap-page-schema');
            if (!script) {
                script = document.createElement('script');
                script.id = 'ayamil-bootstrap-page-schema';
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                    { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: pageTitle,
                      description: pageDescription, inLanguage: 'en',
                      isPartOf: { '@id': `${ORIGIN}/#website` },
                      about: { '@id': `${ORIGIN}/#organization` } },
                    { '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: items },
                ],
            }).replace(/</g, '\\u003c');
        }
        // V28: Server Blade uses <x-inertia::head> SSR fallback. Inertia
        // owns/adopts the matching data-inertia keys without DOM removals.
    }, [publicSeo?.path, publicSeo?.label, canonical, pageTitle, pageDescription]);

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta head-key="description" name="description" content={pageDescription} />
            <meta head-key="robots" name="robots" content={robots} />
            <meta head-key="author" name="author" content="Ayamil Coders" />
            <link head-key="canonical" rel="canonical" href={canonical} />
            <meta head-key="og-type" property="og:type" content={type} />
            <meta head-key="og-site-name" property="og:site_name" content="Ayamil Coders" />
            <meta head-key="og-locale" property="og:locale" content="en_US" />
            <meta head-key="og-url" property="og:url" content={canonical} />
            <meta head-key="og-title" property="og:title" content={pageTitle} />
            <meta head-key="og-description" property="og:description" content={pageDescription} />
            <meta head-key="og-image" property="og:image" content={image} />
            <meta head-key="og-image-alt" property="og:image:alt" content={BRAND_ALT} />
            <meta head-key="twitter-card" name="twitter:card" content="summary" />
            <meta head-key="twitter-title" name="twitter:title" content={pageTitle} />
            <meta head-key="twitter-description" name="twitter:description" content={pageDescription} />
            <meta head-key="twitter-image" name="twitter:image" content={image} />
            <meta head-key="twitter-image-alt" name="twitter:image:alt" content={BRAND_ALT} />
            {schema && (
                <script head-key="page-jsonld" type="application/ld+json">
                    {JSON.stringify(schema).replace(/</g, '\\u003c')}
                </script>
            )}
        </Head>
    );
}
