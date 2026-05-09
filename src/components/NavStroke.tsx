"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

export type NavStrokeAsset = {
  src: string;
  width: number;
  height: number;
};

type NavStrokeProps = {
  visible: boolean;
  asset: NavStrokeAsset;
  className?: string;
};

/**
 * “Paint” effect = horizontal reveal over `/svgs/wrk.svg`, `abt.svg`, `cntct.svg`.
 */
export function NavStroke({ visible, asset, className }: NavStrokeProps) {
  const reduceMotion = useReducedMotion();
  const { src, width, height } = asset;

  return (
    <div
      className={`pointer-events-none relative shrink-0 overflow-hidden ${className ?? ""}`}
      style={{ width, height }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-y-0 left-0 overflow-hidden"
        initial={false}
        animate={{ width: visible ? width : 0 }}
        transition={{
          width: {
            duration: reduceMotion ? 0 : 0.85,
            ease: easeOut,
          },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG assets */}
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          draggable={false}
          className="block max-w-none select-none"
          style={{ width, height, minWidth: width }}
        />
      </motion.div>
    </div>
  );
}
