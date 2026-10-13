import React, { Suspense, lazy, useEffect, useLayoutEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import CommandPalette from '@/components/CommandPalette';
// The 14 interactive tools live in their own JS chunk rather than inflating
// the initial public-page bundle. Search and the core shell stay immediate.
const InteractiveTools = lazy(() => import('@/components/InteractiveTools'));
import { Moon, Sun, House, Code2, UsersRound, BriefcaseBusiness, ShieldCheck, FileText, RotateCcw, History, Search, Command, LayoutGrid } from 'lucide-react';

// Identical ticker markup for server rendering and the browser's first render.
const TICKER_ITEMS: Array<{ value: string; label: string } | { text: string }> = [
    { value: '600+', label: 'Projects' }, { text: '✦ Web Dev' },
    { value: '2,000+', label: 'Issues Fixed' }, { text: '✦ Blockchain' },
    { value: '10+', label: 'Years Exp.' }, { text: '✦ AI & ML' },
    { value: '87%', label: 'Satisfaction' }, { text: '✦ IT Consulting' },
    { value: '50+', label: 'International Clients' }, { text: '✦ Smart Contracts' },
    { text: '✦ E-Commerce' },
];

export default function AyamilLayout({ children }: { children: React.ReactNode }) {
    // SSR and the browser must render identical initial attributes. The saved
    // theme is read only after hydration has completed.
    const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
    const [commandOpen, setCommandOpen] = useState(false);
    // Load the optional tools bundle only when someone asks for it.
    // Keeping this off the initial homepage path eliminates the tools/icons CSS/JS chain.
    const [toolsEnabled, setToolsEnabled] = useState(false);
    const [firstTool, setFirstTool] = useState<string | null>(null);
    const toolsEnabledRef = React.useRef(false);
    useEffect(() => {
        const openOnDemand = (event: Event) => {
            if (toolsEnabledRef.current) return;
            const id = (event as CustomEvent<string>).detail || 'launcher';
            setFirstTool(id);
            toolsEnabledRef.current = true;
            setToolsEnabled(true);
        };
        const keyboardOnDemand = (event: KeyboardEvent) => {
            if (toolsEnabledRef.current || event.altKey || event.ctrlKey || event.metaKey) return;
            if (!(event.shiftKey && /^[mdcphagnsu]$/i.test(event.key))) return;
            const target = event.target as HTMLElement | null;
            if (target?.closest('input,textarea,select,[contenteditable]')) return;
            const map: Record<string,string> = {m:'navigator',d:'lens',c:'compare',p:'preview',h:'trail',a:'access',g:'decision',n:'notes',s:'share',u:'updates'};
            const requested = map[event.key.toLowerCase()];
            if (requested) openOnDemand(new CustomEvent('ayamil:tool', {detail:requested}));
        };
        window.addEventListener('ayamil:tool', openOnDemand);
        window.addEventListener('keydown', keyboardOnDemand);
        return () => {
            window.removeEventListener('ayamil:tool', openOnDemand);
            window.removeEventListener('keydown', keyboardOnDemand);
        };
    }, []);

    // Remove the pre-JS homepage skeleton OUTSIDE #app after React mounts.
    // Inserting arbitrary nodes into #app before hydration breaks SSR.
    useEffect(() => {
        const skeleton = document.getElementById('wskel');
        if (!skeleton) return;
        const frame = requestAnimationFrame(() => skeleton.remove());
        return () => cancelAnimationFrame(frame);
    }, []);

    const { url } = usePage();
    const currentPath = url.split(/[?#]/)[0].replace(/\/$/, '') || '/';

    const isActive = (href: string) => {
        const normalized = href.replace(/\/$/, '') || '/';
        return currentPath === normalized;
    };

    const getPageTitle = () => {
        if (currentPath === '/') return 'Home';
        if (currentPath === '/services') return 'Services';
        if (currentPath === '/about') return 'About';
        if (currentPath === '/company-registration') return 'Company Registration';
        if (currentPath === '/careers') return 'Careers';
        if (currentPath === '/updates') return 'Updates & Changelog';
        if (currentPath === '/contact') return 'Contact';
        if (currentPath.startsWith('/privacy')) return 'Privacy Policy';
        if (currentPath.startsWith('/terms')) return 'Terms';
        if (currentPath.startsWith('/refund')) return 'Refund Policy';
        if (currentPath.startsWith('/cookie')) return 'Cookie Policy';
        if (currentPath.startsWith('/disclaimer')) return 'Disclaimer';
        return 'Ayamil Coders';
    };

    const isHomePage = currentPath === '/';


    // Clear route-specific overlays and retained mobile scroll positions before
    // the new page paints. Inertia keeps the public layout mounted between routes.
    useLayoutEffect(() => {
        document.getElementById('legal-overlay')?.classList.remove('open');
        setCommandOpen(false);
        document.body.style.overflow = '';
        const innerScroll = document.getElementById('scr-page');
        if (innerScroll) innerScroll.scrollTop = 0;
        document.getElementById('stt')?.classList.remove('visible');
    }, [currentPath]);

    // ===== SCROLL CONTROLS: DESKTOP + BOTH MOBILE ROUTING SYSTEMS =====
    useEffect(() => {
        let lastY = 0;
        let lastSurface: Element | Window | null = null;
        let hidden = false;
        let idleTimer: ReturnType<typeof setTimeout> | undefined;
        const setHidden = (value: boolean) => {
            if (hidden === value) return;
            hidden = value;
            document.querySelectorAll<HTMLElement>('.fab, #legal-pill, #stt').forEach(el => {
                el.classList.toggle('floaty-hide', value);
            });
        };
        const update = (event?: Event) => {
            const active = document.querySelector<HTMLElement>('.asc.s-act')
                || (window.innerWidth <= 639 ? document.getElementById('scr-page') : null);
            if (event && event.target !== document && event.target !== window && active
                && event.target !== active) return;
            const surface: Element | Window = active || window;
            const top = active ? active.scrollTop : window.scrollY;
            if (surface !== lastSurface) { lastSurface = surface; lastY = top; }
            const delta = top - lastY;
            lastY = top;
            document.getElementById('stt')?.classList.toggle('visible', top > 200);
            if (top < 32 || delta < -1.5) {
                clearTimeout(idleTimer);
                setHidden(false);
            } else if (delta > 1.5) {
                setHidden(true);
                clearTimeout(idleTimer);
                idleTimer = setTimeout(() => setHidden(false), 850);
            }
        };
        // Scroll events on inner elements do not bubble; capture is required.
        // A document-level listener also survives homepage portal tab changes.
        document.addEventListener('scroll', update, { passive: true, capture: true });
        window.addEventListener('scroll', update, { passive: true });
        update();
        return () => {
            document.removeEventListener('scroll', update, true);
            window.removeEventListener('scroll', update);
            clearTimeout(idleTimer);
            setHidden(false);
        };
    }, [url]);

    // MOBILE KEYBOARD UX: prevent the fixed tab bar and floating controls
    // from covering the active form field while the virtual keyboard is open.
    useEffect(() => {
        const editable = (target: EventTarget | null): boolean =>
            target instanceof Element && Boolean(target.closest('input:not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]'));
        const sync = () => document.body.classList.toggle('ac-mobile-editing',
            window.innerWidth <= 639 && editable(document.activeElement));
        const onFocusIn = () => sync();
        const onFocusOut = () => window.setTimeout(sync, 0);
        document.addEventListener('focusin', onFocusIn);
        document.addEventListener('focusout', onFocusOut);
        window.addEventListener('resize', sync, { passive: true });
        return () => {
            document.removeEventListener('focusin', onFocusIn);
            document.removeEventListener('focusout', onFocusOut);
            window.removeEventListener('resize', sync);
            document.body.classList.remove('ac-mobile-editing');
        };
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
            html[data-theme="dark"]{--txt3:#91a7c8 !important}
            html[data-theme="light"]{--txt3:#516580 !important}

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
                .mw.public-inner-page{display:block!important;margin:0!important;padding:0!important}
                .mw.public-inner-page>.topbar,.mw.public-inner-page>.twr,.mw.public-inner-page>.footer{display:none!important}
                .mw.public-inner-page>.public-page-content{
                    position:fixed;top:calc(50px + var(--safe-t));bottom:calc(64px + var(--safe-b));
                    left:0;right:0;overflow-y:auto;overflow-x:hidden;
                    -webkit-overflow-scrolling:touch;overscroll-behavior-y:contain;
                    background:var(--bg);padding-bottom:80px;scrollbar-width:none
                }
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

            /* Mobile Status Bar — notification & call icon buttons */
            .sb-icon-btn{width:38px;height:38px;border-radius:11px;background:var(--surf);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--txt2);-webkit-tap-highlight-color:transparent;transition:all .15s;text-decoration:none;position:relative;flex-shrink:0}
            .sb-icon-btn:active{transform:scale(.92)}
            .sb-icon-btn .sb-dot{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 0 2px var(--bg)}

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
        const savedTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const updateThemeIcons = (theme: string) => {
            // React owns the button attributes; never mutate them behind React.
            // This state update occurs in an effect, AFTER the initial hydration.
            setActiveTheme(theme === 'light' ? 'light' : 'dark');
            const meta = document.getElementById('theme-meta');
            if (meta) meta.content = theme === 'dark' ? '#060d1a' : '#f8faff';
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

        // The ticker is rendered declaratively in JSX below. Never inject
        // innerHTML into a React-owned node (SSR/hydration safety).


        // ---- SCROLL REVEAL (desktop) ----
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-d') ? parseFloat(entry.target.getAttribute('data-d')!) * 0.03 : 0;
                    (entry.target as HTMLElement).style.transitionDelay = delay + 's';
                    entry.target.classList.add('in');
                    // Reveal once, then stop watching — toggling 'in' off again
                    // when scrolled past made fast scrolling feel laggy, since
                    // content had to re-earn its delay + transition every time
                    // it re-entered view.
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });
        document.querySelectorAll('[data-a]').forEach(el => revealObs.observe(el));

        // ---- COUNTERS ----
        const activeCounterTimers = new Set<ReturnType<typeof setInterval>>();
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
                                activeCounterTimers.delete(timer);
                            } else {
                                el.textContent = Math.floor(current).toString();
                            }
                        }, 16);
                        activeCounterTimers.add(timer);
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

        // ---- 3D TILT / SMOOTH SCROLL ----
        // Frame-throttle decorative card movement, and disable it for reduced
        // motion or touch-only pointers. Clean up on Inertia navigation.
        const pageListenerCleanups: Array<() => void> = [];
        const canAnimatePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
            && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (canAnimatePointer) {
            document.querySelectorAll<HTMLElement>('.svc-c').forEach(card => {
                let frame = 0;
                let clientX = 0;
                let clientY = 0;
                const onMove = (event: MouseEvent) => {
                    clientX = event.clientX;
                    clientY = event.clientY;
                    if (frame) return;
                    frame = requestAnimationFrame(() => {
                        frame = 0;
                        const rect = card.getBoundingClientRect();
                        if (!rect.width || !rect.height) return;
                        const x = (clientX - rect.left) / rect.width - 0.5;
                        const y = (clientY - rect.top) / rect.height - 0.5;
                        card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
                    });
                };
                const onLeave = () => {
                    cancelAnimationFrame(frame);
                    frame = 0;
                    card.style.transform = '';
                };
                card.addEventListener('mousemove', onMove, { passive: true });
                card.addEventListener('mouseleave', onLeave);
                pageListenerCleanups.push(() => {
                    cancelAnimationFrame(frame);
                    card.removeEventListener('mousemove', onMove);
                    card.removeEventListener('mouseleave', onLeave);
                });
            });
        }
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
            const onAnchorClick = (event: MouseEvent) => {
                const href = link.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.getElementById(href.substring(1));
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                    block: 'start',
                });
            };
            link.addEventListener('click', onAnchorClick);
            pageListenerCleanups.push(() => link.removeEventListener('click', onAnchorClick));
        });

        // ---- DECORATIVE CURSOR GLOW ----
        // Only on devices with a real hover pointer; transform avoids layout
        // writes and the work is consolidated to at most once per frame.
        if (canAnimatePointer && window.innerWidth > 639) {
            const glow = document.createElement('div');
            glow.setAttribute('aria-hidden', 'true');
            glow.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(41,121,242,.06) 0%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-500px,-500px);will-change:transform;';
            document.body.appendChild(glow);
            let frame = 0;
            let x = -500;
            let y = -500;
            const onMove = (event: MouseEvent) => {
                x = event.clientX;
                y = event.clientY;
                if (frame) return;
                frame = requestAnimationFrame(() => {
                    frame = 0;
                    glow.style.transform = `translate3d(${x - 150}px,${y - 150}px,0)`;
                });
            };
            document.addEventListener('mousemove', onMove, { passive: true });
            pageListenerCleanups.push(() => {
                cancelAnimationFrame(frame);
                document.removeEventListener('mousemove', onMove);
                glow.remove();
            });
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
            const isOpen = document.getElementById('legal-overlay')?.classList.contains('open');
            document.getElementById('legal-overlay')?.classList.remove('open');
            document.body.style.overflow = '';
            if (isOpen) document.getElementById('legal-pill')?.focus();
        };

        // ---- ESCAPE KEY ----
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLegal();
                document.getElementById('srch-overlay')?.classList.remove('open');
            }
            // Keep keyboard navigation inside the open mobile legal dialog.
            if (e.key === 'Tab' && document.getElementById('legal-overlay')?.classList.contains('open')) {
                const sheet = document.getElementById('legal-sheet');
                const tabbable = Array.from(sheet?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') || []);
                const first = tabbable[0];
                const last = tabbable[tabbable.length - 1];
                if (first && last) {
                    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
                }
            }
        };
        document.addEventListener('keydown', handleKeydown);

        // ---- ATTACH TO WINDOW ----
        (window as any).toggleTheme = () => {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            html.classList.toggle('dark', newTheme === 'dark');
            html.style.colorScheme = newTheme;
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('appearance', newTheme);
            document.cookie = `appearance=${newTheme};path=/;max-age=31536000;SameSite=Lax`;
            window.dispatchEvent(new CustomEvent('ayamil:theme-changed', { detail: newTheme }));
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
            activeCounterTimers.forEach(timer => clearInterval(timer));
            pageListenerCleanups.forEach(cleanup => cleanup());
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
            {/* Slide the WhatsApp FAB / Legal pill / scroll-to-top button out
                of the way while the page is actively scrolling, so they stop
                permanently covering body text on long pages (Terms, Refund
                Policy, Disclaimer). Restricted to phone widths — on tablet/
                desktop these controls don't sit on top of reading content. */}
            <style>{`
                .fab, #legal-pill, #stt {
                    transition: transform .35s cubic-bezier(.4,0,.2,1), opacity .25s ease;
                }
                @media (max-width: 767px) {
                    .fab.floaty-hide { transform: translateY(90px) !important; opacity: 0 !important; pointer-events: none !important; }
                    #legal-pill.floaty-hide { transform: translateY(70px) !important; opacity: 0 !important; pointer-events: none !important; }
                    #stt.floaty-hide { transform: translateY(70px) !important; opacity: 0 !important; pointer-events: none !important; }
                }
            `}</style>
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
                    <button type="button" className="sb-icon-btn acv-mobile-tools" onClick={() => window.dispatchEvent(new CustomEvent('ayamil:tool', { detail: 'launcher' }))} aria-label="Open interactive tools" title="Interactive tools"><LayoutGrid size={17} aria-hidden="true"/></button>
                    <button type="button" className="sb-icon-btn" style={{cursor:'pointer'}} onClick={() => setCommandOpen(true)} aria-label="Open Command Center and search website" title="Search website"><Search size={17} aria-hidden="true"/></button>
                    <a href="tel:+923127592672" className="sb-icon-btn acv-mobile-call" aria-label="Call Ayamil Coders">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </a>
                    <button type="button" className="mobile-theme" id="m-theme-btn" onClick={toggleTheme} aria-label={activeTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}><Moon className="ac-theme-moon" size={19}/><Sun className="ac-theme-sun" size={19}/></button>
                </div>
            </div>

            {/* ════════ PROGRESS BAR ════════ */}
            <div id="prog-bar"><div className="prog-fill"></div></div>

            {/* Independent interactive tools and standalone Spotlight search (V25). */}
            <Suspense fallback={null}>
                {toolsEnabled && <InteractiveTools initialLaunch={firstTool} searchOpen={commandOpen} onSearch={() => setCommandOpen(true)} onSearchClose={() => setCommandOpen(false)} />}
            </Suspense>
            <CommandPalette open={commandOpen} onOpen={() => setCommandOpen(true)} onClose={() => setCommandOpen(false)} />

            {/* ════════ DESKTOP SIDEBAR ════════ */}
            <nav id="sidebar" aria-label="Desktop primary navigation">
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
                    <Link href="/" aria-label="Home" title="Home" className={`nav-a${isActive('/') ? ' act' : ''}`}><House className="nav-ico" size={20} aria-hidden="true"/><span className="nav-lbl">Home</span><span className="nav-dot"></span></Link>
                    <Link href="/services" prefetch="hover" aria-label="Expertise" title="Expertise" className={`nav-a${isActive('/services') ? ' act' : ''}`}><Code2 className="nav-ico" size={20} aria-hidden="true"/><span className="nav-lbl">Expertise</span><span className="nav-dot"></span></Link>
                    <Link href="/about" prefetch="hover" aria-label="Our Story" title="Our Story" className={`nav-a${isActive('/about') ? ' act' : ''}`}><UsersRound className="nav-ico" size={20} aria-hidden="true"/><span className="nav-lbl">Our Story</span><span className="nav-dot"></span></Link>
                    <Link href="/careers" prefetch="hover" aria-label="Careers" title="Careers" className={`nav-a${isActive('/careers') ? ' act' : ''}`}><BriefcaseBusiness className="nav-ico" size={20} aria-hidden="true"/><span className="nav-lbl">Careers</span><span className="nav-dot"></span></Link>
                    <Link href="/privacy-policy" prefetch="hover" aria-label="Privacy" title="Privacy" className={`nav-a${isActive('/privacy-policy') ? ' act' : ''}`}><ShieldCheck className="nav-ico" size={20} aria-hidden="true"/><span className="nav-lbl">Privacy</span><span className="nav-dot"></span></Link>
                </div>
                <div style={{ marginTop: '8px', width: '100%' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(41,121,242,.15),transparent)', marginBottom: '8px' }}></div>
                    <div style={{ fontSize: '9px', fontFamily: 'var(--mono)', color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'right', paddingRight: '2px', marginBottom: '6px' }}>Legal</div>
                    <Link href="/terms" prefetch="hover" title="Terms" aria-label="Terms" className="nav-a" style={{ fontSize: '11px', opacity: 0.8 }}><FileText className="nav-ico" size={18} aria-hidden="true"/><span className="nav-lbl">Terms</span><span className="nav-dot"></span></Link>
                    <Link href="/refund-policy" prefetch="hover" title="Refunds" aria-label="Refunds" className="nav-a" style={{ fontSize: '11px', opacity: 0.8 }}><RotateCcw className="nav-ico" size={18} aria-hidden="true"/><span className="nav-lbl">Refunds</span><span className="nav-dot"></span></Link>
                </div>
                <div style={{ marginTop: '22px', width: '100%' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(41,121,242,.2),transparent)', marginBottom: '12px' }}></div>
                    <Link href="/contact" className="nav-cta">Let's Connect →</Link>
                    <div className="soc-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
                        <a href="https://facebook.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Facebook"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                        <a href="https://www.linkedin.com/company/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on LinkedIn"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                        <a href="https://www.instagram.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Instagram"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                    </div>
                    <div className="theme-btn-wrap" style={{ marginTop: '14px', justifyContent: 'flex-end' }}>
                        <span className="theme-icon" id="d-moon"><Moon size={16}/></span>
                        <button id="theme-switch" className="theme-btn" onClick={toggleTheme} type="button" role="switch" aria-checked={activeTheme === 'dark'} aria-label={activeTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                            <div className="theme-thumb" id="d-thumb"><Sun className="ac-thumb-dark" size={12}/><Moon className="ac-thumb-light" size={12}/></div>
                        </button>
                        <span className="theme-icon" id="d-sun"><Sun size={16}/></span>
                    </div>
                </div>
            </nav>

            {/* ════════ DESKTOP MAIN WRAP ════════ */}
            <div className={`mw${!isHomePage ? " public-inner-page" : ""}`}>
                <div className="topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--txt3)', letterSpacing: '.1em', textTransform: 'uppercase' }}>© 2026 Ayamil Coders</span>
                        <span className="ac-topbar-status" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--txt3)' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', animation: 'blink 2s ease infinite', display: 'inline-block' }}></span>
                            All systems operational
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <a className="ac-topbar-email" href="mailto:info@ayamilcoders.com" style={{ fontSize: '12px', color: 'var(--txt3)', textDecoration: 'none' }}>info@ayamilcoders.com</a>
                        <a href="tel:+923127592672" style={{ fontSize: '12px', color: 'var(--txt3)', textDecoration: 'none', fontFamily: 'var(--mono)' }}>+92 312 759 2672</a>
                        <button type="button" className="ac-top-command" onClick={() => window.dispatchEvent(new CustomEvent('ayamil:tool', { detail: 'launcher' }))} aria-label="Open interactive tools" title="Open interactive tools"><LayoutGrid size={16}/><span>Tools</span></button>
                        <button type="button" className="ac-top-command" onClick={() => setCommandOpen(true)} aria-label="Open website search and Command Center" aria-keyshortcuts="Control+K Meta+K" title="Search website · Ctrl+K"><Search size={15} aria-hidden="true"/><span>Search</span><kbd className="ac-top-command-shortcut" aria-hidden="true">Ctrl K</kbd></button>
                    </div>
                </div>

                <div className="twr"><div className="tin" id="tkr">
                    {[0, 1].flatMap((copy) => TICKER_ITEMS.map((item, index) => (
                        <div className="ti" key={`${copy}-${index}`}>
                            {'text' in item ? (
                                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)' }}>{item.text}</span>
                            ) : (
                                <>
                                    <span style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 15, color: 'var(--blue)' }}>{item.value}</span>
                                    <span style={{ fontSize: 13, color: 'var(--txt3)' }}>{item.label}</span>
                                </>
                            )}
                        </div>
                    )))}
                </div></div>

                {/* DESKTOP PAGE CONTENT */}
                <main id={!isHomePage ? "scr-page" : undefined} className={!isHomePage ? "public-page-content" : undefined}>{children}</main>

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
                            <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.7 }}>An independent technology partner delivering tailored digital solutions for clients worldwide.</p>
                            <div className="soc-row" style={{ marginTop: '12px' }}>
                                <a href="https://facebook.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Facebook"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                                <a href="https://www.linkedin.com/company/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on LinkedIn"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                                <a href="https://instagram.com/ayamilcoders" target="_blank" rel="noopener noreferrer" className="soc-a" aria-label="Ayamil Coders on Instagram"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                            </div>
                        </div>
                        <div data-a="up" data-d="2">
                            <div className="fct">Expertise</div>
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
                                <li><Link href="/ceo">Our CEO · Hidden Partner</Link></li>
                                <li><Link href="/about">Our Story</Link></li>
                                <li><Link href="/company-registration">Company Registration</Link></li>
                                <li><Link href="/top-it-company-sadiqabad">IT Company in Sadiqabad</Link></li>
                                <li><Link href="/best-software-house-pakistan">Software House in Pakistan</Link></li>
                                <li><Link href="/careers">Careers</Link></li>
                                <li><Link href="/updates">Updates &amp; Changelog</Link></li>
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

            {/* Mobile homepage uses Welcome's dedicated portal; inner pages
                have a single scrollable main above, shared across all widths.
                Do not mount children twice: duplicated forms, IDs and effects
                create race conditions after refresh and Inertia navigation. */}

            {/* ════════ MOBILE BOTTOM TAB BAR ════════ */}
            <div id="tbar" role="navigation" aria-label="Mobile primary navigation">
                {isHomePage ? (
                    <button type="button" className="ti-btn act" id="tab-0" onClick={() => (window as any).switchTab?.(0)} aria-label="Home section">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
                    <span className="ti-lbl">Home</span><span className="ti-dot"></span>
                </button>
                ) : (
                    <Link href="/" className={`ti-btn${isActive("/") ? ' act' : ''}`} id="tab-0">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
                    <span className="ti-lbl">Home</span><span className="ti-dot"></span>
                </Link>
                )}
                {isHomePage ? (
                    <button type="button" className="ti-btn" id="tab-1" onClick={() => (window as any).switchTab?.(1)} aria-label="Expertise section">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                    <span className="ti-lbl">Expertise</span><span className="ti-dot"></span>
                </button>
                ) : (
                    <Link href="/services" prefetch="click" className={`ti-btn${isActive("/services") ? ' act' : ''}`} id="tab-1">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                    <span className="ti-lbl">Expertise</span><span className="ti-dot"></span>
                </Link>
                )}
                {isHomePage ? (
                    <button type="button" className="ti-btn" id="tab-2" onClick={() => (window as any).switchTab?.(2)} aria-label="Our Story section">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg></div>
                    <span className="ti-lbl">Our Story</span><span className="ti-dot"></span>
                </button>
                ) : (
                    <Link href="/about" prefetch="click" className={`ti-btn${isActive("/about") ? ' act' : ''}`} id="tab-2">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg></div>
                    <span className="ti-lbl">Our Story</span><span className="ti-dot"></span>
                </Link>
                )}
                {isHomePage ? (
                    <button type="button" className="ti-btn" id="tab-3" onClick={() => (window as any).switchTab?.(3)} aria-label="Connect section">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                    <span className="ti-lbl">Connect</span><span className="ti-dot"></span>
                </button>
                ) : (
                    <Link href="/contact" prefetch="click" className={`ti-btn${isActive("/contact") ? ' act' : ''}`} id="tab-3">
                    <div className="ti-icon"><svg className="ti-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                    <span className="ti-lbl">Connect</span><span className="ti-dot"></span>
                </Link>
                )}
            </div>

            {/* ════════ MOBILE WHATSAPP — BRAND-CONSISTENT SEMI-3D SVG ════════ */}
            <a
                className="fab fab-whatsapp"
                href="https://wa.me/923127592672"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Ayamil Coders on WhatsApp (opens in a new tab)"
                title="Chat on WhatsApp"
            >
                <svg className="fab-whatsapp-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
                    <path d="M16 3.6A12.3 12.3 0 0 0 5.5 22.3L3.8 28.2l6.1-1.6A12.3 12.3 0 1 0 16 3.6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
                    <path d="M11.4 10.4c-.4-.9-.9-1-1.4-1-.5 0-1 .1-1.4.6-.6.7-1.1 1.7-1 2.9.2 1.6 1.4 3.8 3.6 5.8 2.2 2 4.2 2.8 5.5 3 1.3.2 2.5 0 3.5-.6.8-.5 1.5-1.4 1.6-2.2 0-.4-.3-.6-.7-.8l-2.4-1.1c-.4-.2-.7-.1-1 .2l-1 1.2c-.2.2-.4.3-.8.1-1-.4-2.1-1-3.1-2-1-1-1.6-2-2-2.8-.2-.3 0-.6.2-.8l.8-1c.3-.3.3-.6.1-1Z" fill="currentColor" transform="translate(3.25 1.85) scale(.83)"/>
                </svg>
            </a>

            {/* ════════ SCROLL TO TOP ════════ */}
            <button id="stt" type="button" aria-label="Scroll to top" onClick={() => {
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
            <button id="legal-pill" type="button" onClick={() => { document.getElementById('legal-overlay')?.classList.add('open'); document.body.style.overflow = 'hidden'; document.getElementById('legal-sheet-close')?.focus(); }} aria-label="Legal pages" aria-haspopup="dialog">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Legal &amp; Policies
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>

            {/* ════════ LEGAL BOTTOM SHEET (Mobile) ════════ */}
            <div id="legal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { e.currentTarget.classList.remove('open'); document.body.style.overflow = ''; document.getElementById('legal-pill')?.focus(); } }}>
                <div id="legal-sheet" role="dialog" aria-modal="true" aria-labelledby="legal-sheet-heading">
                    <div className="lsheet-handle"></div>
                    <div className="lsheet-head">
                        <span className="lsheet-title" id="legal-sheet-heading">Legal &amp; Policies</span>
                        <button type="button" id="legal-sheet-close" className="lsheet-close" aria-label="Close legal menu" onClick={() => { document.getElementById('legal-overlay')?.classList.remove('open'); document.body.style.overflow = ''; document.getElementById('legal-pill')?.focus(); }}>✕</button>
                    </div>
                    <p className="lsheet-sub">Ayamil Coders — Clear policies for clients worldwide.</p>
                    <Link href="/privacy-policy" className="lsheet-row"><div className="lsheet-ico i3 ib"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Privacy Policy</div><div className="lsheet-lbl-d">How we collect, use &amp; protect your data</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/terms" className="lsheet-row"><div className="lsheet-ico i3 ip"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Terms &amp; Conditions</div><div className="lsheet-lbl-d">Rules governing use of our services</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/refund-policy" className="lsheet-row"><div className="lsheet-ico i3 ig"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Refund Policy</div><div className="lsheet-lbl-d">Our cancellation &amp; refund terms</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/cookie-policy" className="lsheet-row"><div className="lsheet-ico i3 ia"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1" fill="white"/><circle cx="15" cy="9" r="1" fill="white"/><circle cx="9" cy="15" r="1" fill="white"/><circle cx="15" cy="15" r="1" fill="white"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Cookie Policy</div><div className="lsheet-lbl-d">How we use cookies &amp; tracking</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/disclaimer" className="lsheet-row"><div className="lsheet-ico" style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'linear-gradient(135deg,#92400e,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Disclaimer</div><div className="lsheet-lbl-d">Limitations of liability &amp; warranties</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/updates" className="lsheet-row"><div className="lsheet-ico i3 ib"><History size={18} color="white" aria-hidden="true" /></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Updates &amp; Changelog</div><div className="lsheet-lbl-d">Development history and resolved issues</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                    <Link href="/contact" className="lsheet-row"><div className="lsheet-ico i3 ib" style={{ background: 'linear-gradient(135deg,#0369a1,#0ea5e9)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div className="lsheet-lbl"><div className="lsheet-lbl-t">Contact Us</div><div className="lsheet-lbl-d">Questions about our policies? Reach out</div></div><svg className="lsheet-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></Link>
                </div>
            </div>
        </>
    );
}