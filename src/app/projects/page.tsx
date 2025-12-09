'use client';

import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

export default function ProjectsPage() {
  return (
    <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
           <h2 className="text-xl font-light tracking-wide text-white/80">Selected Work</h2>
           <span className="text-xs text-white/40 font-mono">01 / 04</span>
        </div>
        
        {/* responsive grid: using standard gap and columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24">
           {projects.map(project => (
               <ProjectCard key={project.id} project={project} />
           ))}
        </div>
    </section>
  );
}
