'use strict';

/* ═══ THEME ═══ */
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  const meta=document.getElementById('theme-meta');
  if(meta)meta.content=isDark?'#f0f4ff':'#060d1a';
  const mt=document.getElementById('m-theme-btn');
  if(mt)mt.textContent=isDark?'☀️':'🌙';
  localStorage.setItem('theme',isDark?'light':'dark');
}
(function(){
  const t=localStorage.getItem('theme')||'dark';
  document.documentElement.setAttribute('data-theme',t);
  const mt=document.getElementById('m-theme-btn');
  if(mt)mt.textContent=t==='light'?'☀️':'🌙';
})();

/* ═══ CLOCK ═══ */
function updateClock(){
  const n=new Date();const h=n.getHours()%12||12;const m=String(n.getMinutes()).padStart(2,'0');
  const el=document.getElementById('mclock');if(el)el.textContent=h+':'+m;
}
updateClock();setInterval(updateClock,30000);

/* ═══ TICKER ═══ */
function buildTicker(id){
  const d=[{v:'600+',l:'Projects'},{t:'✦ Web Dev'},{v:'2,000+',l:'Issues Fixed'},{t:'✦ Blockchain'},{v:'5+',l:'Years Exp.'},{t:'✦ AI & ML'},{v:'100%',l:'Satisfaction'},{t:'✦ IT Consulting'},{v:'Global',l:'Client Reach'},{t:'✦ Smart Contracts'},{t:'✦ E-Commerce'}];
  const el=document.getElementById(id||'tkr');if(!el)return;
  let h='';
  for(let r=0;r<2;r++)d.forEach(x=>{
    if(x.t)h+=`<div class="ti"><span style="font-family:var(--mono);font-size:12px;color:var(--green);">${x.t}</span></div>`;
    else h+=`<div class="ti"><span style="font-family:var(--disp);font-weight:700;font-size:15px;color:var(--blue);">${x.v}</span><span style="font-size:13px;color:var(--txt3);">${x.l}</span></div>`;
  });
  el.innerHTML=h;
}

/* ═══ SCROLL REVEAL ═══ */
function initReveal(){
  const animEls=document.querySelectorAll('[data-a]');
  const revObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const d=e.target.dataset.d?parseFloat(e.target.dataset.d)*.07:0;
        e.target.style.transitionDelay=d+'s';e.target.classList.add('in');
        revObs.unobserve(e.target);
      }
    });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  animEls.forEach(el=>revObs.observe(el));
}

/* ═══ COUNTERS ═══ */
function animCount(el){
  const t=parseInt(el.dataset.t,10);const dur=1800;const s=performance.now();
  (function tick(n){const p=Math.min((n-s)/dur,1);const e=1-Math.pow(1-p,3);el.textContent=Math.floor(e*t)+(p<1?'':'+');if(p<1)requestAnimationFrame(tick);else el.textContent=t+'+';})(performance.now());
}
function initCounters(){
  const cObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){animCount(x.target);cObs.unobserve(x.target);}});},{threshold:.5});
  document.querySelectorAll('.counter').forEach(el=>cObs.observe(el));
}

/* ═══ BAR FILLS ═══ */
function initBars(){
  const bObs=new IntersectionObserver(e=>{
    e.forEach(x=>{
      if(x.isIntersecting){x.target.style.width=x.target.dataset.w||'0%';}
      else{x.target.style.transition='none';x.target.style.width='0%';requestAnimationFrame(()=>requestAnimationFrame(()=>{x.target.style.transition='';}));}
    });
  },{threshold:.4});
  document.querySelectorAll('.bf').forEach(b=>{b.dataset.w=b.getAttribute('data-w')||'0%';b.style.width='0%';bObs.observe(b);});
}

/* ═══ NAV SPY ═══ */
function initNavSpy(){
  const sects=document.querySelectorAll('section[id]');
  const navAs=document.querySelectorAll('.nav-a');
  const spyObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){navAs.forEach(n=>n.classList.remove('act'));const l=document.querySelector(`.nav-a[href="#${x.target.id}"]`);if(l)l.classList.add('act');}});},{rootMargin:'-30% 0px -60% 0px'});
  sects.forEach(s=>spyObs.observe(s));
}

/* ═══ 3D TILT ═══ */
function init3DTilt(){
  document.querySelectorAll('.svc-c,.card,.tilt').forEach(c=>{
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-4px)`;});
    c.addEventListener('mouseleave',()=>{c.style.transform='';});
  });
}

/* ═══ SMOOTH SCROLL ═══ */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});});
}

/* ═══ CURSOR GLOW (desktop) ═══ */
function initCursorGlow(){
  if(window.innerWidth<=639)return;
  const cg=document.createElement('div');
  cg.style.cssText='position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(41,121,242,.06) 0%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);will-change:transform;';
  document.body.appendChild(cg);
  let pendingX=0,pendingY=0,ticking=false;
  document.addEventListener('mousemove',e=>{
    pendingX=e.clientX;pendingY=e.clientY;
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{
      cg.style.transform=`translate(${pendingX-150}px, ${pendingY-150}px)`;
      ticking=false;
    });
  },{passive:true});
}

/* ═══ FORM HANDLER ═══ */
function handleForm(e,btnId){
  e.preventDefault();const b=document.getElementById(btnId);if(!b)return;
  b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="30 70"/></svg> Sending...';b.disabled=true;
  setTimeout(()=>{b.innerHTML='✓ Sent! We\'ll be in touch shortly.';b.style.background='linear-gradient(135deg,#04432c,#059669,#34d399)';b.style.animation='none';},2000);
}

/* ═══ INIT ALL ═══ */
document.addEventListener('DOMContentLoaded',()=>{
  buildTicker();initReveal();initCounters();initBars();initNavSpy();init3DTilt();initSmoothScroll();initCursorGlow();
});
