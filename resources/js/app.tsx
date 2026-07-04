import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import AyamilLayout from '@/layouts/AyamilLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Ayamil Coders';

const publicPages = [
    'welcome',
    'about',
    'services',
    'contact',
    'careers',
    'privacypolicy',
    'terms',
    'refundpolicy',
    'cookiepolicy',
    'disclaimer',
    'ceo',
    'founder',
    'topitcompanysadiqabad',
]; 

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: async (name) => {
        // Every page EXCEPT the homepage is lazy-loaded as its own chunk —
        // that's still correct, it's what fixed the "reduce unused
        // JavaScript" flag (Terms/Privacy/Careers/etc. no longer bloat
        // every visit).
        //
        // The homepage is the one exception: it's loaded EAGERLY, bundled
        // into the main chunk like before. Reason: once React mounts, it
        // renders the layout shell (header/tab bar) immediately, but a
        // lazy page component still has to finish its own network fetch
        // before it can paint — that gap was showing as a blank flash
        // (or, on a slow connection, getting stuck) right after the
        // pre-JS skeleton disappeared. Keeping just this one page eager
        // means its code is already present the instant React mounts, so
        // there's no second gap to fall into.
        if (name.toLowerCase() === 'welcome') {
            const eagerHome = import.meta.glob('./pages/welcome.tsx', { eager: true }) as Record<string, { default: React.ComponentType }>;
            const key = Object.keys(eagerHome)[0];
            if (key) return eagerHome[key];
        }

        const pages = import.meta.glob('./pages/**/*.tsx') as Record<string, () => Promise<{ default: React.ComponentType }>>;

        // Try exact match first, then lowercase fallback
        const exactKey = `./pages/${name}.tsx`;
        const lowerKey = `./pages/${name.toLowerCase()}.tsx`;

        let loader = pages[exactKey];

        if (!loader) {
            // Try with .tsx extension variations
            const tsxKeys = Object.keys(pages);
            const match = tsxKeys.find(key =>
                key.toLowerCase() === `./pages/${name.toLowerCase()}.tsx` ||
                key.toLowerCase().endsWith(`/${name.toLowerCase()}.tsx`)
            );
            if (match) {
                loader = pages[match];
            }
        }

        if (!loader) {
            throw new Error(`Page not found: "${name}". Tried:\n  ${exactKey}\n  ${lowerKey}`);
        }

        return await loader();
    },

    layout: (name) => {
        const page = name.toLowerCase();

        // FIX: Don't return null for welcome - use AyamilLayout instead
        // if (page === 'welcome') return null;  // ← REMOVE THIS LINE

        // For all public pages, use AyamilLayout (including welcome)
        if (publicPages.includes(page)) return AyamilLayout;

        if (page.startsWith('auth/')) return AuthLayout;

        if (page.startsWith('settings/') || page.startsWith('teams/')) {
            return [AppLayout, SettingsLayout];
        }

        return AppLayout;
    },

    strictMode: true,

    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },

    progress: {
        color: '#4B5563',
    },
});

initializeTheme();