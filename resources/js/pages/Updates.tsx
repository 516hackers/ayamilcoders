import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ArrowRight, ArrowUpRight, CalendarDays, CheckCheck, GitCommitHorizontal,
    History, Info, Layers3, SlidersHorizontal,
} from 'lucide-react';
import SEO from '@/components/SEO';

/**
 * Ayamil Coders — public, accessible 13-month retrospective.
 *
 * Evidence rules (important for trust + SEO):
 * 1. "Repository record" means the date is supported by a public Git commit.
 * 2. "Prepared update" refers to code prepared/reviewed in October 2026;
 *    production deployment has NOT been independently confirmed.
 * 3. "Framework record" refers to the underlying Laravel starter-kit history;
 *    do not describe it as an Ayamil Coders-specific release.
 * 4. Unverified months intentionally have an archive-gap message. Do NOT
 *    invent issue resolutions or backdate updates simply to fill the calendar.
 *
 * When verifying a release, update its evidence and the visible dates together.
 * Keep the page's publication metadata separate from these historical events.
 */

type Category = 'feature' | 'fix' | 'performance' | 'security' | 'experience' | 'foundation';
type Evidence = 'repository' | 'framework' | 'prepared';
type Change = {
    title: string;
    detail: string;
    date: string;
    category: Category;
    evidence: Evidence;
    commit?: string;
};
type Month = {
    id: string;
    title: string;
    summary: string;
    entries: Change[];
};

const REPO = 'https://github.com/516hackers/ayamilcoders/commit/';
const months: Month[] = [
    {
        id: '2026-10', title: 'October 2026', summary: 'Experience, reliability, and presentation refinements',
        entries: [
            { date: '2026-10-12', title: 'Mobile content and inquiry feedback', detail: 'Prepared additional mobile guidance and restored visible success/error toast feedback to the homepage inquiry flow.', category: 'experience', evidence: 'prepared' },
            { date: '2026-10-12', title: 'React navigation and DOM safety review', detail: 'Prepared safer React-managed form states, internal link consistency, and first-visit/hydration compatibility improvements.', category: 'fix', evidence: 'prepared' },
            { date: '2026-10-12', title: 'Mobile-first interaction refinements', detail: 'Reviewed mobile tabs, screen-reader behavior, touch gestures, input focus, small screens, and safe-area spacing.', category: 'experience', evidence: 'prepared' },
            { date: '2026-10-12', title: 'Three-month support wording aligned', detail: 'Prepared consistent complimentary post-launch support copy across public service and policy content.', category: 'fix', evidence: 'prepared' },
            { date: '2026-10-12', title: 'Forms and validation hardening', detail: 'Prepared contact-form submission improvements, server-side validation and rate-limiting alignment with the existing database.', category: 'security', evidence: 'prepared' },
            { date: '2026-10-12', title: 'Dark and light appearance pass', detail: 'Prepared better card separation, select-option readability, theme persistence and light-mode code-window colors.', category: 'experience', evidence: 'prepared' },
            { date: '2026-10-12', title: 'Premium icon and navigation polish', detail: 'Prepared a consistent lightweight icon direction and restrained floating mobile dock styling.', category: 'experience', evidence: 'prepared' },
            { date: '2026-10-11', title: 'Shared mobile dock styling update', detail: 'Repository changes document a quieter four-target floating navigation with reduced 3D treatment.', category: 'experience', evidence: 'repository', commit: 'b43948596' },
        ],
    },
    {
        id: '2026-09', title: 'September 2026', summary: 'Company information and verification content',
        entries: [
            { date: '2026-09-25', title: 'Company details updated', detail: 'Repository revisions covered the presentation of verified company details and related public-facing information.', category: 'feature', evidence: 'repository', commit: '87ffc217b' },
            { date: '2026-09-25', title: 'Verification presentation refined', detail: 'A companion change in the repository continued the company-information presentation work.', category: 'experience', evidence: 'repository', commit: 'f478e3372' },
        ],
    },
    {
        id: '2026-08', title: 'August 2026', summary: 'Archive coverage review',
        entries: [],
    },
    {
        id: '2026-07', title: 'July 2026', summary: 'New pages, lifecycle stability, and load-state refinements',
        entries: [
            { date: '2026-07-27', title: 'Scroll-reveal motion refined', detail: 'Fade-in transitions were adjusted to improve how sections enter the viewport.', category: 'experience', evidence: 'repository', commit: 'cb5d308f2' },
            { date: '2026-07-26', title: 'Additional website content', detail: 'A repository change introduced new site additions; exact scope is best verified against the linked diff.', category: 'feature', evidence: 'repository', commit: '7c59de56c' },
            { date: '2026-07-07', title: 'Founder presentation updated', detail: 'Public-facing founder information received a dedicated update.', category: 'feature', evidence: 'repository', commit: '15bdc437a' },
            { date: '2026-07-06', title: 'Solutions page development', detail: 'The Solutions experience was developed through a series of repository revisions.', category: 'feature', evidence: 'repository', commit: '339446ef1' },
            { date: '2026-07-05', title: 'Runtime performance pass', detail: 'Performance-oriented adjustments were recorded for the website codebase.', category: 'performance', evidence: 'repository', commit: '43a3f407b' },
            { date: '2026-07-02', title: 'Loading and first-paint work', detail: 'Loading-state and skeleton-related code was revised.', category: 'performance', evidence: 'repository', commit: '8496bb2e0' },
            { date: '2026-07-02', title: 'Issue resolution pass', detail: 'A bug-fix commit recorded a targeted stability revision.', category: 'fix', evidence: 'repository', commit: '30c4d6c84' },
            { date: '2026-07-01', title: 'Page lifecycle work', detail: 'Lifecycle handling received multiple updates aimed at more predictable page behavior.', category: 'fix', evidence: 'repository', commit: '80f79c62e' },
        ],
    },
    {
        id: '2026-06', title: 'June 2026', summary: 'Public website foundation, discoverability, and performance',
        entries: [
            { date: '2026-06-30', title: 'Performance improvements', detail: 'A repository revision focused on reducing performance overhead.', category: 'performance', evidence: 'repository', commit: '5348305a2' },
            { date: '2026-06-29', title: 'Leadership content expanded', detail: 'CEO-related page content was added or revised.', category: 'feature', evidence: 'repository', commit: 'dfe668045' },
            { date: '2026-06-28', title: 'Frontend speed tuning', detail: 'Several revisions targeted website performance and responsiveness.', category: 'performance', evidence: 'repository', commit: '6a5f83192' },
            { date: '2026-06-27', title: 'AI-search discoverability work', detail: 'LLM-oriented changes were recorded as part of website discoverability work.', category: 'feature', evidence: 'repository', commit: '89e87fd00' },
            { date: '2026-06-13', title: 'Website codebase foundation', detail: 'The Ayamil Coders website work begins appearing explicitly in the available repository history.', category: 'foundation', evidence: 'repository', commit: 'f4307da5c' },
        ],
    },
    {
        id: '2026-05', title: 'May 2026', summary: 'Underlying Laravel framework maintenance',
        entries: [
            { date: '2026-05-20', title: 'Email verification redirect corrected', detail: 'The inherited Laravel starter-kit code fixed a Teams email-verification redirect path; this is framework history, not a confirmed public-site deployment.', category: 'fix', evidence: 'framework', commit: '09801ef75' },
            { date: '2026-05-18', title: 'Passkey capabilities added to framework', detail: 'The upstream starter-kit code gained passkey support; public deployment on Ayamil Coders is not independently verified.', category: 'security', evidence: 'framework', commit: 'cd12fe3ff' },
            { date: '2026-05-13', title: 'Password input guidance enhanced', detail: 'Framework-side password rule attributes were improved for account flows.', category: 'security', evidence: 'framework', commit: 'b24eeeab3' },
        ],
    },
    {
        id: '2026-04', title: 'April 2026', summary: 'Framework feedback and form usability',
        entries: [
            { date: '2026-04-30', title: 'Two-factor input focus fixed', detail: 'A starter-kit revision restored appropriate autofocus behavior to two-factor authentication input.', category: 'fix', evidence: 'framework', commit: 'a1a591422' },
            { date: '2026-04-13', title: 'Validation rule modernization', detail: 'Framework validation was migrated away from a deprecated rule interface.', category: 'security', evidence: 'framework', commit: 'efe045a04' },
            { date: '2026-04-08', title: 'Toast notification infrastructure', detail: 'The base starter-kit introduced reusable toast notifications; this entry tracks shared framework evolution.', category: 'experience', evidence: 'framework', commit: '26b535438' },
        ],
    },
    {
        id: '2026-03', title: 'March 2026', summary: 'Typed permissions, SSR safeguards, and build tooling',
        entries: [
            { date: '2026-03-31', title: 'Type-safe team permissions', detail: 'The Laravel starter-kit introduced an enum-based permission model for team-related capabilities.', category: 'security', evidence: 'framework', commit: '5cce573f0' },
            { date: '2026-03-18', title: 'Vite toolchain moved forward', detail: 'Framework tooling was updated to the Vite 8 ecosystem.', category: 'performance', evidence: 'framework', commit: '81cfb35e9' },
            { date: '2026-03-11', title: 'SSR URL-hook safety fix', detail: 'A server-side rendering guard corrected a window-reference issue in framework URL hooks.', category: 'fix', evidence: 'framework', commit: 'cadfedc00' },
        ],
    },
    {
        id: '2026-02', title: 'February 2026', summary: 'Theme behavior and typed navigation groundwork',
        entries: [
            { date: '2026-02-26', title: 'Breadcrumb types improved', detail: 'Underlying starter-kit navigation types were refined for clearer component contracts.', category: 'foundation', evidence: 'framework', commit: '156fd21ea' },
            { date: '2026-02-17', title: 'System appearance notification fix', detail: 'Base appearance-hook listeners were corrected to respond to system theme changes.', category: 'fix', evidence: 'framework', commit: '45b7bf2f7' },
        ],
    },
    {
        id: '2026-01', title: 'January 2026', summary: 'Earlier framework and component compatibility',
        entries: [
            { date: '2026-01-26', title: 'React tooltip typing correction', detail: 'An inherited React starter-kit fix addressed tooltip-trigger type-checking.', category: 'fix', evidence: 'framework', commit: 'd143bf4ca' },
        ],
    },
    { id: '2025-12', title: 'December 2025', summary: 'Earlier website archive', entries: [] },
    { id: '2025-11', title: 'November 2025', summary: 'Earlier website archive', entries: [] },
    { id: '2025-10', title: 'October 2025', summary: 'Earlier website archive', entries: [] },
];

const categoryLabels: Record<Category, string> = {
    feature: 'New & Improved', fix: 'Issue Resolved', performance: 'Performance',
    security: 'Reliability', experience: 'Experience', foundation: 'Foundation',
};
const evidenceLabels: Record<Evidence, string> = {
    repository: 'Repository record', framework: 'Framework record', prepared: 'Prepared update',
};
const categories: Array<{ value: Category | 'all'; label: string }> = [
    { value: 'all', label: 'All updates' }, { value: 'feature', label: 'Features' },
    { value: 'fix', label: 'Fixes' }, { value: 'performance', label: 'Speed' },
    { value: 'security', label: 'Reliability' }, { value: 'experience', label: 'Experience' },
    { value: 'foundation', label: 'Foundation' },
];

const totalEntries = months.reduce((sum, month) => sum + month.entries.length, 0);
const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (date: string) => `${date.slice(8, 10)} ${monthAbbreviations[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`;
const archiveStart = 'October 2025';
const archiveEnd = 'October 2026';
const pageUrl = 'https://ayamilcoders.com/updates';
const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#webpage`,
            name: 'Website Updates & Changelog — Ayamil Coders',
            description: 'A 13-month, evidence-labelled retrospective of Ayamil Coders website improvements, technical fixes, design work and framework history.',
            url: pageUrl,
            inLanguage: 'en',
            isPartOf: { '@id': 'https://ayamilcoders.com/#website' },
            about: { '@id': 'https://ayamilcoders.com/#organization' },
            mainEntity: { '@id': `${pageUrl}#months` },
        },
        {
            '@type': 'ItemList', '@id': `${pageUrl}#months`,
            name: 'Monthly website development archive',
            numberOfItems: months.length,
            itemListElement: months.map((month, index) => ({
                '@type': 'ListItem', position: index + 1,
                name: month.title, url: `${pageUrl}#${month.id}`,
            })),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ayamilcoders.com/' },
                { '@type': 'ListItem', position: 2, name: 'Updates & Changelog', item: pageUrl },
            ],
        },
    ],
};

const styles = `
/* Updates page uses existing theme tokens. No imported icon files or runtime dependencies. */
.acu{color:var(--txt);background:var(--bg);min-height:100vh}
.acu *{box-sizing:border-box}
.acu-inner{width:min(1090px,calc(100% - 80px));margin-inline:auto}
.acu-top{position:relative;overflow:hidden;border-bottom:1px solid var(--brd);background:var(--bg2);padding:78px 0 60px}
.acu-top:before{content:'';position:absolute;inset:auto -100px -150px auto;width:480px;height:440px;background:radial-gradient(circle,rgba(41,121,242,.13),transparent 70%);pointer-events:none}
.acu-breadcrumb{display:flex;align-items:center;gap:9px;color:var(--txt2);font-size:12px;margin-bottom:27px}
.acu-breadcrumb a{color:var(--txt2);text-decoration:none}
.acu-breadcrumb a:hover{color:var(--blue)}
.acu-kicker{display:inline-flex!important;align-self:flex-start;width:max-content;max-width:100%;margin:0;letter-spacing:.07em}
.acu-top h1{font-family:var(--disp);font-size:clamp(33px,5vw,60px);letter-spacing:-.045em;line-height:1.08;max-width:790px;margin:19px 0 18px;font-weight:800}
.acu-top h1 em{font-style:normal;background:linear-gradient(110deg,var(--blue),var(--cyan));background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.acu-lead{max-width:700px;font-size:15px;color:var(--txt2);line-height:1.85}
.acu-stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.acu-stat{display:flex;align-items:center;gap:9px;border:1px solid var(--brd);background:var(--card-bg);border-radius:12px;padding:11px 14px;color:var(--txt2);font-size:12px;font-weight:600}
.acu-stat svg{color:var(--blue);flex:none}
.acu-disclosure{display:flex;align-items:flex-start;gap:12px;border:1px solid var(--brd2);background:rgba(41,121,242,.06);border-radius:15px;padding:16px 18px;margin-top:26px;max-width:850px}
.acu-disclosure svg{flex:none;color:var(--blue);margin-top:2px}
.acu-disclosure p{font-size:12.5px;line-height:1.75;color:var(--txt2)}
.acu-disclosure strong{color:var(--txt)}
.acu-shell{padding:41px 0 82px}
.acu-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:17px}
.acu-toolbar h2{font-family:var(--disp);font-size:24px;font-weight:800;letter-spacing:-.03em}
.acu-toolbar p{font-size:12px;color:var(--txt2);margin-top:5px}
.acu-filter-list{display:flex;gap:8px;overflow-x:auto;scrollbar-width:thin;padding:5px 0 14px;margin-bottom:12px;-webkit-overflow-scrolling:touch}
.acu-filter{display:inline-flex;align-items:center;justify-content:center;gap:7px;white-space:nowrap;flex:none;border:1px solid var(--brd);background:var(--card-bg);color:var(--txt2);font:600 12px var(--font);padding:10px 15px;border-radius:11px;min-height:42px;cursor:pointer;transition:background .15s ease,color .15s ease,border-color .15s ease}
.acu-filter:hover{border-color:var(--brd2);color:var(--txt)}
.acu-filter[aria-pressed="true"]{color:#fff;background:var(--blue-dk);border-color:var(--blue-dk)}
.acu-filter:focus-visible,.acu-entry a:focus-visible,.acu-monthnav a:focus-visible{outline:2px solid var(--blue);outline-offset:3px}
.acu-monthnav{display:flex;align-items:center;gap:8px;overflow-x:auto;scrollbar-width:thin;margin:0 0 32px;padding:0 0 9px}
.acu-monthnav a{flex:none;text-decoration:none;white-space:nowrap;color:var(--txt2);background:var(--surf);border:1px solid var(--brd);border-radius:999px;padding:7px 12px;font-size:11px}
.acu-monthnav a:hover{color:var(--txt);border-color:var(--brd2)}
.acu-timeline{display:grid;gap:23px}
.acu-month{scroll-margin-top:24px;border:1px solid var(--brd);background:var(--card-bg);border-radius:22px;overflow:hidden}
.acu-month-head{padding:23px 26px 20px;background:var(--surf);border-bottom:1px solid var(--brd);display:flex;justify-content:space-between;align-items:center;gap:16px}
.acu-month-title{display:flex;align-items:center;gap:12px}
.acu-dateicon{width:38px;height:38px;border:1px solid var(--brd2);background:rgba(41,121,242,.10);border-radius:12px;display:grid;place-items:center;color:var(--blue-lt);flex:none}
[data-theme="light"] .acu-dateicon{color:var(--blue-dk)}
.acu-month h3{font-family:var(--disp);font-size:19px;line-height:1.25;font-weight:800}
.acu-month-sub{font-size:11px;color:var(--txt2);margin-top:5px}
.acu-month-count{font-size:11px;color:var(--txt2);border:1px solid var(--brd);background:var(--bg2);padding:6px 10px;border-radius:999px;white-space:nowrap}
.acu-month-body{padding:6px 26px 13px}
.acu-entry{display:grid;grid-template-columns:95px minmax(0,1fr);gap:22px;padding:22px 0;border-bottom:1px solid var(--brd)}
.acu-entry:last-child{border-bottom:0}
.acu-entry-date{font-family:var(--mono);font-size:11px;line-height:1.65;color:var(--txt2);font-variant-numeric:tabular-nums;padding-top:4px}
.acu-entry-tags{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin-bottom:9px}
.acu-tag{font-size:10px;letter-spacing:.015em;font-weight:700;border:1px solid var(--brd);color:var(--txt2);background:var(--surf);border-radius:999px;padding:4px 9px}
.acu-tag-feature{color:var(--blue-lt);border-color:rgba(41,121,242,.26);background:rgba(41,121,242,.09)}
[data-theme="light"] .acu-tag-feature{color:var(--blue-dk)}
.acu-tag-fix{color:#52dc9b;border-color:rgba(45,211,111,.26);background:rgba(45,211,111,.08)}
[data-theme="light"] .acu-tag-fix{color:#076f46}
.acu-entry h4{font-size:15px;line-height:1.35;font-family:var(--disp);font-weight:750;margin:0 0 7px}
.acu-entry p{font-size:12.8px;color:var(--txt2);line-height:1.76;max-width:760px}
.acu-entry a{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--blue-lt);text-decoration:none;margin-top:10px;font-weight:650}
[data-theme="light"] .acu-entry a{color:var(--blue-dk)}
.acu-entry a:hover{text-decoration:underline}
.acu-empty{padding:24px 0;color:var(--txt2);display:flex;align-items:flex-start;gap:12px;font-size:13px;line-height:1.7}
.acu-empty svg{color:var(--blue);flex:none;margin-top:3px}
.acu-bottom{margin-top:36px;padding:27px 30px;border:1px solid var(--brd2);border-radius:22px;background:var(--bg2);display:flex;align-items:center;justify-content:space-between;gap:20px}
.acu-bottom h2{font-size:23px;font-family:var(--disp);font-weight:800;line-height:1.2;margin-bottom:8px}
.acu-bottom p{font-size:13px;line-height:1.7;color:var(--txt2);max-width:480px}
.acu-btn{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;text-decoration:none;color:#fff;background:linear-gradient(135deg,var(--blue-dk),var(--blue));font:700 13px var(--font);border-radius:12px;padding:13px 17px;min-height:44px}
.acu-btn:hover{filter:brightness(1.08)}
.acu-summary{margin-top:22px;color:var(--txt2);font-size:11.5px;line-height:1.7}
@media(max-width:1023px){.acu-inner{width:min(100% - 56px,1000px)}.acu-top{padding:58px 0 50px}}
@media(max-width:639px){.acu-inner{width:calc(100% - 32px)}.acu-top{padding:33px 0 34px}.acu-top h1{font-size:clamp(29px,9vw,43px);margin:15px 0}.acu-lead{font-size:13.5px}.acu-disclosure{padding:13px}.acu-shell{padding:29px 0 116px}.acu-toolbar h2{font-size:21px}.acu-month{border-radius:17px}.acu-month-head{padding:18px 17px}.acu-month h3{font-size:17px}.acu-month-body{padding:2px 17px 7px}.acu-entry{grid-template-columns:1fr;gap:4px;padding:17px 0}.acu-entry-date{font-size:10px}.acu-bottom{padding:21px 18px;display:block}.acu-bottom h2{font-size:20px}.acu-bottom .acu-btn{margin-top:16px}.acu-disclosure p{font-size:11.8px}.acu-stat{font-size:11px;padding:9px 11px}.acu-dateicon{width:34px;height:34px}}
@media(prefers-reduced-motion:reduce){.acu-filter,.acu-entry a{transition:none}}
`;

export default function Updates() {
    const [filter, setFilter] = useState<Category | 'all'>('all');
    const visible = months.map(month => ({
        ...month,
        entries: filter === 'all' ? month.entries : month.entries.filter(entry => entry.category === filter),
    })).filter(month => filter === 'all' || month.entries.length > 0);
    const count = visible.reduce((sum, month) => sum + month.entries.length, 0);

    return (
        <>
            <SEO
                title="Website Updates & Changelog (2025–2026) | Ayamil Coders"
                description="Explore Ayamil Coders' 13-month website development archive: features, bug fixes, mobile UX improvements, accessibility and performance work, with transparent evidence labels."
                keywords="Ayamil Coders updates, Ayamil Coders changelog, website development updates 2026, software house release notes, website bug fixes, Laravel React website improvements, web performance updates Pakistan"
                url={pageUrl}
                schema={pageSchema}
            />
            <style>{styles}</style>
            <div className="acu">
                <header className="acu-top">
                    <div className="acu-inner">
                        <nav className="acu-breadcrumb" aria-label="Breadcrumb">
                            <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Updates & Changelog</span>
                        </nav>
                        <span className="section-lbl acu-kicker"><History size={13} aria-hidden="true"/> Development Journal</span>
                        <h1>Built to improve. <em>Updated with intention.</em></h1>
                        <p className="acu-lead">
                            An organized look at website development, technical fixes, interface refinements,
                            and the foundations behind the Ayamil Coders digital experience.
                        </p>
                        <div className="acu-stats" aria-label="Archive overview">
                            <div className="acu-stat"><CalendarDays size={16} aria-hidden="true"/>{archiveStart} — {archiveEnd}</div>
                            <div className="acu-stat"><Layers3 size={16} aria-hidden="true"/>13 monthly chapters</div>
                            <div className="acu-stat"><CheckCheck size={16} aria-hidden="true"/>{totalEntries} documented entries</div>
                        </div>
                        <div className="acu-disclosure" role="note">
                            <Info size={17} aria-hidden="true"/>
                            <p><strong>About this archive:</strong> Repository records show dated GitHub commits.
                                Framework records describe the underlying Laravel starter-kit evolution—not necessarily releases of this website.
                                Prepared updates describe reviewed code changes whose live deployment has not been verified.
                                Months without dependable historical records are clearly identified; no fictional release dates have been added.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="acu-shell">
                    <div className="acu-inner">
                        <div className="acu-toolbar">
                            <div>
                                <h2>Explore the timeline</h2>
                                <p role="status" aria-live="polite">{count} {count === 1 ? 'entry' : 'entries'} in view · Newest first</p>
                            </div>
                            <SlidersHorizontal size={21} color="var(--txt2)" aria-hidden="true"/>
                        </div>
                        <div className="acu-filter-list" role="group" aria-label="Filter updates by category">
                            {categories.map(category => (
                                <button
                                    key={category.value}
                                    type="button"
                                    className="acu-filter"
                                    aria-pressed={filter === category.value}
                                    onClick={() => setFilter(category.value)}
                                >{category.label}</button>
                            ))}
                        </div>
                        <nav className="acu-monthnav" aria-label="Jump to month">
                            {visible.map(month => <a href={`#${month.id}`} key={month.id}>{month.title}</a>)}
                        </nav>
                        <div className="acu-timeline">
                            {visible.map(month => (
                                <section className="acu-month" id={month.id} key={month.id} aria-labelledby={`${month.id}-title`}>
                                    <div className="acu-month-head">
                                        <div className="acu-month-title">
                                            <div className="acu-dateicon"><CalendarDays size={18} aria-hidden="true"/></div>
                                            <div><h3 id={`${month.id}-title`}>{month.title}</h3><p className="acu-month-sub">{month.summary}</p></div>
                                        </div>
                                        <span className="acu-month-count">{month.entries.length ? `${month.entries.length} ${month.entries.length === 1 ? 'entry' : 'entries'}` : 'Archive gap'}</span>
                                    </div>
                                    <div className="acu-month-body">
                                        {month.entries.length ? month.entries.map((entry, index) => (
                                            <article className="acu-entry" key={`${entry.date}-${index}`}>
                                                <div className="acu-entry-date">
                                                    <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                                                </div>
                                                <div>
                                                    <div className="acu-entry-tags">
                                                        <span className={`acu-tag ${entry.category === 'fix' ? 'acu-tag-fix' : entry.category === 'feature' ? 'acu-tag-feature' : ''}`}>{categoryLabels[entry.category]}</span>
                                                        <span className="acu-tag">{evidenceLabels[entry.evidence]}</span>
                                                    </div>
                                                    <h4>{entry.title}</h4>
                                                    <p>{entry.detail}</p>
                                                    {entry.commit && <a href={`${REPO}${entry.commit}`} target="_blank" rel="noopener noreferrer" aria-label={`View supporting GitHub commit for ${entry.title}`}>
                                                        <GitCommitHorizontal size={14} aria-hidden="true"/> View commit <ArrowUpRight size={12} aria-hidden="true"/>
                                                    </a>}
                                                </div>
                                            </article>
                                        )) : (
                                            <div className="acu-empty"><Info size={17} aria-hidden="true"/>
                                                No independently dated website release record is available for this month.
                                                This does not mean that no work occurred; it means the available sources do not establish a publishable release log.
                                            </div>
                                        )}
                                    </div>
                                </section>
                            ))}
                        </div>
                        <div className="acu-bottom">
                            <div><h2>Planning a project of your own?</h2><p>Discuss custom web development, issue resolution, blockchain, or an improved digital experience with our team.</p></div>
                            <Link href="/contact" className="acu-btn">Start a conversation <ArrowRight size={16} aria-hidden="true"/></Link>
                        </div>
                        <p className="acu-summary">
                            The timeline summarizes codebase and prepared development work, not a warranty, uptime SLA, or independently audited deployment register.
                            For currently available services, visit the <Link href="/services" style={{ color: 'var(--blue-lt)' }}>Services</Link> page.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
