'use client';

export default function SkillsPage() {
  return (
    <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
           <h2 className="text-xl font-light tracking-wide text-white/80">Skills & Technologies</h2>
           <span className="text-xs text-white/40 font-mono">02 / 04</span>
        </div>

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
