import { Link } from '@inertiajs/react';
import { ArrowRight, Fingerprint } from 'lucide-react';
import { useAudience } from '@/hooks/use-audience';
const RECOMMEND = {
    business:{text:'Working on a business website?',heading:'See practical next steps for your website.',href:'/services',action:'Explore services'},
    startup:{text:'Planning a new product?',heading:'Explore a scope-first approach to launch.',href:'/solutions',action:'Explore solutions'},
    developer:{text:'Interested in engineering?',heading:'See the bugs, causes and solutions behind our work.',href:'/bug-museum',action:'Open Bug Museum'},
};
export default function AudienceNext(){
    const {audience}=useAudience();
    const x=RECOMMEND[audience];
    return <aside className="acx-context" aria-label="Recommendations based on your selected perspective">
        <div><span className="acx-eyebrow"><Fingerprint size={13}/>{x.text}</span><p>{x.heading}</p></div>
        <div className="acx-actions"><Link href={x.href} className="acx-link">{x.action}<ArrowRight size={16}/></Link><Link href="/for-you" className="acx-link">Change perspective</Link></div>
    </aside>;
}
