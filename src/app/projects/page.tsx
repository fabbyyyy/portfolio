'use client';

import Link from 'next/link';
import { projects } from '@/data/projects';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
        <PageHeader title="Selected Work" subtitle="01 / 04" />
        
        {/* responsive grid: using standard gap and columns */}
        {/* typographic project list */}
        <div className="flex flex-col space-y-4 pb-24">
           {projects.map((project, index) => (
             <Link 
               key={project.id} 
               href={`/projects/${project.id}`}
               className="group flex flex-col md:flex-row md:items-end md:justify-between py-6 border-b border-white/5 hover:border-white/20 transition-colors"
             >
               <div className="space-y-1">
                 <h2 className="text-3xl md:text-5xl font-extralight tracking-tight text-white group-hover:text-green-400 transition-colors duration-300">
                    {project.title}
                 </h2>
                 <p className="text-sm text-white/40 font-light group-hover:text-white/60 transition-colors">
                    {project.shortDescription}
                 </p>
               </div>
               
               <div className="mt-4 md:mt-0 text-right">
                 <div className="text-xs font-mono text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">
                    {/* Assuming dynamic year or hardcoded for now, or using last tag */}
                    2025 / {project.tags[0]} / Dev
                 </div>
               </div>
             </Link>
           ))}
        </div>
    </section>
  );
}
