import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function Ceo() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('ceo-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'ceo-page-css';
        style.textContent = `
            .sp{padding:80px 0}
            @media(max-width:639px){.sp{padding:52px 0}}
            .section-lbl{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--blue-lt);background:rgba(41,121,242,.1);border:1px solid rgba(41,121,242,.2);padding:5px 12px;border-radius:999px}
            .shimmer-txt{background:linear-gradient(135deg,#a78bfa,#7c3aed,#a78bfa);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}
            @keyframes shimmer{to{background-position:200% center}}
            @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
            @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
            .divider{height:1px;background:linear-gradient(90deg,transparent,var(--brd),transparent);margin:0}

            .hidden-section{position:relative;overflow:hidden;border-radius:var(--r-xl);border:1px solid rgba(139,92,246,.25);background:linear-gradient(135deg,rgba(45,27,105,.35),rgba(91,33,182,.15),rgba(15,10,30,.4));padding:52px 60px}
            @media(max-width:1023px){.hidden-section{padding:36px 32px}}
            @media(max-width:639px){.hidden-section{padding:28px 20px}}
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
            .hidden-fact-d{font-size:12px;color:var(--txt2);line-height:1.6}

            .val-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:28px;transition:all .35s}
            .val-card:hover{border-color:var(--brd2);transform:translateY(-4px);box-shadow:0 14px 44px rgba(41,121,242,.1)}
            .ceo-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
            @media(max-width:900px){.ceo-grid3{grid-template-columns:1fr}}
        `;
        document.head.appendChild(style);
        return () => { document.getElementById('ceo-page-css')?.remove(); };
    }, []);

    const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfilePage',
                '@id': 'https://ayamilcoders.com/ceo#webpage',
                name: 'The Hidden Partner — CEO of Ayamil Coders',
                description:
                    "An introduction to the Hidden Partner, the CEO of Ayamil Coders — a real, active leader whose identity is intentionally kept private by company policy.",
                url: 'https://ayamilcoders.com/ceo',
                isPartOf: { '@type': 'WebSite', name: 'Ayamil Coders', url: 'https://ayamilcoders.com' },
                mainEntity: { '@id': 'https://ayamilcoders.com/ceo#person' },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ayamilcoders.com' },
                    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://ayamilcoders.com/about' },
                    { '@type': 'ListItem', position: 3, name: 'Our CEO', item: 'https://ayamilcoders.com/ceo' },
                ],
            },
            {
                '@type': 'Person',
                '@id': 'https://ayamilcoders.com/ceo#person',
                name: 'Hidden Partner',
                jobTitle: 'Chief Executive Officer',
                description:
                    "The CEO of Ayamil Coders, publicly known as the Hidden Partner. A real, active co-strategist behind the company's direction since its founding on July 21, 2023. Their identity is intentionally kept private by company policy and may be disclosed publicly in the future.",
                worksFor: { '@id': 'https://ayamilcoders.com/#organization' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Who is the Hidden Partner?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: "The Hidden Partner is the CEO of Ayamil Coders — a real, active person who has shaped the company's strategy and direction since its founding on July 21, 2023. Their identity is intentionally kept private by company policy.",
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Why does Ayamil Coders keep its CEO\'s identity private?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: "It's a deliberate choice, not a sign of absence. The Hidden Partner prefers to let the company's work speak for itself rather than a public personal profile. Ayamil Coders respects this choice and may revisit it in the future.",
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Is the Hidden Partner a real person?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes. The Hidden Partner is a real, active CEO involved in strategic decisions at Ayamil Coders — not a placeholder, marketing device, or absent title.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Why is the company called "Ayamil Coders"?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: '"Ayamil" is a linguistic fusion of Founder Muhammad Muzamil\'s name and the Hidden Partner\'s private name — the company name itself honors both leaders equally.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Will the Hidden Partner\'s identity ever be made public?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Possibly, in the future. As of now, Ayamil Coders has chosen to keep this information private, and there is no set timeline for changing that.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <>
            <SEO
                title="Our CEO — The Hidden Partner | Ayamil Coders"
                description="Meet the Hidden Partner, CEO of Ayamil Coders. A real, active leader whose identity is intentionally kept private by company policy — learn what that means and why."
                keywords="Ayamil Coders CEO, who is the CEO of Ayamil Coders, Hidden Partner, Ayamil Coders leadership, anonymous CEO software house"
                url="https://ayamilcoders.com/ceo"
                schema={pageSchema}
            />

            {/* ===== HERO ===== */}
            <section className="sp" style={{ paddingTop: '60px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl">Leadership</span>
                    <h1 style={{ fontSize: 'clamp(30px,5vw,54px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', marginTop: '12px' }}>
                        Meet Our <span className="shimmer-txt">CEO</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }} data-speakable="summary">
                        Ayamil Coders has a real, active CEO — publicly known as the <strong style={{ color: 'var(--txt)' }}>Hidden Partner</strong>. Their identity is intentionally kept private by company policy. This page exists to explain what that means, honestly.
                    </p>
                </div>

                <div className="hidden-section" data-a="scale">
                    <div className="hidden-grid">
                        <div className="hidden-avatar">🌙</div>
                        <div>
                            <div className="hidden-name-pill">
                                <span className="hidden-dot"></span>
                                Hidden Partner — Chief Executive Officer
                            </div>
                            <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.025em', color: 'var(--txt)', marginBottom: '12px', lineHeight: 1.2 }}>
                                The Silent Strategist.<br />
                                <span style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The CEO in the Shadows.</span>
                            </h2>
                            <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.8, marginBottom: '20px', maxWidth: '560px' }}>
                                The Hidden Partner is the core inspiration and silent strategist behind Ayamil Coders. While Founder Muhammad Muzamil leads publicly, the Hidden Partner provides the underlying stability, vision, and strategic guidance that has shaped the company's direction since day one. Their identity is intentionally kept confidential, and Ayamil Coders will always respect that choice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== DEFINITION ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '36px' }} data-a="blur">
                    <span className="section-lbl">Definition</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        What Does <span className="shimmer-txt">"Hidden Partner"</span> Mean?
                    </h2>
                </div>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <p style={{ fontSize: '14.5px', color: 'var(--txt2)', lineHeight: 1.85, marginBottom: '16px' }}>
                        "Hidden Partner" is not a placeholder, a marketing gimmick, or a way of saying "no one is really in charge." It's the public name Ayamil Coders uses for a specific, real role: our <strong style={{ color: 'var(--txt)' }}>Chief Executive Officer</strong>, whose legal name and personal details the company has chosen not to publish.
                    </p>
                    <p style={{ fontSize: '14.5px', color: 'var(--txt2)', lineHeight: 1.85, marginBottom: '16px' }}>
                        Concretely, that means: there is one person holding the CEO title at Ayamil Coders. That person is involved in real strategic decisions — direction, priorities, major calls. What's different from most companies is simply that we don't publish their name, photo, or biography. Everything else about the role is exactly what you'd expect from any CEO.
                    </p>
                    <p style={{ fontSize: '14.5px', color: 'var(--txt2)', lineHeight: 1.85 }}>
                        We're telling you this directly, on its own page, because we think vague hand-waving about leadership erodes trust — and a clearly stated, honest boundary doesn't.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== THREE FACTS ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '36px' }} data-a="blur">
                    <span className="section-lbl">Three Things Worth Knowing</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        The Story <span className="shimmer-txt">Behind the Name</span>
                    </h2>
                </div>
                <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="hidden-fact" data-a="up" data-d="1">
                        <div className="hidden-fact-icon">✨</div>
                        <div>
                            <div className="hidden-fact-t">The Name "Ayamil" Is a Tribute</div>
                            <div className="hidden-fact-d">
                                "Ayamil" is a linguistic fusion — combining the name of Founder <strong style={{ color: 'var(--txt)' }}>Muhammad Muzamil</strong> with the private name of the Hidden Partner. Every time our company name is spoken, it honours both of them equally.
                            </div>
                        </div>
                    </div>
                    <div className="hidden-fact" data-a="up" data-d="2">
                        <div className="hidden-fact-icon">🎂</div>
                        <div>
                            <div className="hidden-fact-t">July 21 — A Birthday Gift</div>
                            <div className="hidden-fact-d">
                                The company was officially launched on <strong style={{ color: 'var(--txt)' }}>July 21, 2023</strong> — a date chosen deliberately as a birthday tribute to the Hidden Partner. The founding of Ayamil Coders itself was a gift.
                            </div>
                        </div>
                    </div>
                    <div className="hidden-fact" data-a="up" data-d="3">
                        <div className="hidden-fact-icon">🛡️</div>
                        <div>
                            <div className="hidden-fact-t">Identity Kept Private — By Design</div>
                            <div className="hidden-fact-d">
                                The Hidden Partner's real-world identity is intentionally withheld from the public. Ayamil Coders will always respect this choice. Their influence speaks through the company's work — not through a name on a page.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== WHY WE DO THIS ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '36px' }} data-a="blur">
                    <span className="section-lbl">Our Reasoning</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        Why We Keep This <span className="shimmer-txt">Private</span>
                    </h2>
                </div>
                <div className="ceo-grid3">
                    <div className="val-card" data-a="scale" data-d="1">
                        <div style={{ fontSize: '26px', marginBottom: '12px' }}>🤝</div>
                        <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--txt)' }}>Personal Choice, Respected</h3>
                        <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7 }}>The Hidden Partner asked for privacy. That's a reasonable, ordinary request from a real person, and Ayamil Coders honors it the same way we'd honor any teammate's boundary.</p>
                    </div>
                    <div className="val-card" data-a="scale" data-d="2">
                        <div style={{ fontSize: '26px', marginBottom: '12px' }}>🏗️</div>
                        <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--txt)' }}>Work Over Persona</h3>
                        <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7 }}>We'd rather you judge Ayamil Coders by the 600+ projects we've delivered than by a founder's personal brand. The output is the evidence.</p>
                    </div>
                    <div className="val-card" data-a="scale" data-d="3">
                        <div style={{ fontSize: '26px', marginBottom: '12px' }}>🔓</div>
                        <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--txt)' }}>Not Permanent, Not Hidden From You</h3>
                        <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7 }}>We're not pretending this role doesn't exist — this whole page is proof of the opposite. The door to disclosing more in the future stays open.</p>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== FAQ ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '36px' }} data-a="blur">
                    <span className="section-lbl">Quick Answers</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        CEO <span className="shimmer-txt">FAQ</span>
                    </h2>
                </div>
                <div style={{ display: 'grid', gap: '14px', maxWidth: '760px', margin: '0 auto' }}>
                    {[
                        { q: 'Who is the Hidden Partner?', a: "The Hidden Partner is the CEO of Ayamil Coders — a real, active person who has shaped the company's strategy and direction since its founding on July 21, 2023. Their identity is intentionally kept private by company policy." },
                        { q: "Why does Ayamil Coders keep its CEO's identity private?", a: "It's a deliberate choice, not a sign of absence. The Hidden Partner prefers to let the company's work speak for itself rather than a public personal profile. Ayamil Coders respects this choice and may revisit it in the future." },
                        { q: 'Is the Hidden Partner a real person?', a: 'Yes. The Hidden Partner is a real, active CEO involved in strategic decisions at Ayamil Coders — not a placeholder, marketing device, or absent title.' },
                        { q: 'Why is the company called "Ayamil Coders"?', a: '"Ayamil" is a linguistic fusion of Founder Muhammad Muzamil\'s name and the Hidden Partner\'s private name — the company name itself honors both leaders equally.' },
                        { q: "Will the Hidden Partner's identity ever be made public?", a: 'Possibly, in the future. As of now, Ayamil Coders has chosen to keep this information private, and there is no set timeline for changing that.' },
                    ].map((item, i) => (
                        <details key={i} className="val-card" data-a="up" data-d={(i % 3) + 1} style={{ cursor: 'pointer' }}>
                            <summary style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)', listStyle: 'none' }}>
                                {item.q}
                            </summary>
                            <p style={{ fontSize: '13.5px', color: 'var(--txt2)', lineHeight: 1.75, marginTop: '10px' }}>{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== CTA ===== */}
            <section className="sp" style={{ textAlign: 'center' }}>
                <div data-a="scale">
                    <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '18px' }}>Keep Exploring</span>
                    <h2 style={{ fontSize: 'clamp(28px,5vw,54px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '16px' }}>
                        Want the Full <br /><span className="shimmer-txt">Ayamil Coders Story?</span>
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.7 }}>
                        Meet the rest of the team, see our timeline since 2023, and learn how we work.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/about" className="btn-p" style={{ padding: '14px 32px', fontSize: '15px' }}>Back to About →</a>
                        <a href="/contact" className="btn-g" style={{ padding: '14px 32px', fontSize: '15px' }}>Start a Project</a>
                    </div>
                </div>
            </section>
        </>
    );
}