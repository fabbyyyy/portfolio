import React from 'react';

interface IdentityAnchorProps {
  title: string;
  subtitle?: string;
  className?: string;
  onTitleClick?: () => void;
}

export const IdentityAnchor: React.FC<IdentityAnchorProps> = ({
  title,
  subtitle,
  className = '',
  onTitleClick,
}) => {
  return (
    <div className={`flex flex-col select-none ${className}`}>
      <h1
        onClick={onTitleClick}
        className={`text-4xl whitespace-nowrap font-bold tracking-tight text-white ${
          onTitleClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <h2 className="text-lg whitespace-nowrap font-medium text-white/60 mt-1">{subtitle}</h2>
      )}
    </div>
  );
};
