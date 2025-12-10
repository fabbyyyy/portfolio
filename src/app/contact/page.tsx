'use client';

import { PageHeader } from '@/components/ui/PageHeader';

export default function ContactPage() {
  return (
    <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 max-w-2xl">
        <PageHeader title="Contact" subtitle="04 / 04" />

        <div className="space-y-12">
            <div className="space-y-4">
                <p className="text-xl text-white/60 font-light leading-relaxed">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
                <a 
                    href="mailto:hello@fabiangarza.com" 
                    className="inline-block text-3xl md:text-5xl text-white font-light hover:text-green-400 transition-colors tracking-tight"
                >
                    hello@fabiangarza.com
                </a>
            </div>

            <div className="space-y-4">
                 <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">Socials</h3>
                 <div className="flex flex-col gap-4">
                    {[
                        { label: 'GitHub', href: 'https://github.com', handle: '@fabiangarza' },
                        { label: 'Twitter', href: 'https://twitter.com', handle: '@fabiangarza' },
                        { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'Fabian Garza' },
                        { label: 'All My Links', href: 'https://allmylinks.com', handle: 'Fabian Garza' }
                    ].map(link => (
                        <a 
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-white/20 transition-colors"
                        >
                            <span className="text-lg text-white/80 group-hover:text-white transition-colors">{link.label}</span>
                            <span className="text-sm text-white/40 font-mono group-hover:text-green-400 transition-colors">{link.handle}</span>
                        </a>
                    ))}
                 </div>
            </div>
        </div>
    </section>
  );
}
