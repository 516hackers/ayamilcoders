// resources/js/pages/Disclaimer.tsx

import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function Disclaimer() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('disclaimer-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'disclaimer-css';
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
            .ls-body ol {
                padding-left: 20px;
                margin: 12px 0 14px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            @media(max-width:639px) {
                .ls-body ol {
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

            /* Disclaimer-specific: scope cards */
            .scope-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin: 18px 0;
            }
            @media(max-width:639px) {
                .scope-grid {
                    grid-template-columns: 1fr;
                }
            }
            .scope-card {
                background: var(--card-bg);
                border: 1px solid var(--brd);
                border-radius: var(--r-lg);
                padding: 18px;
                transition: all .3s;
            }
            .scope-card:hover {
                border-color: var(--brd2);
                transform: translateY(-2px);
            }
            .scope-icon {
                font-size: 22px;
                margin-bottom: 10px;
            }
            .scope-title {
                font-family: var(--disp);
                font-weight: 700;
                font-size: 14px;
                color: var(--txt);
                margin-bottom: 6px;
            }
            .scope-desc {
                font-size: 13px;
                color: var(--txt3);
                line-height: 1.65;
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
            [data-theme="light"] .scope-card {
                background: rgba(255,255,255,.95);
            }
            [data-theme="light"] .toc-a.active {
                color: #0d1b38;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const el = document.getElementById('disclaimer-css');
            if (el) el.remove();
        };
    }, []);

    // ===== JS FOR DISCLAIMER PAGE =====
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
        { id: 'general', num: '01', label: 'General Disclaimer' },
        { id: 'no-advice', num: '02', label: 'Not Professional Advice' },
        { id: 'accuracy', num: '03', label: 'Accuracy of Information' },
        { id: 'external-links', num: '04', label: 'External Links' },
        { id: 'liability', num: '05', label: 'Limitation of Liability' },
        { id: 'ip', num: '06', label: 'Intellectual Property' },
        { id: 'results', num: '07', label: 'No Guarantee of Results' },
        { id: 'tech', num: '08', label: 'Technology & AI Disclaimer' },
        { id: 'availability', num: '09', label: 'Website Availability' },
        { id: 'jurisdiction', num: '10', label: 'Jurisdiction' },
        { id: 'changes', num: '11', label: 'Policy Changes' },
        { id: 'contact-disc', num: '12', label: 'Contact Us' }
    ];

    const metaInfo = [
        { label: 'Effective Date', value: 'January 1, 2025' },
        { label: 'Last Updated', value: 'January 1, 2025' },
        { label: 'Jurisdiction', value: 'Punjab, Pakistan' },
        { label: 'Contact', value: 'info@ayamilcoders.com' }
    ];

    const scopeItems = [
        { icon: '🌐', title: 'Website Content', desc: 'All pages, blog posts, portfolios, and case studies published at ayamilcoders.com.' },
        { icon: '💼', title: 'Service Descriptions', desc: 'Descriptions of our services including Web Development, Blockchain Development, AI Development, and Bug Fixing.' },
        { icon: '💬', title: 'Communications', desc: 'Emails, WhatsApp messages, proposals, and other communications from our team.' },
        { icon: '📱', title: 'Social Media', desc: 'Content posted by Ayamil Coders across any social media platforms or third-party channels.' }
    ];

       const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Disclaimer",
        "description": "Important legal notices about using Ayamil Coders' website, services, and content.",
        "url": "https://ayamilcoders.com/disclaimer",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Ayamil Coders",
            "url": "https://ayamilcoders.com"
        }
    };

    return (
        <>
            <SEO 
                title="Disclaimer"
                description="Important legal notices about using Ayamil Coders' website, services, and content."
                keywords="disclaimer, legal notice, Ayamil Coders"
                url="https://ayamilcoders.com/disclaimer"
                schema={pageSchema}
            />
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(155,89,245,.08),transparent 70%)', top: '-130px', right: '-60px' }}></div>
                <div className="page-hero-blob" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(41,121,242,.07),transparent 70%)', bottom: '-70px', left: '6%' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }} data-a="up">
                    <span className="section-lbl">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '2px' }}>
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        Legal
                    </span>
                    <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.08, margin: '12px 0 14px' }}>
                        Website <span className="shimmer-txt">Disclaimer</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '580px', lineHeight: 1.75 }}>
                        Important notices about the information published on this website, the nature of our services, and the limits of our liability. Please read this carefully before relying on any content found here.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                        <a href="/terms" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            Terms &amp; Conditions
                        </a>
                        <a href="/privacy-policy" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Privacy Policy
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

                        {/* Scope indicators */}
                        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--brd)' }}>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--txt3)', marginBottom: '10px' }}>Applies to</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--txt3)' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-lt)', flexShrink: 0 }}></span>
                                    This website
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--txt3)' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-lt)', flexShrink: 0 }}></span>
                                    All published content
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--txt3)' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-lt)', flexShrink: 0 }}></span>
                                    All Ayamil Coders services
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

                        {/* 01 General */}
                        <div className="legal-section" id="general">
                            <div className="ls-num">01</div>
                            <div className="ls-title">General Disclaimer</div>
                            <div className="ls-body">
                                <p>The information contained on this website — <strong>ayamilcoders.com</strong> — and within any content, blog post, portfolio item, case study, or communication published by <strong>Ayamil Coders</strong> (founded by Muhammad Muzamil, Sadiqabad, Punjab, Pakistan) is provided for <strong>general informational purposes only</strong>.</p>
                                <p>While we make every reasonable effort to keep the information accurate, current, and complete, we make <strong>no representations or warranties of any kind</strong>, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics on this website for any purpose.</p>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ <strong>Important:</strong> Any reliance you place on the information found on this website is strictly at your own risk. Ayamil Coders shall not be liable for any loss or damage arising from the use of, or inability to use, this website or its content.</p>
                                </div>
                                <p>This disclaimer applies to all visitors, users, and anyone else who accesses or uses our website, regardless of their country of origin or purpose of access.</p>

                                {/* Scope cards */}
                                <div className="scope-grid">
                                    {scopeItems.map((item, index) => (
                                        <div key={index} className="scope-card" data-a="scale" data-d={index + 1}>
                                            <div className="scope-icon">{item.icon}</div>
                                            <div className="scope-title">{item.title}</div>
                                            <div className="scope-desc">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 02 Not Professional Advice */}
                        <div className="legal-section" id="no-advice">
                            <div className="ls-num">02</div>
                            <div className="ls-title">Not Professional Advice</div>
                            <div className="ls-body">
                                <p>Nothing on this website constitutes <strong>professional legal, financial, investment, accounting, tax, medical, or business advice</strong>. The content we publish — including blog articles, technical guides, service descriptions, and project case studies — is shared for educational and informational purposes only.</p>
                                <p>Specifically, please note the following:</p>
                                <ul>
                                    <li><strong>Legal advice:</strong> Nothing on this website should be interpreted as legal counsel. If you require legal guidance regarding contracts, intellectual property, data protection, or any other matter, please consult a qualified legal professional in your jurisdiction.</li>
                                    <li><strong>Financial advice:</strong> Any mention of pricing, budgets, ROI estimates, or financial outcomes is illustrative only and does not constitute financial advice. Past project outcomes do not guarantee future results.</li>
                                    <li><strong>Blockchain &amp; crypto:</strong> Any content related to blockchain, smart contracts, DeFi, or digital assets is purely technical and informational. We are not financial advisors and do not provide investment advice regarding cryptocurrencies or tokens. The blockchain space carries significant risk and you should conduct your own due diligence.</li>
                                    <li><strong>Technical recommendations:</strong> Technology stack recommendations, architecture suggestions, or performance estimates shared on this site are general observations and may not apply to your specific situation without professional assessment.</li>
                                </ul>
                                <div className="info-box info-box-green">
                                    <p>✅ <strong>What we do offer:</strong> We provide expert software development services. Once you engage us on a project, our team works with you directly to provide tailored technical recommendations — but these are part of a professional service engagement, not general website content.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 03 Accuracy */}
                        <div className="legal-section" id="accuracy">
                            <div className="ls-num">03</div>
                            <div className="ls-title">Accuracy of Information</div>
                            <div className="ls-body">
                                <p>We strive to ensure all information published on this website is accurate and up to date. However, the technology landscape — particularly in web development, AI, and blockchain — evolves rapidly. Information that is accurate today may become outdated quickly.</p>
                                <p>We cannot guarantee that our website is free from errors, omissions, or inaccuracies. In particular:</p>
                                <ul>
                                    <li>Statistics and figures (e.g. number of projects completed, years of experience) reflect our best estimates at the time of publication and are updated periodically.</li>
                                    <li>Service descriptions reflect our current offerings, which may change without notice.</li>
                                    <li>Pricing ranges or estimates shown anywhere on the site are indicative only and are subject to change based on project scope and requirements.</li>
                                    <li>Third-party information (industry data, framework documentation, protocol specifications) sourced and referenced on our site may have changed since publication.</li>
                                </ul>
                                <div className="info-box">
                                    <p>📌 If you notice any factual error or outdated information on our website, please let us know at <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a>. We appreciate your help in keeping our content accurate.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 04 External Links */}
                        <div className="legal-section" id="external-links">
                            <div className="ls-num">04</div>
                            <div className="ls-title">External Links</div>
                            <div className="ls-body">
                                <p>This website may contain links to external websites, tools, platforms, documentation, or resources that are <strong>not owned or controlled by Ayamil Coders</strong>. These links are provided for convenience and reference only.</p>
                                <p>Ayamil Coders has <strong>no control over the content, privacy policies, or practices</strong> of any third-party websites and accepts no responsibility for them. Our inclusion of a link does not imply endorsement of the linked website, its content, or its operators.</p>
                                <ul>
                                    <li>We are not responsible for the availability or accuracy of third-party websites.</li>
                                    <li>We are not liable for any damages or losses arising from your use of linked external websites.</li>
                                    <li>Links to platforms such as GitHub, Fiverr, LinkedIn, and social media do not constitute an endorsement of those platforms' policies or practices.</li>
                                    <li>External documentation links (e.g. to framework docs or protocol specifications) may become outdated without notice.</li>
                                </ul>
                                <p>We recommend reviewing the privacy policy and terms of service of any third-party website you visit through a link on our site.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 05 Limitation of Liability */}
                        <div className="legal-section" id="liability">
                            <div className="ls-num">05</div>
                            <div className="ls-title">Limitation of Liability</div>
                            <div className="ls-body">
                                <p>To the fullest extent permitted by applicable law, <strong>Ayamil Coders, its founder, employees, contractors, and affiliates</strong> shall not be liable for any:</p>
                                <ul>
                                    <li>Direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or its content;</li>
                                    <li>Loss of data, revenue, profits, business, or goodwill arising from reliance on information published here;</li>
                                    <li>Interruption or unavailability of this website or any services described herein;</li>
                                    <li>Errors, omissions, or inaccuracies in website content, even if we have been advised of the possibility of such damages;</li>
                                    <li>Unauthorised access to or alteration of your data resulting from a security breach not caused by our direct negligence;</li>
                                    <li>Losses arising from decisions made based on information found on this website without obtaining independent professional advice.</li>
                                </ul>
                                <div className="info-box info-box-red">
                                    <p>🔴 <strong>Maximum liability:</strong> Where liability cannot be fully excluded by law, our total liability to you in connection with any claim arising from this website shall not exceed <strong>PKR 10,000</strong> (or the equivalent in your local currency). This cap does not apply to liability for personal injury caused by our negligence.</p>
                                </div>
                                <p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability for consequential or incidental damages. In such jurisdictions, our liability is limited to the fullest extent permitted by applicable law.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 06 Intellectual Property */}
                        <div className="legal-section" id="ip">
                            <div className="ls-num">06</div>
                            <div className="ls-title">Intellectual Property</div>
                            <div className="ls-body">
                                <p>All content on this website — including but not limited to text, graphics, logos, icons, images, code snippets, UI designs, animations, and the overall website design and layout — is the <strong>intellectual property of Ayamil Coders</strong> and is protected by applicable copyright and intellectual property laws.</p>
                                <p>You may <strong>not</strong> reproduce, duplicate, copy, sell, resell, redistribute, republish, or exploit any portion of this website's content for commercial purposes without our express written permission.</p>
                                <ul>
                                    <li><strong>Portfolio items:</strong> Client project screenshots and descriptions are shared with permission and remain the intellectual property of their respective owners.</li>
                                    <li><strong>Open-source code:</strong> Code published on our GitHub under an open-source licence is subject to that licence's specific terms, which take precedence over this disclaimer.</li>
                                    <li><strong>Brand assets:</strong> The Ayamil Coders name, logo, and "AC" monogram may not be used without written permission.</li>
                                </ul>
                                <div className="info-box">
                                    <p>📩 For licensing requests, press inquiries, or permission to use our content, please contact us at <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a>.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 07 No Guarantee of Results */}
                        <div className="legal-section" id="results">
                            <div className="ls-num">07</div>
                            <div className="ls-title">No Guarantee of Results</div>
                            <div className="ls-body">
                                <p>Case studies, testimonials, project outcomes, and portfolio examples shared on this website represent <strong>specific past results</strong> and are not intended to imply or guarantee that you will achieve similar results by engaging our services.</p>
                                <p>The success of any software project depends on a wide range of factors including — but not limited to — your specific requirements, your team's cooperation, third-party service availability, market conditions, and the scope and complexity of your project.</p>
                                <ul>
                                    <li>Performance benchmarks and metrics cited in case studies reflect the conditions of that specific project and may not be replicable.</li>
                                    <li>Timelines mentioned in project descriptions are illustrative; actual delivery timelines are agreed in writing per project.</li>
                                    <li>Revenue or traffic improvements mentioned in client testimonials are not guaranteed outcomes of our services.</li>
                                </ul>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ <strong>Realistic expectations:</strong> We are committed to delivering high-quality work on every project, but software development is complex. No ethical developer can guarantee specific business outcomes. We guarantee our work quality — not your business results.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 08 Technology & AI Disclaimer */}
                        <div className="legal-section" id="tech">
                            <div className="ls-num">08</div>
                            <div className="ls-title">Technology &amp; AI Disclaimer</div>
                            <div className="ls-body">
                                <p>Ayamil Coders builds products that may incorporate <strong>artificial intelligence, machine learning models, and large language model (LLM) integrations</strong>. We believe it is important to be transparent about the nature of these technologies:</p>
                                <ul>
                                    <li><strong>AI outputs are not guaranteed to be accurate:</strong> AI-generated content, predictions, or recommendations can contain errors, hallucinations, or biases. Any AI-powered feature we build should be reviewed by humans before acting on its output in critical situations.</li>
                                    <li><strong>Third-party AI APIs:</strong> Where our work integrates third-party AI services (e.g. OpenAI, Anthropic, Google), the performance and availability of those services are subject to the respective providers' terms and are outside our direct control.</li>
                                    <li><strong>Blockchain irreversibility:</strong> Smart contracts and blockchain transactions are <strong>irreversible by design</strong>. We conduct thorough testing and auditing, but once deployed on a blockchain, a contract's behaviour cannot be altered without redeployment. Clients must review and approve all contracts before deployment to any production network.</li>
                                    <li><strong>Security:</strong> While we follow industry-standard security practices, no software system can be guaranteed 100% secure. We are not liable for security breaches caused by vulnerabilities in third-party dependencies, hosting infrastructure, or unforeseen zero-day exploits.</li>
                                </ul>
                                <div className="info-box info-box-green">
                                    <p>✅ <strong>Our commitment:</strong> We stay current with evolving best practices in AI safety, smart contract auditing, and web security. We will always advise clients honestly about risks before beginning any high-stakes technical work.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 09 Website Availability */}
                        <div className="legal-section" id="availability">
                            <div className="ls-num">09</div>
                            <div className="ls-title">Website Availability</div>
                            <div className="ls-body">
                                <p>We endeavour to keep <strong>ayamilcoders.com</strong> available at all times, but we <strong>do not guarantee uninterrupted access</strong> to this website. The site may be temporarily unavailable due to:</p>
                                <ul>
                                    <li>Scheduled maintenance or updates</li>
                                    <li>Hosting provider outages or infrastructure issues</li>
                                    <li>DDoS attacks or other security incidents outside our control</li>
                                    <li>Network or internet connectivity issues beyond our infrastructure</li>
                                    <li>Force majeure events including natural disasters, power outages, or government-imposed restrictions</li>
                                </ul>
                                <p>Ayamil Coders shall not be held responsible for any inconvenience or loss caused by temporary unavailability of this website. We reserve the right to withdraw, modify, or discontinue any part of this website at any time without notice.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 10 Jurisdiction */}
                        <div className="legal-section" id="jurisdiction">
                            <div className="ls-num">10</div>
                            <div className="ls-title">Jurisdiction</div>
                            <div className="ls-body">
                                <p>This disclaimer, and any dispute or claim arising out of or in connection with it, shall be governed by and construed in accordance with the laws of <strong>Pakistan</strong>, specifically the applicable laws of the <strong>Province of Punjab</strong>.</p>
                                <p>Any legal proceedings relating to this website or its content shall be subject to the exclusive jurisdiction of the courts located in <strong>Rahimyar Khan, Punjab, Pakistan</strong>, except where mandatory local law in your jurisdiction requires otherwise.</p>
                                <div className="info-box">
                                    <p>💬 <strong>International users:</strong> If you are accessing this website from outside Pakistan, you are responsible for compliance with your local laws. The content on this site is not directed at any person in any jurisdiction where its use would be contrary to applicable law or regulation.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 11 Changes */}
                        <div className="legal-section" id="changes">
                            <div className="ls-num">11</div>
                            <div className="ls-title">Policy Changes</div>
                            <div className="ls-body">
                                <p>We reserve the right to update, revise, or replace this Disclaimer at any time. Changes will be published on this page with an updated <strong>"Last Updated"</strong> date shown at the top of the page and in the breadcrumb bar.</p>
                                <p>We will not provide individual notification for routine updates. It is your responsibility to review this page periodically to stay informed of any changes. Your continued use of this website after any change constitutes your acceptance of the revised disclaimer.</p>
                                <p>Material changes — those that significantly affect your rights or our obligations — will be highlighted clearly at the top of this page for a period of at least 30 days following publication.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 12 Contact */}
                        <div className="legal-section" id="contact-disc">
                            <div className="ls-num">12</div>
                            <div className="ls-title">Contact Us</div>
                            <div className="ls-body">
                                <p>If you have any questions about this Disclaimer, concerns about content on our website, or wish to report an inaccuracy, please reach out. We respond to all messages within <strong>1–2 business days</strong>.</p>
                                <div className="info-box">
                                    <p>
                                        <strong>Ayamil Coders</strong><br/>
                                        Founded by Muhammad Muzamil<br/>
                                        Sadiqabad &amp; Rahimyar Khan, Punjab, Pakistan<br/><br/>
                                        📧 <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a><br/>
                                        💬 <a href="https://wa.me/923127592672" target="_blank" rel="noopener">WhatsApp: +92 312 759 2672</a><br/>
                                        🛍️ <a href="https://fiverr.com/muzamil516" target="_blank" rel="noopener">Fiverr: fiverr.com/muzamil516</a><br/>
                                        🌐 <a href="https://ayamilcoders.com">ayamilcoders.com</a>
                                    </p>
                                </div>
                                <p style={{ fontSize: '13px', color: 'var(--txt3)' }}>For urgent matters, <strong style={{ color: 'var(--txt2)' }}>WhatsApp</strong> is the fastest way to reach us. For formal legal notices, please use email so we have a written record.</p>

                                {/* Related legal links */}
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '22px' }}>
                                    <a href="/privacy-policy" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Privacy Policy</a>
                                    <a href="/terms" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Terms &amp; Conditions</a>
                                    <a href="/refund-policy" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Refund Policy</a>
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