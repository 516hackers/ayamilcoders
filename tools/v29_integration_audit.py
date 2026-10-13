#!/usr/bin/env python3
"""V29 source regression checks: site search, financial disclosure safety, SEO."""
from pathlib import Path
import json, re, subprocess
R=Path(__file__).resolve().parent.parent
catalog=(R/'resources/js/data/public-pages.ts').read_text()
cmd=(R/'resources/js/components/CommandPalette.tsx').read_text()
layout=(R/'resources/js/components/InteractiveTools.tsx').read_text()
ctrl=(R/'app/Http/Controllers/Api/CompanyMetricsController.php').read_text()
page=(R/'resources/js/pages/CompanyRegistration.tsx').read_text()
route=(R/'routes/web.php').read_text()
php=subprocess.run(['php','-r','require "app/Support/PublicSeo.php"; echo json_encode(\\App\\Support\\PublicSeo::pages());'],cwd=R,capture_output=True,text=True,check=True)
seo=set(json.loads(php.stdout))
urls=set(re.findall(r"\{url:'([^']+)',name:",catalog))
sections={p for p in urls if '#' in p}
public=urls-sections
assert seo==public, f"Mismatched search vs SEO pages: {seo^public}"
assert len(public)==18 and len(sections)==5
assert 'PUBLIC_SEARCH_ENTRIES' in cmd and 'PUBLIC_PAGES' in layout
assert 'slice(0,14)' not in cmd
assert 'AYAMIL_LEDGER_FEED_TOKEN' not in (R/'resources/js/pages/CompanyRegistration.tsx').read_text()
assert 'cash_per_share' in ctrl and 'ledger_cash_per_share' in page
assert 'public_enabled' in (R/'config/ayamil_ledger.php').read_text()
assert 'Cache::remember' in ctrl and 'withoutRedirecting()' in ctrl
assert "Route::redirect('/about/muhammad-muzamil', '/founder', 301)" in route
assert 'VITE_APP_NAME' not in (R/'resources/js/app.tsx').read_text()
assert '2023-07-21' in (R/'app/Support/PublicSeo.php').read_text()
for section in sections:
  pathname,anchor=section.split('#')
  if pathname=='/services':assert anchor in (R/'resources/js/pages/Services.tsx').read_text()
  if pathname=='/about':assert 'id="'+anchor+'"' in (R/'resources/js/pages/About.tsx').read_text()
print(json.dumps({'public_search_pages':len(public),'working_section_shortcuts':len(sections),'php_public_routes':len(seo),'search_consistency':'PASS','secure_ledger_flag':'PASS','seo_brand':'PASS','legacy_redirect':'PASS'},indent=2))
