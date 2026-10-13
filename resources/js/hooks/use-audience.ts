import { useEffect, useState } from 'react';

export type Audience = 'business' | 'startup' | 'developer';
const VALID: Audience[] = ['business', 'startup', 'developer'];
const STORE_KEY = 'ayamil:audience';
function getStored(): Audience {
    try {
        const stored = window.localStorage.getItem(STORE_KEY) as Audience | null;
        if (stored && VALID.includes(stored)) return stored;
    } catch { /* storage may be disabled */ }
    return 'business';
}
/** The initial render stays stable for Inertia SSR/hydration. */
export function useAudience() {
    const [audience, setAudience] = useState<Audience>('business');
    useEffect(() => {
        setAudience(getStored());
        const update = () => setAudience(getStored());
        window.addEventListener('ayamil:audience', update);
        window.addEventListener('storage', update);
        return () => {
            window.removeEventListener('ayamil:audience', update);
            window.removeEventListener('storage', update);
        };
    }, []);
    const choose = (next: Audience) => {
        setAudience(next);
        try { window.localStorage.setItem(STORE_KEY, next); } catch { /* private browser */ }
        window.dispatchEvent(new Event('ayamil:audience'));
    };
    return { audience, choose };
}
