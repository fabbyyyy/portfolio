import React from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
}

interface NavAnchorProps {
  items: NavItem[];
  onNavigate: (id: string, href: string) => void;
  className?: string;
}

export const NavAnchor: React.FC<NavAnchorProps> = ({
  items,
  onNavigate,
  className = '',
}) => {
  return (
    <nav className={`flex flex-col ${className}`} aria-label="Primary Navigation">
      <ul className="flex flex-col space-y-6">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id, item.href)}
              className={`group relative flex items-center text-left text-lg font-light tracking-wide transition-opacity duration-200 outline-none
                ${item.isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100 focus:opacity-100'}`}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {/* Active Dot with Layout Animation */}
              {item.isActive && (
                <motion.span
                    layoutId="nav-dot"
                    className="absolute -left-4 w-1.5 h-1.5 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <span className="text-white">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
