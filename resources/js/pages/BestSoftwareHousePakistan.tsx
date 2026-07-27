import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/components/SEO';

// ════════════════════════════════════════════════════════════════
// NATIONAL SEO / REPUTATION LANDING PAGE — targets "best software
// house in Pakistan" / "top software company Pakistan" as a single
// authoritative page, distinct from /top-it-company-sadiqabad (which
// targets the local Sadiqabad/Rahim Yar Khan search intent).
//
// Unique content angle vs. the Sadiqabad page (avoids keyword
// cannibalization + duplicate-content penalties):
//   1. National city coverage (Lahore/Karachi/Islamabad/etc.) instead
//      of a single-city address focus.
//   2. A software-house vs. freelancer vs. outsourcing-abroad
//      comparison — a content type that doesn't exist elsewhere on
//      the site, aimed at the comparison-shopping intent behind
//      "best software house in Pakistan" searches.
//   3. A distinct FAQ set aimed at national buyer questions (cost,
//      how to choose, local vs. outsourced) rather than local-business
//      verification questions.
//
// Same E-E-A-T discipline as the Sadiqabad page: every stat here
// matches what's already published on /about, /founder, /ceo, and
// /top-it-company-sadiqabad — consistency across pages is itself a
// trust signal for both traditional SEO and AI answer engines
// (AEO/GEO/LLMO).
// ════════════════════════════════════════════════════════════════

export default function BestSoftwareHousePakistan() {
    useEffect(() => {
        const existingStyle = document.getElementById('bshp-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'bshp-page-css';
        style.textContent = `
            .sp{padding:72px 0}
            @media(max-width:639px){.sp{padding:48px 0}}
            .divider{height:1px;background:linear-gradient(90deg,transparent,var(--brd),transparent);margin:0}
            .section-lbl{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--blue-lt);background:rgba(41,121,242,.1);border:1px solid rgba(41,121,242,.2);padding:5px 12px;border-radius:999px}

            [data-f]{opacity:0;transition:opacity .6s cubic-bezier(.16,1,.3,1)}
            [data-f].in{opacity:1}
            @media(prefers-reduced-motion:reduce){[data-f]{opacity:1;transition:none}}

            .bshp-hero{padding:80px 0 56px;text-align:center}
            @media(max-width:639px){.bshp-hero{padding:52px 0 36px}}
            .bshp-h1{font-family:var(--disp);font-weight:800;letter-spacing:-.03em;font-size:clamp(28px,5vw,52px);line-height:1.12;color:var(--txt);margin-bottom:16px}
            .bshp-h1 span{background:linear-gradient(135deg,var(--blue-lt),var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent}
            .bshp-sub{font-size:16px;color:var(--txt2);line-height:1.75;max-width:680px;margin:0 auto 28px}

            .bshp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--brd);border:1px solid var(--brd);border-radius:var(--r-xl);overflow:hidden;max-width:820px;margin:0 auto}
            @media(max-width:639px){.bshp-stats{grid-template-columns:1fr 1fr}}
            .bshp-stat{background:var(--card-bg);padding:24px 14px;text-align:center}
            .bshp-stat-num{font-family:var(--disp);font-weight:800;font-size:clamp(20px,3vw,28px);color:var(--txt);letter-spacing:-.02em}
            .bshp-stat-lbl{font-size:10.5px;font-family:var(--mono);color:var(--txt3);text-transform:uppercase;letter-spacing:.07em;margin-top:6px}

            .bshp-city-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;max-width:900px;margin:0 auto}
            @media(max-width:900px){.bshp-city-grid{grid-template-columns:repeat(3,1fr)}}
            @media(max-width:479px){.bshp-city-grid{grid-template-columns:repeat(2,1fr)}}
            .bshp-city{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:14px 8px;text-align:center;font-size:13px;font-weight:600;color:var(--txt2);transition:all .3s}
            .bshp-city:hover{border-color:var(--brd2);color:var(--txt);transform:translateY(-2px)}

            .bshp-cmp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
            @media(max-width:900px){.bshp-cmp-grid{grid-template-columns:1fr}}
            .bshp-cmp-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px;position:relative}
            .bshp-cmp-card.hl{border-color:rgba(41,121,242,.4);box-shadow:0 0 0 1px rgba(41,121,242,.15),0 20px 44px rgba(41,121,242,.12)}
            .bshp-cmp-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--blue-dk),var(--blue));color:#fff;font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;padding:4px 12px;border-radius:999px;white-space:nowrap}
            .bshp-cmp-title{font-family:var(--disp);font-weight:700;font-size:16px;color:var(--txt);margin-bottom:14px;text-align:center}
            .bshp-cmp-list{list-style:none;padding:0;margin:0}
            .bshp-cmp-list li{font-size:13px;color:var(--txt2);line-height:1.7;padding:6px 0 6px 22px;position:relative}
            .bshp-cmp-list li::before{content:'';position:absolute;left:0;top:13px;width:6px;height:6px;border-radius:50%;background:var(--txt3)}
            .bshp-cmp-card.hl .bshp-cmp-list li::before{background:var(--blue-lt)}

            .bshp-svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
            @media(max-width:767px){.bshp-svc-grid{grid-template-columns:1fr}}
            .bshp-svc-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px;transition:transform .3s,border-color .3s,box-shadow .3s}
            .bshp-svc-card:hover{border-color:var(--brd2);transform:translateY(-3px);box-shadow:0 16px 36px rgba(41,121,242,.08)}
            .bshp-svc-ico{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;box-shadow:0 10px 18px -6px var(--sk-shadow,rgba(41,121,242,.45)),inset 0 1px 0 rgba(255,255,255,.35),inset 0 -6px 10px rgba(0,0,0,.18)}
            .bshp-svc-title{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt);margin-bottom:6px}
            .bshp-svc-desc{font-size:13px;color:var(--txt3);line-height:1.65}

            .bshp-faq{border:1px solid var(--brd);border-radius:var(--r-lg);margin-bottom:10px;background:var(--card-bg);overflow:hidden}
            .bshp-faq summary{padding:16px 20px;cursor:pointer;font-weight:600;font-size:14px;color:var(--txt);list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px}
            .bshp-faq summary::-webkit-details-marker{display:none}
            .bshp-faq summary::after{content:'+';font-size:20px;font-weight:300;color:var(--blue-lt);flex-shrink:0;transition:transform .25s}
            .bshp-faq[open] summary::after{transform:rotate(45deg)}
            .bshp-faq-a{padding:0 20px 16px;font-size:13.5px;color:var(--txt3);line-height:1.75}
        `;
        document.head.appendChild(style);
        return () => { document.getElementById('bshp-page-css')?.remove(); };
    }, []);

    useEffect(() => {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-fd') ? parseFloat(entry.target.getAttribute('data-fd')!) * 0.03 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });
        document.querySelectorAll('[data-f]').forEach(el => revealObs.observe(el));
        return () => revealObs.disconnect();
    }, []);

    const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Sadiqabad', 'Rahim Yar Khan', 'Sialkot', 'Peshawar', 'Quetta', 'Worldwide (Remote)'];

    const services = [
        { icon: '🌐', title: 'Web Development', desc: 'Custom websites and web applications built with React, Next.js, and Laravel — for businesses anywhere in Pakistan and internationally.', bg: 'linear-gradient(155deg,#1e63e0,#4f9dff)', shadow: 'rgba(41,121,242,.5)' },
        { icon: '⛓️', title: 'Blockchain & Smart Contract Development', desc: 'Solidity smart contracts and Web3 integrations for businesses building on EVM-compatible blockchains.', bg: 'linear-gradient(155deg,#334155,#64748b)', shadow: 'rgba(51,65,85,.5)' },
        { icon: '🤖', title: 'AI Development', desc: 'AI-powered tools, automation, and machine learning integrations tailored to real business workflows.', bg: 'linear-gradient(155deg,#0369a1,#38bdf8)', shadow: 'rgba(3,105,161,.5)' },
        { icon: '🐞', title: 'Bug Fixing & QA', desc: 'Fast, thorough debugging and quality assurance for existing codebases — often the fastest way to unblock a stalled project.', bg: 'linear-gradient(155deg,#be123c,#fb7185)', shadow: 'rgba(190,18,60,.5)' },
    ];

    const faqs = [
        {
            q: 'Who is the best software house in Pakistan?',
            a: 'There is no single official ranking, but Ayamil Coders is a Pakistan-based software house with a track record of 600+ delivered projects and an 87% client satisfaction rate, offering web development, AI development, blockchain/smart contract development, and bug fixing for clients across Pakistan and worldwide.'
        },
        {
            q: 'Should I hire a Pakistani software house or outsource to an international agency?',
            a: 'It depends on priorities. A Pakistan-based team like Ayamil Coders typically offers lower fixed costs than Western agencies, closer time-zone overlap for South Asian and Gulf clients, and direct access to the people building the project rather than layers of account management — trade-offs worth weighing against an agency\'s specific portfolio and scale.'
        },
        {
            q: 'How much does web development cost in Pakistan?',
            a: 'Costs vary by project scope, but Ayamil Coders provides fixed quotes agreed upfront before work starts, so clients know the full cost before committing — avoiding the scope-creep pricing common with hourly billing.'
        },
        {
            q: 'Does Ayamil Coders only serve clients in Sadiqabad?',
            a: 'No. Ayamil Coders is headquartered in Sadiqabad, Punjab, but operates remote-first and serves clients across major Pakistani cities including Lahore, Karachi, and Islamabad, as well as international clients worldwide.'
        },
        {
            q: 'How do I choose the right software house in Pakistan for my project?',
            a: 'Look for a verifiable track record (project count, years operating), a fixed and transparent pricing model, direct communication with the actual development team, and post-launch support commitments — all of which Ayamil Coders publishes openly rather than leaving to a sales call.'
        },
    ];

    const pageUrl = 'https://ayamilcoders.com/best-software-house-pakistan';

    const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfessionalService',
                '@id': `${pageUrl}#business`,
                name: 'Ayamil Coders',
                alternateName: 'Ayamil Coders Software House',
                description: 'Pakistan-based software house offering web development, AI development, blockchain/smart contract development, and bug fixing for clients across Pakistan and worldwide.',
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
                    { '@type': 'Country', name: 'Pakistan' },
                    { '@type': 'City', name: 'Lahore' },
                    { '@type': 'City', name: 'Karachi' },
                    { '@type': 'City', name: 'Islamabad' },
                    { '@type': 'Place', name: 'Worldwide' },
                ],
                knowsAbout: ['Web Development', 'Blockchain Development', 'Smart Contract Development', 'AI Development', 'Bug Fixing', 'Best Software House in Pakistan'],
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
                    { '@type': 'ListItem', position: 2, name: 'Best Software House in Pakistan', item: pageUrl },
                ],
            },
        ],
    };

    return (
        <>
            <SEO
                title="Best Software House in Pakistan | Web, AI & Blockchain Development — Ayamil Coders"
                description="Ayamil Coders is a Pakistan-based software house delivering web development, AI development, blockchain/smart contract development, and bug fixing for clients across Lahore, Karachi, Islamabad, and worldwide. 600+ projects, 87% client satisfaction."
                keywords="best software house in Pakistan, top software company Pakistan, best web development company Pakistan, software house Lahore, software house Karachi, software house Islamabad, blockchain development Pakistan, AI development company Pakistan"
                url={pageUrl}
                schema={pageSchema}
            />

            <section className="bshp-hero">
                <div data-f>
                    <span className="section-lbl">Pakistan · Nationwide & Worldwide</span>
                    <h1 className="bshp-h1" style={{ marginTop: '14px' }}>
                        A <span>Best Software House</span> Serving All of Pakistan
                    </h1>
                    <p className="bshp-sub">
                        Ayamil Coders is a Pakistan-based software house building for clients across the country and internationally — web development, AI development, blockchain and smart contract development, and bug fixing, all under one team.
                    </p>
                </div>
                <div data-f data-fd="1">
                    <div className="bshp-stats">
                        <div className="bshp-stat"><div className="bshp-stat-num">600+</div><div className="bshp-stat-lbl">Projects Delivered</div></div>
                        <div className="bshp-stat"><div className="bshp-stat-num">87%</div><div className="bshp-stat-lbl">Client Satisfaction</div></div>
                        <div className="bshp-stat"><div className="bshp-stat-num">2023</div><div className="bshp-stat-lbl">Founded</div></div>
                        <div className="bshp-stat"><div className="bshp-stat-num">4</div><div className="bshp-stat-lbl">Core Services</div></div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== NATIONAL CITY COVERAGE (unique vs. Sadiqabad page) ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '32px' }} data-f>
                    <span className="section-lbl">Nationwide Reach</span>
                    <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '-.02em', marginTop: '10px', color: 'var(--txt)' }}>
                        Cities We Serve Across Pakistan
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.75 }}>
                        Headquartered in Sadiqabad, Punjab, and operating remote-first — so location is never a barrier to working together.
                    </p>
                </div>
                <div data-f data-fd="1" className="bshp-city-grid">
                    {cities.map(city => (
                        <div key={city} className="bshp-city">{city}</div>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== SOFTWARE HOUSE VS FREELANCER VS OUTSOURCING (unique content type) ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '32px' }} data-f>
                    <span className="section-lbl">Choosing a Partner</span>
                    <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '-.02em', marginTop: '10px', color: 'var(--txt)' }}>
                        Software House vs. Freelancer vs. Outsourcing Abroad
                    </h2>
                </div>
                <div data-f data-fd="1" className="bshp-cmp-grid">
                    <div className="bshp-cmp-card">
                        <div className="bshp-cmp-title">Independent Freelancer</div>
                        <ul className="bshp-cmp-list">
                            <li>Often lower cost per hour</li>
                            <li>Single point of failure — no backup if unavailable</li>
                            <li>Limited range of skills (usually one specialty)</li>
                            <li>Informal contracts, variable reliability</li>
                        </ul>
                    </div>
                    <div className="bshp-cmp-card hl">
                        <div className="bshp-cmp-badge">Ayamil Coders</div>
                        <div className="bshp-cmp-title">Pakistan-Based Software House</div>
                        <ul className="bshp-cmp-list">
                            <li>Fixed, upfront quotes — no hidden costs</li>
                            <li>Full-stack team: web, blockchain, AI, bug fixing</li>
                            <li>Direct access to the actual developers, no account-manager layer</li>
                            <li>3 months free post-launch maintenance and support</li>
                            <li>Time-zone aligned for South Asian &amp; Gulf clients</li>
                        </ul>
                    </div>
                    <div className="bshp-cmp-card">
                        <div className="bshp-cmp-title">Outsourcing to a Western Agency</div>
                        <ul className="bshp-cmp-list">
                            <li>Significantly higher rates</li>
                            <li>Time-zone gaps can slow communication</li>
                            <li>Often layered through account managers</li>
                            <li>May not include free post-launch support</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '32px' }} data-f>
                    <span className="section-lbl">What We Do</span>
                    <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '-.02em', marginTop: '10px', color: 'var(--txt)' }}>
                        Four Services, One Team
                    </h2>
                </div>
                <div data-f data-fd="1" className="bshp-svc-grid">
                    {services.map(s => (
                        <div key={s.title} className="bshp-svc-card">
                            <div className="bshp-svc-ico" style={{ background: s.bg, '--sk-shadow': s.shadow } as React.CSSProperties}>{s.icon}</div>
                            <div className="bshp-svc-title">{s.title}</div>
                            <div className="bshp-svc-desc">{s.desc}</div>
                        </div>
                    ))}
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
                        <details key={i} className="bshp-faq">
                            <summary>{faq.q}</summary>
                            <div className="bshp-faq-a">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            <section className="sp" style={{ textAlign: 'center' }}>
                <div data-f>
                    <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(26px,4.5vw,44px)', letterSpacing: '-.03em', marginBottom: '14px', color: 'var(--txt)' }}>
                        Work With a Team That Ships, Anywhere in Pakistan
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '480px', margin: '0 auto 26px', lineHeight: 1.7 }}>
                        Wherever you're based — Lahore, Karachi, Islamabad, or beyond — tell us what you're building.
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