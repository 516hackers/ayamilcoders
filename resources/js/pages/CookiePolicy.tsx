// resources/js/pages/CookiePolicy.tsx

import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function CookiePolicy() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('cookie-policy-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'cookie-policy-css';
        style.textContent = `
            /* ── LEGAL PAGE LAYOUT ── */
            .legal-layout {
                display: grid;
                grid-template-columns: 220px 1fr;
                gap: 48px;
                align-items: flex-start;
                max-width: 1100px;
                margin: 0 auto;
            }
            @media(max-width:1023px) {
                .legal-layout {
                    grid-template-columns: 1fr;
                    gap: 32px;
                }
            }

            /* Sticky Table of Contents */
            .toc {
                position: sticky;
                top: 80px;
                background: var(--card-bg);
                border: 1px solid var(--brd);
                border-radius: var(--r-xl);
                padding: 22px;
                transition: background .3s;
            }
            @media(max-width:1023px) {
                .toc {
                    position: static;
                    margin-bottom: 0;
                }
            }
            @media(max-width:639px) {
                .toc {
                    padding: 14px 16px;
                }
            }
            .toc-title {
                font-family: var(--mono);
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: .1em;
                color: var(--txt3);
                margin-bottom: 14px;
            }
            @media(max-width:639px) {
                .toc-title {
                    font-size: 10px;
                    margin-bottom: 10px;
                }
            }
            .toc-links {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            .toc-a {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: var(--txt3);
                text-decoration: none;
                padding: 7px 9px;
                border-radius: 8px;
                transition: all .2s;
                line-height: 1.4;
            }
            @media(max-width:639px) {
                .toc-a {
                    font-size: 12px;
                    padding: 5px 8px;
                    gap: 6px;
                }
                .toc-a span {
                    font-size: 9px;
                    min-width: 16px;
                }
            }
            .toc-a:hover,
            .toc-a.active {
                background: rgba(41,121,242,.08);
                color: var(--txt);
                border-left: 2px solid var(--blue);
            }
            .toc-a span {
                font-family: var(--mono);
                font-size: 10px;
                color: var(--txt3);
                min-width: 18px;
            }

            /* Legal content area */
            .legal-body {
                min-width: 0;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            .legal-section {
                margin-bottom: 52px;
                scroll-margin-top: 90px;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            .legal-section:last-of-type {
                margin-bottom: 0;
            }
            @media(max-width:639px) {
                .legal-section {
                    margin-bottom: 32px;
                }
            }
            .ls-num {
                font-family: var(--mono);
                font-size: 11px;
                color: var(--blue-lt);
                text-transform: uppercase;
                letter-spacing: .1em;
                margin-bottom: 6px;
            }
            @media(max-width:639px) {
                .ls-num {
                    font-size: 10px;
                }
            }
            .ls-title {
                font-family: var(--disp);
                font-weight: 800;
                font-size: 22px;
                color: var(--txt);
                margin-bottom: 14px;
                letter-spacing: -.02em;
            }
            @media(max-width:639px) {
                .ls-title {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
            }
            @media(max-width:480px) {
                .ls-title {
                    font-size: 16px;
                }
            }
            .ls-body {
                font-size: 14px;
                color: var(--txt2);
                line-height: 1.85;
            }
            @media(max-width:639px) {
                .ls-body {
                    font-size: 13px;
                    line-height: 1.75;
                }
            }
            @media(max-width:480px) {
                .ls-body {
                    font-size: 12.5px;
                    line-height: 1.7;
                }
            }
            .ls-body p {
                margin-bottom: 14px;
            }
            @media(max-width:639px) {
                .ls-body p {
                    margin-bottom: 10px;
                }
            }
            .ls-body p:last-child {
                margin-bottom: 0;
            }
            .ls-body ul {
                padding-left: 20px;
                margin: 12px 0 14px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            @media(max-width:639px) {
                .ls-body ul {
                    padding-left: 16px;
                    gap: 6px;
                    margin: 8px 0 10px;
                }
            }
            .ls-body li {
                color: var(--txt2);
                line-height: 1.7;
            }
            @media(max-width:639px) {
                .ls-body li {
                    line-height: 1.6;
                }
            }
            .ls-body strong {
                color: var(--txt);
                font-weight: 600;
            }
            .ls-body a {
                color: var(--blue-lt);
                text-decoration: none;
                border-bottom: 1px solid rgba(41,121,242,.3);
                transition: border-color .2s;
            }
            .ls-body a:hover {
                border-color: var(--blue-lt);
            }

            .info-box {
                background: rgba(41,121,242,.06);
                border: 1px solid rgba(41,121,242,.18);
                border-radius: var(--r-lg);
                padding: 18px 20px;
                margin: 18px 0;
            }
            @media(max-width:639px) {
                .info-box {
                    padding: 14px 16px;
                    margin: 12px 0;
                    border-radius: var(--r-md);
                }
                .info-box p {
                    font-size: 12px !important;
                }
            }
            .info-box-warn {
                background: rgba(240,167,50,.05);
                border-color: rgba(240,167,50,.2);
            }
            .info-box-green {
                background: rgba(5,150,105,.05);
                border-color: rgba(5,150,105,.2);
            }
            .info-box-red {
                background: rgba(255,55,95,.05);
                border-color: rgba(255,55,95,.2);
            }
            .info-box p {
                margin-bottom: 0 !important;
                font-size: 13px;
                line-height: 1.7;
            }

            .section-divider {
                height: 1px;
                background: linear-gradient(90deg, rgba(41,121,242,.2), transparent);
                margin: 48px 0;
            }
            @media(max-width:639px) {
                .section-divider {
                    margin: 28px 0;
                }
            }

            /* Meta strip */
            .legal-meta {
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
                margin-bottom: 36px;
                padding: 16px 20px;
                background: var(--card-bg);
                border: 1px solid var(--brd);
                border-radius: var(--r-lg);
            }
            @media(max-width:639px) {
                .legal-meta {
                    gap: 10px;
                    padding: 12px 14px;
                    margin-bottom: 24px;
                    border-radius: var(--r-md);
                }
            }
            @media(max-width:480px) {
                .legal-meta {
                    gap: 8px;
                    padding: 10px 12px;
                }
            }
            .lm-item {
                display: flex;
                flex-direction: column;
                gap: 3px;
            }
            @media(max-width:639px) {
                .lm-item {
                    flex: 1 1 calc(50% - 10px);
                }
            }
            @media(max-width:480px) {
                .lm-item {
                    flex: 1 1 100%;
                }
            }
            .lm-label {
                font-family: var(--mono);
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: .08em;
                color: var(--txt3);
            }
            @media(max-width:639px) {
                .lm-label {
                    font-size: 9px;
                }
            }
            .lm-value {
                font-size: 13px;
                color: var(--txt);
                font-weight: 500;
            }
            @media(max-width:639px) {
                .lm-value {
                    font-size: 12px;
                }
            }

            .page-hero-blob {
                position: absolute;
                border-radius: 50%;
                filter: blur(80px);
                pointer-events: none;
            }

            /* Cookie-specific styles */
            .cookie-table-wrap {
                overflow-x: auto;
                margin: 18px 0;
                border-radius: var(--r-lg);
                border: 1px solid var(--brd);
            }
            .cookie-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
                min-width: 500px;
            }
            @media(max-width:639px) {
                .cookie-table {
                    font-size: 12px;
                    min-width: 400px;
                }
            }
            .cookie-table th {
                text-align: left;
                padding: 12px 16px;
                font-family: var(--mono);
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: .08em;
                color: var(--txt3);
                background: rgba(41,121,242,.04);
                border-bottom: 1px solid var(--brd);
            }
            .cookie-table td {
                padding: 10px 16px;
                color: var(--txt2);
                border-bottom: 1px solid var(--brd);
                line-height: 1.6;
            }
            .cookie-table tr:last-child td {
                border-bottom: none;
            }

            .cookie-category-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin: 18px 0;
            }
            @media(max-width:639px) {
                .cookie-category-grid {
                    grid-template-columns: 1fr;
                }
            }
            .cookie-cat {
                background: var(--card-bg);
                border: 1px solid var(--brd);
                border-radius: var(--r-lg);
                padding: 18px;
                transition: all .3s;
            }
            .cookie-cat:hover {
                border-color: var(--brd2);
                transform: translateY(-2px);
            }
            .cookie-cat-icon {
                font-size: 20px;
                margin-bottom: 8px;
            }
            .cookie-cat-title {
                font-family: var(--disp);
                font-weight: 700;
                font-size: 14px;
                color: var(--txt);
                margin-bottom: 4px;
            }
            .cookie-cat-desc {
                font-size: 13px;
                color: var(--txt3);
                line-height: 1.65;
            }
            .cookie-cat-desc strong {
                color: var(--txt2);
                font-weight: 600;
            }

            /* ── RESPONSIVE MOBILE FIXES ── */
            @media(max-width:1023px) {
                .legal-body {
                    display: block !important;
                    width: 100% !important;
                }
                .legal-section {
                    display: block !important;
                    width: 100% !important;
                }
            }

            @media(max-width:767px) {
                .sp {
                    padding: 24px 16px 40px !important;
                }
                .page-hero {
                    padding: 40px 16px 32px !important;
                }
                .page-hero h1 {
                    font-size: 28px !important;
                }
                .page-hero p {
                    font-size: 14px !important;
                }
                .legal-layout {
                    gap: 24px;
                }
                .legal-body {
                    padding: 0 !important;
                }
                .legal-section {
                    padding: 0 !important;
                }
            }

            @media(max-width:480px) {
                .sp {
                    padding: 16px 12px 32px !important;
                }
                .page-hero {
                    padding: 32px 12px 24px !important;
                }
                .page-hero h1 {
                    font-size: 24px !important;
                }
                .page-hero p {
                    font-size: 13px !important;
                }
                .legal-layout {
                    gap: 16px;
                }
                .section-divider {
                    margin: 20px 0;
                }
                .legal-section {
                    margin-bottom: 24px;
                }
                .toc {
                    padding: 12px 14px;
                }
                .toc-a {
                    font-size: 11px;
                    padding: 4px 6px;
                }
            }

            /* ── LIGHT THEME OVERRIDES ── */
            [data-theme="light"] .toc {
                background: rgba(255,255,255,.95);
                border-color: rgba(41,121,242,.12);
            }
            [data-theme="light"] .legal-meta {
                background: rgba(255,255,255,.95);
                border-color: rgba(41,121,242,.12);
            }
            [data-theme="light"] .cookie-cat {
                background: rgba(255,255,255,.95);
            }
            [data-theme="light"] .toc-a.active {
                color: #0d1b38;
            }
            [data-theme="light"] .cookie-table th {
                background: rgba(41,121,242,.06);
            }
        `;
        document.head.appendChild(style);

        return () => {
            const el = document.getElementById('cookie-policy-css');
            if (el) el.remove();
        };
    }, []);

    // ===== JS FOR COOKIE POLICY PAGE =====
    useEffect(() => {
        // ---- SCROLL REVEAL ----
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

        // ---- HIGHLIGHT ACTIVE TOC LINK ON SCROLL ----
        const sections = document.querySelectorAll('.legal-section[id]');
        const links = document.querySelectorAll('.toc-a');
        const tocObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    links.forEach(l => l.classList.remove('active'));
                    const active = document.querySelector(`.toc-a[href="#${entry.target.id}"]`);
                    if (active) active.classList.add('active');
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        sections.forEach(s => tocObs.observe(s));

        return () => {
            revealObs.disconnect();
            tocObs.disconnect();
        };
    }, []);

    // ===== DATA =====
    const tocItems = [
        { id: 'what-are-cookies', num: '01', label: 'What Are Cookies' },
        { id: 'how-we-use', num: '02', label: 'How We Use Cookies' },
        { id: 'cookie-types', num: '03', label: 'Types of Cookies' },
        { id: 'specific-cookies', num: '04', label: 'Specific Cookies Used' },
        { id: 'third-party', num: '05', label: 'Third-Party Cookies' },
        { id: 'your-choices', num: '06', label: 'Your Choices' },
        { id: 'changes-cookie', num: '07', label: 'Policy Changes' },
        { id: 'contact-cookie', num: '08', label: 'Contact Us' }
    ];

    const metaInfo = [
        { label: 'Effective Date', value: 'January 1, 2025' },
        { label: 'Last Updated', value: 'January 1, 2025' },
        { label: 'Jurisdiction', value: 'Punjab, Pakistan' },
        { label: 'Contact', value: 'info@ayamilcoders.com' }
    ];

    const cookieCategories = [
        {
            icon: '⚙️',
            title: 'Strictly Necessary',
            desc: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.'
        },
        {
            icon: '🎨',
            title: 'Functionality',
            desc: 'These cookies allow the website to remember choices you make (such as your theme preference) and provide enhanced, more personal features. They improve your experience but are not essential.'
        },
        {
            icon: '📊',
            title: 'Analytics',
            desc: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our site and services.'
        },
        {
            icon: '🔒',
            title: 'Security',
            desc: 'These cookies are used to authenticate users, prevent fraudulent use of login credentials, and protect user data from unauthorised access. They are essential for security.'
        }
    ];

    const cookieTableData = [
        { name: 'theme', purpose: 'Stores your dark/light mode preference', duration: 'Permanent (localStorage)', type: 'Functionality' },
        { name: 'session_id', purpose: 'Temporary session identifier for server-side requests', duration: 'Session (expires on browser close)', type: 'Strictly Necessary' },
        { name: 'csrf_token', purpose: 'Protects against cross-site request forgery attacks', duration: 'Session', type: 'Strictly Necessary' }
    ];

        const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Cookie Policy",
        "description": "Learn about how Ayamil Coders uses cookies on our website. We use minimal cookies for functionality and theme preference.",
        "url": "https://ayamilcoders.com/cookie-policy",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Ayamil Coders",
            "url": "https://ayamilcoders.com"
        }
    };

    return (
        <>
          <SEO 
                title="Cookie Policy"
                description="Learn about how Ayamil Coders uses cookies on our website. We use minimal cookies for functionality and theme preference only. No tracking or advertising cookies."
                keywords="cookie policy, cookies, privacy, data protection, tracking, Ayamil Coders"
                url="https://ayamilcoders.com/cookie-policy"
                schema={pageSchema}
            />
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '450px', height: '450px', background: 'radial-gradient(circle,rgba(240,167,50,.08),transparent 70%)', top: '-100px', right: '-50px' }}></div>
                <div className="page-hero-blob" style={{ width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(41,121,242,.07),transparent 70%)', bottom: '-60px', left: '10%' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }} data-a="up">
                    <span className="section-lbl">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '2px' }}>
                            <circle cx="12" cy="12" r="10"/>
                            <circle cx="9" cy="9" r="1" fill="currentColor"/>
                            <circle cx="15" cy="9" r="1" fill="currentColor"/>
                            <circle cx="9" cy="15" r="1" fill="currentColor"/>
                            <circle cx="15" cy="15" r="1" fill="currentColor"/>
                        </svg>
                        Privacy
                    </span>
                    <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.08, margin: '12px 0 14px' }}>
                        Cookie <span className="shimmer-txt">Policy</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '560px', lineHeight: 1.75 }}>
                        We use cookies minimally and transparently — only to make your experience better. This policy explains exactly what we use and why.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                        <a href="/privacy-policy" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Privacy Policy
                        </a>
                        <a href="/terms" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            Terms &amp; Conditions
                        </a>
                        <a href="/contact" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            Talk to Us
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== MAIN CONTENT ===== */}
            <section className="sp">
                <div className="legal-layout">

                    {/* TABLE OF CONTENTS */}
                    <aside className="toc" data-a="left">
                        <div className="toc-title">Contents</div>
                        <nav className="toc-links">
                            {tocItems.map(item => (
                                <a key={item.id} href={`#${item.id}`} className="toc-a">
                                    <span>{item.num}</span>{item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Quick summary */}
                        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--brd)' }}>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--txt3)', marginBottom: '10px' }}>
                                Quick Summary
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--txt3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></span>
                                    Minimal cookies used
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></span>
                                    No tracking cookies
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></span>
                                    No third-party ads
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* BODY */}
                    <div className="legal-body" data-a="right">

                        {/* Meta strip */}
                        <div className="legal-meta">
                            {metaInfo.map((item, index) => (
                                <div key={index} className="lm-item">
                                    <div className="lm-label">{item.label}</div>
                                    <div className="lm-value">{item.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* 01 What Are Cookies */}
                        <div className="legal-section" id="what-are-cookies">
                            <div className="ls-num">01</div>
                            <div className="ls-title">What Are Cookies</div>
                            <div className="ls-body">
                                <p>Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide a better user experience.</p>
                                <p>Cookies are not programs and cannot execute code or access your device's files. They are passive text files that only contain information which is sent back to the website that set them.</p>
                                <div className="info-box info-box-green">
                                    <p>🍪 <strong>Our approach:</strong> We use cookies minimally — only what's needed for the website to function properly and to remember your theme preference. We do not use tracking cookies, advertising cookies, or any cookies designed to profile you across the web.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 02 How We Use Cookies */}
                        <div className="legal-section" id="how-we-use">
                            <div className="ls-num">02</div>
                            <div className="ls-title">How We Use Cookies</div>
                            <div className="ls-body">
                                <p>We use cookies for the following limited purposes:</p>
                                <ul>
                                    <li><strong>Theme preference:</strong> We store your dark/light mode preference so that your choice is remembered when you return to our site.</li>
                                    <li><strong>Session management:</strong> We use temporary session cookies to maintain your connection to our server for basic functionality (e.g., form submissions, navigation).</li>
                                    <li><strong>Security:</strong> We use security cookies to protect against cross-site request forgery (CSRF) attacks and to authenticate legitimate requests.</li>
                                    <li><strong>Performance:</strong> We may use cookies to understand high-level usage patterns (e.g., which pages are visited most) to help us improve our site, but this data is aggregated and anonymised.</li>
                                </ul>
                                <p>We <strong>do not</strong> use cookies for:</p>
                                <ul>
                                    <li>Targeted advertising or retargeting</li>
                                    <li>Cross-site tracking or profiling</li>
                                    <li>Selling or sharing your personal data with third parties</li>
                                    <li>Building user profiles for commercial purposes</li>
                                </ul>
                                <div className="info-box">
                                    <p>📌 All cookies used on this site are either <strong>Strictly Necessary</strong> (for the site to function) or <strong>Functional</strong> (to remember your preferences). We do not use cookies that track you across the internet.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 03 Types of Cookies */}
                        <div className="legal-section" id="cookie-types">
                            <div className="ls-num">03</div>
                            <div className="ls-title">Types of Cookies</div>
                            <div className="ls-body">
                                <p>We use the following categories of cookies on our website:</p>

                                <div className="cookie-category-grid">
                                    {cookieCategories.map((cat, index) => (
                                        <div key={index} className="cookie-cat" data-a="scale" data-d={index + 1}>
                                            <div className="cookie-cat-icon">{cat.icon}</div>
                                            <div className="cookie-cat-title">{cat.title}</div>
                                            <div className="cookie-cat-desc">{cat.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 04 Specific Cookies Used */}
                        <div className="legal-section" id="specific-cookies">
                            <div className="ls-num">04</div>
                            <div className="ls-title">Specific Cookies Used</div>
                            <div className="ls-body">
                                <p>Here is a detailed list of the specific cookies we set on this website:</p>

                                <div className="cookie-table-wrap">
                                    <table className="cookie-table">
                                        <thead>
                                            <tr>
                                                <th>Cookie Name</th>
                                                <th>Purpose</th>
                                                <th>Duration</th>
                                                <th>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cookieTableData.map((cookie, index) => (
                                                <tr key={index}>
                                                    <td><strong style={{ color: 'var(--txt)', fontFamily: 'var(--mono)', fontSize: '12px' }}>{cookie.name}</strong></td>
                                                    <td>{cookie.purpose}</td>
                                                    <td style={{ fontFamily: 'var(--mono)', fontSize: '12px' }}>{cookie.duration}</td>
                                                    <td>
                                                        <span style={{
                                                            padding: '2px 10px',
                                                            borderRadius: '999px',
                                                            fontSize: '10px',
                                                            fontFamily: 'var(--mono)',
                                                            background: cookie.type === 'Strictly Necessary' ? 'rgba(41,121,242,.12)' : 'rgba(240,167,50,.12)',
                                                            color: cookie.type === 'Strictly Necessary' ? 'var(--blue-lt)' : '#f0a732',
                                                            border: '1px solid ' + (cookie.type === 'Strictly Necessary' ? 'rgba(41,121,242,.2)' : 'rgba(240,167,50,.2)')
                                                        }}>
                                                            {cookie.type}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <p>We may also use <strong>localStorage</strong> (a modern web storage technology) for storing your theme preference. This is not a cookie but serves a similar purpose. Data stored in localStorage persists until you clear it manually.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 05 Third-Party Cookies */}
                        <div className="legal-section" id="third-party">
                            <div className="ls-num">05</div>
                            <div className="ls-title">Third-Party Cookies</div>
                            <div className="ls-body">
                                <p>We <strong>do not</strong> use third-party advertising cookies, tracking pixels, or any external services that set tracking cookies on your device through our website.</p>
                                <p>However, when you click on external links from our site (e.g., to Fiverr, LinkedIn, WhatsApp, GitHub, or client websites), those third-party websites may set their own cookies. We have no control over these cookies and recommend reviewing the respective platforms' cookie policies.</p>
                                <p>Third-party services we link to include:</p>
                                <ul>
                                    <li><strong>Fiverr</strong> — <a href="https://www.fiverr.com/legal/cookies" target="_blank" rel="noopener noreferrer">Fiverr Cookie Policy</a></li>
                                    <li><strong>LinkedIn</strong> — <a href="https://www.linkedin.com/legal/cookie-policy" target="_blank" rel="noopener noreferrer">LinkedIn Cookie Policy</a></li>
                                    <li><strong>GitHub</strong> — <a href="https://docs.github.com/en/site-policy/privacy-policies/github-cookie-statement" target="_blank" rel="noopener noreferrer">GitHub Cookie Statement</a></li>
                                    <li><strong>WhatsApp</strong> — <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp Privacy Policy</a></li>
                                </ul>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ <strong>Important:</strong> Clicking on external links will take you to third-party websites that operate under their own privacy and cookie policies. We recommend reviewing these policies before providing any personal information.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 06 Your Choices */}
                        <div className="legal-section" id="your-choices">
                            <div className="ls-num">06</div>
                            <div className="ls-title">Your Choices</div>
                            <div className="ls-body">
                                <p>You have full control over cookies. You can manage, block, or delete cookies at any time through your browser settings.</p>

                                <p><strong>How to manage cookies in common browsers:</strong></p>
                                <ul>
                                    <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                                    <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                                    <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
                                </ul>

                                <div className="info-box info-box-warn">
                                    <p>⚠️ <strong>Note:</strong> Disabling all cookies may affect your experience. Essential cookies (like those needed for security and basic functionality) cannot be disabled without breaking the website. If you disable all cookies, the website may not function correctly, and your theme preference will not be saved.</p>
                                </div>

                                <p><strong>Opting out of specific cookies:</strong></p>
                                <ul>
                                    <li><strong>Theme preference:</strong> If you don't want us to remember your theme preference, you can manually delete the <code>theme</code> cookie or localStorage item, or use your browser's private/incognito mode.</li>
                                    <li><strong>Analytics:</strong> We use minimal analytics (if enabled) that do not track personal identifiers. You can block analytics cookies through your browser settings.</li>
                                </ul>

                                <div className="info-box">
                                    <p>💡 <strong>Simplest option:</strong> Use your browser's <strong>private/incognito mode</strong>. This automatically deletes all cookies when you close the window, meaning no cookies are stored permanently.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 07 Changes */}
                        <div className="legal-section" id="changes-cookie">
                            <div className="ls-num">07</div>
                            <div className="ls-title">Policy Changes</div>
                            <div className="ls-body">
                                <p>We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our practices. When we make significant changes, we will:</p>
                                <ul>
                                    <li>Update the "Last Updated" date at the top of this page</li>
                                    <li>Post a notice on our homepage for 30 days following any material change</li>
                                    <li>Notify active clients by email if the changes affect how we process their data</li>
                                </ul>
                                <p>Your continued use of our website after any changes constitutes your acceptance of the revised Cookie Policy.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 08 Contact */}
                        <div className="legal-section" id="contact-cookie">
                            <div className="ls-num">08</div>
                            <div className="ls-title">Contact Us</div>
                            <div className="ls-body">
                                <p>If you have any questions about our use of cookies, this policy, or how we handle your data, please don't hesitate to reach out:</p>
                                <div className="info-box">
                                    <p>
                                        <strong>Ayamil Coders</strong><br/>
                                        Founded by Muhammad Muzamil<br/>
                                        Sadiqabad &amp; Rahimyar Khan, Punjab, Pakistan<br/><br/>
                                        📧 <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a><br/>
                                        💬 <a href="https://wa.me/923127592672" target="_blank" rel="noopener noreferrer">WhatsApp: +92 312 759 2672</a><br/>
                                        🛍️ <a href="https://fiverr.com/muzamil516" target="_blank" rel="noopener noreferrer">Fiverr: fiverr.com/muzamil516</a><br/>
                                        🌐 <a href="https://ayamilcoders.com">ayamilcoders.com</a>
                                    </p>
                                </div>
                                <p style={{ fontSize: '13px', color: 'var(--txt3)' }}>We aim to respond to all inquiries within <strong>1–2 business days</strong>.</p>

                                {/* Related legal links */}
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '22px' }}>
                                    <a href="/privacy-policy" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Privacy Policy</a>
                                    <a href="/terms" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Terms &amp; Conditions</a>
                                    <a href="/refund-policy" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Refund Policy</a>
                                    <a href="/disclaimer" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Disclaimer</a>
                                    <a href="/contact" className="btn-p" style={{ padding: '9px 18px', fontSize: '13px' }}>Contact Us</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}