'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Scene3D from '@/components/scene/Scene3D';
import { OrbitalShell } from '@/components/layout/OrbitalShell';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [liveMode, setLiveMode] = useState(true);

  // Derive active section from pathname
  // e.g. "/projects" -> "projects", "/" -> null
  const activeSection = pathname === '/' ? null : pathname.replace('/', '');

  const handleNavigate = (id: string, href: string) => {
    router.push(href);
  };

  const handleTitleClick = () => {
    router.push('/');
  };

  return (
    <>
      <Scene3D activeSection={activeSection} />
      <OrbitalShell
        identity={{
          title: "Fabian Garza",
          subtitle: "Fullstack & Swift Developer",
          onTitleClick: handleTitleClick,
        }}
        navigation={{
          items: [
            { id: 'projects', label: 'Projects', href: '/projects', isActive: activeSection === 'projects' },
            { id: 'skills', label: 'Skills & Technologies', href: '/skills', isActive: activeSection === 'skills' },
            { id: 'about', label: 'About', href: '/about', isActive: activeSection === 'about' },
            { id: 'contact', label: 'Contact', href: '/contact', isActive: activeSection === 'contact' },
          ],
          onNavigate: handleNavigate,
        }}
        auxiliaryContent={
          <div className="flex items-center gap-6 pointer-events-auto">
            <a href="https://github.com/fabbyyyy" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/svgs/socials/github-mark-white.svg" alt="GitHub" className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/fabiangarzag" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/svgs/socials/x-white.svg" alt="X" className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/fabiangarzag" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img src="/svgs/socials/InBug-White.png" alt="LinkedIn" className="w-5 h-5" />
            </a>
          </div>
        }
      >
        {children}
      </OrbitalShell>
    </>
  );
}
