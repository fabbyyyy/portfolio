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
                    href="mailto:fabiangarzamx@gmail.com" 
                    className="inline-block text-3xl md:text-5xl text-white font-light hover:text-green-400 transition-colors tracking-tight"
                >
                    fabiangarzamx@gmail.com
                </a>
            </div>

            <div className="space-y-4">
                 <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">Socials</h3>
                 <div className="flex flex-col gap-4">
                    {[
                        { 
                            id: 'github',
                            href: 'https://github.com/fabbyyyy', 
                            handle: '@fabbyyyy',
                            icon: '/svgs/socials/github-mark-white.svg'
                        },
                        { 
                            id: 'twitter',
                            href: 'https://twitter.com/fabiangarzag', 
                            handle: '@fabiangarzag',
                            icon: '/svgs/socials/x-white.svg'
                        },
                        { 
                            id: 'linkedin',
                            href: 'https://linkedin.com/in/fabiangarzag', 
                            handle: 'Fabian Garza',
                            icon: '/svgs/socials/InBug-White.png'
                        }
                    ].map(link => (
                        <a 
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-white/20 transition-colors"
                        >
                            <span className="relative w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                <img 
                                    src={link.icon} 
                                    alt={link.id}
                                    className="w-full h-full object-contain"
                                />
                            </span>
                            <span className="text-sm text-white/40 font-mono group-hover:text-green-400 transition-colors">{link.handle}</span>
                        </a>
                    ))}
                 </div>
            </div>
        </div>
    </section>
  );
}
