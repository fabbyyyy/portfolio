"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useAnimationControls,
} from "framer-motion";
import {
  HERO_BG_LQIP,
  HERO_BG_SRC,
  HERO_BG_SRC_MOBILE,
  markHeroBgReady,
} from "@/components/heroBg";

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
  const [loaded, setLoaded] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);

  /* The preload link often finishes the image before React attaches onLoad, so
     `complete` has to be checked on mount as well or the reveal never fires. */
  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;

    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      setLoaded(true);
      markHeroBgReady();
    };

    const onDone = () => img.decode().then(reveal, reveal);

    if (img.complete) {
      onDone();
    } else {
      img.addEventListener("load", onDone);
      img.addEventListener("error", reveal);
    }

    return () => {
      cancelled = true;
      img.removeEventListener("load", onDone);
      img.removeEventListener("error", reveal);
    };
  }, []);

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
      <motion.div
        className="absolute inset-0 size-full brightness-[1.18] saturate-[0.9] contrast-[1.02] will-change-transform"
        initial={{ scale: reduceMotion ? 1 : 1.07 }}
        animate={controls}
      >
        {/* Blurred 32px stand-in: on screen from the first frame, so the full-size
            painting can never be seen decoding band by band. */}
        <div
          className="absolute inset-0 size-full scale-105 bg-cover bg-center blur-[6px]"
          style={{ backgroundImage: `url(${HERO_BG_LQIP})` }}
          aria-hidden
        />
        <img
          ref={heroImgRef}
          src={HERO_BG_SRC}
          srcSet={`${HERO_BG_SRC_MOBILE} 1280w, ${HERO_BG_SRC} 2400w`}
          sizes="100vw"
          alt=""
          className="absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
          draggable={false}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-white/12" aria-hidden />
    </div>
  );
}
