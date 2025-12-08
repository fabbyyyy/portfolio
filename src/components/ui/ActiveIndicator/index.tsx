import React from 'react';

interface ActiveIndicatorProps {
  className?: string;
}

export const ActiveIndicator: React.FC<ActiveIndicatorProps> = ({ className = '' }) => {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full bg-white ml-[-1rem] mr-2 ${className}`}
      aria-hidden="true"
    />
  );
};
