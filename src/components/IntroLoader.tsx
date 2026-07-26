"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { whenHeroBgReady } from "@/components/heroBg";

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Loader never flashes shorter than this — a 90ms blink reads as a glitch */
const MIN_VISIBLE_MS = 700;
/** Never hold the site hostage on a slow network */
const MAX_VISIBLE_MS = 4500;

/**
 * Mint curtain over the first paint: hides the hero painting decoding in bands.
 * Lifts once the painting is decoded and fonts are ready (or the ceiling hits).
 */
export function IntroLoader() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [done, setDone] = useState(false);

  useEffect(() => {
    /** Only the home page paints the hero painting — elsewhere there is nothing to wait for */
    if (pathname !== "/") {
      setDone(true);
      return;
    }

    let settled = false;
    const startedAt = performance.now();

    const finish = () => {
      if (settled) return;
      settled = true;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setDone(true), wait);
    };

    const ceiling = window.setTimeout(finish, MAX_VISIBLE_MS);

    const fonts = document.fonts?.ready ?? Promise.resolve();

    Promise.all([whenHeroBgReady(), fonts]).then(finish);

    return () => window.clearTimeout(ceiling);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.intro = done ? "done" : "loading";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease: easeOut,
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: easeOut,
              delay: 0.05,
            }}
          >
            <span
              className="text-2xl uppercase tracking-[0.06em] text-black/70 sm:text-3xl"
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                fontWeight: 600,
              }}
            >
              Fabian Garza
            </span>

            <span className="relative block h-px w-32 overflow-hidden bg-black/10 sm:w-40">
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-y-0 left-0 w-1/3 bg-black/45"
                  animate={{ x: ["-120%", "360%"] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
