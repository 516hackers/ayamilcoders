import { useCallback, useEffect, useMemo, useState } from 'react';
import SEO from '@/components/SEO';
import {
    BadgeCheck,
    Building2,
    Calculator,
    Check,
    CircleDollarSign,
    Database,
    ExternalLink,
    FileCheck2,
    Fingerprint,
    Landmark,
    RefreshCw,
    Scale,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    WalletCards,
    type LucideIcon,
} from 'lucide-react';

type ShareMetrics = {
    status: 'pending' | 'connected';
    currency: string;
    shares: number;
    face_value_per_share: number;
    total_assets: number | null;
    total_liabilities: number | null;
    net_assets: number | null;
    estimated_book_value_per_share: number | null;
    source: string | null;
    last_updated: string | null;
    message?: string;
};

type FeedState = 'loading' | 'connected' | 'pending' | 'error';

type RegistryItem = {
    label: string;
    value: string;
    hint: string;
    icon: LucideIcon;
};

const TOTAL_SHARES = 1000;
const FACE_VALUE = 10;
const PAGE_URL = 'https://ayamilcoders.com/company-registration';

const registryItems: RegistryItem[] = [
    {
        label: 'Legal Company Name',
        value: 'AYAMIL CODERS (SMC-PRIVATE) LIMITED',
        hint: 'Registered corporate identity',
        icon: Building2,
    },
    {
        label: 'SECP CUIN',
        value: '0357981',
        hint: 'Corporate Unique Identification Number',
        icon: ShieldCheck,
    },
    {
        label: 'FBR Registration / NTN',
        value: 'K075347',
        hint: 'Income-tax registration record',
        icon: FileCheck2,
    },
    {
        label: 'Company Type',
        value: 'Single Member Company (SMC-Private) Limited',
        hint: 'Limited by shares',
        icon: Landmark,
    },
    {
        label: 'Principal Sector',
        value: 'Information Technology',
        hint: 'Software, data and technology services',
        icon: Sparkles,
    },
    {
        label: 'Financial Year End',
        value: '30 June',
        hint: 'Company accounting year-end',
        icon: WalletCards,
    },
];

const capitalItems = [
    {
        label: 'Authorized Capital',
        value: 'PKR 10,000',
        hint: 'Registered capital ceiling',
    },
    {
        label: 'Paid-up Capital',
        value: 'PKR 10,000',
        hint: 'Subscribed and paid capital',
    },
    {
        label: 'Ordinary Shares',
        value: '1,000',
        hint: 'Registered ordinary shares',
    },
    {
        label: 'Face Value',
        value: 'PKR 10',
        hint: 'Nominal value per share',
    },
];

const scopeItems = [
    'Software Development',
    'Data Processing',
    'IT Consultancy',
    'Computer & Technology Services',
    'Software / Hardware Training',
    'Permitted Software & Hardware Trading',
];

function formatPKR(value: number | null | undefined) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return '—';
    }

    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function formatCompactPKR(value: number | null | undefined) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return '—';
    }

    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        notation: 'compact',
        maximumFractionDigits: 2,
    }).format(value);
}

function formatDate(value: string | null | undefined) {
    if (!value) {
        return 'Waiting for first sync';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Waiting for first sync';
    }

    return date.toLocaleString('en-PK', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function CompanyRegistration() {
    const [metrics, setMetrics] = useState<ShareMetrics | null>(null);
    const [feedState, setFeedState] = useState<FeedState>('loading');
    const [refreshing, setRefreshing] = useState(false);

    const loadMetrics = useCallback(async (manual = false) => {
        if (manual) {
            setRefreshing(true);
        }

        try {
            const response = await fetch('/api/company/share-value', {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Share metric endpoint returned ${response.status}`);
            }

            const data = (await response.json()) as ShareMetrics;

            setMetrics(data);
            setFeedState(data.status === 'connected' ? 'connected' : 'pending');
        } catch {
            setFeedState('error');
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        void loadMetrics();

        const interval = window.setInterval(() => {
            void loadMetrics();
        }, 60_000);

        return () => {
            window.clearInterval(interval);
        };
    }, [loadMetrics]);

    useEffect(() => {
        const existing = document.getElementById('company-registration-premium-v3-css');
        existing?.remove();

        const style = document.createElement('style');
        style.id = 'company-registration-premium-v3-css';

        style.textContent = `
            .acreg {
                --ac-blue: var(--blue, #2979f2);
                --ac-blue-lt: var(--blue-lt, #5a9af5);
                --ac-blue-dk: var(--blue-dk, #1248a8);
                --ac-cyan: var(--cyan, #00c8e8);
                --ac-green: var(--green, #2dd36f);
                overflow: hidden;
            }

            .acreg *,
            .acreg *::before,
            .acreg *::after {
                box-sizing: border-box;
            }

            .acreg-shell {
                width: min(1120px, calc(100% - 120px));
                margin-inline: auto;
            }

            /* =========================================================
               FIRST SECTION
               IMPORTANT: SAME SITE COLOR — no separate dark navy hero.
               It uses the existing theme background tokens.
            ========================================================= */
            .acreg-hero {
                position: relative;
                isolation: isolate;
                overflow: hidden;
                padding: 86px 0 72px;
                background:
                    radial-gradient(
                        circle at 15% 12%,
                        rgba(41,121,242,.10),
                        transparent 28%
                    ),
                    radial-gradient(
                        circle at 84% 8%,
                        rgba(0,200,232,.07),
                        transparent 28%
                    ),
                    var(--bg2);
                border-bottom: 1px solid var(--brd);
            }

            .acreg-hero::before {
                content: '';
                position: absolute;
                inset: 0;
                z-index: -2;
                opacity: .34;
                background-image:
                    linear-gradient(
                        rgba(41,121,242,.055) 1px,
                        transparent 1px
                    ),
                    linear-gradient(
                        90deg,
                        rgba(41,121,242,.055) 1px,
                        transparent 1px
                    );
                background-size: 42px 42px;
                mask-image: linear-gradient(
                    to bottom,
                    #000 0%,
                    rgba(0,0,0,.55) 55%,
                    transparent 100%
                );
                pointer-events: none;
            }

            .acreg-watermark {
                position: absolute;
                right: -80px;
                top: 50%;
                z-index: -1;
                width: 420px;
                height: 420px;
                transform: translateY(-50%);
                opacity: .035;
                object-fit: contain;
                filter: grayscale(1);
                pointer-events: none;
                user-select: none;
            }

            [data-theme="light"] .acreg-watermark {
                opacity: .05;
            }

            .acreg-hero-grid {
                display: grid;
                grid-template-columns: minmax(0, 1.18fr) minmax(320px, .82fr);
                gap: 58px;
                align-items: center;
            }

            .acreg-eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                width: fit-content;
                padding: 7px 12px;
                border: 1px solid var(--brd);
                border-radius: 999px;
                background: var(--card-bg);
                color: var(--blue-lt);
                font-family: var(--mono);
                font-size: 10px;
                font-weight: 650;
                letter-spacing: .11em;
                text-transform: uppercase;
            }

            [data-theme="light"] .acreg-eyebrow {
                color: var(--blue-dk);
            }

            .acreg-title {
                max-width: 760px;
                margin: 18px 0 16px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: clamp(38px, 5.6vw, 64px);
                font-weight: 850;
                letter-spacing: -.05em;
                line-height: 1.02;
            }

            .acreg-title span {
                display: block;
                margin-top: 8px;
                background: linear-gradient(
                    92deg,
                    var(--shimmer1),
                    var(--shimmer2),
                    var(--shimmer3)
                );
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }

            .acreg-lead {
                max-width: 690px;
                margin: 0;
                color: var(--txt2);
                font-size: 15px;
                line-height: 1.86;
            }

            .acreg-id-row {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 28px;
            }

            .acreg-id-pill {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                min-height: 38px;
                padding: 8px 12px;
                border: 1px solid var(--brd);
                border-radius: 999px;
                background: var(--card-bg);
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 10px;
            }

            .acreg-id-pill strong {
                color: var(--txt);
                font-weight: 700;
            }

            .acreg-id-pill--ok {
                border-color: rgba(45,211,111,.22);
                background: rgba(45,211,111,.055);
                color: var(--green);
            }

            .acreg-dot {
                width: 7px;
                height: 7px;
                flex: 0 0 auto;
                border-radius: 50%;
                background: var(--green);
                box-shadow:
                    0 0 0 4px rgba(45,211,111,.08),
                    0 0 12px rgba(45,211,111,.42);
            }

            /* Premium registry credential */
            .acreg-credential {
                position: relative;
                overflow: hidden;
                padding: 24px;
                min-height: 348px;
                border: 1px solid var(--brd);
                border-radius: 26px;
                background:
                    radial-gradient(
                        circle at 85% 8%,
                        rgba(0,200,232,.08),
                        transparent 30%
                    ),
                    radial-gradient(
                        circle at 8% 92%,
                        rgba(41,121,242,.10),
                        transparent 34%
                    ),
                    var(--card-bg);
                box-shadow: 0 24px 70px rgba(41,121,242,.08);
            }

            .acreg-credential::after {
                content: '';
                position: absolute;
                right: -94px;
                bottom: -96px;
                width: 230px;
                height: 230px;
                border-radius: 50%;
                border: 1px solid rgba(41,121,242,.12);
                box-shadow:
                    0 0 0 28px rgba(41,121,242,.025),
                    0 0 0 58px rgba(41,121,242,.018);
                pointer-events: none;
            }

            .acreg-credential-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 14px;
                position: relative;
                z-index: 2;
            }

            .acreg-credential-label {
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 9px;
                letter-spacing: .11em;
                text-transform: uppercase;
            }

            .acreg-credential-status {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 9px;
                border-radius: 999px;
                border: 1px solid rgba(45,211,111,.18);
                background: rgba(45,211,111,.05);
                color: var(--green);
                font-family: var(--mono);
                font-size: 9px;
            }

            .acreg-credential-center {
                position: relative;
                z-index: 2;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 208px;
                text-align: center;
            }

            .acreg-logo-ring {
                position: relative;
                display: grid;
                place-items: center;
                width: 142px;
                height: 142px;
                border: 1px solid rgba(41,121,242,.16);
                border-radius: 50%;
                background: rgba(41,121,242,.03);
                box-shadow:
                    0 0 0 13px rgba(41,121,242,.025),
                    0 0 0 30px rgba(41,121,242,.014);
            }

            .acreg-logo-ring::before {
                content: '';
                position: absolute;
                inset: 12px;
                border: 1px dashed rgba(41,121,242,.18);
                border-radius: 50%;
                animation: acreg-rotate 24s linear infinite;
            }

            .acreg-logo {
                position: relative;
                z-index: 2;
                width: 86px;
                height: 86px;
                object-fit: contain;
                filter: drop-shadow(0 10px 22px rgba(41,121,242,.18));
            }

            .acreg-logo-check {
                position: absolute;
                right: 7px;
                bottom: 9px;
                z-index: 4;
                display: grid;
                place-items: center;
                width: 32px;
                height: 32px;
                border: 4px solid var(--bg2);
                border-radius: 50%;
                background: var(--green);
                color: #04130a;
            }

            .acreg-credential-name {
                margin-top: 23px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 15px;
                font-weight: 800;
                letter-spacing: -.02em;
            }

            .acreg-credential-sub {
                margin-top: 5px;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 9.5px;
            }

            .acreg-credential-bottom {
                position: relative;
                z-index: 2;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                padding-top: 15px;
                border-top: 1px solid var(--brd);
            }

            .acreg-credential-kv span {
                display: block;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.5px;
                letter-spacing: .08em;
                text-transform: uppercase;
            }

            .acreg-credential-kv strong {
                display: block;
                margin-top: 5px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 12.5px;
                font-weight: 760;
            }

            /* Trust strip */
            .acreg-trust-wrap {
                position: relative;
                z-index: 4;
                margin-top: -28px;
            }

            .acreg-trust {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                overflow: hidden;
                border: 1px solid var(--brd);
                border-radius: 20px;
                background: var(--brd);
                box-shadow: 0 20px 50px rgba(0,0,0,.08);
            }

            .acreg-trust-item {
                padding: 18px 21px;
                background: var(--card-bg);
            }

            .acreg-trust-item + .acreg-trust-item {
                border-left: 1px solid var(--brd);
            }

            .acreg-trust-label {
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.5px;
                letter-spacing: .10em;
                text-transform: uppercase;
            }

            .acreg-trust-value {
                margin-top: 6px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 14px;
                font-weight: 760;
            }

            .acreg-trust-meta {
                margin-top: 3px;
                color: var(--txt3);
                font-size: 10.5px;
            }

            /* =========================================================
               SHARED SECTIONS
            ========================================================= */
            .acreg-section {
                padding: 76px 0;
                border-bottom: 1px solid var(--brd);
            }

            .acreg-section--alt {
                background: var(--bg2);
            }

            .acreg-head {
                display: grid;
                grid-template-columns: minmax(0, 1fr) auto;
                gap: 28px;
                align-items: end;
                margin-bottom: 28px;
            }

            .acreg-head-copy {
                max-width: 720px;
            }

            .acreg-kicker {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                color: var(--blue-lt);
                font-family: var(--mono);
                font-size: 10px;
                font-weight: 650;
                letter-spacing: .11em;
                text-transform: uppercase;
            }

            [data-theme="light"] .acreg-kicker {
                color: var(--blue-dk);
            }

            .acreg-h2 {
                margin: 8px 0 9px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: clamp(25px, 3.6vw, 38px);
                font-weight: 840;
                letter-spacing: -.035em;
                line-height: 1.16;
            }

            .acreg-desc {
                max-width: 680px;
                margin: 0;
                color: var(--txt3);
                font-size: 13.5px;
                line-height: 1.82;
            }

            .acreg-chip {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 7px 10px;
                border: 1px solid var(--brd);
                border-radius: 10px;
                background: var(--card-bg);
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 9px;
                white-space: nowrap;
            }

            /* Registry */
            .acreg-registry {
                display: grid;
                grid-template-columns: repeat(12, minmax(0, 1fr));
                gap: 14px;
            }

            .acreg-reg-card {
                grid-column: span 6;
                position: relative;
                display: grid;
                grid-template-columns: 44px 1fr;
                gap: 14px;
                min-height: 120px;
                padding: 20px;
                overflow: hidden;
                border: 1px solid var(--brd);
                border-radius: 18px;
                background: var(--card-bg);
                transition:
                    border-color .25s ease,
                    transform .25s ease,
                    box-shadow .25s ease;
            }

            .acreg-reg-card:first-child {
                grid-column: span 8;
            }

            .acreg-reg-card:nth-child(2) {
                grid-column: span 4;
            }

            .acreg-reg-card:hover {
                transform: translateY(-3px);
                border-color: var(--brd2);
                box-shadow: 0 16px 38px rgba(41,121,242,.07);
            }

            .acreg-reg-card::after {
                content: '';
                position: absolute;
                right: -42px;
                top: -48px;
                width: 110px;
                height: 110px;
                border-radius: 50%;
                background: rgba(41,121,242,.05);
                pointer-events: none;
            }

            .acreg-reg-icon {
                position: relative;
                z-index: 2;
                display: grid;
                place-items: center;
                width: 44px;
                height: 44px;
                border: 1px solid rgba(41,121,242,.15);
                border-radius: 13px;
                background: rgba(41,121,242,.065);
                color: var(--blue-lt);
            }

            .acreg-reg-label {
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.8px;
                letter-spacing: .09em;
                text-transform: uppercase;
            }

            .acreg-reg-value {
                margin-top: 7px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 14.5px;
                font-weight: 760;
                line-height: 1.43;
                overflow-wrap: anywhere;
            }

            .acreg-reg-hint {
                margin-top: 5px;
                color: var(--txt3);
                font-size: 11px;
                line-height: 1.5;
            }

            .acreg-source-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 14px;
                margin-top: 14px;
            }

            .acreg-source {
                display: grid;
                grid-template-columns: 40px 1fr auto;
                align-items: center;
                gap: 13px;
                padding: 16px;
                border: 1px solid var(--brd);
                border-radius: 17px;
                background: var(--card-bg);
            }

            .acreg-source-icon {
                display: grid;
                place-items: center;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(41,121,242,.14);
                border-radius: 12px;
                background: rgba(41,121,242,.06);
                color: var(--blue-lt);
            }

            .acreg-source-title {
                color: var(--txt);
                font-family: var(--disp);
                font-size: 13px;
                font-weight: 740;
            }

            .acreg-source-copy {
                margin-top: 3px;
                color: var(--txt3);
                font-size: 10.5px;
                line-height: 1.5;
            }

            .acreg-source-link {
                display: grid;
                place-items: center;
                width: 32px;
                height: 32px;
                border: 1px solid var(--brd);
                border-radius: 9px;
                color: var(--txt3);
                text-decoration: none;
                transition: all .2s ease;
            }

            .acreg-source-link:hover {
                border-color: var(--brd2);
                color: var(--blue-lt);
                background: rgba(41,121,242,.05);
            }

            /* Capital */
            .acreg-capital {
                display: grid;
                grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
                gap: 18px;
            }

            .acreg-capital-main {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 318px;
                padding: 28px;
                overflow: hidden;
                border: 1px solid rgba(41,121,242,.18);
                border-radius: 23px;
                background:
                    radial-gradient(
                        circle at 86% 10%,
                        rgba(0,200,232,.08),
                        transparent 30%
                    ),
                    var(--card-bg);
            }

            .acreg-capital-main::after {
                content: '100%';
                position: absolute;
                right: -8px;
                bottom: -22px;
                color: rgba(41,121,242,.045);
                font-family: var(--disp);
                font-size: 105px;
                font-weight: 900;
                letter-spacing: -.08em;
                pointer-events: none;
            }

            .acreg-capital-small {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 9px;
                letter-spacing: .09em;
                text-transform: uppercase;
            }

            .acreg-capital-big {
                margin: 17px 0 7px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: clamp(38px, 5vw, 52px);
                font-weight: 850;
                letter-spacing: -.055em;
                line-height: 1;
            }

            .acreg-capital-sub {
                color: var(--txt3);
                font-size: 11.5px;
            }

            .acreg-progress-labels {
                display: flex;
                justify-content: space-between;
                gap: 12px;
                margin-bottom: 8px;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.5px;
            }

            .acreg-progress {
                height: 8px;
                overflow: hidden;
                border: 1px solid var(--brd);
                border-radius: 999px;
                background: var(--bg3);
            }

            .acreg-progress span {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                background: linear-gradient(
                    90deg,
                    var(--blue-dk),
                    var(--blue),
                    var(--cyan)
                );
                box-shadow: 0 0 20px rgba(41,121,242,.25);
            }

            .acreg-progress-note {
                position: relative;
                z-index: 2;
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 16px;
                color: var(--txt3);
                font-size: 11px;
            }

            .acreg-progress-note svg {
                color: var(--green);
            }

            .acreg-capital-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 14px;
            }

            .acreg-capital-card {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 152px;
                padding: 20px;
                border: 1px solid var(--brd);
                border-radius: 18px;
                background: var(--card-bg);
            }

            .acreg-capital-card-label {
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.7px;
                letter-spacing: .09em;
                text-transform: uppercase;
            }

            .acreg-capital-card-value {
                margin-top: 16px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 24px;
                font-weight: 820;
                letter-spacing: -.035em;
            }

            .acreg-capital-card-hint {
                margin-top: 6px;
                color: var(--txt3);
                font-size: 10.5px;
                line-height: 1.5;
            }

            /* Live value */
            .acreg-live {
                position: relative;
                overflow: hidden;
                border: 1px solid rgba(41,121,242,.20);
                border-radius: 25px;
                background:
                    radial-gradient(
                        circle at 92% 0%,
                        rgba(0,200,232,.075),
                        transparent 30%
                    ),
                    var(--card-bg);
                box-shadow: 0 24px 66px rgba(41,121,242,.055);
            }

            .acreg-live-main {
                display: grid;
                grid-template-columns: minmax(0, 1.12fr) minmax(280px, .88fr);
                gap: 30px;
                padding: 31px;
                border-bottom: 1px solid var(--brd);
            }

            .acreg-live-label {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 9px;
                letter-spacing: .09em;
                text-transform: uppercase;
            }

            .acreg-live-value {
                margin: 12px 0 8px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: clamp(38px, 5.5vw, 58px);
                font-weight: 860;
                letter-spacing: -.058em;
                line-height: 1;
            }

            .acreg-live-formula {
                display: flex;
                align-items: center;
                gap: 7px;
                color: var(--txt3);
                font-size: 11px;
            }

            .acreg-live-formula svg {
                color: var(--blue-lt);
            }

            .acreg-live-right {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: space-between;
                gap: 22px;
            }

            .acreg-feed-status {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 8px 10px;
                border: 1px solid var(--brd);
                border-radius: 999px;
                background: var(--bg2);
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 9px;
            }

            .acreg-feed-status[data-state="connected"] {
                color: var(--green);
                border-color: rgba(45,211,111,.2);
                background: rgba(45,211,111,.05);
            }

            .acreg-feed-status[data-state="error"] {
                color: var(--red);
                border-color: rgba(255,55,95,.18);
                background: rgba(255,55,95,.045);
            }

            .acreg-live-source {
                text-align: right;
            }

            .acreg-live-source span {
                display: block;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.4px;
                letter-spacing: .08em;
                text-transform: uppercase;
            }

            .acreg-live-source strong {
                display: block;
                margin-top: 4px;
                color: var(--txt2);
                font-size: 11px;
                font-weight: 600;
            }

            .acreg-refresh {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                margin-top: 11px;
                padding: 8px 11px;
                border: 1px solid var(--brd);
                border-radius: 9px;
                background: var(--card-bg);
                color: var(--txt2);
                font-family: var(--font);
                font-size: 10.5px;
                font-weight: 650;
                cursor: pointer;
                transition: all .2s ease;
            }

            .acreg-refresh:hover {
                border-color: var(--brd2);
                color: var(--txt);
                background: var(--card-hov);
            }

            .acreg-refresh:disabled {
                opacity: .55;
                cursor: wait;
            }

            .acreg-refresh.is-loading svg {
                animation: spin 1s linear infinite;
            }

            .acreg-live-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
            }

            .acreg-live-stat {
                padding: 19px 21px;
                border-right: 1px solid var(--brd);
            }

            .acreg-live-stat:last-child {
                border-right: 0;
            }

            .acreg-live-stat span {
                display: block;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.3px;
                letter-spacing: .08em;
                text-transform: uppercase;
            }

            .acreg-live-stat strong {
                display: block;
                margin-top: 6px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 13.5px;
                font-weight: 760;
                overflow-wrap: anywhere;
            }

            .acreg-live-note {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 10px;
                padding: 14px 18px;
                border-top: 1px solid var(--brd);
                background: rgba(41,121,242,.018);
                color: var(--txt3);
                font-size: 10.8px;
                line-height: 1.65;
            }

            .acreg-live-note svg {
                margin-top: 2px;
                color: var(--blue-lt);
            }

            /* Business */
            .acreg-business {
                display: grid;
                grid-template-columns: minmax(0, .74fr) minmax(0, 1.26fr);
                gap: 18px;
            }

            .acreg-business-intro,
            .acreg-business-scope {
                border: 1px solid var(--brd);
                border-radius: 22px;
                background: var(--card-bg);
            }

            .acreg-business-intro {
                position: relative;
                overflow: hidden;
                padding: 27px;
            }

            .acreg-business-intro::after {
                content: '';
                position: absolute;
                right: -83px;
                bottom: -92px;
                width: 190px;
                height: 190px;
                border-radius: 50%;
                border: 1px solid rgba(41,121,242,.10);
                box-shadow:
                    0 0 0 28px rgba(41,121,242,.022),
                    0 0 0 54px rgba(41,121,242,.014);
            }

            .acreg-business-icon {
                display: grid;
                place-items: center;
                width: 50px;
                height: 50px;
                border: 1px solid rgba(41,121,242,.15);
                border-radius: 15px;
                background: rgba(41,121,242,.065);
                color: var(--blue-lt);
            }

            .acreg-business-title {
                margin: 19px 0 8px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 20px;
                font-weight: 810;
                letter-spacing: -.025em;
            }

            .acreg-business-copy {
                position: relative;
                z-index: 2;
                margin: 0;
                color: var(--txt2);
                font-size: 12.5px;
                line-height: 1.82;
            }

            .acreg-business-scope {
                padding: 24px;
            }

            .acreg-scope-head {
                margin-bottom: 16px;
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 8.7px;
                letter-spacing: .09em;
                text-transform: uppercase;
            }

            .acreg-scope-list {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            .acreg-scope-item {
                display: flex;
                align-items: center;
                gap: 9px;
                min-height: 50px;
                padding: 11px 12px;
                border: 1px solid var(--brd);
                border-radius: 13px;
                background: var(--bg2);
                color: var(--txt2);
                font-size: 11.5px;
                line-height: 1.4;
            }

            .acreg-scope-check {
                display: grid;
                place-items: center;
                width: 24px;
                height: 24px;
                flex: 0 0 auto;
                border: 1px solid rgba(45,211,111,.14);
                border-radius: 7px;
                background: rgba(45,211,111,.06);
                color: var(--green);
            }

            /* Transparency */
            .acreg-transparency {
                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                gap: 15px;
                padding: 23px;
                border: 1px solid rgba(41,121,242,.16);
                border-radius: 20px;
                background:
                    linear-gradient(
                        120deg,
                        rgba(41,121,242,.055),
                        rgba(0,200,232,.02)
                    ),
                    var(--card-bg);
            }

            .acreg-transparency-icon {
                display: grid;
                place-items: center;
                width: 44px;
                height: 44px;
                border: 1px solid rgba(41,121,242,.14);
                border-radius: 13px;
                background: rgba(41,121,242,.06);
                color: var(--blue-lt);
            }

            .acreg-transparency h3 {
                margin: 0 0 4px;
                color: var(--txt);
                font-family: var(--disp);
                font-size: 14.5px;
                font-weight: 760;
            }

            .acreg-transparency p {
                max-width: 760px;
                margin: 0;
                color: var(--txt3);
                font-size: 11px;
                line-height: 1.65;
            }

            .acreg-transparency-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 7px 9px;
                border: 1px solid rgba(45,211,111,.18);
                border-radius: 999px;
                background: rgba(45,211,111,.05);
                color: var(--green);
                font-family: var(--mono);
                font-size: 8.7px;
                white-space: nowrap;
            }

            /* Reveal */
            .acreg [data-acreg-reveal] {
                opacity: 0;
                transform: translateY(16px);
                transition:
                    opacity .5s cubic-bezier(.16,1,.3,1),
                    transform .5s cubic-bezier(.16,1,.3,1);
            }

            .acreg [data-acreg-reveal].in {
                opacity: 1;
                transform: none;
            }

            @keyframes acreg-rotate {
                to { transform: rotate(360deg); }
            }

            /* Responsive */
            @media (max-width: 1120px) {
                .acreg-shell {
                    width: min(100% - 64px, 1040px);
                }

                .acreg-hero-grid {
                    grid-template-columns: minmax(0, 1fr) 320px;
                    gap: 36px;
                }

                .acreg-live-stats {
                    grid-template-columns: repeat(2, 1fr);
                }

                .acreg-live-stat:nth-child(2) {
                    border-right: 0;
                }

                .acreg-live-stat:nth-child(-n + 2) {
                    border-bottom: 1px solid var(--brd);
                }
            }

            @media (max-width: 900px) {
                .acreg-shell {
                    width: min(100% - 48px, 820px);
                }

                .acreg-hero-grid {
                    grid-template-columns: 1fr;
                }

                .acreg-credential {
                    width: min(100%, 430px);
                    margin-inline: auto;
                }

                .acreg-reg-card,
                .acreg-reg-card:first-child,
                .acreg-reg-card:nth-child(2) {
                    grid-column: span 6;
                }

                .acreg-capital,
                .acreg-business {
                    grid-template-columns: 1fr;
                }

                .acreg-live-main {
                    grid-template-columns: 1fr;
                }

                .acreg-live-right {
                    align-items: flex-start;
                }

                .acreg-live-source {
                    text-align: left;
                }
            }

            @media (max-width: 639px) {
                .acreg-shell {
                    width: min(100% - 32px, 620px);
                }

                .acreg-hero {
                    padding: 62px 0 52px;
                }

                .acreg-title {
                    font-size: clamp(34px, 10.5vw, 46px);
                }

                .acreg-lead {
                    font-size: 14px;
                    line-height: 1.76;
                }

                .acreg-id-row {
                    flex-direction: column;
                    align-items: stretch;
                }

                .acreg-id-pill {
                    justify-content: center;
                }

                .acreg-trust-wrap {
                    margin-top: -18px;
                }

                .acreg-trust {
                    grid-template-columns: 1fr;
                }

                .acreg-trust-item + .acreg-trust-item {
                    border-left: 0;
                    border-top: 1px solid var(--brd);
                }

                .acreg-section {
                    padding: 52px 0;
                }

                .acreg-head {
                    grid-template-columns: 1fr;
                    gap: 12px;
                }

                .acreg-chip {
                    width: fit-content;
                }

                .acreg-registry {
                    grid-template-columns: 1fr;
                }

                .acreg-reg-card,
                .acreg-reg-card:first-child,
                .acreg-reg-card:nth-child(2) {
                    grid-column: auto;
                }

                .acreg-source-row {
                    grid-template-columns: 1fr;
                }

                .acreg-capital-grid {
                    grid-template-columns: 1fr;
                }

                .acreg-live-main {
                    padding: 24px 20px;
                }

                .acreg-live-value {
                    font-size: clamp(35px, 11vw, 47px);
                }

                .acreg-live-stats {
                    grid-template-columns: 1fr;
                }

                .acreg-live-stat {
                    border-right: 0 !important;
                    border-bottom: 1px solid var(--brd);
                }

                .acreg-live-stat:last-child {
                    border-bottom: 0;
                }

                .acreg-scope-list {
                    grid-template-columns: 1fr;
                }

                .acreg-transparency {
                    grid-template-columns: auto 1fr;
                }

                .acreg-transparency-badge {
                    grid-column: 1 / -1;
                    justify-self: start;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .acreg *,
                .acreg *::before,
                .acreg *::after {
                    animation-duration: .001ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: .001ms !important;
                }

                .acreg [data-acreg-reveal] {
                    opacity: 1 !important;
                    transform: none !important;
                }
            }
        `;

        document.head.appendChild(style);

        const revealItems = Array.from(
            document.querySelectorAll<HTMLElement>('[data-acreg-reveal]'),
        );

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            revealItems.forEach((item) => item.classList.add('in'));

            return () => {
                style.remove();
            };
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.07,
                rootMargin: '0px 0px 60px 0px',
            },
        );

        revealItems.forEach((item) => observer.observe(item));

        return () => {
            observer.disconnect();
            style.remove();
        };
    }, []);

    const connected = feedState === 'connected';

    const estimatedBookValue = useMemo(() => {
        if (!metrics) {
            return null;
        }

        if (typeof metrics.estimated_book_value_per_share === 'number') {
            return metrics.estimated_book_value_per_share;
        }

        if (typeof metrics.net_assets === 'number') {
            return metrics.net_assets / TOTAL_SHARES;
        }

        return null;
    }, [metrics]);

    const feedText: Record<FeedState, string> = {
        loading: 'Checking financial feed',
        connected: 'Financial data connected',
        pending: 'Bank / accounting API pending',
        error: 'Financial feed unavailable',
    };

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://ayamilcoders.com/#organization',
                name: 'Ayamil Coders',
                legalName: 'AYAMIL CODERS (SMC-PRIVATE) LIMITED',
                url: 'https://ayamilcoders.com',
                identifier: [
                    {
                        '@type': 'PropertyValue',
                        name: 'SECP Corporate Unique Identification Number',
                        value: '0357981',
                    },
                    {
                        '@type': 'PropertyValue',
                        name: 'FBR Registration Number',
                        value: 'K075347',
                    },
                ],
            },
            {
                '@type': 'WebPage',
                '@id': `${PAGE_URL}#webpage`,
                url: PAGE_URL,
                name: 'Company Registration - Ayamil Coders',
                about: {
                    '@id': 'https://ayamilcoders.com/#organization',
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${PAGE_URL}#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://ayamilcoders.com/',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Company Registration',
                        item: PAGE_URL,
                    },
                ],
            },
        ],
    };

    return (
        <div className="acreg">
            <SEO
                title="Company Registration & Corporate Information"
                description="Public corporate registration profile for AYAMIL CODERS (SMC-PRIVATE) LIMITED, including SECP CUIN, FBR registration, share capital, principal business scope and an API-ready estimated book value per share."
                keywords="Ayamil Coders registration, AYAMIL CODERS SMC PRIVATE LIMITED, SECP CUIN 0357981, FBR K075347, company registration Pakistan"
                url={PAGE_URL}
                schema={schema}
            />

            {/* =====================================================
                FIRST SECTION
                Uses SAME SITE COLOR via var(--bg2)
            ===================================================== */}
            <section className="acreg-hero">
                <img
                    src="/logo/ac-512.png"
                    alt=""
                    className="acreg-watermark"
                    aria-hidden="true"
                />

                <div className="acreg-shell acreg-hero-grid">
                    <div>
                        <div className="acreg-eyebrow">
                            <Fingerprint size={14} />
                            Corporate Registration Profile
                        </div>

                        <h1 className="acreg-title">
                            AYAMIL CODERS
                            <span>(SMC-PRIVATE) LIMITED</span>
                        </h1>

                        <p className="acreg-lead">
                            A public, privacy-conscious corporate profile showing
                            selected registration details, share-capital information
                            and an API-ready financial indicator for Ayamil Coders.
                        </p>

                        <div className="acreg-id-row">
                            <span className="acreg-id-pill acreg-id-pill--ok">
                                <span className="acreg-dot" />
                                <strong>SECP Incorporated</strong>
                            </span>

                            <span className="acreg-id-pill">
                                CUIN
                                <strong>0357981</strong>
                            </span>

                            <span className="acreg-id-pill">
                                FBR
                                <strong>K075347</strong>
                            </span>
                        </div>
                    </div>

                    <div className="acreg-credential">
                        <div className="acreg-credential-top">
                            <div className="acreg-credential-label">
                                Corporate identity record
                            </div>

                            <div className="acreg-credential-status">
                                <span className="acreg-dot" />
                                On file
                            </div>
                        </div>

                        <div className="acreg-credential-center">
                            <div className="acreg-logo-ring">
                                <img
                                    src="/logo/ac-512.png"
                                    alt="Ayamil Coders"
                                    className="acreg-logo"
                                />

                                <div className="acreg-logo-check">
                                    <Check size={15} strokeWidth={3} />
                                </div>
                            </div>

                            <div className="acreg-credential-name">
                                AYAMIL CODERS
                            </div>

                            <div className="acreg-credential-sub">
                                SMC-PRIVATE LIMITED · PAKISTAN
                            </div>
                        </div>

                        <div className="acreg-credential-bottom">
                            <div className="acreg-credential-kv">
                                <span>SECP CUIN</span>
                                <strong>0357981</strong>
                            </div>

                            <div className="acreg-credential-kv">
                                <span>FBR Registration</span>
                                <strong>K075347</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust strip */}
            <div className="acreg-shell acreg-trust-wrap">
                <div className="acreg-trust">
                    <div className="acreg-trust-item">
                        <div className="acreg-trust-label">
                            Corporate Registry
                        </div>
                        <div className="acreg-trust-value">
                            SECP
                        </div>
                        <div className="acreg-trust-meta">
                            Corporate identifier on file
                        </div>
                    </div>

                    <div className="acreg-trust-item">
                        <div className="acreg-trust-label">
                            Tax Registration
                        </div>
                        <div className="acreg-trust-value">
                            FBR / IRIS
                        </div>
                        <div className="acreg-trust-meta">
                            Income-tax registration record
                        </div>
                    </div>

                    <div className="acreg-trust-item">
                        <div className="acreg-trust-label">
                            Legal Form
                        </div>
                        <div className="acreg-trust-value">
                            SMC-Private Limited
                        </div>
                        <div className="acreg-trust-meta">
                            Limited by shares
                        </div>
                    </div>
                </div>
            </div>

            {/* Registry */}
            <section className="acreg-section">
                <div className="acreg-shell">
                    <div className="acreg-head" data-acreg-reveal>
                        <div className="acreg-head-copy">
                            <div className="acreg-kicker">
                                <BadgeCheck size={14} />
                                Company Record
                            </div>

                            <h2 className="acreg-h2">
                                Core corporate identity.
                            </h2>

                            <p className="acreg-desc">
                                Only company-level registration information is shown
                                here. Personal identity records and private contact
                                information are intentionally excluded.
                            </p>
                        </div>

                        <div className="acreg-chip">
                            <Database size={13} />
                            Public company profile
                        </div>
                    </div>

                    <div className="acreg-registry">
                        {registryItems.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    className="acreg-reg-card"
                                    data-acreg-reveal
                                    key={item.label}
                                    style={{
                                        transitionDelay: `${Math.min(index * 35, 140)}ms`,
                                    }}
                                >
                                    <div className="acreg-reg-icon">
                                        <Icon size={19} />
                                    </div>

                                    <div>
                                        <div className="acreg-reg-label">
                                            {item.label}
                                        </div>

                                        <div className="acreg-reg-value">
                                            {item.value}
                                        </div>

                                        <div className="acreg-reg-hint">
                                            {item.hint}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="acreg-source-row">
                        <div className="acreg-source" data-acreg-reveal>
                            <div className="acreg-source-icon">
                                <Landmark size={18} />
                            </div>

                            <div>
                                <div className="acreg-source-title">
                                    SECP Corporate Record
                                </div>

                                <div className="acreg-source-copy">
                                    Corporate registration source for company identity
                                    and legal structure.
                                </div>
                            </div>

                            <a
                                href="https://www.secp.gov.pk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="acreg-source-link"
                                aria-label="Open official SECP website"
                            >
                                <ExternalLink size={14} />
                            </a>
                        </div>

                        <div className="acreg-source" data-acreg-reveal>
                            <div className="acreg-source-icon">
                                <FileCheck2 size={18} />
                            </div>

                            <div>
                                <div className="acreg-source-title">
                                    FBR Registration Record
                                </div>

                                <div className="acreg-source-copy">
                                    Income-tax registration record associated with the
                                    company&apos;s FBR / IRIS profile.
                                </div>
                            </div>

                            <a
                                href="https://www.fbr.gov.pk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="acreg-source-link"
                                aria-label="Open official FBR website"
                            >
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capital */}
            <section className="acreg-section acreg-section--alt">
                <div className="acreg-shell">
                    <div className="acreg-head" data-acreg-reveal>
                        <div className="acreg-head-copy">
                            <div className="acreg-kicker">
                                <CircleDollarSign size={14} />
                                Share Capital
                            </div>

                            <h2 className="acreg-h2">
                                Registered capital structure.
                            </h2>

                            <p className="acreg-desc">
                                Face value is the official nominal value per share.
                                It is separate from the estimated book-value indicator
                                shown in the next section.
                            </p>
                        </div>

                        <div className="acreg-chip">
                            <Scale size={13} />
                            1,000 ordinary shares
                        </div>
                    </div>

                    <div className="acreg-capital">
                        <div className="acreg-capital-main" data-acreg-reveal>
                            <div>
                                <div className="acreg-capital-small">
                                    <CircleDollarSign size={14} />
                                    Paid-up capital ratio
                                </div>

                                <div className="acreg-capital-big">
                                    100%
                                </div>

                                <div className="acreg-capital-sub">
                                    Paid-up capital equals authorized capital
                                </div>
                            </div>

                            <div>
                                <div className="acreg-progress-labels">
                                    <span>PKR 0</span>
                                    <span>PKR 10,000</span>
                                </div>

                                <div className="acreg-progress">
                                    <span />
                                </div>

                                <div className="acreg-progress-note">
                                    <Check size={14} strokeWidth={2.5} />
                                    Registered paid-up capital: PKR 10,000
                                </div>
                            </div>
                        </div>

                        <div className="acreg-capital-grid">
                            {capitalItems.map((item, index) => (
                                <article
                                    className="acreg-capital-card"
                                    data-acreg-reveal
                                    key={item.label}
                                    style={{
                                        transitionDelay: `${Math.min(index * 40, 120)}ms`,
                                    }}
                                >
                                    <div className="acreg-capital-card-label">
                                        {item.label}
                                    </div>

                                    <div>
                                        <div className="acreg-capital-card-value">
                                            {item.value}
                                        </div>

                                        <div className="acreg-capital-card-hint">
                                            {item.hint}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Book Value */}
            <section className="acreg-section">
                <div className="acreg-shell">
                    <div className="acreg-head" data-acreg-reveal>
                        <div className="acreg-head-copy">
                            <div className="acreg-kicker">
                                <TrendingUp size={14} />
                                Financial Indicator
                            </div>

                            <h2 className="acreg-h2">
                                Estimated book value per share.
                            </h2>

                            <p className="acreg-desc">
                                Once a bank or accounting source is connected, this
                                section can update automatically from the latest
                                synchronized financial snapshot.
                            </p>
                        </div>

                        <div className="acreg-chip">
                            <Calculator size={13} />
                            Net assets ÷ 1,000
                        </div>
                    </div>

                    <div className="acreg-live" data-acreg-reveal>
                        <div className="acreg-live-main">
                            <div>
                                <div className="acreg-live-label">
                                    <TrendingUp size={14} />
                                    Estimated book value / share
                                </div>

                                <div className="acreg-live-value" aria-live="polite">
                                    {feedState === 'loading'
                                        ? 'Loading…'
                                        : connected
                                          ? formatPKR(estimatedBookValue)
                                          : 'Not connected'}
                                </div>

                                <div className="acreg-live-formula">
                                    <Calculator size={13} />
                                    Net assets ÷ {TOTAL_SHARES.toLocaleString('en-PK')} ordinary shares
                                </div>
                            </div>

                            <div className="acreg-live-right">
                                <div
                                    className="acreg-feed-status"
                                    data-state={feedState}
                                    aria-live="polite"
                                >
                                    {feedState === 'connected' && (
                                        <span className="acreg-dot" />
                                    )}

                                    {feedState !== 'connected' && (
                                        <Database size={12} />
                                    )}

                                    {feedText[feedState]}
                                </div>

                                <div>
                                    <div className="acreg-live-source">
                                        <span>Data Source</span>
                                        <strong>
                                            {connected
                                                ? metrics?.source || 'Financial sync'
                                                : 'Awaiting bank / accounting integration'}
                                        </strong>
                                    </div>

                                    <button
                                        type="button"
                                        className={`acreg-refresh${refreshing ? ' is-loading' : ''}`}
                                        onClick={() => void loadMetrics(true)}
                                        disabled={refreshing}
                                    >
                                        <RefreshCw size={13} />
                                        {refreshing ? 'Refreshing…' : 'Refresh'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="acreg-live-stats">
                            <div className="acreg-live-stat">
                                <span>Official Face Value</span>
                                <strong>{formatPKR(FACE_VALUE)}</strong>
                            </div>

                            <div className="acreg-live-stat">
                                <span>Net Assets</span>
                                <strong>
                                    {connected
                                        ? formatCompactPKR(metrics?.net_assets)
                                        : '—'}
                                </strong>
                            </div>

                            <div className="acreg-live-stat">
                                <span>Total Liabilities</span>
                                <strong>
                                    {connected
                                        ? formatCompactPKR(metrics?.total_liabilities)
                                        : '—'}
                                </strong>
                            </div>

                            <div className="acreg-live-stat">
                                <span>Last Synchronized</span>
                                <strong>
                                    {formatDate(metrics?.last_updated)}
                                </strong>
                            </div>
                        </div>

                        <div className="acreg-live-note">
                            <ShieldCheck size={15} />

                            <span>
                                <strong style={{ color: 'var(--txt2)' }}>
                                    Financial context:
                                </strong>{' '}
                                this is an estimated book-value indicator based on
                                company net assets. It is not a stock-market price,
                                public trading quotation, valuation certificate or an
                                offer to buy or sell shares.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Scope */}
            <section className="acreg-section acreg-section--alt">
                <div className="acreg-shell">
                    <div className="acreg-head" data-acreg-reveal>
                        <div className="acreg-head-copy">
                            <div className="acreg-kicker">
                                <Building2 size={14} />
                                Principal Business
                            </div>

                            <h2 className="acreg-h2">
                                Information technology & software services.
                            </h2>

                            <p className="acreg-desc">
                                A concise public summary of the company&apos;s
                                technology-focused business scope.
                            </p>
                        </div>
                    </div>

                    <div className="acreg-business">
                        <article
                            className="acreg-business-intro"
                            data-acreg-reveal
                        >
                            <div className="acreg-business-icon">
                                <Building2 size={23} />
                            </div>

                            <h3 className="acreg-business-title">
                                Technology Business Scope
                            </h3>

                            <p className="acreg-business-copy">
                                The company&apos;s principal business includes
                                software development, data processing, computer and
                                technology services, IT consultancy, software and
                                hardware related services, professional training, and
                                permitted software and hardware trading activities,
                                subject to approvals required by relevant authorities.
                            </p>
                        </article>

                        <div
                            className="acreg-business-scope"
                            data-acreg-reveal
                        >
                            <div className="acreg-scope-head">
                                Scope Highlights
                            </div>

                            <div className="acreg-scope-list">
                                {scopeItems.map((item) => (
                                    <div
                                        className="acreg-scope-item"
                                        key={item}
                                    >
                                        <span className="acreg-scope-check">
                                            <Check size={13} strokeWidth={2.6} />
                                        </span>

                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy / Transparency */}
            <section className="acreg-section">
                <div className="acreg-shell">
                    <div
                        className="acreg-transparency"
                        data-acreg-reveal
                    >
                        <div className="acreg-transparency-icon">
                            <ShieldCheck size={20} />
                        </div>

                        <div>
                            <h3>
                                Privacy-conscious corporate transparency
                            </h3>

                            <p>
                                This page intentionally publishes selected
                                company-level information only. Personal CNIC
                                numbers, nominee records, residential information,
                                personal contact details and other private records
                                are not displayed.
                            </p>
                        </div>

                        <div className="acreg-transparency-badge">
                            <span className="acreg-dot" />
                            Public Profile
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}