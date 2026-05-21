"use client";

import { useState } from "react";
import { NavStroke, type NavStrokeAsset } from "./NavStroke";

type SocialNavLinkProps = {
  href: string;
  label: string;
  asset: NavStrokeAsset;
  className?: string;
  style?: React.CSSProperties;
};

/** Same underline “paint” pattern as the primary nav (`NavStroke`). */
export function SocialNavLink({
  href,
  label,
  asset,
  className = "",
  style,
}: SocialNavLinkProps) {
  const [strokeVisible, setStrokeVisible] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-block rounded-sm px-0.5 py-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/35 ${className}`}
      style={style}
      onMouseEnter={() => setStrokeVisible(true)}
      onMouseLeave={() => setStrokeVisible(false)}
      onFocus={() => setStrokeVisible(true)}
      onBlur={() => setStrokeVisible(false)}
    >
      <span className="relative z-0">{label}</span>
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[42%]">
        <NavStroke visible={strokeVisible} asset={asset} />
      </span>
    </a>
  );
}
