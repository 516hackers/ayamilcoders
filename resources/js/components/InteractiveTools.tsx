import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
  Search, Map, ScanEye, Columns2, Focus, PanelRightOpen, Keyboard, Route,
  SlidersHorizontal, GitBranch, NotebookPen, Link2, History, X, ArrowUpRight,
  ArrowLeft, ChevronRight, Check, RotateCcw, Copy, Download, GripVertical,
  Eye, EyeOff, Maximize2, ListTree, ShieldCheck, CircleHelp, Sparkles, ExternalLink,
  Clock3, Settings2, LayoutGrid, MousePointer2, ArrowRightLeft, Info,
} from 'lucide-react';
import '../../css/interactive-tools.css';
import { PUBLIC_PAGES } from '@/data/public-pages';

type Tool='navigator'|'lens'|'compare'|'preview'|'guide'|'trail'|'access'|'decision'|'notes'|'share'|'updates';
type LaunchId=Tool|'focus'|'search';
type SectionInfo={name:string;tag:string;el:HTMLElement};
type LinkPreview={label:string;desc:string;href:string;x:number;y:number};
type AccessPrefs={scale:number;wide:boolean;motion:boolean;contrast:boolean};
const STORAGE='ayamil:v25:';
const NAV:Record<string,string>={h:'/',s:'/services',e:'/solutions',c:'/contact',u:'/updates'};
const PAGES=PUBLIC_PAGES;
const SERVICES=[
  {name:'Custom Web Development',href:'/services#web-development',intro:'Purpose-built applications and secure backend systems.',fit:'New websites, platforms and connected workflows',deliver:'Discovery, application architecture, UX, backend, integration and testing',ask:'Users, workflows, data, integrations and performance goals'},
  {name:'Bug Fixing',href:'/services#bug-fixing',intro:'Investigating failures in existing production systems.',fit:'Broken features, deployment errors and integration defects',deliver:'Reproduction, root-cause analysis, repair and regression checks',ask:'Error examples, affected environment, expected and actual behavior'},
  {name:'Blockchain Development',href:'/services#blockchain-development',intro:'DApps, smart contracts and on-chain integrations.',fit:'Projects requiring verifiable or decentralized execution',deliver:'Smart contract architecture, integrations and review',ask:'Network, trust model, security requirements and custody'},
  {name:'AI Development',href:'/services#ai-development',intro:'AI-assisted products and business automation.',fit:'Knowledge workflows, LLM integrations and data-rich products',deliver:'Requirements, integration, privacy evaluation and testing',ask:'Use cases, quality criteria, data sources and constraints'},
];
const LAUNCH: Array<{id:LaunchId;name:string;hint:string;key:string;icon:typeof Search}>=[
  {id:'search',name:'Command Center',hint:'Instant page & action search',key:'Ctrl K',icon:Search},
  {id:'navigator',name:'Page Navigator',hint:'Current-page outline',key:'⇧ M',icon:Map},
  {id:'lens',name:'Developer Lens',hint:'Inspect rendered elements',key:'⇧ D',icon:ScanEye},
  {id:'compare',name:'Service Comparison',hint:'Side-by-side service decisions',key:'⇧ C',icon:Columns2},
  {id:'focus',name:'Focus Mode',hint:'Quiet reading without distractions',key:'⇧ F',icon:Focus},
  {id:'preview',name:'Quick Preview',hint:'Preview internal links',key:'⇧ P',icon:PanelRightOpen},
  {id:'guide',name:'Keyboard Guide',hint:'Learn website shortcuts',key:'?',icon:Keyboard},
  {id:'trail',name:'Journey Trail',hint:'Recent website trail',key:'⇧ H',icon:Route},
  {id:'access',name:'Accessibility Studio',hint:'Tune readability',key:'⇧ A',icon:SlidersHorizontal},
  {id:'decision',name:'Decision Graph',hint:'Explore suitable services',key:'⇧ G',icon:GitBranch},
  {id:'notes',name:'Private Notes',hint:'Device-local project notes',key:'⇧ N',icon:NotebookPen},
  {id:'share',name:'Section Share',hint:'Copy an exact heading link',key:'⇧ S',icon:Link2},
  {id:'updates',name:'Update Explorer',hint:'Explore the release archive',key:'⇧ U',icon:History},
];
// Derived from the public Updates page; do not imply archived changes were deployed.
const MONTHS=[
 ['2026-10','October 2026','Prepared updates & interaction improvements','Prepared + repository'],
 ['2026-09','September 2026','Company verification presentation','Repository'],
 ['2026-08','August 2026','No verified website update record available','Archive gap'],
 ['2026-07','July 2026','Solutions, lifecycle fixes and loading improvements','Repository'],
 ['2026-06','June 2026','Website foundation, performance and AI discoverability','Repository'],
 ['2026-05','May 2026','Laravel starter-kit refinements','Framework only'],
 ['2026-04','April 2026','Framework form and feedback improvements','Framework only'],
 ['2026-03','March 2026','SSR and application tooling updates','Framework only'],
 ['2026-02','February 2026','Framework appearance and navigation fixes','Framework only'],
 ['2026-01','January 2026','Framework component compatibility','Framework only'],
 ['2025-12','December 2025','No verified website update record available','Archive gap'],
 ['2025-11','November 2025','No verified website update record available','Archive gap'],
 ['2025-10','October 2025','No verified website update record available','Archive gap'],
] as const;
function read<T>(key:string,fallback:T,session=false):T {try {const value=(session?sessionStorage:localStorage).getItem(STORAGE+key);return value?JSON.parse(value) as T:fallback;}catch{return fallback;}}
function write(key:string,value:unknown,session=false){try{(session?sessionStorage:localStorage).setItem(STORAGE+key,JSON.stringify(value));}catch{/* unavailable */}}
function editable(t:EventTarget|null){return t instanceof Element&&!!t.closest('input,textarea,select,[contenteditable="true"],[role="textbox"]');}
function pageRoot():Element|null{const mobile=window.innerWidth<640&&window.location.pathname==='/'?document.querySelector('#mscr .asc.s-act'):null;return mobile||document.querySelector('main');}
function sections():SectionInfo[]{const root=pageRoot();if(!root)return[];const used=new Set<string>();return [...root.querySelectorAll<HTMLElement>('h1,h2,h3')].filter(el=>!el.closest('nav,footer,[hidden],[aria-hidden="true"],.acv-layer')&&el.getClientRects().length>0).map(el=>({el,name:(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,120),tag:el.tagName})).filter(x=>x.name&&!used.has(x.name)&&(used.add(x.name),true)).slice(0,70);}
function targetSection(el:HTMLElement):HTMLElement {return el.closest<HTMLElement>('section[id],article[id]')||el;}
function visibleLabel(path:string){return PAGES.find(p=>p.url===path.split(/[?#]/)[0])?.name||path;}
function safeAnchor(url:string){try{const next=new URL(url,location.href);return next.origin===location.origin?next:null;}catch{return null;}}
function useFocusReturn(active:boolean){const prior=useRef<HTMLElement|null>(null);useEffect(()=>{if(!active)return;prior.current=document.activeElement as HTMLElement;return()=>prior.current?.focus?.();},[active]);}
function Close({onClick}:{onClick:()=>void}){return <button type="button" className="acv-close" onClick={onClick} aria-label="Close tool"><X size={18}/></button>;}
function Dialog({title,children,onClose,kind}:{title:string;children:ReactNode;onClose:()=>void;kind:string}){
 useFocusReturn(true);const panel=useRef<HTMLElement>(null);useEffect(()=>{panel.current?.focus();},[]);
 return <div className={`acv-layer acv-layer-${kind}`} onMouseDown={e=>{if(e.currentTarget===e.target)onClose();}}><section className={`acv-dialog acv-dialog-${kind}`} role="dialog" tabIndex={-1} ref={panel} aria-modal="true" aria-label={title} onKeyDown={e=>{if(e.key!=='Tab')return;const nodes=[...e.currentTarget.querySelectorAll<HTMLElement>('button,input,select,textarea,a[href]')].filter(n=>n.getClientRects().length>0&&!n.hasAttribute('disabled'));if(!nodes.length)return;if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes.at(-1)?.focus();}else if(!e.shiftKey&&document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0].focus();}}}>{children}</section></div>;
}
function Head({title,caption,onClose}:{title:string;caption:string;onClose:()=>void}){return <header className="acv-head"><div><span className="acv-eyebrow">AYAMIL CODERS · INTERACTIVE TOOLS</span><h2>{title}</h2><p>{caption}</p></div><Close onClick={onClose}/></header>;}

export default function InteractiveTools({searchOpen,onSearch,onSearchClose,initialLaunch}:{searchOpen:boolean;onSearch:()=>void;onSearchClose:()=>void;initialLaunch?:string|null}) {
 const {url}=usePage();const path=url.split(/[?#]/)[0]||'/';
 const [launcher,setLauncher]=useState(false),[active,setActive]=useState<Tool|null>(null);
 const [focus,setFocus]=useState(false),[lens,setLens]=useState(false),[quick,setQuick]=useState(false),[share,setShare]=useState(false);
 const [trail,setTrail]=useState<string[]>([]),[prefs,setPrefs]=useState<AccessPrefs>({scale:100,wide:false,motion:false,contrast:false});
 const [notes,setNotes]=useState(''),[notesMessage,setNotesMessage]=useState('');
 const [outline,setOutline]=useState<SectionInfo[]>([]),[currentSection,setCurrentSection]=useState(0);
 const [preview,setPreview]=useState<LinkPreview|null>(null),[inspected,setInspected]=useState<{tag:string;label:string;rect:DOMRect;attrs:string}|null>(null);
 const [shareMessage,setShareMessage]=useState('Select a heading to copy its direct link.');
 const [selectionA,setSelectionA]=useState(0),[selectionB,setSelectionB]=useState(1);
 const [decisionStep,setDecisionStep]=useState(0),[decisionChoices,setDecisionChoices]=useState<string[]>([]);
 const [chosenMonth,setChosenMonth]=useState('2026-10');const [monthFilter,setMonthFilter]=useState('all');
 const [guideTab,setGuideTab]=useState<'common'|'tools'|'navigation'>('common');
 const [notePos,setNotePos]=useState({x:0,y:0});const drag=useRef<{x:number;y:number;startX:number;startY:number;minX:number;maxX:number;minY:number;maxY:number}|null>(null);
 const pendingG=useRef(false),gTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const toastTimer=useRef<ReturnType<typeof setTimeout>|null>(null);const [toast,setToast]=useState('');
 const announce=useCallback((message:string)=>{setToast(message);if(toastTimer.current)clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),3600);},[]);
 const changePrefs=useCallback((next:AccessPrefs)=>{setPrefs(next);write('access',next);},[]);
 const close=useCallback(()=>{setActive(null);setLauncher(false);setInspected(null);},[]);
 const openTool=useCallback((id:LaunchId)=>{
   setLauncher(false);
   if(id==='search'){setActive(null);onSearch();return;}
   if(id==='focus'){setFocus(v=>!v);setActive(null);return;}
   if(id==='preview'){setQuick(v=>!v);setActive(null);return;}
   if(id==='share'){setShare(v=>!v);setActive(null);return;}
   if(id==='lens'){setLens(true);setInspected(null);setActive('lens');return;}
   if(id==='navigator'){setOutline(sections());setCurrentSection(0);}
   if(id==='decision'){setDecisionStep(0);setDecisionChoices([]);}
   if(id==='notes')setNotePos({x:0,y:0});
   setActive(id);
 },[onSearch]);
 // First click may occur before this lazy chunk has finished downloading.
 // Replay its intent inside the mounted component without losing that click.
 useEffect(() => {
   if (!initialLaunch) return;
   if (initialLaunch === 'launcher') setLauncher(true);
   else if (LAUNCH.some(item => item.id === initialLaunch)) openTool(initialLaunch as LaunchId);
 }, [initialLaunch, openTool]);
 useEffect(()=>{setTrail(read<string[]>('trail',[],true));setPrefs(read<AccessPrefs>('access',{scale:100,wide:false,motion:false,contrast:false}));},[]);
 useEffect(()=>{const to=location.pathname+location.search;setTrail(prev=>{const next=[to,...prev.filter(x=>x!==to)].slice(0,14);write('trail',next,true);return next;});setActive(null);setLens(false);setShare(false);setPreview(null);},[url]);
 useEffect(()=>{setNotes(read<string>('notes:'+path,''));setNotesMessage('');setNotePos({x:0,y:0});},[path]);
 // Stable heading anchors are created after hydration on each Inertia page.
 // Direct links to these anchors continue to work when the destination reloads.
 useEffect(()=>{
   const frame=requestAnimationFrame(()=>{
      const root=pageRoot();if(!root)return;
      const assigned=new Set<string>();
      [...root.querySelectorAll<HTMLElement>('h1,h2,h3')].forEach((heading,index)=>{
          if(heading.id||heading.closest('section[id],article[id]'))return;
          const slug=(heading.textContent||'section').trim().toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').slice(0,50)||'section';
          const base='ac-section-'+slug;let id=base,n=2;
          while(assigned.has(id)||(document.getElementById(id)&&document.getElementById(id)!==heading)){id=base+'-'+n++;}
          assigned.add(id);heading.id=id;
      });
      const hash=decodeURIComponent(location.hash.slice(1));
      if(hash.startsWith('ac-section-'))document.getElementById(hash)?.scrollIntoView({behavior:'instant',block:'start'});
   });
   return()=>cancelAnimationFrame(frame);
 },[url]);

 useEffect(()=>{write('notes:'+path,notes);},[notes,path]);
 useEffect(()=>{document.documentElement.dataset.acFocus=focus?'on':'off';return()=>{delete document.documentElement.dataset.acFocus;};},[focus]);
 useEffect(()=>{document.documentElement.dataset.acLens=lens?'on':'off';return()=>{delete document.documentElement.dataset.acLens;};},[lens]);
 useEffect(()=>{document.documentElement.dataset.acShare=share?'on':'off';return()=>{delete document.documentElement.dataset.acShare;};},[share]);
 useEffect(()=>{const root=document.documentElement;root.style.setProperty('--ac-user-scale',String(prefs.scale/100));root.dataset.acScale=prefs.scale>100?'on':'off';root.dataset.acWide=prefs.wide?'on':'off';root.dataset.acMotion=prefs.motion?'on':'off';root.dataset.acContrast=prefs.contrast?'on':'off';return()=>{root.style.removeProperty('--ac-user-scale');delete root.dataset.acScale;delete root.dataset.acWide;delete root.dataset.acMotion;delete root.dataset.acContrast;};},[prefs]);
 useEffect(()=>{const onEvent=(event:Event)=>{const id=(event as CustomEvent<string>).detail;if(id==='launcher')setLauncher(v=>!v);else if(LAUNCH.some(t=>t.id===id))openTool(id as LaunchId);};window.addEventListener('ayamil:tool',onEvent);return()=>window.removeEventListener('ayamil:tool',onEvent);},[openTool]);
 useEffect(()=>{const keyboard=(e:KeyboardEvent)=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(searchOpen)onSearchClose();else openTool('search');return;}
    if(e.key==='Escape'){if(active==='lens')setLens(false);if(share)setShare(false);if(active||launcher){e.preventDefault();close();}return;}
    if(searchOpen||active||launcher||editable(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.key==='?'){e.preventDefault();openTool('guide');return;}
    const key=e.key.toLowerCase();const shortcut:Record<string,LaunchId>={m:'navigator',d:'lens',c:'compare',f:'focus',p:'preview',h:'trail',a:'access',g:'decision',n:'notes',s:'share',u:'updates'};
    if(e.shiftKey&&shortcut[key]){e.preventDefault();pendingG.current=false;openTool(shortcut[key]);return;}
    if(pendingG.current){pendingG.current=false;if(gTimer.current)clearTimeout(gTimer.current);if(NAV[key]){e.preventDefault();router.visit(NAV[key]);announce('Navigating to '+visibleLabel(NAV[key]));}return;}
    if(key==='g'&&!e.shiftKey){pendingG.current=true;announce('Go to: H Home · S Services · E Solutions · C Contact · U Updates');if(gTimer.current)clearTimeout(gTimer.current);gTimer.current=setTimeout(()=>{pendingG.current=false;},1400);}
 };
 document.addEventListener('keydown',keyboard);return()=>{document.removeEventListener('keydown',keyboard);if(gTimer.current)clearTimeout(gTimer.current);};
 },[searchOpen,onSearchClose,active,launcher,share,close,openTool,announce]);
 useEffect(()=>()=>{if(toastTimer.current)clearTimeout(toastTimer.current);},[]);
 // Quick preview: description is sourced from known public routes, not fetched from arbitrary links.
 useEffect(()=>{if(!quick)return;let timer:ReturnType<typeof setTimeout>|null=null;const clear=()=>{if(timer)clearTimeout(timer);setPreview(null);};const show=(el:EventTarget|null)=>{
   if(!(el instanceof Element))return;const anchor=el.closest<HTMLAnchorElement>('a[href]');if(!anchor||anchor.closest('.acv-layer'))return;
   const dest=safeAnchor(anchor.href);if(!dest)return;const page=PAGES.find(p=>p.url===dest.pathname);if(!page)return;
   const rect=anchor.getBoundingClientRect();if(timer)clearTimeout(timer);timer=setTimeout(()=>setPreview({href:page.url,label:page.name,desc:page.desc,x:Math.max(12,Math.min(rect.left,innerWidth-300)),y:Math.max(10,Math.min(rect.bottom+9,innerHeight-138))}),200);
 };
 const over=(e:MouseEvent)=>show(e.target),foc=(e:FocusEvent)=>show(e.target);
 document.addEventListener('mouseover',over);document.addEventListener('focusin',foc);document.addEventListener('mouseout',clear);document.addEventListener('focusout',clear);document.addEventListener('click',clear);window.addEventListener('scroll',clear,true);
 return()=>{clear();document.removeEventListener('mouseover',over);document.removeEventListener('focusin',foc);document.removeEventListener('mouseout',clear);document.removeEventListener('focusout',clear);document.removeEventListener('click',clear);window.removeEventListener('scroll',clear,true);};
 },[quick,url]);
 // Lens overlay is a DOM read-only inspection preview. Clicks are intercepted to prevent accidentally submitting forms.
 useEffect(()=>{if(active!=='lens')return;const mouse=(e:MouseEvent)=>{const element=e.target as HTMLElement;if(!(element instanceof HTMLElement)||element.closest('.acv-layer,.acv-inspector'))return;const box=element.getBoundingClientRect();setInspected({tag:element.tagName.toLowerCase(),label:(element.textContent||'').trim().replace(/\s+/g,' ').slice(0,100),rect:box,attrs:`${element.id?'#'+element.id:''}${[...element.classList].slice(0,2).map(x=>'.'+x).join('')}`});};
 const click=(e:MouseEvent)=>{if((e.target as Element)?.closest?.('.acv-inspector'))return;e.preventDefault();e.stopPropagation();mouse(e);};
 document.addEventListener('pointerover',pointer);document.addEventListener('click',click,true);function pointer(e:PointerEvent){mouse(e as unknown as MouseEvent);}
 return()=>{document.removeEventListener('pointerover',pointer);document.removeEventListener('click',click,true);};},[active]);
 // Section share is opt-in, strictly targets visible headings. Generated IDs are stable for a given heading.
 useEffect(()=>{if(!share)return;const root=pageRoot();if(!root)return;const handle=async(e:Event)=>{const heading=(e.target as Element)?.closest<HTMLElement>('h1,h2,h3');if(!heading||!root.contains(heading))return;e.preventDefault();e.stopPropagation();let target=targetSection(heading);if(!target.id){const slug=(heading.textContent||'section').toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').slice(0,45)||'section';if(!document.getElementById('ac-'+slug))target.id='ac-'+slug;else target=heading,target.id='ac-'+slug+'-'+[...root.querySelectorAll('h1,h2,h3')].indexOf(heading);}
 const link=`${location.origin}${location.pathname}${location.search}#${encodeURIComponent(target.id)}`;
 try{await navigator.clipboard.writeText(link);setShareMessage(`Copied: ${heading.textContent?.trim().slice(0,56)||'section'}`);}catch{setShareMessage('Clipboard blocked; allow clipboard access on HTTPS.');}
 };
 root.addEventListener('click',handle,true);return()=>root.removeEventListener('click',handle,true);
 },[share,url]);
 // Highlight the nearest section while the user scrolls, not just after clicking an item.
 useEffect(()=>{if(active!=='navigator'||!outline.length)return;
    let frame=0;
    const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;let closest=0,distance=Infinity;outline.forEach((section,index)=>{const top=section.el.getBoundingClientRect().top;const score=Math.abs(top-105)+(top>innerHeight?innerHeight:0);if(score<distance){distance=score;closest=index;}});setCurrentSection(closest);});};
    update();document.addEventListener('scroll',update,true);window.addEventListener('resize',update);
    return()=>{cancelAnimationFrame(frame);document.removeEventListener('scroll',update,true);window.removeEventListener('resize',update);};
 },[active,outline]);
 const scrollTo=(item:SectionInfo)=>{setActive(null);requestAnimationFrame(()=>{item.el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});if(!item.el.hasAttribute('tabindex'))item.el.setAttribute('tabindex','-1');item.el.focus({preventScroll:true});});};
 const setAndSave=(next:AccessPrefs)=>changePrefs(next);
 const copyNotes=async()=>{try{await navigator.clipboard.writeText(notes);setNotesMessage('Notes copied.');}catch{setNotesMessage('Copy unavailable on this browser.');}};
 const downloadNotes=()=>{const blob=new Blob([notes],{type:'text/plain;charset=utf-8'});const uri=URL.createObjectURL(blob);const a=document.createElement('a');a.href=uri;a.download='ayamil-private-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(uri),1000);setNotesMessage('Text file exported to your device.');};
 const decisionQuestions=[{q:'Which stage describes the project?',options:['Building something new','Improving an existing product']},{q:'What is the main need?',options:['A custom website or business platform','An existing technical failure','Blockchain or smart contract work','AI or automation integration']},{q:'How will you measure success?',options:['Reliable functionality and long-term maintenance','An urgent issue diagnosed and resolved','A focused prototype and technical evaluation']}];
 const selection=decisionChoices[1];const recommended=selection==='An existing technical failure'?SERVICES[1]:selection==='Blockchain or smart contract work'?SERVICES[2]:selection==='AI or automation integration'?SERVICES[3]:SERVICES[0];
 return <>
   {toast&&<div className="acv-toast" role="status">{toast}</div>}
   {/* Tool launcher is its own compact hub. No tool is rendered inside the Spotlight search modal. */}
   {launcher&&<div className="acv-launchback" onMouseDown={e=>{if(e.currentTarget===e.target)setLauncher(false);}}><section className="acv-launcher" role="dialog" aria-modal="true" aria-label="Interactive tools launcher"><div className="acv-launchhead"><div><span className="acv-eyebrow">AYAMIL CODERS</span><h2>Interactive Tools</h2><p>Choose a workspace. Each tool opens separately.</p></div><Close onClick={()=>setLauncher(false)}/></div><div className="acv-launchgrid">{LAUNCH.map(({id,name,hint,key,icon:Icon})=><button type="button" key={id} onClick={()=>openTool(id)}><Icon size={21}/><strong>{name}</strong><span>{hint}</span><kbd>{key}</kbd></button>)}</div></section></div>}
   {/* Focus mode is a page transformation, never a modal. */}
   {focus&&<button type="button" className="acv-focus-exit" onClick={()=>setFocus(false)}><Eye size={15}/> Exit Focus Mode</button>}
   {quick&&<button type="button" className="acv-modechip acv-previewchip" onClick={()=>setQuick(false)}><PanelRightOpen size={15}/> Link preview ON <X size={13}/></button>}
   {preview&&quick&&<aside className="acv-linkpeek" role="tooltip" style={{left:preview.x,top:preview.y}}><span>QUICK PREVIEW</span><strong>{preview.label}</strong><p>{preview.desc}</p><small>Click the link to navigate</small></aside>}
   {share&&<div className="acv-sharebar" role="status"><Link2 size={16}/><span><strong>Section Share active</strong><small>{shareMessage}</small></span><button type="button" onClick={()=>setShare(false)} aria-label="Exit Section Share"><X size={17}/></button></div>}
   {active==='navigator'&&<Dialog kind="navigator" title="Page Navigator" onClose={close}><Head title="Page Navigator" caption="A live outline of the headings on this page." onClose={close}/><div className="acv-navmeta"><ListTree size={15}/>{outline.length} visible sections <button type="button" onClick={()=>setOutline(sections())}><RotateCcw size={13}/> Refresh</button></div><nav className="acv-outlinelist" aria-label="On-page headings">{outline.length?outline.map((s,i)=><button key={i} className={currentSection===i?'acv-active':''} type="button" onClick={()=>{setCurrentSection(i);scrollTo(s);}}><span>{s.tag}</span><strong>{s.name}</strong><ChevronRight size={15}/></button>):<p>No visible headings on this page. Try another page.</p>}</nav><p className="acv-footnote">Headings are read from the rendered page. No new page is opened.</p></Dialog>}
   {active==='lens'&&<><div className="acv-lensmark" aria-hidden="true" style={inspected?{left:inspected.rect.left,top:inspected.rect.top,width:inspected.rect.width,height:inspected.rect.height}: {display:'none'}}></div><aside className="acv-inspector" role="dialog" aria-label="Developer Lens"><Head title="Developer Lens" caption="Inspect HTML elements as you hover." onClose={()=>{setLens(false);close();}}/><div className="acv-inspector-body"><div className="acv-codeintro">LIVE DOM INSPECTOR · READ-ONLY</div>{inspected?<><code>{`<${inspected.tag}${inspected.attrs}>`}</code><p>{inspected.label||'No visible text content'}</p><dl><div><dt>Width × height</dt><dd>{Math.round(inspected.rect.width)} × {Math.round(inspected.rect.height)} px</dd></div><div><dt>Screen position</dt><dd>{Math.round(inspected.rect.x)}, {Math.round(inspected.rect.y)}</dd></div></dl></>:<p>Move the pointer over page elements to inspect their rendered box and tag.</p>}<small>This is an educational layout inspector, not a vulnerability scanner.</small></div></aside></>}
   {active==='compare'&&<Dialog kind="compare" title="Service Comparison Workspace" onClose={close}><Head title="Compare engineering services" caption="Drag a service onto either column, use selects, or swap the columns." onClose={close}/><div className="acv-comparechips" role="group" aria-label="Drag services into the comparison columns">{SERVICES.map((svc,i)=><button key={svc.name} type="button" draggable onDragStart={e=>e.dataTransfer.setData('text/plain',String(i))} onClick={()=>setSelectionA(i)} title="Drag onto a column, or click to choose the first service">{svc.name}</button>)}</div><div className="acv-comparebar"><label>First service<select value={selectionA} onChange={e=>setSelectionA(Number(e.target.value))}>{SERVICES.map((s,i)=><option key={s.name} value={i}>{s.name}</option>)}</select></label><button type="button" onClick={()=>{setSelectionA(selectionB);setSelectionB(selectionA);}} aria-label="Swap comparison columns"><ArrowRightLeft size={18}/></button><label>Second service<select value={selectionB} onChange={e=>setSelectionB(Number(e.target.value))}>{SERVICES.map((s,i)=><option key={s.name} value={i}>{s.name}</option>)}</select></label></div><div className="acv-compare-columns">{[selectionA,selectionB].map((idx,col)=>{const service=SERVICES[idx];return <article key={col} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const i=Number(e.dataTransfer.getData('text/plain'));if(!Number.isInteger(i)||i<0||i>=SERVICES.length)return;if(col===0)setSelectionA(i);else setSelectionB(i);}}><span>0{col+1} / SERVICE PROFILE</span><h3>{service.name}</h3><p className="acv-compsummary">{service.intro}</p><h4>Best suited to</h4><p>{service.fit}</p><h4>Typical scope</h4><p>{service.deliver}</p><h4>Start with these details</h4><p>{service.ask}</p><button type="button" onClick={()=>{close();router.visit(service.href);}}>Explore this service <ArrowUpRight size={16}/></button></article>})}</div><p className="acv-footnote">Comparison describes service types; specific deliverables depend on individual project scope.</p></Dialog>}
   {active==='guide'&&<Dialog kind="guide" title="Keyboard Guide" onClose={close}><Head title="Keyboard Guide" caption="Desktop shortcuts. On phones, open each feature from the Tools launcher." onClose={close}/><div className="acv-guide-switch">{(['common','tools','navigation'] as const).map(t=><button key={t} type="button" aria-pressed={guideTab===t} onClick={()=>setGuideTab(t)}>{t==='common'?'Essentials':t==='tools'?'Workspaces':'Go to page'}</button>)}</div><div className="acv-keyrows">{(guideTab==='common'?[['Ctrl / ⌘ + K','Spotlight search'],['?','Open Keyboard Guide'],['Esc','Close current tool'],['Shift + F','Toggle Focus Mode']]:guideTab==='tools'?LAUNCH.filter(x=>!['search','focus'].includes(x.id)).map(x=>[x.key,x.name]):[['G → H','Home'],['G → S','Services'],['G → E','Solutions'],['G → C','Contact'],['G → U','Updates']]).map(([keys,label])=><div key={keys}><kbd>{keys}</kbd><span>{label}</span></div>)}</div></Dialog>}
   {active==='trail'&&<Dialog kind="trail" title="Journey Trail" onClose={close}><Head title="Journey Trail" caption="Pages visited in this browser tab. No server tracking is added." onClose={close}/><div className="acv-trailpaths">{trail.length?trail.map((href,i)=><button key={href} type="button" onClick={()=>{close();router.visit(href);}}><span className="acv-trailnode">{i+1}</span><span><strong>{visibleLabel(href)}</strong><small>{href}</small></span><ArrowUpRight size={15}/></button>):<p>Browse a few pages to build your trail.</p>}</div><div className="acv-trailfooter"><span>Only the current tab's recent pages are remembered.</span><button type="button" onClick={()=>{setTrail([]);write('trail',[],true);}}><RotateCcw size={14}/> Clear trail</button></div></Dialog>}
   {active==='access'&&<Dialog kind="access" title="Accessibility Studio" onClose={close}><Head title="Accessibility Studio" caption="Adjust reading preferences on this device, without changing the default design." onClose={close}/><div className="acv-accessbody"><div className="acv-accesssize"><label htmlFor="acv-size">Text size <strong>{prefs.scale}%</strong></label><input id="acv-size" type="range" min="100" max="130" step="5" value={prefs.scale} onChange={e=>setAndSave({...prefs,scale:Number(e.target.value)})}/><p>Only readable body text is scaled; the website's original font families remain unchanged.</p></div>{([{key:'wide',name:'Wide reading area',detail:'Increase available width for long text'}, {key:'motion',name:'Reduce motion',detail:'Minimize optional transitions and reveal animations'}, {key:'contrast',name:'Stronger contrast',detail:'Improve separation between text and background'}] as const).map(row=><label className="acv-accessopt" key={row.key}><span><strong>{row.name}</strong><small>{row.detail}</small></span><input type="checkbox" checked={prefs[row.key]} onChange={e=>setAndSave({...prefs,[row.key]:e.target.checked})}/></label>)}<button type="button" className="acv-reset" onClick={()=>setAndSave({scale:100,wide:false,motion:false,contrast:false})}><RotateCcw size={15}/> Reset appearance preferences</button></div></Dialog>}
   {active==='decision'&&<Dialog kind="decision" title="Decision Graph" onClose={close}><Head title="Decision Graph" caption="A guided way to explore suitable services — not an automated quote." onClose={close}/><div className="acv-steps"><span>DISCOVERY PATH</span>{[0,1,2,3].map(s=><i key={s} className={decisionStep>=s?'on':''}/>)}</div>{decisionStep<3?<div className="acv-decisionbody"><span className="acv-stage">STEP {decisionStep+1} OF 3</span><h3>{decisionQuestions[decisionStep].q}</h3><div className="acv-decisionoptions">{decisionQuestions[decisionStep].options.map(choice=><button type="button" key={choice} onClick={()=>{setDecisionChoices(v=>[...v.slice(0,decisionStep),choice]);setDecisionStep(decisionStep+1);}}>{choice}<ChevronRight size={17}/></button>)}</div>{decisionStep>0&&<button className="acv-previous" type="button" onClick={()=>setDecisionStep(n=>n-1)}><ArrowLeft size={14}/> Previous question</button>}</div>:<div className="acv-decisionresult"><span>YOUR RECOMMENDED STARTING POINT</span><h3>{recommended.name}</h3><p>{recommended.intro} {recommended.fit}. Your priority: {decisionChoices[2]||'to define a clear outcome'}. This suggestion is based on your answers, not an assessment of your system.</p><div><strong>Discuss these first:</strong><p>{recommended.ask}.</p></div><button type="button" onClick={()=>{close();router.visit(recommended.href);}}>Explore service <ArrowUpRight size={16}/></button><button className="acv-restart" type="button" onClick={()=>{setDecisionStep(0);setDecisionChoices([]);}}><RotateCcw size={15}/> Start again</button><small>This is general navigation guidance, not a technical audit or binding project recommendation.</small></div>}</Dialog>}
   {active==='notes'&&<aside className="acv-notepad" role="dialog" aria-label="Private Notes" style={{transform:`translate(${notePos.x}px,${notePos.y}px)`}}><div className="acv-notehead" onPointerDown={e=>{if((e.target as Element).closest('button'))return;const rect=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
  const baseLeft=rect.left-notePos.x,baseTop=rect.top-notePos.y,baseRight=rect.right-notePos.x;
  drag.current={x:e.clientX,y:e.clientY,startX:notePos.x,startY:notePos.y,minX:12-baseLeft,maxX:innerWidth-12-baseRight,minY:12-baseTop,maxY:innerHeight-66-baseTop};
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(!drag.current)return;setNotePos({x:Math.max(drag.current.minX,Math.min(drag.current.maxX,drag.current.startX+e.clientX-drag.current.x)),y:Math.max(drag.current.minY,Math.min(drag.current.maxY,drag.current.startY+e.clientY-drag.current.y))});}} onPointerUp={()=>{drag.current=null;}}><GripVertical size={17}/><strong>Private Notes</strong><span>DEVICE ONLY</span><Close onClick={close}/></div><div className="acv-notecontent"><p>Notes for <strong>{visibleLabel(path)}</strong>. Saved only in this browser; do not store passwords or private credentials.</p><textarea value={notes} onChange={e=>{setNotes(e.target.value.slice(0,10000));setNotesMessage('Saved locally');}} placeholder="Add your thoughts, questions, requirements or follow-up tasks…" aria-label="Private page notes"/><div className="acv-noteactions"><button type="button" onClick={()=>void copyNotes()}><Copy size={14}/> Copy</button><button type="button" onClick={downloadNotes}><Download size={14}/> Export</button><button type="button" onClick={()=>{setNotes('');setNotesMessage('Notes cleared.');}}><RotateCcw size={14}/> Clear</button></div>{notesMessage&&<small role="status">{notesMessage}</small>}</div></aside>}
   {active==='updates'&&<Dialog kind="updates" title="Update Explorer" onClose={close}><Head title="Update Explorer" caption="13-month documented archive, with provenance labels." onClose={close}/><div className="acv-updateexplorer"><nav aria-label="Release months">{MONTHS.filter(m=>monthFilter==='all'||(monthFilter==='evidence'?!['Archive gap','Framework only'].includes(m[3]):m[3]===monthFilter)).map(m=><button type="button" key={m[0]} aria-current={chosenMonth===m[0]?'true':undefined} onClick={()=>setChosenMonth(m[0])}><Clock3 size={14}/>{m[1]}</button>)}</nav><article><div className="acv-updatefilters"><button type="button" aria-pressed={monthFilter==='all'} onClick={()=>setMonthFilter('all')}>All</button><button type="button" aria-pressed={monthFilter==='evidence'} onClick={()=>{setMonthFilter('evidence');setChosenMonth('2026-10');}}>Site records</button><button type="button" aria-pressed={monthFilter==='Framework only'} onClick={()=>{setMonthFilter('Framework only');setChosenMonth('2026-05');}}>Framework</button></div>{(()=>{const m=MONTHS.find(m=>m[0]===chosenMonth)||MONTHS[0];return <><span className="acv-update-label">{m[3]}</span><h3>{m[1]}</h3><p>{m[2]}</p><button type="button" onClick={()=>{close();router.visit(`/updates#${m[0]}`);}}>Open full month and evidence <ArrowUpRight size={16}/></button></>})()}<small>Repository, prepared, framework and missing-history entries remain distinguishable; no release dates are invented.</small></article></div></Dialog>}
 </>;
}
