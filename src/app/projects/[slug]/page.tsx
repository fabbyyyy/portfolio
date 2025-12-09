import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projects.find(p => p.id === params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <article className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-3xl">
         {/* back navigation link */}
         <Link 
            href="/projects" 
            className="inline-flex items-center text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Projects
         </Link>

        {/* project title and summary */}
        <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">{project.title}</h1>
            <p className="text-xl text-white/60 font-light leading-relaxed">{project.shortDescription}</p>
        </div>

        {/* main hero image for the project */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-white/5">
             <img 
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
             />
        </div>

        {/* main description and sidebar grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 pt-8">
            {/* rich text description rendered from project data */}
            <div className="prose prose-invert prose-p:text-white/60 prose-p:font-light prose-headings:font-normal prose-headings:text-white max-w-none">
                {project.fullDescription}
            </div>

            <div className="space-y-8">
                {/* tech stack section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                             <span 
                                key={tag} 
                                className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/80"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* external links if i have them */}
                {project.link && (
                     <div className="space-y-4">
                         <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">Links</h3>
                         <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors"
                        >
                            <span>Visit Project</span>
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                         </a>
                     </div>
                )}
            </div>
        </div>
    </article>
  );
}
