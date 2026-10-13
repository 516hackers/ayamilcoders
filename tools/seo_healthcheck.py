#!/usr/bin/env python3
"""Ayamil Coders V28: dependency-free source and optional live SEO checks.

Usage:
  python3 tools/seo_healthcheck.py --source
  python3 tools/seo_healthcheck.py --live --base https://ayamilcoders.com --report seo_live_report.json

The live mode checks the DEPLOYED site, never assumes the ZIP is deployed.
This is NOT a Lighthouse or Google Search Console replacement.
"""
from __future__ import annotations
import argparse, json, os, pathlib, re, subprocess, ssl, sys, time
from html.parser import HTMLParser
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent

class PageHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.desc = []
        self.canonical = []
        self.robots = []
        self.og_image = []
        self.h1 = []
        self.in_title = False
        self.in_h1 = False
        self.skip = 0
        self.ld_count = 0
        self.text_count = 0
    def handle_starttag(self, name, attrs):
        a = dict(attrs)
        if name == 'script' and a.get('type') == 'application/ld+json': self.ld_count += 1
        if name in ('script','style','noscript'): self.skip += 1
        if name == 'title': self.in_title = True
        if name == 'h1': self.in_h1 = True; self.h1.append('')
        if name == 'meta':
            key=(a.get('name') or '').lower(); prop=(a.get('property') or '').lower()
            if key == 'description': self.desc.append(a.get('content',''))
            if key == 'robots': self.robots.append(a.get('content',''))
            if prop == 'og:image': self.og_image.append(a.get('content',''))
        if name == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href',''))
    def handle_endtag(self,name):
        if name in ('script','style','noscript'): self.skip=max(0,self.skip-1)
        if name == 'title': self.in_title = False
        if name == 'h1': self.in_h1 = False
    def handle_data(self,s):
        if self.skip:return
        if self.in_title:self.title+=s
        if self.in_h1 and self.h1:self.h1[-1]+=s
        if s.strip():self.text_count+=len(s.strip())

def catalogue():
    cmd=['php','-r', 'require "app/Support/PublicSeo.php"; echo json_encode(\\App\\Support\\PublicSeo::pages(), JSON_UNESCAPED_UNICODE);']
    r=subprocess.run(cmd, cwd=ROOT, text=True,capture_output=True)
    if r.returncode: raise RuntimeError(r.stderr)
    return json.loads(r.stdout)

def source_check():
    problems=[]; warnings=[]; checks={}
    pages=catalogue()
    checks['registered_public_pages']=len(pages)
    routes=(ROOT/'routes/web.php').read_text()
    missing=[path for path in pages if not re.search(r"Route::get\(['\"]"+re.escape(path)+r"['\"]",routes)]
    if missing: problems.append('Catalogued routes not defined in routes/web.php: '+', '.join(missing))
    checks['route_coverage']='PASS' if not missing else 'FAIL'
    schema=(ROOT/'app/Support/PublicSeo.php').read_text()
    checks['canonical_https']='https://ayamilcoders.com' in schema
    for rel in ['public/logo/ac-512.png','public/logo/favicon.ico','public/logo/apple-touch-icon.png','public/robots.txt','public/llms.txt']:
        if not (ROOT/rel).is_file():problems.append('Missing asset: '+rel)
    checks['brand_assets']='PASS' if not any('Missing asset:' in p for p in problems) else 'FAIL'
    for view in ['resources/views/app.blade.php','resources/views/public.blade.php']:
        s=(ROOT/view).read_text()
        if '<x-inertia::head>' not in s or "partials.seo-fallback" not in s:problems.append(view+' missing SSR-aware Inertia Head fallback')
        if 'href="/favicon.svg"' in s or 'href="/apple-touch-icon.png"' in s:problems.append(view+' references missing favicon asset')
    checks['ssr_aware_meta']='PASS' if not any('SSR-aware' in p for p in problems) else 'FAIL'
    package=json.loads((ROOT/'package.json').read_text())
    checks['ssr_build']='--ssr' in package.get('scripts',{}).get('build','')
    if not checks['ssr_build']:problems.append('npm run build does not build SSR')
    if 'inertia({ ssr:' not in (ROOT/'vite.config.ts').read_text():warnings.append('Explicit Inertia SSR host binding not found')
    robots=(ROOT/'public/robots.txt').read_text()
    checks['robots_sitemap']='Sitemap: https://ayamilcoders.com/sitemap.xml' in robots
    if not checks['robots_sitemap']:problems.append('robots sitemap directive missing')
    if 'Disallow: /up\n' in robots:warnings.append('Robots disallow /up would also match /updates')
    checks['faq_and_schema']='application/ld+json' in (ROOT/'resources/views/partials/seo-bootstrap.blade.php').read_text()
    checks['site_verification']='NOT CHECKED: requires Search Console property access'
    checks['lighthouse']='NOT CHECKED: requires running deployed site in Chrome with Lighthouse'
    checks['inertia_ssr_runtime']='NOT CHECKED: requires installed Composer and npm dependencies, running SSR service'
    return {'mode':'source','checked_at':'2026-10-13','checks':checks,'problems':problems,'warnings':warnings,
            'note':'Source checks alone do not verify production deployment, indexing, rankings or Core Web Vitals.'}, pages

def fetch(base,path,timeout):
    url=base.rstrip('/')+path
    req=Request(url,headers={'User-Agent':'AyamilSeoHealthcheck/1.0 (owner diagnostic)','Accept':'text/html,application/xml,*/*'})
    start=time.perf_counter()
    try:
        with urlopen(req, timeout=timeout, context=ssl.create_default_context()) as resp:
            content=resp.read(2500000)
            return {'status':resp.status,'url':resp.url,'content_type':resp.headers.get('Content-Type',''),
                    'elapsed_ms':round((time.perf_counter()-start)*1000), 'headers':dict(resp.headers),'body':content}
    except HTTPError as e:
        return {'status':e.code,'error':str(e),'url':url,'body':b'','headers':dict(e.headers),'elapsed_ms':round((time.perf_counter()-start)*1000)}
    except (URLError,TimeoutError,ConnectionError,OSError) as e:
        return {'status':None,'error':str(e),'url':url,'body':b'','headers':{},'elapsed_ms':round((time.perf_counter()-start)*1000)}

def live_check(base,pages,timeout):
    rows=[];problems=[];warnings=[]
    for path,record in pages.items():
        req=fetch(base,path,timeout)
        row={'path':path,'status':req['status'],'final_url':req['url'],'request_ms_not_ttfb':req['elapsed_ms']}
        if req['status']!=200:
            row['error']=req.get('error','non-200');problems.append(path+': HTTP '+str(req['status']));rows.append(row);continue
        parser=PageHTML();parser.feed(req['body'].decode('utf-8','replace'))
        row.update(title=parser.title.strip(),descriptions=len(parser.desc),canonicals=parser.canonical,headings=parser.h1,
                   robots=parser.robots,ld_json_scripts=parser.ld_count,visible_text_chars=parser.text_count,
                   charset='utf-8' in req['content_type'].lower())
        expected='https://ayamilcoders.com'+path
        if path=='/':expected+='/' if not expected.endswith('/') else ''
        if len(parser.desc)!=1: problems.append(path+': expected 1 meta description, got '+str(len(parser.desc)))
        if parser.canonical!=[expected]:problems.append(path+': canonical mismatch '+str(parser.canonical)+' expected '+expected)
        if not parser.title.strip():problems.append(path+': missing title')
        if not parser.h1: problems.append(path+': no H1 in initial HTTP HTML; SSR may be absent/not working')
        if len(parser.h1)>1:warnings.append(path+': multiple H1 in rendered HTML')
        if len(parser.desc)>1 or len(parser.canonical)>1:row['duplicate_meta']=True
        if not parser.ld_count:warnings.append(path+': no JSON-LD')
        if parser.text_count<350:warnings.append(path+': low amount of HTML text before JS execution')
        rows.append(row)
    assets={}
    for asset in ['/logo/ac-512.png','/logo/apple-touch-icon.png','/robots.txt','/sitemap.xml','/llms.txt']:
        r=fetch(base,asset,timeout)
        assets[asset]={'status':r['status'],'type':r.get('content_type',''),'size_bytes':len(r['body']),'elapsed_ms':r['elapsed_ms'],'error':r.get('error')}
        if r['status']!=200:problems.append('Missing live asset '+asset+' (HTTP '+str(r['status'])+')')
        if asset=='/sitemap.xml' and r['status']==200:
            try:
                root=ET.fromstring(r['body']);locs=[e.text for e in root.iter() if e.tag.endswith('}loc') or e.tag=='loc']
                assets[asset]['url_count']=len(locs)
                for path in pages:
                    url='https://ayamilcoders.com'+path
                    if url not in locs:problems.append('Missing sitemap URL '+url)
            except ET.ParseError as e:problems.append('Invalid XML sitemap: '+str(e))
    r=fetch(base,'/login',timeout)
    auth_header=r.get('headers',{}).get('X-Robots-Tag','')
    auth={'status':r['status'],'X-Robots-Tag':auth_header}
    if r['status']==200 and 'noindex' not in auth_header.lower():warnings.append('/login noindex not seen in X-Robots-Tag; inspect HTML meta robots')
    return {'mode':'live','base':base,'checked_at_utc':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),
            'pages':rows,'assets':assets,'login_robots':auth,'problems':problems,'warnings':warnings,
            'note':'Request duration is not Lighthouse TTFB or Core Web Vitals. Indexing, real-user metrics, Search Console and Google Business Profile require separate verification.'}

def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--source',action='store_true',help='Source audit (default)')
    ap.add_argument('--live',action='store_true',help='Fetch and check the deployed URL; requires network')
    ap.add_argument('--base',default='https://ayamilcoders.com')
    ap.add_argument('--timeout',type=int,default=12)
    ap.add_argument('--report',default='seo_healthcheck_report.json')
    args=ap.parse_args()
    source,pages=source_check()
    result=live_check(args.base,pages,args.timeout) if args.live else source
    out=pathlib.Path(args.report).resolve()
    out.write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n')
    print(json.dumps({'mode':result['mode'],'checks':result.get('checks'),
        'pages_checked':len(result.get('pages',[])),'errors':len(result.get('problems',[])),
        'warnings':len(result.get('warnings',[])),'report':str(out)},indent=2))
    for line in result.get('problems',[]):print('ERROR:',line)
    for line in result.get('warnings',[]):print('WARN:',line)
    return 1 if result.get('problems') else 0
if __name__=='__main__':sys.exit(main())
