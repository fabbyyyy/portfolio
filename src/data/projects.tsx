import React from 'react';

export interface Project {
  id: string; // slug
  title: string;
  shortDescription: string;
  fullDescription: React.ReactNode;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'caritas-monterrey',
    title: 'Cáritas de Monterrey',
    shortDescription: 'A modern native iOS app meant for donations.',
    fullDescription: (
      <>
        <p>
          Cáritas de Monterrey is a non-profit organization that helps people in need.
          This project involved creating a native iOS application to facilitate donations and keep users informed about the organization&apos;s impact.
        </p>
        <p className="mt-4">
          Key features include:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Secure donation processing</li>
          <li>Real-time impact tracking</li>
          <li>News and updates from the organization</li>
        </ul>
        
        {/* here is an example of embedding an image in my description */}
        <div className="my-8 rounded-lg overflow-hidden border border-white/10">
             <img 
                src="/images/projects/caritas/caritas.png" 
                alt="App Interface Preview" 
                className="w-full"
            />
            <p className="p-2 text-xs text-center text-white/40 bg-white/5">
                Donation Flow Interface
            </p>
        </div>
      </>
    ),
    tags: ['Swift', 'SwiftUI', 'PostgreSQL'],
    imageUrl: '/images/projects/caritas/caritas.png',
  },
  {
    id: 'startup-journal',
    title: 'StartUp Journal',
    shortDescription: 'A modern native iOS app, and website meant for tracking your startup or ideas progress.',
    fullDescription: (
      <>
        <p>
          StartUp Journal is a comprehensive tool for entrepreneurs to track their journey.
          It combines a swift-based iOS app with a web dashboard to provide analytics, goal tracking, and progress visualization.
        </p>
        <div className="my-8 p-4 bg-white/5 border-l-2 border-green-500 rounded-r opacity-80">
            <p className="text-sm italic">
                &quot;The platform allows founders to visualize their growth like never before.&quot;
            </p>
        </div>
        <p>
          The platform allows founders to:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Log daily progress</li>
          <li>Track key metrics</li>
          <li>Visualize growth trends</li>
        </ul>
      </>
    ),
    tags: ['Angular', 'SwiftData', 'SwiftUI'],
    imageUrl: '/images/placeholder.png',
  }
];
