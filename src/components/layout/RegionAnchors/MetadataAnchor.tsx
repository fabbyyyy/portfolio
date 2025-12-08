import React from 'react';

interface MetadataAnchorProps {
  children?: React.ReactNode;
  className?: string;
}

export const MetadataAnchor: React.FC<MetadataAnchorProps> = ({
  children,
  className = '',
}) => {
  return (
    <aside
      className={`text-right text-xs text-white/40 leading-relaxed max-w-[300px] ${className}`}
    >
       {/* text wraps upwards (grow from bottom) */}
      <div className="flex flex-col items-end justify-end h-full">
        {children}
      </div>
    </aside>
  );
};
