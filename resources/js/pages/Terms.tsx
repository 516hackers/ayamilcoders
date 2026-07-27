import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function Terms() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('terms-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'terms-page-css';
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
            .ls-body code {
                font-family: var(--mono);
                font-size: 12px;
                background: rgba(41,121,242,.1);
                border: 1px solid rgba(41,121,242,.18);
                padding: 1px 6px;
                border-radius: 4px;
                color: var(--blue-lt);
            }
            @media(max-width:639px) {
                .ls-body code {
                    font-size: 11px;
                }
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

            /* Two-col clause grid */
            .clause-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin: 16px 0;
            }
            @media(max-width:639px) {
                .clause-grid {
                    grid-template-columns: 1fr;
                }
            }
            .clause-card {
                background: var(--card-bg);
                border: 1px solid var(--brd);
                border-radius: var(--r-lg);
                padding: 16px;
            }
            @media(max-width:639px) {
                .clause-card {
                    padding: 12px 14px;
                }
            }
            .clause-card-title {
                font-family: var(--mono);
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: .08em;
                color: var(--blue-lt);
                margin-bottom: 6px;
            }
            @media(max-width:639px) {
                .clause-card-title {
                    font-size: 10px;
                }
            }
            .clause-card p {
                font-size: 13px;
                color: var(--txt2);
                line-height: 1.65;
                margin-bottom: 0 !important;
            }
            @media(max-width:639px) {
                .clause-card p {
                    font-size: 12px;
                }
            }

            /* At-a-glance badge */
            .toc-badge {
                margin-top: 20px;
                padding-top: 16px;
                border-top: 1px solid var(--brd);
            }
            .toc-badge-title {
                font-family: var(--mono);
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: .08em;
                color: var(--txt3);
                margin-bottom: 10px;
            }
            .toc-badge-item {
                display: flex;
                align-items: center;
                gap: 7px;
                font-size: 12px;
                color: var(--txt3);
            }
            .toc-badge-dot-green {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--green);
                flex-shrink: 0;
            }
            .toc-badge-dot-amber {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--amber);
                flex-shrink: 0;
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
            [data-theme="light"] .clause-card {
                background: rgba(255,255,255,.95);
            }
            [data-theme="light"] .toc-a.active {
                color: #0d1b38;
            }
            [data-theme="light"] .ls-body code {
                background: rgba(41,121,242,.06);
            }
        `;
        document.head.appendChild(style);

        return () => {
            const el = document.getElementById('terms-page-css');
            if (el) el.remove();
        };
    }, []);

    // ===== JS FOR TERMS PAGE =====
    useEffect(() => {
        // ---- SCROLL REVEAL ----
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-d') ? parseFloat(entry.target.getAttribute('data-d')!) * 0.03 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                    // Reveal once, then stop watching — repeatedly toggling
                    // 'in' on/off as the intersection ratio flickers (which
                    // happens easily on tall elements viewed through a short
                    // mobile viewport) was causing content to fade/slide
                    // unpredictably while reading.
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });
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
        { id: 'overview', num: '01', label: 'Agreement Overview' },
        { id: 'services', num: '02', label: 'Our Services' },
        { id: 'client-duties', num: '03', label: 'Client Obligations' },
        { id: 'payment', num: '04', label: 'Payment & Billing' },
        { id: 'ip', num: '05', label: 'Intellectual Property' },
        { id: 'confidential', num: '06', label: 'Confidentiality' },
        { id: 'warranties', num: '07', label: 'Warranties' },
        { id: 'liability', num: '08', label: 'Limitation of Liability' },
        { id: 'blockchain', num: '09', label: 'Blockchain Disclaimer' },
        { id: 'termination', num: '10', label: 'Termination' },
        { id: 'disputes', num: '11', label: 'Dispute Resolution' },
        { id: 'governing-law', num: '12', label: 'Governing Law' },
        { id: 'changes', num: '13', label: 'Changes to Terms' },
        { id: 'contact-tc', num: '14', label: 'Contact Us' }
    ];

    const metaInfo = [
        { label: 'Effective Date', value: 'January 1, 2025' },
        { label: 'Last Updated', value: 'January 1, 2025' },
        { label: 'Jurisdiction', value: 'Pakistan' },
        { label: 'Entity', value: 'Ayamil Coders' },
        { label: 'Contact', value: 'info@ayamilcoders.com' }
    ];

    const badgeItems = [
        { text: 'No hidden fees', color: 'green' },
        { text: 'IP transfers on full payment', color: 'green' },
        { text: 'NDA available on request', color: 'green' },
        { text: 'Governed by Pakistani law', color: 'amber' }
    ];

    const clauseCards = [
        { title: 'Scope of Work', text: 'We deliver only what is agreed in writing. Any features, pages, or functionalities not specified in the original brief are considered out of scope and will be quoted separately.' },
        { title: 'Delivery Timelines', text: 'Estimated delivery dates are provided in good faith. Delays caused by late client feedback, missing assets, or scope changes will extend the timeline proportionally.' },
        { title: 'Revisions', text: 'Each project includes a defined number of revision rounds as stated in the brief or order. Revisions beyond the agreed limit are billed at our standard hourly rate.' },
        { title: 'Third-Party Services', text: 'We may integrate third-party APIs, platforms, or services at your request. We are not responsible for downtime, policy changes, or costs associated with third-party providers.' }
    ];

        const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms & Conditions",
        "description": "Terms and conditions for using Ayamil Coders' services and website.",
        "url": "https://ayamilcoders.com/terms",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Ayamil Coders",
            "url": "https://ayamilcoders.com"
        }
    };

    return (
        <>
            <SEO
                title="Terms & Conditions"
                description="Terms and conditions for using Ayamil Coders' services and website."
                keywords="terms and conditions, software development, Ayamil Coders"
                url="https://ayamilcoders.com/terms"
                schema={pageSchema}
            />
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(41,121,242,.1),transparent 70%)', top: '-120px', right: '-80px' }}></div>
                <div className="page-hero-blob" style={{ width: '260px', height: '260px', background: 'radial-gradient(circle,rgba(0,200,232,.07),transparent 70%)', bottom: '-60px', left: '10%' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }} data-a="up">
                    <span className="section-lbl">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '2px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        Legal
                    </span>
                    <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.08, margin: '12px 0 14px' }}>
                        Terms &amp; <span className="shimmer-txt">Conditions</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '580px', lineHeight: 1.75 }}>
                        Please read these terms carefully before engaging our services. They outline your rights, our responsibilities, payment expectations, and how we work together. We've kept the language clear and direct — no legal jargon designed to confuse.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                        <a href="/privacy-policy" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            Privacy Policy
                        </a>
                        <a href="/refund-policy" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
                            Refund Policy
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== MAIN CONTENT ===== */}
            <section className="sp">
                <div className="legal-layout">

                    {/* TABLE OF CONTENTS (desktop sticky) */}
                    <aside className="toc" data-a="left">
                        <div className="toc-title">Contents</div>
                        <nav className="toc-links">
                            {tocItems.map(item => (
                                <a key={item.id} href={`#${item.id}`} className="toc-a">
                                    <span>{item.num}</span>{item.label}
                                </a>
                            ))}
                        </nav>

                        {/* At-a-glance badge */}
                        <div className="toc-badge">
                            <div className="toc-badge-title">At a glance</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                {badgeItems.map((item, index) => (
                                    <div key={index} className="toc-badge-item">
                                        <span className={item.color === 'green' ? 'toc-badge-dot-green' : 'toc-badge-dot-amber'}></span>
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* BODY */}
                    <div className="legal-body">

                        {/* Meta info strip */}
                        <div className="legal-meta">
                            {metaInfo.map((item, index) => (
                                <div key={index} className="lm-item">
                                    <div className="lm-label">{item.label}</div>
                                    <div className="lm-value">{item.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* 01 Overview */}
                        <div className="legal-section" id="overview">
                            <div className="ls-num">01</div>
                            <div className="ls-title">Agreement Overview</div>
                            <div className="ls-body">
                                <p>These Terms &amp; Conditions ("Terms", "Agreement") constitute a legally binding agreement between <strong>Ayamil Coders</strong> ("Company", "we", "us", "our") — a software development company founded by <strong>Muhammad Muzamil</strong> and operating from Sadiqabad &amp; Rahimyar Khan, Punjab, Pakistan — and you ("Client", "User", "you") as a visitor to our website or a recipient of our services.</p>
                                <p>Our services are offered through our website at <strong>ayamilcoders.com</strong>, through our Fiverr profile (<strong>muzamil516</strong>), and via direct client engagements over email, WhatsApp, or other agreed communication channels.</p>
                                <div className="info-box">
                                    <p>📋 <strong>By engaging our services, placing an order, or using our website, you confirm that you have read, understood, and agree to be bound by these Terms.</strong> If you do not agree, please do not proceed with an engagement or continue using our website.</p>
                                </div>
                                <p>These Terms apply to all service categories we offer, including Web Development, Blockchain Development, AI Development, and Bug Fixing, and any related work. Where a separate written project agreement or Statement of Work (SOW) exists, that document takes precedence over these Terms in the event of a conflict.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 02 Services */}
                        <div className="legal-section" id="services">
                            <div className="ls-num">02</div>
                            <div className="ls-title">Our Services</div>
                            <div className="ls-body">
                                <p>Ayamil Coders provides custom digital solutions to clients worldwide. The scope of each engagement is defined at the time of project initiation via a project brief, Fiverr order description, or written agreement. The following general terms apply to all service engagements:</p>
                                <div className="clause-grid">
                                    {clauseCards.map((card, index) => (
                                        <div key={index} className="clause-card">
                                            <div className="clause-card-title">{card.title}</div>
                                            <p>{card.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <p>We reserve the right to decline projects at our sole discretion — including those that are unlawful, unethical, or that conflict with our company values — without obligation to provide a reason.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 03 Client Obligations */}
                        <div className="legal-section" id="client-duties">
                            <div className="ls-num">03</div>
                            <div className="ls-title">Client Obligations</div>
                            <div className="ls-body">
                                <p>To ensure a smooth and timely project delivery, clients are required to:</p>
                                <ul>
                                    <li><strong>Provide accurate information</strong> — Supply all required content, assets (logos, images, copy), credentials, and access in a timely manner. Incomplete or inaccurate information that requires rework will be treated as a scope addition.</li>
                                    <li><strong>Respond promptly</strong> — Provide feedback and approvals within <strong>5 business days</strong> of each milestone delivery. Delays in response that push a project past the agreed timeline are the client's responsibility.</li>
                                    <li><strong>Designate a point of contact</strong> — For larger projects, nominate a single person authorised to provide feedback and approve deliverables to avoid conflicting instructions.</li>
                                    <li><strong>Maintain legal compliance</strong> — Ensure that all content, trademarks, images, and other materials provided to us are legally owned or licensed by you. We are not liable for copyright infringement arising from materials you supply.</li>
                                    <li><strong>Test deliverables</strong> — Review and test all delivered work promptly. Defects reported more than 30 days after delivery may be treated as new support requests.</li>
                                    <li><strong>Make payments on time</strong> — Adhere to the payment schedule agreed upon at project initiation. Late payments may result in paused work or project cancellation (see Payment Terms below).</li>
                                </ul>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ Projects that remain idle for more than <strong>45 days</strong> due to client non-response or non-provision of required materials may be archived or closed. Resuming work may incur a re-activation fee.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 04 Payment */}
                        <div className="legal-section" id="payment">
                            <div className="ls-num">04</div>
                            <div className="ls-title">Payment &amp; Billing</div>
                            <div className="ls-body">
                                <p>All prices are quoted in <strong>USD (US Dollars)</strong> unless otherwise agreed. The following payment terms apply:</p>
                                <ul>
                                    <li><strong>Deposit requirement</strong> — A non-refundable deposit of <strong>50% of the total project value</strong> is required before development begins. This deposit secures your project slot and covers initial planning and design work.</li>
                                    <li><strong>Final payment</strong> — The remaining 50% is due upon project completion, before final files, source code, or live deployment are transferred to you.</li>
                                    <li><strong>Milestone-based billing</strong> — For larger projects (PKR 100,000+ or USD 350+), we may structure payments across agreed milestones. Each milestone must be paid before the next phase begins.</li>
                                    <li><strong>Fiverr orders</strong> — For projects processed through Fiverr, Fiverr's payment system and escrow rules apply. Fiverr's terms supersede these payment clauses where applicable.</li>
                                    <li><strong>Rush fee</strong> — Requests for delivery faster than the standard timeline may incur an additional rush fee of 20–50%, communicated and agreed in advance.</li>
                                    <li><strong>Invoicing</strong> — Invoices are issued electronically via email and are payable within <strong>5 business days</strong> of issuance unless otherwise agreed.</li>
                                </ul>
                                <p><strong>Accepted payment methods:</strong> PayPal, bank transfer (Pakistan &amp; international), Payoneer, cryptocurrency (USDT/BTC upon agreement), and Fiverr platform payments.</p>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ <strong>Late payment policy:</strong> Invoices unpaid after 10 days will incur a late fee of <strong>1.5% per month</strong> on the outstanding balance. Work will be paused after 15 days of non-payment. We reserve the right to withhold deliverables until all outstanding balances are settled.</p>
                                </div>
                                <div className="info-box info-box-green">
                                    <p>✅ <strong>Note on taxes:</strong> All prices quoted are exclusive of any applicable taxes. International clients are responsible for any import duties, withholding taxes, or VAT/GST obligations in their own jurisdiction. Pakistani clients may be subject to applicable FBR withholding tax requirements.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 05 Intellectual Property */}
                        <div className="legal-section" id="ip">
                            <div className="ls-num">05</div>
                            <div className="ls-title">Intellectual Property Rights</div>
                            <div className="ls-body">
                                <p>Intellectual property rights are a critical part of any software engagement. The following terms govern ownership of all work produced under an Ayamil Coders engagement:</p>
                                <p><strong>Before full payment:</strong></p>
                                <ul>
                                    <li>All code, designs, content, and deliverables created by Ayamil Coders remain our exclusive property until full payment has been received.</li>
                                    <li>We reserve the right to withhold source code, deployment credentials, or final assets until all outstanding invoices are paid in full.</li>
                                </ul>
                                <p><strong>After full payment:</strong></p>
                                <ul>
                                    <li>Upon receipt of full payment, we assign to you all intellectual property rights in the custom deliverables created specifically for your project.</li>
                                    <li>This assignment covers the final deliverable only — not our internal tools, frameworks, reusable components, libraries, or proprietary methodologies used to build it.</li>
                                </ul>
                                <p><strong>Third-party &amp; open source components:</strong></p>
                                <ul>
                                    <li>Projects may incorporate open-source libraries, frameworks, templates, or licensed third-party assets. These components are governed by their respective licences (e.g. MIT, GPL, Apache 2.0) and are not transferred as part of our IP assignment.</li>
                                    <li>We will disclose major third-party dependencies used in your project upon request.</li>
                                </ul>
                                <div className="info-box">
                                    <p>🎨 <strong>Portfolio rights:</strong> We retain the right to display completed work in our portfolio, on our website, and across social media platforms as examples of our work — unless you request otherwise in writing before project commencement. Confidential client projects are excluded unless you give explicit written permission.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 06 Confidentiality */}
                        <div className="legal-section" id="confidential">
                            <div className="ls-num">06</div>
                            <div className="ls-title">Confidentiality</div>
                            <div className="ls-body">
                                <p>We understand that clients often share sensitive business information, trade secrets, unreleased product concepts, and proprietary data during an engagement. Ayamil Coders commits to the following confidentiality standards:</p>
                                <ul>
                                    <li>All non-public information shared by clients — including but not limited to business strategies, product ideas, source code, user data, financial details, and technical specifications — will be treated as strictly confidential.</li>
                                    <li>Confidential information will only be shared with team members or sub-contractors directly involved in your project, and only to the extent necessary to complete the work.</li>
                                    <li>We will not disclose, publish, or use confidential client information for any purpose other than delivering your project.</li>
                                    <li>Our confidentiality obligations remain in effect for <strong>3 years</strong> after project completion, or indefinitely where trade secrets are involved.</li>
                                </ul>
                                <p><strong>Formal NDA:</strong> If your project requires a formal Non-Disclosure Agreement with legal signatures, we are happy to sign one before work begins. Contact us at <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a> to arrange this.</p>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ Confidentiality does not apply to information that is already in the public domain, information we already possessed before the engagement, or information we are required to disclose by law or court order.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 07 Warranties */}
                        <div className="legal-section" id="warranties">
                            <div className="ls-num">07</div>
                            <div className="ls-title">Warranties &amp; Disclaimers</div>
                            <div className="ls-body">
                                <p><strong>What we warrant:</strong></p>
                                <ul>
                                    <li>We warrant that all deliverables will be created with professional skill and reasonable care, and will substantially conform to the agreed specification at the time of delivery.</li>
                                    <li>We provide a <strong>30-day bug-fix warranty</strong> on all delivered work. During this period, we will fix at no charge any bugs or defects attributable to our development work and reported in writing.</li>
                                    <li>We warrant that we have the right to enter into this agreement and that the deliverables will not knowingly infringe the intellectual property rights of any third party.</li>
                                </ul>
                                <p><strong>What we do not warrant:</strong></p>
                                <ul>
                                    <li>We do not warrant that software will be entirely free of bugs, vulnerabilities, or errors beyond the 30-day warranty period.</li>
                                    <li>We make no guarantee regarding specific business outcomes, revenue generation, search engine rankings, app store approvals, or user adoption resulting from our work.</li>
                                    <li>We do not warrant the accuracy, completeness, or legality of content, data, or information provided by the client and incorporated into the deliverable.</li>
                                    <li>Third-party services, APIs, and hosting platforms integrated at the client's request are not covered by our warranty — their continued availability and functionality are beyond our control.</li>
                                </ul>
                                <div className="info-box">
                                    <p>🔧 Post-warranty support and maintenance is available as a separate ongoing retainer service. Ask us about our monthly maintenance packages.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 08 Limitation of Liability */}
                        <div className="legal-section" id="liability">
                            <div className="ls-num">08</div>
                            <div className="ls-title">Limitation of Liability</div>
                            <div className="ls-body">
                                <p>To the fullest extent permitted by applicable law:</p>
                                <ul>
                                    <li>Ayamil Coders' total liability to you in connection with any project or engagement shall not exceed the <strong>total amount paid by you to us for that specific project</strong> in the 12 months preceding the claim.</li>
                                    <li>We shall not be liable for any <strong>indirect, incidental, special, consequential, or punitive damages</strong> — including loss of profits, loss of data, business interruption, or loss of goodwill — even if we have been advised of the possibility of such damages.</li>
                                    <li>We are not liable for any failure or delay in performance caused by circumstances beyond our reasonable control, including but not limited to power outages, internet disruptions, natural disasters, government actions, third-party platform failures, or force majeure events.</li>
                                    <li>We are not responsible for damages arising from the client's misuse of delivered software, failure to maintain backups, or modifications made to the deliverable by the client or third parties after handover.</li>
                                </ul>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ <strong>Critical systems:</strong> Our services are not intended for deployment in safety-critical systems where software failure could result in physical injury, loss of life, or significant harm. Do not use our deliverables in medical, aviation, nuclear, or emergency-response systems without independent professional validation.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 09 Blockchain Disclaimer */}
                        <div className="legal-section" id="blockchain">
                            <div className="ls-num">09</div>
                            <div className="ls-title">Blockchain &amp; Smart Contract Disclaimer</div>
                            <div className="ls-body">
                                <p>Ayamil Coders provides blockchain development services including smart contract creation, token deployment (ERC-20, BEP-20, Polygon, and other standards), DeFi integrations, and Web3 application development. The following disclaimers apply specifically to all blockchain and cryptocurrency-related work:</p>
                                <ul>
                                    <li><strong>Immutability risk</strong> — Smart contracts deployed to a blockchain are generally immutable and cannot be modified or deleted once deployed. You are solely responsible for thoroughly testing and auditing any contract before mainnet deployment. We are not liable for bugs or vulnerabilities discovered after deployment on a live network.</li>
                                    <li><strong>No financial advice</strong> — Nothing in our deliverables, communications, or guidance constitutes financial, investment, or legal advice. Cryptocurrency markets are highly volatile. Do not invest funds you cannot afford to lose.</li>
                                    <li><strong>Regulatory compliance</strong> — You are solely responsible for ensuring that your token, protocol, or blockchain product complies with all applicable laws and regulations in your jurisdiction, including securities laws, AML/KYC requirements, and any cryptocurrency licensing obligations.</li>
                                    <li><strong>Audit recommendation</strong> — We strongly recommend commissioning an independent third-party security audit of all smart contracts before deploying to mainnet, particularly for contracts that will hold or manage user funds. We can recommend reputable auditors upon request.</li>
                                    <li><strong>Gas fees &amp; network costs</strong> — Blockchain transaction fees ("gas fees") and deployment costs are borne by the client and are separate from our service fees. These are unpredictable and outside our control.</li>
                                    <li><strong>Network forks &amp; protocol changes</strong> — We are not responsible for issues arising from changes to the underlying blockchain protocol, hard forks, network upgrades, or deprecation of standards by blockchain foundations.</li>
                                </ul>
                                <div className="info-box info-box-red">
                                    <p>🔴 <strong>Scam &amp; fraud warning:</strong> Ayamil Coders will never ask you to send cryptocurrency directly to a wallet address for payment without a prior written agreement specifying that wallet address. We will never solicit "test transactions" or ask for private keys, seed phrases, or wallet passwords. If you receive such a request claiming to be from us, do not comply — contact us immediately at <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a>.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 10 Termination */}
                        <div className="legal-section" id="termination">
                            <div className="ls-num">10</div>
                            <div className="ls-title">Termination of Services</div>
                            <div className="ls-body">
                                <p>Either party may terminate a project engagement under the following conditions:</p>
                                <p><strong>Termination by client:</strong></p>
                                <ul>
                                    <li>You may cancel a project at any time by providing written notice via email.</li>
                                    <li>The initial deposit is <strong>non-refundable</strong> in all cases, as it covers work already performed and the opportunity cost of your reserved project slot.</li>
                                    <li>If work beyond the deposit-funded phase has been completed, you will be billed for that work at a pro-rated rate based on percentage of completion. Completed deliverables will be provided upon settlement of any outstanding balance.</li>
                                    <li>If work has not yet begun (within 48 hours of deposit receipt and prior to any substantial work), a partial refund may be considered at our discretion.</li>
                                </ul>
                                <p><strong>Termination by Ayamil Coders:</strong></p>
                                <ul>
                                    <li>We reserve the right to terminate an engagement immediately if: (a) you breach these Terms and fail to remedy the breach within 7 days of written notice; (b) you engage in abusive, threatening, or harassing behaviour toward our team; (c) the project requires us to produce illegal, unethical, or harmful content; (d) payment obligations are not met.</li>
                                    <li>In the event of termination by us due to a breach on your part, no refund of the deposit or milestone payments will be issued.</li>
                                    <li>In the event of termination by us due to reasons within our control (e.g. inability to deliver the agreed scope), we will issue a fair refund for undelivered work.</li>
                                </ul>
                                <p>Upon termination, both parties agree to return or destroy confidential materials belonging to the other party, and to cease representing any ongoing relationship.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 11 Disputes */}
                        <div className="legal-section" id="disputes">
                            <div className="ls-num">11</div>
                            <div className="ls-title">Dispute Resolution</div>
                            <div className="ls-body">
                                <p>We prefer to resolve all disputes amicably and professionally. In the event of a disagreement, the following process applies:</p>
                                <ol>
                                    <li><strong>Direct negotiation (Step 1)</strong> — Either party may raise a dispute in writing via email. Both parties agree to respond within 5 business days and to negotiate in good faith for up to 15 business days.</li>
                                    <li><strong>Mediation (Step 2)</strong> — If direct negotiation fails to produce a resolution, both parties may agree to appoint a neutral mediator to assist in reaching a settlement. Mediation costs will be shared equally unless otherwise agreed.</li>
                                    <li><strong>Arbitration (Step 3)</strong> — If mediation is unsuccessful, disputes will be referred to binding arbitration under the <strong>Arbitration Act 1940 (Pakistan)</strong> or its successor legislation. The arbitration will be conducted in Urdu or English in Sadiqabad, Punjab, Pakistan, unless both parties agree otherwise.</li>
                                    <li><strong>Fiverr disputes</strong> — For projects placed through Fiverr, Fiverr's Resolution Centre and dispute process will apply first. Fiverr's decision is binding on platform-mediated disputes.</li>
                                </ol>
                                <div className="info-box">
                                    <p>💬 <strong>Our commitment:</strong> We take every client concern seriously. The vast majority of issues are resolved quickly through direct communication. Please reach out to <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a> or WhatsApp before escalating — we genuinely want to find a fair solution.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 12 Governing Law */}
                        <div className="legal-section" id="governing-law">
                            <div className="ls-num">12</div>
                            <div className="ls-title">Governing Law</div>
                            <div className="ls-body">
                                <p>These Terms and any disputes arising from them shall be governed by and construed in accordance with the <strong>laws of the Islamic Republic of Pakistan</strong>, without regard to its conflict-of-law principles.</p>
                                <p>Subject to the arbitration clause above, both parties irrevocably submit to the <strong>exclusive jurisdiction of the courts located in Rahim Yar Khan, Punjab, Pakistan</strong> for the resolution of any disputes that are not subject to arbitration.</p>
                                <p>International clients acknowledge that by engaging our services they agree to this jurisdiction clause. If any provision of this jurisdiction clause is unenforceable in your country, the remainder of these Terms shall continue in full force and effect.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 13 Changes */}
                        <div className="legal-section" id="changes">
                            <div className="ls-num">13</div>
                            <div className="ls-title">Changes to These Terms</div>
                            <div className="ls-body">
                                <p>Ayamil Coders reserves the right to update or modify these Terms at any time. When we make changes, we will:</p>
                                <ul>
                                    <li>Update the "Last Updated" date at the top of this page</li>
                                    <li>Post a notice on our homepage for at least 14 days following any material change</li>
                                    <li>Notify active clients by email if the changes materially affect ongoing engagements</li>
                                </ul>
                                <p>Your continued use of our website or services after the effective date of any change constitutes acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop using our services and notify us in writing.</p>
                                <p>Changes will not apply retroactively to projects already in progress under a signed agreement or active Fiverr order at the time the change takes effect, unless both parties agree in writing.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 14 Contact */}
                        <div className="legal-section" id="contact-tc">
                            <div className="ls-num">14</div>
                            <div className="ls-title">Contact Us</div>
                            <div className="ls-body">
                                <p>If you have any questions about these Terms, wish to request a formal NDA, or need to discuss a specific project arrangement, please get in touch with us through any of the following channels:</p>
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
                                <p style={{ fontSize: '13px', color: 'var(--txt3)' }}>We typically respond to all enquiries within <strong style={{ color: 'var(--txt2)' }}>1–2 business days</strong>. For urgent matters, WhatsApp is the fastest channel.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}