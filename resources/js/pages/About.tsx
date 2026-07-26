import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function About() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('about-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'about-page-css';
        style.textContent = `
            /* ── ABOUT-SPECIFIC STYLES ── */
            .timeline{position:relative;padding-left:32px}
            .timeline::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--blue),rgba(41,121,242,.1))}
            .tl-item{position:relative;margin-bottom:36px}
            .tl-item::before{content:'';position:absolute;left:-39px;top:5px;width:14px;height:14px;border-radius:50%;background:var(--blue);box-shadow:0 0 0 4px rgba(41,121,242,.15),0 0 12px rgba(41,121,242,.5);border:2px solid var(--bg)}
            .tl-year{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--blue-lt);margin-bottom:5px}
            .tl-title{font-family:var(--disp);font-weight:700;font-size:16px;color:var(--txt);margin-bottom:6px}
            .tl-desc{font-size:13px;color:var(--txt3);line-height:1.7}

            .val-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
            @media(max-width:1023px){.val-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.val-grid{grid-template-columns:1fr}}
            .val-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:28px;transition:all .35s}
            .val-card:hover{border-color:var(--brd2);transform:translateY(-4px);box-shadow:0 14px 44px rgba(41,121,242,.1)}
            .val-icon{width:48px;height:48px;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-size:20px}
            .val-title{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt);margin-bottom:8px}
            .val-desc{font-size:13px;color:var(--txt3);line-height:1.65}

            .team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
            @media(max-width:1023px){.team-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.team-grid{grid-template-columns:1fr}}
            .team-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);overflow:hidden;transition:all .35s}
            .team-card:hover{border-color:var(--brd2);transform:translateY(-4px);box-shadow:0 14px 44px rgba(41,121,242,.1)}
            .team-banner{height:110px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
            .team-av{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:18px;color:#fff;z-index:1;box-shadow:0 8px 24px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.2);transition:transform .3s}
            .team-card:hover .team-av{transform:scale(1.07)}
            .team-badge{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;border:2px solid var(--bg)}

            .skill-row{margin-bottom:18px}
            .skill-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
            .skill-name{font-size:13px;color:var(--txt2);font-weight:500}
            .skill-pct{font-family:var(--mono);font-size:12px;color:var(--blue-lt)}
            .skill-bar{height:6px;background:var(--surf2);border-radius:999px;overflow:hidden}
            .bf{height:100%;border-radius:999px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}

            .award-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
            @media(max-width:1023px){.award-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.award-grid{grid-template-columns:repeat(2,1fr)}}
            .award-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:20px 16px;text-align:center;transition:all .3s}
            .award-card:hover{border-color:var(--brd2);transform:translateY(-3px)}

            .about-two-col{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
            @media(max-width:1023px){.about-two-col{grid-template-columns:1fr;gap:40px}}

            .page-hero-blob{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}

            /* ── Hidden Partner Section ── */
            .hidden-section{position:relative;overflow:hidden;border-radius:var(--r-xl);border:1px solid rgba(139,92,246,.25);background:linear-gradient(135deg,rgba(45,27,105,.35),rgba(91,33,182,.15),rgba(15,10,30,.4));padding:52px 60px}
            @media(max-width:1023px){.hidden-section{padding:36px 32px}}
            @media(max-width:639px){.hidden-section{padding:28px 20px}}
            .hidden-section::before{content:'';position:absolute;top:-80px;right:-80px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.18),transparent 70%);pointer-events:none}
            .hidden-section::after{content:'';position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.1),transparent 70%);pointer-events:none}
            .hidden-grid{display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:center;position:relative;z-index:1}
            @media(max-width:767px){.hidden-grid{grid-template-columns:1fr;gap:28px;text-align:center}}
            .hidden-avatar{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#3d1a78,#7c3aed,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:36px;box-shadow:0 0 0 6px rgba(139,92,246,.2),0 0 40px rgba(139,92,246,.3),inset 0 1px 0 rgba(255,255,255,.15);flex-shrink:0;animation:floatY 6s ease-in-out infinite}
            @media(max-width:767px){.hidden-avatar{margin:0 auto}}
            .hidden-name-pill{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:999px;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);font-family:var(--mono);font-size:11px;color:#a78bfa;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}
            .hidden-dot{width:7px;height:7px;border-radius:50%;background:#a78bfa;animation:blink 2s ease infinite;flex-shrink:0}
            .hidden-fact{display:flex;align-items:flex-start;gap:12px;background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.15);border-radius:var(--r-lg);padding:14px 16px;margin-top:12px}
            @media(max-width:767px){.hidden-fact{text-align:left}}
            .hidden-fact-icon{font-size:18px;flex-shrink:0;margin-top:1px}
            .hidden-fact-t{font-family:var(--disp);font-weight:700;font-size:13px;color:var(--txt);margin-bottom:3px}
            .hidden-fact-d{font-size:12px;color:var(--txt3);line-height:1.6}
        `;
        document.head.appendChild(style);

        return () => {
            const el = document.getElementById('about-page-css');
            if (el) el.remove();
        };
    }, []);

    // ===== JS FOR ABOUT PAGE =====
    useEffect(() => {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-d') ? parseFloat(entry.target.getAttribute('data-d')!) * 0.03 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });
        document.querySelectorAll('[data-a]').forEach(el => revealObs.observe(el));

        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    const target = parseInt(el.dataset.t || '0', 10);
                    const dur = 1800;
                    const start = performance.now();
                    (function tick(now: number) {
                        const p = Math.min((now - start) / dur, 1);
                        const ease = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.floor(ease * target) + (p < 1 ? '' : '+');
                        if (p < 1) requestAnimationFrame(tick);
                        else el.textContent = target + '+';
                    })(performance.now());
                    counterObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    el.style.width = el.dataset.w || '0%';
                    barObs.unobserve(el);
                }
            });
        }, { threshold: 0.4 });
        document.querySelectorAll('.bf').forEach(el => barObs.observe(el));

        return () => {
            revealObs.disconnect();
            counterObs.disconnect();
            barObs.disconnect();
        };
    }, []);

    // ===== DATA =====
    const timeline = [
        {
            year: 'Jul 21, 2023',
            title: 'Ayamil Coders Founded — A Birthday Gift',
            desc: 'Muhammad Muzamil officially launches Ayamil Coders on July 21, 2023 — a date chosen specifically as a birthday tribute to the Hidden Partner, the silent inspiration behind the company.',
        },
        {
            year: 'Late 2023',
            title: 'First 100 Projects & Leadership Team',
            desc: 'Hit 100+ delivered projects within months. Clients from UAE, UK, Saudi Arabia, and the US. Zunaira Asif (CTO) and Zayan Ali (COO) join to form the core leadership team.',
        },
        {
            year: '2024',
            title: 'Blockchain, AI & Bug Fixing Service Lines Launched',
            desc: 'Full smart contract (Solidity/EVM), DeFi, NFT, and AI/ML automation service lines go live alongside a dedicated Bug Fixing service. First enterprise SaaS client onboarded. Dedicated QA team formed.',
        },
        {
            year: '2025',
            title: '600+ Projects. 50+ Countries. Still Growing.',
            desc: 'Ayamil Coders now serves clients across 50+ countries with a structured remote team — specialising in Web Development, Blockchain Development, AI Development, and Bug Fixing.',
        },
        {
            year: '2026',
            title: 'Deeper Specialisation, Same Core Four',
            desc: "Ayamil Coders doubles down on its four core services rather than spreading thin — sharpening Web Development, Blockchain Development, AI Development, and Bug Fixing with a dedicated QA/Bug Fixing team. The CEO and Founder continue to steer strategy together, with the Hidden Partner's identity still kept private by choice.",
        },
    ];

    const values = [
        {
            icon: '🎯',
            title: 'Radical Transparency',
            desc: 'Honest timelines, clear progress updates, no hidden scope, no surprise invoices. We say what we will do — then we do it.',
        },
        {
            icon: '🔒',
            title: 'Security First',
            desc: 'Every codebase leaves hardened — OWASP-aware, dependency-audited, and production-ready. Security is built in from day one, not bolted on at the end.',
        },
        {
            icon: '⚡',
            title: 'Velocity Without Compromise',
            desc: 'We move fast through clean architecture, reusable components, and a no-shortcuts culture in QA. Speed that ships quality — not bugs.',
        },
        {
            icon: '🌍',
            title: 'Global Mindset, Local Heart',
            desc: 'We build to international standards while proudly rooted in Sadiqabad, Pakistan — putting Punjab on the global software map, one project at a time.',
        },
        {
            icon: '🤝',
            title: 'Long-Term Partnerships',
            desc: 'Our best clients have been with us since month one. We invest in relationships, not just tickets — your business growth is our real metric of success.',
        },
        {
            icon: '📈',
            title: 'Continuous Learning',
            desc: 'Every engineer at Ayamil stays current — exploring emerging stacks, shipping side projects, and sharing knowledge across the team every week.',
        },
    ];

    const team = [
        {
            initials: '?',
            name: 'Hidden Partner',
            role: 'Chief Executive Officer',
            roleColor: '#a78bfa',
            bg: 'linear-gradient(135deg,#2d1b69,#5b21b6,#7c3aed)',
            avBg: 'linear-gradient(135deg,#3d1a78,#7c3aed,#a78bfa)',
            desc: "The silent strategist behind Ayamil Coders' direction. A real, active CEO whose identity is intentionally kept private by company policy — their influence shows in the company's work, not a name on a page.",
            tags: [['tp', 'Strategy'], ['tb', 'Vision'], ['tg', 'Private by Choice']],
            showBadge: true,
        },
        {
            initials: 'MM',
            name: 'Muhammad Muzamil',
            role: 'Founder',
            roleColor: 'var(--blue-lt)',
            bg: 'linear-gradient(135deg,#0d2f8c,#1248a8,#2979f2)',
            avBg: 'linear-gradient(135deg,#0d2f8c,#2979f2,#5a9af5)',
            desc: 'Visionary behind Ayamil Coders. Full-stack developer, blockchain architect, and the public-facing leader driving every client engagement since July 2023.',
            tags: [['tb', 'Laravel'], ['tg', 'Blockchain'], ['tp', 'React']],
            showBadge: true,
        },
        {
            initials: 'ZA',
            name: 'Zunaira Asif',
            role: 'Chief Technology Officer',
            roleColor: '#34d399',
            bg: 'linear-gradient(135deg,#064e3b,#065f46,#059669)',
            avBg: 'linear-gradient(135deg,#04432c,#059669,#34d399)',
            desc: 'Leads engineering architecture and technical delivery. Ensures code quality, security standards, and on-time releases across all service lines.',
            tags: [['tp', 'React'], ['tb', 'Node.js'], ['tg', 'DevOps']],
            showBadge: true,
        },
        {
            initials: 'ZA',
            name: 'Zayan Ali',
            role: 'Chief Operating Officer',
            roleColor: '#fbbf24',
            bg: 'linear-gradient(135deg,#78350f,#92400e,#d97706)',
            avBg: 'linear-gradient(135deg,#78350f,#d97706,#fbbf24)',
            desc: 'Manages client relations, project pipelines, and team coordination — the operational backbone keeping every engagement smooth and on schedule.',
            tags: [['ta', 'Ops'], ['tb', 'Client Success'], ['tg', 'Strategy']],
            showBadge: true,
        },
        {
            initials: 'DEV',
            name: 'Development Team',
            role: 'Engineers & Specialists',
            roleColor: 'var(--blue-lt)',
            bg: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
            avBg: 'linear-gradient(135deg,#0d2f8c,#1e3a8a,#3b82f6)',
            desc: 'A growing team of full-stack developers, blockchain engineers, AI specialists, and automation experts — all remote, all based in Punjab, Pakistan.',
            tags: [['tb', 'Full-Stack'], ['tg', 'AI/ML'], ['tp', 'Solidity']],
            showBadge: false,
            avSize: '13px',
        },
        {
            initials: 'BUG',
            name: 'Bug Fixing Team',
            role: 'Debugging & Code Repair Specialists',
            roleColor: '#f472b6',
            bg: 'linear-gradient(135deg,#6b1a3a,#9d174d,#db2777)',
            avBg: 'linear-gradient(135deg,#6b1a3a,#db2777,#f472b6)',
            desc: 'Diagnosing and fixing bugs across web, blockchain, and AI codebases — root-cause repairs, performance tuning, and stability fixes for projects built by any team.',
            tags: [['ta', 'Debugging'], ['tb', 'Code Review'], ['tg', 'Performance']],
            showBadge: false,
            avSize: '13px',
        },
        {
            initials: 'SUP',
            name: 'Support & QA',
            role: 'Quality & Client Care',
            roleColor: 'var(--cyan)',
            bg: 'linear-gradient(135deg,#0c1a3a,#0d2f8c,#1e40af)',
            avBg: 'linear-gradient(135deg,#0d2f8c,#2979f2,#60a5fa)',
            desc: 'Dedicated testers and support specialists ensuring every delivery is bug-free and every client question gets a fast, clear answer.',
            tags: [['tb', 'Testing'], ['tg', '24/7 Support'], ['ta', 'QA']],
            showBadge: false,
            avSize: '13px',
        },
    ];

    const skills = [
        {
            name: 'Web Development (React, Laravel, Node.js)',
            pct: '98%',
            bg: 'linear-gradient(90deg,var(--blue-dk),var(--blue),var(--blue-lt))',
        },
        {
            name: 'Blockchain Development (Solidity, DeFi, NFT)',
            pct: '92%',
            bg: 'linear-gradient(90deg,#3d1a78,#7c3aed,#a78bfa)',
        },
        {
            name: 'AI Development (Python, OpenAI, TensorFlow)',
            pct: '85%',
            bg: 'linear-gradient(90deg,#04432c,#059669,#34d399)',
        },
        {
            name: 'Bug Fixing (Debugging, Code Review, QA)',
            pct: '95%',
            bg: 'linear-gradient(90deg,#6b3500,#d97706,#fbbf24)',
        },
    ];

    const awards = [
        { icon: '⭐', title: 'Top Rated', sub: 'Fiverr Seller' },
        { icon: '🏆', title: '600+ Projects', sub: 'Completed' },
        { icon: '🌐', title: '50+ Countries', sub: 'Client Base' },
        { icon: '💯', title: '87% Satisfaction', sub: 'Rate' },
    ];

    const stats = [
        { label: 'Projects Delivered', value: 600,  color: 'var(--blue-lt)' },
        { label: 'Issues Resolved',    value: 2000, color: 'var(--cyan)'    },
        { label: 'Countries Served',   value: 50,   color: 'var(--green)'   },
        { label: 'Years Experience',   value: 10,   color: 'var(--purple)'  },
    ];

    const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'AboutPage',
                '@id': 'https://ayamilcoders.com/about#webpage',
                name: 'About Ayamil Coders — Software House Pakistan',
                description:
                    'Ayamil Coders was founded on July 21, 2023 in Sadiqabad, Punjab, Pakistan — a date chosen as a birthday tribute to the Hidden Partner, the silent strategist behind the company. A remote-first software house delivering Web Development, Blockchain Development, AI Development, and Bug Fixing to 50+ international clients worldwide.',
                url: 'https://ayamilcoders.com/about',
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Ayamil Coders',
                    url: 'https://ayamilcoders.com',
                },
                speakable: {
                    '@type': 'SpeakableSpecification',
                    cssSelector: ['h1', '[data-speakable="summary"]'],
                },
                mainEntity: { '@id': 'https://ayamilcoders.com/#organization' },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ayamilcoders.com' },
                    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://ayamilcoders.com/about' },
                ],
            },
            {
                '@type': 'ProfessionalService',
                '@id': 'https://ayamilcoders.com/#organization',
                name: 'Ayamil Coders',
                url: 'https://ayamilcoders.com',
                logo: 'https://ayamilcoders.com/logo.png',
                foundingDate: '2023-07-21',
                slogan: 'Web Development, Blockchain Development, AI Development & Bug Fixing — Done Right.',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Sadiqabad',
                    addressRegion: 'Punjab',
                    addressCountry: 'PK',
                },
                sameAs: [
                    'https://facebook.com/ayamilcoders',
                    'https://www.fiverr.com/muzamil516',
                ],
                knowsAbout: [
                    'Web Development', 'React', 'Laravel', 'Node.js',
                    'Blockchain Development', 'Solidity', 'Smart Contracts', 'DeFi', 'NFT',
                    'AI Development', 'Machine Learning', 'Python', 'OpenAI API Integration',
                    'Bug Fixing', 'Debugging', 'Code Review', 'Software QA',
                ],
                founder: {
                    '@type': 'Person',
                    '@id': 'https://ayamilcoders.com/about#muhammad-muzamil',
                    name: 'Muhammad Muzamil',
                    jobTitle: 'Founder & Full-Stack/Blockchain Developer',
                    description: 'Founder of Ayamil Coders; full-stack developer and blockchain architect leading client engagements since July 2023.',
                    worksFor: { '@id': 'https://ayamilcoders.com/#organization' },
                },
                employee: [
                    {
                        '@type': 'Person',
                        name: 'Hidden Partner',
                        jobTitle: 'Chief Executive Officer',
                        description: "Ayamil Coders' CEO, known publicly as the Hidden Partner. Their real-world identity is intentionally kept private by company policy; their strategic guidance shapes the company's direction.",
                        worksFor: { '@id': 'https://ayamilcoders.com/#organization' },
                    },
                    {
                        '@type': 'Person',
                        name: 'Zunaira Asif',
                        jobTitle: 'Chief Technology Officer',
                        description: 'Leads engineering architecture, code quality, and security standards across all Ayamil Coders service lines.',
                        worksFor: { '@id': 'https://ayamilcoders.com/#organization' },
                    },
                    {
                        '@type': 'Person',
                        name: 'Zayan Ali',
                        jobTitle: 'Chief Operating Officer',
                        description: 'Manages client relations, delivery pipelines, and operational quality at Ayamil Coders.',
                        worksFor: { '@id': 'https://ayamilcoders.com/#organization' },
                    },
                ],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Ayamil Coders Services',
                    itemListElement: [
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', serviceType: 'Web Development' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blockchain Development', serviceType: 'Blockchain Development' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Development', serviceType: 'AI Development' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bug Fixing', serviceType: 'Bug Fixing' } },
                    ],
                },
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Who founded Ayamil Coders and when?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Ayamil Coders was founded by Muhammad Muzamil on July 21, 2023, in Sadiqabad, Punjab, Pakistan, growing from a solo freelancer into a structured remote software house.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Who is the CEO of Ayamil Coders?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The CEO of Ayamil Coders is publicly known as the Hidden Partner. They are a real, active co-strategist behind the company\'s direction; their identity is intentionally kept private by company policy and may be disclosed publicly in the future.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How much experience does the Ayamil Coders team have?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The combined team has 10+ years of hands-on experience and has delivered 600+ projects across Web Development, Blockchain Development, AI Development, and Bug Fixing for 50+ international clients.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What makes Ayamil Coders a trustworthy software house?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Ayamil Coders operates with radical transparency wherever possible, security-first development practices, and a clearly defined leadership team: a named Founder, CTO, and COO, plus a CEO publicly known as the Hidden Partner whose identity is kept private by company policy. This is backed by a public track record of 600+ delivered projects and an 87% client satisfaction rate.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <>
            <SEO
                title="About Ayamil Coders — Software House Pakistan | Web, Blockchain, AI & Bug Fixing"
                description="Ayamil Coders is a Pakistan-based software house founded July 21, 2023 in Sadiqabad, Punjab — a birthday tribute to the Hidden Partner. We deliver Web Development, Blockchain Development, AI Development, and Bug Fixing to 50+ international clients."
                keywords="about Ayamil Coders, software house Pakistan, web development company Pakistan, blockchain development services, smart contract developers, AI development company, bug fixing service Pakistan, debug code online, Sadiqabad Punjab, Muhammad Muzamil, hidden partner Ayamil, silent strategist, Zunaira Asif CTO, Zayan Ali COO"
                url="https://ayamilcoders.com/about"
                schema={pageSchema}
            />

            {/* ===== PAGE HERO ===== */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(41,121,242,.12),transparent 70%)', top: '-150px', right: '-100px' }}></div>
                <div className="page-hero-blob" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(0,200,232,.07),transparent 70%)', bottom: '-80px', left: '60px' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div data-a="up">
                        <span className="section-lbl">About Us</span>
                        <h1 style={{ fontSize: 'clamp(36px,6vw,68px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05, margin: '12px 0 18px' }}>
                            Built in Pakistan.<br /><span className="shimmer-txt">Trusted Worldwide.</span>
                        </h1>
                        <p data-speakable="summary" style={{ fontSize: '16px', color: 'var(--txt2)', maxWidth: '580px', lineHeight: 1.75, marginBottom: '28px' }}>
                            Ayamil Coders is a remote-first software house founded on <strong style={{ color: 'var(--txt)' }}>July 21, 2023</strong> in Sadiqabad, Punjab — shipping world-class Web Development, Blockchain Development, AI Development, and Bug Fixing to clients across <strong style={{ color: 'var(--txt)' }}>50+ countries</strong>.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <a href="/contact" className="btn-p" style={{ padding: '12px 28px' }}>Work With Us →</a>
                            <a href="#story" className="btn-g" style={{ padding: '12px 28px' }}>Our Story ↓</a>
                        </div>
                    </div>

                    {/* Quick stat strip */}
                    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginTop: '44px', paddingTop: '28px', borderTop: '1px solid var(--brd)' }} data-a="up" data-d="2">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '28px', color: stat.color }} className="counter" data-t={stat.value}>0</div>
                                <div style={{ fontSize: '12px', color: 'var(--txt3)', fontFamily: 'var(--mono)', marginTop: '2px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== OUR STORY ===== */}
            <section className="sp" id="story">
                <div className="about-two-col">
                    <div data-a="left">
                        <span className="section-lbl">Origin Story</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', margin: '12px 0 18px' }}>
                            From a Small City.<br />To a Global Stage.
                        </h2>
                        <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.8, marginBottom: '16px' }}>
                            Ayamil Coders was born in July 2023 out of a simple conviction: high-quality software shouldn't require a big-city address or a Western price tag. Founder <strong style={{ color: 'var(--txt)' }}>Muhammad Muzamil</strong> started the company in <strong style={{ color: 'var(--txt)' }}>Sadiqabad, Punjab, Pakistan</strong>, guided from day one by the strategic direction of the company's CEO — known publicly as the <strong style={{ color: 'var(--txt)' }}>Hidden Partner</strong> — operating fully remotely and building a team of full-stack engineers, blockchain specialists, AI developers, and dedicated bug-fixing/QA testers.
                        </p>
                        <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.8, marginBottom: '16px' }}>
                            While Muhammad Muzamil leads publicly as Founder, the Hidden Partner has steered the company's long-term vision and decision-making as CEO since its earliest days — their identity kept private by choice, not absence. Every major milestone in this timeline carries their fingerprint, even where their name doesn't appear.
                        </p>
                        <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.8, marginBottom: '24px' }}>
                            In just over two years, the company grew from a solo freelancer on Fiverr to a structured software house led by the CEO and Founder together, with a dedicated CTO (<strong style={{ color: 'var(--txt)' }}>Zunaira Asif</strong>), COO (<strong style={{ color: 'var(--txt)' }}>Zayan Ali</strong>), and a full engineering team — shipping everything from React/Laravel web apps to audited Solidity smart contracts, DeFi protocols, AI automation pipelines, and fast-turnaround bug fixing for projects built by other teams.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <span className="tag tb">🇵🇰 Sadiqabad, Punjab</span>
                            <span className="tag tg">Remote-First</span>
                            <span className="tag tp">Founded July 21, 2023</span>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div data-a="right">
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--txt3)', marginBottom: '24px' }}>
                            Company Timeline
                        </div>
                        <div className="timeline">
                            {timeline.map((item, index) => (
                                <div key={index} className="tl-item">
                                    <div className="tl-year">{item.year}</div>
                                    <div className="tl-title">{item.title}</div>
                                    <div className="tl-desc">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== VALUES ===== */}
            <section className="sp" style={{ background: 'rgba(5,13,26,.3)' }}>
                <div style={{ textAlign: 'center', marginBottom: '44px' }} data-a="blur">
                    <span className="section-lbl">What Drives Us</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        Core <span className="shimmer-txt">Values</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                        The principles that govern every commit, every client call, and every delivery at Ayamil Coders.
                    </p>
                </div>
                <div className="val-grid">
                    {values.map((val, index) => (
                        <div key={index} className="val-card" data-a="scale" data-d={(index % 3) + 1}>
                            <div className="val-icon ib i3">{val.icon}</div>
                            <div className="val-title">{val.title}</div>
                            <div className="val-desc">{val.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== HIDDEN PARTNER — DEDICATED SECTION ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl">The Heart Behind Ayamil</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        The <span className="shimmer-txt">Hidden Partner</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                        Every great company has an unseen foundation. Ours is someone whose identity we keep private — but whose influence shapes everything we do.
                    </p>
                </div>

                <div className="hidden-section" data-a="scale">
                    <div className="hidden-grid">
                        {/* Avatar */}
                        <div className="hidden-avatar">🌙</div>

                        {/* Content */}
                        <div>
                            <div className="hidden-name-pill">
                                <span className="hidden-dot"></span>
                                Hidden Partner — Chief Executive Officer
                            </div>
                            <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.025em', color: 'var(--txt)', marginBottom: '12px', lineHeight: 1.2 }}>
                                The Silent Strategist.<br />
                                <span style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The CEO in the Shadows.</span>
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.8, marginBottom: '20px', maxWidth: '560px' }}>
                                The Hidden Partner is the core inspiration and silent strategist behind Ayamil Coders — our unseen foundation. While Muhammad Muzamil leads publicly, the Hidden Partner provides the underlying stability, vision, and strategic guidance that shapes the company's long-term direction. Their identity is intentionally kept confidential and will remain so.
                            </p>

                            {/* Three key facts */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div className="hidden-fact">
                                    <div className="hidden-fact-icon">✨</div>
                                    <div>
                                        <div className="hidden-fact-t">The Name "Ayamil" Is a Tribute</div>
                                        <div className="hidden-fact-d">
                                            "Ayamil" is a linguistic fusion — combining the name of Founder <strong style={{ color: 'var(--txt)' }}>Muhammad Muzamil</strong> with the private name of the Hidden Partner. Every time our company name is spoken, it honours both of them equally.
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden-fact">
                                    <div className="hidden-fact-icon">🎂</div>
                                    <div>
                                        <div className="hidden-fact-t">July 21 — A Birthday Gift</div>
                                        <div className="hidden-fact-d">
                                            The company was officially launched on <strong style={{ color: 'var(--txt)' }}>July 21, 2023</strong> — a date chosen deliberately as a birthday tribute to the Hidden Partner. The founding of Ayamil Coders itself was a gift.
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden-fact">
                                    <div className="hidden-fact-icon">🛡️</div>
                                    <div>
                                        <div className="hidden-fact-t">Identity Kept Private — By Design</div>
                                        <div className="hidden-fact-d">
                                            The Hidden Partner's real-world identity is intentionally withheld from the public. Ayamil Coders will always respect this choice. Their influence speaks through the company's work — not through a name on a page.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="/ceo" className="btn-g" style={{ display: 'inline-flex', marginTop: '22px', padding: '11px 24px', fontSize: '13.5px' }}>
                                Meet Our CEO →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== TEAM ===== */}
            <section className="sp">
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }} data-a="right" className="tr ae">
                    <span className="section-lbl">The People</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '6px' }} className="tr">
                        Meet the <span className="shimmer-txt">Team</span>
                    </h2>
                </div>
                <div className="team-grid">
                    {team.map((member, index) => (
                        <div key={index} className="team-card" data-a="scale" data-d={(index % 3) + 1}>
                            <div className="team-banner" style={{ background: member.bg }}>
                                <div style={{ position: 'relative' }}>
                                    <div className="team-av" style={{ background: member.avBg, fontSize: (member as any).avSize || '18px' }}>
                                        {member.initials}
                                    </div>
                                    {member.showBadge && (
                                        <span className="team-badge">✓</span>
                                    )}
                                </div>
                            </div>
                            <div style={{ padding: '18px' }}>
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)' }}>{member.name}</div>
                                <div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: member.roleColor, margin: '3px 0 10px' }}>{member.role}</div>
                                <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.65, marginBottom: '14px' }}>{member.desc}</p>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                    {member.tags.map(([cls, label]) => (
                                        <span key={label} className={`tag ${cls}`}>{label}</span>
                                    ))}
                                </div>
                                {member.name === 'Hidden Partner' && (
                                    <a href="/ceo" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '14px', fontSize: '12.5px', fontWeight: 600, color: '#a78bfa', textDecoration: 'none' }}>
                                        Learn more about our CEO →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== SKILLS / EXPERTISE BARS ===== */}
            <section className="sp" style={{ background: 'rgba(5,13,26,.3)' }}>
                <div className="about-two-col">
                    <div data-a="left">
                        <span className="section-lbl">Expertise</span>
                        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', margin: '12px 0 14px' }}>
                            Where We <span className="shimmer-txt">Excel</span>
                        </h2>
                        <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.75, marginBottom: '28px' }}>
                            600+ delivered projects across four core disciplines — sharpened through real client work, not just theory.
                        </p>
                        <div>
                            {skills.map((skill, index) => (
                                <div key={index} className="skill-row">
                                    <div className="skill-top">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-pct">{skill.pct}</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="bf" data-w={skill.pct.replace('%', '')} style={{ background: skill.bg }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Awards */}
                    <div data-a="right">
                        <span className="section-lbl">Recognition</span>
                        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', margin: '12px 0 28px' }}>
                            Milestones & <span className="shimmer-txt">Badges</span>
                        </h2>
                        <div className="award-grid">
                            {awards.map((award, index) => (
                                <div key={index} className="award-card" data-a="scale" data-d={(index % 4) + 1}>
                                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{award.icon}</div>
                                    <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)', marginBottom: '3px' }}>{award.title}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>{award.sub}</div>
                                </div>
                            ))}
                        </div>

                        {/* Location badge */}
                        <div style={{ marginTop: '24px', background: 'var(--card-bg)', border: '1px solid var(--brd)', borderRadius: 'var(--r-lg)', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ fontSize: '32px' }}>🇵🇰</div>
                            <div>
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '14px', color: 'var(--txt)', marginBottom: '3px' }}>Sadiqabad, Punjab, Pakistan</div>
                                <div style={{ fontSize: '12px', color: 'var(--txt3)', lineHeight: 1.6 }}>Headquartered locally, operating globally. All work done remotely with async + real-time communication across 50+ countries.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== FAQ (AEO / GEO / LLMO + E-E-A-T: mirrors FAQPage JSON-LD
                 so answer engines and LLMs can extract & cite trust signals) ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '36px' }} data-a="blur">
                    <span className="section-lbl">Quick Answers</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', margin: '12px 0 0' }}>
                        About Ayamil Coders — <span className="shimmer-txt">FAQ</span>
                    </h2>
                </div>
                <div style={{ display: 'grid', gap: '14px', maxWidth: '760px', margin: '0 auto' }}>
                    {[
                        {
                            q: 'Who founded Ayamil Coders and when?',
                            a: 'Ayamil Coders was founded by Muhammad Muzamil on July 21, 2023, in Sadiqabad, Punjab, Pakistan, growing from a solo freelancer into a structured remote software house.',
                        },
                        {
                            q: 'Who is the CEO of Ayamil Coders?',
                            a: "The CEO of Ayamil Coders is publicly known as the Hidden Partner. They are a real, active co-strategist behind the company's direction; their identity is intentionally kept private by company policy and may be disclosed publicly in the future.",
                        },
                        {
                            q: 'How much experience does the Ayamil Coders team have?',
                            a: 'The combined team has 10+ years of hands-on experience and has delivered 600+ projects across Web Development, Blockchain Development, AI Development, and Bug Fixing for 50+ international clients.',
                        },
                        {
                            q: 'What makes Ayamil Coders a trustworthy software house?',
                            a: 'We operate with radical transparency wherever possible, security-first development practices, and a clearly defined leadership team: a named Founder, CTO, and COO, plus a CEO publicly known as the Hidden Partner whose identity is kept private by company policy — backed by a public track record of 600+ delivered projects and an 87% client satisfaction rate.',
                        },
                    ].map((item, i) => (
                        <details key={i} className="val-card" data-a="up" data-d={i + 1} style={{ cursor: 'pointer' }}>
                            <summary style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)', listStyle: 'none' }}>
                                {item.q}
                            </summary>
                            <p style={{ fontSize: '13.5px', color: 'var(--txt2)', lineHeight: 1.75, marginTop: '10px' }}>{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== CTA BANNER ===== */}
            <section className="sp" style={{ textAlign: 'center' }}>
                <div data-a="scale">
                    <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '18px' }}>Let's Connect</span>
                    <h2 style={{ fontSize: 'clamp(28px,5vw,54px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '16px' }}>
                        Ready to Build<br /><span className="shimmer-txt">Something Great?</span>
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.7 }}>
                        Whether it's a startup MVP, a DeFi protocol, or an enterprise AI tool — we've built it before, and we'll build it better for you.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/contact" className="btn-p" style={{ padding: '14px 32px', fontSize: '15px' }}>Start a Project →</a>
                        <a href="/careers" className="btn-g" style={{ padding: '14px 32px', fontSize: '15px' }}>Join Our Team</a>
                    </div>
                </div>
            </section>
        </>
    );
}
