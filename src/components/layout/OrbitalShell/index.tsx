import React, { useState } from 'react';
import { IdentityAnchor } from '../RegionAnchors/IdentityAnchor';
import { NavAnchor } from '../RegionAnchors/NavAnchor';
import { SystemControls } from '../RegionAnchors/SystemControls';
import { MetadataAnchor } from '../RegionAnchors/MetadataAnchor';

interface OrbitalShellProps {
  /**
   * center stage content
   */
  children: React.ReactNode;

  /**
   * top-left identity config
   */
  identity: {
    title: string;
    subtitle?: string;
    onTitleClick?: () => void;
  };

  /**
   * left-vertical nav definition
   */
  navigation: {
    items: Array<{
      id: string;
      label: string;
      href: string;
      isActive: boolean;
    }>;
    onNavigate: (id: string, href: string) => void;
  };

  /**
   * bottom-right anchor content
   */
  auxiliaryContent?: React.ReactNode;

  /**
   * bottom-left anchor content
   */
  systemControls?: React.ReactNode;
}

export const OrbitalShell: React.FC<OrbitalShellProps> = ({
  children,
  identity,
  navigation,
  auxiliaryContent,
  systemControls,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-screen bg-transparent text-white overflow-hidden p-4 md:p-[var(--safe-area-spacing)]">
      {/* mobile header */}
      <div className="md:hidden flex justify-between items-start mb-4 z-50 relative">
        <IdentityAnchor
          title={identity.title}
          subtitle={identity.subtitle}
          onTitleClick={identity.onTitleClick}
        />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* mobile drawer */}
      {isMobileMenuOpen && (
        <div className="absolute inset-0 z-40 bg-[#181818] p-8 flex flex-col pt-24 space-y-8 md:hidden">
           <NavAnchor
            items={navigation.items}
            onNavigate={(id, href) => {
              navigation.onNavigate(id, href);
              setIsMobileMenuOpen(false);
            }}
          />
          <div className="pt-8 border-t border-white/10">
            <SystemControls>{systemControls}</SystemControls>
          </div>
        </div>
      )}

      {/* desktop grid layout definition */}
      <div className="flex flex-col md:grid h-full w-full md:grid-cols-[minmax(200px,15%)_1fr_minmax(200px,15%)] md:grid-rows-[auto_1fr_auto] gap-x-8">
        
        {/* region a: top-left identity (desktop only) */}
        <header className="hidden md:block col-start-1 row-start-1 z-50">
          <IdentityAnchor
            title={identity.title}
            subtitle={identity.subtitle}
            onTitleClick={identity.onTitleClick}
          />
        </header>

        {/* region b: mid-left nav (desktop only) */}
        <div className="hidden md:block col-start-1 row-start-2 pt-[10vh] z-50">
          <NavAnchor
            items={navigation.items}
            onNavigate={navigation.onNavigate}
          />
        </div>

        {/* region c: bottom-left controls (desktop only) */}
        <div className="hidden md:block col-start-1 row-start-3 self-end z-50">
            <SystemControls>
                {systemControls}
            </SystemControls>
        </div>

        {/* region e: central stage */}
        <main className={`flex-1 overflow-y-auto z-0 relative md:px-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700
          ${isMobileMenuOpen ? 'hidden md:block' : 'block'}
          col-start-2 col-end-3 row-start-1 row-end-4`
        }>
           {children}
        </main>

        {/* region d: bottom-right metadata (desktop only) */}
        <div className="hidden md:block col-start-3 row-start-3 self-end justify-self-end z-50">
          <MetadataAnchor>
            {auxiliaryContent}
          </MetadataAnchor>
        </div>
      </div>
    </div>
  );
};
