import { useEffect, useRef, useState } from 'react';

export default function Welcome() {
    const [currentTab, setCurrentTab] = useState(0);
    const [openSvc, setOpenSvc] = useState<Set<string>>(new Set());
    // BUG FIX 1: Use a ref to hold currentTab for use inside event handlers/closures
    // so swipe + switchTab always see the latest value without re-attaching listeners.
    const currentTabRef = useRef(0);
    const openSvcRef = useRef<Set<string>>(new Set());

    // Keep refs in sync with state
    useEffect(() => { currentTabRef.current = currentTab; }, [currentTab]);
    useEffect(() => { openSvcRef.current = openSvc; }, [openSvc]);

    // Inject page-specific CSS (only styles NOT in shared.css / AyamilLayout)
    useEffect(() => {
        const styleId = 'welcome-page-css';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* ══════ PAGE-SPECIFIC: HERO ══════ */
            .hero-blob{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;animation:floatY 8s ease-in-out infinite}
            .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;width:100%;position:relative;z-index:2}
            @media(max-width:1023px){.hero-grid{grid-template-columns:1fr;gap:40px} .hc{order:2} .ht{order:1;text-align:left}}
            .hh1{font-size:clamp(40px,6vw,72px);font-family:var(--disp);font-weight:800;line-height:1.05;letter-spacing:-.03em;margin-bottom:18px}
            .hdesc{font-size:16px;line-height:1.75;color:var(--txt2);max-width:460px;margin-left:auto;margin-bottom:26px}
            @media(max-width:1023px){.hdesc{margin-left:0}}
            .hbtns{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
            @media(max-width:1023px){.hbtns{justify-content:flex-start}}
            .hbadges{display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end;margin-top:26px;padding-top:22px;border-top:1px solid var(--brd)}
            @media(max-width:1023px){.hbadges{justify-content:flex-start}}
            .hbadge{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--txt3);font-weight:500}
            /* code card */
            .cc{position:relative;border-radius:20px;overflow:hidden;background:var(--code-bg);border:1px solid rgba(41,121,242,.2);box-shadow:0 20px 64px rgba(41,121,242,.12);animation:floatY 6s ease-in-out infinite}
            .cc-top{display:flex;align-items:center;gap:5px;padding:11px 16px;background:rgba(255,255,255,.02);border-bottom:1px solid var(--brd)}
            .cc-dot{width:11px;height:11px;border-radius:50%;flex-shrink:0}
            .cc-fn{margin-left:8px;font-family:var(--mono);font-size:12px;color:var(--txt3)}
            .cc-body{padding:22px;font-family:var(--mono);font-size:13px;line-height:2}
            .cc-sb{padding:8px 16px;background:rgba(41,121,242,.06);border-top:1px solid var(--brd);display:flex;align-items:center;gap:12px}
            .tk{color:#79b8ff}.tf{color:#85e89d}.ts{color:#9ecbff}.tn{color:#ffab70}.tc{color:#4d6a90;font-style:italic}.to{color:#f97583}.tv{color:#cdd9e5}
            [data-theme="light"] .tk{color:#0550ae}[data-theme="light"] .tf{color:#116329}[data-theme="light"] .ts{color:#0a3069}[data-theme="light"] .tn{color:#953800}[data-theme="light"] .tc{color:#8b949e}[data-theme="light"] .to{color:#cf222e}[data-theme="light"] .tv{color:#1f2328}

            /* ══════ STATS ══════ */
            .sgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:40px 60px}
            @media(max-width:1279px){.sgrid{padding:40px}}@media(max-width:1023px){.sgrid{padding:32px}}@media(max-width:767px){.sgrid{grid-template-columns:repeat(2,1fr);padding:28px 24px}}
            .sc{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:22px 18px;text-align:center;transition:all .3s}
            .sc:hover{border-color:var(--brd2);background:var(--card-hov);transform:translateY(-3px)}
            .sn{font-family:var(--disp);font-weight:800;font-size:34px;background:linear-gradient(135deg,var(--txt),var(--blue-lt));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
            .su{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--txt3);margin:5px 0}
            .sd{height:1px;background:linear-gradient(90deg,transparent,rgba(41,121,242,.3),transparent);margin:10px 0}
            .sl{font-size:12px;color:var(--txt3)}

            /* ══════ SERVICES ══════ */
            .svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
            @media(max-width:767px){.svc-grid{grid-template-columns:1fr}}
            .svc-c{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:22px;display:flex;flex-direction:row-reverse;gap:18px;align-items:flex-start;transition:all .35s}
            .svc-c:hover{border-color:var(--brd2);background:var(--card-hov);box-shadow:0 12px 40px rgba(41,121,242,.08);transform:translateY(-4px)}
            .svc-c:hover .i3{transform:perspective(400px) rotateX(-10deg) rotateY(10deg) translateZ(4px) scale(1.1)}

            /* ══════ ABOUT ══════ */
            .ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
            @media(max-width:1023px){.ab-grid{grid-template-columns:1fr;gap:36px}}
            .mosaic{display:grid;grid-template-columns:1fr 1fr;gap:12px}
            .m-big{grid-column:span 1;grid-row:span 2;background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:26px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transition:all .3s}
            .m-big:hover{border-color:var(--brd2);transform:translateY(-3px)}
            .m-sm{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:18px;text-align:center;transition:all .3s}
            .m-sm:hover{border-color:var(--brd2);transform:translateY(-2px)}
            .m-bars{grid-column:span 2;background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-lg);padding:18px}
            .br{margin-bottom:13px}.br:last-child{margin-bottom:0}
            .br-h{display:flex;justify-content:space-between;font-size:12px;margin-bottom:7px}
            .bt{height:5px;background:rgba(128,128,128,.12);border-radius:99px;overflow:hidden}
            .bf{height:100%;border-radius:99px;width:0;transition:width 1.5s cubic-bezier(.34,1.56,.64,1)}
            .bf-b{background:linear-gradient(90deg,var(--blue-dk),var(--cyan))}
            .bf-p{background:linear-gradient(90deg,#5b21b6,#a78bfa)}
            .bf-g{background:linear-gradient(90deg,#059669,#34d399)}
            .ck-list{list-style:none;display:flex;flex-direction:column;gap:9px;margin-bottom:24px}
            .ck-i{display:flex;align-items:center;justify-content:flex-end;gap:10px;font-size:14px;color:var(--txt2)}
            @media(max-width:1023px){.ck-i{justify-content:flex-start}}
            .ck-icon{width:22px;height:22px;border-radius:50%;background:rgba(41,121,242,.12);border:1px solid rgba(41,121,242,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;color:var(--blue-lt);font-family:var(--mono)}

            /* ══════ PROCESS ══════ */
            .proc{display:flex;flex-direction:row-reverse;position:relative}
            @media(max-width:767px){.proc{flex-direction:column}}
            .ps{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 12px;position:relative;z-index:2}
            @media(max-width:767px){.ps{flex-direction:row;text-align:left;padding:0 0 26px;gap:18px;align-items:flex-start}}
            .ps-n{width:62px;height:62px;border-radius:18px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;border:3px solid var(--bg);flex-shrink:0}
            @media(max-width:767px){.ps-n{margin-bottom:0}}

            /* ══════ TEAM ══════ */
            .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
            @media(max-width:1023px){.tgrid{grid-template-columns:repeat(2,1fr)}}@media(max-width:639px){.tgrid{grid-template-columns:1fr}}
            .tc-card{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);overflow:hidden;transition:all .35s}
            .tc-card:hover{border-color:var(--brd2);transform:translateY(-4px);box-shadow:0 14px 44px rgba(41,121,242,.1)}
            .tc-h{height:120px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
            .tc-av{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:18px;color:#fff;position:relative;z-index:1;transition:transform .3s;box-shadow:0 8px 24px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.2)}
            .tc-card:hover .tc-av{transform:scale(1.07)}
            .tc-badge{position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:var(--green);border:2px solid var(--bg2);display:flex;align-items:center;justify-content:center;font-size:9px}
            .tc-b{padding:16px}

            /* ══════ TESTIMONIALS ══════ */
            .tsgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
            @media(max-width:1023px){.tsgrid{grid-template-columns:repeat(2,1fr)}}

            /* ══════ CONTACT ══════ */
            .cgrid{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start}
            @media(max-width:1023px){.cgrid{grid-template-columns:1fr;gap:36px}}
            .ci{display:flex;align-items:center;gap:14px;transition:all .2s}.ci:hover{transform:translateX(-4px)}
            @media(max-width:1023px){.ci:hover{transform:translateX(4px)}}
            .fc{background:var(--card-bg);border:1px solid var(--brd);border-radius:var(--r-xl);padding:26px}
        `;
        document.head.appendChild(style);

        return () => { document.getElementById(styleId)?.remove(); };
    }, []);

    // BUG FIX 2: All interactive JS that only needs to run ONCE goes here (empty dep array).
    // Functions that reference currentTab use currentTabRef so they always have the latest value
    // without this effect needing to re-run (which would re-attach listeners and leak memory).
    useEffect(() => {
        // ── Counters ──
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
                            if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
                            else { el.textContent = Math.floor(current).toString(); }
                        }, 16);
                    }
                    counterObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

        // ── Skill bars ──
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

        // ── Scroll reveal ──
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

        // ── 3D tilt on service cards ──
        const init3DTilt = () => {
            document.querySelectorAll<HTMLElement>('.svc-c').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
                });
                card.addEventListener('mouseleave', () => { card.style.transform = ''; });
            });
        };
        init3DTilt();

        // ── Tab ripple ──
        const attachRipple = (btn: Element) => {
            btn.addEventListener('click', function (e) {
                const r = document.createElement('span');
                r.className = 'tab-rip';
                const rect = (this as HTMLElement).getBoundingClientRect();
                const sz = 40;
                const me = e as MouseEvent;
                r.style.cssText = `width:${sz}px;height:${sz}px;left:${me.clientX - rect.left - sz / 2}px;top:${me.clientY - rect.top - sz / 2}px;`;
                this.appendChild(r);
                r.addEventListener('animationend', () => r.remove());
            });
        };
        document.querySelectorAll('.ti-btn').forEach(attachRipple);

        // ── Scroll-to-top visibility ──
        const sttBtn = document.getElementById('stt');
        const trackScroll = () => {
            const active = document.querySelector<HTMLElement>('.asc.s-act');
            if (active) {
                active.addEventListener('scroll', () => {
                    sttBtn?.classList.toggle('visible', active.scrollTop > 200);
                }, { passive: true });
            } else {
                setTimeout(trackScroll, 200);
            }
        };
        trackScroll();

        // ── Swipe gestures (uses ref so no stale closure) ──
        const SCREENS = ['scr-0', 'scr-1', 'scr-2', 'scr-3'];
        let tStartX = 0, tStartY = 0;
        const ms = document.getElementById('mscr');
        if (ms) {
            ms.addEventListener('touchstart', (e) => {
                tStartX = e.touches[0].clientX;
                tStartY = e.touches[0].clientY;
            }, { passive: true });
            ms.addEventListener('touchend', (e) => {
                const dx = e.changedTouches[0].clientX - tStartX;
                const dy = e.changedTouches[0].clientY - tStartY;
                if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                    const cur = currentTabRef.current;
                    if (dx < 0 && cur < SCREENS.length - 1) (window as any).switchTab(cur + 1);
                    else if (dx > 0 && cur > 0) (window as any).switchTab(cur - 1);
                }
            }, { passive: true });
        }

        // ── Window-level functions (bound once) ──
        (window as any).switchTab = (idx: number) => {
            const cur = currentTabRef.current;
            if (idx === cur) return;
            const dir = idx > cur ? 1 : -1;
            const oldScr = document.getElementById(SCREENS[cur]);
            const newScr = document.getElementById(SCREENS[idx]);
            if (!oldScr || !newScr) return;
            // show progress bar (defined below)
            (window as any).showProgress?.();
            oldScr.className = `asc ${dir > 0 ? 's-hide-l' : 's-hide-r'}`;
            newScr.className = `asc ${dir > 0 ? 's-hide-r' : 's-hide-l'}`;
            requestAnimationFrame(() => requestAnimationFrame(() => { newScr.className = 'asc s-act'; }));
            setTimeout(() => { newScr.scrollTop = 0; }, 60);
            // Update tab button active states
            document.querySelectorAll('.ti-btn').forEach((t, i) => t.classList.toggle('act', i === idx));
            // Trigger mobile skill bars when About tab opens
            if (idx === 2) {
                setTimeout(() => {
                    document.querySelectorAll<HTMLElement>('.mob-bar').forEach(b => {
                        b.style.width = b.dataset.w || '0%';
                    });
                }, 450);
            }
            setCurrentTab(idx);
        };

        (window as any).toggleSvc = (id: string) => {
            const det = document.getElementById(`det-${id}`);
            const arr = document.getElementById(`arr-${id}`);
            if (!det || !arr) return;
            if (openSvcRef.current.has(id)) {
                det.classList.remove('open');
                arr.style.transform = '';
                setOpenSvc(prev => { const s = new Set(prev); s.delete(id); return s; });
            } else {
                det.classList.add('open');
                arr.style.transform = 'rotate(90deg)';
                setOpenSvc(prev => new Set(prev).add(id));
            }
        };

        (window as any).showNotif = (title: string, msg: string) => {
            document.querySelector('.notif')?.remove();
            const n = document.createElement('div');
            n.className = 'notif';
            n.innerHTML = `<div class="i3 ib" style="width:36px;height:36px;border-radius:10px;flex-shrink:0;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div><div><div style="font-family:var(--disp);font-weight:700;font-size:13px;color:var(--txt);">${title}</div><div style="font-size:12px;color:var(--txt3);margin-top:2px;">${msg}</div></div>`;
            document.body.appendChild(n);
            setTimeout(() => n.remove(), 3600);
        };

        (window as any).openSrch = () => {
            document.getElementById('srch-overlay')?.classList.add('open');
            setTimeout(() => (document.getElementById('srch-inp') as HTMLInputElement)?.focus(), 100);
        };
        (window as any).closeSrch = () => { document.getElementById('srch-overlay')?.classList.remove('open'); };

        (window as any).showProgress = () => {
            const pb = document.getElementById('prog-bar');
            if (!pb) return;
            pb.style.display = 'block';
            pb.classList.add('loading');
            setTimeout(() => { pb.classList.remove('loading'); pb.style.display = 'none'; }, 900);
        };

        (window as any).setChip = (el: HTMLElement) => {
            el.closest('.chips')?.querySelectorAll('.chip').forEach(c => c.classList.remove('act'));
            el.classList.add('act');
        };

        (window as any).handleDeskForm = (e: Event) => {
            e.preventDefault();
            const b = document.getElementById('desk-btn') as HTMLButtonElement;
            if (!b) return;
            b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="30 70"/></svg> Sending...';
            b.disabled = true;
            setTimeout(() => {
                b.innerHTML = "✓ Sent! We'll be in touch.";
                b.style.background = 'linear-gradient(135deg,#04432c,#059669,#34d399)';
            }, 2000);
        };

        (window as any).handleMobForm = (e: Event) => {
            e.preventDefault();
            const b = document.getElementById('mob-btn') as HTMLButtonElement;
            if (!b) return;
            b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="30 70"/></svg> Sending...';
            b.disabled = true;
            setTimeout(() => {
                b.innerHTML = "✓ Sent! We'll be in touch.";
                b.style.background = 'linear-gradient(135deg,#04432c,#059669)';
            }, 2000);
        };

        // Escape key
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                (window as any).closeSrch?.();
            }
        };
        document.addEventListener('keydown', handleKeydown);

        return () => {
            counterObs.disconnect();
            barObs.disconnect();
            revealObs.disconnect();
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []); // ← empty: attach once only

    return (
        <>
            {/* ════════ PROGRESS BAR ════════ */}
            <div id="prog-bar"><div className="prog-fill"></div></div>

            {/* ════════ SEARCH OVERLAY ════════ */}
            <div id="srch-overlay" onClick={(e) => { if (e.target === e.currentTarget) (window as any).closeSrch?.(); }}>
                <div className="srch-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input className="srch-input" id="srch-inp" placeholder="Search services, info..." autoComplete="off" onKeyDown={(e) => { if (e.key === 'Escape') (window as any).closeSrch?.(); }} />
                    <button className="srch-close" onClick={() => (window as any).closeSrch?.()}>✕</button>
                </div>
            </div>

            {/* ════════ MOBILE SCREENS ════════ */}
            {/* BUG FIX 3: #tbar, #fab, #stt, #legal-pill, #legal-overlay are now owned by
                AyamilLayout.tsx. They must NOT be rendered here too — duplicate IDs break
                JavaScript selectors and cause the tab bar to appear twice on screen. */}
            <div id="mscr">

                {/* ── SCREEN 0: HOME ── */}
                <div className="asc s-act" id="scr-0">
                    <div className="ash">
                        <div className="ash-t">Home</div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div className="ash-btn" onClick={() => (window as any).openSrch?.()}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            </div>
                            <div className="ash-btn" onClick={() => (window as any).showNotif('👋 Welcome to Ayamil Coders!', 'Your #1 software partner')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* Hero Card */}
                    <div className="app-hero" style={{ marginTop: '16px', position: 'relative', zIndex: 1 }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', animation: 'pulse3d 2s ease infinite', display: 'inline-block', flexShrink: 0 }}></span>
                                <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.65)', letterSpacing: '.06em', textTransform: 'uppercase' }}>600+ Projects · Worldwide</span>
                            </div>
                            <h1 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '28px', lineHeight: 1.1, letterSpacing: '-.02em', color: '#fff', marginBottom: '10px' }}>
                                We Build<br /><span className="shimmer-txt">Smart Digital</span><br />Solutions
                            </h1>
                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', lineHeight: 1.6, marginBottom: '20px' }}>Pakistan's premier software house — AI, Blockchain, Web Dev & IT Consulting.</p>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button onClick={() => (window as any).switchTab(3)} className="btn-p" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px' }}>Get Started →</button>
                                <button onClick={() => (window as any).switchTab(1)} className="btn-g" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}>Services</button>
                            </div>
                        </div>
                    </div>

                    {/* Stats 2x2 */}
                    <div className="sg2" style={{ marginTop: 0 }}>
                        <div className="sac"><div className="san">600+</div><div className="sal">Projects</div></div>
                        <div className="sac"><div className="san">2K+</div><div className="sal">Issues Fixed</div></div>
                        <div className="sac"><div className="san">5+</div><div className="sal">Years Exp.</div></div>
                        <div className="sac"><div className="san">100%</div><div className="sal">Satisfaction</div></div>
                    </div>

                    {/* Filter chips */}
                    <div className="chips">
                        {['All', 'Web Dev', 'Blockchain', 'AI / ML', 'IT Consulting'].map((c, i) => (
                            <div key={c} className={'chip' + (i === 0 ? ' act' : '')} onClick={(e) => (window as any).setChip?.(e.currentTarget)}>{c}</div>
                        ))}
                    </div>

                    {/* Services preview */}
                    <div style={{ padding: '0 16px 8px' }}>
                        <div className="msh"><span className="msh-t">Our Services</span><span className="msh-a" onClick={() => (window as any).switchTab(1)}>See all →</span></div>
                        <div className="srow mc-el" onClick={() => (window as any).switchTab(1)}>
                            <div className="srow-ico i3 ib"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                            <div style={{ flex: 1 }}><div className="srow-t">Web Development</div><div className="srow-d">React, Laravel, Node.js & WordPress</div></div>
                            <svg className="srow-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                        </div>
                        <div className="srow mc-el" onClick={() => (window as any).switchTab(1)}>
                            <div className="srow-ico i3 ip"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
                            <div style={{ flex: 1 }}><div className="srow-t">Blockchain & Web3</div><div className="srow-d">Solidity, DeFi, NFT & Smart Contracts</div></div>
                            <svg className="srow-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                        </div>
                    </div>

                    {/* Latest review */}
                    <div style={{ padding: '0 16px', paddingBottom: '22px' }}>
                        <div className="msh" style={{ marginBottom: '12px' }}><span className="msh-t">Latest Review</span><span className="msh-a" onClick={() => (window as any).switchTab(2)}>All reviews →</span></div>
                        <div className="tmc-ts mc-el">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', color: 'var(--blue)' }}>★★★★★</span>
                                <div className="i3 ib" style={{ width: '30px', height: '30px', borderRadius: '9px' }}><span style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>"</span></div>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.65, marginBottom: '14px' }}>Ayamil Coders delivered our e-commerce platform on time and within budget. Truly a world-class team.</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--brd)' }}>
                                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#0d2f8c,#2979f2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '11px', color: '#fff', flexShrink: 0 }}>SK</div>
                                <div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)' }}>Sara K.</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>E-Commerce, UAE</div></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SCREEN 1: SERVICES ── */}
                <div className="asc s-hide-r" id="scr-1">
                    <div className="ash">
                        <div className="ash-t">Services</div>
                        <div className="ash-btn" onClick={() => (window as any).showNotif('📞 Need help?', 'Tap Contact to reach us')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                        </div>
                    </div>
                    <div style={{ padding: '16px' }}>
                        <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '10px' }}>What We Offer</span>
                        <p style={{ fontSize: '13px', color: 'var(--txt3)', marginBottom: '18px', lineHeight: 1.6 }}>Innovative solutions powering businesses from Pakistan to the world.</p>

                        {[
                            { id: 'web', iconSvg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, cls: 'ib', t: 'Web Development', d: 'Custom frontend & backend', desc: 'From landing pages to enterprise platforms — fast, secure, and globally optimized.', tags: [['tb', 'React'], ['tb', 'Laravel'], ['tb', 'Node.js'], ['tb', 'WordPress']] },
                            { id: 'chain', iconSvg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, cls: 'ip', t: 'Blockchain & Web3', d: 'DeFi, NFT & Smart Contracts', desc: 'Secure DeFi platforms, crypto tokens, NFT marketplaces, and smart contract development.', tags: [['tp', 'Solidity'], ['tp', 'Web3.js'], ['tp', 'DeFi'], ['tp', 'NFT']] },
                            { id: 'ai', iconSvg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, cls: 'ig', t: 'AI & Custom Software', d: 'ML models & automation', desc: 'AI-powered tools, automation pipelines, ML models, and tailor-made SaaS products.', tags: [['tg', 'Python'], ['tg', 'TensorFlow'], ['tg', 'OpenAI'], ['tg', 'Automation']] },
                            { id: 'it', iconSvg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, cls: 'ia', t: 'IT Consulting', d: 'DevOps, security & support', desc: 'Cybersecurity audits, performance optimization, and ongoing maintenance to keep systems bulletproof.', tags: [['ta', 'DevOps'], ['ta', 'Security'], ['ta', 'AWS'], ['ta', 'Support']] }
                        ].map(svc => (
                            <div key={svc.id} id={`svc-${svc.id}`} className="mc-el" style={{ borderRadius: 'var(--r-xl)', marginBottom: '10px', overflow: 'hidden' }}>
                                <div className="srow" style={{ borderRadius: 0, border: 'none', background: 'transparent', marginBottom: 0 }} onClick={() => (window as any).toggleSvc(svc.id)}>
                                    <div className={`srow-ico i3 ${svc.cls}`}>{svc.iconSvg}</div>
                                    <div style={{ flex: 1 }}><div className="srow-t">{svc.t}</div><div className="srow-d">{svc.d}</div></div>
                                    <svg id={`arr-${svc.id}`} className="sdet-arr srow-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                </div>
                                <div id={`det-${svc.id}`} className="sdet">
                                    <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6, marginBottom: '10px' }}>{svc.desc}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {svc.tags.map(([cls, label]) => <span key={label} className={`tag ${cls}`}>{label}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Process timeline mobile */}
                    <div style={{ padding: '0 16px 22px' }}>
                        <div className="msh"><span className="msh-t">How We Work</span></div>
                        <div className="ptl">
                            {[
                                { num: 1, title: 'Discovery', desc: 'Deep dive into your vision, goals, and technical requirements.', cls: 'ib' },
                                { num: 2, title: 'Planning', desc: 'Architecture design, stack selection, detailed roadmap.', cls: 'ip' },
                                { num: 3, title: 'Development', desc: 'Agile sprints, clean code, continuous delivery.', cls: 'ig' },
                                { num: 4, title: 'Testing', desc: 'QA, security audits and performance benchmarking.', cls: 'ia' },
                                { num: 5, title: 'Launch', desc: 'Smooth deployment, monitoring & post-launch support.', cls: 'ib' }
                            ].map(step => (
                                <div key={step.num} className="pt-i">
                                    <div className="pt-l">
                                        <div className={`pt-ico i3 ${step.cls}`}><span style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '18px', color: '#fff' }}>{step.num}</span></div>
                                        {step.num < 5 && <div className="pt-line"></div>}
                                    </div>
                                    <div className="pt-body"><div className="pt-t">{step.title}</div><p className="pt-d">{step.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SCREEN 2: ABOUT ── */}
                <div className="asc s-hide-r" id="scr-2">
                    <div className="ash">
                        <div className="ash-t">About</div>
                        <div className="ash-btn" onClick={() => (window as any).showNotif('ℹ️ Est. July 2023', 'Based in Sadiqabad, Punjab 🇵🇰')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                    </div>

                    <div style={{ margin: '16px', background: 'var(--bg2)', border: '1px solid var(--brd)', borderRadius: 'var(--r-xl)', padding: '20px', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(41,121,242,.06)', filter: 'blur(20px)', pointerEvents: 'none' }}></div>
                        <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '10px' }}>About Ayamil</span>
                        <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '20px', lineHeight: 1.2, letterSpacing: '-.02em', marginBottom: '10px', color: 'var(--txt)' }}>Pakistan's Most <span className="shimmer-txt">Trusted</span> Software House</h2>
                        <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.65 }}>Founded by <strong style={{ color: 'var(--txt)' }}>Muhammad Muzamil</strong> and led by CEO <strong style={{ color: 'var(--txt)' }}>Ayesha Irfan</strong>, based in Sadiqabad, Punjab.</p>
                    </div>

                    <div className="hss" style={{ marginBottom: '16px' }}>
                        <div className="hss-i sac mc-el" style={{ minWidth: '130px' }}><div className="san">600+</div><div className="sal">Projects</div></div>
                        <div className="hss-i sac mc-el" style={{ minWidth: '130px' }}><div className="san">2K+</div><div className="sal">Issues Fixed</div></div>
                        <div className="hss-i sac mc-el" style={{ minWidth: '130px' }}><div className="san" style={{ WebkitTextFillColor: 'var(--green)' }}>100%</div><div className="sal">Satisfaction</div></div>
                        <div className="hss-i sac mc-el" style={{ minWidth: '130px' }}><div className="san" style={{ WebkitTextFillColor: '#a78bfa' }}>48h</div><div className="sal">Response</div></div>
                    </div>

                    <div style={{ padding: '0 16px', marginBottom: '20px' }}>
                        <div className="msh"><span className="msh-t">Expertise</span></div>
                        <div className="mc-el" style={{ padding: '16px', borderRadius: 'var(--r-xl)' }}>
                            <div className="sbm"><div className="sbm-r"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Web Development</span><span style={{ color: 'var(--blue-lt)', fontFamily: 'var(--mono)', fontSize: '12px' }}>98%</span></div><div className="sbm-t"><div className="sbm-f bf-b mob-bar" data-w="98%"></div></div></div>
                            <div className="sbm"><div className="sbm-r"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Blockchain / Web3</span><span style={{ color: '#a78bfa', fontFamily: 'var(--mono)', fontSize: '12px' }}>90%</span></div><div className="sbm-t"><div className="sbm-f bf-p mob-bar" data-w="90%"></div></div></div>
                            <div className="sbm"><div className="sbm-r"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>AI & Automation</span><span style={{ color: '#34d399', fontFamily: 'var(--mono)', fontSize: '12px' }}>85%</span></div><div className="sbm-t"><div className="sbm-f bf-g mob-bar" data-w="85%"></div></div></div>
                        </div>
                    </div>

                    <div style={{ padding: '0 16px' }}>
                        <div className="msh"><span className="msh-t">Leadership</span></div>
                        <div className="tmc">
                            <div className="tmc-h" style={{ background: 'linear-gradient(135deg,#0b2d6e,#1248a8,#2979f2)' }}>
                                <div style={{ position: 'relative' }}><div className="tmc-av" style={{ background: 'linear-gradient(135deg,#0d2f8c,#2979f2,#5a9af5)' }}>MM</div><span className="tmc-vf">✓</span></div>
                                <div className="i3 ib" style={{ position: 'absolute', top: '10px', right: '12px', width: '28px', height: '28px', borderRadius: '9px' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                            </div>
                            <div className="tmc-b"><div className="tmc-n">Muhammad Muzamil</div><div className="tmc-r" style={{ color: 'var(--blue-lt)' }}>Founder</div><p className="tmc-d">Visionary founder who built Ayamil Coders to deliver world-class digital solutions globally.</p></div>
                        </div>
                        <div className="tmc">
                            <div className="tmc-h" style={{ background: 'linear-gradient(135deg,#2d1b69,#5b21b6,#7c3aed)' }}>
                                <div style={{ position: 'relative' }}><div className="tmc-av" style={{ background: 'linear-gradient(135deg,#3d1a78,#7c3aed,#a78bfa)' }}>AI</div><span className="tmc-vf">✓</span></div>
                                <div className="i3 ip" style={{ position: 'absolute', top: '10px', right: '12px', width: '28px', height: '28px', borderRadius: '9px' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg></div>
                            </div>
                            <div className="tmc-b"><div className="tmc-n">Ayesha Irfan</div><div className="tmc-r" style={{ color: '#a78bfa' }}>Chief Executive Officer</div><p className="tmc-d">Leading operations, client strategy, and team growth — ensuring every project exceeds expectations.</p></div>
                        </div>
                        <div className="tmc">
                            <div className="tmc-h" style={{ background: 'linear-gradient(135deg,#064e3b,#065f46,#059669)' }}>
                                <div style={{ position: 'relative' }}><div className="tmc-av" style={{ background: 'linear-gradient(135deg,#04432c,#059669,#34d399)', fontSize: '13px' }}>DEV</div><span className="tmc-vf">✓</span></div>
                                <div className="i3 ig" style={{ position: 'absolute', top: '10px', right: '12px', width: '28px', height: '28px', borderRadius: '9px' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
                            </div>
                            <div className="tmc-b"><div className="tmc-n">Development Team</div><div className="tmc-r" style={{ color: '#34d399' }}>Engineers & Designers</div><p className="tmc-d">Expert developers, designers, blockchain engineers, and AI specialists from Punjab, Pakistan.</p></div>
                        </div>
                    </div>

                    <div style={{ padding: '0 16px', marginTop: '8px', paddingBottom: '22px' }}>
                        <div className="msh"><span className="msh-t">Client Reviews</span></div>
                        <div className="tmc-ts mc-el">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '12px', color: '#a78bfa' }}>★★★★★</span><div className="i3 ip" style={{ width: '28px', height: '28px', borderRadius: '9px' }}><span style={{ fontSize: '13px', color: 'white', fontWeight: 700 }}>"</span></div></div>
                            <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.65, marginBottom: '12px' }}>The blockchain smart contract system they built is rock-solid. Better than agencies in Europe.</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--brd)' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#3d1a78,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '11px', color: '#fff', flexShrink: 0 }}>JM</div><div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)' }}>James M.</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>Web3, United Kingdom</div></div></div>
                        </div>
                        <div className="tmc-ts mc-el">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '12px', color: '#34d399' }}>★★★★★</span><div className="i3 ig" style={{ width: '28px', height: '28px', borderRadius: '9px' }}><span style={{ fontSize: '13px', color: 'white', fontWeight: 700 }}>"</span></div></div>
                            <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.65, marginBottom: '12px' }}>Partnered for 2 years. Reliable, proactive, always available — a true long-term partner.</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--brd)' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#04432c,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '11px', color: '#fff', flexShrink: 0 }}>AN</div><div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)' }}>Ahmed N.</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>Corporate, Saudi Arabia</div></div></div>
                        </div>
                    </div>
                </div>

                {/* ── SCREEN 3: CONTACT ── */}
                {/* BUG FIX 4: Contact screen was missing phone, website, careers, and IT Institute
                    links that exist in the original index.html. Restored all contact items. */}
                <div className="asc s-hide-r" id="scr-3">
                    <div className="ash">
                        <div className="ash-t">Contact</div>
                        <a href="tel:+923127592672" className="ash-btn" style={{ textDecoration: 'none', color: 'var(--txt2)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </a>
                    </div>

                    <div style={{ padding: '16px 16px 0' }}>
                        <span className="section-lbl" style={{ display: 'inline-flex', marginBottom: '10px' }}>Get In Touch</span>
                        <h2 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '22px', lineHeight: 1.2, letterSpacing: '-.02em', marginBottom: '8px', color: 'var(--txt)' }}>Let's Build <span className="shimmer-txt">Something</span> Amazing</h2>
                        <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6, marginBottom: '18px' }}>Sadiqabad, Punjab — fully remote, serving clients worldwide.</p>
                    </div>

                    <div style={{ padding: '0 16px', marginBottom: '6px' }}>
                        <a href="mailto:info@ayamilcoders.com" className="cia mc-el">
                            <div className="cia-ico i3 ib"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                            <div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Email</div><div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>info@ayamilcoders.com</div></div>
                            <svg style={{ marginLeft: 'auto', color: 'var(--txt3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                        </a>
                        <a href="tel:+923127592672" className="cia mc-el">
                            <div className="cia-ico i3 ig"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                            <div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Call / WhatsApp</div><div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500, fontFamily: 'var(--mono)' }}>+92 312 759 2672</div></div>
                            <svg style={{ marginLeft: 'auto', color: 'var(--txt3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                        </a>
                        <a href="https://wa.me/923127592672" target="_blank" rel="noopener noreferrer" className="cia mc-el">
                            <div className="cia-ico i3 ig"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.554 4.094 1.523 5.817L.036 23.145a.5.5 0 0 0 .613.613l5.391-1.472A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".9"/></svg></div>
                            <div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>WhatsApp</div><div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>Chat with us now</div></div>
                            <svg style={{ marginLeft: 'auto', color: 'var(--txt3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                        </a>
                        <a href="https://ayamilcoders.com" target="_blank" rel="noopener noreferrer" className="cia mc-el">
                            <div className="cia-ico i3 ib"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                            <div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Website</div><div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>ayamilcoders.com</div></div>
                            <svg style={{ marginLeft: 'auto', color: 'var(--txt3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                        </a>
                        <a href="https://apply.ayamilcoders.com" target="_blank" rel="noopener noreferrer" className="cia mc-el">
                            <div className="cia-ico i3 ia"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
                            <div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Careers</div><div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>apply.ayamilcoders.com</div></div>
                            <svg style={{ marginLeft: 'auto', color: 'var(--txt3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                        </a>
                        <a href="https://itinstitute.ayamilcoders.com" target="_blank" rel="noopener noreferrer" className="cia mc-el">
                            <div className="cia-ico i3 ip"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
                            <div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>IT Institute</div><div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>itinstitute.ayamilcoders.com</div></div>
                            <svg style={{ marginLeft: 'auto', color: 'var(--txt3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                        </a>
                    </div>

                    {/* Mobile Contact Form */}
                    <div className="mform mc-el">
                        <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '17px', color: 'var(--txt)', marginBottom: '18px' }}>Send a Message</div>
                        <form onSubmit={(e) => (window as any).handleMobForm?.(e)}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div><label className="mfl">Name</label><input type="text" placeholder="Your name" className="mff" /></div>
                                <div><label className="mfl">Email</label><input type="email" placeholder="you@email.com" className="mff" /></div>
                            </div>
                            <label className="mfl">Service</label>
                            <select className="mff"><option>Web Development</option><option>Blockchain</option><option>AI & Software</option><option>IT Consulting</option><option>Other</option></select>
                            <label className="mfl">Message</label>
                            <textarea rows={4} placeholder="Describe your project..." className="mff"></textarea>
                            <button id="mob-btn" type="submit" className="msub">
                                Send Message
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                            </button>
                        </form>
                    </div>

                    {/* Location */}
                    <div style={{ padding: '0 16px', paddingBottom: '22px' }}>
                        <div className="cia mc-el" style={{ marginBottom: 0 }}>
                            <div className="cia-ico i3 ia"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                            <div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Location</div><div style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>Sadiqabad, Punjab, Pakistan 🇵🇰</div></div>
                        </div>
                    </div>
                </div>

            </div>{/* end mscr */}

            {/* ════════ DESKTOP CONTENT ════════ */}
            {/* BUG FIX 5: welcome.tsx must NOT wrap this in <div className="mw"> because
                AyamilLayout already provides the .mw wrapper. Double nesting breaks the
                desktop layout (sidebar + content positioning depends on a single .mw). */}

            {/* DESKTOP HERO */}
            <section id="home" style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '100px 60px 80px' }}>
                <div className="hero-blob" style={{ width: '560px', height: '560px', background: 'rgba(41,121,242,.07)', top: '-180px', left: '-180px' }}></div>
                <div className="hero-blob" style={{ width: '380px', height: '380px', background: 'rgba(0,200,232,.04)', top: '50%', left: '40%', animationDelay: '3s' }}></div>
                <div style={{ position: 'absolute', inset: 0, opacity: '.025', backgroundImage: 'linear-gradient(rgba(100,150,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(100,150,255,.8) 1px,transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }}></div>
                <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', width: '100%', position: 'relative', zIndex: 2 }}>
                    {/* Code block left */}
                    <div data-a="left" className="hc">
                        <div style={{ position: 'relative' }}>
                            <div className="i3 ib" style={{ position: 'absolute', top: '-28px', right: '-16px', width: '48px', height: '48px', borderRadius: '14px', animation: 'floatY 5s ease-in-out infinite', animationDelay: '.5s' }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            </div>
                            <div className="i3 ig" style={{ position: 'absolute', bottom: '-18px', left: '-14px', width: '42px', height: '42px', borderRadius: '12px', animation: 'floatY 7s ease-in-out infinite', animationDelay: '2s' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                            </div>
                            <div className="cc">
                                <div className="cc-top">
                                    <div className="cc-dot" style={{ background: '#ff5f56' }}></div>
                                    <div className="cc-dot" style={{ background: '#ffbd2e' }}></div>
                                    <div className="cc-dot" style={{ background: '#27c93f' }}></div>
                                    <span className="cc-fn">ayamil.config.js</span>
                                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                                        <div style={{ width: '44px', height: '5px', borderRadius: '3px', background: 'rgba(41,121,242,.3)' }}></div>
                                        <div style={{ width: '24px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.07)' }}></div>
                                    </div>
                                </div>
                                <div className="cc-body">
                                    <div><span className="tc">// Pakistan's Premier Software House</span></div>
                                    <div style={{ height: '8px' }}></div>
                                    <div><span className="tk">const</span> <span className="tv">ayamil</span> <span className="to">=</span> &#123;</div>
                                    <div style={{ paddingLeft: '18px' }}><span className="tf">founder</span><span className="to">:</span> <span className="ts">"Muhammad Muzamil"</span><span className="to">,</span></div>
                                    <div style={{ paddingLeft: '18px' }}><span className="tf">ceo</span><span className="to">:</span> <span className="ts">"Ayesha Irfan"</span><span className="to">,</span></div>
                                    <div style={{ paddingLeft: '18px' }}><span className="tf">base</span><span className="to">:</span> <span className="ts">"Sadiqabad, Punjab 🇵🇰"</span><span className="to">,</span></div>
                                    <div style={{ paddingLeft: '18px' }}><span className="tf">projects</span><span className="to">:</span> <span className="tn">600</span><span className="to">,</span></div>
                                    <div style={{ paddingLeft: '18px' }}><span className="tf">services</span><span className="to">:</span> [<span className="ts">"Web"</span><span className="to">,</span><span className="ts">"AI"</span><span className="to">,</span><span className="ts">"Blockchain"</span>]<span className="to">,</span></div>
                                    <div style={{ paddingLeft: '18px' }}><span className="tf">status</span><span className="to">:</span> <span className="ts">"Building the future ✨"</span></div>
                                    <div>&#125;<span className="to">;</span></div>
                                    <div style={{ height: '6px' }}></div>
                                    <div><span className="tf">ayamil</span><span className="to">.</span><span className="tk">launch</span>()<span className="to">;</span><span style={{ display: 'inline-block', width: '7px', height: '17px', background: 'var(--blue-lt)', marginLeft: '4px', verticalAlign: 'middle', borderRadius: '2px', animation: 'blink 1s ease infinite' }}></span></div>
                                </div>
                                <div className="cc-sb">
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', animation: 'blink 2s ease infinite', flexShrink: 0 }}></span>
                                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--green)' }}>ONLINE</span>
                                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--txt3)', marginLeft: '4px' }}>JavaScript · UTF-8</span>
                                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--blue-lt)' }}>ayamilcoders.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero text right */}
                    <div data-a="right" className="tr ht">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(41,121,242,.1)', border: '1px solid rgba(41,121,242,.2)', color: 'var(--blue-lt)', fontSize: '12px', fontFamily: 'var(--mono)', marginBottom: '20px' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', animation: 'pulse3d 2s ease infinite', display: 'inline-block' }}></span>
                            600+ Projects · Worldwide
                        </div>
                        <h1 className="hh1"><span style={{ display: 'block' }}>We Build</span><span className="shimmer-txt" style={{ display: 'block' }}>Smart Digital</span><span style={{ display: 'block' }}>Solutions</span></h1>
                        <p className="hdesc">Ayamil Coders is Pakistan's premier software house — delivering custom web development, AI-powered software, blockchain solutions, and IT consulting for global clients.</p>
                        <div className="hbtns">
                            <a href="#contact" className="btn-p">Start Your Project <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                            <a href="#services" className="btn-g">Our Services</a>
                        </div>
                        <div className="hbadges">
                            <div className="hbadge"><svg width="13" height="13" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Sadiqabad, Punjab</div>
                            <div className="hbadge"><svg width="13" height="13" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Remote-first worldwide</div>
                            <div className="hbadge"><svg width="13" height="13" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>WhatsApp support</div>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'var(--txt3)', fontFamily: 'var(--mono)', fontSize: '11px', animation: 'floatY 2s ease-in-out infinite' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6"/></svg>scroll
                </div>
            </section>

            {/* STATS */}
            <div className="sgrid">
                <div className="sc" data-a="scale" data-d="1"><div className="sn counter" data-t="600">0</div><div className="su">Projects +</div><div className="sd"></div><div className="sl">Delivered Worldwide</div></div>
                <div className="sc" data-a="scale" data-d="2"><div className="sn counter" data-t="2000">0</div><div className="su">Issues +</div><div className="sd"></div><div className="sl">Bugs Fixed</div></div>
                <div className="sc" data-a="scale" data-d="3"><div className="sn counter" data-t="5">0</div><div className="su">Years +</div><div className="sd"></div><div className="sl">Experience</div></div>
                <div className="sc" data-a="scale" data-d="4"><div className="sn">100%</div><div className="su">Satisfaction</div><div className="sd"></div><div className="sl">Client Retention</div></div>
            </div>
            <div className="divider"></div>

            {/* SERVICES */}
            <section id="services" className="sp">
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '36px' }} className="tr ae" data-a="right">
                    <span className="section-lbl">What We Do</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em' }}>Expert <span className="shimmer-txt">Digital</span> Services</h2>
                    <p style={{ marginTop: '10px', maxWidth: '460px', fontSize: '14px', color: 'var(--txt2)' }} className="tr">Reliable, secure, and innovative solutions powering businesses globally.</p>
                </div>
                <div className="svc-grid">
                    {[
                        { cls: 'ib', label: 'Web', labelColor: 'var(--blue-lt)', title: 'Web Development', desc: 'Custom frontend, scalable backend, and full-stack applications built fast and secure.', tags: [['tb','React'],['tb','Laravel'],['tb','Node.js'],['tb','WordPress']], icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                        { cls: 'ip', label: 'Web3', labelColor: '#a78bfa', title: 'Blockchain & Smart Contracts', desc: 'DeFi platforms, NFT marketplaces, and smart contract development.', tags: [['tp','Solidity'],['tp','Web3.js'],['tp','DeFi'],['tp','NFT']], icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
                        { cls: 'ig', label: 'AI/ML', labelColor: '#34d399', title: 'AI & Custom Software', desc: 'AI tools, automation pipelines, ML models, and SaaS products that scale.', tags: [['tg','Python'],['tg','TensorFlow'],['tg','OpenAI'],['tg','Automation']], icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
                        { cls: 'ia', label: 'DevOps', labelColor: '#fbbf24', title: 'IT Consulting & Maintenance', desc: 'Cybersecurity, DevOps, performance optimization, and bulletproof maintenance.', tags: [['ta','DevOps'],['ta','Security'],['ta','AWS'],['ta','Support']], icon: <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                    ].map((svc, i) => (
                        <div key={svc.title} className="svc-c" data-a="flip" data-d={i + 1}>
                            <div style={{ flexShrink: 0, textAlign: 'center' }}>
                                <div className={`i3 ${svc.cls}`} style={{ width: '58px', height: '58px', borderRadius: '16px' }}>{svc.icon}</div>
                                <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', color: svc.labelColor, marginTop: '5px' }}>{svc.label}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)', marginBottom: '7px' }}>{svc.title}</div>
                                <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.65, marginBottom: '12px' }}>{svc.desc}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {svc.tags.map(([cls, label]) => <span key={label} className={`tag ${cls}`}>{label}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="divider"></div>

            {/* ABOUT */}
            <section id="about" className="sp" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="hero-blob" style={{ width: '360px', height: '360px', background: 'rgba(0,200,232,.04)', right: '-80px', top: 0 }}></div>
                <div className="ab-grid">
                    <div className="mosaic" data-a="left">
                        <div className="m-big">
                            <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '40px', background: 'linear-gradient(135deg,var(--txt),var(--blue-lt))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>600+</div>
                            <p style={{ fontSize: '13px', color: 'var(--txt3)', marginTop: '6px' }}>Projects delivered globally</p>
                            <div style={{ width: '44px', height: '3px', background: 'linear-gradient(90deg,var(--blue-dk),var(--cyan))', borderRadius: '2px', margin: '10px auto 0' }}></div>
                        </div>
                        <div className="m-sm"><div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '26px', color: 'var(--green)' }}>100%</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', marginTop: '4px' }}>Satisfaction</div></div>
                        <div className="m-sm"><div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '26px', color: '#a78bfa' }}>48h</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', marginTop: '4px' }}>Response</div></div>
                        <div className="m-bars">
                            <div className="br"><div className="br-h"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Web Development</span><span style={{ color: 'var(--blue-lt)', fontFamily: 'var(--mono)', fontSize: '12px' }}>98%</span></div><div className="bt"><div className="bf bf-b" data-w="98%"></div></div></div>
                            <div className="br"><div className="br-h"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>Blockchain / Web3</span><span style={{ color: '#a78bfa', fontFamily: 'var(--mono)', fontSize: '12px' }}>90%</span></div><div className="bt"><div className="bf bf-p" data-w="90%"></div></div></div>
                            <div className="br"><div className="br-h"><span style={{ color: 'var(--txt2)', fontSize: '12px' }}>AI & Automation</span><span style={{ color: '#34d399', fontFamily: 'var(--mono)', fontSize: '12px' }}>85%</span></div><div className="bt"><div className="bf bf-g" data-w="85%"></div></div></div>
                        </div>
                    </div>
                    <div className="tr" data-a="right">
                        <span className="section-lbl">About Us</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginBottom: '16px' }} className="tr">Pakistan's Most <span className="shimmer-txt">Trusted</span> Software House</h2>
                        <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--txt2)', marginBottom: '20px' }} className="tr">Founded by <strong style={{ color: 'var(--txt)', fontWeight: 600 }}>Muhammad Muzamil</strong> and led by CEO <strong style={{ color: 'var(--txt)', fontWeight: 600 }}>Ayesha Irfan</strong>, Ayamil Coders serves clients globally.</p>
                        <ul className="ck-list">
                            <li className="ck-i">Enterprise-grade code quality & security<span className="ck-icon">✓</span></li>
                            <li className="ck-i">IT Institute offering HTML, CSS, JS courses<span className="ck-icon">✓</span></li>
                            <li className="ck-i">Blockchain innovation from smart contracts to DeFi<span className="ck-icon">✓</span></li>
                            <li className="ck-i">Active hiring — passionate IT professionals welcome<span className="ck-icon">✓</span></li>
                        </ul>
                        <div className="tr"><a href="#contact" className="btn-p">Work With Us <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
                    </div>
                </div>
            </section>
            <div className="divider"></div>

            {/* PROCESS */}
            <section id="process" className="sp">
                <div style={{ textAlign: 'center', marginBottom: '48px' }} data-a="blur">
                    <span className="section-lbl" style={{ display: 'inline-flex' }}>How We Work</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '4px' }}>Our <span className="shimmer-txt">Process</span></h2>
                </div>
                <div className="proc">
                    <div style={{ position: 'absolute', top: '32px', left: '12%', right: '12%', height: '1px', background: 'linear-gradient(270deg,rgba(41,121,242,.5),rgba(0,200,232,.2),transparent)' }}></div>
                    {[
                        { num: 1, title: 'Discovery', desc: 'Listen deeply to vision and goals.', cls: 'ib' },
                        { num: 2, title: 'Planning', desc: 'Architecture, stack, roadmap.', cls: 'ip' },
                        { num: 3, title: 'Development', desc: 'Agile sprints, clean code.', cls: 'ig' },
                        { num: 4, title: 'Testing', desc: 'QA, security, benchmarking.', cls: 'ia' },
                        { num: 5, title: 'Launch', desc: 'Deploy, monitor, support.', cls: 'ib' }
                    ].map(step => (
                        <div key={step.num} className="ps" data-a="up" data-d={step.num}>
                            <div className={`ps-n i3 ${step.cls}`}><span style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '22px', color: '#fff' }}>{step.num}</span></div>
                            <div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '14px', color: 'var(--txt)', marginBottom: '5px' }}>{step.title}</div><p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6 }}>{step.desc}</p></div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="divider"></div>

            {/* TEAM */}
            <section id="team" className="sp">
                <div style={{ marginBottom: '36px' }} data-a="left">
                    <span className="section-lbl">The People</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '4px' }}>Meet the <span className="shimmer-txt">Leadership</span></h2>
                </div>
                <div className="tgrid">
                    <div className="tc-card" data-a="scale" data-d="1"><div className="tc-h" style={{ background: 'linear-gradient(135deg,#0b2d6e,#1248a8,#2979f2)' }}><div style={{ position: 'relative' }}><div className="tc-av" style={{ background: 'linear-gradient(135deg,#0d2f8c,#2979f2,#5a9af5)' }}>MM</div><span className="tc-badge">✓</span></div></div><div className="tc-b"><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)' }}>Muhammad Muzamil</div><div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--blue-lt)', margin: '3px 0 9px' }}>Founder</div><p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.65 }}>Visionary founder delivering world-class digital solutions from Pakistan globally.</p></div></div>
                    <div className="tc-card" data-a="scale" data-d="2"><div className="tc-h" style={{ background: 'linear-gradient(135deg,#2d1b69,#5b21b6,#7c3aed)' }}><div style={{ position: 'relative' }}><div className="tc-av" style={{ background: 'linear-gradient(135deg,#3d1a78,#7c3aed,#a78bfa)' }}>AI</div><span className="tc-badge">✓</span></div></div><div className="tc-b"><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)' }}>Ayesha Irfan</div><div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: '#a78bfa', margin: '3px 0 9px' }}>CEO</div><p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.65 }}>Leading operations, strategy, and growth — ensuring every project exceeds expectations.</p></div></div>
                    <div className="tc-card" data-a="scale" data-d="3"><div className="tc-h" style={{ background: 'linear-gradient(135deg,#064e3b,#065f46,#059669)' }}><div style={{ position: 'relative' }}><div className="tc-av" style={{ background: 'linear-gradient(135deg,#04432c,#059669,#34d399)', fontSize: '13px' }}>DEV</div><span className="tc-badge">✓</span></div></div><div className="tc-b"><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '15px', color: 'var(--txt)' }}>Development Team</div><div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: '#34d399', margin: '3px 0 9px' }}>Engineers & Designers</div><p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.65 }}>Expert developers, designers, and AI specialists from Punjab, Pakistan.</p></div></div>
                </div>
            </section>
            <div className="divider"></div>

            {/* TESTIMONIALS */}
            <section className="sp" style={{ background: 'rgba(5,13,26,.3)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '36px' }} className="tr ae" data-a="right">
                    <span className="section-lbl">Client Feedback</span>
                    <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginTop: '4px' }} className="tr">What Clients <span className="shimmer-txt">Say</span></h2>
                </div>
                <div className="tsgrid">
                    <div className="card" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }} data-a="left" data-d="1"><div className="i3 ib" style={{ width: '32px', height: '32px', borderRadius: '9px', alignSelf: 'flex-end', marginBottom: '12px' }}><span style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>"</span></div><div style={{ fontSize: '12px', color: 'var(--blue)', marginBottom: '10px' }}>★★★★★</div><p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7, flex: 1, marginBottom: '16px' }}>Ayamil Coders delivered our e-commerce platform on time and within budget. Truly world-class.</p><div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--brd)' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#0d2f8c,#2979f2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '11px', color: '#fff', flexShrink: 0 }}>SK</div><div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)' }}>Sara K.</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>E-Commerce, UAE</div></div></div></div>
                    <div className="card" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }} data-a="up" data-d="2"><div className="i3 ip" style={{ width: '32px', height: '32px', borderRadius: '9px', alignSelf: 'flex-end', marginBottom: '12px' }}><span style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>"</span></div><div style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '10px' }}>★★★★★</div><p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7, flex: 1, marginBottom: '16px' }}>The blockchain smart contract system is rock-solid. Better than agencies in Europe.</p><div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--brd)' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#3d1a78,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '11px', color: '#fff', flexShrink: 0 }}>JM</div><div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)' }}>James M.</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>Web3, United Kingdom</div></div></div></div>
                    <div className="card" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }} data-a="right" data-d="3"><div className="i3 ig" style={{ width: '32px', height: '32px', borderRadius: '9px', alignSelf: 'flex-end', marginBottom: '12px' }}><span style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>"</span></div><div style={{ fontSize: '12px', color: '#34d399', marginBottom: '10px' }}>★★★★★</div><p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7, flex: 1, marginBottom: '16px' }}>Partnered for 2 years. Reliable, proactive, always available — true long-term partner.</p><div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--brd)' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#04432c,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '11px', color: '#fff', flexShrink: 0 }}>AN</div><div><div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '13px', color: 'var(--txt)' }}>Ahmed N.</div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)' }}>Corporate, Saudi Arabia</div></div></div></div>
                </div>
            </section>
            <div className="divider"></div>

            {/* ════════ DESKTOP CONTACT SECTION ════════ */}
            {/* BUG FIX 6: This entire section was completely missing from welcome.tsx.
                Only exists in index.html. Restored from original. */}
            <section id="contact" className="sp" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="hero-blob" style={{ width: '440px', height: '440px', background: 'rgba(41,121,242,.05)', left: '-120px', top: 0 }}></div>
                <div className="cgrid">
                    <div data-a="left">
                        <span className="section-lbl">Get In Touch</span>
                        <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: 'var(--disp)', fontWeight: 800, letterSpacing: '-.025em', marginBottom: '14px' }}>Let's Build <span className="shimmer-txt">Something</span> Amazing</h2>
                        <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--txt2)', marginBottom: '28px' }}>Sadiqabad, Punjab — fully remote, serving clients worldwide.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div className="ci"><div className="i3 ib" style={{ width: '42px', height: '42px', borderRadius: '12px' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Email</div><a href="mailto:info@ayamilcoders.com" style={{ fontSize: '14px', color: 'var(--txt)', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue-lt)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--txt)')}>info@ayamilcoders.com</a></div></div>
                            <div className="ci"><div className="i3 ig" style={{ width: '42px', height: '42px', borderRadius: '12px' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6.91-6.91A19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.75-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Call / WhatsApp</div><a href="tel:+923127592672" style={{ fontSize: '14px', color: 'var(--txt)', textDecoration: 'none', fontFamily: 'var(--mono)', transition: 'color .2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue-lt)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--txt)')}>+92 312 759 2672</a></div></div>
                            <div className="ci"><div className="i3 ia" style={{ width: '42px', height: '42px', borderRadius: '12px' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Location</div><span style={{ fontSize: '14px', color: 'var(--txt)' }}>Sadiqabad, Punjab, Pakistan 🇵🇰</span></div></div>
                            <div className="ci"><div className="i3 ib" style={{ width: '42px', height: '42px', borderRadius: '12px' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div><div><div style={{ fontSize: '11px', color: 'var(--txt3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Website</div><a href="https://ayamilcoders.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'var(--txt)', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue-lt)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--txt)')}>ayamilcoders.com</a></div></div>
                        </div>
                    </div>
                    <div data-a="right">
                        <div className="fc">
                            <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: '18px', color: 'var(--txt)', marginBottom: '20px' }}>Send a Message</div>
                            <form onSubmit={(e) => (window as any).handleDeskForm?.(e)}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                    <div><label className="fl">Name</label><input type="text" placeholder="Your name" className="ff" /></div>
                                    <div><label className="fl">Email</label><input type="email" placeholder="you@company.com" className="ff" /></div>
                                </div>
                                <div style={{ marginBottom: '12px' }}><label className="fl">Service</label><select className="ff"><option>Web Development</option><option>Blockchain</option><option>AI & Software</option><option>IT Consulting</option><option>Other</option></select></div>
                                <div style={{ marginBottom: '12px' }}><label className="fl">Budget</label><select className="ff"><option>Under $500</option><option>$500–$2,000</option><option>$2,000–$10,000</option><option>$10,000+</option><option>Let's discuss</option></select></div>
                                <div style={{ marginBottom: '14px' }}><label className="fl">Message</label><textarea rows={4} placeholder="Describe your project..." className="ff" style={{ resize: 'none' }}></textarea></div>
                                <button id="desk-btn" type="submit" className="btn-p" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
                                    Send Message <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}