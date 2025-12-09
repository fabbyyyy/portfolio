'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group relative block bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:bg-white/[0.05] transition-all duration-300">
      {/* i'm using a mask here to fade the image bottom seamlessly */}
      <div 
        className="relative h-48 w-full overflow-hidden bg-black/20"
        style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
        }}
      >
        <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* card content area */}
      <div className="p-6 flex flex-col space-y-4">
         {/* title with hover chevron for clickability */}
         <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform duration-300">
             <h3 className="text-lg font-medium text-white">{project.title}</h3>
             <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-4 h-4 text-white/40 group-hover:text-white transition-colors"
             >
                <path d="M9 18l6-6-6-6" />
             </svg>
         </div>

         <p className="text-sm text-white/40 line-clamp-2 leading-relaxed">
            {project.shortDescription}
         </p>
         
         {/* tech stack pills */}
         <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map(tag => (
                <span 
                    key={tag} 
                    className="px-3 py-1 text-[10px] uppercase tracking-wider font-medium bg-white/5 border border-white/5 rounded-full text-white/60 group-hover:bg-white/10 group-hover:text-white/80 transition-colors"
                >
                    {tag}
                </span>
            ))}
         </div>
      </div>
    </Link>
  );
}
