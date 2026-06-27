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
];

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        // Eager-load all pages under resources/js/pages/
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true }) as Record<string, { default: React.ComponentType }>;

        // Try exact match first, then lowercase fallback
        const exactKey = `./pages/${name}.tsx`;
        const lowerKey = `./pages/${name.toLowerCase()}.tsx`;

        let page = pages[exactKey];

        if (!page) {
            // Try with .tsx extension variations
            const tsxKeys = Object.keys(pages);
            const match = tsxKeys.find(key =>
                key.toLowerCase() === `./pages/${name.toLowerCase()}.tsx` ||
                key.toLowerCase().endsWith(`/${name.toLowerCase()}.tsx`)
            );
            if (match) {
                page = pages[match];
            }
        }

        if (!page) {
            throw new Error(`Page not found: "${name}". Tried:\n  ${exactKey}\n  ${lowerKey}`);
        }

        return page;
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
