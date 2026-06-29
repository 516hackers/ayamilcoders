import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AyamilLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();
    const currentPath = url.split('?')[0].replace(/\/$/, '') || '/';

    const isActive = (href: string) => {
        const normalized = href.replace(/\/$/, '') || '/';
        return currentPath === normalized;
    };

    const getPageTitle = () => {
        if (currentPath === '/') return 'Home';
        if (currentPath === '/services') return 'Services';
        if (currentPath === '/about') return 'About';
        if (currentPath === '/careers') return 'Careers';
        if (currentPath === '/contact') return 'Contact';
        if (currentPath.startsWith('/privacy')) return 'Privacy Policy';
        if (currentPath.startsWith('/terms')) return 'Terms';
        if (currentPath.startsWith('/refund')) return 'Refund Policy';
        if (currentPath.startsWith('/cookie')) return 'Cookie Policy';
        if (currentPath.startsWith('/disclaimer')) return 'Disclaimer';
        return 'Ayamil Coders';
    };

    const isHomePage = currentPath === '/';

    // ===== SITEWIDE WEBSITE + ORGANIZATION JSON-LD =====
    // Injected once into every page via the shared layout so search engines
    // and LLM answer engines (AEO/GEO/LLMO) see a single consistent entity
    // graph for Ayamil Coders no matter which page was crawled first.
    useEffect(() => {
        const scriptId = 'ayamil-sitewide-schema';
        if (document.getElementById(scriptId)) return;

        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'WebSite',
                    '@id': 'https://ayamilcoders.com/#website',
                    name: 'Ayamil Coders',
                    url: 'https://ayamilcoders.com',
                    publisher: { '@id': 'https://ayamilcoders.com/#organization' },
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: 'https://ayamilcoders.com/search?q={search_term_string}',
                        'query-input': 'required name=search_term_string',
                    },
                },
                {
                    '@type': 'ProfessionalService',
                    '@id': 'https://ayamilcoders.com/#organization',
                    name: 'Ayamil Coders',
                    url: 'https://ayamilcoders.com',
                    logo: 'https://ayamilcoders.com/logo/ac-512.png',
                    image: 'https://ayamilcoders.com/logo/ac-512.png',
                    foundingDate: '2023-07-21',
                    founder: { '@type': 'Person', name: 'Muhammad Muzamil' },
                    employee: [
                        {
                            '@type': 'Person',
                            name: 'Hidden Partner',
                            jobTitle: 'Chief Executive Officer',
                            description: "Ayamil Coders' CEO, known publicly as the Hidden Partner. Their real-world identity is intentionally kept private by company policy.",
                        },
                    ],
                    email: 'info@ayamilcoders.com',
                    telephone: '+92-312-759-2672',
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: 'Sadiqabad',
                        addressRegion: 'Punjab',
                        addressCountry: 'PK',
                    },
                    areaServed: { '@type': 'Place', name: 'Worldwide' },
                    sameAs: [
                        'https://facebook.com/ayamilcoders',
                        'https://www.linkedin.com/company/ayamilcoders',
                        'https://www.instagram.com/ayamilcoders',
                        'https://www.fiverr.com/muzamil516',
                    ],
                    knowsAbout: [
                        'Web Development', 'Blockchain Development', 'AI Development', 'Bug Fixing',
                    ],
                    hasOfferCatalog: {
                        '@type': 'OfferCatalog',
                        name: 'Ayamil Coders Services',
                        itemListElement: [
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', serviceType: 'Web Development', url: 'https://ayamilcoders.com/services#web-development' } },
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blockchain Development', serviceType: 'Blockchain Development', url: 'https://ayamilcoders.com/services#blockchain-development' } },
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Development', serviceType: 'AI Development', url: 'https://ayamilcoders.com/services#ai-development' } },
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bug Fixing', serviceType: 'Bug Fixing', url: 'https://ayamilcoders.com/services#bug-fixing' } },
                        ],
                    },
                },
            ],
        });
        document.head.appendChild(script);
        // Intentionally not removed on unmount — this schema is valid for
        // every route, so it should persist across client-side navigations.
    }, []);

    // ===== EXTRACTED CSS FOR LAYOUT (from index.html <style> tag) =====
    useEffect(() => {
        const styleId = 'ayamil-layout-css';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Force native form controls / scrollbars to match the actual
               dark theme. Without this, the browser computes color-scheme
               as "light" by default, which mismatches data-theme="dark"
               and was flagged by Lighthouse's contrast/accessibility audit. */
            html[data-theme="dark"]{color-scheme:dark !important}
            html[data-theme="light"]{color-scheme:light !important}

            /* --txt3 (the "tertiary/muted" text token) is too low-contrast
               against the dark background for body/label text and has been
               repeatedly flagged by Lighthouse across many different
               elements (.ti-lbl, .sal, .srow-d, footer text, etc). Rather
               than patch each usage individually, alias it to --txt2
               (the readable secondary color already used for body copy)
               so every current and future usage of --txt3 passes contrast. */
            html{--txt3:var(--txt2) !important}

            /* .nav-lbl (sidebar "Home"/"Services"/"About" labels) is defined
               in shared.css with insufficient contrast for inactive items;
               override here since shared.css isn't directly editable. */
            #sidebar .nav-lbl{color:var(--txt2) !important}

            /* ══════ FOOTER EXTRA ══════ */
            @media(max-width:639px){.footer{padding:36px 16px 80px}}
            [data-theme="light"] .flinks a:hover{color:var(--blue-dk)}

            /* ══════ MOBILE APP SHELL ≤639px ══════ */
            #sb{display:none}
            @media(max-width:639px){
                #sidebar{display:none!important}
                .mw{display:none}
                #sb{
                    display:flex;position:fixed;top:0;left:0;right:0;z-index:200;
                    height:calc(50px + var(--safe-t));padding:var(--safe-t) 16px 0;
                    align-items:center;justify-content:space-between;
                    background:var(--nav-bg);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
                    border-bottom:1px solid var(--brd);transition:background .3s
                }
                .sb-brand{display:flex;align-items:center;gap:9px}
                .sb-logo{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--blue-dk),var(--blue));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;font-family:var(--disp);box-shadow:0 2px 8px rgba(41,121,242,.4)}
                .sb-name{font-family:var(--disp);font-weight:700;font-size:15px;color:var(--txt)}
                .sb-r{display:flex;align-items:center;gap:10px}
                .sb-signal{display:flex;align-items:center;gap:3px}
                .sb-bar{background:var(--txt3);border-radius:1px;width:3px}
                .mobile-theme{width:38px;height:38px;border-radius:11px;background:var(--surf);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;cursor:pointer;-webkit-tap-highlight-color:transparent;font-size:18px;transition:all .2s}
            }

            /* Bottom Tab Bar */
            #tbar{display:none}
            @media(max-width:639px){
                #tbar{
                    display:flex;position:fixed;bottom:0;left:0;right:0;z-index:200;
                    height:calc(64px + var(--safe-b));padding-bottom:var(--safe-b);
                    background:var(--nav-bg);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
                    border-top:1px solid var(--brd);align-items:center;justify-content:space-around;
                    transition:background .3s
                }
                .ti-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 2px;cursor:pointer;position:relative;border:none;background:none;-webkit-tap-highlight-color:transparent}
                .ti-icon{width:36px;height:36px;border-radius:12px;display:flex;align-items:center;justify-content:center;transition:all .25s cubic-bezier(.34,1.56,.64,1)}
                .ti-btn.act .ti-icon{background:rgba(41,121,242,.18);transform:translateY(-2px) scale(1.08)}
                .ti-ico{color:var(--txt3);transition:color .2s}
                .ti-btn.act .ti-ico{color:var(--blue)}
                .ti-lbl{font-size:10px;font-weight:600;color:var(--txt2);font-family:var(--font);transition:color .2s;letter-spacing:.01em}
                .ti-btn.act .ti-lbl{color:var(--blue-lt)}
                [data-theme="light"] .ti-btn.act .ti-lbl{color:var(--blue-dk)}
                .ti-dot{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--blue);opacity:0;transition:opacity .2s}
                .ti-btn.act .ti-dot{opacity:1}
                .tab-rip{position:absolute;border-radius:50%;background:rgba(41,121,242,.2);animation:ripple .5s ease-out forwards;pointer-events:none}
            }

            /* Mobile Screens - Layout only */
            #mscr{display:none}
            @media(max-width:639px){
                #mscr{
                    display:block;position:fixed;
                    top:calc(50px + var(--safe-t));
                    bottom:calc(64px + var(--safe-b));
                    left:0;right:0;overflow:hidden
                }
                .asc{
                    position:absolute;top:0;left:0;right:0;bottom:0;
                    overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;
                    overscroll-behavior-y:contain;background:var(--bg);transition:background .3s;
                    scrollbar-width:none
                }
                .asc::-webkit-scrollbar{display:none}
                .asc.s-hide-r{transform:translateX(100%);opacity:0;pointer-events:none;transition:transform .38s cubic-bezier(.4,0,.2,1),opacity .3s}
                .asc.s-hide-l{transform:translateX(-100%);opacity:0;pointer-events:none;transition:transform .38s cubic-bezier(.4,0,.2,1),opacity .3s}
                .asc.s-act{transform:translateX(0);opacity:1;transition:transform .38s cubic-bezier(.4,0,.2,1),opacity .3s}
            }

            /* Mobile Screen Header */
            .ash{padding:14px 16px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;background:var(--bg);backdrop-filter:blur(12px);border-bottom:1px solid var(--brd);transition:background .3s}
            .ash-t{font-family:var(--disp);font-weight:800;font-size:20px;color:var(--txt)}
            .ash-btn{width:36px;height:36px;border-radius:11px;background:var(--surf);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--txt2);-webkit-tap-highlight-color:transparent;transition:all .15s}
            .ash-btn:active{transform:scale(.92)}

            /* notification toast */
            .notif{
                position:fixed;top:calc(56px + var(--safe-t));left:16px;right:16px;z-index:500;
                background:var(--bg2);border:1px solid var(--brd2);border-radius:var(--r-lg);padding:14px 16px;
                display:flex;align-items:center;gap:12px;
                box-shadow:0 8px 32px rgba(0,0,0,.25);
                animation:notifSlide 3.5s ease forwards;pointer-events:none
            }
            [data-theme="light"] .notif{box-shadow:0 8px 32px rgba(41,121,242,.12)}

            /* floating action btn */
            .fab{
                position:fixed;right:20px;bottom:calc(80px + var(--safe-b));z-index:150;
                width:52px;height:52px;border-radius:16px;
                background:linear-gradient(135deg,var(--blue-dk),var(--blue));
                box-shadow:0 6px 24px rgba(41,121,242,.5),inset 0 1px 0 rgba(255,255,255,.15);
                display:none;align-items:center;justify-content:center;
                cursor:pointer;border:none;-webkit-tap-highlight-color:transparent;
                transition:transform .2s cubic-bezier(.34,1.56,.64,1);color:#fff
            }
            @media(max-width:639px){.fab{display:flex}}
            .fab:active{transform:scale(.92)}
            .fab-badge{
                position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:50%;
                background:#c0291c;border:2px solid var(--bg2);
                font-size:9px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center
            }

            /* search overlay */
            #srch-overlay{
                position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);
                display:none;align-items:flex-start;justify-content:center;padding:calc(56px + var(--safe-t) + 12px) 16px 0
            }
            #srch-overlay.open{display:flex}
            .srch-box{
                width:100%;background:var(--bg2);border:1px solid var(--brd2);border-radius:var(--r-xl);
                padding:4px 6px;display:flex;align-items:center;gap:10px;
                box-shadow:0 12px 40px rgba(41,121,242,.2);animation:scaleIn .25s ease
            }
            .srch-input{flex:1;background:none;border:none;padding:10px 6px;font-family:var(--font);font-size:15px;color:var(--txt);outline:none}
            .srch-input::placeholder{color:var(--txt3)}
            .srch-close{width:32px;height:32px;border-radius:8px;border:none;background:var(--surf);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--txt2);-webkit-tap-highlight-color:transparent}

            /* progress loader */
            #prog-bar{
                position:fixed;top:calc(50px + var(--safe-t));left:0;right:0;height:2px;z-index:201;
                background:rgba(41,121,242,.1);overflow:hidden;display:none
            }
            #prog-bar.loading .prog-fill{animation:progressBar .8s ease forwards}
            .prog-fill{height:100%;background:linear-gradient(90deg,var(--blue),var(--cyan));width:0;border-radius:2px}

            /* scroll to top */
            #stt{
                position:fixed;right:16px;bottom:calc(150px + var(--safe-b));z-index:150;
                width:38px;height:38px;border-radius:12px;
                background:var(--surf2);border:1px solid var(--brd);
                display:none;align-items:center;justify-content:center;
                cursor:pointer;-webkit-tap-highlight-color:transparent;
                box-shadow:0 4px 16px rgba(0,0,0,.15);color:var(--txt2);
                transition:all .2s
            }
            @media(max-width:639px){#stt{display:flex}}
            #stt.visible{opacity:1}
            #stt:not(.visible){opacity:0;pointer-events:none}
            #stt:active{transform:scale(.92)}

            /* ══════ LEGAL PAGES — MOBILE PILL + BOTTOM SHEET ══════ */
            #legal-pill{
                display:none;
                position:fixed;left:50%;transform:translateX(-50%);
                bottom:calc(72px + var(--safe-b) + 10px);
                z-index:149;
                background:var(--surf2);border:1px solid var(--brd);
                border-radius:999px;padding:7px 14px 7px 10px;
                align-items:center;gap:7px;
                font-size:11px;font-weight:600;font-family:var(--font);
                color:var(--txt2);cursor:pointer;
                box-shadow:0 4px 20px rgba(0,0,0,.18);
                -webkit-tap-highlight-color:transparent;
                transition:all .2s;white-space:nowrap;
                backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)
            }
            @media(max-width:639px){#legal-pill{display:flex}}
            #legal-pill:active{transform:translateX(-50%) scale(.95)}
            #legal-pill svg{flex-shrink:0}

            #legal-overlay{
                position:fixed;inset:0;z-index:400;
                background:rgba(0,0,0,.55);backdrop-filter:blur(6px);
                display:none;align-items:flex-end;justify-content:center;
                -webkit-tap-highlight-color:transparent
            }
            #legal-overlay.open{display:flex}

            #legal-sheet{
                width:100%;background:var(--bg2);
                border-radius:22px 22px 0 0;
                border-top:1px solid var(--brd);
                padding:0 0 calc(16px + var(--safe-b));
                animation:sheetUp .3s cubic-bezier(.4,0,.2,1);
                max-height:82svh;overflow-y:auto;
            }
            @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}

            .lsheet-handle{width:36px;height:4px;border-radius:999px;background:var(--brd2);margin:12px auto 0}
            .lsheet-head{display:flex;align-items:center;justify-content:space-between;padding:14px 20px 6px}
            .lsheet-title{font-family:var(--disp);font-weight:800;font-size:17px;color:var(--txt)}
            .lsheet-close{width:30px;height:30px;border-radius:9px;background:var(--surf);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--txt2);font-size:14px;-webkit-tap-highlight-color:transparent}
            .lsheet-sub{font-size:12px;color:var(--txt3);padding:0 20px 14px;border-bottom:1px solid var(--brd);margin-bottom:8px}
            .lsheet-row{display:flex;align-items:center;gap:14px;padding:13px 20px;text-decoration:none;-webkit-tap-highlight-color:transparent;transition:background .15s}
            .lsheet-row:active{background:rgba(41,121,242,.06)}
            .lsheet-ico{width:38px;height:38px;border-radius:11px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
            .lsheet-lbl{flex:1}
            .lsheet-lbl-t{font-size:14px;font-weight:600;color:var(--txt);font-family:var(--font)}
            .lsheet-lbl-d{font-size:11px;color:var(--txt3);margin-top:2px}
            .lsheet-arr{color:var(--txt3)}

            /* ══════ LEGAL PAGES — DESKTOP FOOTER BAR ══════ */
            .legal-footer-bar{
                display:flex;flex-wrap:wrap;align-items:center;gap:6px 4px;
                padding:14px 0;border-top:1px solid var(--brd);
                margin-bottom:0;
            }
            .legal-footer-bar-label{
                font-size:11px;font-family:var(--mono);color:var(--txt3);
                text-transform:uppercase;letter-spacing:.08em;margin-right:6px;
                flex-shrink:0
            }
            .lf-link{
                display:inline-flex;align-items:center;gap:5px;
                padding:5px 12px;border-radius:999px;
                background:var(--surf);border:1px solid var(--brd);
                font-size:11px;font-weight:600;color:var(--txt2);
                text-decoration:none;font-family:var(--font);
                transition:all .2s;white-space:nowrap
            }
            .lf-link:hover{
                background:rgba(41,121,242,.1);border-color:rgba(41,121,242,.3);
                color:var(--blue-lt);transform:translateY(-1px)
            }
            [data-theme="light"] .lf-link:hover{color:var(--blue-dk)}
        `;
        document.head.appendChild(style);

        return () => { document.getElementById(styleId)?.remove(); };
    }, []);

    // ===== EXTRACTED JS FOR LAYOUT (from index.html <script> tag) =====
    useEffect(() => {
        // ---- THEME ----
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const updateThemeIcons = (theme: string) => {
            const mBtn = document.getElementById('m-theme-btn');
            if (mBtn) mBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
            const dThumb = document.getElementById('d-thumb');
            if (dThumb) dThumb.textContent = theme === 'dark' ? '☀️' : '🌙';
            const dMoon = document.getElementById('d-moon');
            const dSun = document.getElementById('d-sun');
            if (dMoon) dMoon.style.opacity = theme === 'dark' ? '1' : '0.4';
            if (dSun) dSun.style.opacity = theme === 'dark' ? '0.4' : '1';
            const themeSwitch = document.getElementById('theme-switch');
            if (themeSwitch) themeSwitch.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');

            const meta = document.getElementById('theme-meta');
            if (meta) meta.content = theme === 'dark' ? '#060d1a' : '#f0f4ff';
        };
        updateThemeIcons(savedTheme);

        // ---- CLOCK ----
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

        // ---- TICKER ----
        const buildTicker = () => {
            const tickerData = [
                { v: '600+', l: 'Projects' }, { t: '✦ Web Dev' },
                { v: '2,000+', l: 'Issues Fixed' }, { t: '✦ Blockchain' },
                { v: '10+', l: 'Years Exp.' }, { t: '✦ AI & ML' },
                { v: '87%', l: 'Satisfaction' }, { t: '✦ IT Consulting' },
                { v: '50+', l: 'Countries' }, { t: '✦ Smart Contracts' },
                { t: '✦ E-Commerce' }
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

        // ---- SCROLL REVEAL (desktop) ----
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

        // ---- COUNTERS ----
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    const target = parseInt(el.dataset.t || '0', 10);
                    if (target > 0 && el.textContent === '0') {
                        let current = 0;
                        const step = target / (1800 / 16);
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                el.textContent = target + '+';
                                clearInterval(timer);
                            } else {
                                el.textContent = Math.floor(current).toString();
                            }
                        }, 16);
                    }
                    counterObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

        // ---- SKILL BARS ----
        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    el.style.width = el.dataset.w || '0%';
                    barObs.unobserve(el);
                }
            });
        }, { threshold: 0.4 });
        document.querySelectorAll('.bf').forEach(el => barObs.observe(el));

        // ---- 3D TILT ----
        document.querySelectorAll<HTMLElement>('.svc-c').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });

        // ---- SMOOTH SCROLL ----
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(a.getAttribute('href') || '');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // ---- CURSOR GLOW (desktop) ----
        if (window.innerWidth > 639) {
            const cg = document.createElement('div');
            cg.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(41,121,242,.06) 0%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:left .1s,top .1s;';
            document.body.appendChild(cg);
            const moveCursor = (e: MouseEvent) => {
                cg.style.left = e.clientX + 'px';
                cg.style.top = e.clientY + 'px';
            };
            document.addEventListener('mousemove', moveCursor);

            (window as any).__cursorCleanup = () => {
                document.removeEventListener('mousemove', moveCursor);
                cg.remove();
            };
        }

        // ---- NAV SPY ----
        const sections = document.querySelectorAll('section[id]');
        const navAs = document.querySelectorAll('.nav-a');
        const spyObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navAs.forEach(n => n.classList.remove('act'));
                    const link = document.querySelector(`.nav-a[href="#${entry.target.id}"]`);
                    if (link) link.classList.add('act');
                }
            });
        }, { rootMargin: '-30% 0px -60% 0px' });
        sections.forEach(s => spyObs.observe(s));

        // ---- LEGAL SHEET ----
        const openLegal = () => {
            document.getElementById('legal-overlay')?.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        const closeLegal = () => {
            document.getElementById('legal-overlay')?.classList.remove('open');
            document.body.style.overflow = '';
        };

        // ---- ESCAPE KEY ----
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLegal();
                document.getElementById('srch-overlay')?.classList.remove('open');
            }
        };
        document.addEventListener('keydown', handleKeydown);

        // ---- ATTACH TO WINDOW ----
        (window as any).toggleTheme = () => {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        };
        (window as any).openLegal = openLegal;
        (window as any).closeLegal = closeLegal;

        // ---- CLEANUP ----
        return () => {
            clearInterval(clockInterval);
            document.removeEventListener('keydown', handleKeydown);
            revealObs.disconnect();
            counterObs.disconnect();
            barObs.disconnect();
            spyObs.disconnect();
            if ((window as any).__cursorCleanup) {
                (window as any).__cursorCleanup();
                delete (window as any).__cursorCleanup;
            }
        };
    }, [url]);

    // Theme toggle for inline use
    const toggleTheme = () => {
        if (typeof (window as any).toggleTheme === 'function') {
            (window as any).toggleTheme();
        }
    };

    return (
        <>
            {/* ════════ MOBILE STATUS BAR ════════ */}
            <div id="sb">
                <div className="sb-brand">
                  <div className="sb-logo">
    <picture>
        <source srcSet="/logo/ac-160.webp" type="image/webp" />
        <img 
            src="/logo/ac-160.png" 
            alt="Ayamil Coders" 
            width={53}
            height={53}
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '9px' }}
        />
    </picture>
</div>
                    <span className="sb-name">Ayamil Coders</span>
                </div>
                <div className="sb-r">


                    <div className="mobile-theme" id="m-theme-btn" onClick={toggleTheme}>🌙</div>
                </div>
            </div>

            {/* ════════ PROGRESS BAR ════════ */}
            <div id="prog-bar"><div className="prog-fill"></div></div>

            {/* ════════ SEARCH OVERLAY ════════ */}
            <div id="srch-overlay" onClick={(e) => { if (e.target === e.currentTarget) { e.currentTarget.classList.remove('open'); } }}>
                <div className="srch-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input className="srch-input" id="srch-inp" placeholder="Search services, info..." autoComplete="off" onKeyDown={(e) => { if (e.key === 'Escape') { document.getElementById('srch-overlay')?.classList.remove('open'); } }} />
                    <button className="srch-close" onClick={() => document.getElementById('srch-overlay')?.classList.remove('open')}>✕</button>
                </div>
            </div>

            {/* ════════ DESKTOP SIDEBAR ════════ */}
            <nav id="sidebar">
                <div className="nav-logo">
    <picture>
        <source srcSet="/logo/ac-160.webp" type="image/webp" />
        <img 
            src="/logo/ac-160.png" 
            alt="Ayamil Coders" 
            width={53}
            height={53}
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
    </picture>
</div>
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
                </div>
                <div style={{ marginTop: '22px', width: '100%' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(41,121,242,.2),transparent)', marginBottom: '12px' }}></div>
                    <Link href="/contact" className="nav-cta">Let's Talk →</Link>
                    <div className="soc-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
                        <a href="https://facebook.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Facebook"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                        <a href="https://www.linkedin.com/company/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on LinkedIn"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                        <a href="https://www.instagram.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Instagram"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                    </div>
                    <div className="theme-btn-wrap" style={{ marginTop: '14px', justifyContent: 'flex-end' }}>
                        <span className="theme-icon" id="d-moon">🌙</span>
                        <button id="theme-switch" className="theme-btn" onClick={toggleTheme} role="switch" aria-checked="true" aria-label="Toggle dark mode">
                            <div className="theme-thumb" id="d-thumb">☀️</div>
                        </button>
                        <span className="theme-icon" id="d-sun" style={{ opacity: 0.4 }}>☀️</span>
                    </div>
                </div>
            </nav>

            {/* ════════ DESKTOP MAIN WRAP ════════ */}
            <div className="mw">
                <div className="topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--txt3)', letterSpacing: '.1em', textTransform: 'uppercase' }}>© 2026 Ayamil Coders</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--txt3)' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', animation: 'blink 2s ease infinite', display: 'inline-block' }}></span>
                            All systems operational
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <a href="mailto:info@ayamilcoders.com" style={{ fontSize: '12px', color: 'var(--txt3)', textDecoration: 'none' }}>info@ayamilcoders.com</a>
                        <a href="tel:+923127592672" style={{ fontSize: '12px', color: 'var(--txt3)', textDecoration: 'none', fontFamily: 'var(--mono)' }}>+92 312 759 2672</a>
                        <a href="https://ayamilcoders.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', fontWeight: 600, padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(41,121,242,.3)', color: 'var(--blue-lt)', textDecoration: 'none' }}>Website ↗</a>
                    </div>
                </div>

                <div className="twr"><div className="tin" id="tkr"></div></div>

                {/* DESKTOP PAGE CONTENT */}
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
                                <a href="https://facebook.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Facebook"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                                <a href="https://www.linkedin.com/company/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on LinkedIn"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                                <a href="https://instagram.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Instagram"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                            </div>
                        </div>
                        <div data-a="up" data-d="2">
                            <div className="fct">Services</div>
                            <ul className="flinks">
                                <li><Link href="/services#web-development">Web Development</Link></li>
                                <li><Link href="/services#blockchain-development">Blockchain Development</Link></li>
                                <li><Link href="/services#ai-development">AI Development</Link></li>
                                <li><Link href="/services#bug-fixing">Bug Fixing</Link></li>
                            </ul>
                        </div>
                        <div data-a="up" data-d="3">
                            <div className="fct">Company</div>
                            <ul className="flinks">
                                <li><Link href="/about">About Us</Link></li>
                                <li><a href="https://apply.ayamilcoders.com/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
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
                        <span style={{ fontSize: '12px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>© 2026 Ayamil Coders. Founded by Muhammad Muzamil. All rights reserved.</span>
                        <span style={{ fontSize: '12px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>Built with ❤️ in Sadiqabad, Punjab 🇵🇰</span>
                    </div>
                </footer>
            </div>

            {/* ════════ MOBILE SCREEN WRAPPER ════════ */}
            {/*
                CRITICAL FIX: On mobile, the desktop .mw is hidden.
                We need to render the page content inside #mscr so mobile users can see it.
                For home page, welcome.tsx manages its own #mscr with tabs.
                For all other pages, we render the page content here.
            */}
            {!isHomePage && (
                <div id="mscr">
                    <div className="asc s-act" id="scr-page">
                        <div className="ash">
                            <div className="ash-t">{getPageTitle()}</div>
                            <a href="tel:+923127592672" className="ash-btn" aria-label="Call Ayamil Coders" style={{ textDecoration: 'none', color: 'var(--txt2)' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </a>
                        </div>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/>
                </svg>
                <div className="fab-badge">WA</div>
            </button>

            {/* ════════ SCROLL TO TOP ════════ */}
            <button id="stt" aria-label="Scroll to top" onClick={() => {
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