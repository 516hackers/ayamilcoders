/**
 * resources/js/pages/Welcome.tsx
 *
 * Ayamil Coders — Home Page
 * SEO-optimised, real content, no dummy data, no testimonials.
 * Sections: Hero → Stats → Services → About → Process → Team → Contact
 *
 * Mobile: portal-mounted #mscr (4 tabs: Home / Services / About / Contact)
 * Desktop: .welcome-desktop wrapper (hidden on ≤639 px via CSS)
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SEO from '@/components/SEO';

/* ─────────────────────────────────────────────
   SEO HEAD HELPER
   Injects <title>, <meta description>, canonical,
   Open Graph, Twitter Card, JSON-LD on mount and
   cleans up on unmount.
───────────────────────────────────────────── */
function SeoHead() {
    useEffect(() => {
        const prev = {
            title: document.title,
            desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
        };

        document.title =
            'Ayamil Coders | Web, Blockchain & AI Development + Bug Fixing — Software House Pakistan';

        const setMeta = (sel: string, attr: string, val: string) => {
            let el = document.querySelector(sel) as HTMLMetaElement | null;
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr === 'content' ? 'name' : 'property',
                    sel.replace(/.*["']([^"']+)["'].*/, '$1'));
                document.head.appendChild(el);
                el.dataset.injected = '1';
            }
            el.setAttribute('content', val);
        };

        const DESC =
            'Ayamil Coders is a Pakistan-based software house in Sadiqabad, Punjab offering four core services: ' +
            'Web Development (React, Laravel, Node.js), Blockchain Development (Solidity smart contracts, DeFi, NFT), ' +
            'AI Development (machine learning, automation, OpenAI integrations), and professional Bug Fixing for existing ' +
            'websites, apps and codebases. Trusted by 50+ international clients since July 2023.';

        setMeta('meta[name="description"]', 'content', DESC);
        setMeta('meta[name="keywords"]', 'content',
            'software house Pakistan, web development company, blockchain development services, smart contract developer, ' +
            'AI development company, bug fixing service, fix website bugs, debug code online, React Laravel Node.js developers, ' +
            'Solidity DeFi NFT development, Sadiqabad Punjab, Ayamil Coders');
        setMeta('meta[name="robots"]', 'content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        setMeta('meta[name="author"]', 'content', 'Ayamil Coders');
        setMeta('meta[name="geo.region"]', 'content', 'PK-PB');
        setMeta('meta[name="geo.placename"]', 'content', 'Sadiqabad, Punjab, Pakistan');
        setMeta('meta[property="og:title"]', 'content',
            'Ayamil Coders | Web, Blockchain & AI Development + Bug Fixing');
        setMeta('meta[property="og:description"]', 'content', DESC);
        setMeta('meta[property="og:type"]', 'content', 'website');
        setMeta('meta[property="og:url"]', 'content', 'https://ayamilcoders.com');
        setMeta('meta[property="og:site_name"]', 'content', 'Ayamil Coders');
        setMeta('meta[property="og:locale"]', 'content', 'en_US');
        setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        setMeta('meta[name="twitter:title"]', 'content',
            'Ayamil Coders | Web, Blockchain & AI Development + Bug Fixing');
        setMeta('meta[name="twitter:description"]', 'content', DESC);

        // Canonical
        let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!canon) {
            canon = document.createElement('link');
            canon.rel = 'canonical';
            canon.dataset.injected = '1';
            document.head.appendChild(canon);
        }
        canon.href = 'https://ayamilcoders.com';

        // JSON-LD structured data — ProfessionalService + service catalog
        // (used by Google rich results, AI Overviews, and LLM answer engines like
        // ChatGPT/Perplexity/Gemini for GEO/AEO/LLMO discoverability)
        const orgScript = document.createElement('script');
        orgScript.type = 'application/ld+json';
        orgScript.dataset.injected = '1';
        orgScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': 'https://ayamilcoders.com/#organization',
            name: 'Ayamil Coders',
            alternateName: 'Ayamil Coders Software House',
            url: 'https://ayamilcoders.com',
            logo: 'https://ayamilcoders.com/logo.png',
            image: 'https://ayamilcoders.com/logo.png',
            foundingDate: '2023-07-21',
            founders: [{ '@type': 'Person', name: 'Muhammad Muzamil' }],
            employee: [
                {
                    '@type': 'Person',
                    name: 'Hidden Partner',
                    jobTitle: 'Chief Executive Officer',
                    description: "Ayamil Coders' CEO, known publicly as the Hidden Partner. Their real-world identity is intentionally kept private by company policy.",
                },
            ],
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sadiqabad',
                addressRegion: 'Punjab',
                addressCountry: 'PK',
            },
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+92-312-759-2672',
                email: 'info@ayamilcoders.com',
                contactType: 'customer service',
                availableLanguage: ['English', 'Urdu'],
            },
            sameAs: [
                'https://facebook.com/ayamilcoders',
                'https://www.fiverr.com/muzamil516',
            ],
            description:
                'Pakistan-based software house offering Web Development, Blockchain Development, AI Development, and Bug Fixing services to clients worldwide.',
            slogan: 'Web Development, Blockchain Development, AI Development & Bug Fixing — Done Right.',
            priceRange: '$$',
            serviceArea: { '@type': 'Place', name: 'Worldwide' },
            areaServed: { '@type': 'Place', name: 'Worldwide' },
            knowsAbout: [
                'Web Development', 'React', 'Laravel', 'Node.js', 'WordPress',
                'Blockchain Development', 'Solidity', 'Smart Contracts', 'DeFi', 'NFT', 'Web3.js',
                'AI Development', 'Machine Learning', 'Python', 'TensorFlow', 'OpenAI API Integration',
                'Bug Fixing', 'Debugging', 'Code Review', 'Website Maintenance', 'Software QA',
            ],
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Ayamil Coders Services',
                itemListElement: [
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Web Development',
                            description: 'Custom, scalable web applications built with React, Laravel and Node.js.',
                            serviceType: 'Web Development',
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Blockchain Development',
                            description: 'DeFi platforms, NFT marketplaces, and audited Solidity smart contracts on EVM-compatible chains.',
                            serviceType: 'Blockchain Development',
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'AI Development',
                            description: 'Machine learning models, automation pipelines, and OpenAI-powered SaaS tools.',
                            serviceType: 'AI Development',
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Bug Fixing',
                            description: 'Fast, reliable debugging and bug-fixing for existing websites, apps, and codebases.',
                            serviceType: 'Bug Fixing',
                        },
                    },
                ],
            },
        });
        document.head.appendChild(orgScript);

        // FAQPage JSON-LD — feeds Google "People Also Ask" and is heavily
        // weighted by AI answer engines (AEO/GEO) when summarising who does what.
        const faqScript = document.createElement('script');
        faqScript.type = 'application/ld+json';
        faqScript.dataset.injected = '1';
        faqScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'What services does Ayamil Coders offer?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ayamil Coders offers four core services: Web Development (React, Laravel, Node.js), Blockchain Development (Solidity smart contracts, DeFi, NFT), AI Development (machine learning and automation), and Bug Fixing for existing websites, apps, and codebases.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'Where is Ayamil Coders located?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ayamil Coders is headquartered in Sadiqabad, Punjab, Pakistan, and works fully remote with clients in 20+ countries worldwide.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'Does Ayamil Coders fix bugs in existing projects?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Bug Fixing is one of Ayamil Coders\' four core services, covering debugging, code review, performance issues, and website or app maintenance for projects built by any team.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'When was Ayamil Coders founded?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ayamil Coders was founded on July 21, 2023 by Muhammad Muzamil and has since delivered 600+ projects for 50+ international clients.',
                    },
                },
            ],
        });
        document.head.appendChild(faqScript);

        return () => {
            document.title = prev.title;
            document.querySelectorAll('[data-injected="1"]').forEach(el => el.remove());
            const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
            if (descEl) descEl.content = prev.desc;
        };
    }, []);

    return null;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
    {
        id: 'web', cls: 'ib', labelColor: 'var(--blue-lt)', label: 'Web',
        title: 'Web Development',
        desc: 'Custom, scalable web applications built with React, Laravel & Node.js — fast, secure, and production-ready.',
        tags: [['tb', 'React'], ['tb', 'Laravel'], ['tb', 'Node.js'], ['tb', 'WordPress']],
        icon: (
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        ),
    },
    {
        id: 'bc', cls: 'ip', labelColor: '#a78bfa', label: 'Web3',
        title: 'Blockchain Development',
        desc: 'End-to-end DeFi platforms, NFT marketplaces, and audited Solidity smart contracts on EVM-compatible chains.',
        tags: [['tp', 'Solidity'], ['tp', 'DeFi'], ['tp', 'NFT'], ['tp', 'Web3.js']],
        icon: (
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
        ),
    },
    {
        id: 'ai', cls: 'ig', labelColor: '#34d399', label: 'AI/ML',
        title: 'AI Development',
        desc: 'Intelligent automation pipelines, ML models, OpenAI integrations, and custom SaaS tools that scale with your business.',
        tags: [['tg', 'Python'], ['tg', 'TensorFlow'], ['tg', 'OpenAI'], ['tg', 'Automation']],
        icon: (
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        ),
    },
    {
        id: 'bug', cls: 'ia', labelColor: '#fbbf24', label: 'Bug Fixing',
        title: 'Bug Fixing',
        desc: 'Fast, reliable debugging for any web, mobile, blockchain, or AI codebase — root-cause fixes, not band-aids.',
        tags: [['ta', 'Debugging'], ['ta', 'Code Review'], ['ta', 'Performance'], ['ta', 'Maintenance']],
        icon: (
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
                <path d="M9 9l-2 2v6l2 2M15 9l2 2v6l-2 2M12 4v3M9 12h6M12 7a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0v-4a3 3 0 0 0-3-3z"/>
            </svg>
        ),
    },
];

const PROCESS_STEPS = [
    { num: 1, title: 'Consult', desc: 'Free discovery call to understand your goals, budget, and requirements.', cls: 'ib' },
    { num: 2, title: 'Plan',    desc: 'Detailed project roadmap, tech stack selection, and milestone schedule.', cls: 'ip' },
    { num: 3, title: 'Design',  desc: 'Technical architecture and solution design reviewed and approved by you before coding.', cls: 'ig' },
    { num: 4, title: 'Develop', desc: 'Agile sprints with weekly demos — clean, documented, secure code throughout.', cls: 'ia' },
    { num: 5, title: 'Test',    desc: 'End-to-end QA, security audits, performance benchmarking, and bug fixes.', cls: 'ib' },
    { num: 6, title: 'Deploy',  desc: 'Live deployment, monitoring setup, and ongoing support & maintenance.', cls: 'ip' },
];

const TEAM = [
    {
        initials: 'MM', name: 'Muhammad Muzamil', role: 'Founder',
        roleColor: 'var(--blue-lt)',
        bg: 'linear-gradient(135deg,#0b2d6e,#1248a8,#2979f2)',
        avatarBg: 'linear-gradient(135deg,#0d2f8c,#2979f2,#5a9af5)',
        badgeCls: 'ib',
        desc: 'Visionary founder who built Ayamil Coders to deliver world-class digital solutions to clients across 50+ countries.',
    },
    {
        initials: '?', name: 'Hidden Partner', role: 'Chief Executive Officer',
        roleColor: '#a78bfa',
        bg: 'linear-gradient(135deg,#2d1b69,#5b21b6,#7c3aed)',
        avatarBg: 'linear-gradient(135deg,#3d1a78,#7c3aed,#a78bfa)',
        badgeCls: 'ip',
        desc: 'Driving operations, client strategy, and team growth — ensuring every project exceeds expectations on time and budget.',
    },
    {
        initials: 'ZA', name: 'Zunaira Asif', role: 'Chief Technology Officer',
        roleColor: '#34d399',
        bg: 'linear-gradient(135deg,#064e3b,#065f46,#059669)',
        avatarBg: 'linear-gradient(135deg,#04432c,#059669,#34d399)',
        badgeCls: 'ig',
        desc: 'Architecting robust, scalable systems across web, blockchain, and AI — the technical backbone of every Ayamil project.',
    },
    {
        initials: 'ZA', name: 'Zayan Ali', role: 'Chief Operating Officer',
        roleColor: '#fbbf24',
        bg: 'linear-gradient(135deg,#78350f,#92400e,#d97706)',
        avatarBg: 'linear-gradient(135deg,#78350f,#d97706,#fbbf24)',
        badgeCls: 'ia',
        desc: 'Streamlining workflows, client communication, and delivery pipelines to keep every engagement smooth and on schedule.',
    },
];

const STATS_DESKTOP = [
    { n: 600,  suffix: '+', label: 'Projects',            sub: 'Delivered Globally',      counter: true },
    { n: 2000, suffix: '+', label: 'Issues Solved',       sub: 'Bugs Fixed',              counter: true },
    { n: 10,   suffix: '+', label: 'Years Experience',    sub: 'Combined Expertise',      counter: true },
    { n: 50,   suffix: '+', label: 'International Clients', sub: '20+ Countries Served',  counter: true },
    { n: 87,   suffix: '%', label: 'Satisfaction Rate',   sub: 'Client Retention',        counter: false, display: '87%' },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Welcome() {
    const [currentTab, setCurrentTab] = useState(0);
    const [openSvc, setOpenSvc] = useState<Set<string>>(new Set());
    const currentTabRef = useRef(0);
    const openSvcRef    = useRef<Set<string>>(new Set());

    useEffect(() => { currentTabRef.current = currentTab; }, [currentTab]);
    useEffect(() => { openSvcRef.current = openSvc; },      [openSvc]);

    /* ── PAGE-SPECIFIC CSS ── */
    useEffect(() => {
        const existingStyle = document.getElementById('welcome-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'welcome-page-css';
        style.textContent = `
            /* ── Hero ── */
            .hero-blob{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;animation:floatY 8s ease-in-out infinite}
            .hh1{font-size:clamp(38px,5.5vw,68px);font-family:var(--disp);font-weight:800;line-height:1.05;letter-spacing:-.03em;margin-bottom:18px}
            .hdesc{font-size:15px;line-height:1.8;color:var(--txt2);max-width:460px;margin-left:auto;margin-bottom:26px}
            @media(max-width:1023px){.hdesc{margin-left:0}}
            .hbtns{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
            @media(max-width:1023px){.hbtns{justify-content:flex-start}}
            .hbadges{display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end;margin-top:26px;padding-top:22px;border-top:1px solid var(--brd)}
            @media(max-width:1023px){.hbadges{justify-content:flex-start}}
            .hbadge{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--txt3);font-weight:500}

            /* ── Code card ── */
            .cc{position:relative;border-radius:20px;overflow:hidden;background:var(--code-bg);border:1px solid rgba(41,121,242,.2);box-shadow:0 20px 64px rgba(41,121,242,.12);animation:floatY 6s ease-in-out infinite}
            .cc-top{display:flex;align-items:center;gap:5px;padding:11px 16px;background:rgba(255,255,255,.02);border-bottom:1px solid var(--brd)}
            .cc-dot{width:11px;height:11px;border-radius:50%;flex-shrink:0}
            .cc-fn{margin-left:8px;font-family:var(--mono);font-size:12px;color:var(--txt3)}
            .cc-body{padding:22px;font-family:var(--mono);font-size:13px;line-height:2}
            .cc-sb{padding:8px 16px;background:rgba(41,121,242,.06);border-top:1px solid var(--brd);display:flex;align-items:center;gap:12px}
            .tk{color:#79b8ff}.tf{color:#85e89d}.ts{color:#9ecbff}.tn{color:#ffab70}.tc{color:#4d6a90;font-style:italic}.to{color:#f97583}.tv{color:#cdd9e5}
            [data-theme="light"] .tk{color:#0550ae}[data-theme="light"] .tf{color:#116329}[data-theme="light"] .ts{color:#0a3069}[data-theme="light"] .tn{color:#953800}[data-theme="light"] .tc{color:#8b949e}[data-theme="light"] .to{color:#cf222e}[data-theme="light"] .tv{color:#1f2328}

            /* ── Stats grid ── */
            .sgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;padding:40px 60px}
            @media(max-width:1279px){.sgrid{padding:40px;grid-template-columns:repeat(3,1fr)}}
            @media(max-width:1023px){.sgrid{padding:32px;grid-template-columns:repeat(3,1fr)}}
            @media(max-width:767px){.sgrid{grid-template-columns:repeat(2,1fr);padding:28px 24px}}
            .sc{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:22px 18px;text-align:center;transition:all .3s}
            .sc:hover{border-color:var(--brd2);background:var(--card-hov);transform:translateY(-3px)}
            .sn{font-family:var(--disp);font-weight:800;font-size:32px;background:linear-gradient(135deg,var(--txt),var(--blue-lt));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
            .su{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--txt3);margin:5px 0}
            .sd{height:1px;background:linear-gradient(90deg,transparent,rgba(41,121,242,.3),transparent);margin:10px 0}
            .sl{font-size:12px;color:var(--txt3)}

            /* ── Services ── */
            .svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
            @media(max-width:767px){.svc-grid{grid-template-columns:1fr}}
            .svc-c{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:22px;display:flex;flex-direction:row-reverse;gap:18px;align-items:flex-start;transition:all .35s}
            .svc-c:hover{border-color:var(--brd2);background:var(--card-hov);box-shadow:0 12px 40px rgba(41,121,242,.08);transform:translateY(-4px)}
            .svc-c:hover .i3{transform:perspective(400px) rotateX(-10deg) rotateY(10deg) translateZ(4px) scale(1.1)}

            /* ── About ── */
            .ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
            @media(max-width:1023px){.ab-grid{grid-template-columns:1fr;gap:36px}}
            .mosaic{display:grid;grid-template-columns:1fr 1fr;gap:12px}
            .m-big{grid-column:span 1;grid-row:span 2;background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:26px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transition:all .3s}
            .m-big:hover{border-color:var(--brd2);transform:translateY(-3px)}
            .m-sm{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:18px;text-align:center;transition:all .3s}
            .m-sm:hover{border-color:var(--brd2);transform:translateY(-2px)}
            .m-bars{grid-column:span 2;background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:18px}
            .br{margin-bottom:13px}.br:last-child{margin-bottom:0}
            .br-h{display:flex;justify-content:space-between;font-size:12px;margin-bottom:7px}
            .bt{height:5px;background:rgba(128,128,128,.12);border-radius:99px;overflow:hidden}
            .bf{height:100%;border-radius:99px;width:0;transition:width 1.5s cubic-bezier(.34,1.56,.64,1)}
            .bf-b{background:linear-gradient(90deg,var(--blue-dk),var(--cyan))}
            .bf-p{background:linear-gradient(90deg,#5b21b6,#a78bfa)}
            .bf-g{background:linear-gradient(90deg,#059669,#34d399)}
            .bf-a{background:linear-gradient(90deg,#92400e,#fbbf24)}
            .ck-list{list-style:none;display:flex;flex-direction:column;gap:9px;margin-bottom:24px}
            .ck-i{display:flex;align-items:center;justify-content:flex-end;gap:10px;font-size:14px;color:var(--txt2)}
            @media(max-width:1023px){.ck-i{justify-content:flex-start}}
            .ck-icon{width:22px;height:22px;border-radius:50%;background:rgba(41,121,242,.12);border:1px solid rgba(41,121,242,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;color:var(--blue-lt);font-family:var(--mono)}

            /* ── Process ── */
            .proc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
            @media(max-width:1023px){.proc-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.proc-grid{grid-template-columns:1fr}}
            .proc-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:22px;transition:all .3s;position:relative;overflow:hidden}
            .proc-card:hover{border-color:var(--brd2);transform:translateY(-3px);box-shadow:0 12px 32px rgba(41,121,242,.08)}
            .proc-num{font-family:var(--disp);font-weight:800;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--txt3);margin-bottom:10px;font-family:var(--mono)}
            .proc-t{font-family:var(--disp);font-weight:700;font-size:16px;color:var(--txt);margin-bottom:8px}
            .proc-d{font-size:13px;color:var(--txt3);line-height:1.7}

            /* ── Team ── */
            .tgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
            @media(max-width:1279px){.tgrid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.tgrid{grid-template-columns:1fr}}
            .tc-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);overflow:hidden;transition:all .35s}
            .tc-card:hover{border-color:var(--brd2);transform:translateY(-4px);box-shadow:0 14px 44px rgba(41,121,242,.1)}
            .tc-h{height:110px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
            .tc-av{width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:17px;color:#fff;position:relative;z-index:1;transition:transform .3s;box-shadow:0 8px 24px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.2)}
            .tc-card:hover .tc-av{transform:scale(1.07)}
            .tc-badge{position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:var(--green);border:2px solid var(--bg2);display:flex;align-items:center;justify-content:center;font-size:9px}
            .tc-b{padding:16px}

            /* ── Contact ── */
            .cgrid{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start}
            @media(max-width:1023px){.cgrid{grid-template-columns:1fr;gap:36px}}
            .ci{display:flex;align-items:center;gap:14px;transition:all .2s}.ci:hover{transform:translateX(-4px)}
            @media(max-width:1023px){.ci:hover{transform:translateX(4px)}}
            .fc{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:26px}

            /* ── Mobile-specific ── */
            .mc-el{background:var(--bg2);border:1px solid var(--brd);border-radius:var(--r-xl)}
            .app-hero{margin:0 16px;padding:22px;background:linear-gradient(135deg,rgba(18,72,168,.9),rgba(41,121,242,.8));border-radius:var(--r-xl);border:1px solid rgba(41,121,242,.3);overflow:hidden;position:relative}
            .app-hero::before{content:'';position:absolute;top:-30px;right:-30px;width:160px;height:160px;border-radius:50%;background:rgba(0,200,232,.12);filter:blur(30px);pointer-events:none}
            .sg2{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:16px}
            .sac{background:var(--bg2);border:1px solid var(--brd);border-radius:var(--r-lg);padding:16px;text-align:center}
            .san{font-family:var(--disp);font-weight:800;font-size:22px;background:linear-gradient(135deg,var(--txt),var(--blue-lt));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
            .sal{font-size:11px;color:var(--txt2);font-family:var(--mono);margin-top:4px}
            .srow{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg2);border:1px solid var(--brd);border-radius:var(--r-lg);margin-bottom:10px;cursor:pointer}
            .srow-ico{width:48px;height:48px;border-radius:14px;flex-shrink:0}
            .srow-t{font-family:var(--disp);font-weight:700;font-size:14px;color:var(--txt);margin-bottom:3px}
            .srow-d{font-size:12px;color:var(--txt2);line-height:1.45}
            .srow-arr{color:var(--txt3);flex-shrink:0;margin-left:auto}
            .sdet{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.4,0,.2,1),padding .3s;padding:0 16px}
            .sdet.open{max-height:200px;padding:12px 16px}
            .sdet-arr{transition:transform .3s}
            .msh{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
            .msh-t{font-family:var(--disp);font-weight:700;font-size:17px;color:var(--txt)}
            .msh-a{font-size:12px;color:var(--blue-lt);cursor:pointer;font-weight:600}
            .ptl{padding:0 16px}
            .pt-i{display:flex;gap:16px;padding-bottom:22px;position:relative}
            .pt-i:last-child{padding-bottom:0}
            .pt-l{display:flex;flex-direction:column;align-items:center}
            .pt-ico{width:48px;height:48px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
            .pt-line{flex:1;width:2px;background:linear-gradient(180deg,rgba(41,121,242,.4),rgba(41,121,242,.05));margin-top:6px;border-radius:2px}
            .pt-i:last-child .pt-line{display:none}
            .pt-body{padding-top:10px;flex:1}
            .pt-t{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt);margin-bottom:4px}
            .pt-d{font-size:13px;color:var(--txt3);line-height:1.6}
            .hss{display:flex;overflow-x:auto;gap:12px;padding:0 16px 8px;scroll-snap-type:x mandatory;scrollbar-width:none}
            .hss::-webkit-scrollbar{display:none}
            .hss-i{flex-shrink:0;scroll-snap-align:start}
            .tmc{background:var(--bg2);border:1px solid var(--brd);border-radius:var(--r-xl);overflow:hidden;margin-bottom:12px}
            .tmc-h{height:90px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
            .tmc-av{width:62px;height:62px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:15px;color:#fff;box-shadow:0 6px 20px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.2);position:relative;z-index:1}
            .tmc-vf{position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:var(--green);border:2px solid var(--bg2);display:flex;align-items:center;justify-content:center;font-size:9px}
            .tmc-b{padding:14px}
            .tmc-n{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt)}
            .tmc-r{font-size:11px;font-family:var(--mono);margin:3px 0 8px}
            .tmc-d{font-size:12px;color:var(--txt3);line-height:1.6}
            .cia{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg2);border:1px solid var(--brd);border-radius:var(--r-lg);margin-bottom:10px;text-decoration:none}
            .cia:active{transform:scale(.98);background:rgba(41,121,242,.06)}
            .cia-ico{width:42px;height:42px;border-radius:12px;flex-shrink:0}
            .mform{background:var(--bg2);border:1px solid var(--brd);border-radius:var(--r-xl);padding:20px 16px;margin:0 16px 20px}
            .mfl{display:block;font-size:11px;font-family:var(--mono);text-transform:uppercase;letter-spacing:.08em;color:var(--txt3);margin-bottom:7px}
            .mff{width:100%;background:var(--input-bg);border:1.5px solid var(--brd);border-radius:12px;padding:12px 14px;color:var(--txt);font-family:var(--font);font-size:14px;margin-bottom:12px;box-sizing:border-box}
            .mff:focus{outline:none;border-color:rgba(41,121,242,.5);background:rgba(41,121,242,.04)}
            .mff::placeholder{color:var(--txt3)}
            select.mff{background-color:var(--bg);cursor:pointer}
            textarea.mff{resize:none}
            .msub{width:100%;padding:14px;border-radius:14px;background:linear-gradient(135deg,var(--blue-dk),var(--blue),var(--blue-lt));background-size:200%;animation:gradS 4s ease infinite;color:#fff;font-family:var(--font);font-weight:700;font-size:15px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:var(--shadow-blue)}
            .msub:active{transform:scale(.98)}
            .sbm{margin-bottom:14px}
            .sbm-r{display:flex;justify-content:space-between;font-size:12px;margin-bottom:7px}
            .sbm-t{height:6px;background:rgba(128,128,128,.12);border-radius:99px;overflow:hidden}
            .sbm-f{height:100%;border-radius:99px;width:0;transition:width 1.4s cubic-bezier(.34,1.56,.64,1)}

            /* ── Desktop wrapper ── */
            .welcome-desktop{display:block}
            @media(max-width:639px){.welcome-desktop{display:none!important}}
        `;
        document.head.appendChild(style);
        return () => { document.getElementById('welcome-page-css')?.remove(); };
    }, []);

    /* ── PAGE JS ── */
    useEffect(() => {
        const SCREENS = ['scr-0', 'scr-1', 'scr-2', 'scr-3'];
        let curTab = 0;

        const showProgress = () => {
            const pb = document.getElementById('prog-bar');
            if (!pb) return;
            pb.style.display = 'block';
            pb.classList.add('loading');
            setTimeout(() => { pb.classList.remove('loading'); pb.style.display = 'none'; }, 900);
        };

        const triggerMobBars = () => {
            document.querySelectorAll('.mob-bar').forEach(b => {
                const el = b as HTMLElement;
                el.style.width = el.dataset.w || '0%';
            });
        };

        const switchTab = (idx: number) => {
            if (idx === curTab) return;
            const dir = idx > curTab ? 1 : -1;
            const oldScr = document.getElementById(SCREENS[curTab]);
            const newScr = document.getElementById(SCREENS[idx]);
            if (!oldScr || !newScr) return;
            showProgress();
            oldScr.className = `asc ${dir > 0 ? 's-hide-l' : 's-hide-r'}`;
            newScr.className = `asc ${dir > 0 ? 's-hide-r' : 's-hide-l'}`;
            requestAnimationFrame(() => requestAnimationFrame(() => { newScr.className = 'asc s-act'; }));
            setTimeout(() => { newScr.scrollTop = 0; }, 60);
            document.querySelectorAll('.ti-btn').forEach((t, i) => t.classList.toggle('act', i === idx));
            if (idx === 2) setTimeout(triggerMobBars, 450);
            curTab = idx;
            setCurrentTab(idx);
        };

        const openSet = new Set<string>();
        const toggleSvc = (id: string) => {
            const det = document.getElementById(`det-${id}`);
            const arr = document.getElementById(`arr-${id}`);
            if (!det || !arr) return;
            if (openSet.has(id)) {
                det.classList.remove('open');
                arr.style.transform = '';
                openSet.delete(id);
                setOpenSvc(prev => { const s = new Set(prev); s.delete(id); return s; });
            } else {
                det.classList.add('open');
                arr.style.transform = 'rotate(90deg)';
                openSet.add(id);
                setOpenSvc(prev => new Set(prev).add(id));
            }
        };

        let notifTimer: ReturnType<typeof setTimeout> | null = null;
        const showNotif = (title: string, msg: string) => {
            document.querySelector('.notif')?.remove();
            if (notifTimer) clearTimeout(notifTimer);
            const n = document.createElement('div');
            n.className = 'notif';
            n.innerHTML = `<div class="i3 ib" style="width:36px;height:36px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div><div><div style="font-family:var(--disp);font-weight:700;font-size:13px;color:var(--txt);">${title}</div><div style="font-size:12px;color:var(--txt3);margin-top:2px;">${msg}</div></div>`;
            document.body.appendChild(n);
            notifTimer = setTimeout(() => { n.parentNode && n.remove(); }, 3600);
        };

        const openSrch  = () => { document.getElementById('srch-overlay')?.classList.add('open'); setTimeout(() => (document.getElementById('srch-inp') as HTMLInputElement)?.focus(), 100); };
        const closeSrch = () => { document.getElementById('srch-overlay')?.classList.remove('open'); };

        const handleDeskForm = (e: Event) => {
            e.preventDefault();
            const b = document.getElementById('desk-btn') as HTMLButtonElement;
            if (!b) return;
            b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="30 70"/></svg> Sending…';
            b.disabled = true;
            setTimeout(() => { b.innerHTML = "✓ Sent! We'll be in touch within 24 hours."; b.style.background = 'linear-gradient(135deg,#04432c,#059669,#34d399)'; b.style.animation = 'none'; }, 2000);
        };

        const handleMobForm = (e: Event) => {
            e.preventDefault();
            const b = document.getElementById('mob-btn') as HTMLButtonElement;
            if (!b) return;
            b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="30 70"/></svg> Sending…';
            b.disabled = true;
            setTimeout(() => { b.innerHTML = "✓ Sent! We'll reply within 24 hours."; b.style.background = 'linear-gradient(135deg,#04432c,#059669)'; b.style.animation = 'none'; }, 2000);
        };

        /* swipe */
        let tStartX = 0, tStartY = 0;
        const ms = document.getElementById('mscr');
        const onTouchStart = (e: TouchEvent) => { tStartX = e.touches[0].clientX; tStartY = e.touches[0].clientY; };
        const onTouchEnd   = (e: TouchEvent) => {
            const dx = e.changedTouches[0].clientX - tStartX;
            const dy = e.changedTouches[0].clientY - tStartY;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                if (dx < 0 && curTab < SCREENS.length - 1) switchTab(curTab + 1);
                else if (dx > 0 && curTab > 0) switchTab(curTab - 1);
            }
        };
        if (ms) { ms.addEventListener('touchstart', onTouchStart, { passive: true }); ms.addEventListener('touchend', onTouchEnd, { passive: true }); }

        /* scroll-to-top */
        const sttBtn = document.getElementById('stt');
        const trackScroll = () => {
            const active = document.querySelector<HTMLElement>('.asc.s-act');
            if (active) { active.addEventListener('scroll', () => { sttBtn?.classList.toggle('visible', active.scrollTop > 200); }, { passive: true }); }
            else { setTimeout(trackScroll, 200); }
        };
        trackScroll();

        /* observers */
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-d') ? parseFloat(entry.target.getAttribute('data-d')!) * 0.07 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                } else {
                    (entry.target as HTMLElement).style.transitionDelay = '0s';
                    entry.target.classList.remove('in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('[data-a]').forEach(el => revealObs.observe(el));

        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLElement;
                const target = parseInt(el.dataset.t || '0', 10);
                const dur = 1800, start = performance.now();
                (function tick(now: number) {
                    const p = Math.min((now - start) / dur, 1);
                    const ease = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.floor(ease * target) + (p < 1 ? '' : '+');
                    if (p < 1) requestAnimationFrame(tick);
                    else el.textContent = target + '+';
                })(performance.now());
                counterObs.unobserve(el);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { const el = entry.target as HTMLElement; el.style.width = el.dataset.w || '0%'; barObs.unobserve(el); }
            });
        }, { threshold: 0.4 });
        document.querySelectorAll('.bf').forEach(el => barObs.observe(el));

        /* NOTE: scr-0..3 already get their correct initial classes
           ("asc s-act" / "asc s-hide-r") directly from JSX on first render,
           so no post-mount re-class / forced-reflow step is needed here.
           The previous setTimeout(() => { ...; void firstTab.offsetHeight; }, 50)
           was redundant and was the source of a forced reflow + large CLS
           on #mscr flagged by Lighthouse — removed. */

        /* window globals */
        (window as any).switchTab     = switchTab;
        (window as any).toggleSvc     = toggleSvc;
        (window as any).showNotif     = showNotif;
        (window as any).openSrch      = openSrch;
        (window as any).closeSrch     = closeSrch;
        (window as any).showProgress  = showProgress;
        (window as any).handleDeskForm = handleDeskForm;
        (window as any).handleMobForm  = handleMobForm;

        return () => {
            revealObs.disconnect(); counterObs.disconnect(); barObs.disconnect();
            if (ms) { ms.removeEventListener('touchstart', onTouchStart); ms.removeEventListener('touchend', onTouchEnd); }
        };
    }, []);


        const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ayamil Coders",
        "url": "https://ayamilcoders.com",
        "logo": "https://ayamilcoders.com/logo/ac-512.png",
        "description": "Pakistan's premier software house specializing in Web Development, Blockchain, AI, and IT Consulting.",
        "founder": {
            "@type": "Person",
            "name": "Muhammad Muzamil"
        },
        "foundingDate": "2023-07",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sadiqabad",
            "addressRegion": "Punjab",
            "addressCountry": "Pakistan"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-312-7592672",
            "contactType": "sales",
            "availableLanguage": ["English", "Urdu"]
        },
        "sameAs": [
            "https://facebook.com/ayamilcoders",
            "https://linkedin.com/company/ayamilcoders",
            "https://instagram.com/ayamilcoders",
            "https://fiverr.com/muzamil516"
        ]
    };

    /* ─────────────────────────────────────────
       RENDER
    ───────────────────────────────────────── */
    return (
        <>
             <SEO 
                title="Ayamil Coders - Software Development Company in Pakistan"
                description="Pakistan's premier software house. Expert in Web Development, Blockchain, AI, and IT Consulting. 600+ projects, 50+ countries, 87% satisfaction."
                keywords="software development, web development, blockchain development, AI development, IT consulting, Pakistan software house"
                url="https://ayamilcoders.com"
                schema={orgSchema}
            />

            {/* ══════════════════════════════════════
                MOBILE PORTAL — escapes .mw so it's
                a sibling of it, not a child.
            ══════════════════════════════════════ */}
            {typeof document !== 'undefined' && createPortal(
                <div id="mscr">

                    {/* ── SCREEN 0: HOME ── */}
                    <div className="asc s-act" id="scr-0">
                        <div className="ash">
                            <div className="ash-t">Home</div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <div className="ash-btn" onClick={() => (window as any).openSrch?.()}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                </div>
                                <div className="ash-btn" onClick={() => (window as any).showNotif?.('👋 Welcome!', 'Pakistan\'s #1 software house')}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                                </div>
                            </div>
                        </div>

                        {/* Hero card */}
                        <div className="app-hero" style={{ marginTop: '16px' }}>
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', animation: 'pulse3d 2s ease infinite', display: 'inline-block', flexShrink: 0 }}></span>
                                    <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.65)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Available for New Projects</span>
                                </div>
                                <h1 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '26px', lineHeight: 1.1, letterSpacing: '-.02em', color: '#fff', marginBottom: '10px' }}>
                                    We Build<br /><span className="shimmer-txt">Smart Digital</span><br />Solutions
                                </h1>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.65)', lineHeight: 1.65, marginBottom: '20px' }}>
                                    Pakistan's leading software house — Web Development, Blockchain Development, AI Development & Bug Fixing for global clients.
                                </p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <button onClick={() => (window as any).switchTab?.(3)} className="btn-p" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px' }}>Get Started →</button>
                                    <button onClick={() => (window as any).switchTab?.(1)} className="btn-g" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}>Our Services</button>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="sg2" style={{ marginTop: 0 }}>
                            <div className="sac"><div className="san">600+</div><div className="sal">Projects</div></div>
                            <div className="sac"><div className="san">2K+</div><div className="sal">Issues Solved</div></div>
                            <div className="sac"><div className="san">10+</div><div className="sal">Years Exp.</div></div>
                            <div className="sac"><div className="san">50+</div><div className="sal">Global Clients</div></div>
                        </div>

                        {/* Quick service links */}
                        <div style={{ padding: '0 16px 8px' }}>
                            <div className="msh"><span className="msh-t">Our Services</span><span className="msh-a" onClick={() => (window as any).switchTab?.(1)}>See all →</span></div>
                            {SERVICES.slice(0, 3).map(svc => (
                                <div key={svc.id} className="srow mc-el" onClick={() => (window as any).switchTab?.(1)}>
                                    <div className={`srow-ico i3 ${svc.cls}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{svc.icon}</div>
                                    <div style={{ flex: 1 }}><div className="srow-t">{svc.title}</div><div className="srow-d">{svc.tags.map(t => t[1]).join(', ')}</div></div>
                                    <svg className="srow-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div style={{ padding: '4px 16px 28px' }}>
                            <div className="mc-el" style={{ padding: '18px', textAlign: 'center' }}>
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)', marginBottom: '6px' }}>Founded July 21, 2023</div>
                                <div style={{ fontSize: '12px', color: 'var(--txt3)', marginBottom: '14px' }}>Sadiqabad, Punjab, Pakistan 🇵🇰 · Serving 50+ international clients</div>
                                <a href="mailto:info@ayamilcoders.com" className="btn-p" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    info@ayamilcoders.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── SCREEN 1: SERVICES ── */}
                    <div className="asc s-hide-r" id="scr-1">
                        <div className="ash">
                            <div className="ash-t">Services</div>
                            <div className="ash-btn" onClick={() => (window as any).showNotif?.('🛠️ 4 Core Services', 'Web · Blockchain · AI · Bug Fixing')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            </div>
                        </div>

                        <div style={{ padding: '16px 16px 0' }}>
                            <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '8px' }}>What We Do</span>
                            <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '22px', lineHeight: 1.2, letterSpacing: '-.02em', marginBottom: '16px', color: 'var(--txt)' }}>
                                Expert <span className="shimmer-txt">Digital</span> Services
                            </h2>
                        </div>

                        <div style={{ padding: '0 16px', marginBottom: '8px' }}>
                            {SERVICES.map(svc => (
                                <div key={svc.id}>
                                    <div className="srow mc-el" onClick={() => (window as any).toggleSvc?.(svc.id)}
                                        style={{ marginBottom: 0, borderRadius: 'var(--r-lg) var(--r-lg) 0 0', borderBottom: 'none' }}>
                                        <div className={`srow-ico i3 ${svc.cls}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px' }}>{svc.icon}</div>
                                        <div style={{ flex: 1 }}><div className="srow-t">{svc.title}</div><div className="srow-d">{svc.tags.map(t => t[1]).join(' · ')}</div></div>
                                        <svg id={`arr-${svc.id}`} className="srow-arr sdet-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </div>
                                    <div id={`det-${svc.id}`} className="sdet mc-el" style={{ borderRadius: '0 0 var(--r-lg) var(--r-lg)', borderTop: 'none', marginBottom: '10px' }}>
                                        <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6, marginBottom: '10px' }}>{svc.desc}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {svc.tags.map(([cls, label]) => (
                                                <span key={label} style={{ padding: '4px 10px', borderRadius: '999px', background: 'rgba(41,121,242,.1)', border: '1px solid rgba(41,121,242,.2)', fontSize: '11px', color: 'var(--blue-lt)', fontFamily: 'var(--mono)' }}>{label}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Process (mobile) */}
                        <div style={{ padding: '8px 16px 22px' }}>
                            <div className="msh"><span className="msh-t">How We Work</span></div>
                            <div className="ptl" style={{ padding: 0 }}>
                                {PROCESS_STEPS.map((step, i) => (
                                    <div key={step.num} className="pt-i">
                                        <div className="pt-l">
                                            <div className={`pt-ico i3 ${step.cls}`}><span style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '16px', color: '#fff' }}>{step.num}</span></div>
                                            {i < PROCESS_STEPS.length - 1 && <div className="pt-line"></div>}
                                        </div>
                                        <div className="pt-body">
                                            <div className="pt-t">{step.title}</div>
                                            <p className="pt-d">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── SCREEN 2: ABOUT ── */}
                    <div className="asc s-hide-r" id="scr-2">
                        <div className="ash">
                            <div className="ash-t">About</div>
                            <div className="ash-btn" onClick={() => (window as any).showNotif?.('ℹ️ Est. July 21, 2023', 'Sadiqabad, Punjab 🇵🇰')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            </div>
                        </div>

                        <div style={{ margin: '16px', background: 'var(--bg2)', border: '1px solid var(--brd)', borderRadius: 'var(--r-xl)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(41,121,242,.06)', filter: 'blur(20px)', pointerEvents: 'none' }}></div>
                            <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '10px' }}>About Ayamil</span>
                            <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '20px', lineHeight: 1.2, letterSpacing: '-.02em', marginBottom: '10px', color: 'var(--txt)' }}>
                                Pakistan's Leading <span className="shimmer-txt">Software House</span>
                            </h2>
                            <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.65 }}>
                                Founded on <strong style={{ color: 'var(--txt)' }}>July 21, 2023</strong> by <strong style={{ color: 'var(--txt)' }}>Muhammad Muzamil</strong>, based in <strong style={{ color: 'var(--txt)' }}>Sadiqabad, Punjab, Pakistan</strong> — serving 50+ international clients across 20+ countries with enterprise-grade digital solutions.
                            </p>
                        </div>

                        {/* Stats scroll */}
                        <div className="hss" style={{ marginBottom: '16px' }}>
                            <div className="hss-i sac mc-el" style={{ minWidth: '120px' }}><div className="san">600+</div><div className="sal">Projects</div></div>
                            <div className="hss-i sac mc-el" style={{ minWidth: '120px' }}><div className="san">2K+</div><div className="sal">Issues Solved</div></div>
                            <div className="hss-i sac mc-el" style={{ minWidth: '120px' }}><div className="san">10+</div><div className="sal">Yrs Exp.</div></div>
                            <div className="hss-i sac mc-el" style={{ minWidth: '120px' }}><div className="san">50+</div><div className="sal">Int'l Clients</div></div>
                            <div className="hss-i sac mc-el" style={{ minWidth: '120px' }}><div className="san" style={{ WebkitTextFillColor: '#34d399' }}>87%</div><div className="sal">Satisfaction</div></div>
                        </div>

                        {/* Expertise bars */}
                        <div style={{ padding: '0 16px', marginBottom: '20px' }}>
                            <div className="msh"><span className="msh-t">Expertise</span></div>
                            <div className="mc-el" style={{ padding: '16px', borderRadius: 'var(--r-xl)' }}>
                                <div className="sbm"><div className="sbm-r"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Web Development</span><span style={{ color: 'var(--blue-lt)', fontFamily: 'var(--mono)', fontSize: '12px' }}>98%</span></div><div className="sbm-t"><div className="sbm-f bf-b mob-bar" data-w="98%"></div></div></div>
                                <div className="sbm"><div className="sbm-r"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Blockchain / Smart Contracts</span><span style={{ color: '#a78bfa', fontFamily: 'var(--mono)', fontSize: '12px' }}>92%</span></div><div className="sbm-t"><div className="sbm-f bf-p mob-bar" data-w="92%"></div></div></div>
                                <div className="sbm"><div className="sbm-r"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>AI & Automation</span><span style={{ color: '#34d399', fontFamily: 'var(--mono)', fontSize: '12px' }}>85%</span></div><div className="sbm-t"><div className="sbm-f bf-g mob-bar" data-w="85%"></div></div></div>
                                <div className="sbm"><div className="sbm-r"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Bug Fixing</span><span style={{ color: '#fbbf24', fontFamily: 'var(--mono)', fontSize: '12px' }}>95%</span></div><div className="sbm-t"><div className="sbm-f bf-a mob-bar" data-w="95%"></div></div></div>
                            </div>
                        </div>

                        {/* Team */}
                        <div style={{ padding: '0 16px', paddingBottom: '22px' }}>
                            <div className="msh"><span className="msh-t">Leadership</span></div>
                            {TEAM.map(member => (
                                <div key={member.name} className="tmc">
                                    <div className="tmc-h" style={{ background: member.bg }}>
                                        <div style={{ position: 'relative' }}>
                                            <div className="tmc-av" style={{ background: member.avatarBg }}>{member.initials}</div>
                                            <span className="tmc-vf">✓</span>
                                        </div>
                                    </div>
                                    <div className="tmc-b">
                                        <div className="tmc-n">{member.name}</div>
                                        <div className="tmc-r" style={{ color: member.roleColor }}>{member.role}</div>
                                        <p className="tmc-d">{member.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── SCREEN 3: CONTACT ── */}
                    <div className="asc s-hide-r" id="scr-3">
                        <div className="ash">
                            <div className="ash-t">Contact</div>
                            <a href="tel:+923127592672" className="ash-btn" aria-label="Call Ayamil Coders" style={{ textDecoration: 'none', color: 'var(--txt2)' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </a>
                        </div>

                        <div style={{ padding: '16px 16px 0' }}>
                            <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '10px' }}>Get In Touch</span>
                            <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '22px', lineHeight: 1.2, letterSpacing: '-.02em', marginBottom: '8px', color: 'var(--txt)' }}>
                                Let's Build <span className="shimmer-txt">Something</span> Great
                            </h2>
                            <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6, marginBottom: '18px' }}>
                                Based in Sadiqabad, Punjab — working fully remote with clients worldwide.
                            </p>
                        </div>

                        <div style={{ padding: '0 16px', marginBottom: '6px' }}>
                            {[
                                { href: 'mailto:info@ayamilcoders.com', cls: 'ib', label: 'Email', value: 'info@ayamilcoders.com', external: false, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                                { href: 'tel:+923127592672', cls: 'ig', label: 'Call / WhatsApp', value: '+92 312 759 2672', mono: true, external: false, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                                { href: 'https://wa.me/923127592672', cls: 'ig', label: 'WhatsApp', value: 'Chat with us now', external: true, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg> },
                                { href: 'https://ayamilcoders.com', cls: 'ib', label: 'Website', value: 'ayamilcoders.com', external: true, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                            ].map(item => (
                                <a key={item.label} href={item.href} className="cia mc-el" target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
                                    <div className={`cia-ico i3 ${item.cls}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{item.label}</div>
                                        <div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500, fontFamily: (item as any).mono ? 'var(--mono)' : undefined }}>{item.value}</div>
                                    </div>
                                    <svg style={{ marginLeft: 'auto', color: 'var(--txt3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                </a>
                            ))}
                            {/* Location — no link */}
                            <div className="cia mc-el" style={{ marginBottom: 0 }}>
                                <div className="cia-ico i3 ia" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Location</div>
                                    <div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>Sadiqabad, Punjab, Pakistan 🇵🇰</div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile contact form */}
                        <div className="mform">
                            <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '17px', color: 'var(--txt)', marginBottom: '16px' }}>Send a Message</div>
                            <form onSubmit={(e) => (window as any).handleMobForm?.(e)}>
                                <label className="mfl" htmlFor="mob-name">Your Name</label>
                                <input id="mob-name" type="text" placeholder="Muhammad Ali" className="mff" required />
                                <label className="mfl" htmlFor="mob-email">Email Address</label>
                                <input id="mob-email" type="email" placeholder="you@company.com" className="mff" required />
                                <label className="mfl" htmlFor="mob-service">Service Needed</label>
                                <select id="mob-service" className="mff" aria-label="Service Needed" defaultValue="">
                                    <option value="" disabled>Select a service</option>
                                    <option>Web Development</option>
                                    <option>Blockchain Development</option>
                                    <option>AI Development</option>
                                    <option>Bug Fixing</option>
                                    <option>Other</option>
                                </select>
                                <label className="mfl" htmlFor="mob-details">Project Details</label>
                                <textarea id="mob-details" rows={4} placeholder="Describe your project briefly…" className="mff"></textarea>
                                <button id="mob-btn" type="submit" className="msub">
                                    Send Message
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════
                DESKTOP CONTENT
            ══════════════════════════════════════ */}
            <div className="welcome-desktop">

                {/* ── HERO ── */}
                <section id="home" style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '100px 60px 80px' }}>
                    <div className="hero-blob" style={{ width: '560px', height: '560px', background: 'rgba(41,121,242,.07)', top: '-180px', left: '-180px' }}></div>
                    <div className="hero-blob" style={{ width: '380px', height: '380px', background: 'rgba(0,200,232,.04)', top: '50%', left: '40%', animationDelay: '3s' }}></div>
                    <div style={{ position: 'absolute', inset: 0, opacity: '.025', backgroundImage: 'linear-gradient(rgba(100,150,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(100,150,255,.8) 1px,transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }}></div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', width: '100%', position: 'relative', zIndex: 2 }} data-a="up">
                        {/* Code card */}
                        <div>
                            <div style={{ position: 'relative' }}>
                                <div className="i3 ib" style={{ position: 'absolute', top: '-28px', right: '-16px', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'floatY 5s ease-in-out infinite', animationDelay: '.5s' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                </div>
                                <div className="cc">
                                    <div className="cc-top">
                                        <div className="cc-dot" style={{ background: '#ff5f56' }}></div>
                                        <div className="cc-dot" style={{ background: '#ffbd2e' }}></div>
                                        <div className="cc-dot" style={{ background: '#27c93f' }}></div>
                                        <span className="cc-fn">ayamil.config.js</span>
                                    </div>
                                    <div className="cc-body">
                                        <div><span className="tc">// Pakistan's Leading Software House</span></div>
                                        <div style={{ height: '8px' }}></div>
                                        <div><span className="tk">const</span> <span className="tv">ayamil</span> <span className="to">=</span> &#123;</div>
                                        <div style={{ paddingLeft: '18px' }}><span className="tf">founder</span><span className="to">:</span> <span className="ts">"Muhammad Muzamil"</span><span className="to">,</span></div>
                                        <div style={{ paddingLeft: '18px' }}><span className="tf">founded</span><span className="to">:</span> <span className="ts">"July 21, 2023"</span><span className="to">,</span></div>
                                        <div style={{ paddingLeft: '18px' }}><span className="tf">base</span><span className="to">:</span> <span className="ts">"Sadiqabad, Punjab 🇵🇰"</span><span className="to">,</span></div>
                                        <div style={{ paddingLeft: '18px' }}><span className="tf">projects</span><span className="to">:</span> <span className="tn">600</span><span className="to">,</span></div>
                                        <div style={{ paddingLeft: '18px' }}><span className="tf">clients</span><span className="to">:</span> <span className="tn">50</span><span className="to">,</span></div>
                                        <div style={{ paddingLeft: '18px' }}><span className="tf">stack</span><span className="to">:</span> <span className="ts">["React","Laravel","Solidity","AI","Figma"]</span></div>
                                        <div>&#125;<span className="to">;</span></div>
                                        <div style={{ height: '8px' }}></div>
                                        <div><span className="tk">export default</span> <span className="tf">ayamil</span><span className="to">;</span></div>
                                    </div>
                                    <div className="cc-sb">
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></span>
                                        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--txt3)' }}>server running · port 8000 · est. July 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero text */}
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(41,121,242,.08)', border: '1px solid rgba(41,121,242,.2)', marginBottom: '22px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', animation: 'blink 2s ease infinite' }}></span>
                                <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--txt3)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Available for New Projects</span>
                            </div>
                            <h1 className="hh1">We Build<br /><span className="shimmer-txt">Smart Digital</span><br />Solutions</h1>
                            <p className="hdesc">
                                Pakistan's leading software house — delivering Web Development, Blockchain Development, AI Development, and Bug Fixing to 50+ international clients worldwide.
                            </p>
                            <div className="hbtns">
                                <a href="#contact" className="btn-p">Start a Project <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                                <a href="#services" className="btn-g">Our Services</a>
                            </div>
                            <div className="hbadges">
                                <div className="hbadge"><span style={{ color: 'var(--green)' }}>✓</span> 600+ Projects Delivered</div>
                                <div className="hbadge"><span style={{ color: 'var(--blue-lt)' }}>✓</span> 10+ Years Experience</div>
                                <div className="hbadge"><span style={{ color: '#a78bfa' }}>✓</span> 50+ Global Clients</div>
                                <div className="hbadge"><span style={{ color: '#fbbf24' }}>✓</span> 87% Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── STATS ── */}
                <div className="sgrid" aria-label="Ayamil Coders statistics">
                    {STATS_DESKTOP.map((s, i) => (
                        <div key={s.label} className="sc" data-a="scale" data-d={i + 1}>
                            {s.counter
                                ? <div className="sn counter" data-t={s.n}>0</div>
                                : <div className="sn">{s.display}</div>
                            }
                            <div className="su">{s.label}</div>
                            <div className="sd"></div>
                            <div className="sl">{s.sub}</div>
                        </div>
                    ))}
                </div>
                <div className="divider"></div>

                {/* ── SERVICES ── */}
                <section id="services" className="sp">
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '36px' }} data-a="right">
                        <span className="section-lbl">What We Do</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '6px' }}>
                            Expert <span className="shimmer-txt">Digital</span> Services
                        </h2>
                        <p style={{ marginTop: '10px', maxWidth: '520px', fontSize: '14px', color: 'var(--txt2)', textAlign: 'right' }}>
                            From idea to deployment — reliable, secure, and innovative solutions that drive real business results.
                        </p>
                    </div>
                    <div className="svc-grid">
                        {SERVICES.map((svc, i) => (
                            <article key={svc.title} className="svc-c" data-a="flip" data-d={i + 1}>
                                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                                    <div className={`i3 ${svc.cls}`} style={{ width: '58px', height: '58px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{svc.icon}</div>
                                    <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', color: svc.labelColor, marginTop: '5px' }}>{svc.label}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)', marginBottom: '7px' }}>{svc.title}</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7, marginBottom: '12px' }}>{svc.desc}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                        {svc.tags.map(([cls, label]) => <span key={label} className={`tag ${cls}`}>{label}</span>)}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                <div className="divider"></div>

                {/* ── ABOUT ── */}
                <section id="about" className="sp" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="ab-grid">
                        <div className="mosaic" data-a="left">
                            <div className="m-big">
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '38px', background: 'linear-gradient(135deg,var(--txt),var(--blue-lt))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>600+</div>
                                <p style={{ fontSize: '13px', color: 'var(--txt3)', marginTop: '6px' }}>Projects delivered to global clients</p>
                                <div style={{ width: '44px', height: '3px', background: 'linear-gradient(90deg,var(--blue-dk),var(--cyan))', borderRadius: '2px', margin: '10px auto 0' }}></div>
                            </div>
                            <div className="m-sm"><div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '24px', color: '#34d399' }}>87%</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', marginTop: '4px' }}>Satisfaction</div></div>
                            <div className="m-sm"><div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '24px', color: '#a78bfa' }}>50+</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', marginTop: '4px' }}>Int'l Clients</div></div>
                            <div className="m-bars">
                                <div className="br"><div className="br-h"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Web Development</span><span style={{ color: 'var(--blue-lt)', fontFamily: 'var(--mono)', fontSize: '12px' }}>98%</span></div><div className="bt"><div className="bf bf-b" data-w="98%"></div></div></div>
                                <div className="br"><div className="br-h"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Blockchain / Smart Contracts</span><span style={{ color: '#a78bfa', fontFamily: 'var(--mono)', fontSize: '12px' }}>92%</span></div><div className="bt"><div className="bf bf-p" data-w="92%"></div></div></div>
                                <div className="br"><div className="br-h"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>AI & Automation</span><span style={{ color: '#34d399', fontFamily: 'var(--mono)', fontSize: '12px' }}>85%</span></div><div className="bt"><div className="bf bf-g" data-w="85%"></div></div></div>
                                <div className="br"><div className="br-h"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Bug Fixing</span><span style={{ color: '#fbbf24', fontFamily: 'var(--mono)', fontSize: '12px' }}>95%</span></div><div className="bt"><div className="bf bf-a" data-w="95%"></div></div></div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }} data-a="right">
                            <span className="section-lbl">About Us</span>
                            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginBottom: '16px', marginTop: '6px' }}>
                                Pakistan's Leading <span className="shimmer-txt">Software House</span>
                            </h2>
                            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--txt2)', marginBottom: '20px' }}>
                                Founded on <strong style={{ color: 'var(--txt)', fontWeight: 600 }}>July 21, 2023</strong> by <strong style={{ color: 'var(--txt)', fontWeight: 600 }}>Muhammad Muzamil</strong>, Ayamil Coders is headquartered in <strong style={{ color: 'var(--txt)', fontWeight: 600 }}>Sadiqabad, Punjab, Pakistan</strong>. We serve 50+ international clients across 20+ countries with enterprise-grade digital solutions in Web Development, Blockchain Development, AI Development, and Bug Fixing.
                            </p>
                            <ul className="ck-list">
                                <li className="ck-i">10+ years of combined technical expertise<span className="ck-icon">✓</span></li>
                                <li className="ck-i">Enterprise-grade code quality &amp; security standards<span className="ck-icon">✓</span></li>
                                <li className="ck-i">Blockchain innovation — from Solidity to DeFi &amp; NFT<span className="ck-icon">✓</span></li>
                                <li className="ck-i">Active hiring — passionate IT professionals welcome<span className="ck-icon">✓</span></li>
                                <li className="ck-i">IT Institute offering HTML, CSS, JS &amp; Web3 courses<span className="ck-icon">✓</span></li>
                            </ul>
                            <div style={{ textAlign: 'right' }}>
                                <a href="#contact" className="btn-p">Work With Us <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="divider"></div>

                {/* ── PROCESS ── */}
                <section id="process" className="sp">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }} data-a="blur">
                        <span className="section-lbl" style={{ display: 'inline-flex' }}>How We Work</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '6px' }}>
                            Our <span className="shimmer-txt">Process</span>
                        </h2>
                        <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--txt2)', maxWidth: '480px', margin: '10px auto 0' }}>
                            A transparent, structured workflow that keeps you informed and in control at every stage.
                        </p>
                    </div>
                    <div className="proc-grid">
                        {PROCESS_STEPS.map((step, i) => (
                            <div key={step.num} className="proc-card" data-a="up" data-d={i + 1}>
                                <div className="proc-num">Step {String(step.num).padStart(2, '0')}</div>
                                <div className={`i3 ${step.cls}`} style={{ width: '46px', height: '46px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                                    <span style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '20px', color: '#fff' }}>{step.num}</span>
                                </div>
                                <div className="proc-t">{step.title}</div>
                                <p className="proc-d">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <div className="divider"></div>

                {/* ── TEAM ── */}
                <section id="team" className="sp">
                    <div style={{ marginBottom: '36px' }} data-a="left">
                        <span className="section-lbl">The People</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '6px' }}>
                            Meet the <span className="shimmer-txt">Leadership</span>
                        </h2>
                    </div>
                    <div className="tgrid">
                        {TEAM.map((member, i) => (
                            <article key={member.name} className="tc-card" data-a="scale" data-d={i + 1}>
                                <div className="tc-h" style={{ background: member.bg }}>
                                    <div style={{ position: 'relative' }}>
                                        <div className="tc-av" style={{ background: member.avatarBg }}>{member.initials}</div>
                                        <span className="tc-badge">✓</span>
                                    </div>
                                </div>
                                <div className="tc-b">
                                    <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)' }}>{member.name}</div>
                                    <div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: member.roleColor, margin: '3px 0 9px' }}>{member.role}</div>
                                    <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.65 }}>{member.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                <div className="divider"></div>

                {/* ── FAQ (AEO / GEO / LLMO: mirrors FAQPage JSON-LD so
                     answer engines and LLMs can extract & cite this content) ── */}
                <section id="faq" className="sp">
                    <div style={{ marginBottom: '36px' }} data-a="left">
                        <span className="section-lbl">Quick Answers</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '6px' }}>
                            Frequently Asked <span className="shimmer-txt">Questions</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gap: '14px', maxWidth: '760px' }}>
                        {[
                            {
                                q: 'What services does Ayamil Coders offer?',
                                a: 'We offer four core services: Web Development (React, Laravel, Node.js), Blockchain Development (Solidity smart contracts, DeFi, NFT), AI Development (machine learning, automation, OpenAI integrations), and Bug Fixing for existing websites, apps, and codebases.',
                            },
                            {
                                q: 'Where is Ayamil Coders located?',
                                a: 'We are headquartered in Sadiqabad, Punjab, Pakistan, and work fully remote with clients across 20+ countries worldwide.',
                            },
                            {
                                q: 'Does Ayamil Coders fix bugs in projects built by other developers?',
                                a: 'Yes. Bug Fixing is one of our four core services — we debug, review, and stabilize web, mobile, blockchain, and AI codebases regardless of who originally built them.',
                            },
                            {
                                q: 'How quickly can you start a project?',
                                a: 'Most engagements begin with a free discovery call within 24 hours of first contact, followed by a project roadmap before any code is written.',
                            },
                        ].map((item, i) => (
                            <details key={i} className="proc-card" data-a="up" data-d={i + 1} style={{ cursor: 'pointer' }}>
                                <summary style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)', listStyle: 'none' }}>
                                    {item.q}
                                </summary>
                                <p style={{ fontSize: '13.5px', color: 'var(--txt2)', lineHeight: 1.75, marginTop: '10px' }}>{item.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
                <div className="divider"></div>

                {/* ── CONTACT ── */}
                <section id="contact" className="sp" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="cgrid">
                        <div data-a="left">
                            <span className="section-lbl">Get In Touch</span>
                            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginBottom: '14px', marginTop: '6px' }}>
                                Let's Build <span className="shimmer-txt">Something</span> Great
                            </h2>
                            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--txt2)', marginBottom: '28px' }}>
                                Based in Sadiqabad, Punjab — working fully remote with clients across 20+ countries. Reach out and we'll respond within 24 hours.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div className="ci"><div className="i3 ib" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Email</div><a href="mailto:info@ayamilcoders.com" style={{ fontSize: '14px', color: 'var(--txt)', textDecoration: 'none' }}>info@ayamilcoders.com</a></div></div>
                                <div className="ci"><div className="i3 ig" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Call / WhatsApp</div><a href="tel:+923127592672" style={{ fontSize: '14px', color: 'var(--txt)', textDecoration: 'none', fontFamily: 'var(--mono)' }}>+92 312 759 2672</a></div></div>
                                <div className="ci"><div className="i3 ia" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Location</div><span style={{ fontSize: '14px', color: 'var(--txt)' }}>Sadiqabad, Punjab, Pakistan 🇵🇰</span></div></div>
                                <div className="ci"><div className="i3 ib" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Website</div><a href="https://ayamilcoders.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'var(--txt)', textDecoration: 'none' }}>ayamilcoders.com</a></div></div>
                            </div>
                        </div>

                        {/* Desktop contact form */}
                        <div data-a="right">
                            <div className="fc">
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '18px', color: 'var(--txt)', marginBottom: '20px' }}>Send a Message</div>
                                <form onSubmit={(e) => (window as any).handleDeskForm?.(e)}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                        <div><label className="fl" htmlFor="desk-name">Name</label><input id="desk-name" type="text" placeholder="Your name" className="ff" required /></div>
                                        <div><label className="fl" htmlFor="desk-email">Email</label><input id="desk-email" type="email" placeholder="you@company.com" className="ff" required /></div>
                                    </div>
                                    <div style={{ marginBottom: '12px' }}><label className="fl" htmlFor="desk-service">Service Needed</label>
                                        <select id="desk-service" className="ff" aria-label="Service Needed" defaultValue="">
                                            <option value="" disabled>Select a service</option>
                                            <option>Web Development</option>
                                            <option>Blockchain Development</option>
                                            <option>AI Development</option>
                                            <option>Bug Fixing</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div style={{ marginBottom: '12px' }}><label className="fl" htmlFor="desk-budget">Budget Range</label>
                                        <select id="desk-budget" className="ff" aria-label="Budget Range" defaultValue="">
                                            <option value="" disabled>Select a budget</option>
                                            <option>Under $500</option>
                                            <option>$500 – $2,000</option>
                                            <option>$2,000 – $10,000</option>
                                            <option>$10,000+</option>
                                            <option>Let's discuss</option>
                                        </select>
                                    </div>
                                    <div style={{ marginBottom: '14px' }}><label className="fl" htmlFor="desk-details">Project Details</label><textarea id="desk-details" rows={4} placeholder="Describe your project briefly…" className="ff" style={{ resize: 'none' }}></textarea></div>
                                    <button id="desk-btn" type="submit" className="btn-p" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
                                        Send Message
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>{/* end .welcome-desktop */}
        </>
    );
}