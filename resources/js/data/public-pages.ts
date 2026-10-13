/** V29: single source of truth for searchable public routes. Align with app/Support/PublicSeo.php. */
export type PublicPageEntry = { url:string; name:string; desc:string; keywords:string };
export const PUBLIC_PAGES: readonly PublicPageEntry[] = [
  {url:'/',name:'Home',desc:'Company overview and services',keywords:'homepage welcome ayamil coders start'},
  {url:'/about',name:'Our Story & Team',desc:'Our origin, leadership and company history',keywords:'about us story history 2022 leadership hidden partner founder naming birthday'},
  {url:'/services',name:'Services & Expertise',desc:'Development, AI, blockchain and bug fixing',keywords:'software custom website web development Laravel React blockchain smart contracts AI SEO security debugging repair service'},
  {url:'/solutions',name:'Solutions',desc:'Technology solutions and project challenges',keywords:'solutions troubleshooting search visibility technical consulting problems'},
  {url:'/contact',name:'Contact & Project Inquiry',desc:'Send a development project brief',keywords:'contact WhatsApp phone email estimate quote consultation hire enquiry'},
  {url:'/benefits',name:'Client Benefits',desc:'Reasons to work with Ayamil Coders',keywords:'benefits support three months maintenance trust process client'},
  {url:'/careers',name:'Careers',desc:'Open roles and working with Ayamil Coders',keywords:'jobs hiring employment internship recruitment apply'},
  {url:'/ceo',name:'CEO — Hidden Partner',desc:'Chief Executive Officer and our story',keywords:'hidden partner chief executive officer leadership birthday july 21 ceo'},
  {url:'/founder',name:'Founder — Muhammad Muzamil',desc:'Founder and software developer profile',keywords:'founder Muhammad Muzamil Muzammil executive biography'},
  {url:'/company-registration',name:'Company Registration & Share Capital',desc:'SECP verification, capital and financial indicators',keywords:'company shares share value share price capital valuation registered face value book value cash per share live ledger NTN SECP corporate registration'},
  {url:'/top-it-company-sadiqabad',name:'IT Company in Sadiqabad',desc:'Local software development in Punjab',keywords:'Sadiqabad Rahim Yar Khan RYK local IT web developer Punjab'},
  {url:'/best-software-house-pakistan',name:'Software House in Pakistan',desc:'Pakistan-wide software and technology services',keywords:'best software house Pakistan national software company agency developers'},
  {url:'/updates',name:'Updates & Changelog',desc:'Documented website history and updates',keywords:'changelog releases history update development archive'},
  {url:'/privacy-policy',name:'Privacy Policy',desc:'Information and data privacy',keywords:'privacy security information personal data GDPR'},
  {url:'/terms',name:'Terms & Conditions',desc:'Project and website terms',keywords:'terms conditions agreement policies services legal'},
  {url:'/refund-policy',name:'Refund Policy',desc:'Payment and refund conditions',keywords:'refund return cancellation payment policy'},
  {url:'/cookie-policy',name:'Cookie Policy',desc:'Cookie and website technology information',keywords:'cookie consent tracking analytics cookies'},
  {url:'/disclaimer',name:'Disclaimer',desc:'Scope, legal and informational notices',keywords:'disclaimer liability information legal risk'},
];
/** Landing anchors verified in actual pages. */
export const PUBLIC_SECTIONS: readonly PublicPageEntry[] = [
  {url:'/services#web-development',name:'Web Development',desc:'Custom web applications and Laravel',keywords:'website custom frontend backend React PHP development'},
  {url:'/services#blockchain-development',name:'Blockchain Development',desc:'Smart contracts, tokens and DApps',keywords:'web3 Solidity Ethereum BSC NFT defi'},
  {url:'/services#ai-development',name:'AI Development',desc:'AI automation and intelligent applications',keywords:'machine learning artificial intelligence LLM OpenAI workflows'},
  {url:'/services#bug-fixing',name:'Bug Fixing',desc:'Code repair and troubleshooting',keywords:'error fix debugging security patches 500 performance'},
  {url:'/about#story',name:'Our Origin Story',desc:'The beginning of Ayamil Coders',keywords:'2022 hidden partner 21 July 2023 birthday Ayamil name history'},
];
export const PUBLIC_SEARCH_ENTRIES = [...PUBLIC_PAGES, ...PUBLIC_SECTIONS] as const;
