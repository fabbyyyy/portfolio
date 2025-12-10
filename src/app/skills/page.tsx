'use client';

import { PageHeader } from '@/components/ui/PageHeader';

export default function SkillsPage() {
  return (
    <section className="space-y-6">
        <PageHeader title="Skills & Technologies" subtitle="02 / 04" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* category 1: frontend */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Three.js', 'Framer Motion'].map(skill => (
                        <span key={skill} className="px-3 py-1.5 text-xs bg-white/5 border border-white/5 rounded-full text-white/80 hover:bg-white/10 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* category 2: backend */}
             <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Backend</h3>
                <div className="flex flex-wrap gap-2">
                    {['Node.js', 'PostgreSQL', 'GraphQL', 'Python', 'Firebase', 'Vercel'].map(skill => (
                        <span key={skill} className="px-3 py-1.5 text-xs bg-white/5 border border-white/5 rounded-full text-white/80 hover:bg-white/10 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            
             {/* category 3: mobile & tools */}
             <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Mobile & Tools</h3>
                <div className="flex flex-wrap gap-2">
                    {['Swift', 'SwiftUI', 'React Native', 'Figma', 'Affinity', 'Git', 'Docker'].map(skill => (
                        <span key={skill} className="px-3 py-1.5 text-xs bg-white/5 border border-white/5 rounded-full text-white/80 hover:bg-white/10 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
