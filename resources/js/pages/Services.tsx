import { useEffect, useRef, useState } from 'react';
import SEO from '@/components/SEO';

export default function Services() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // ===== INJECT PAGE-SPECIFIC CSS =====
    useEffect(() => {
        const existingStyle = document.getElementById('services-page-css');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'services-page-css';
        style.textContent = `
            .svc-full{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:36px;margin-bottom:20px;transition:all .3s}
            .svc-full:hover{border-color:var(--brd2);box-shadow:0 16px 50px rgba(41,121,242,.08)}
            .svc-feats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
            @media(max-width:767px){.svc-feats{grid-template-columns:1fr}}
            .svc-feat{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--txt2);line-height:1.5}
            .feat-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);flex-shrink:0;margin-top:6px}
            .tech-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
            @media(max-width:1023px){.tech-grid{grid-template-columns:repeat(3,1fr)}}
            @media(max-width:639px){.tech-grid{grid-template-columns:repeat(2,1fr)}}
            .tech-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:18px;text-align:center;transition:all .3s}
            .tech-card:hover{border-color:var(--brd2);transform:translateY(-3px)}
            .faq-item{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);margin-bottom:10px;overflow:hidden;transition:border-color .3s}
            .faq-item.open{border-color:var(--brd2)}
            .faq-q{padding:18px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:14px;color:var(--txt);user-select:none}
            .faq-a{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.4,0,.2,1),padding .3s;font-size:13px;color:var(--txt3);line-height:1.7;padding:0 20px}
            .faq-item.open .faq-a{max-height:200px;padding:0 20px 18px}
            .faq-arr{transition:transform .3s;color:var(--blue-lt);font-size:20px;font-weight:300}
            .faq-item.open .faq-arr{transform:rotate(45deg)}
            .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
            @media(max-width:1023px){.pricing-grid{grid-template-columns:1fr 1fr}}
            @media(max-width:639px){.pricing-grid{grid-template-columns:1fr}}
            .price-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:28px;transition:all .35s;position:relative}
            .price-card:hover{border-color:var(--brd2);transform:translateY(-4px);box-shadow:0 16px 48px rgba(41,121,242,.1)}
            .price-card.featured{border-color:rgba(41,121,242,.4);background:rgba(41,121,242,.04)}
            .price-badge{position:absolute;top:16px;right:16px;padding:4px 10px;border-radius:999px;background:rgba(41,121,242,.15);border:1px solid rgba(41,121,242,.3);font-size:10px;font-family:var(--mono);color:var(--blue-lt)}
            .price-amt{font-family:var(--disp);font-weight:800;font-size:36px;color:var(--txt);margin:10px 0 4px}
            .price-per{font-size:12px;color:var(--txt3);font-family:var(--mono)}
            .price-feats{list-style:none;margin:18px 0 22px;display:flex;flex-direction:column;gap:10px}
            .price-feats li{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--txt2)}
            .price-feats li::before{content:'✓';color:var(--green);font-weight:700;flex-shrink:0}

            .page-hero{padding:80px 60px 60px;position:relative;overflow:hidden;background:var(--bg2);border-bottom:1px solid var(--brd)}
            @media(max-width:767px){.page-hero{padding:60px 24px 40px}}
        `;
        document.head.appendChild(style);

        return () => {
            const el = document.getElementById('services-page-css');
            if (el) el.remove();
        };
    }, []);

    // ===== JS FOR SERVICES PAGE =====
    useEffect(() => {
        // ---- SCROLL REVEAL ----
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-d') ? parseFloat(entry.target.getAttribute('data-d')!) * 0.07 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                } else {
                    (entry.target as HTMLElement).style.transitionDelay = '0s';
                    entry.target.classList.remove('in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('[data-a]').forEach(el => revealObs.observe(el));

        return () => {
            revealObs.disconnect();
        };
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const services = [
        {
            id: 1,
            cls: 'ib',
            title: 'Web Development',
            badge: 'Most Popular',
            badgeCls: 'tb',
            desc: 'We craft high-performance websites and web applications — fast, secure, and beautifully designed. From landing pages to enterprise-grade platforms.',
            tags: ['React.js', 'Next.js', 'Laravel', 'Node.js', 'WordPress', 'Vue.js', 'PHP', 'MySQL'],
            features: [
                'Custom frontend & responsive UI design',
                'Scalable backend architecture & REST APIs',
                'E-commerce with payment gateways',
                'CMS integration (WordPress, Strapi)',
                'SEO optimization & performance tuning',
                'Ongoing maintenance & 24/7 support'
            ],
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
            btnBg: 'linear-gradient(135deg,var(--blue-dk),var(--blue),var(--blue-lt))'
        },
        {
            id: 2,
            cls: 'ip',
            title: 'Blockchain Development',
            badge: 'Advanced',
            badgeCls: 'tp',
            desc: 'DeFi platforms, smart contracts, NFT marketplaces, and crypto token development. Rock-solid security, thoroughly audited code.',
            tags: ['Solidity', 'Web3.js', 'Ethers.js', 'Hardhat', 'IPFS', 'DeFi', 'NFT', 'ERC-20/721'],
            features: [
                'Smart contract development & auditing',
                'DeFi protocol design & implementation',
                'NFT marketplace & minting platforms',
                'Crypto token creation (ERC-20, BEP-20)',
                'Wallet integration & Web3 frontends',
                'DAO governance systems'
            ],
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
            btnBg: 'linear-gradient(135deg,#3d1a78,#7c3aed,#a78bfa)'
        },
        {
            id: 3,
            cls: 'ig',
            title: 'AI Development',
            badge: 'Cutting Edge',
            badgeCls: 'tg',
            desc: 'From AI chatbots to full ML pipelines — intelligent software that automates, predicts, and scales with your business.',
            tags: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'FastAPI', 'Automation'],
            features: [
                'Custom AI chatbots & virtual assistants',
                'Machine learning model development',
                'Automation pipelines & workflow bots',
                'Data analysis & predictive analytics',
                'SaaS product development',
                'API integrations & third-party services'
            ],
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
            btnBg: 'linear-gradient(135deg,#04432c,#059669,#34d399)'
        },
        {
            id: 4,
            cls: 'ia',
            title: 'Bug Fixing',
            badge: 'Fast Turnaround',
            badgeCls: 'ta',
            desc: 'Stuck with a broken website, app, or smart contract? We debug and fix issues in any codebase — built by us or another team — with root-cause repairs, not band-aids.',
            tags: ['Debugging', 'Code Review', 'Performance Fixes', 'Security Patches', 'Legacy Code', 'QA Testing'],
            features: [
                'Root-cause debugging for web & mobile apps',
                'Smart contract & Web3 bug fixes',
                'AI/ML pipeline error resolution',
                'Performance & memory leak fixes',
                'Security vulnerability patching',
                'Same-week turnaround on most fixes'
            ],
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M9 9l-2 2v6l2 2M15 9l2 2v6l-2 2M12 4v3M9 12h6M12 7a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0v-4a3 3 0 0 0-3-3z"/></svg>,
            btnBg: 'linear-gradient(135deg,#6b3500,#d97706,#fbbf24)'
        }
    ];

    const slugMap: Record<number, string> = {
        1: 'web-development',
        2: 'blockchain-development',
        3: 'ai-development',
        4: 'bug-fixing',
    };

    const technologies = [
        { icon: '⚛️', name: 'React / Next.js', label: 'Frontend' },
        { icon: '🔷', name: 'Laravel / PHP', label: 'Backend' },
        { icon: '🟢', name: 'Node.js', label: 'Runtime' },
        { icon: '🐍', name: 'Python / AI', label: 'ML / Automation' },
        { icon: '⛓️', name: 'Solidity', label: 'Smart Contracts' },
        { icon: '🗄️', name: 'MySQL / MongoDB', label: 'Database' },
        { icon: '🐞', name: 'Sentry / DevTools', label: 'Bug Tracking' },
        { icon: '✅', name: 'Jest / PHPUnit', label: 'Testing & QA' }
    ];

    const pricing = [
        {
            tier: 'Starter',
            price: '$300',
            per: 'starting from',
            features: ['Landing page / brochure site', 'Mobile responsive design', 'Basic SEO setup', 'Contact form integration', '2 rounds of revisions'],
            featured: false,
            btnText: 'Get Started',
            btnClass: 'btn-g'
        },
        {
            tier: 'Professional',
            price: '$1,200',
            per: 'starting from',
            features: ['Full-stack web application', 'Custom backend & database', 'User authentication system', 'Admin dashboard', 'Payment gateway integration', '3 months post-launch support'],
            featured: true,
            badge: 'Most Popular',
            btnText: 'Get Started',
            btnClass: 'btn-p'
        },
        {
            tier: 'Enterprise',
            price: 'Custom',
            per: "let's discuss",
            features: ['Complex platforms & SaaS', 'Blockchain / AI integration', 'Dedicated development team', 'Priority bug-fixing SLA', 'Full QA & security testing', 'Ongoing retainer available'],
            featured: false,
            btnText: 'Contact Us',
            btnClass: 'btn-g'
        }
    ];

    const faqs = [
        { q: 'What services does Ayamil Coders offer?', a: 'We offer four core services: Web Development (React, Laravel, Node.js), Blockchain Development (Solidity smart contracts, DeFi, NFT), AI Development (machine learning, automation, OpenAI integrations), and Bug Fixing for any existing codebase.' },
        { q: 'How long does a project take?', a: 'Timelines vary by scope. A basic website takes 1–2 weeks. A full-stack app takes 4–8 weeks. Blockchain projects typically take 6–12 weeks. Bug fixes are usually resolved within the same week. We provide a detailed timeline upfront.' },
        { q: 'Do you fix bugs in projects built by other developers?', a: 'Yes. Bug Fixing is one of our four core services — we regularly take on existing codebases for debugging, performance improvements, security patching, and feature additions, regardless of who originally built them.' },
        { q: 'Do you work with international clients?', a: 'Absolutely. We serve clients from UAE, UK, USA, Saudi Arabia, Canada, Australia, and Europe. All communication via WhatsApp, email, and video calls — fully remote.' },
        { q: 'What payment methods do you accept?', a: 'We accept bank transfers, PayPal, cryptocurrency (USDT/BTC), and local Pakistani payment methods. Typically 50% upfront / 50% on delivery.' },
        { q: 'Do you offer post-launch support?', a: 'Yes! All projects include at least 30 days of free post-launch support, plus our dedicated Bug Fixing service for anything that comes up later. We also offer monthly retainer packages for ongoing maintenance.' }
    ];

    const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ayamilcoders.com' },
                    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://ayamilcoders.com/services' },
                ],
            },
            {
                '@type': 'Service',
                '@id': 'https://ayamilcoders.com/services#web-development',
                name: 'Web Development',
                serviceType: 'Web Development',
                description: 'Custom, high-performance websites and web applications built with React, Next.js, Laravel, and Node.js.',
                provider: { '@id': 'https://ayamilcoders.com/#organization' },
                areaServed: 'Worldwide',
            },
            {
                '@type': 'Service',
                '@id': 'https://ayamilcoders.com/services#blockchain-development',
                name: 'Blockchain Development',
                serviceType: 'Blockchain Development',
                description: 'DeFi platforms, NFT marketplaces, and audited Solidity smart contracts on EVM-compatible chains.',
                provider: { '@id': 'https://ayamilcoders.com/#organization' },
                areaServed: 'Worldwide',
            },
            {
                '@type': 'Service',
                '@id': 'https://ayamilcoders.com/services#ai-development',
                name: 'AI Development',
                serviceType: 'AI Development',
                description: 'Custom AI chatbots, machine learning models, and automation pipelines powered by Python, OpenAI, and TensorFlow.',
                provider: { '@id': 'https://ayamilcoders.com/#organization' },
                areaServed: 'Worldwide',
            },
            {
                '@type': 'Service',
                '@id': 'https://ayamilcoders.com/services#bug-fixing',
                name: 'Bug Fixing',
                serviceType: 'Bug Fixing',
                description: 'Fast, reliable debugging and root-cause bug fixes for web, mobile, blockchain, and AI codebases — built by any team.',
                provider: { '@id': 'https://ayamilcoders.com/#organization' },
                areaServed: 'Worldwide',
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
                title="Services - Web Development, Blockchain Development, AI Development & Bug Fixing"
                description="Ayamil Coders offers four core services: Web Development (React, Laravel, Node.js), Blockchain Development (Solidity, DeFi, NFT), AI Development (Python, OpenAI, ML), and Bug Fixing for any existing codebase."
                keywords="web development services, blockchain development company, smart contract developer, AI development company, bug fixing service, fix website bugs, debug code, hire software developer Pakistan, Ayamil Coders services"
                url="https://ayamilcoders.com/services"
                schema={pageSchema}
            />
            {/* ===== PAGE HERO ===== */}
            <div className="page-hero">
                <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(80px)', background: 'rgba(41,121,242,.06)', top: '-100px', right: '-100px', pointerEvents: 'none' }}></div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <span className="section-lbl">What We Offer</span>
                    <h1 style={{ fontSize: 'clamp(32px,5vw,58px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.03em', marginTop: '10px', marginBottom: '16px' }}>
                        Expert <span className="shimmer-txt">Digital Services</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: 'var(--txt2)', maxWidth: '560px', lineHeight: 1.75 }}>
                        From custom websites to complex blockchain ecosystems — plus fast bug fixing for existing projects. Reliable, secure, and innovative solutions for businesses worldwide.
                    </p>
                </div>
            </div>

            {/* ===== SERVICES SECTION ===== */}
            <section className="sp">
                {services.map((svc, index) => (
                    <div key={svc.id} id={slugMap[svc.id]} className="svc-full" data-a="up" data-d={index + 1}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
                            <div className={`i3 ${svc.cls}`} style={{ width: '64px', height: '64px', borderRadius: '18px', flexShrink: 0 }}>
                                {svc.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '22px', color: 'var(--txt)' }}>{svc.title}</h2>
                                    {svc.badge && <span className={`tag ${svc.badgeCls}`}>{svc.badge}</span>}
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.7 }}>{svc.desc}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                            {svc.tags.map(tag => (
                                <span key={tag} className={`tag ${svc.badgeCls || 'tb'}`}>{tag}</span>
                            ))}
                        </div>
                        <div className="svc-feats">
                            {svc.features.map((feat, i) => (
                                <div key={i} className="svc-feat">
                                    <div className="feat-dot"></div>
                                    {feat}
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '22px' }}>
                            <a href="/contact" className="btn-p" style={{ padding: '10px 22px', fontSize: '13px', background: svc.btnBg }}>
                                Get a Quote →
                            </a>
                        </div>
                    </div>
                ))}
            </section>
            <div className="divider"></div>

            {/* ===== TECH STACK ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl" style={{ display: 'inline-flex' }}>Technologies</span>
                    <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        Our <span className="shimmer-txt">Tech Stack</span>
                    </h2>
                </div>
                <div className="tech-grid">
                    {technologies.map((tech, index) => (
                        <div key={tech.name} className="tech-card" data-a="scale" data-d={(index % 4) + 1}>
                            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{tech.icon}</div>
                            <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)' }}>{tech.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', marginTop: '3px' }}>{tech.label}</div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="divider"></div>

            {/* ===== PRICING ===== */}
            <section className="sp">
                <div style={{ textAlign: 'center', marginBottom: '40px' }} data-a="blur">
                    <span className="section-lbl" style={{ display: 'inline-flex' }}>Pricing</span>
                    <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                        Transparent <span className="shimmer-txt">Pricing</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '10px' }}>Custom quotes available — these are starting price ranges.</p>
                </div>
                <div className="pricing-grid">
                    {pricing.map((plan, index) => (
                        <div key={plan.tier} className={`price-card${plan.featured ? ' featured' : ''}`} data-a="scale" data-d={index + 1}>
                            {plan.badge && <span className="price-badge">{plan.badge}</span>}
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: plan.featured ? '#a78bfa' : 'var(--blue-lt)', marginBottom: '8px' }}>
                                {plan.tier}
                            </div>
                            <div className="price-amt" style={plan.featured ? { WebkitTextFillColor: 'var(--blue-lt)' } : {}}>
                                {plan.price}
                            </div>
                            <div className="price-per">{plan.per}</div>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--brd)', margin: '16px 0' }} />
                            <ul className="price-feats">
                                {plan.features.map((feat, i) => (
                                    <li key={i}>{feat}</li>
                                ))}
                            </ul>
                            <a href="/contact" className={plan.btnClass} style={{ width: '100%', justifyContent: 'center' }}>
                                {plan.btnText}
                            </a>
                        </div>
                    ))}
                </div>
            </section>
            <div className="divider"></div>

            {/* ===== FAQ ===== */}
            <section className="sp">
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '36px' }} data-a="blur">
                        <span className="section-lbl" style={{ display: 'inline-flex' }}>FAQ</span>
                        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '8px' }}>
                            Frequently Asked <span className="shimmer-txt">Questions</span>
                        </h2>
                    </div>
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item${openFaq === index ? ' open' : ''}`} data-a="up" data-d={index + 1}>
                            <div className="faq-q" onClick={() => toggleFaq(index)}>
                                {faq.q}
                                <span className="faq-arr">+</span>
                            </div>
                            <div className="faq-a">{faq.a}</div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}