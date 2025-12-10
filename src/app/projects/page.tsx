'use client';

import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
        <PageHeader title="Selected Work" subtitle="01 / 04" />
        
        {/* responsive grid: using standard gap and columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24">
           {projects.map(project => (
               <ProjectCard key={project.id} project={project} />
           ))}
        </div>
    </section>
  );
}
