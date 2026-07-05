import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/components/SEO';

// ════════════════════════════════════════════════════════════════
// LOCAL SEO LANDING PAGE — targets "IT company / web developers /
// software house in Sadiqabad" as a single authoritative page rather
// than three thin duplicate pages (avoids keyword cannibalization).
// Optimized for traditional SEO, AEO (Answer Engine Optimization —
// Google featured snippets, voice search), GEO/LLMO (Generative
// Engine Optimization — how ChatGPT, Perplexity, Google AI Overviews
// extract and cite content), and E-E-A-T (Experience, Expertise,
// Authoritativeness, Trust).
//
// Deliberately NOT keyword-stuffed: modern search and AI answer
// engines reward clear, well-structured, factual content and
// penalize repetitive keyword text. Every stat here matches what's
// already published on /about, /founder, and /ceo — consistency
// across pages is itself an E-E-A-T/trust signal.
// ════════════════════════════════════════════════════════════════

export default function TopItCompanySadiqabad() {
    useEffect(() => {
        const existingStyle = document.getElementById('sadiqabad-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'sadiqabad-page-css';
        style.textContent = `
            .sp{padding:72px 0}
            @media(max-width:639px){.sp{padding:48px 0}}
            .divider{height:1px;background:linear-gradient(90deg,transparent,var(--brd),transparent);margin:0}
            .section-lbl{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--blue-lt);background:rgba(41,121,242,.1);border:1px solid rgba(41,121,242,.2);padding:5px 12px;border-radius:999px}

            [data-f]{opacity:0;transition:opacity .6s cubic-bezier(.16,1,.3,1)}
            [data-f].in{opacity:1}
            @media(prefers-reduced-motion:reduce){[data-f]{opacity:1;transition:none}}

            .sad-hero{padding:80px 0 56px;text-align:center}
            @media(max-width:639px){.sad-hero{padding:52px 0 36px}}
            .sad-h1{font-family:var(--disp);font-weight:800;letter-spacing:-.03em;font-size:clamp(28px,5vw,52px);line-height:1.12;color:var(--txt);margin-bottom:16px}
            .sad-h1 span{background:linear-gradient(135deg,var(--blue-lt),var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent}
            .sad-sub{font-size:16px;color:var(--txt2);line-height:1.75;max-width:680px;margin:0 auto 28px}

            .sad-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--brd);border:1px solid var(--brd);border-radius:var(--r-xl);overflow:hidden;max-width:820px;margin:0 auto}
            @media(max-width:639px){.sad-stats{grid-template-columns:1fr 1fr}}
            .sad-stat{background:var(--card-bg);padding:24px 14px;text-align:center}
            .sad-stat-num{font-family:var(--disp);font-weight:800;font-size:clamp(20px,3vw,28px);color:var(--txt);letter-spacing:-.02em}
            .sad-stat-lbl{font-size:10.5px;font-family:var(--mono);color:var(--txt3);text-transform:uppercase;letter-spacing:.07em;margin-top:6px}

            .sad-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
            @media(max-width:900px){.sad-grid-2{grid-template-columns:1fr;gap:28px}}

            .sad-svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
            @media(max-width:767px){.sad-svc-grid{grid-template-columns:1fr}}
            .sad-svc-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px;transition:transform .3s,border-color .3s,box-shadow .3s}
            .sad-svc-card:hover{border-color:var(--brd2);transform:translateY(-3px);box-shadow:0 16px 36px rgba(41,121,242,.08)}
            .sad-svc-ico{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;box-shadow:0 10px 18px -6px var(--sk-shadow,rgba(41,121,242,.45)),inset 0 1px 0 rgba(255,255,255,.35),inset 0 -6px 10px rgba(0,0,0,.18)}
            .sad-svc-title{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt);margin-bottom:6px}
            .sad-svc-desc{font-size:13px;color:var(--txt3);line-height:1.65}

            .sad-why{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:20px 22px}
            .sad-why + .sad-why{margin-top:12px}
            .sad-why-title{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt);margin-bottom:6px;display:flex;align-items:center;gap:8px}
            .sad-why-desc{font-size:13.5px;color:var(--txt2);line-height:1.7}

            .sad-faq{border:1px solid var(--brd);border-radius:var(--r-lg);margin-bottom:10px;background:var(--card-bg);overflow:hidden}
            .sad-faq summary{padding:16px 20px;cursor:pointer;font-weight:600;font-size:14px;color:var(--txt);list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px}
            .sad-faq summary::-webkit-details-marker{display:none}
            .sad-faq summary::after{content:'+';font-size:20px;font-weight:300;color:var(--blue-lt);flex-shrink:0;transition:transform .25s}
            .sad-faq[open] summary::after{transform:rotate(45deg)}
            .sad-faq-a{padding:0 20px 16px;font-size:13.5px;color:var(--txt3);line-height:1.75}

            .sad-addr-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px}
            .sad-addr-row{display:flex;gap:12px;align-items:flex-start;margin-bottom:14px}
            .sad-addr-row:last-child{margin-bottom:0}
            .sad-addr-ico{width:32px;height:32px;border-radius:9px;background:rgba(41,121,242,.12);color:var(--blue-lt);display:flex;align-items:center;justify-content:center;flex-shrink:0}
            .sad-addr-label{font-family:var(--mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.07em;color:var(--txt3);margin-bottom:2px}
            .sad-addr-val{font-size:14px;color:var(--txt);font-weight:500}
        `;
        document.head.appendChild(style);
        return () => { document.getElementById('sadiqabad-page-css')?.remove(); };
    }, []);

    useEffect(() => {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-fd') ? parseFloat(entry.target.getAttribute('data-fd')!) * 0.07 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('[data-f]').forEach(el => revealObs.observe(el));
        return () => revealObs.disconnect();
    }, []);

    const services = [
        { icon: '🌐', title: 'Web Development', desc: 'Custom websites and web applications built with React, Next.js, and Laravel — for businesses in Sadiqabad and clients worldwide.', bg: 'linear-gradient(155deg,#1e63e0,#4f9dff)', shadow: 'rgba(41,121,242,.5)' },
        { icon: '⛓️', title: 'Blockchain & Smart Contract Development', desc: 'Solidity smart contracts and Web3 integrations for businesses looking to build on EVM-compatible blockchains.', bg: 'linear-gradient(155deg,#334155,#64748b)', shadow: 'rgba(51,65,85,.5)' },
        { icon: '🤖', title: 'AI Development', desc: 'AI-powered tools, automation, and machine learning integrations tailored to real business workflows, not just demos.', bg: 'linear-gradient(155deg,#0369a1,#38bdf8)', shadow: 'rgba(3,105,161,.5)' },
        { icon: '🐞', title: 'Bug Fixing & QA', desc: 'Fast, thorough debugging and quality assurance for existing codebases — often the fastest way to unblock a stalled project.', bg: 'linear-gradient(155deg,#be123c,#fb7185)', shadow: 'rgba(190,18,60,.5)' },
    ];

    const faqs = [
        {
            q: 'What is the top IT company in Sadiqabad?',
            a: 'Ayamil Coders is a Sadiqabad-based software house, founded July 21, 2023, offering web development, AI development, blockchain/smart contract development, and bug fixing. The company has delivered 600+ projects for clients across Pakistan and internationally, with an 87% client satisfaction rate.'
        },
        {
            q: 'Does Ayamil Coders only work with local clients in Sadiqabad?',
            a: 'No. Ayamil Coders is based in Sadiqabad, Punjab, and works with clients across Pakistan as well as internationally. The team operates remote-first, so location is not a barrier to working together.'
        },
        {
            q: 'What services does Ayamil Coders offer?',
            a: 'Four core services: web development (React, Next.js, Laravel), blockchain and smart contract development (Solidity, Web3), AI development, and bug fixing/QA for existing applications.'
        },
        {
            q: 'How do I contact a web developer in Sadiqabad from Ayamil Coders?',
            a: 'You can reach Ayamil Coders through the contact form on this site, by email at info@ayamilcoders.com, or by phone/WhatsApp at +92 312 759 2672.'
        },
        {
            q: 'Who founded Ayamil Coders?',
            a: 'Ayamil Coders was founded by Muhammad Muzamil, who started as an independent freelance developer before founding the company on July 21, 2023, in Sadiqabad, Punjab, Pakistan.'
        },
    ];

    const pageUrl = 'https://ayamilcoders.com/top-it-company-sadiqabad';

    const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfessionalService',
                '@id': `${pageUrl}#business`,
                name: 'Ayamil Coders',
                alternateName: 'Ayamil Coders Software House',
                description: 'Sadiqabad-based software house offering web development, AI development, blockchain/smart contract development, and bug fixing for clients in Pakistan and worldwide.',
                url: pageUrl,
                logo: 'https://ayamilcoders.com/logo/ac-512.png',
                foundingDate: '2023-07-21',
                founder: { '@type': 'Person', name: 'Muhammad Muzamil' },
                email: 'info@ayamilcoders.com',
                telephone: '+92-312-759-2672',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Sadiqabad',
                    addressRegion: 'Punjab',
                    addressCountry: 'PK',
                },
                areaServed: [
                    { '@type': 'City', name: 'Sadiqabad' },
                    { '@type': 'City', name: 'Rahim Yar Khan' },
                    { '@type': 'Place', name: 'Worldwide' },
                ],
                knowsAbout: ['Web Development', 'Blockchain Development', 'Smart Contract Development', 'AI Development', 'Bug Fixing', 'Software House Sadiqabad'],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Ayamil Coders Services',
                    itemListElement: services.map(s => ({
                        '@type': 'Offer',
                        itemOffered: { '@type': 'Service', name: s.title },
                    })),
                },
            },
            {
                '@type': 'FAQPage',
                '@id': `${pageUrl}#faq`,
                mainEntity: faqs.map(f => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${pageUrl}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ayamilcoders.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Top IT Company in Sadiqabad', item: pageUrl },
                ],
            },
        ],
    };

    return (
        <>
            <SEO
                title="Top IT Company in Sadiqabad | Web Development, AI & Blockchain — Ayamil Coders"
                description="Ayamil Coders is a Sadiqabad-based software house delivering web development, AI development, blockchain/smart contract development, and bug fixing for clients in Pakistan and worldwide. 600+ projects, 87% client satisfaction."
                keywords="top IT company in Sadiqabad, top web developers in Sadiqabad, top software house in Sadiqabad, web development Sadiqabad, blockchain development Pakistan, AI development company Pakistan, software house Punjab"
                url={pageUrl}
                schema={pageSchema}
            />

            <section className="sad-hero">
                <div data-f>
                    <span className="section-lbl">Sadiqabad, Punjab, Pakistan</span>
                    <h1 className="sad-h1" style={{ marginTop: '14px' }}>
                        The Top IT Company in <span>Sadiqabad</span>
                    </h1>
                    <p className="sad-sub">
                        Ayamil Coders is a Sadiqabad-based software house and web development team building for clients across Pakistan and worldwide — web development, AI development, blockchain and smart contract development, and bug fixing, all under one roof.
                    </p>
                </div>
                <div data-f data-fd="1">
                    <div className="sad-stats">
                        <div className="sad-stat"><div className="sad-stat-num">600+</div><div className="sad-stat-lbl">Projects Delivered</div></div>
                        <div className="sad-stat"><div className="sad-stat-num">87%</div><div className="sad-stat-lbl">Client Satisfaction</div></div>
                        <div className="sad-stat"><div className="sad-stat-num">2023</div><div className="sad-stat-lbl">Founded in Sadiqabad</div></div>
                        <div className="sad-stat"><div className="sad-stat-num">4</div><div className="sad-stat-lbl">Core Services</div></div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            <section className="sp">
                <div className="sad-grid-2">
                    <div data-f>
                        <span className="section-lbl">Why Ayamil Coders</span>
                        <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '-.02em', margin: '10px 0 20px', color: 'var(--txt)' }}>
                            A Software House Built in Sadiqabad, Trusted Beyond It
                        </h2>
                        <div className="sad-why">
                            <div className="sad-why-title">🏢 Locally Based, Globally Delivering</div>
                            <div className="sad-why-desc">Founded July 21, 2023, in Sadiqabad, Punjab. The team works remote-first, which means clients get direct access to developers rather than layers of account management.</div>
                        </div>
                        <div className="sad-why">
                            <div className="sad-why-title">📈 Track Record, Not Just Promises</div>
                            <div className="sad-why-desc">600+ projects delivered with an 87% client satisfaction rate — figures published consistently across our About, Founder, and CEO pages.</div>
                        </div>
                        <div className="sad-why">
                            <div className="sad-why-title">🧩 Four Services, One Team</div>
                            <div className="sad-why-desc">Web development, blockchain/smart contracts, AI development, and bug fixing — most agencies specialize in one; Ayamil Coders covers all four under a single point of contact.</div>
                        </div>
                    </div>

                    <div data-f data-fd="1">
                        <div className="sad-svc-grid">
                            {services.map(s => (
                                <div key={s.title} className="sad-svc-card">
                                    <div className="sad-svc-ico" style={{ background: s.bg, '--sk-shadow': s.shadow } as React.CSSProperties}>{s.icon}</div>
                                    <div className="sad-svc-title">{s.title}</div>
                                    <div className="sad-svc-desc">{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            <section className="sp">
                <div className="sad-grid-2">
                    <div data-f>
                        <span className="section-lbl">Verified Business Details</span>
                        <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(22px,3vw,30px)', letterSpacing: '-.02em', margin: '10px 0 16px', color: 'var(--txt)' }}>
                            Real Address. Real Contact. No Guesswork.
                        </h2>
                        <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.75 }}>
                            Transparency is part of how Ayamil Coders operates — the same contact details and founding information appear consistently across every page of this site.
                        </p>
                    </div>
                    <div data-f data-fd="1" className="sad-addr-card">
                        <div className="sad-addr-row">
                            <div className="sad-addr-ico">📍</div>
                            <div><div className="sad-addr-label">Location</div><div className="sad-addr-val">Sadiqabad, Punjab, Pakistan</div></div>
                        </div>
                        <div className="sad-addr-row">
                            <div className="sad-addr-ico">✉️</div>
                            <div><div className="sad-addr-label">Email</div><div className="sad-addr-val">info@ayamilcoders.com</div></div>
                        </div>
                        <div className="sad-addr-row">
                            <div className="sad-addr-ico">📞</div>
                            <div><div className="sad-addr-label">Phone / WhatsApp</div><div className="sad-addr-val">+92 312 759 2672</div></div>
                        </div>
                        <div className="sad-addr-row">
                            <div className="sad-addr-ico">🗓️</div>
                            <div><div className="sad-addr-label">Founded</div><div className="sad-addr-val">July 21, 2023</div></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '32px' }} data-f>
                    <span className="section-lbl">Frequently Asked</span>
                    <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '-.02em', marginTop: '10px', color: 'var(--txt)' }}>
                        Common Questions
                    </h2>
                </div>
                <div style={{ maxWidth: '720px', margin: '0 auto' }} data-f data-fd="1">
                    {faqs.map((faq, i) => (
                        <details key={i} className="sad-faq">
                            <summary>{faq.q}</summary>
                            <div className="sad-faq-a">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            <section className="sp" style={{ textAlign: 'center' }}>
                <div data-f>
                    <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(26px,4.5vw,44px)', letterSpacing: '-.03em', marginBottom: '14px', color: 'var(--txt)' }}>
                        Work With a Sadiqabad Team That Ships
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '480px', margin: '0 auto 26px', lineHeight: 1.7 }}>
                        Whether you're in Sadiqabad or anywhere else, tell us what you're building.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/contact" className="btn-p" style={{ padding: '14px 32px', fontSize: '15px' }}>Start a Project →</Link>
                        <Link href="/services" className="btn-g" style={{ padding: '14px 32px', fontSize: '15px' }}>See All Services</Link>
                    </div>
                </div>
            </section>
        </>
    );
}