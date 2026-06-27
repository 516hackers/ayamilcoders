import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, FormEvent } from 'react';
import SEO from '@/components/SEO';

interface CareerFormData {
    name: string;
    email: string;
    phone: string;
    role: string;
    experience: string;
    portfolio_url: string;
    message: string;
}

export default function Careers() {
    const [formData, setFormData] = useState<CareerFormData>({
        name: '',
        email: '',
        phone: '',
        role: '',
        experience: '',
        portfolio_url: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [agreed, setAgreed] = useState(false);

    // Inject careers-specific CSS (matches careers.html <style> block exactly)
    useEffect(() => {
        const styleId = 'careers-page-css';
        if (document.getElementById(styleId)) return;
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* ── CAREERS-SPECIFIC STYLES ── */
            .job-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:28px;margin-bottom:16px;transition:all .35s;position:relative;overflow:hidden}
            .job-card::before{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(41,121,242,.04),transparent);opacity:0;transition:opacity .3s}
            .job-card:hover{border-color:var(--brd2);transform:translateY(-3px);box-shadow:0 14px 44px rgba(41,121,242,.1)}
            .job-card:hover::before{opacity:1}
            .job-head{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:12px}
            .job-title{font-family:var(--disp);font-weight:700;font-size:17px;color:var(--txt)}
            .job-dept{font-size:11px;font-family:var(--mono);color:var(--txt3);margin-top:3px;text-transform:uppercase;letter-spacing:.08em}
            .job-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
            .job-desc{font-size:13px;color:var(--txt3);line-height:1.7;margin-bottom:16px}
            .job-reqs{list-style:none;display:flex;flex-direction:column;gap:7px;margin-bottom:18px}
            .job-reqs li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--txt2);line-height:1.5}
            .job-reqs li::before{content:'›';color:var(--blue-lt);font-weight:700;flex-shrink:0;margin-top:1px}

            .perk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
            @media(max-width:1023px){.perk-grid{grid-template-columns:repeat(2,1fr)}}
            @media(max-width:639px){.perk-grid{grid-template-columns:1fr}}
            .perk-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px;transition:all .3s}
            .perk-card:hover{border-color:var(--brd2);transform:translateY(-3px);box-shadow:0 12px 36px rgba(41,121,242,.08)}
            .perk-icon{width:46px;height:46px;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;margin-bottom:14px;font-size:20px}
            .perk-title{font-family:var(--disp);font-weight:700;font-size:14px;color:var(--txt);margin-bottom:6px}
            .perk-desc{font-size:13px;color:var(--txt3);line-height:1.65}

            .process-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
            @media(max-width:767px){.process-strip{grid-template-columns:1fr 1fr;gap:16px}}
            @media(max-width:479px){.process-strip{grid-template-columns:1fr}}
            .proc-step{background:var(--card-bg);border:1px solid var(--brd);padding:24px;text-align:center;position:relative;transition:all .3s}
            .proc-step:first-child{border-radius:var(--r-lg) 0 0 var(--r-lg)}
            .proc-step:last-child{border-radius:0 var(--r-lg) var(--r-lg) 0}
            @media(max-width:767px){.proc-step:first-child,.proc-step:last-child,.proc-step{border-radius:var(--r-lg)}}
            .proc-step:not(:last-child){border-right:none}
            @media(max-width:767px){.proc-step:not(:last-child){border-right:1px solid var(--brd)}}
            .proc-step:hover{background:var(--card-hov);border-color:var(--brd2)}
            .proc-num{font-family:var(--mono);font-size:11px;color:var(--txt3);margin-bottom:10px;text-transform:uppercase;letter-spacing:.08em}
            .proc-title{font-family:var(--disp);font-weight:700;font-size:14px;color:var(--txt);margin-bottom:6px}
            .proc-desc{font-size:12px;color:var(--txt3);line-height:1.6}

            .apply-form{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:36px;max-width:640px;margin:0 auto}
            .fg{margin-bottom:18px}
            .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
            @media(max-width:639px){.form-row{grid-template-columns:1fr}}

            .culture-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
            @media(max-width:639px){.culture-grid{grid-template-columns:1fr}}
            .culture-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:20px;display:flex;gap:14px;align-items:flex-start;transition:all .3s}
            .culture-card:hover{border-color:var(--brd2);background:var(--card-hov)}

            @media(max-width:1023px){.career-split{grid-template-columns:1fr!important;gap:40px!important}}
        `;
        document.head.appendChild(style);
        return () => { document.getElementById(styleId)?.remove(); };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) submitData.append(key, value);
        });

        try {
            const response = await fetch('/api/careers/apply', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: submitData
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message || 'Application submitted! We\'ll be in touch within 48 hours.');
                setFormData({ name: '', email: '', phone: '', role: '', experience: '', portfolio_url: '', message: '' });
                setAgreed(false);
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

        const pageSchema = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Careers at Ayamil Coders",
        "description": "Join Ayamil Coders! Remote-first software house hiring Full-Stack Developers, Blockchain Developers, Mobile Developers, Bug Fixing / QA Engineers, and AI Engineers.",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Ayamil Coders",
            "sameAs": "https://ayamilcoders.com"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sadiqabad",
                "addressRegion": "Punjab",
                "addressCountry": "Pakistan"
            }
        }
    };

    return (
        <>
            <SEO 
                title="Careers — Ayamil Coders"
                description="Join Ayamil Coders! Remote-first software house hiring Full-Stack Developers, Blockchain Developers, Mobile Developers, Bug Fixing / QA Engineers, and AI Engineers."
                keywords="careers, jobs, software development, Pakistan, remote work"
                url="https://ayamilcoders.com/careers"
                schema={pageSchema}
            />
            <Head title="Careers — Ayamil Coders" />

            {/* ── PAGE HERO ── */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(155,89,245,.1),transparent 70%)', top: '-200px', right: '-80px' }}></div>
                <div className="page-hero-blob" style={{ width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(41,121,242,.08),transparent 70%)', bottom: '-60px', left: '40px' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div data-a="up">
                        <span className="section-lbl">We're Hiring</span>
                        <h1 style={{ fontSize: 'clamp(36px,6vw,68px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05, margin: '12px 0 18px' }}>
                            Build Your Career<br /><span className="shimmer-txt">With Us.</span>
                        </h1>
                        <p style={{ fontSize: '16px', color: 'var(--txt2)', maxWidth: '520px', lineHeight: 1.75, marginBottom: '28px' }}>
                            Join a remote-first team of engineers, designers, and builders based in Punjab, Pakistan — working on real-world projects for global clients every single day.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <a href="#open-roles" className="btn-p" style={{ padding: '12px 28px' }}>See Open Roles →</a>
                            <a href="#culture" className="btn-g" style={{ padding: '12px 28px' }}>Our Culture ↓</a>
                        </div>
                    </div>
                    {/* Quick perks strip */}
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--brd)' }} data-a="up" data-d="2">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>🌍</span><span style={{ fontSize: '13px', color: 'var(--txt2)' }}>Fully Remote</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>⏰</span><span style={{ fontSize: '13px', color: 'var(--txt2)' }}>Flexible Hours</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>📈</span><span style={{ fontSize: '13px', color: 'var(--txt2)' }}>Fast Growth</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>💰</span><span style={{ fontSize: '13px', color: 'var(--txt2)' }}>Competitive Pay</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>🔥</span><span style={{ fontSize: '13px', color: 'var(--txt2)' }}>Real Projects</span></div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ── CULTURE ── */}
            <section className="sp" id="culture">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="career-split">
                    <div data-a="left">
                        <span className="section-lbl">Life at Ayamil</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', margin: '12px 0 16px' }}>
                            We Ship Real Work.<br /><span className="shimmer-txt">Together.</span>
                        </h2>
                        <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.8, marginBottom: '20px' }}>
                            Ayamil Coders is not a training ground or an outsourcing churn machine. We are a team of builders who take ownership, speak honestly, and deliver work we're proud to put our name on.
                        </p>
                        <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.8 }}>
                            Every team member works directly on client projects from day one. No bench time, no make-work tasks. You'll build production code, talk to clients, and grow alongside the company.
                        </p>
                    </div>
                    <div data-a="right">
                        <div className="culture-grid">
                            <div className="culture-card" data-a="scale" data-d="1">
                                <div className="i3 ib" style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, fontSize: '16px' }}>🤝</div>
                                <div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '14px', color: 'var(--txt)', marginBottom: '4px' }}>Mentorship</div><div style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6 }}>Learn directly from senior engineers and the founding team.</div></div>
                            </div>
                            <div className="culture-card" data-a="scale" data-d="2">
                                <div className="i3 ig" style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, fontSize: '16px' }}>🚀</div>
                                <div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '14px', color: 'var(--txt)', marginBottom: '4px' }}>Ownership</div><div style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6 }}>You own your tasks end-to-end. No micro-management.</div></div>
                            </div>
                            <div className="culture-card" data-a="scale" data-d="3">
                                <div className="i3 ip" style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, fontSize: '16px' }}>🛠️</div>
                                <div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '14px', color: 'var(--txt)', marginBottom: '4px' }}>Modern Stack</div><div style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6 }}>Work with React, Laravel, Solidity, Python, and more.</div></div>
                            </div>
                            <div className="culture-card" data-a="scale" data-d="4">
                                <div className="i3 ia" style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, fontSize: '16px' }}>💬</div>
                                <div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '14px', color: 'var(--txt)', marginBottom: '4px' }}>Open Comms</div><div style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6 }}>Async-first, no-politics communication culture.</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ── PERKS ── */}
            <section className="sp" style={{ background: 'rgba(5,13,26,.3)' }}>
                <div style={{ textAlign: 'center', marginBottom: '44px' }} data-a="blur">
                    <span className="section-lbl">Benefits</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        Why Join <span className="shimmer-txt">Ayamil Coders?</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                        We invest in our people the same way we invest in our products.
                    </p>
                </div>
                <div className="perk-grid">
                    <div className="perk-card" data-a="scale" data-d="1">
                        <div className="perk-icon ib i3">🌐</div>
                        <div className="perk-title">100% Remote</div>
                        <div className="perk-desc">Work from anywhere in Pakistan or globally. All you need is a laptop and a stable connection.</div>
                    </div>
                    <div className="perk-card" data-a="scale" data-d="2">
                        <div className="perk-icon ig i3">💸</div>
                        <div className="perk-title">Competitive Salary</div>
                        <div className="perk-desc">Market-rate pay reviewed every 6 months, plus performance bonuses on successful project deliveries.</div>
                    </div>
                    <div className="perk-card" data-a="scale" data-d="3">
                        <div className="perk-icon ip i3">📚</div>
                        <div className="perk-title">Learning Budget</div>
                        <div className="perk-desc">Access to paid courses, conferences, and resources. We cover tools and subscriptions you actually need.</div>
                    </div>
                    <div className="perk-card" data-a="scale" data-d="1">
                        <div className="perk-icon ia i3">⏰</div>
                        <div className="perk-title">Flexible Hours</div>
                        <div className="perk-desc">Results-first culture. Manage your own schedule as long as deliverables and client commitments are met.</div>
                    </div>
                    <div className="perk-card" data-a="scale" data-d="2">
                        <div className="perk-icon ib i3">📈</div>
                        <div className="perk-title">Fast-Track Growth</div>
                        <div className="perk-desc">Ayamil Coders is growing fast. High performers move up quickly — we promote from within aggressively.</div>
                    </div>
                    <div className="perk-card" data-a="scale" data-d="3">
                        <div className="perk-icon ig i3">🌟</div>
                        <div className="perk-title">Global Exposure</div>
                        <div className="perk-desc">Work directly with clients from UAE, UK, USA, and Europe. Build an international portfolio from day one.</div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ── OPEN ROLES ── */}
            <section className="sp" id="open-roles">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }} data-a="up">
                    <div>
                        <span className="section-lbl">Open Positions</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                            Current <span className="shimmer-txt">Openings</span>
                        </h2>
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--green)' }}>● 5 roles open</span>
                </div>

                {/* Role 1 — Full-Stack */}
                <div className="job-card" data-a="up" data-d="1">
                    <div className="job-head">
                        <div>
                            <div className="job-title">Full-Stack Web Developer</div>
                            <div className="job-dept">Engineering · Remote · Full-Time</div>
                        </div>
                        <a href="#apply" className="btn-p" style={{ padding: '9px 20px', fontSize: '13px' }}>Apply →</a>
                    </div>
                    <div className="job-meta">
                        <span className="tag tb">React / Next.js</span>
                        <span className="tag tb">Laravel / PHP</span>
                        <span className="tag tg">MySQL</span>
                        <span className="tag ta">1–3 yrs exp</span>
                    </div>
                    <div className="job-desc">Build and maintain full-stack web applications for international clients. You'll work across both frontend and backend, owning features end-to-end with direct client communication.</div>
                    <ul className="job-reqs">
                        <li>Strong proficiency in React or Next.js and one backend framework (Laravel preferred)</li>
                        <li>Experience with RESTful APIs, authentication, and database design</li>
                        <li>Ability to estimate tasks accurately and communicate blockers early</li>
                        <li>Comfortable with Git, code reviews, and working asynchronously</li>
                    </ul>
                </div>

                {/* Role 2 — Blockchain */}
                <div className="job-card" data-a="up" data-d="2">
                    <div className="job-head">
                        <div>
                            <div className="job-title">Blockchain / Solidity Developer</div>
                            <div className="job-dept">Web3 · Remote · Full-Time</div>
                        </div>
                        <a href="#apply" className="btn-p" style={{ padding: '9px 20px', fontSize: '13px', background: 'linear-gradient(135deg,#3d1a78,#7c3aed,#a78bfa)' }}>Apply →</a>
                    </div>
                    <div className="job-meta">
                        <span className="tag tp">Solidity</span>
                        <span className="tag tp">ERC-20 / ERC-721</span>
                        <span className="tag tb">Hardhat / Foundry</span>
                        <span className="tag tg">BSC / ETH / Polygon</span>
                    </div>
                    <div className="job-desc">Develop, test, and deploy smart contracts for token launches, DeFi protocols, and NFT projects. Work directly with the CEO on blockchain architecture for client engagements.</div>
                    <ul className="job-reqs">
                        <li>Solid Solidity knowledge with at least one deployed contract on mainnet</li>
                        <li>Familiarity with DEX integration, liquidity mechanics, and token standards</li>
                        <li>Experience writing unit and integration tests for contracts</li>
                        <li>Understanding of common security vulnerabilities (reentrancy, overflow, etc.)</li>
                    </ul>
                </div>

                {/* Role 3 — Flutter */}
                <div className="job-card" data-a="up" data-d="3">
                    <div className="job-head">
                        <div>
                            <div className="job-title">Mobile Developer (Flutter)</div>
                            <div className="job-dept">Mobile · Remote · Full-Time</div>
                        </div>
                        <a href="#apply" className="btn-p" style={{ padding: '9px 20px', fontSize: '13px', background: 'linear-gradient(135deg,#04432c,#059669,#34d399)' }}>Apply →</a>
                    </div>
                    <div className="job-meta">
                        <span className="tag tg">Flutter / Dart</span>
                        <span className="tag tg">Android / iOS</span>
                        <span className="tag tb">REST APIs</span>
                        <span className="tag ta">Firebase</span>
                    </div>
                    <div className="job-desc">Build polished cross-platform mobile apps in Flutter. You'll own the full mobile layer — UI, state management, API integration, and app store publishing for both Android and iOS.</div>
                    <ul className="job-reqs">
                        <li>1+ year of Flutter development with at least one app published to Play Store / App Store</li>
                        <li>Strong grasp of Flutter widgets, state management (Provider, Riverpod, or BLoC)</li>
                        <li>Experience integrating REST APIs and handling auth flows in mobile</li>
                        <li>Bonus: Python/Kivy experience for Android-only projects</li>
                    </ul>
                </div>

                {/* Role 4 — Bug Fixing / QA */}
                <div className="job-card" data-a="up" data-d="4">
                    <div className="job-head">
                        <div>
                            <div className="job-title">Bug Fixing / QA Engineer</div>
                            <div className="job-dept">Quality Assurance · Remote · Part-Time / Full-Time</div>
                        </div>
                        <a href="#apply" className="btn-p" style={{ padding: '9px 20px', fontSize: '13px', background: 'linear-gradient(135deg,#6b3500,#d97706,#fbbf24)' }}>Apply →</a>
                    </div>
                    <div className="job-meta">
                        <span className="tag ta">Debugging</span>
                        <span className="tag ta">Code Review</span>
                        <span className="tag tb">Testing</span>
                        <span className="tag tg">Performance</span>
                    </div>
                    <div className="job-desc">Diagnose and fix bugs across web, mobile, blockchain, and AI codebases — including projects originally built by other teams. You'll do root-cause debugging, code review, and regression testing for our Bug Fixing service line.</div>
                    <ul className="job-reqs">
                        <li>Strong debugging skills across at least two stacks (e.g. JS/React + PHP/Laravel)</li>
                        <li>Comfortable reading unfamiliar/legacy code and tracing root causes quickly</li>
                        <li>Experience with browser dev tools, error tracking, and basic performance profiling</li>
                        <li>Bonus: experience auditing Solidity contracts or debugging AI/ML pipelines</li>
                    </ul>
                </div>

                {/* Role 5 — AI/Python */}
                <div className="job-card" data-a="up" data-d="4">
                    <div className="job-head">
                        <div>
                            <div className="job-title">AI / Python Engineer</div>
                            <div className="job-dept">AI & Automation · Remote · Full-Time</div>
                        </div>
                        <a href="#apply" className="btn-p" style={{ padding: '9px 20px', fontSize: '13px' }}>Apply →</a>
                    </div>
                    <div className="job-meta">
                        <span className="tag tb">Python</span>
                        <span className="tag tp">ML / LLMs</span>
                        <span className="tag tg">FastAPI</span>
                        <span className="tag ta">Automation</span>
                    </div>
                    <div className="job-desc">Build AI-powered features, automation scripts, and ML integrations for client products. You'll work on everything from LLM-powered chatbots to Python-based Android apps and backend pipelines.</div>
                    <ul className="job-reqs">
                        <li>Strong Python skills with practical experience in ML libraries (Scikit, PyTorch, Transformers)</li>
                        <li>Experience building REST APIs in FastAPI or Flask and deploying them</li>
                        <li>Familiarity with LLM APIs (OpenAI, Anthropic, etc.) for product integrations</li>
                        <li>Bonus: experience with Kivy or BeeWare for Android app development</li>
                    </ul>
                </div>
            </section>

            <div className="divider"></div>

            {/* ── HIRING PROCESS ── */}
            <section className="sp" style={{ background: 'rgba(5,13,26,.3)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl">Hiring Process</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        From Apply to <span className="shimmer-txt">Day One</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px' }}>Fast, transparent, and respectful of your time. Typically 1–2 weeks end-to-end.</p>
                </div>
                <div className="process-strip">
                    <div className="proc-step" data-a="up" data-d="1">
                        <div className="proc-num">Step 01</div>
                        <div style={{ fontSize: '28px', marginBottom: '10px' }}>📋</div>
                        <div className="proc-title">Apply</div>
                        <div className="proc-desc">Fill out the form below. We read every application within 48 hours.</div>
                    </div>
                    <div className="proc-step" data-a="up" data-d="2">
                        <div className="proc-num">Step 02</div>
                        <div style={{ fontSize: '28px', marginBottom: '10px' }}>💬</div>
                        <div className="proc-title">Intro Call</div>
                        <div className="proc-desc">A 20-minute WhatsApp or video call to get to know each other.</div>
                    </div>
                    <div className="proc-step" data-a="up" data-d="3">
                        <div className="proc-num">Step 03</div>
                        <div style={{ fontSize: '28px', marginBottom: '10px' }}>🛠️</div>
                        <div className="proc-title">Skill Task</div>
                        <div className="proc-desc">A small paid task relevant to your role — no unpaid work, ever.</div>
                    </div>
                    <div className="proc-step" data-a="up" data-d="4">
                        <div className="proc-num">Step 04</div>
                        <div style={{ fontSize: '28px', marginBottom: '10px' }}>🎉</div>
                        <div className="proc-title">Offer & Onboard</div>
                        <div className="proc-desc">Clear offer letter, onboarding guide, and you're live on day one.</div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* ── APPLY FORM ── */}
            <section className="sp" id="apply">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl">Apply Now</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        Ready to <span className="shimmer-txt">Join Us?</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px', maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                        Can't find the right role? Apply as a general candidate — we create roles for exceptional people.
                    </p>
                </div>

                <div className="apply-form" data-a="scale">
                    {/* Success / Error messages */}
                    {success && (
                        <div style={{ marginBottom: '20px', padding: '14px 20px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', color: '#22c55e', fontSize: '14px' }}>
                            ✅ {success}
                        </div>
                    )}
                    {error && (
                        <div style={{ marginBottom: '20px', padding: '14px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', color: '#ef4444', fontSize: '14px' }}>
                            ❌ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="fg">
                                <label className="fl">Full Name</label>
                                <input className="ff" type="text" name="name" placeholder="Muhammad Ali" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="fg">
                                <label className="fl">Email Address</label>
                                <input className="ff" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="fg">
                                <label className="fl">Phone / WhatsApp</label>
                                <input className="ff" type="tel" name="phone" placeholder="+92 300 0000000" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="fg">
                                <label className="fl">Role Applying For</label>
                                <select className="ff" name="role" value={formData.role} onChange={handleChange} required>
                                    <option value="" disabled>Select a role</option>
                                    <option>Full-Stack Web Developer</option>
                                    <option>Blockchain / Solidity Developer</option>
                                    <option>Mobile Developer (Flutter)</option>
                                    <option>Bug Fixing / QA Engineer</option>
                                    <option>AI / Python Engineer</option>
                                    <option>General Application</option>
                                </select>
                            </div>
                        </div>
                        <div className="fg">
                            <label className="fl">Portfolio / GitHub / LinkedIn URL</label>
                            <input className="ff" type="url" name="portfolio_url" placeholder="https://github.com/yourname" value={formData.portfolio_url} onChange={handleChange} />
                        </div>
                        <div className="fg">
                            <label className="fl">Experience Level</label>
                            <select className="ff" name="experience" value={formData.experience} onChange={handleChange}>
                                <option value="" disabled>Select experience level</option>
                                <option>Fresher (0–1 yr)</option>
                                <option>Junior (1–2 yrs)</option>
                                <option>Mid-Level (2–4 yrs)</option>
                                <option>Senior (4+ yrs)</option>
                            </select>
                        </div>
                        <div className="fg">
                            <label className="fl">Tell Us About Yourself</label>
                            <textarea className="ff" name="message" rows={5} placeholder="Share what you've built, why you want to join Ayamil Coders, and what you'd like to work on..." value={formData.message} onChange={handleChange} required style={{ resize: 'none' }} />
                        </div>
                        <div className="fg" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <input
                                type="checkbox"
                                id="agree"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                required
                                style={{ marginTop: '3px', flexShrink: 0, accentColor: 'var(--blue)' }}
                            />
                            <label htmlFor="agree" style={{ fontSize: '12px', color: 'var(--txt3)', lineHeight: 1.6 }}>
                                I understand this is a remote role and I'm available for async communication. I agree that my application details may be stored by Ayamil Coders.
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn-p"
                            disabled={loading}
                            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', marginTop: '6px', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Submitting...' : 'Submit Application →'}
                        </button>
                    </form>
                    <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--txt3)', marginTop: '16px', fontFamily: 'var(--mono)' }}>
                        Or email us directly: <a href="mailto:careers@ayamilcoders.com" style={{ color: 'var(--blue-lt)', textDecoration: 'none' }}>careers@ayamilcoders.com</a>
                    </p>
                </div>
            </section>
        </>
    );
}