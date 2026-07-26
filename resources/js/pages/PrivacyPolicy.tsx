import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('privacy-policy-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'privacy-policy-css';
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
            .ls-body code {
                font-family: var(--mono);
                font-size: 12px;
                background: rgba(255,255,255,.06);
                padding: 2px 6px;
                border-radius: 4px;
                color: var(--txt2);
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
            [data-theme="light"] .ls-body code {
                background: rgba(0,0,0,.04);
            }
            [data-theme="light"] .toc-a.active {
                color: #0d1b38;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const el = document.getElementById('privacy-policy-css');
            if (el) el.remove();
        };
    }, []);

    // ===== JS FOR PRIVACY POLICY PAGE =====
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
        { id: 'overview', num: '01', label: 'Overview' },
        { id: 'data-collect', num: '02', label: 'Data We Collect' },
        { id: 'how-use', num: '03', label: 'How We Use It' },
        { id: 'sharing', num: '04', label: 'Data Sharing' },
        { id: 'cookies', num: '05', label: 'Cookies' },
        { id: 'retention', num: '06', label: 'Data Retention' },
        { id: 'security', num: '07', label: 'Security' },
        { id: 'rights', num: '08', label: 'Your Rights' },
        { id: 'children', num: '09', label: "Children's Privacy" },
        { id: 'third-party', num: '10', label: 'Third-Party Links' },
        { id: 'changes', num: '11', label: 'Policy Changes' },
        { id: 'contact-pp', num: '12', label: 'Contact Us' }
    ];

    const metaInfo = [
        { label: 'Effective Date', value: 'January 1, 2025' },
        { label: 'Last Updated', value: 'January 1, 2025' },
        { label: 'Jurisdiction', value: 'Pakistan (PTA)' },
        { label: 'Contact', value: 'info@ayamilcoders.com' }
    ];

      const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "description": "Read Ayamil Coders' privacy policy. Learn how we collect, use, and protect your personal data.",
        "url": "https://ayamilcoders.com/privacy-policy",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Ayamil Coders",
            "url": "https://ayamilcoders.com"
        }
    };

    return (
        <>
            <SEO 
                title="Privacy Policy"
                description="Read Ayamil Coders' privacy policy. Learn how we collect, use, and protect your personal data."
                keywords="privacy policy, data protection, personal data, Ayamil Coders"
                url="https://ayamilcoders.com/privacy-policy"
                schema={pageSchema}
            />
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(41,121,242,.1),transparent 70%)', top: '-100px', right: '-60px' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }} data-a="up">
                    <span className="section-lbl">Legal</span>
                    <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.08, margin: '12px 0 14px' }}>
                        Privacy <span className="shimmer-txt">Policy</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '540px', lineHeight: 1.75 }}>
                        This policy explains what data we collect, why we collect it, and how we protect it. We keep this simple and direct — no hidden practices, no dark patterns.
                    </p>
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
                    </aside>

                    {/* BODY */}
                    <div className="legal-body" data-a="right">

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
                            <div className="ls-title">Overview</div>
                            <div className="ls-body">
                                <p>Ayamil Coders ("we", "us", "our") is a software development company registered and operating in Sadiqabad, Punjab, Pakistan, founded by Muhammad Muzamil. This Privacy Policy applies to our website at <strong>ayamilcoders.com</strong>, our Fiverr profile (<strong>muzamil516</strong>), and any direct communications or services we provide.</p>
                                <p>By using our website or engaging our services, you agree to the collection and use of information as described in this policy. If you do not agree, please discontinue use of our site and services.</p>
                                <div className="info-box">
                                    <p>🔒 <strong>Short version:</strong> We collect only what we need to deliver our services and respond to inquiries. We do not sell your data to anyone — ever.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 02 Data We Collect */}
                        <div className="legal-section" id="data-collect">
                            <div className="ls-num">02</div>
                            <div className="ls-title">Data We Collect</div>
                            <div className="ls-body">
                                <p>We collect personal data only when you actively provide it to us — through our contact form, email, WhatsApp, or Fiverr. We do not use invisible tracking pixels or third-party ad targeting.</p>
                                <p><strong>Information you provide directly:</strong></p>
                                <ul>
                                    <li>Name, email address, and phone number submitted via our contact or careers forms</li>
                                    <li>Project details, briefs, and files shared during client engagements</li>
                                    <li>Payment details processed through third-party payment platforms (we do not store card details)</li>
                                    <li>Communications via email, WhatsApp, or Fiverr messaging</li>
                                    <li>Job applications including CV, portfolio links, and work samples</li>
                                </ul>
                                <p><strong>Information collected automatically:</strong></p>
                                <ul>
                                    <li>Basic server access logs — IP address, browser type, pages visited, referral URL</li>
                                    <li>Anonymised usage analytics (if analytics are enabled) — no personal identifiers</li>
                                    <li>Technical data needed to display the website correctly on your device</li>
                                </ul>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 03 How We Use It */}
                        <div className="legal-section" id="how-use">
                            <div className="ls-num">03</div>
                            <div className="ls-title">How We Use Your Data</div>
                            <div className="ls-body">
                                <p>We use collected information only for the following purposes:</p>
                                <ul>
                                    <li><strong>Service delivery</strong> — to scope, build, and deliver the software products and services you have commissioned</li>
                                    <li><strong>Client communication</strong> — to respond to inquiries, send project updates, and provide post-launch support</li>
                                    <li><strong>Billing and invoicing</strong> — to process payments and issue receipts for completed work</li>
                                    <li><strong>Hiring</strong> — to evaluate job applications and communicate with candidates</li>
                                    <li><strong>Legal compliance</strong> — to meet obligations under Pakistani law and international contractual requirements</li>
                                    <li><strong>Website improvement</strong> — to identify and fix technical issues using anonymised log data</li>
                                </ul>
                                <p>We will never use your data for unsolicited marketing without your explicit consent, and we will not combine your data with third-party data sets for profiling purposes.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 04 Data Sharing */}
                        <div className="legal-section" id="sharing">
                            <div className="ls-num">04</div>
                            <div className="ls-title">Data Sharing</div>
                            <div className="ls-body">
                                <p><strong>We do not sell, rent, or trade your personal information.</strong> We share data only in the following limited circumstances:</p>
                                <ul>
                                    <li><strong>Sub-contractors</strong> — team members or specialist freelancers who work on your project under confidentiality agreements. They receive only the data needed to complete their specific task.</li>
                                    <li><strong>Payment processors</strong> — platforms such as PayPal, bank institutions, or cryptocurrency networks when processing transactions. These are governed by their own privacy policies.</li>
                                    <li><strong>Platform intermediaries</strong> — Fiverr, when projects are initiated through that platform. Fiverr's Privacy Policy applies to data shared within their platform.</li>
                                    <li><strong>Legal obligation</strong> — if required by Pakistani law, a court order, or to protect the rights and safety of Ayamil Coders or third parties.</li>
                                </ul>
                                <div className="info-box info-box-warn">
                                    <p>⚠️ Any sub-contractor who handles client data is required to sign a confidentiality agreement before accessing project materials.</p>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 05 Cookies */}
                        <div className="legal-section" id="cookies">
                            <div className="ls-num">05</div>
                            <div className="ls-title">Cookies</div>
                            <div className="ls-body">
                                <p>Our website uses a minimal number of cookies to function correctly:</p>
                                <ul>
                                    <li><strong>Theme preference cookie</strong> — stores your dark/light mode preference in <code>localStorage</code> so it persists across visits. No personal data is stored in this cookie.</li>
                                    <li><strong>Session cookies</strong> — temporary cookies set by the web server that expire when you close your browser. Used for basic site functionality.</li>
                                </ul>
                                <p>We do not currently use advertising cookies, cross-site tracking cookies, or third-party analytics cookies that identify individuals. If this changes, this policy will be updated and you will be notified via a prominent banner on our website.</p>
                                <p>You can manage or delete cookies at any time through your browser settings. Disabling cookies may affect some website functionality (such as saved theme preference).</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 06 Retention */}
                        <div className="legal-section" id="retention">
                            <div className="ls-num">06</div>
                            <div className="ls-title">Data Retention</div>
                            <div className="ls-body">
                                <p>We retain your data only for as long as necessary to fulfil the purpose it was collected for:</p>
                                <ul>
                                    <li><strong>Client project data</strong> — retained for 3 years after project completion for warranty, support, and dispute resolution purposes, then securely deleted.</li>
                                    <li><strong>Invoicing and financial records</strong> — retained for 7 years as required by Pakistani tax and accounting law.</li>
                                    <li><strong>Contact form inquiries that did not result in a project</strong> — deleted after 12 months.</li>
                                    <li><strong>Job applications</strong> — retained for 6 months after the position is filled. Unsuccessful applicants are notified and their data deleted upon request.</li>
                                    <li><strong>Server access logs</strong> — automatically purged after 90 days.</li>
                                </ul>
                                <p>You may request earlier deletion of your data at any time (see Your Rights below), subject to legal retention obligations.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 07 Security */}
                        <div className="legal-section" id="security">
                            <div className="ls-num">07</div>
                            <div className="ls-title">Security</div>
                            <div className="ls-body">
                                <p>We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure:</p>
                                <ul>
                                    <li>All data transmitted between your browser and our website is encrypted via TLS/HTTPS</li>
                                    <li>Project files and client communications are stored on password-protected, access-controlled systems</li>
                                    <li>Payment information is handled exclusively through PCI-compliant third-party processors — we never store raw card data</li>
                                    <li>Internal access to client data is restricted to team members directly involved in the project</li>
                                </ul>
                                <p>While we take every reasonable precaution, no method of internet transmission or electronic storage is 100% secure. In the event of a data breach that affects your personal information, we will notify you within 72 hours of becoming aware of it.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 08 Your Rights */}
                        <div className="legal-section" id="rights">
                            <div className="ls-num">08</div>
                            <div className="ls-title">Your Rights</div>
                            <div className="ls-body">
                                <p>Regardless of where you are located, you have the following rights regarding your personal data:</p>
                                <ul>
                                    <li><strong>Right to Access</strong> — You can request a copy of all personal data we hold about you.</li>
                                    <li><strong>Right to Rectification</strong> — You can ask us to correct any inaccurate or incomplete data.</li>
                                    <li><strong>Right to Erasure</strong> — You can request deletion of your data, subject to legal retention requirements.</li>
                                    <li><strong>Right to Data Portability</strong> — You can request your data in a structured, machine-readable format.</li>
                                    <li><strong>Right to Object</strong> — You can object to our processing of your data for direct marketing purposes at any time.</li>
                                    <li><strong>Right to Restrict Processing</strong> — You can ask us to limit how we use your data while a dispute is being resolved.</li>
                                </ul>
                                <p>To exercise any of these rights, email us at <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a> with the subject line "Data Request". We will respond within 30 days.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 09 Children */}
                        <div className="legal-section" id="children">
                            <div className="ls-num">09</div>
                            <div className="ls-title">Children's Privacy</div>
                            <div className="ls-body">
                                <p>Our services are intended for businesses and individuals aged 18 and over. We do not knowingly collect personal data from anyone under the age of 18.</p>
                                <p>If you believe a minor has submitted personal data through our website or contact channels, please contact us immediately at <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a> and we will delete the data promptly.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 10 Third-Party Links */}
                        <div className="legal-section" id="third-party">
                            <div className="ls-num">10</div>
                            <div className="ls-title">Third-Party Links</div>
                            <div className="ls-body">
                                <p>Our website may contain links to third-party websites, including Fiverr, LinkedIn, Facebook, Instagram, and client portfolio sites. Once you leave our website, this Privacy Policy no longer applies.</p>
                                <p>We encourage you to review the privacy policies of any third-party site you visit. We are not responsible for the privacy practices of external websites and have no control over their data collection activities.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 11 Changes */}
                        <div className="legal-section" id="changes">
                            <div className="ls-num">11</div>
                            <div className="ls-title">Policy Changes</div>
                            <div className="ls-body">
                                <p>We may update this Privacy Policy from time to time. When we make significant changes, we will:</p>
                                <ul>
                                    <li>Update the "Last Updated" date at the top of this page</li>
                                    <li>Post a notice on our homepage for 30 days following any material change</li>
                                    <li>Notify active clients by email if the changes affect how we process their data</li>
                                </ul>
                                <p>Continued use of our website or services after any changes constitutes your acceptance of the revised policy.</p>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* 12 Contact */}
                        <div className="legal-section" id="contact-pp">
                            <div className="ls-num">12</div>
                            <div className="ls-title">Contact Us</div>
                            <div className="ls-body">
                                <p>For any questions, concerns, or requests related to this Privacy Policy or your personal data, please contact us:</p>
                                <div className="info-box">
                                    <p>
                                        <strong>Ayamil Coders</strong><br />
                                        Founded by Muhammad Muzamil<br />
                                        Sadiqabad, Punjab, Pakistan<br />
                                        📧 <a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a><br />
                                        💬 <a href="https://wa.me/923127592672" target="_blank">WhatsApp: +92 312 759 2672</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}