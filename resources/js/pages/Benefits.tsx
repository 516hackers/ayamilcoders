/**
 * resources/js/pages/Benefits.tsx
 *
 * Ayamil Coders — "Client Benefits" page
 *
 * Footer-only page (not in main nav) — linked from AyamilLayout's footer
 * "Company" column. Client-facing: makes the concrete case for why a
 * potential client should choose Ayamil Coders, built from real company
 * stats/services plus operational commitments (pricing, support terms).
 *
 * Follows the same pattern as Solutions.tsx: scoped page CSS injected via
 * useEffect, shared <SEO> component, shared global classes (.sp, .i3,
 * .ib/.ig/.ip, .btn-p, .section-lbl, .shimmer-txt) from shared.css, and a
 * WhatsApp CTA reused across the page.
 */

import { useEffect } from 'react';
import SEO from '@/components/SEO';

const WHATSAPP = 'https://wa.me/923127592672?text=Hi%2C%20I%20checked%20out%20the%20Benefits%20page%20and%20I%27d%20like%20to%20talk%20about%20my%20project.';

const WA_ICON = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9" />
    </svg>
);

const benefits = [
    {
        icon: 'ib',
        title: 'Proven Track Record',
        desc: '600+ projects delivered and 2,000+ issues fixed — a real, ongoing history of work across web, blockchain, and AI, not a portfolio of one-offs.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M7 6H4a2 2 0 0 0 2 4M17 6h3a2 2 0 0 1-2 4" /></svg>,
    },
    {
        icon: 'ig',
        title: '5+ Years in the Field',
        desc: 'Founded in 2023 and operating consistently since — established enough to trust with a real project, not a brand-new freelancer setup.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    },
    {
        icon: 'ip',
        title: 'Full-Stack Range',
        desc: 'Web Development, Blockchain Development, AI Development, and Bug Fixing under one roof — no juggling multiple vendors for one project.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    },
    {
        icon: 'ib',
        title: 'Global Reach, Direct Access',
        desc: 'Clients worldwide, but you talk directly to the people actually building your project — no account-manager layer in between.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    },
    {
        icon: 'ig',
        title: 'Fast, Direct Communication',
        desc: 'WhatsApp-first workflow — quick answers to real questions, instead of getting stuck in a slow support-ticket queue.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
    },
    {
        icon: 'ip',
        title: 'Transparent, Upfront Pricing',
        desc: 'Fixed quotes agreed before any work starts — the price you agree on is the price you pay, with no hidden costs added later.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M20.59 13.41L11 3.83V3H3v8l.83.83L13.41 21.4a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83z" /><circle cx="6.5" cy="6.5" r="1.5" /></svg>,
    },
    {
        icon: 'ib',
        title: '3 Months Free Post-Launch Support',
        desc: 'Every project includes three months of free maintenance and support after launch — bug fixes and follow-up help, at no extra charge.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
    },
    {
        icon: 'ig',
        title: 'Consistent Client Satisfaction',
        desc: 'A track record built on repeat work and referrals — clients who come back, and clients who send other clients our way.',
        svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
    },
];

const processSteps = [
    {
        title: 'Discovery Call & Fixed Quote',
        desc: 'A real conversation on WhatsApp about what you need. You get a fixed price quote before anything starts — no obligation, no pressure.',
    },
    {
        title: 'Short Contract & Advance',
        desc: 'Clear terms in a short contract, plus an advance payment to begin — simple, transparent, and agreed before work starts.',
    },
    {
        title: 'Build & Direct Check-Ins',
        desc: 'Development happens with direct WhatsApp updates along the way — no black box, no waiting weeks to hear anything.',
    },
    {
        title: 'Launch & 3 Months Free Support',
        desc: 'Your project goes live, then three months of free maintenance and support are included at no extra charge.',
    },
];

const faqs = [
    {
        q: 'Do you require full payment upfront?',
        a: 'No. Projects start with a short contract and an agreed advance payment, with the remaining terms laid out clearly upfront — no surprise costs added later.',
    },
    {
        q: 'What happens after the 3 months of free support ends?',
        a: 'You can discuss an ongoing maintenance arrangement with us if you want continued support beyond the free period — there\'s no obligation to do so, and the initial 3 months are included with every project regardless.',
    },
    {
        q: 'Do you sign a contract for every project?',
        a: 'Yes. Every project starts with a short contract laying out scope, cost, and terms, so both sides know exactly what\'s agreed before any work or payment happens.',
    },
    {
        q: 'What technologies do you actually build with?',
        a: 'React, Next.js, and Laravel for web development; Solidity and Web3 tooling for blockchain and smart contracts; and modern AI/ML tooling for AI development projects.',
    },
    {
        q: 'Can I see examples of past work before hiring you?',
        a: 'Yes — reach out on WhatsApp or through the Contact page and we can walk you through relevant past work for your type of project.',
    },
];

export default function Benefits() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('benefits-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'benefits-page-css';
        style.textContent = `
            .ben-hero{padding:88px 60px 64px;position:relative;overflow:hidden;background:var(--bg2);border-bottom:1px solid var(--brd);text-align:center}
            @media(max-width:767px){.ben-hero{padding:64px 24px 44px}}
            .ben-hero-inner{position:relative;z-index:2;max-width:700px;margin:0 auto}
            .ben-h1{font-size:clamp(28px,5vw,48px);font-family:var(--disp);font-weight:800;letter-spacing:-.02em;margin-top:10px;line-height:1.2}
            .ben-body{font-size:15px;color:var(--txt2);line-height:1.8;margin:18px 0 26px}
            .ben-trust{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:22px;font-size:12.5px;color:var(--txt3);font-family:var(--mono)}
            .ben-trust .dot{width:6px;height:6px;border-radius:50%;background:var(--green);flex-shrink:0;box-shadow:0 0 8px rgba(45,211,111,.6)}

            .ben-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
            @media(max-width:1279px){.ben-grid{grid-template-columns:repeat(3,1fr)}}
            @media(max-width:1023px){.ben-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.ben-grid{grid-template-columns:1fr}}
            .ben-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:26px;transition:all .35s}
            .ben-card:hover{border-color:var(--brd2);transform:translateY(-4px);box-shadow:0 14px 44px rgba(41,121,242,.1)}
            .ben-icon-wrap{margin-bottom:16px}
            .ben-title{font-family:var(--disp);font-weight:700;font-size:16px;margin-bottom:8px;line-height:1.3}
            .ben-desc{font-size:13.5px;color:var(--txt2);line-height:1.7}

            .ben-cta-final{padding:72px 60px;text-align:center;position:relative;overflow:hidden;border-top:1px solid var(--brd)}
            @media(max-width:767px){.ben-cta-final{padding:52px 24px}}
            .ben-cta-final h2{font-size:clamp(24px,4vw,36px);font-family:var(--disp);font-weight:800;letter-spacing:-.02em;margin-bottom:12px}
            .ben-cta-final p{font-size:14.5px;color:var(--txt2);max-width:480px;margin:0 auto 26px;line-height:1.7}

            .ben-process{padding:72px 60px;border-top:1px solid var(--brd);background:var(--bg2)}
            @media(max-width:767px){.ben-process{padding:52px 24px}}
            .ben-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1080px;margin:0 auto}
            @media(max-width:1023px){.ben-process-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.ben-process-grid{grid-template-columns:1fr}}
            .ben-step{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px;position:relative}
            .ben-step-num{font-family:var(--disp);font-weight:800;font-size:28px;color:var(--blue-lt);opacity:.5;margin-bottom:10px}
            .ben-step-title{font-family:var(--disp);font-weight:700;font-size:15px;margin-bottom:8px;line-height:1.3}
            .ben-step-desc{font-size:13px;color:var(--txt2);line-height:1.7}
            .ben-step-arrow{display:none}
            @media(min-width:1024px){.ben-step:not(:last-child)::after{content:'→';position:absolute;right:-22px;top:50%;transform:translateY(-50%);color:var(--txt3);font-size:16px}}

            .ben-faq{border:1px solid var(--brd);border-radius:var(--r-lg);margin-bottom:10px;background:var(--card-bg);overflow:hidden}
            .ben-faq summary{padding:16px 20px;cursor:pointer;font-weight:600;font-size:14px;color:var(--txt);list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px}
            .ben-faq summary::-webkit-details-marker{display:none}
            .ben-faq summary::after{content:'+';font-size:20px;font-weight:300;color:var(--blue-lt);flex-shrink:0;transition:transform .25s}
            .ben-faq[open] summary::after{transform:rotate(45deg)}
            .ben-faq-a{padding:0 20px 16px;font-size:13.5px;color:var(--txt3);line-height:1.75}
        `;
        document.head.appendChild(style);

        return () => {
            const s = document.getElementById('benefits-page-css');
            if (s) s.remove();
        };
    }, []);

    const pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Client Benefits - Ayamil Coders',
        description: 'Why potential clients choose Ayamil Coders for Web Development, Blockchain, AI Development, and Bug Fixing.',
        url: 'https://ayamilcoders.com/benefits',
        about: { '@id': 'https://ayamilcoders.com/#organization' },
        isPartOf: { '@id': 'https://ayamilcoders.com/#website' },
    };

    return (
        <>
            <SEO
                title="Client Benefits - Why Choose Ayamil Coders"
                description="600+ projects delivered, fixed upfront pricing, 3 months free post-launch support, and direct WhatsApp communication — see why clients choose Ayamil Coders."
                keywords="why choose Ayamil Coders, software house benefits, Ayamil Coders advantages, fixed price web development Pakistan, post launch support software house"
                url="https://ayamilcoders.com/benefits"
                schema={pageSchema}
            />

            {/* ===== HERO ===== */}
            <div className="ben-hero">
                <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', filter: 'blur(90px)', background: 'rgba(41,121,242,.07)', top: '-120px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}></div>
                <div className="ben-hero-inner">
                    <span className="section-lbl">Ayamil Coders</span>
                    <h1 className="ben-h1">
                        Why Clients <span className="shimmer-txt">Choose Us</span> — And Stick With Us
                    </h1>
                    <p className="ben-body">
                        Eight concrete reasons clients pick Ayamil Coders for their web, blockchain, and AI projects — built on real numbers, not marketing claims.
                    </p>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-p">
                        {WA_ICON}
                        Talk to Us on WhatsApp
                    </a>
                    <div className="ben-trust">
                        <span className="dot"></span>
                        600+ projects delivered &middot; 2,000+ issues fixed &middot; 5+ years in the field
                    </div>
                </div>
            </div>

            {/* ===== HOW WE WORK ===== */}
            <section className="ben-process">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl">How We Work</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        From First Message to <span className="shimmer-txt">Launch</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                        A simple, transparent process — the same one described on our Solutions page, no different terms depending on who's asking.
                    </p>
                </div>
                <div className="ben-process-grid">
                    {processSteps.map((s, i) => (
                        <div key={i} className="ben-step" data-a="scale" data-d={i + 1}>
                            <div className="ben-step-num">{String(i + 1).padStart(2, '0')}</div>
                            <div className="ben-step-title">{s.title}</div>
                            <div className="ben-step-desc">{s.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== BENEFITS GRID ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl">The Case For Ayamil Coders</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        What You Actually <span className="shimmer-txt">Get</span>
                    </h2>
                </div>
                <div className="ben-grid">
                    {benefits.map((b, index) => (
                        <div key={index} className="ben-card" data-a="scale" data-d={(index % 4) + 1}>
                            <div className="ben-icon-wrap">
                                <div className={`i3 ${b.icon}`} style={{ width: '52px', height: '52px', borderRadius: '14px' }}>
                                    {b.svg}
                                </div>
                            </div>
                            <div className="ben-title">{b.title}</div>
                            <div className="ben-desc">{b.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '32px' }} data-a="blur">
                    <span className="section-lbl">Common Questions</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        Before You <span className="shimmer-txt">Reach Out</span>
                    </h2>
                </div>
                <div style={{ maxWidth: '720px', margin: '0 auto' }} data-a="up">
                    {faqs.map((faq, i) => (
                        <details key={i} className="ben-faq">
                            <summary>{faq.q}</summary>
                            <div className="ben-faq-a">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="ben-cta-final" data-a="up">
                <h2>Ready to Start Your Project?</h2>
                <p>No pressure, no obligation — just a real conversation on WhatsApp about what you need and a fixed quote before anything begins.</p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-p">
                    {WA_ICON}
                    Message Us on WhatsApp
                </a>
            </section>
        </>
    );
}
