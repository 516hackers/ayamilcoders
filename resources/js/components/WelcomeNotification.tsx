/**
 * resources/js/components/WelcomeNotification.tsx
 *
 * First-visit notification toast, shown once per visitor on the homepage.
 *
 * WHY THIS IS ITS OWN FILE:
 * Keeping this separate from Welcome.tsx means the popup's message can be
 * changed any time — for a new promo, a different page, a seasonal offer,
 * whatever — by editing ONLY the CONTENT block below. Welcome.tsx never
 * needs to be touched again for a copy change.
 *
 * BEHAVIOUR:
 * - Appears once per browser (localStorage flag), after a short delay.
 * - Position: fixed toast, bottom-right on desktop / bottom-center on
 *   mobile — doesn't affect page layout or CLS, since it's removed from
 *   normal document flow and only fades/slides in after first paint.
 * - Auto-dismisses after AUTO_DISMISS_MS, or the visitor can close it.
 * - Uses Inertia's <Link> so clicking through to /solutions is a client
 *   -side nav, not a full page reload.
 *
 * TO CHANGE THE CONTENT LATER: edit the CONTENT object below. Nothing
 * else in this file needs to change for a simple copy/link update.
 */

import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

/* ══════════════ CONTENT — edit this for a new popup message ══════════════ */
const CONTENT = {
    eyebrow: 'New',
    title: 'Got a website problem?',
    body: 'We fix bugs, boost your AI/SEO visibility, and build custom features — see how on our Solutions page.',
    linkHref: '/solutions',
    linkText: 'View Solutions →',
};
/* ═══════════════════════════════════════════════════════════════════════ */

// Bump this key (e.g. 'ac_notif_v2') whenever you want everyone to see the
// popup again after a content change, even people who already dismissed
// the previous version.
const STORAGE_KEY = 'ac_notif_v1_seen';
const SHOW_DELAY_MS = 2500;
const AUTO_DISMISS_MS = 10000;

export default function WelcomeNotification() {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        let alreadySeen = false;
        try {
            alreadySeen = localStorage.getItem(STORAGE_KEY) === '1';
        } catch {
            // localStorage unavailable (privacy mode etc.) — just show it once per tab.
        }
        if (alreadySeen) return;

        const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        if (!visible) return;
        const dismissTimer = setTimeout(() => handleClose(), AUTO_DISMISS_MS);
        return () => clearTimeout(dismissTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const markSeen = () => {
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    };

    const handleClose = () => {
        setClosing(true);
        markSeen();
        setTimeout(() => setVisible(false), 300);
    };

    if (!visible) return null;

    return (
        <>
            <style>{`
                .wn-toast{
                    position:fixed;
                    right:20px;
                    bottom:20px;
                    z-index:300;
                    width:320px;
                    max-width:calc(100vw - 32px);
                    background:var(--card-bg);
                    border:1px solid var(--brd2);
                    border-radius:var(--r-lg);
                    backdrop-filter:blur(18px);
                    -webkit-backdrop-filter:blur(18px);
                    box-shadow:0 20px 60px rgba(0,0,0,.35);
                    padding:16px 16px 14px;
                    animation:slideUp .4s cubic-bezier(.22,1,.36,1);
                }
                .wn-toast.wn-closing{
                    animation:wn-fade-out .3s ease forwards;
                }
                @keyframes wn-fade-out{
                    to{opacity:0;transform:translateY(12px)}
                }
                @media(max-width:639px){
                    .wn-toast{
                        left:16px;
                        right:16px;
                        bottom:16px;
                        width:auto;
                    }
                }
                .wn-row{display:flex;align-items:flex-start;gap:12px}
                .wn-icon{
                    width:38px;height:38px;border-radius:11px;flex-shrink:0;
                    display:flex;align-items:center;justify-content:center;
                    background:linear-gradient(135deg,#0d2f8c,#2979f2,#5a9af5);
                    box-shadow:0 6px 18px rgba(41,121,242,.4);
                }
                .wn-body{flex:1;min-width:0}
                .wn-eyebrow{
                    font-family:var(--mono);font-size:10px;text-transform:uppercase;
                    letter-spacing:.08em;color:var(--blue-lt);margin-bottom:3px;
                }
                .wn-title{
                    font-family:var(--disp);font-weight:700;font-size:14.5px;
                    color:var(--txt);margin-bottom:5px;line-height:1.3;
                }
                .wn-text{font-size:12.5px;color:var(--txt3);line-height:1.6;margin-bottom:11px}
                .wn-link{
                    display:inline-flex;align-items:center;gap:4px;
                    font-size:12.5px;font-weight:600;color:var(--blue-lt);
                    text-decoration:none;transition:color .2s;
                }
                .wn-link:hover{color:var(--blue)}
                .wn-close{
                    flex-shrink:0;width:22px;height:22px;border-radius:7px;border:none;
                    background:transparent;color:var(--txt3);cursor:pointer;font-size:15px;
                    display:flex;align-items:center;justify-content:center;transition:all .2s;
                }
                .wn-close:hover{background:var(--surf);color:var(--txt)}
            `}</style>

            <div className={`wn-toast${closing ? ' wn-closing' : ''}`} role="status" aria-live="polite">
                <div className="wn-row">
                    <div className="wn-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </div>
                    <div className="wn-body">
                        <div className="wn-eyebrow">{CONTENT.eyebrow}</div>
                        <div className="wn-title">{CONTENT.title}</div>
                        <div className="wn-text">{CONTENT.body}</div>
                        <Link href={CONTENT.linkHref} className="wn-link" onClick={markSeen}>
                            {CONTENT.linkText}
                        </Link>
                    </div>
                    <button className="wn-close" onClick={handleClose} aria-label="Dismiss notification">✕</button>
                </div>
            </div>
        </>
    );
}