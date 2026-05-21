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

/** Scroll distance over which the painting ramps back in before `#contact` */
const CONTACT_FADE_IN_MIN_PX = 260;
const CONTACT_FADE_IN_MAX_PX = 560;

/**
 * Hero painting: fades out toward `#about`, stays hidden through work, ramps back in approaching `#contact`.
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
        const contact = document.getElementById("contact");
        if (!about || !contact) return;

        const mainRect = main.getBoundingClientRect();
        const scrollTop = main.scrollTop;

        const scrollMarginAbout =
          parseFloat(getComputedStyle(about).scrollMarginTop) || 0;
        const aboutTopInMain =
          about.getBoundingClientRect().top - mainRect.top + scrollTop;

        const fadeEnd = Math.max(
          1,
          aboutTopInMain - scrollMarginAbout - FADE_END_SAFETY_PX
        );

        const scrollMarginContact =
          parseFloat(getComputedStyle(contact).scrollMarginTop) || 0;
        const contactTopInMain =
          contact.getBoundingClientRect().top - mainRect.top + scrollTop;

        const rampLen = Math.min(
          CONTACT_FADE_IN_MAX_PX,
          Math.max(
            CONTACT_FADE_IN_MIN_PX,
            Math.round(main.clientHeight * 0.52)
          )
        );

        /** Scroll position where opacity should reach ~1 when Contact is the focus */
        const contactAlignScroll = Math.max(
          0,
          contactTopInMain - scrollMarginContact
        );

        let fadeInStart = contactAlignScroll - rampLen;
        if (fadeInStart < fadeEnd + 8) {
          fadeInStart = fadeEnd + 8;
        }

        let opacity: number;

        if (scrollTop <= fadeEnd) {
          opacity = 1 - scrollTop / fadeEnd;
        } else if (scrollTop < fadeInStart) {
          opacity = 0;
        } else {
          opacity = Math.min(
            1,
            (scrollTop - fadeInStart) /
              Math.max(1, contactAlignScroll - fadeInStart)
          );
        }

        setScrollFade(Math.min(1, Math.max(0, opacity)));
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
    <div
      className="pointer-events-none fixed inset-0 z-0 size-full will-change-[opacity]"
      style={{ opacity: scrollFade }}
    >
      <motion.img
        src="/images/hero-bg.png"
        alt=""
        className="absolute inset-0 size-full object-cover brightness-[1.18] saturate-[0.9] contrast-[1.02] will-change-transform"
        draggable={false}
        initial={{ scale: reduceMotion ? 1 : 1.07 }}
        animate={controls}
      />
      <div className="absolute inset-0 bg-white/12" aria-hidden />
    </div>
  );
}
