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
      {/* low hierarchy toggles/buttons */}
      <div className="text-white/40 hover:text-white/80 transition-colors duration-200 text-xs flex flex-col gap-2">
          {children}
      </div>
    </aside>
  );
};
