import { useEffect, useMemo, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Search, ArrowUpRight, X, Bookmark, BookmarkCheck, History, ClipboardCopy, Link2, Trash2, Wrench, Command } from 'lucide-react';
import '../../css/command-base.css';

// V25: Spotlight is intentionally SEARCH ONLY. Independent tools have their own surfaces.
const PAGES = [
    ['/', 'Home', 'Company overview'], ['/services','Services & Expertise','Custom development and troubleshooting'],
    ['/about','Our Story','Company and team'], ['/contact','Contact','Discuss your project'],
    ['/careers','Careers','Opportunities'], ['/solutions','Solutions','Engineering solutions'],
    ['/benefits','Client Benefits','Working with Ayamil Coders'], ['/updates','Updates & Changelog','Website development history'],
    ['/company-registration','Company Registration','Corporate information'],
    ['/services#web-development','Web Development','Custom web applications'],
    ['/services#bug-fixing','Bug Fixing','Software troubleshooting'],
    ['/services#blockchain-development','Blockchain','Smart contracts and DApps'],
    ['/services#ai-development','AI Development','AI integration'],
    ['/privacy-policy','Privacy Policy','Privacy and data'], ['/terms','Terms','Service terms'],
    ['/refund-policy','Refund Policy','Refund conditions'],
    ['/top-it-company-sadiqabad','Sadiqabad IT Services','Local development services'],
] as const;
const TOOLS = [
    ['navigator','Page Navigator'],['lens','Developer Lens'],['compare','Service Comparison'],
    ['focus','Focus Mode'],['preview','Quick Preview'],['guide','Keyboard Guide'],
    ['trail','Journey Trail'],['access','Accessibility Studio'],['decision','Decision Graph'],
    ['notes','Private Notes'],['share','Section Share'],['updates','Update Explorer'],
    ['launcher','Interactive Tools launcher'],
] as const;
const SAVED='ayamil:command:saved:v2', RECENT='ayamil:command:recent:v2';
const safeRead=(key:string,session=false):string[]=>{try{const v=JSON.parse((session?sessionStorage:localStorage).getItem(key)||'[]');return Array.isArray(v)?v.filter((p:unknown):p is string=>typeof p==='string').slice(0,12):[];}catch{return [];}};
function safeWrite(key:string,items:string[],session=false){try{(session?sessionStorage:localStorage).setItem(key,JSON.stringify(items));}catch{}}
const isInput=(el:EventTarget|null)=>el instanceof Element&&!!el.closest('input,textarea,select,[contenteditable="true"],[role="textbox"]');
const PROJECT='AYAMIL CODERS — PROJECT BRIEF\nProject goal:\nAudience:\nCurrent system:\nRequired features:\nIntegrations:\nSecurity needs:\nTimeline:\nBudget (optional):\nSuccess criteria:';
const INCIDENT='ENGINEERING ISSUE BRIEF\nAffected page or endpoint:\nEnvironment and version:\nSteps to reproduce:\nExpected vs actual behavior:\nFrequency and impact:\nError message (redact credentials):\nRecent changes:\nMitigation attempted:';
export default function CommandPalette({open,onOpen: _onOpen,onClose}:{open:boolean;onOpen:()=>void;onClose:()=>void}) {
    const {url}=usePage();const path=url.split(/[?#]/)[0]||'/';
    const [query,setQuery]=useState('');const [index,setIndex]=useState(0);
    const [saved,setSaved]=useState<string[]>([]),[recent,setRecent]=useState<string[]>([]),[status,setStatus]=useState('');
    const input=useRef<HTMLInputElement>(null),restoreFocus=useRef<HTMLElement|null>(null);
    useEffect(()=>{setSaved(safeRead(SAVED));setRecent(safeRead(RECENT,true));},[]);
    useEffect(()=>{const p=PAGES.find(([href])=>href===path);if(!p)return;setRecent(prev=>{const next=[path,...prev.filter(x=>x!==path)].slice(0,10);safeWrite(RECENT,next,true);return next;});},[path]);
    useEffect(()=>{if(!open)return;restoreFocus.current=document.activeElement as HTMLElement;setQuery('');setIndex(0);setStatus('');const frame=requestAnimationFrame(()=>input.current?.focus());return()=>{cancelAnimationFrame(frame);restoreFocus.current?.focus();};},[open]);
    useEffect(()=>{if(!open)return;const onEscape=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();onClose();}};document.addEventListener('keydown',onEscape);return()=>document.removeEventListener('keydown',onEscape);},[open,onClose]);
    const results=useMemo(()=>{
        const raw=query.toLowerCase().trim();const prefix=['>','@','#'].includes(raw.charAt(0))?raw.charAt(0):'';const search=(prefix?raw.slice(1):raw).trim();
        const options:[string,string,string,'page'|'tool'|'action'][]=[];
        if(prefix!=='>'&&prefix!=='@'&&prefix!=='#')PAGES.forEach(([href,label,desc])=>options.push([href,label,desc,'page']));
        if(prefix==='@')PAGES.filter(([href])=>saved.includes(href)).forEach(([href,label,desc])=>options.push([href,label,desc,'page']));
        if(prefix==='#')PAGES.filter(([href])=>recent.includes(href)).forEach(([href,label,desc])=>options.push([href,label,desc,'page']));
        if(prefix==='>'||!prefix){TOOLS.forEach(([id,label])=>options.push([id,label,'Open independent interactive workspace','tool']));
            [['save','Save / unsave current page'],['copy','Copy current URL'],['project','Copy project brief template'],['incident','Copy incident report template'],['clear','Clear recent history']].forEach(([id,label])=>options.push([id,label,'Quick action','action']));}
        return options.filter(row=>!search||`${row[1]} ${row[2]} ${row[0]}`.toLowerCase().includes(search)).sort((a,b)=>Number(saved.includes(b[0]))-Number(saved.includes(a[0]))).slice(0,14);
    },[query,saved,recent]);
    const run=async(row:(typeof results)[number])=>{
        const [id,, ,type]=row;if(type==='page'){onClose();router.visit(id);return;}
        if(type==='tool'){onClose();window.dispatchEvent(new CustomEvent('ayamil:tool',{detail:id}));return;}
        if(id==='save'){const next=saved.includes(path)?saved.filter(x=>x!==path):[path,...saved].slice(0,12);setSaved(next);safeWrite(SAVED,next);setStatus(saved.includes(path)?'Removed from saved pages.':'Saved on this device.');return;}
        if(id==='clear'){setRecent([]);safeWrite(RECENT,[],true);setStatus('Recent history cleared.');return;}
        const value=id==='copy'?`${location.origin}${url}`:id==='project'?PROJECT:INCIDENT;
        try{await navigator.clipboard.writeText(value);setStatus('Copied to clipboard.');}catch{setStatus('Clipboard permission unavailable; HTTPS or localhost is required.');}
    };
    if(!open)return null;
    return <div className="acx-cmdback acv-search-back" onMouseDown={e=>{if(e.currentTarget===e.target)onClose();}}>
        <section className="acx-cmdpanel acv-search" role="dialog" aria-modal="true" aria-label="Search Ayamil Coders" onKeyDown={e=>{
            if(e.key!=='Tab')return;const nodes=[...e.currentTarget.querySelectorAll<HTMLElement>('button,input')].filter(x=>x.getClientRects().length>0);if(!nodes.length)return;
            if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes.at(-1)?.focus();}else if(!e.shiftKey&&document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0].focus();}
        }}>
            <div className="acx-cmdinputrow"><Search size={19}/><input ref={input} type="search" value={query} placeholder="Search pages, actions or tools…" aria-label="Search website" onChange={e=>{setQuery(e.target.value);setIndex(0);setStatus('');}} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setIndex(i=>Math.min(i+1,results.length-1));}if(e.key==='ArrowUp'){e.preventDefault();setIndex(i=>Math.max(0,i-1));}if(e.key==='Enter'&&results[index]){e.preventDefault();void run(results[index]);}}}/><button type="button" className="acx-cmdclose" onClick={onClose} aria-label="Close search"><X size={16}/></button></div>
            <div className="acx-cmdchips" aria-label="Search filters">{[['','All'],['>','Actions & tools'],['@','Saved'],['#','Recent']].map(([prefix,label])=><button type="button" key={label} className="acx-cmdchip" aria-pressed={prefix?query.startsWith(prefix):!['>','@','#'].some(p=>query.startsWith(p))} onClick={()=>{setQuery(prefix);input.current?.focus();}}>{label}</button>)}</div>
            <div className="acx-cmdlist" role="listbox" aria-label="Search results">{results.map((row,i)=><button type="button" role="option" aria-selected={index===i} key={`${row[3]}:${row[0]}`} className="acx-cmditem" onMouseEnter={()=>setIndex(i)} onClick={()=>void run(row)}><span>{row[3]==='page'?<History size={17}/>:row[3]==='tool'?<Wrench size={17}/>:<ClipboardCopy size={17}/>}</span><span><strong>{row[1]}</strong><small>{row[2]}</small></span>{saved.includes(row[0])?<BookmarkCheck size={15}/>:<ArrowUpRight size={15}/>}</button>)}{!results.length&&<p className="acx-note">No results found. Try a service or tool name.</p>}</div>
            {status&&<p className="acx-cmdstatus" role="status">{status}</p>}
            <div className="acx-cmdfoot"><span><Command size={12} style={{verticalAlign:'middle'}}/> Ctrl + K · Spotlight search</span><span>↑ ↓ Select · Enter Open · Esc Close</span></div>
        </section>
    </div>;
}
