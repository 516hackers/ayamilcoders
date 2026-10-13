<?php

namespace App\Support;

use Illuminate\Http\Request;

/** Central, factual public-page SEO catalogue. No request-derived canonicals. */
final class PublicSeo
{
    public const ORIGIN = 'https://ayamilcoders.com';

    public static function pages(): array
    {
        return [
            '/' => ['title' => 'Ayamil Coders | Custom Software Development & Bug Fixing', 'description' => 'Ayamil Coders builds custom web applications, blockchain and AI solutions, and fixes software bugs. Based in Sadiqabad, Pakistan; serving clients worldwide.', 'label' => 'Home'],
            '/about' => ['title' => 'About Ayamil Coders | Our Story & Leadership', 'description' => 'Discover the story behind Ayamil Coders, from a shared vision in 2022 to its July 21, 2023 launch. Meet the CEO, the Hidden Partner, and our team.', 'label' => 'About Us'],
            '/services' => ['title' => 'Software Development Services | Ayamil Coders', 'description' => 'Explore custom web development, blockchain and smart contract solutions, AI integrations, and professional bug fixing from Ayamil Coders.', 'label' => 'Services'],
            '/solutions' => ['title' => 'Business Technology Solutions | Ayamil Coders', 'description' => 'Explore website bug fixing, search visibility, custom development, and practical software solutions built around business needs.', 'label' => 'Solutions'],
            '/top-it-company-sadiqabad' => ['title' => 'IT Company in Sadiqabad, Punjab | Ayamil Coders', 'description' => 'Ayamil Coders is based in Sadiqabad, Rahim Yar Khan, Punjab. Explore custom web development, AI integration, blockchain and debugging services.', 'label' => 'IT Company in Sadiqabad'],
            '/best-software-house-pakistan' => ['title' => 'Software House in Pakistan | Ayamil Coders', 'description' => 'Explore Ayamil Coders, a Pakistan-based software company offering custom web applications, blockchain development, AI integrations, and bug fixes.', 'label' => 'Software House in Pakistan'],
            '/benefits' => ['title' => 'Why Work With Ayamil Coders | Client Benefits', 'description' => 'Understand the working approach, support, communication and technical services offered by Ayamil Coders for custom software projects.', 'label' => 'Client Benefits'],
            '/careers' => ['title' => 'Careers & Opportunities | Ayamil Coders', 'description' => 'Explore career opportunities and information about working with Ayamil Coders, a software development company based in Sadiqabad, Pakistan.', 'label' => 'Careers'],
            '/contact' => ['title' => 'Contact Ayamil Coders | Software Project Inquiries', 'description' => 'Contact Ayamil Coders to discuss custom websites, Laravel and React development, blockchain projects, AI integration or bug fixing.', 'label' => 'Contact'],
            '/ceo' => ['title' => 'The Hidden Partner | CEO of Ayamil Coders', 'description' => 'Meet the Hidden Partner, Chief Executive Officer of Ayamil Coders. She suggested the Ayamil name; the company launched on her birthday, July 21, 2023.', 'label' => 'CEO — The Hidden Partner'],
            '/founder' => ['title' => 'Muhammad Muzamil | Founder of Ayamil Coders', 'description' => 'Learn about Muhammad Muzamil, founder and software developer behind Ayamil Coders, based in Sadiqabad, Punjab, Pakistan.', 'label' => 'Founder'],
            '/company-registration' => ['title' => 'Company Registration & Verification | Ayamil Coders', 'description' => 'Review the public company-registration information for AYAMIL CODERS (SMC-PRIVATE) LIMITED and available verification details.', 'label' => 'Company Registration'],
            '/updates' => ['title' => 'Development Updates & Changelog | Ayamil Coders', 'description' => 'Explore the Ayamil Coders development archive, version milestones and technical progress, with clearly labeled documentation sources.', 'label' => 'Updates & Changelog'],
            '/privacy-policy' => ['title' => 'Privacy Policy | Ayamil Coders', 'description' => 'Read how Ayamil Coders handles personal information, contact details, privacy requests and related website data.', 'label' => 'Privacy Policy'],
            '/terms' => ['title' => 'Terms and Conditions | Ayamil Coders', 'description' => 'Read the terms and conditions governing Ayamil Coders website use and software development engagements.', 'label' => 'Terms and Conditions'],
            '/refund-policy' => ['title' => 'Refund Policy | Ayamil Coders', 'description' => 'Review Ayamil Coders refund and project-payment terms, including relevant conditions and support channels.', 'label' => 'Refund Policy'],
            '/cookie-policy' => ['title' => 'Cookie Policy | Ayamil Coders', 'description' => 'Learn how Ayamil Coders uses cookies and related website technologies, and how visitor preferences can be managed.', 'label' => 'Cookie Policy'],
            '/disclaimer' => ['title' => 'Disclaimer | Ayamil Coders', 'description' => 'Read important scope, responsibility and informational disclaimers for Ayamil Coders content and services.', 'label' => 'Disclaimer'],
        ];
    }

    public static function forRequest(Request $request): ?array
    {
        $path = '/'.trim($request->path(), '/');
        if ($path === '//') $path = '/';
        $page = self::pages()[$path] ?? null;
        if ($page === null) return null;
        return [
            ...$page,
            'canonical' => self::ORIGIN.($path === '/' ? '/' : $path),
            'path' => $path,
            'robots' => 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
        ];
    }

    /** Is the request an authenticated or utility page, rather than a public document? */
    public static function privatePath(Request $request): bool
    {
        if (self::forRequest($request) !== null) return false;
        return true;
    }

    public static function organizationGraph(): array
    {
        $id = self::ORIGIN.'/#organization';
        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                ['@type' => 'WebSite', '@id' => self::ORIGIN.'/#website', 'url' => self::ORIGIN.'/', 'name' => 'Ayamil Coders', 'inLanguage' => 'en', 'publisher' => ['@id' => $id]],
                [
                    '@type' => ['Organization', 'ProfessionalService'], '@id' => $id,
                    'name' => 'Ayamil Coders', 'legalName' => 'AYAMIL CODERS (SMC-PRIVATE) LIMITED',
                    'url' => self::ORIGIN.'/',
                    'logo' => self::ORIGIN.'/logo/ac-512.png',
                    'foundingDate' => '2023-07-21',
                    'employee' => [['@type' => 'Person', 'name' => 'Hidden Partner', 'jobTitle' => 'Chief Executive Officer', 'url' => self::ORIGIN.'/ceo']],
                    'founder' => ['@type' => 'Person', 'name' => 'Muhammad Muzamil', 'url' => self::ORIGIN.'/founder'],
                    'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Sadiqabad', 'addressRegion' => 'Punjab', 'addressCountry' => 'PK'],
                    'areaServed' => ['@type' => 'Place', 'name' => 'Worldwide'],
                    'availableLanguage' => ['English', 'Urdu'],
                    'email' => 'info@ayamilcoders.com',
                    'telephone' => '+92-312-759-2672',
                    'sameAs' => ['https://www.facebook.com/ayamilcoders', 'https://www.linkedin.com/company/ayamilcoders', 'https://www.instagram.com/ayamilcoders'],
                    'knowsAbout' => ['Web Development','Laravel','React','Bug Fixing','Blockchain Development','Smart Contracts','AI Integrations'],
                    'hasOfferCatalog' => ['@type' => 'OfferCatalog', 'name' => 'Software Development Services', 'itemListElement' => [
                        ['@type' => 'OfferCatalog', 'name' => 'Custom Web Development', 'url' => self::ORIGIN.'/services'],
                        ['@type' => 'OfferCatalog', 'name' => 'Bug Fixing & Maintenance', 'url' => self::ORIGIN.'/services'],
                        ['@type' => 'OfferCatalog', 'name' => 'Blockchain Development', 'url' => self::ORIGIN.'/services'],
                        ['@type' => 'OfferCatalog', 'name' => 'AI Integration', 'url' => self::ORIGIN.'/services'],
                    ]],
                ],
            ],
        ];
    }

    public static function pageGraph(array $seo): array
    {
        $items = [
            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => self::ORIGIN.'/'],
        ];
        if ($seo['path'] !== '/') {
            $items[] = ['@type' => 'ListItem', 'position' => 2, 'name' => $seo['label'], 'item' => $seo['canonical']];
        }
        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                ['@type' => 'WebPage', '@id' => $seo['canonical'].'#webpage', 'url' => $seo['canonical'], 'name' => $seo['title'], 'description' => $seo['description'], 'inLanguage' => 'en', 'isPartOf' => ['@id' => self::ORIGIN.'/#website'], 'about' => ['@id' => self::ORIGIN.'/#organization']],
                ['@type' => 'BreadcrumbList', '@id' => $seo['canonical'].'#breadcrumb', 'itemListElement' => $items],
            ],
        ];
    }
}
