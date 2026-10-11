import { Check } from 'lucide-react';

/** Decorative status mark. No image fetch, animation loop or third-party assets. */
export default function AvatarCheck({ className = '' }: { className?: string }) {
    return <span className={`ac-verify ${className}`.trim()} aria-hidden="true"><Check size={13} strokeWidth={3} aria-hidden="true" /></span>;
}
