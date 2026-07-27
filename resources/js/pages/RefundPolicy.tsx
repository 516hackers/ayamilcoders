import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function RefundPolicy() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('refund-policy-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'refund-policy-css';
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

            /* Refund scenario grid */
            .scenario-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin: 18px 0;
            }
            @media(max-width:639px) {
                .scenario-grid {
                    grid-template-columns: 1fr;
                }
            }
            .scenario-card {
                border-radius: var(--r-lg);
                padding: 18px;
                border: 1px solid;
            }
            @media(max-width:639px) {
                .scenario-card {
                    padding: 14px 16px;
                }
            }
            .sc-yes {
                background: rgba(5,150,105,.05);
                border-color: rgba(5,150,105,.2);
            }
            .sc-no {
                background: rgba(255,55,95,.05);
                border-color: rgba(255,55,95,.2);
            }
            .sc-maybe {
                background: rgba(240,167,50,.05);
                border-color: rgba(240,167,50,.2);
            }
            .sc-label {
                font-family: var(--mono);
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: .1em;
                margin-bottom: 10px;
            }
            .sc-yes .sc-label {
                color: #34d399;
            }
            .sc-no .sc-label {
                color: #ff375f;
            }
            .sc-maybe .sc-label {
                color: #f0a732;
            }
            .sc-list {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 7px;
                padding: 0;
            }
            @media(max-width:639px) {
                .sc-list li {
                    font-size: 12px;
                }
            }
            .sc-list li {
                font-size: 13px;
                color: var(--txt2);
                display: flex;
                align-items: flex-start;
                gap: 8px;
                line-height: 1.6;
            }
            .sc-list li::before {
                flex-shrink: 0;
                margin-top: 3px;
                font-size: 11px;
            }
            .sc-yes .sc-list li::before {
                content: '✓';
                color: #34d399;
            }
            .sc-no .sc-list li::before {
                content: '✕';
                color: #ff375f;
            }
            .sc-maybe .sc-list li::before {
                content: '◐';
                color: #f0a732;
            }

            /* Timeline steps */
            .timeline {
                display: flex;
                flex-direction: column;
                gap: 0;
                margin: 18px 0;
            }
            .tl-step {
                display: flex;
                gap: 18px;
                position: relative;
            }
            .tl-step:not(:last-child)::before {
                content: '';
                position: absolute;
                left: 15px;
                top: 38px;
                bottom: -4px;
                width: 2px;
                background: linear-gradient(180deg, rgba(41,121,242,.3), rgba(41,121,242,.05));
            }
            .tl-num {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(41,121,242,.12);
                border: 1px solid rgba(41,121,242,.25);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--mono);
                font-size: 11px;
                color: var(--blue-lt);
                flex-shrink: 0;
                margin-top: 2px;
            }
            @media(max-width:639px) {
                .tl-num {
                    width: 28px;
                    height: 28px;
                    font-size: 10px;
                }
                .tl-step {
                    gap: 14px;
                }
                .tl-step:not(:last-child)::before {
                    left: 13px;
                    top: 34px;
                }
            }
            .tl-content {
                padding-bottom: 26px;
                min-width: 0;
            }
            .tl-title {
                font-size: 14px;
                font-weight: 600;
                color: var(--txt);
                margin-bottom: 4px;
            }
            @media(max-width:639px) {
                .tl-title {
                    font-size: 13px;
                }
            }
            .tl-desc {
                font-size: 13px;
                color: var(--txt3);
                line-height: 1.65;
            }
            @media(max-width:639px) {
                .tl-desc {
                    font-size: 12px;
                }
            }

            /* Quick key badge */
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
                gap: 8px;
                font-size: 12px;
                color: var(--txt3);
            }
            .toc-badge-dot-green {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #34d399;
                flex-shrink: 0;
            }
            .toc-badge-dot-amber {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #f0a732;
                flex-shrink: 0;
            }
            .toc-badge-dot-red {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #ff375f;
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
            [data-theme="light"] .scenario-card {
                background: rgba(255,255,255,.95);
            }
            [data-theme="light"] .toc-a.active {
                color: #0d1b38;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const el = document.getElementById('refund-policy-css');
            if (el) el.remove();
        };
    }, []);

    // ===== JS FOR REFUND POLICY PAGE =====
    useEffect(() => {
        // ---- SCROLL REVEAL ----
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
        { id: 'overview', num: '01', label: 'Policy Overview' },
        { id: 'deposit', num: '02', label: 'Non-Refundable Deposit' },
        { id: 'full-refund', num: '03', label: 'Full Refund Eligibility' },
        { id: 'partial', num: '04', label: 'Partial Refunds' },
        { id: 'no-refund', num: '05', label: 'No-Refund Situations' },
        { id: 'milestones', num: '06', label: 'Milestone Projects' },
        { id: 'blockchain', num: '07', label: 'Blockchain & Smart Contracts' },
        { id: 'fiverr', num: '08', label: 'Fiverr Orders' },
        { id: 'process', num: '09', label: 'How to Request a Refund' },
        { id: 'timeline', num: '10', label: 'Processing & Timeline' },
        { id: 'disputes', num: '11', label: 'Disputes' },
        { id: 'contact-rp', num: '12', label: 'Contact Us' }
    ];

    const metaInfo = [
        { label: 'Effective Date', value: 'January 1, 2025' },
        { label: 'Last Updated', value: 'January 1, 2025' },
        { label: 'Currency', value: 'USD (default)' },
        { label: 'Response Time', value: '1–5 business days' },
        { label: 'Contact', value: 'info@ayamilcoders.com' }
    ];

    const badgeItems = [
        { text: 'Full refund possible', color: 'green' },
        { text: 'Partial refund case-by-case', color: 'amber' },
        { text: 'No refund applicable', color: 'red' }
    ];

    const noRefundItems = [
        'You changed your mind, business direction, or no longer need the project after work began',
        'You approved a design or deliverable and later decided you dislike it — subjective preference changes after approval are not refundable',
        'Delivery delays caused by your own late feedback, missing assets, or non-responsiveness',
        'You requested features outside the original agreed scope and are dissatisfied with the extra cost',
        'The deliverable works as agreed but does not achieve your desired business outcome (e.g. SEO rankings, conversion rates, revenue)',
        'Third-party services (hosting, APIs, app stores) that you separately purchased have issues outside our control',
        'You provided inaccurate, incomplete, or misleading information that affected the outcome of the project',
        'The project was completed and handed over more than 30 days ago without a reported issue',
        'Consulting sessions, strategy calls, or hourly-rate engagements that have been delivered — time cannot be returned',
        'Rush fee premiums paid for expedited delivery'
    ];

    const milestoneRefundItems = [
        'A milestone payment was made but the phase has not yet started',
        'The delivered milestone substantially fails to meet its written specification after two rounds of revisions',
        'We cancel the project before completing a paid milestone'
    ];

    const milestoneNoRefundItems = [
        'A milestone has been delivered and client-approved in writing',
        'The client approved the phase and then changed direction in a later phase',
        'Delay in milestone delivery caused by client non-response or missing content'
    ];

    const timelineSteps = [
        {
            num: '1',
            title: 'Send a written refund request',
            desc: 'Email info@ayamilcoders.com with the subject line "Refund Request — [Your Project Name]". Include your full name, invoice number or order reference, the amount you paid, the date of payment, and a clear description of the reason for your request.'
        },
        {
            num: '2',
            title: 'We acknowledge within 1–2 business days',
            desc: 'We will confirm receipt of your request and let you know what additional information (if any) we need to assess it. Complex cases may require a brief call or additional documentation.'
        },
        {
            num: '3',
            title: 'Review & decision within 5 business days',
            desc: 'We will review the request against this policy and the project record. We will notify you of our decision — approved, partially approved, or declined — with a clear written explanation and, where applicable, a breakdown of amounts.'
        },
        {
            num: '4',
            title: 'Refund issued within 5–10 business days of approval',
            desc: 'Approved refunds are returned via the original payment method wherever possible (PayPal, bank transfer, Payoneer). Cryptocurrency refunds are issued in the same token at the original transaction rate, not the market rate at the time of refund.'
        }
    ];

      const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Refund Policy",
        "description": "Ayamil Coders' refund policy for software development services.",
        "url": "https://ayamilcoders.com/refund-policy",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Ayamil Coders",
            "url": "https://ayamilcoders.com"
        }
    };

    return (
        <>
            <SEO
                title="Refund Policy"
                description="Ayamil Coders' refund policy for software development services."
                keywords="refund policy, software development, Ayamil Coders"
                url="https://ayamilcoders.com/refund-policy"
                schema={pageSchema}
            />
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '480px', height: '480px', background: 'radial-gradient(circle,rgba(5,150,105,.09),transparent 70%)', top: '-110px', right: '-70px' }}></div>
                <div className="page-hero-blob" style={{ width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(41,121,242,.07),transparent 70%)', bottom: '-60px', left: '8%' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }} data-a="up">
                    <span className="section-lbl">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '2px' }}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
                        Legal
                    </span>
                    <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.08, margin: '12px 0 14px' }}>
                        Refund <span className="shimmer-txt">Policy</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '580px', lineHeight: 1.75 }}>
                        We want every client to be satisfied with the work we deliver. This policy explains exactly when refunds are available, when they are not, and how to request one — written clearly so there are no surprises.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                        <a href="/terms" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            Terms &amp; Conditions
                        </a>
                        <a href="/contact" className="btn-g" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
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

                        {/* Quick-reference key */}
                        <div className="toc-badge">
                            <div className="toc-badge-title">Quick key</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {badgeItems.map((item, index) => (
                                    <div key={index} className="toc-badge-item">
                                        <span className={
                                            item.color === 'green' ? 'toc-badge-dot-green' :
                                            item.color === 'amber' ? 'toc-badge-dot-amber' :
                                            'toc-badge-dot-red'
                                        }></span>
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* BODY */}
                    <div className="legal-body">

                        {/* Meta strip */}
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
                            <div className="ls-title">Policy Overview</div>
                            <div className="ls-body">
                                <p>At <strong>Ayamil Coders</strong>, we take quality seriously and stand behind the work we deliver. This Refund Policy applies to all services offered by Ayamil Coders — including Web Development, Blockchain Development, AI Development, and Bug Fixing — whether engaged directly or through Fiverr.</p>
                                <p>Because our work is custom-built and labour-intensive, refunds are handled on a case-by-case basis and are governed by the stage of work completed at the time of a refund request. We aim to be fair and transparent at every step.</p>
                                <div className="info-box info-box-green">
                                    <p>✅ <strong>Our commitment:</strong> If a problem is caused by our work, we will fix it, redo it, or refund it — whichever is most appropriate. We will never dismiss a legitimate concern. If something isn't right, please contact us first and we will do everything reasonable to make it right.</p>
                                </div>
                                <p>This policy is to be read alongside our <a href="/terms">Terms &amp; Conditions</a>. In the event of any conflict, the Terms &amp; Conditions take precedence. Where a separate written project agreement exists, that agreement governs refund eligibility for that specific engagement.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 02 Deposit */}
                        <div className="legal-section" id="deposit">
                            <div className="ls-num">02</div>
                            <div className="ls-title">Non-Refundable Deposit</div>
                            <div className="ls-body">
                                <p>All projects require a <strong>50% upfront deposit</strong> before development work begins. This deposit is <strong>non-refundable</strong> in all circumstances once substantial work has commenced.</p>
                                <p>The deposit covers the following costs that are incurred immediately upon project initiation:</p>
                                <ul>
                                    <li>Reservation of your dedicated project slot in our development queue</li>
                                    <li>Initial discovery, planning, and architecture design sessions</li>
                                    <li>Time invested in reviewing your brief, researching requirements, and preparing the project environment</li>
                                    <li>Any third-party assets, tools, licences, or domain/hosting provisioning purchased on your behalf</li>
                                    <li>Opportunity cost — your reserved slot prevents us from taking other client work during that time</li>
                                </ul>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ <strong>48-hour grace period:</strong> If you cancel your project within <strong>48 hours</strong> of paying the deposit, and no substantial work has yet begun (i.e. no design mockups, no code, no purchased assets), we may — at our sole discretion — offer a partial refund of up to 50% of the deposit amount. This is a goodwill gesture and not a guaranteed right.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 03 Full Refund */}
                        <div className="legal-section" id="full-refund">
                            <div className="ls-num">03</div>
                            <div className="ls-title">Full Refund Eligibility</div>
                            <div className="ls-body">
                                <p>A full refund of all payments made (excluding the non-refundable deposit) may be issued in the following circumstances:</p>
                                <ul>
                                    <li><strong>We fail to deliver</strong> — We are unable to deliver the agreed project scope due to reasons entirely within our control, and we cannot offer a satisfactory remedy or substitute.</li>
                                    <li><strong>Duplicate payment</strong> — You were charged twice for the same order or invoice due to a billing error. Duplicate payments are refunded in full with no processing deduction.</li>
                                    <li><strong>Project not started</strong> — You cancel within the 48-hour grace window and no work has commenced (see Section 02).</li>
                                    <li><strong>We cancel the project</strong> — Ayamil Coders terminates the engagement for reasons that are our fault or outside the client's control, and no useful deliverables have been provided.</li>
                                    <li><strong>Fundamental misrepresentation</strong> — We materially misrepresented what would be delivered in the agreed scope, and the actual deliverable bears no reasonable resemblance to what was promised.</li>
                                </ul>
                                <div className="info-box info-box-green">
                                    <p>✅ Full refunds are processed back to the original payment method within <strong>5–10 business days</strong> of approval. Bank transfer refunds may take additional time depending on your financial institution.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 04 Partial Refund */}
                        <div className="legal-section" id="partial">
                            <div className="ls-num">04</div>
                            <div className="ls-title">Partial Refunds</div>
                            <div className="ls-body">
                                <p>Partial refunds are assessed on a case-by-case basis and calculated based on the percentage of agreed work that has been completed at the time of the request. The following situations may qualify for a partial refund:</p>
                                <ul>
                                    <li><strong>Client-initiated cancellation mid-project</strong> — If you cancel after work has begun but before completion, you will be charged for all completed work to date. The remaining balance of any payments beyond completed work may be refunded.</li>
                                    <li><strong>Significant scope reduction</strong> — If you formally reduce the project scope after work has begun (e.g. removing agreed features), the cost difference for unstarted portions may be refunded at our discretion.</li>
                                    <li><strong>Repeated failure to meet quality standards</strong> — If delivered work consistently fails to meet the written specification after two revision rounds and we cannot remedy the issue, a partial refund proportional to the defective portion may be offered.</li>
                                    <li><strong>Force majeure</strong> — In the event of a genuine force majeure event (natural disaster, prolonged internet outage, health emergency) that prevents completion, both parties will negotiate a fair partial settlement.</li>
                                </ul>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ Partial refund amounts are calculated by Ayamil Coders based on hours worked, resources consumed, and deliverables handed over. We will provide a transparent breakdown upon request. Disagreements on the amount are handled through our dispute process (Section 11).</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 05 No-Refund Situations */}
                        <div className="legal-section" id="no-refund">
                            <div className="ls-num">05</div>
                            <div className="ls-title">No-Refund Situations</div>
                            <div className="ls-body">
                                <p>The following situations are explicitly excluded from refund eligibility. Please review these carefully before placing an order:</p>

                                <div className="scenario-grid">
                                    <div className="scenario-card sc-no" style={{ gridColumn: 'span 2' }}>
                                        <div className="sc-label">✕ Not eligible for refund</div>
                                        <ul className="sc-list">
                                            {noRefundItems.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <p>📌 If you are unsure whether your situation qualifies, please email us at <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a> before submitting a formal request. We are always willing to have an honest conversation.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 06 Milestones */}
                        <div className="legal-section" id="milestones">
                            <div className="ls-num">06</div>
                            <div className="ls-title">Milestone-Based Projects</div>
                            <div className="ls-body">
                                <p>Large projects are structured into clearly defined milestones with individual payments tied to each phase. The following refund rules apply per milestone:</p>

                                <div className="scenario-grid">
                                    <div className="scenario-card sc-yes">
                                        <div className="sc-label">✓ Refundable milestone scenarios</div>
                                        <ul className="sc-list">
                                            {milestoneRefundItems.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="scenario-card sc-no">
                                        <div className="sc-label">✕ Non-refundable milestone scenarios</div>
                                        <ul className="sc-list">
                                            {milestoneNoRefundItems.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <p>Each milestone is treated as a semi-independent contract. Approval of one milestone does not constitute acceptance of subsequent undelivered milestones, and vice versa. Refunds on individual milestones will not affect the validity of other completed milestones.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 07 Blockchain */}
                        <div className="legal-section" id="blockchain">
                            <div className="ls-num">07</div>
                            <div className="ls-title">Blockchain &amp; Smart Contract Projects</div>
                            <div className="ls-body">
                                <p>Blockchain and smart contract engagements carry specific characteristics that significantly affect refund eligibility. Please read this section carefully before commissioning any Web3 work.</p>
                                <ul>
                                    <li><strong>Testnet deliveries are fully refundable under standard policy</strong> — Contracts delivered and tested on a testnet (e.g. Sepolia, BSC Testnet) are subject to the standard refund terms above.</li>
                                    <li><strong>Mainnet deployments are non-refundable once deployed</strong> — Once a smart contract is deployed to a live blockchain (Ethereum mainnet, BNB Smart Chain, Polygon, etc.), the deployment is permanent and irreversible. No refund can be issued for the deployed contract itself.</li>
                                    <li><strong>Gas fees and deployment costs are non-refundable</strong> — Blockchain transaction fees paid during deployment cannot be recovered under any circumstances.</li>
                                    <li><strong>Audit recommendations</strong> — We strongly advise commissioning an independent third-party audit before mainnet deployment. We are not responsible for vulnerabilities discovered after deployment on a live network, especially where an audit was recommended and declined.</li>
                                    <li><strong>Source code ownership</strong> — If development work is complete but you choose not to deploy, you retain all rights to the developed code upon full payment. Refunds in this scenario apply only to unstarted portions of work.</li>
                                </ul>
                                <div className="info-box info-box-red">
                                    <p>🔴 <strong>Important:</strong> Smart contract bugs discovered after mainnet deployment may be exploitable and can result in permanent loss of funds. We are not liable for financial losses arising from contract vulnerabilities discovered post-deployment. Always test thoroughly on testnet and seek a professional audit before going live with any contract that handles real value.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 08 Fiverr */}
                        <div className="legal-section" id="fiverr">
                            <div className="ls-num">08</div>
                            <div className="ls-title">Fiverr Orders</div>
                            <div className="ls-body">
                                <p>For projects placed through our Fiverr profile (<a href="https://fiverr.com/muzamil516" target="_blank" rel="noopener">fiverr.com/muzamil516</a>), the following applies in addition to this Refund Policy:</p>
                                <ul>
                                    <li><strong>Fiverr's platform policies take precedence</strong> — Refunds for Fiverr orders are first governed by Fiverr's Terms of Service and Resolution Centre process. Fiverr may independently issue refunds or credits at their discretion.</li>
                                    <li><strong>Order cancellations</strong> — Mutual order cancellations on Fiverr result in the payment being returned to your Fiverr balance or original payment method, subject to Fiverr's standard processing timelines.</li>
                                    <li><strong>Dispute via Fiverr</strong> — If you open a dispute through Fiverr's Resolution Centre, this policy acts as a supporting reference for our stated position, but Fiverr's mediators have final authority on the platform.</li>
                                    <li><strong>Direct refund requests for Fiverr orders</strong> — We are unable to issue direct PayPal or bank refunds for orders placed via Fiverr. All financial resolution for Fiverr orders must go through the Fiverr platform.</li>
                                </ul>
                                <div className="info-box">
                                    <p>💬 Before opening a Fiverr dispute, please message us directly through Fiverr chat first. Most issues are resolved quickly and amicably without needing to escalate to Fiverr support.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 09 How to Request */}
                        <div className="legal-section" id="process">
                            <div className="ls-num">09</div>
                            <div className="ls-title">How to Request a Refund</div>
                            <div className="ls-body">
                                <p>To submit a refund request for a direct engagement (not a Fiverr order), please follow these steps:</p>

                                <div className="timeline">
                                    {timelineSteps.map((step, index) => (
                                        <div key={index} className="tl-step">
                                            <div className="tl-num">{step.num}</div>
                                            <div className="tl-content">
                                                <div className="tl-title">{step.title}</div>
                                                <div className="tl-desc">{step.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="info-box info-box-warn">
                                    <p>⚠️ Refund requests submitted more than <strong>30 days after project handover</strong> will not be considered unless the issue relates to a concealed defect that was not discoverable upon reasonable inspection at delivery time.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 10 Timeline */}
                        <div className="legal-section" id="timeline">
                            <div className="ls-num">10</div>
                            <div className="ls-title">Processing &amp; Timeline</div>
                            <div className="ls-body">
                                <p>Once a refund has been approved, processing times vary by payment method:</p>
                                <ul>
                                    <li><strong>PayPal</strong> — Refunds are initiated within 2 business days of approval. Funds typically appear in your PayPal balance within 3–5 business days.</li>
                                    <li><strong>Payoneer</strong> — Refunds are processed within 3–5 business days of approval.</li>
                                    <li><strong>Bank transfer (international)</strong> — Processing takes 5–10 business days depending on your bank and country. Intermediary bank fees, if any, are borne by the recipient.</li>
                                    <li><strong>Bank transfer (Pakistan)</strong> — Local bank transfers are processed within 1–3 business days via IBFT.</li>
                                    <li><strong>Cryptocurrency (USDT/BTC)</strong> — Crypto refunds are issued at the <strong>original exchange rate at time of payment</strong>, not the current market rate. Network gas fees for the refund transaction are deducted from the refund amount.</li>
                                    <li><strong>Fiverr</strong> — Fiverr-mediated refunds follow Fiverr's own processing schedule, typically 3–7 business days back to your Fiverr balance or original payment method.</li>
                                </ul>
                                <div className="info-box">
                                    <p>📌 We do not absorb payment processor fees on refunds where they are charged by the platform (e.g. PayPal's non-return of transaction fees on amounts over certain thresholds). The net refundable amount will be communicated to you at the time of approval.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 11 Disputes */}
                        <div className="legal-section" id="disputes">
                            <div className="ls-num">11</div>
                            <div className="ls-title">Disputes &amp; Escalation</div>
                            <div className="ls-body">
                                <p>If you disagree with our refund decision, you may escalate the matter through the following process:</p>
                                <ul>
                                    <li><strong>Internal review</strong> — You may request that your case be reviewed by a senior member of the Ayamil Coders team. Submit your request to <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a> with the subject line <strong>"Refund Escalation — [Project Name]"</strong>. We will provide a final internal decision within 7 business days.</li>
                                    <li><strong>Mediation</strong> — If internal review does not resolve the matter, both parties may agree to appoint a neutral third-party mediator. Costs are shared equally.</li>
                                    <li><strong>Arbitration</strong> — Unresolved disputes proceed to binding arbitration as described in our <a href="/terms">Terms &amp; Conditions, Section 11</a>.</li>
                                    <li><strong>Payment platform chargeback</strong> — You retain the right to file a chargeback through your bank or PayPal if you believe a charge was unauthorised. Please note that initiating a chargeback without first following this refund process may result in the suspension of any ongoing work and access to project deliverables pending resolution.</li>
                                </ul>
                                <div className="info-box">
                                    <p>💬 <strong>A note from us:</strong> We genuinely prefer to resolve disagreements through conversation. A quick call or message often surfaces a solution that a formal process cannot. Please reach out before escalating — we are listening.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 12 Contact */}
                        <div className="legal-section" id="contact-rp">
                            <div className="ls-num">12</div>
                            <div className="ls-title">Contact Us</div>
                            <div className="ls-body">
                                <p>For all refund requests, billing questions, or concerns about your engagement, please reach out through any of the following channels. We respond to all messages within <strong>1–2 business days</strong>.</p>
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
                                <p style={{ fontSize: '13px', color: 'var(--txt3)' }}>For urgent matters, <strong style={{ color: 'var(--txt2)' }}>WhatsApp</strong> is the fastest way to reach us. For formal refund requests, please use email so we have a written record.</p>

                                {/* Related legal links */}
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '22px' }}>
                                    <a href="/privacy-policy" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Privacy Policy</a>
                                    <a href="/terms" className="btn-g" style={{ padding: '9px 18px', fontSize: '13px' }}>Terms &amp; Conditions</a>
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