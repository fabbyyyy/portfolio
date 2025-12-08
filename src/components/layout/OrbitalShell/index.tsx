import React, { useState } from 'react';
import { IdentityAnchor } from '../RegionAnchors/IdentityAnchor';
import { NavAnchor } from '../RegionAnchors/NavAnchor';
import { SystemControls } from '../RegionAnchors/SystemControls';
import { MetadataAnchor } from '../RegionAnchors/MetadataAnchor';

interface OrbitalShellProps {
  /**
   * The primary content rendered in the center stage.
   */
  children: React.ReactNode;

  /**
   * Configuration for the Top-Left identity block.
   */
  identity: {
    title: string;
    subtitle?: string;
    onTitleClick?: () => void;
  };

  /**
   * Definition for the Left-Vertical navigation.
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
   * Content for the Bottom-Right anchor.
   */
  auxiliaryContent?: React.ReactNode;

  /**
   * Content for the Bottom-Left anchor.
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
      {/* Mobile Header */}
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

      {/* Mobile Drawer */}
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

      {/* 
        Desktop Grid Layout strictly defined:
        Grid Template:
        grid-template-columns: minmax(200px, 15%) 1fr minmax(200px, 15%);
        grid-template-rows: auto 1fr auto;
      */}
      <div className="flex flex-col md:grid h-full w-full md:grid-cols-[minmax(200px,15%)_1fr_minmax(200px,15%)] md:grid-rows-[auto_1fr_auto] gap-x-8">
        
        {/* Region A: Top-Left Identity (Desktop Only - Mobile handled above) */}
        <header className="hidden md:block col-start-1 row-start-1 z-50">
          <IdentityAnchor
            title={identity.title}
            subtitle={identity.subtitle}
            onTitleClick={identity.onTitleClick}
          />
        </header>

        {/* Region B: Mid-Left Navigation (Desktop Only) */}
        <div className="hidden md:block col-start-1 row-start-2 pt-[10vh] z-50">
          <NavAnchor
            items={navigation.items}
            onNavigate={navigation.onNavigate}
          />
        </div>

        {/* Region C: Bottom-Left System Controls (Desktop Only) */}
        <div className="hidden md:block col-start-1 row-start-3 self-end z-50">
            <SystemControls>
                {systemControls}
            </SystemControls>
        </div>

        {/* Region E: Central Stage */}
        <main className={`flex-1 overflow-y-auto z-0 relative md:px-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700
          ${isMobileMenuOpen ? 'hidden md:block' : 'block'}
          col-start-2 col-end-3 row-start-1 row-end-4`
        }>
           {children}
        </main>

        {/* Region D: Bottom-Right Contextual Metadata (Desktop Only) */}
        <div className="hidden md:block col-start-3 row-start-3 self-end justify-self-end z-50">
          <MetadataAnchor>
            {auxiliaryContent}
          </MetadataAnchor>
        </div>
      </div>
    </div>
  );
};
