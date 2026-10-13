import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Bug, Clock3, Command, Fingerprint, FlaskConical, Sparkles } from 'lucide-react';
import '../../css/experience.css';

export const LAB_NAV = [
    {href:'/bug-museum', label:'Bug Museum', description:'Seven detailed debugging investigations', icon: Bug},
    {href:'/journey', label:'Our Journey', description:'Ten evidence-labeled milestones', icon: Clock3},
    {href:'/for-you', label:'For You', description:'Role-based guidance & project brief builder', icon: Fingerprint},
    {href:'/fix-it', label:'Break It. Fix It.', description:'Advanced distributed-system simulations', icon: FlaskConical},
];

export function ExperienceFrame({ eyebrow, title, accent, intro, children, current }: {
    eyebrow: string; title:string; accent?:string; intro:string; children:React.ReactNode; current?:string;
}) {
    return <div className="acx-page">
        <div className="acx-container">
            <nav className="acx-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/experience">Experience</Link>{current && <><span>/</span><span aria-current="page">{current}</span></>}</nav>
            <header className="acx-hero"><div className="acx-eyebrow"><Sparkles size={14} aria-hidden="true"/>{eyebrow}</div>
                <h1>{title} {accent && <em>{accent}</em>}</h1><p>{intro}</p>
            </header>
            {children}
            <nav className="acx-more" aria-label="Explore more Ayamil experiences">
                <div className="acx-sectionhead"><div><span className="acx-eyebrow">CONTINUE EXPLORING</span><h2>Discover more</h2></div><Link href="/experience">All experiences <ArrowRight size={15}/></Link></div>
                <div className="acx-moregrid">{LAB_NAV.filter(x=>x.href!==('/'+(current==='Break It. Fix It.'?'fix-it': current==='Bug Museum'?'bug-museum':current==='Our Journey'?'journey':current==='For You'?'for-you':'none'))).map(({href,label,description,icon:Icon})=><Link key={href} href={href} className="acx-minilink"><Icon size={19} aria-hidden="true"/><span><strong>{label}</strong><small>{description}</small></span><ArrowRight size={16} aria-hidden="true"/></Link>)}</div>
            </nav>
        </div>
    </div>;
}

export function DetailLink({href,children}: {href:string,children:React.ReactNode}) {
    return <Link className="acx-link" href={href}>{children}<ArrowRight size={16} aria-hidden="true"/></Link>;
}
