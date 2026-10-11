import {
    Award, BookOpen, Bot, BriefcaseBusiness, Building2, Bug, CalendarDays, ChartNoAxesCombined,
    CheckCircle2, Code2, Coins, Database, Globe2, Handshake,
    Laptop, Link2, LockKeyhole, Mail, MapPin, MessageCircle, Monitor, MoonStar,
    Network, Palette, Phone, Rocket, Server, Settings2, ShieldCheck, Sparkles, Unlock,
    Star, Target, TrendingUp, Trophy, Wrench, Zap, ClipboardList,
    type LucideIcon,
} from 'lucide-react';

/**
 * Cohesive, lightweight, accessible decoration for public pages.
 * Icons use tree-shakable inline SVGs already provided by lucide-react.
 * The subtle raised finish is pure CSS: no emoji font, raster assets or requests.
 */
const glyphs: Record<string, LucideIcon> = {
    '🎯': Target, '🔒': LockKeyhole, '⚡': Zap, '🌍': Globe2, '🌐': Globe2,
    '🤝': Handshake, '📈': TrendingUp, '⭐': Star, '🌟': Sparkles,
    '🏆': Trophy, '💯': Award, '🌙': MoonStar, '✨': Sparkles, '🎂': CalendarDays,
    '🛡️': ShieldCheck, '💻': Laptop, '⛓️': Link2, '🤖': Bot, '🐞': Bug,
    '⚛️': Code2, '🔷': Server, '🟢': Network, '🐍': Bot, '🗄️': Database,
    '✅': CheckCircle2, '📚': BookOpen, '💸': Coins, '💰': Coins, '🔥': Rocket,
    '🚀': Rocket, '🛠️': Wrench, '💬': MessageCircle, '🏢': BriefcaseBusiness,
    '🧩': Network, '📍': MapPin, '✉️': Mail, '📞': Phone, '🗓️': CalendarDays,
    '📋': ClipboardList, '🎉': Sparkles, '⚙️': Settings2, '🎨': Palette,
    '📊': ChartNoAxesCombined, '📱': Monitor, '💼': BriefcaseBusiness,
    '🔐': LockKeyhole, '📧': Mail, '🛍️': BriefcaseBusiness, '🏗️': Building2, '🔓': Unlock,
};

export interface PremiumIconProps {
    glyph: string;
    tone?: 'blue' | 'violet' | 'teal' | 'amber' | 'rose';
    size?: number;
    bare?: boolean;
    flat?: boolean;
    className?: string;
}

export default function PremiumIcon({ glyph, tone = 'blue', size = 22, bare = false, flat = false, className = '' }: PremiumIconProps) {
    const Icon = glyphs[glyph] ?? Sparkles;
    return (
        <span aria-hidden="true" className={`ac-picon ac-picon--${tone}${bare ? ' ac-picon--bare' : ''}${flat ? ' ac-picon--flat' : ''} ${className}`.trim()}>
            <Icon className="ac-picon__svg" size={size} strokeWidth={1.9} aria-hidden="true" focusable="false" />
        </span>
    );
}
