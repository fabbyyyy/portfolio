import React from 'react';

interface SystemControlsProps {
  children?: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const SystemControls: React.FC<SystemControlsProps> = ({
  children,
  orientation = 'vertical',
  className = '',
}) => {
  return (
    <aside
      className={`flex ${
        orientation === 'vertical' ? 'flex-col space-y-4' : 'flex-row space-x-4'
      } ${className}`}
      aria-label="System Controls"
    >
      {/* 
         Children here should be toggles, buttons, or links.
         Styling them to be low visual hierarchy (opacity-40 or similar) 
         is usually handled by the passed children or refined in context.
         We set a base opacity here for the container if desired, but 
         PRD says "lowest visual hierarchy".
      */}
      <div className="text-white/40 hover:text-white/80 transition-colors duration-200 text-xs flex flex-col gap-2">
          {children}
      </div>
    </aside>
  );
};
