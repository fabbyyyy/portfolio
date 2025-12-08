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
       {/* 
        PRD: "The text must wrap upwards (grow from bottom to top) and align to the right." 
        flex-col + justify-end handles the "grow from bottom" visual if height is constrained,
        but for a text block, standard flow with text-right works.
       */}
      <div className="flex flex-col items-end justify-end h-full">
        {children}
      </div>
    </aside>
  );
};
