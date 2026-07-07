import { useEffect } from 'react';
import SEO from '@/components/SEO';

// ════════════════════════════════════════════════════════════════
// FOUNDER PAGE — intentionally NOT linked from the navbar, footer,
// or the mobile "Legal & Policies" sheet. It only exists at /founder
// for whoever has the direct link. Do not add nav/footer entries
// for this page without being asked.
// ════════════════════════════════════════════════════════════════

export default function Founder() {
    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('founder-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'founder-page-css';
        style.textContent = `
            .sp{padding:80px 0}
            @media(max-width:639px){.sp{padding:52px 0}}
            .divider{height:1px;background:linear-gradient(90deg,transparent,var(--brd),transparent);margin:0}
            .section-lbl{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--blue-lt);background:rgba(41,121,242,.1);border:1px solid rgba(41,121,242,.2);padding:5px 12px;border-radius:999px}

            /* ── Apple-style reveal: fade + blur + gentle rise ──
               Softer & slower than a typical "slide up" — closer to how
               apple.com reveals sections: a light blur-out and a small
               vertical drift, eased with an expo-style curve. */
            [data-f]{
                opacity:0;
                transition:opacity .7s cubic-bezier(.16,1,.3,1);
            }
            [data-f].in{opacity:1}
            @media(prefers-reduced-motion:reduce){
                [data-f]{opacity:1;transition:none}
            }

            /* ── Hero ── */
            .fnd-hero{padding:96px 0 64px;text-align:center;position:relative;overflow:hidden}
            @media(max-width:639px){.fnd-hero{padding:64px 0 44px}}
            .fnd-blob{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0}
            .fnd-avatar{
                width:132px;height:132px;border-radius:50%;margin:0 auto 28px;
                display:flex;align-items:center;justify-content:center;
                font-family:var(--disp);font-weight:800;font-size:44px;color:#fff;
                background:linear-gradient(155deg,#1e63e0,#4f9dff);
                box-shadow:0 0 0 1px rgba(255,255,255,.08),
                           0 24px 60px -14px rgba(41,121,242,.55),
                           inset 0 1px 0 rgba(255,255,255,.3),
                           inset 0 -10px 18px rgba(0,0,0,.15);
                position:relative;z-index:1;
                animation:fnd-float 7s ease-in-out infinite;
            }
            @keyframes fnd-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
            @media(prefers-reduced-motion:reduce){.fnd-avatar{animation:none}}
            .fnd-name{
                font-family:var(--disp);font-weight:800;letter-spacing:-.03em;
                font-size:clamp(34px,6vw,64px);line-height:1.05;color:var(--txt);
                position:relative;z-index:1;margin-bottom:10px;
            }
            .fnd-role{
                font-family:var(--mono);font-size:13px;letter-spacing:.06em;
                color:var(--blue-lt);position:relative;z-index:1;margin-bottom:22px;
            }
            .fnd-tagline{
                font-size:16px;color:var(--txt2);line-height:1.75;max-width:600px;
                margin:0 auto;position:relative;z-index:1;
            }

            /* ── Bio ── */
            .fnd-bio{max-width:680px;margin:0 auto}
            .fnd-bio p{font-size:15px;color:var(--txt2);line-height:1.9;margin-bottom:18px}
            .fnd-bio p:last-child{margin-bottom:0}
            .fnd-bio strong{color:var(--txt);font-weight:600}

            /* ── Stat strip ── */
            .fnd-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--brd);border:1px solid var(--brd);border-radius:var(--r-xl);overflow:hidden;max-width:820px;margin:0 auto}
            @media(max-width:639px){.fnd-stats{grid-template-columns:1fr 1fr}}
            .fnd-stat{background:var(--card-bg);padding:26px 16px;text-align:center;transition:background .3s}
            .fnd-stat:hover{background:var(--card-hov)}
            .fnd-stat-num{font-family:var(--disp);font-weight:800;font-size:clamp(22px,3vw,32px);color:var(--txt);letter-spacing:-.02em}
            .fnd-stat-lbl{font-size:11px;font-family:var(--mono);color:var(--txt3);text-transform:uppercase;letter-spacing:.08em;margin-top:6px}

            /* ── Timeline (minimal, Apple-ish vertical rail) ── */
            .fnd-timeline{max-width:640px;margin:0 auto;position:relative}
            .fnd-timeline::before{
                content:'';position:absolute;left:7px;top:6px;bottom:6px;width:1px;
                background:linear-gradient(var(--brd2),var(--brd) 85%,transparent);
            }
            .fnd-tl-item{position:relative;padding-left:34px;margin-bottom:34px}
            .fnd-tl-item:last-child{margin-bottom:0}
            .fnd-tl-dot{position:absolute;left:0;top:4px;width:15px;height:15px;border-radius:50%;background:var(--bg);border:2px solid var(--blue);box-shadow:0 0 0 4px rgba(41,121,242,.12)}
            .fnd-tl-year{font-family:var(--mono);font-size:11px;color:var(--blue-lt);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
            .fnd-tl-title{font-family:var(--disp);font-weight:700;font-size:16px;color:var(--txt);margin-bottom:6px}
            .fnd-tl-desc{font-size:13.5px;color:var(--txt2);line-height:1.75}

            /* ── Skill / craft grid — same glossy 3D icon language as
               the Services page, for visual cohesion across the site ── */
            .fnd-skill-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;perspective:800px}
            @media(max-width:900px){.fnd-skill-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:480px){.fnd-skill-grid{grid-template-columns:1fr}}
            .fnd-skill-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px;transition:transform .4s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .4s}
            .fnd-skill-card:hover{border-color:var(--brd2);transform:translateY(-4px) rotateX(3deg);box-shadow:0 20px 40px rgba(0,0,0,.16)}
            .fnd-skill-ico{
                width:48px;height:48px;border-radius:14px;margin-bottom:14px;
                display:flex;align-items:center;justify-content:center;font-size:22px;position:relative;
                box-shadow:0 10px 18px -6px var(--sk-shadow,rgba(41,121,242,.45)),
                           inset 0 1px 0 rgba(255,255,255,.35),
                           inset 0 -6px 10px rgba(0,0,0,.18);
            }
            .fnd-skill-ico::after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.25),transparent 55%);pointer-events:none}
            .fnd-skill-title{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt);margin-bottom:6px}
            .fnd-skill-desc{font-size:13px;color:var(--txt3);line-height:1.65}

            /* ── Quote ── */
            .fnd-quote{max-width:700px;margin:0 auto;text-align:center;position:relative}
            .fnd-quote-mark{font-family:var(--disp);font-size:64px;line-height:1;color:rgba(41,121,242,.25);margin-bottom:4px}
            .fnd-quote-text{font-family:var(--disp);font-weight:600;font-size:clamp(19px,2.6vw,26px);line-height:1.55;color:var(--txt);letter-spacing:-.01em}
            .fnd-quote-attr{margin-top:18px;font-size:13px;color:var(--txt3);font-family:var(--mono)}

            /* ── Values ── */
            .fnd-val-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
            @media(max-width:900px){.fnd-val-grid{grid-template-columns:1fr}}
            .fnd-val-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:26px;transition:transform .4s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .4s}
            .fnd-val-card:hover{border-color:var(--brd2);transform:translateY(-3px);box-shadow:0 16px 40px rgba(41,121,242,.08)}

            /* ── CTA buttons: soft spring press ── */
            .fnd-cta-btn{transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease}
            .fnd-cta-btn:active{transform:scale(.96)}
        `;
        document.head.appendChild(style);
        return () => { document.getElementById('founder-page-css')?.remove(); };
    }, []);

    // ===== SCROLL REVEAL (reveal-once, so nothing can re-hide after
    // a later layout shift — see Services page for why this matters) =====
    useEffect(() => {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-fd') ? parseFloat(entry.target.getAttribute('data-fd')!) * 0.08 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        document.querySelectorAll('[data-f]').forEach(el => revealObs.observe(el));
        return () => revealObs.disconnect();
    }, []);

    const timeline = [
        { year: '2016', title: 'Started teaching himself to code, age 11', desc: 'No coding bootcamp, no institute, no mentor nearby in Sadiqabad — just an internet connection and HTML/CSS documentation worked through line by line.' },
        { year: 'Matric Years', title: 'First real clients, while still in school', desc: 'Took on paid international client work through direct professional contacts — years before most developers finish their education.' },
        { year: 'Jul 21, 2023', title: 'Founded Ayamil Coders', desc: 'Officially launched Ayamil Coders in Sadiqabad, Punjab, Pakistan — a date chosen as a birthday tribute to the company\'s Hidden Partner.' },
        { year: '2025 — Today', title: '600+ projects, 50+ international clients', desc: 'A 72% repeat-client rate across web development, cybersecurity, and blockchain work delivered from Sadiqabad to clients worldwide.' },
        { year: 'What\'s Next', title: 'Pakistan\'s first blockchain platform, from Sadiqabad', desc: 'Growing into a full agency team and building toward international recognition — without moving out of the city where it all started.' },
    ];

    const skills = [
        { icon: '💻', title: 'Web Development', desc: 'Laravel, Core PHP, HTML5, CSS3, Bootstrap 5, Tailwind CSS, and MySQL — business sites, e-commerce, web apps, and custom admin panels.', bg: 'linear-gradient(155deg,#1e63e0,#4f9dff)', shadow: 'rgba(41,121,242,.5)' },
        { icon: '🛡️', title: 'Cybersecurity', desc: 'Security audits, hardening, SSL setup, and DDoS protection — 2,000+ compromised websites secured and recovered.', bg: 'linear-gradient(155deg,#7c2d12,#dc2626)', shadow: 'rgba(220,38,38,.5)' },
        { icon: '⛓️', title: 'Blockchain & Web3', desc: 'Smart contracts, DApp interfaces, crypto project websites, and token presale pages across EVM-compatible chains.', bg: 'linear-gradient(155deg,#334155,#64748b)', shadow: 'rgba(51,65,85,.5)' },
    ];

    const values = [
        { icon: '🔒', title: 'Security First', desc: 'Every website, application, and API is secured from the ground up — not patched after the fact.' },
        { icon: '⚡', title: 'Performance Always', desc: 'Every project targets a 90+ Google PageSpeed score. Slow, unoptimized code is not an acceptable trade-off.' },
        { icon: '✅', title: 'Quality Without Compromise', desc: 'A small business in Sadiqabad and an enterprise in the UK get held to the exact same standard.' },
    ];

    const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfilePage',
                '@id': 'https://ayamilcoders.com/founder#webpage',
                name: 'Muhammad Muzamil — Founder of Ayamil Coders',
                description: 'The self-taught programmer from Sadiqabad who founded Ayamil Coders — from teaching himself HTML/CSS at age 11 to leading 600+ delivered projects worldwide.',
                url: 'https://ayamilcoders.com/founder',
                isPartOf: { '@type': 'WebSite', name: 'Ayamil Coders', url: 'https://ayamilcoders.com' },
                mainEntity: { '@id': 'https://ayamilcoders.com/founder#person' },
            },
            {
                '@type': 'Person',
                '@id': 'https://ayamilcoders.com/founder#person',
                name: 'Muhammad Muzamil',
                birthDate: '2005-10-21',
                birthPlace: 'Sadiqabad, Rahim Yar Khan, Punjab, Pakistan',
                jobTitle: 'Founder & Lead Programmer',
                description: 'Self-taught programmer and founder of Ayamil Coders. Holds a Matric certificate; taught himself web development starting at age 11 with no coding institute or formal mentor.',
                worksFor: { '@id': 'https://ayamilcoders.com/#organization' },
                url: 'https://ayamilcoders.com/founder',
                knowsAbout: ['Web Development', 'Laravel', 'PHP', 'Cybersecurity', 'Blockchain Development', 'Smart Contracts'],
            },
        ],
    };

    return (
        <>
            <SEO
                title="Muhammad Muzamil — The Self-Taught Programmer Who Built Ayamil Coders"
                description="Muhammad Muzamil taught himself to code at age 11 in Sadiqabad with no institute, no mentor, and only a Matric certificate — now founder of Ayamil Coders, with 600+ projects delivered worldwide."
                keywords="Muhammad Muzamil, Ayamil Coders founder, self-taught programmer Pakistan, Sadiqabad developer, software house founder Pakistan"
                url="https://ayamilcoders.com/founder"
                schema={pageSchema}
            />

            {/* ===== HERO ===== */}
            <section className="fnd-hero">
                <div className="fnd-blob" style={{ width: '480px', height: '480px', background: 'radial-gradient(circle,rgba(41,121,242,.10),transparent 70%)', top: '-160px', left: '50%', transform: 'translateX(-50%)' }}></div>
                <div className="fnd-avatar" data-f>MM</div>
                <div className="fnd-name" data-f data-fd="1">Muhammad Muzamil</div>
                <div className="fnd-role" data-f data-fd="2">FOUNDER & LEAD PROGRAMMER · AYAMIL CODERS</div>
                <p className="fnd-tagline" data-f data-fd="3">
                    Taught himself to code at age 11 in Sadiqabad — no institute, no mentor, no coding teacher. Now, at 20, he leads Ayamil Coders through 600+ delivered projects across web development, cybersecurity, and blockchain.
                </p>
            </section>

            <div className="divider"></div>

            {/* ===== BIO ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-f>
                    <span className="section-lbl">The Story</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px', color: 'var(--txt)' }}>
                        From Freelancer <br />to Founder
                    </h2>
                </div>
                <div className="fnd-bio" data-f data-fd="1">
                    <p>
                        Born on <strong>October 21, 2005</strong>, in Sadiqabad, Rahim Yar Khan, Punjab, <strong>Muhammad Muzamil</strong> holds only a Matric certificate. No coding institute. No programming teacher. No bootcamp. In 2016, around age 11, he started teaching himself HTML and CSS with nothing but an internet connection and a stubborn need to understand how websites actually worked.
                    </p>
                    <p>
                        He didn't wait to finish school before working with real clients. While still sitting for his Matric exams, he was already taking on paid international projects — built through direct professional contacts, not freelancing platforms — juggling early mornings, late nights, and exam pressure at the same time.
                    </p>
                    <p>
                        On <strong>July 21, 2023</strong>, that freelance practice became something more deliberate: Ayamil Coders, founded in Sadiqabad. The name itself carries the story — a fusion of Muhammad's name with the private name of the company's Hidden Partner, its CEO, and the date is a birthday tribute to them. Today, at 20, Muhammad still works hands-on as the company's technical backbone — architecture, development, and delivery all pass through him personally.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== STRUGGLES ===== */}
            <section className="sp" style={{ paddingTop: '0' }}>
                <div className="fnd-bio" data-f>
                    <p>
                        None of it came easy. Early on, there was no financial safety net — every project had to count, because losing one client was a real financial setback, not just a professional one. Being a teenager offering professional development and cybersecurity work meant some people simply didn't take him seriously; he answered that the only way that actually works, by delivering results strong enough that age stopped being the conversation. And in a smaller city like Sadiqabad, where programming isn't always seen as a "serious" career, there was real family pressure to choose a more traditional path. He stayed the course.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== STATS ===== */}
            <section className="sp" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                <div className="fnd-stats" data-f>
                    <div className="fnd-stat">
                        <div className="fnd-stat-num">11</div>
                        <div className="fnd-stat-lbl">Age He Started Coding</div>
                    </div>
                    <div className="fnd-stat">
                        <div className="fnd-stat-num">600+</div>
                        <div className="fnd-stat-lbl">Projects Delivered</div>
                    </div>
                    <div className="fnd-stat">
                        <div className="fnd-stat-num">50+</div>
                        <div className="fnd-stat-lbl">International Clients</div>
                    </div>
                    <div className="fnd-stat">
                        <div className="fnd-stat-num">72%</div>
                        <div className="fnd-stat-lbl">Repeat Client Rate</div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== TIMELINE ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '48px' }} data-f>
                    <span className="section-lbl">The Journey</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px', color: 'var(--txt)' }}>
                        From Sadiqabad, <br />Not Silicon Valley
                    </h2>
                </div>
                <div className="fnd-timeline">
                    {timeline.map((item, i) => (
                        <div key={i} className="fnd-tl-item" data-f data-fd={i + 1}>
                            <div className="fnd-tl-dot"></div>
                            <div className="fnd-tl-year">{item.year}</div>
                            <div className="fnd-tl-title">{item.title}</div>
                            <div className="fnd-tl-desc">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== SKILLS ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-f>
                    <span className="section-lbl">What He Personally Handles</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px', color: 'var(--txt)' }}>
                        Technical Backbone, <br />Not a Figurehead
                    </h2>
                </div>
                <div className="fnd-skill-grid">
                    {skills.map((skill, i) => (
                        <div key={skill.title} className="fnd-skill-card" data-f data-fd={i + 1}>
                            <div className="fnd-skill-ico" style={{ background: skill.bg, '--sk-shadow': skill.shadow } as React.CSSProperties}>{skill.icon}</div>
                            <div className="fnd-skill-title">{skill.title}</div>
                            <div className="fnd-skill-desc">{skill.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== QUOTE ===== */}
            <section className="sp">
                <div className="fnd-quote" data-f>
                    <div className="fnd-quote-mark">"</div>
                    <div className="fnd-quote-text">
                        You don't need a degree from a famous university to become a world-class programmer. You don't need to be from Lahore, Karachi, or Silicon Valley. I'm proof of that — and I'm still building it, every day, from Sadiqabad.
                    </div>
                    <div className="fnd-quote-attr">— Muhammad Muzamil, Founder</div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== VALUES ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-f>
                    <span className="section-lbl">Since Day One</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px', color: 'var(--txt)' }}>
                        Three Non-Negotiables
                    </h2>
                </div>
                <div className="fnd-val-grid">
                    {values.map((val, i) => (
                        <div key={val.title} className="fnd-val-card" data-f data-fd={i + 1}>
                            <div style={{ fontSize: '26px', marginBottom: '12px' }}>{val.icon}</div>
                            <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--txt)' }}>{val.title}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7 }}>{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== MESSAGE ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '28px' }} data-f>
                    <span className="section-lbl">The Message</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px', color: 'var(--txt)' }}>
                        Proof, Not Permission
                    </h2>
                </div>
                <div className="fnd-bio" data-f data-fd="1">
                    <p>
                        To every young person in Sadiqabad, in Rahim Yar Khan, in Southern Punjab wondering whether it's worth learning to code — this is the answer. It's possible. It's been done. And it's still being done, every single day, from a city called Sadiqabad.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            {/* ===== CTA ===== */}
            <section className="sp" style={{ textAlign: 'center' }}>
                <div data-f>
                    <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '18px' }}>Get in Touch</span>
                    <h2 style={{ fontSize: 'clamp(28px,5vw,50px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '16px', color: 'var(--txt)' }}>
                        Want to Talk <br />Directly?
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.7 }}>
                        Reach out on WhatsApp or email — most first replies still come from Muhammad himself.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/923127592672" target="_blank" rel="noopener noreferrer" className="btn-p fnd-cta-btn" style={{ padding: '14px 32px', fontSize: '15px' }}>Message on WhatsApp →</a>
                        <a href="/about" className="btn-g fnd-cta-btn" style={{ padding: '14px 32px', fontSize: '15px' }}>Back to About</a>
                    </div>
                </div>
            </section>
        </>
    );
}