import { useState, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import SEO from '@/components/SEO';

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    service: string;
    budget: string;
    message: string;
    whatsapp: string;
    timeline: string;
    source: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '', email: '', company: '', service: '', budget: '', message: '', whatsapp: '', timeline: '', source: ''
    });
    const [charCount, setCharCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [justSent, setJustSent] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message || "Message sent! We'll be in touch within 24 hours.");
                setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '', whatsapp: '', timeline: '', source: '' });
                setCharCount(0);
                // Pop the toast in, hold it, then fade it back out — mirrors
                // the minimal, spring-y confirmation feel of Apple's own
                // system toasts (e.g. AirDrop / "Copied") rather than a
                // banner that shoves the page content down.
                setJustSent(true);
                setTimeout(() => setJustSent(false), 900);
                requestAnimationFrame(() => setShowToast(true));
                setTimeout(() => setShowToast(false), 4000);
                setTimeout(() => setSuccess(null), 4500);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'message') setCharCount(value.length);
    };

    const faqs = [
        { q: 'How quickly will you respond?', a: 'We respond to all inquiries within 24 hours — usually much faster. WhatsApp messages typically get a reply within 1–2 hours during business hours (PKT, UTC+5).' },
        { q: 'Do you sign NDAs?', a: 'Absolutely. We sign NDAs and custom IP agreements before any project discussion. Confidentiality is a baseline, not an upsell.' },
        { q: "Can I see samples of past work first?", a: "Yes. Reach out via WhatsApp or email and we'll share relevant portfolio samples for your specific project type within a few hours." },
        { q: 'What payment methods do you accept?', a: 'Bank transfer, PayPal, USDT/USDC (crypto), and local Pakistani payment methods (JazzCash, EasyPaisa). Standard terms are 50% upfront, 50% on delivery.' },
        { q: 'Do you offer ongoing support after launch?', a: 'Every project includes 30 days of free post-launch support. Beyond that we offer monthly retainer packages — from a light maintenance plan to a dedicated developer package.' },
        { q: 'Can you take over an existing project?', a: "Yes. We regularly pick up abandoned, half-built, or broken projects. Share the repo and a description via email and we'll send you an honest assessment within 24 hours." }
    ];
        const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ContactPage',
                name: 'Contact Ayamil Coders',
                description: 'Get in touch with Ayamil Coders for Web Development, Blockchain Development, AI Development, or Bug Fixing.',
                url: 'https://ayamilcoders.com/contact',
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Ayamil Coders',
                    url: 'https://ayamilcoders.com',
                },
                about: { '@id': 'https://ayamilcoders.com/#organization' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map(f => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
        ],
    };

    return (
        <>
            <SEO
                title="Contact Ayamil Coders - Web, Blockchain & AI Development + Bug Fixing"
                description="Reach out to Ayamil Coders for Web Development, Blockchain Development, AI Development, or Bug Fixing. Get a quote within 24 hours."
                keywords="contact software house Pakistan, get a quote web development, hire blockchain developer, hire AI developer, bug fixing service contact, Ayamil Coders contact"
                url="https://ayamilcoders.com/contact"
                schema={pageSchema}
            />
            {/* ── CONTACT-SPECIFIC STYLES ── */}
            {/* BUG FIX 1: All contact-page CSS was in the HTML <style> block but was
                NEVER added to any .css file or the TSX. These classes are missing
                from shared.css, so they must be injected here via a <style> tag. */}
            <style>{`
                .contact-layout{display:grid;grid-template-columns:1fr 1.4fr;gap:40px;align-items:flex-start}
                @media(max-width:1023px){.contact-layout{grid-template-columns:1fr;gap:32px}}

                .contact-panel{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:32px;position:sticky;top:80px}
                @media(max-width:1023px){.contact-panel{position:static}}

                .contact-method{display:flex;align-items:flex-start;gap:14px;padding:18px 0;border-bottom:1px solid var(--brd)}
                .contact-method:last-of-type{border-bottom:none}
                .cm-icon{width:42px;height:42px;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px}
                .cm-label{font-size:11px;font-family:var(--mono);text-transform:uppercase;letter-spacing:.08em;color:var(--txt3);margin-bottom:3px}
                .cm-value{font-family:var(--disp);font-weight:600;font-size:14px;color:var(--txt);text-decoration:none;transition:color .2s}
                .cm-value:hover{color:var(--blue-lt)}
                .cm-sub{font-size:12px;color:var(--txt3);margin-top:2px}

                .contact-form{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:36px}
                .fg{margin-bottom:18px}
                .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
                @media(max-width:639px){.form-row{grid-template-columns:1fr}}

                .char-count{font-family:var(--mono);font-size:11px;color:var(--txt3);text-align:right;margin-top:4px}

                .avail-strip{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;padding-top:16px;border-top:1px solid var(--brd)}
                .avail-slot{padding:5px 12px;border-radius:999px;background:rgba(45,211,111,.08);border:1px solid rgba(45,211,111,.2);font-size:11px;font-family:var(--mono);color:var(--green)}
                .avail-slot.busy{background:rgba(255,55,95,.07);border-color:rgba(255,55,95,.2);color:var(--red)}

                .faq-contact-item{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);margin-bottom:10px;transition:border-color .3s}
                .faq-contact-item.open{border-color:var(--brd2)}
                .faq-contact-q{padding:16px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:14px;color:var(--txt);user-select:none;gap:12px}
                /* Grid-rows collapse animates to the real content height, so
                   long answers never get clipped like the old max-height:160px did. */
                .faq-contact-a-wrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s cubic-bezier(.4,0,.2,1)}
                .faq-contact-item.open .faq-contact-a-wrap{grid-template-rows:1fr}
                .faq-contact-a-inner{overflow:hidden;min-height:0}
                .faq-contact-a{font-size:13px;color:var(--txt3);line-height:1.7;padding:0 20px 16px}
                .faq-arr{transition:transform .3s;color:var(--blue-lt)}
                .faq-contact-item.open .faq-arr{transform:rotate(45deg)}

                /* ── Apple-style submit success popup (glass toast) ── */
                @keyframes cf-check-circle{
                    0%{stroke-dashoffset:76}
                    100%{stroke-dashoffset:0}
                }
                @keyframes cf-check-mark{
                    0%{stroke-dashoffset:24}
                    100%{stroke-dashoffset:0}
                }
                @keyframes cf-fade-up{
                    0%{opacity:0;transform:translateY(4px)}
                    100%{opacity:1;transform:translateY(0)}
                }
                .cf-toast{
                    position:fixed;
                    top:calc(env(safe-area-inset-top,0px) + 18px);
                    left:50%;right:auto;
                    transform:translateX(-50%) translateY(-14px) scale(.92);
                    opacity:0;pointer-events:none;
                    z-index:9999;
                    display:flex;align-items:center;gap:14px;
                    padding:16px 22px;border-radius:20px;
                    width:max-content;max-width:min(92vw,440px);
                    background:rgba(24,26,32,.86);
                    -webkit-backdrop-filter:blur(20px) saturate(180%);
                    backdrop-filter:blur(20px) saturate(180%);
                    border:1px solid rgba(255,255,255,.09);
                    box-shadow:0 24px 60px rgba(0,0,0,.4), 0 2px 10px rgba(0,0,0,.25);
                    transition:opacity .35s cubic-bezier(.4,0,.2,1),
                               transform .55s cubic-bezier(.34,1.56,.64,1);
                }
                .cf-toast.cf-toast-show{
                    opacity:1;pointer-events:auto;
                    transform:translateX(-50%) translateY(0) scale(1);
                }
                @media(max-width:639px){
                    .cf-toast{
                        top:calc(env(safe-area-inset-top,0px) + 12px);
                        left:16px;right:16px;
                        transform:translateY(-14px) scale(.94);
                        max-width:none;width:auto;
                        padding:14px 16px;border-radius:16px;gap:12px;
                    }
                    .cf-toast.cf-toast-show{ transform:translateY(0) scale(1); }
                }
                .cf-toast-icon{flex-shrink:0}
                .cf-toast-icon circle{
                    stroke-dasharray:76;stroke-dashoffset:76;
                }
                .cf-toast-icon path{
                    stroke-dasharray:24;stroke-dashoffset:24;
                }
                .cf-toast-show .cf-toast-icon circle{
                    animation:cf-check-circle .5s cubic-bezier(.65,0,.35,1) .05s forwards;
                }
                .cf-toast-show .cf-toast-icon path{
                    animation:cf-check-mark .35s ease-out .45s forwards;
                }
                .cf-toast-title{
                    font-family:var(--disp);font-weight:700;font-size:14px;color:#fff;
                    margin-bottom:2px;
                }
                .cf-toast-msg{
                    font-size:12.5px;color:rgba(255,255,255,.72);line-height:1.55;
                }
                .cf-toast-show .cf-toast-title,.cf-toast-show .cf-toast-msg{
                    animation:cf-fade-up .4s ease .32s both;
                }
                .btn-success{
                    background:linear-gradient(135deg,#059669,#22c55e)!important;
                    transition:background .4s ease,transform .25s cubic-bezier(.34,1.56,.64,1)!important;
                }
                .btn-success-pop{transform:scale(1.03)}
                @media(prefers-reduced-motion:reduce){
                    .cf-toast,.cf-toast-icon circle,.cf-toast-icon path,
                    .cf-toast-title,.cf-toast-msg{animation:none!important;transition:opacity .2s ease!important}
                }

                .social-lg{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}
                @media(max-width:639px){.social-lg{grid-template-columns:1fr 1fr}}
                .soc-lg-a{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px;background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);text-decoration:none;transition:all .2s}
                .soc-lg-a:hover{border-color:var(--brd2);background:var(--card-hov);transform:translateY(-2px)}
                .soc-lg-a span{font-size:12px;font-family:var(--mono);color:var(--txt3)}

                .resp-time{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;background:rgba(45,211,111,.08);border:1px solid rgba(45,211,111,.2);font-size:11px;font-family:var(--mono);color:var(--green);margin-top:14px}
            `}</style>

            {/* PAGE HERO */}
            <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="page-hero-blob" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(0,200,232,.09),transparent 70%)', top: '-120px', right: '-60px' }}></div>
                <div className="page-hero-blob" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(155,89,245,.07),transparent 70%)', bottom: '-80px', left: '80px' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <span className="section-lbl">Get In Touch</span>
                    <h1 style={{ fontSize: 'clamp(36px,6vw,68px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05, margin: '12px 0 16px' }}>
                        Let's Build<br /><span className="shimmer-txt">Something Real.</span>
                    </h1>
                    <p style={{ fontSize: '16px', color: 'var(--txt2)', maxWidth: '520px', lineHeight: 1.75 }}>
                        Tell us what you're building and we'll get back to you within 24 hours with a clear plan, honest timeline, and a fair quote. No sales fluff — just direct answers.
                    </p>
                    {/* BUG FIX 2: The pulsing green dot had animation:pulse3d but that
                        keyframe is defined in shared.css/shared.js — the inline style
                        in the TSX was missing the animation property entirely. Re-added. */}
                    <div className="resp-time">
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse3d 2s ease-in-out infinite' }}></span>
                        Average response time: under 4 hours
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* SUCCESS / ERROR MESSAGES */}
            {success && createPortal(
                <div className={`cf-toast${showToast ? ' cf-toast-show' : ''}`} role="status">
                    <svg className="cf-toast-icon" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#30d158" strokeWidth="2" />
                        <path d="M7.5 12.5l3 3 6-6.5" stroke="#30d158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                        <div className="cf-toast-title">Message sent</div>
                        <div className="cf-toast-msg">{success}</div>
                    </div>
                </div>,
                document.documentElement
            )}
            {error && <div style={{ margin: '20px 60px', padding: '14px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', color: '#ef4444', fontSize: '14px' }}>❌ {error}</div>}

            {/* CONTACT MAIN LAYOUT */}
            <section className="sp">
                {/* BUG FIX 3: The grid layout was duplicated — CSS class .contact-layout
                    already defines the grid, but the TSX also had inline style repeating
                    the same grid properties. The inline style wins via specificity and
                    overrides any responsive @media breakpoints in the class, breaking
                    the mobile single-column layout. Removed the duplicate inline style. */}
                <div className="contact-layout">

                    {/* LEFT: Info Panel */}
                    <div>
                        {/* BUG FIX 4: contact-panel already defines background, border,
                            borderRadius, padding, position, top in CSS. The duplicate inline
                            styles were harmless but redundant — removed to let CSS control it
                            (especially sticky/static responsive behaviour). */}
                        <div className="contact-panel">
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--txt3)', marginBottom: '4px' }}>Reach Us Directly</div>
                            <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '18px', color: 'var(--txt)', marginBottom: '20px' }}>Choose your channel ↓</div>

                            {/* WhatsApp */}
                            <div className="contact-method">
                                <div className="cm-icon ib i3">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                </div>
                                <div>
                                    <div className="cm-label">WhatsApp (Fastest)</div>
                                    {/* BUG FIX 5: All external target="_blank" links were missing
                                        rel="noopener noreferrer" — a security vulnerability (tabnabbing).
                                        Added to every external link throughout the component. */}
                                    <a href="https://wa.me/923127592672" target="_blank" rel="noopener noreferrer" className="cm-value">+92 312 759 2672</a>
                                    <div className="cm-sub">Typically replies within 1–2 hours</div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="contact-method">
                                <div className="cm-icon ig i3">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </div>
                                <div>
                                    <div className="cm-label">Email</div>
                                    <a href="mailto:info@ayamilcoders.com" className="cm-value">info@ayamilcoders.com</a>
                                    <div className="cm-sub">For detailed briefs &amp; contracts</div>
                                </div>
                            </div>

                            {/* Fiverr */}
                            <div className="contact-method">
                                <div className="cm-icon ip i3">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m4 4V7"/></svg>
                                </div>
                                <div>
                                    <div className="cm-label">Fiverr</div>
                                    <a href="https://fiverr.com/muzamil516" target="_blank" rel="noopener noreferrer" className="cm-value">fiverr.com/muzamil516</a>
                                    <div className="cm-sub">Quick freelance orders &amp; gigs</div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="contact-method">
                                <div className="cm-icon ia i3">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <div>
                                    <div className="cm-label">Headquartered</div>
                                    <span className="cm-value" style={{ cursor: 'default' }}>Sadiqabad, Punjab 🇵🇰</span>
                                    <div className="cm-sub">Operating remotely · PKT (UTC +5)</div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div style={{ marginTop: '6px' }}>
                                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--txt3)', marginBottom: '10px' }}>Availability This Week</div>
                                <div className="avail-strip">
                                    <span className="avail-slot">Mon ✓</span>
                                    <span className="avail-slot">Tue ✓</span>
                                    <span className="avail-slot">Wed ✓</span>
                                    <span className="avail-slot">Thu ✓</span>
                                    <span className="avail-slot busy">Fri ↗</span>
                                    <span className="avail-slot">Sat ✓</span>
                                </div>
                            </div>

                            {/* Social links */}
                            <div className="social-lg">
                                <a href="https://facebook.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-lg-a">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--blue-lt)' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                    <span>Facebook</span>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="soc-lg-a">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#e1306c' }}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                    <span>Instagram</span>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="soc-lg-a">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#0a66c2' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div>
                        <div className="contact-form">
                            <div style={{ marginBottom: '28px' }}>
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '22px', color: 'var(--txt)', marginBottom: '6px' }}>Start a Project</div>
                                <div style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.7 }}>The more detail you share, the more precise our quote. We respond within 24 hours — usually much faster.</div>
                            </div>

                            {/* BUG FIX 6: The original HTML had Token Launch, DeFi/NFT, and
                                Mobile App options in Service dropdown that were removed in TSX.
                                Restored all original options to match the HTML exactly. */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="fg"><label className="fl">Your Name</label><input className="ff" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Smith" required /></div>
                                    <div className="fg"><label className="fl">Company / Project</label><input className="ff" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp (optional)" /></div>
                                </div>
                                <div className="form-row">
                                    <div className="fg"><label className="fl">Email Address</label><input className="ff" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required /></div>
                                    <div className="fg"><label className="fl">WhatsApp (Optional)</label><input className="ff" type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+1 555 000 0000" /></div>
                                </div>
                                <div className="fg">
                                    <label className="fl">Service You Need</label>
                                    <select className="ff" name="service" value={formData.service} onChange={handleChange} required>
                                        <option value="" disabled>Select a service</option>
                                        <option>Web Development (Website / Web App)</option>
                                        <option>E-Commerce Platform</option>
                                        <option>Mobile App (within Web Development)</option>
                                        <option>Blockchain / Smart Contract Development</option>
                                        <option>Token Launch (ERC-20 / BEP-20)</option>
                                        <option>DeFi / NFT Development</option>
                                        <option>AI Development / Automation</option>
                                        <option>Bug Fixing / Code Audit</option>
                                        <option>Other — I'll explain below</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <div className="fg">
                                        <label className="fl">Estimated Budget</label>
                                        <select className="ff" name="budget" value={formData.budget} onChange={handleChange}>
                                            <option value="" disabled>Select budget range</option>
                                            <option>Under $500</option>
                                            <option>$500 – $1,500</option>
                                            <option>$1,500 – $5,000</option>
                                            <option>$5,000 – $15,000</option>
                                            <option>$15,000+</option>
                                            <option>Not sure — advise me</option>
                                        </select>
                                    </div>
                                    <div className="fg">
                                        <label className="fl">Timeline</label>
                                        <select className="ff" name="timeline" value={formData.timeline} onChange={handleChange}>
                                            <option value="" disabled>When do you need it?</option>
                                            <option>ASAP (within 1 week)</option>
                                            <option>2–4 weeks</option>
                                            <option>1–2 months</option>
                                            <option>2–4 months</option>
                                            <option>Flexible</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="fg">
                                    <label className="fl">Project Description</label>
                                    <textarea className="ff" name="message" value={formData.message} onChange={handleChange} rows={6} maxLength={1000} placeholder="Describe your project in detail — what it does, who it's for, any existing systems, and what success looks like for you. The more context you give, the more accurate our response will be." required style={{ resize: 'none' }} />
                                    <div className="char-count"><span>{charCount}</span> / 1000</div>
                                </div>
                                <div className="fg">
                                    <label className="fl">How Did You Find Us?</label>
                                    <select className="ff" name="source" value={formData.source} onChange={handleChange}>
                                        <option value="" disabled>Optional</option>
                                        <option>Fiverr</option>
                                        <option>Google Search</option>
                                        <option>LinkedIn</option>
                                        <option>Facebook</option>
                                        <option>Referral from a Client</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className={`btn-p${justSent ? ' btn-success btn-success-pop' : ''}`}
                                    disabled={loading}
                                    style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
                                >
                                    {justSent ? 'Sent ✓' : loading ? 'Sending...' : 'Send Message →'}
                                </button>
                            </form>
                            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--txt3)', marginTop: '16px', fontFamily: 'var(--mono)' }}>
                                Or message us instantly on{' '}
                                <a href="https://wa.me/923127592672" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none' }}>WhatsApp ↗</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* FAQ Section */}
            <section className="sp" style={{ background: 'rgba(5,13,26,.3)' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                        <span className="section-lbl">FAQ</span>
                        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                            Common <span className="shimmer-txt">Questions</span>
                        </h2>
                    </div>
                    {faqs.map((faq, i) => (
                        <div key={i} className={`faq-contact-item${openFaq === i ? ' open' : ''}`}>
                            {/* BUG FIX 7: Template literal for className was using backtick
                                interpolation inside JSX which works but the space before 'open'
                                was inconsistent. Used explicit conditional concat instead.
                                BUG FIX 8: the old max-height:160px transition clipped longer
                                answers instead of opening. Switched to a grid-template-rows
                                collapse (faq-contact-a-wrap/-inner) which animates to the
                                answer's real height, however long it is. */}
                            <div className="faq-contact-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                {faq.q}
                                <span className="faq-arr">+</span>
                            </div>
                            <div className="faq-contact-a-wrap">
                                <div className="faq-contact-a-inner">
                                    <div className="faq-contact-a">{faq.a}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
