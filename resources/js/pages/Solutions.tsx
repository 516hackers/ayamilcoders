/**
 * resources/js/pages/Solutions.tsx
 *
 * Ayamil Coders — "Solutions" landing page
 *
 * NOT linked in the main navigation on purpose — this is a direct-traffic
 * page meant for ad campaigns (Google/Meta/etc.), so it deliberately isn't
 * added to AyamilLayout's nav-a list. It still uses AyamilLayout so it
 * shares the site's header/footer/theme/FAB, it's just reachable only by
 * direct link (e.g. ayamilcoders.com/solutions).
 *
 * Three pitches, each with its own WhatsApp CTA, so a visitor arriving
 * from any specific ad angle (bug fix / SEO+AI visibility / custom dev)
 * sees their problem addressed first and can act immediately without
 * scrolling through unrelated content.
 */

import { useEffect } from 'react';
import SEO from '@/components/SEO';

const WHATSAPP = 'https://wa.me/923127592672?text=Hi%2C%20I%20found%20your%20Solutions%20page%20and%20I%27d%20like%20to%20talk%20about%20my%20project.';

export default function Solutions() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('solutions-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'solutions-page-css';
        style.textContent = `
            .sol-hero{padding:88px 60px 64px;position:relative;overflow:hidden;background:var(--bg2);border-bottom:1px solid var(--brd);text-align:center}
            @media(max-width:767px){.sol-hero{padding:64px 24px 44px}}
            .sol-hero-inner{position:relative;z-index:2;max-width:680px;margin:0 auto}
            .sol-trust{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:22px;font-size:12.5px;color:var(--txt3);font-family:var(--mono)}
            .sol-trust .dot{width:6px;height:6px;border-radius:50%;background:var(--green);flex-shrink:0;box-shadow:0 0 8px rgba(45,211,111,.6)}

            .sol-block{padding:64px 60px;border-bottom:1px solid var(--brd)}
            @media(max-width:1023px){.sol-block{padding:52px 32px}}
            @media(max-width:639px){.sol-block{padding:44px 24px}}
            .sol-block:nth-child(odd){background:var(--bg2)}
            .sol-inner{max-width:640px;margin:0 auto;text-align:center}
            .sol-icon-wrap{display:flex;justify-content:center;margin-bottom:18px}
            .sol-h2{font-size:clamp(24px,4vw,36px);font-family:var(--disp);font-weight:800;letter-spacing:-.02em;margin-bottom:14px;line-height:1.2}
            .sol-body{font-size:15px;color:var(--txt2);line-height:1.8;margin-bottom:18px}
            .sol-note{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;background:rgba(41,121,242,.08);border:1px solid rgba(41,121,242,.2);font-size:12.5px;color:var(--txt2);margin-bottom:24px;text-align:left}
            .sol-case{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:16px 20px;margin-bottom:26px;text-align:left;font-size:13px;color:var(--txt3);line-height:1.7}
            .sol-case strong{color:var(--txt2)}

            .sol-cta-final{padding:64px 60px;text-align:center;background:linear-gradient(180deg,var(--bg2),var(--bg));position:relative;overflow:hidden}
            @media(max-width:639px){.sol-cta-final{padding:48px 24px}}
            .sol-cta-final h2{font-size:clamp(22px,4vw,32px);font-family:var(--disp);font-weight:800;margin-bottom:12px}
            .sol-cta-final p{font-size:14px;color:var(--txt3);max-width:480px;margin:0 auto 26px}
            .sol-disclaimer{font-size:11.5px;color:var(--txt3);margin-top:20px;font-family:var(--mono);opacity:.7}

            .sol-btn-wrap{display:flex;justify-content:center;margin-top:8px}
        `;
        document.head.appendChild(style);
        return () => { style.remove(); };
    }, []);

    const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ayamilcoders.com' },
                    { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://ayamilcoders.com/solutions' },
                ],
            },
            {
                '@type': 'Service',
                '@id': 'https://ayamilcoders.com/solutions#bug-fixing',
                name: 'Website Bug Fixing',
                serviceType: 'Bug Fixing',
                description: 'Diagnosis-first debugging for crashing or broken websites — root-cause fixes, not quick patches.',
                provider: { '@id': 'https://ayamilcoders.com/#organization' },
                areaServed: 'Worldwide',
            },
            {
                '@type': 'Service',
                '@id': 'https://ayamilcoders.com/solutions#ai-visibility-seo',
                name: 'AI Visibility & SEO',
                serviceType: 'Search & AI Visibility Optimization',
                description: 'Traditional SEO plus AEO, GEO, and LLMO so businesses appear in both Google search and AI-assistant answers.',
                provider: { '@id': 'https://ayamilcoders.com/#organization' },
                areaServed: 'Worldwide',
            },
            {
                '@type': 'Service',
                '@id': 'https://ayamilcoders.com/solutions#custom-development',
                name: 'Custom Page & Feature Development',
                serviceType: 'Custom Web Development',
                description: 'Custom, dynamic pages and features added to existing websites — beyond what a template can do.',
                provider: { '@id': 'https://ayamilcoders.com/#organization' },
                areaServed: 'Worldwide',
            },
        ],
    };

    return (
        <>
            <SEO
                title="Solutions - Bug Fixing, AI Visibility & Custom Development"
                description="Website problems? We fix them, build them, and make sure people find them — bug fixing, AI/SEO visibility (AEO, GEO, LLMO), and custom dynamic development."
                keywords="fix website bugs, website not showing in AI search, AEO, GEO, LLMO, AI search visibility, custom website features, dynamic page development, Ayamil Coders solutions"
                url="https://ayamilcoders.com/solutions"
                schema={pageSchema}
            />

            {/* ===== HERO ===== */}
            <div className="sol-hero">
                <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', filter: 'blur(90px)', background: 'rgba(41,121,242,.07)', top: '-120px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}></div>
                <div className="sol-hero-inner">
                    <span className="section-lbl">Ayamil Coders</span>
                    <h1 className="sol-h2" style={{ fontSize: 'clamp(28px,5vw,48px)', marginTop: '10px' }}>
                        Website Problems? We <span className="shimmer-txt">Fix Them, Build Them,</span> and Make Sure People Find Them.
                    </h1>
                    <p className="sol-body">
                        One team for the whole picture — broken things get fixed, new things get built, and your site actually gets seen by people (and increasingly, by AI).
                    </p>
                    <div className="sol-btn-wrap">
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-p">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg>
                            Chat With Us on WhatsApp
                        </a>
                    </div>
                    <div className="sol-trust">
                        <span className="dot"></span>
                        Trusted by 50+ clients worldwide &middot; 600+ projects delivered
                    </div>
                </div>
            </div>

            {/* ===== SECTION 1 — BUG FIXING ===== */}
            <section className="sol-block" data-a="up">
                <div className="sol-inner">
                    <div className="sol-icon-wrap">
                        <div className="i3 ib" style={{ width: '64px', height: '64px', borderRadius: '18px' }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M9 9l-2 2v6l2 2M15 9l2 2v6l-2 2M12 4v3M9 12h6M12 7a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0v-4a3 3 0 0 0-3-3z"/></svg>
                        </div>
                    </div>
                    <h2 className="sol-h2">Website Crashing? Errors? We Fix It.</h2>
                    <p className="sol-body">
                        We don't guess and patch. We diagnose the real, root cause first — research it properly, walk you through what's actually possible, and only then fix it, so the same bug doesn't come back in a different shape next month.
                    </p>
                    <div className="sol-note">
                        💬 Simple process: a short contract + 50% advance to start, clear terms throughout, no surprise costs.
                    </div>
                    <div className="sol-btn-wrap">
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-p">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg>
                            Get My Bug Fixed
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 2 — AI VISIBILITY / SEO ===== */}
            <section className="sol-block" data-a="up">
                <div className="sol-inner">
                    <div className="sol-icon-wrap">
                        <div className="i3 ig" style={{ width: '64px', height: '64px', borderRadius: '18px' }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </div>
                    </div>
                    <h2 className="sol-h2">Is Your Website Visible — Even to AI?</h2>
                    <p className="sol-body">
                        Search isn't just Google anymore. We handle classic SEO alongside the newer AI-search disciplines — AEO, GEO, and LLMO — so your business shows up whether someone types a search query or asks ChatGPT, Gemini, or Perplexity a question.
                    </p>
                    <div className="sol-case">
                        <strong>Real pattern we see often:</strong> a client's website was fully built but never indexed properly — invisible on Google, and completely absent from AI search answers. After a visibility fix, it started appearing in both.
                    </div>
                    <div className="sol-btn-wrap">
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-p">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg>
                            Check My Visibility
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 3 — CUSTOM / DYNAMIC DEVELOPMENT ===== */}
            <section className="sol-block" data-a="up">
                <div className="sol-inner">
                    <div className="sol-icon-wrap">
                        <div className="i3 ip" style={{ width: '64px', height: '64px', borderRadius: '18px' }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                        </div>
                    </div>
                    <h2 className="sol-h2">Need a Custom Page or Feature Built?</h2>
                    <p className="sol-body">
                        Already have a website but need something a template can't do? We build custom, dynamic pages and features on top of existing sites — tokenomics pages, interactive calculators, dashboards, or anything else beyond standard layouts.
                    </p>
                    <div className="sol-btn-wrap">
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-p">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg>
                            Discuss My Feature
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER CTA ===== */}
            <section className="sol-cta-final" data-a="up">
                <div style={{ position: 'absolute', width: '360px', height: '360px', borderRadius: '50%', filter: 'blur(90px)', background: 'rgba(41,121,242,.06)', bottom: '-100px', right: '-80px', pointerEvents: 'none' }}></div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2>Whatever the Problem, Let's Talk First.</h2>
                    <p>No pressure, no obligation — just a real conversation on WhatsApp about what you need and whether we're a fit.</p>
                    <div className="sol-btn-wrap">
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-p">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg>
                            Message Us on WhatsApp
                        </a>
                    </div>
                    <div className="sol-disclaimer">
                        This page isn't part of our main site navigation — you've likely landed here from an ad or a direct link.
                    </div>
                </div>
            </section>
        </>
    );
}