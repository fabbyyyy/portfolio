"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useAnimationControls,
} from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Extra px so opacity hits 0 before any sub-pixel / layout mismatch */
const FADE_END_SAFETY_PX = 48;

/**
 * Hero painting: opacity 1 → 0 by the time `#about` lands (first section after hero; scroll-mt aware).
 */
export function ScrollFadeHeroBg({
  scrollRootRef,
}: {
  scrollRootRef: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [scrollFade, setScrollFade] = useState(1);

  useEffect(() => {
    let cancelled = false;
    let detach: (() => void) | undefined;

    const bind = () => {
      const main = scrollRootRef.current;
      if (!main || cancelled) return;

      const update = () => {
        const about = document.getElementById("about");
        if (!about) return;

        const scrollMarginTop =
          parseFloat(getComputedStyle(about).scrollMarginTop) || 0;

        const mainRect = main.getBoundingClientRect();
        const aboutTopInMainContent =
          about.getBoundingClientRect().top - mainRect.top + main.scrollTop;

        const fadeEnd = Math.max(
          1,
          aboutTopInMainContent -
            scrollMarginTop -
            FADE_END_SAFETY_PX
        );

        const p = Math.min(1, Math.max(0, main.scrollTop / fadeEnd));
        setScrollFade(1 - p);
      };

      update();
      main.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });

      detach = () => {
        main.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    };

    bind();

    return () => {
      cancelled = true;
      detach?.();
    };
  }, [scrollRootRef]);

  useEffect(() => {
    if (reduceMotion) {
      controls.set({ scale: 1 });
      return;
    }

    let cancelled = false;

    async function run() {
      await controls.start({
        scale: 1,
        transition: { duration: 2.35, ease: easeOut },
      });
      if (cancelled) return;
      controls.start({
        scale: [1, 1.015, 1],
        transition: {
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [controls, reduceMotion]);

  return (
    <motion.img
      src="/images/hero-bg.png"
      alt=""
      className="pointer-events-none fixed inset-0 z-0 size-full object-cover brightness-[1.06] saturate-[0.94] contrast-[0.99] will-change-[opacity,transform]"
      draggable={false}
      initial={{ scale: reduceMotion ? 1 : 1.07 }}
      animate={controls}
      style={{ opacity: scrollFade }}
    />
  );
}
