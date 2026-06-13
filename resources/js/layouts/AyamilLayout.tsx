import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface AyamilLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AyamilLayout({ children, title: titleProp }: AyamilLayoutProps) {
    const { props, url } = usePage();
    const pageTitle = titleProp || (props as any).title || 'Ayamil Coders';

    const currentPath = url ? url.split('?')[0].replace(/\/$/, '') || '/' : '/';
    const isActive = (href: string) => {
        const normalized = href.replace(/\/$/, '') || '/';
        return currentPath === normalized;
    };

    // Is this the home/welcome page?
    const isHomePage = currentPath === '/';

    useEffect(() => {
        const reinitShared = () => {
            if (typeof (window as any).buildTicker === 'function') (window as any).buildTicker();
            if (typeof (window as any).initReveal === 'function') (window as any).initReveal();
            if (typeof (window as any).initCounters === 'function') (window as any).initCounters();
            if (typeof (window as any).initBars === 'function') (window as any).initBars();
            if (typeof (window as any).init3DTilt === 'function') (window as any).init3DTilt();
            if (typeof (window as any).initSmoothScroll === 'function') (window as any).initSmoothScroll();
        };

        const loadScript = () => {
            if (document.querySelector('script[src="/js/shared.js"]')) {
                reinitShared();
                return;
            }
            const script = document.createElement('script');
            script.src = '/js/shared.js';
            script.async = true;
            script.onload = reinitShared;
            document.body.appendChild(script);
        };
        loadScript();

        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);

        const updateClock = () => {
            const clockEl = document.getElementById('mclock');
            if (clockEl) {
                const now = new Date();
                const hours = now.getHours() % 12 || 12;
                const minutes = String(now.getMinutes()).padStart(2, '0');
                clockEl.textContent = `${hours}:${minutes}`;
            }
        };
        updateClock();
        const clockInterval = setInterval(updateClock, 30000);

        const buildTicker = () => {
            const tickerData = [
                { v: '600+', l: 'Projects' }, { t: '✦ Web Dev' },
                { v: '2,000+', l: 'Issues Fixed' }, { t: '✦ Blockchain' },
                { v: '5+', l: 'Years Exp.' }, { t: '✦ AI & ML' },
                { v: '100%', l: 'Satisfaction' }, { t: '✦ IT Consulting' },
                { v: '30+', l: 'Countries' }, { t: '✦ Smart Contracts' }
            ];
            const tkrEl = document.getElementById('tkr');
            if (tkrEl && !tkrEl.innerHTML) {
                let html = '';
                for (let i = 0; i < 2; i++) {
                    tickerData.forEach(x => {
                        if ('t' in x) {
                            html += `<div class="ti"><span style="font-family:var(--mono);font-size:12px;color:var(--green);">${x.t}</span></div>`;
                        } else {
                            html += `<div class="ti"><span style="font-family:var(--disp);font-weight:700;font-size:15px;color:var(--blue);">${(x as any).v}</span><span style="font-size:13px;color:var(--txt3);">${(x as any).l}</span></div>`;
                        }
                    });
                }
                tkrEl.innerHTML = html;
            }
        };
        buildTicker();

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                document.getElementById('legal-overlay')?.classList.remove('open');
                document.body.style.overflow = '';
            }
        };
        document.addEventListener('keydown', handleKeydown);

        // Scroll-to-top: on non-home pages track window scroll
        const sttBtn = document.getElementById('stt');
        const handleWindowScroll = () => {
            if (!isHomePage && sttBtn) {
                sttBtn.classList.toggle('visible', window.scrollY > 200);
            }
        };
        if (!isHomePage) {
            window.addEventListener('scroll', handleWindowScroll, { passive: true });
        }

        return () => {
            clearInterval(clockInterval);
            document.removeEventListener('keydown', handleKeydown);
            if (!isHomePage) window.removeEventListener('scroll', handleWindowScroll);
        };
    }, [isHomePage]);

    const updateThemeIcons = (theme: string) => {
        const mBtn = document.getElementById('m-theme-btn');
        if (mBtn) mBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
        const dThumb = document.getElementById('d-thumb');
        const dMoon = document.getElementById('d-moon');
        const dSun = document.getElementById('d-sun');
        if (dThumb) dThumb.textContent = theme === 'dark' ? '☀️' : '🌙';
        if (dMoon) dMoon.style.opacity = theme === 'dark' ? '1' : '0.4';
        if (dSun) dSun.style.opacity = theme === 'dark' ? '0.4' : '1';
    };

    const toggleTheme = () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    };

    // Page title for mobile header bar
    const mobilePageTitle =
        currentPath === '/careers'        ? 'Careers'        :
        currentPath === '/contact'        ? 'Contact'        :
        currentPath === '/about'          ? 'About'          :
        currentPath === '/services'       ? 'Services'       :
        currentPath.startsWith('/privacy')   ? 'Privacy Policy' :
        currentPath.startsWith('/terms')     ? 'Terms'          :
        currentPath.startsWith('/refund')    ? 'Refund Policy'  :
        currentPath.startsWith('/cookie')    ? 'Cookie Policy'  :
        currentPath.startsWith('/disclaimer')? 'Disclaimer'     :
        'Ayamil Coders';

    return (
        <>
            {/* ════════ MOBILE STATUS BAR ════════ */}
            <div id="sb">
                <div className="sb-brand">
                    <div className="sb-logo">AC</div>
                    <span className="sb-name">Ayamil Coders</span>
                </div>
                <div className="sb-r">
                    <div className="sb-signal">
                        <div className="sb-bar" style={{ height: '5px', opacity: 0.4 }}></div>
                        <div className="sb-bar" style={{ height: '8px', opacity: 0.6 }}></div>
                        <div className="sb-bar" style={{ height: '11px', opacity: 0.8 }}></div>
                        <div className="sb-bar" style={{ height: '14px', opacity: 1 }}></div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                        <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                        <circle cx="12" cy="20" r="1" fill="var(--txt2)"/>
                    </svg>
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                        <rect x=".5" y=".5" width="18" height="11" rx="2.5" stroke="var(--txt2)"/>
                        <rect x="2" y="2" width="14" height="8" rx="1.5" fill="var(--txt2)"/>
                        <path d="M20 4v4a2 2 0 0 0 0-4z" fill="var(--txt2)" opacity=".5"/>
                    </svg>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--txt2)' }} id="mclock">9:41</span>
                    <div className="mobile-theme" id="m-theme-btn" onClick={toggleTheme}>🌙</div>
                </div>
            </div>

            {/* ════════ DESKTOP SIDEBAR ════════ */}
            <nav id="sidebar">
                <div className="nav-logo">AC</div>
                <div className="nav-links">
                    <Link href="/" className={`nav-a${isActive('/') ? ' act' : ''}`}><span className="nav-lbl">Home</span><span className="nav-dot"></span></Link>
                    <Link href="/services" className={`nav-a${isActive('/services') ? ' act' : ''}`}><span className="nav-lbl">Services</span><span className="nav-dot"></span></Link>
                    <Link href="/about" className={`nav-a${isActive('/about') ? ' act' : ''}`}><span className="nav-lbl">About</span><span className="nav-dot"></span></Link>
                    <Link href="/careers" className={`nav-a${isActive('/careers') ? ' act' : ''}`}><span className="nav-lbl">Careers</span><span className="nav-dot"></span></Link>
                    <Link href="/contact" className={`nav-a${isActive('/contact') ? ' act' : ''}`}><span className="nav-lbl">Contact</span><span className="nav-dot"></span></Link>
                    <Link href="/privacy-policy" className={`nav-a${isActive('/privacy-policy') ? ' act' : ''}`}><span className="nav-lbl">Privacy</span><span className="nav-dot"></span></Link>
                </div>
                <div style={{ marginTop: '8px', width: '100%' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(41,121,242,.15),transparent)', marginBottom: '8px' }}></div>
                    <div style={{ fontSize: '9px', fontFamily: 'var(--mono)', color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'right', paddingRight: '2px', marginBottom: '6px' }}>Legal</div>
                    <Link href="/terms" className="nav-a" style={{ fontSize: '11px', opacity: 0.8 }}><span className="nav-lbl">Terms</span><span className="nav-dot"></span></Link>
                    <Link href="/refund-policy" className="nav-a" style={{ fontSize: '11px', opacity: 0.8 }}><span className="nav-lbl">Refunds</span><span className="nav-dot"></span></Link>
                    <Link href="/cookie-policy" className="nav-a" style={{ fontSize: '11px', opacity: 0.8 }}><span className="nav-lbl">Cookies</span><span className="nav-dot"></span></Link>
                    <Link href="/disclaimer" className="nav-a" style={{ fontSize: '11px', opacity: 0.8 }}><span className="nav-lbl">Disclaimer</span><span className="nav-dot"></span></Link>
                </div>
                <div style={{ marginTop: '22px', width: '100%' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(41,121,242,.2),transparent)', marginBottom: '12px' }}></div>
                    <Link href="/contact" className="nav-cta">Let's Talk →</Link>
                    <div className="soc-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
                        <a href="https://facebook.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="soc-a"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="soc-a"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                    </div>
                    <div className="theme-btn-wrap" style={{ marginTop: '14px', justifyContent: 'flex-end' }}>
                        <span className="theme-icon" id="d-moon">🌙</span>
                        <button className="theme-btn" onClick={toggleTheme} role="switch">
                            <div className="theme-thumb" id="d-thumb">☀️</div>
                        </button>
                        <span className="theme-icon" id="d-sun" style={{ opacity: 0.4 }}>☀️</span>
                    </div>
                </div>
            </nav>

            {/* ════════════════════════════════════════════════════════════
                ROOT CAUSE FIX — welcome.tsx mobile screens
                ════════════════════════════════════════════════════════════
                shared.css layout:
                  • .mw  → visible on DESKTOP (≥1024px), display:none on mobile
                  • #mscr → visible on MOBILE  (<1024px),  display:none on desktop

                The problem: {children} is rendered inside <main> which lives
                inside <div className="mw">. On mobile .mw is display:none, so
                ALL children content is hidden — including welcome.tsx's own
                #mscr block (which is just a child of .mw).

                The fix:
                  • HOME PAGE  → render {children} OUTSIDE .mw, at the root
                    level, so welcome.tsx's #mscr is visible on mobile AND its
                    desktop sections are visible inside .mw (we still render
                    the desktop sections from welcome.tsx inside .mw too).
                  • OTHER PAGES → render {children} inside .mw (desktop) AND
                    wrap them in a single-screen #mscr (mobile).
                ════════════════════════════════════════════════════════════ */}

            {/* ── HOME PAGE: render children at root so #mscr is NOT trapped in .mw ── */}
            {isHomePage && children}

            {/* ════════ DESKTOP MAIN WRAP (.mw hidden on mobile by shared.css) ════════ */}
            <div className="mw">
                <div className="topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--txt3)', letterSpacing: '.1em', textTransform: 'uppercase' }}>© 2025 Ayamil Coders</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--txt3)' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', animation: 'blink 2s ease infinite', display: 'inline-block' }}></span>
                            All systems operational
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <a href="mailto:info@ayamilcoders.com" style={{ fontSize: '12px', color: 'var(--txt3)', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue-lt)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--txt3)')}>info@ayamilcoders.com</a>
                        <a href="tel:+923127592672" style={{ fontSize: '12px', color: 'var(--txt3)', textDecoration: 'none', fontFamily: 'var(--mono)', transition: 'color .2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue-lt)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--txt3)')}>+92 312 759 2672</a>
                        <a href="https://ayamilcoders.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', fontWeight: 600, padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(41,121,242,.3)', color: 'var(--blue-lt)', textDecoration: 'none', transition: 'all .2s' }} onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(41,121,242,.1)')} onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>Website ↗</a>
                    </div>
                </div>

                <div className="twr"><div className="tin" id="tkr"></div></div>

                {/* Desktop content: for home page we render children again here for desktop
                    sections (hero, stats, services etc). For other pages this is the only render. */}
                <main>{children}</main>

                {/* ════════ FOOTER ════════ */}
                <footer className="footer">
                    <div className="fgrid">
                        <div data-a="up" data-d="1">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'linear-gradient(135deg,var(--blue-dk),var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(41,121,242,.35)' }}>AC</div>
                                <div>
                                    <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '14px', color: 'var(--txt)' }}>Ayamil Coders</div>
                                    <div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>Software House</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.7 }}>Pakistan's premier software house — delivering smart digital solutions worldwide.</p>
                            <div className="soc-row" style={{ marginTop: '12px' }}>
                                <a href="https://facebook.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="soc-a"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="soc-a"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                            </div>
                        </div>
                        <div data-a="up" data-d="2">
                            <div className="fct">Services</div>
                            <ul className="flinks">
                                <li><Link href="/services">Web Development</Link></li>
                                <li><Link href="/services">Blockchain & Web3</Link></li>
                                <li><Link href="/services">AI & Automation</Link></li>
                                <li><Link href="/services">IT Consulting</Link></li>
                            </ul>
                        </div>
                        <div data-a="up" data-d="3">
                            <div className="fct">Company</div>
                            <ul className="flinks">
                                <li><a href="https://ayamilcoders.com/about-us" target="_blank" rel="noopener noreferrer">About Us</a></li>
                                <li><a href="https://ayamilcoders.com/portfolio" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
                                <li><a href="https://apply.ayamilcoders.com" target="_blank" rel="noopener noreferrer">Careers</a></li>
                                <li><a href="https://itinstitute.ayamilcoders.com" target="_blank" rel="noopener noreferrer">IT Institute</a></li>
                            </ul>
                        </div>
                        <div data-a="up" data-d="4">
                            <div className="fct">Connect</div>
                            <ul className="flinks">
                                <li><a href="mailto:info@ayamilcoders.com">info@ayamilcoders.com</a></li>
                                <li><a href="tel:+923127592672" style={{ fontFamily: 'var(--mono)' }}>+92 312 759 2672</a></li>
                                <li style={{ fontSize: '13px', color: 'var(--txt3)' }}>Sadiqabad, Punjab, Pakistan</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ paddingTop: '20px', borderTop: '1px solid var(--brd)', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between' }}>
                        <div className="legal-footer-bar" style={{ width: '100%', borderTop: 'none', paddingTop: 0, paddingBottom: '14px', marginBottom: '14px', borderBottom: '1px solid var(--brd)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 4px' }}>
                            <span className="legal-footer-bar-label">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                Legal
                            </span>
                            <Link href="/privacy-policy" className="lf-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Privacy Policy</Link>
                            <Link href="/terms" className="lf-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Terms &amp; Conditions</Link>
                            <Link href="/refund-policy" className="lf-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg> Refund Policy</Link>
                            <Link href="/cookie-policy" className="lf-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg> Cookie Policy</Link>
                            <Link href="/disclaimer" className="lf-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg> Disclaimer</Link>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>© 2025 Ayamil Coders. Founded by Muhammad Muzamil. All rights reserved.</span>
                        <span style={{ fontSize: '12px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>Built with ❤️ in Sadiqabad, Punjab 🇵🇰</span>
                    </div>
                </footer>
            </div>

            {/* ════════ MOBILE SCREEN WRAPPER (non-home pages only) ════════
                On non-home pages we wrap {children} in #mscr > .asc.s-act
                so the content is visible on mobile (shared.css shows #mscr,
                hides .mw on mobile). welcome.tsx manages its own #mscr so
                it is excluded here completely.
            ════════ */}
            {!isHomePage && (
                <div id="mscr">
                    <div className="asc s-act" id="scr-page">
                        {/* Mobile page header */}
                        <div className="ash">
                            <div className="ash-t">{mobilePageTitle}</div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <a href="tel:+923127592672" className="ash-btn" style={{ textDecoration: 'none', color: 'var(--txt2)' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </a>
                            </div>
                        </div>
                        {/* Page content — renders Careers, Contact, About etc. */}
                        <div style={{ paddingBottom: '80px' }}>
                            {children}
                        </div>
                    </div>
                </div>
            )}

            {/* ════════ MOBILE BOTTOM TAB BAR ════════ */}
            <div id="tbar">
                <Link href="/" className={`ti-btn${isActive('/') ? ' act' : ''}`} id="tab-0">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
                    <span className="ti-lbl">Home</span><span className="ti-dot"></span>
                </Link>
                <Link href="/services" className={`ti-btn${isActive('/services') ? ' act' : ''}`} id="tab-1">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                    <span className="ti-lbl">Services</span><span className="ti-dot"></span>
                </Link>
                <Link href="/about" className={`ti-btn${isActive('/about') ? ' act' : ''}`} id="tab-2">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg></div>
                    <span className="ti-lbl">About</span><span className="ti-dot"></span>
                </Link>
                <Link href="/contact" className={`ti-btn${isActive('/contact') ? ' act' : ''}`} id="tab-3">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                    <span className="ti-lbl">Contact</span><span className="ti-dot"></span>
                </Link>
            </div>

            {/* ════════ FAB (WhatsApp) ════════ */}
            <button className="fab" onClick={() => window.open('https://wa.me/923127592672', '_blank')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg>
                <div className="fab-badge">WA</div>
            </button>

            {/* ════════ SCROLL TO TOP ════════ */}
            <button id="stt" onClick={() => {
                const activeScr = document.querySelector<HTMLElement>('.asc.s-act');
                if (activeScr && activeScr.scrollHeight > activeScr.clientHeight) {
                    activeScr.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
            </button>

            {/* ════════ LEGAL PILL (Mobile) ════════ */}
            <button id="legal-pill" onClick={() => { document.getElementById('legal-overlay')?.classList.add('open'); document.body.style.overflow = 'hidden'; }} aria-label="Legal pages">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Legal &amp; Policies
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>

            {/* ════════ LEGAL BOTTOM SHEET (Mobile) ════════ */}
            <div id="legal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { e.currentTarget.classList.remove('open'); document.body.style.overflow = ''; } }}>
                <div id="legal-sheet">
                    <div className="lsheet-handle"></div>
                    <div className="lsheet-head">
                        <span className="lsheet-title">Legal &amp; Policies</span>
                        <div className="lsheet-close" onClick={() => { document.getElementById('legal-overlay')?.classList.remove('open'); document.body.style.overflow = ''; }}>✕</div>
                    </div>
                    <p className="lsheet-sub">Ayamil Coders — Transparent policies for our global clients.</p>
                    <Link href="/privacy-policy" className="lsheet-row"><div className="lsheet-ico i3 ib"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Privacy Policy</div><div className="lsheet-lbl-d">How we collect, use &amp; protect your data</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/terms" className="lsheet-row"><div className="lsheet-ico i3 ip"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Terms &amp; Conditions</div><div className="lsheet-lbl-d">Rules governing use of our services</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/refund-policy" className="lsheet-row"><div className="lsheet-ico i3 ig"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Refund Policy</div><div className="lsheet-lbl-d">Our cancellation &amp; refund terms</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/cookie-policy" className="lsheet-row"><div className="lsheet-ico i3 ia"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1" fill="white"/><circle cx="15" cy="9" r="1" fill="white"/><circle cx="9" cy="15" r="1" fill="white"/><circle cx="15" cy="15" r="1" fill="white"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Cookie Policy</div><div className="lsheet-lbl-d">How we use cookies &amp; tracking</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/disclaimer" className="lsheet-row"><div className="lsheet-ico" style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'linear-gradient(135deg,#92400e,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Disclaimer</div><div className="lsheet-lbl-d">Limitations of liability &amp; warranties</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/contact" className="lsheet-row"><div className="lsheet-ico i3 ib" style={{ background: 'linear-gradient(135deg,#0369a1,#0ea5e9)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Contact Us</div><div className="lsheet-lbl-d">Questions about our policies? Reach out</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                </div>
            </div>
        </>
    );
}