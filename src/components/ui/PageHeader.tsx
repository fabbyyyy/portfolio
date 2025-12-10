'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div 
      className="flex items-center justify-between border-b border-white/10 pb-4 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <motion.h2 
        initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-xl font-light tracking-wide text-white/80 pl-2"
      >
        {title}
      </motion.h2>
      
      <motion.span 
        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="text-xs text-white/40 font-mono pr-2"
      >
        {subtitle}
      </motion.span>
    </div>
  );
}
