"use client";

import Link from "next/link";
import { useRef, useCallback, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { NavStroke, type NavStrokeAsset } from "@/components/NavStroke";
import { ScrollFadeHeroBg } from "@/components/ScrollFadeHeroBg";
import { useSectionActive } from "@/hooks/useSectionActive";

/** DOM scroll order: about → work → contact (nav order unchanged) */
const SECTION_IDS = ["about", "work", "contact"] as const;

const NAV = [
  { id: "work" as const, label: "work" },
  { id: "about" as const, label: "about" },
  { id: "contact" as const, label: "contact" },
] as const;

/** Dimensions from each SVG’s root width/height — matches public/svgs/*.svg */
const NAV_STROKE_ASSETS: Record<(typeof NAV)[number]["id"], NavStrokeAsset> = {
  work: { src: "/svgs/wrk.svg", width: 57, height: 49 },
  about: { src: "/svgs/abt.svg", width: 75, height: 41 },
  contact: { src: "/svgs/cntct.svg", width: 79, height: 35 },
};

const HERO_BIO =
  "I am a developer based in Mexico, currently studying at Tecnológico de Monterrey. I love art, music and automobiles.";

/** Matches Figma hero: Fraunces SemiBold + SOFT/WONK axes */
const frauncesDisplay = {
  fontFamily: "var(--font-fraunces), serif",
  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
  fontWeight: 600,
  fontSynthesis: "none" as const,
} as const;

const easeOut = [0.16, 1, 0.3, 1] as const;

/** px scrolled on `main` before header picks up frosted blur */
const HEADER_BLUR_SCROLL_THRESHOLD = 32;


export default function Home() {
  const reduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  /** Past hero — mint sections use solid header (no frosted gradient / blur seam) */
  const [headerOnContentSurface, setHeaderOnContentSurface] = useState(false);
  const activeSection = useSectionActive(mainRef, SECTION_IDS);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const onScroll = () => {
      const blurred = main.scrollTop > HEADER_BLUR_SCROLL_THRESHOLD;
      setHeaderScrolled((prev) => (prev !== blurred ? blurred : prev));

      const hero = document.getElementById("hero");
      if (hero) {
        const passedHero =
          main.scrollTop >= Math.max(0, hero.offsetHeight - 2);
        setHeaderOnContentSurface((prev) =>
          prev !== passedHero ? passedHero : prev
        );
      }
    };

    onScroll();
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  /** Strip `#…` from URL (older bookmarks / pasted links) — nav uses `/` + programmatic scroll */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, search, hash } = window.location;
    if (hash) {
      window.history.replaceState(null, "", `${pathname}${search}`);
    }
  }, []);

  const duration = (s: number) => (reduceMotion ? 0 : s);
  const delay = (s: number) => (reduceMotion ? 0 : s);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduceMotion]
  );

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(0.95), ease: easeOut },
    },
  };

  const navListVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: delay(0.12),
      },
    },
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(0.55), ease: easeOut },
    },
  };

  const heroContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.14,
        delayChildren: delay(0.42),
      },
    },
  };

  const heroLineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 56,
      skewY: reduceMotion ? 0 : 2,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: duration(1.12), ease: easeOut },
    },
  };

  return (
    <div className="relative h-full min-h-0 w-full text-black">
      <motion.header
        className={`pointer-events-auto fixed inset-x-0 top-0 z-20 flex w-full flex-row flex-wrap items-baseline justify-between gap-x-3 gap-y-2 px-[29px] pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] text-black transition-[backdrop-filter,background-color] ease-out max-sm:flex-nowrap sm:pb-10 sm:pt-[30px] ${
          headerOnContentSurface
            ? "bg-[#C2DDD8]/88 backdrop-blur-xl backdrop-saturate-150 [text-shadow:none]"
            : `bg-gradient-to-b from-[#C2DDD8]/72 via-[#C2DDD8]/38 to-transparent [text-shadow:0_1px_1px_rgba(255,255,255,0.35)] ${
                headerScrolled
                  ? "backdrop-blur-xl backdrop-saturate-150"
                  : "backdrop-blur-none"
              }`
        } ${reduceMotion ? "duration-0" : "duration-500"}`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.14,
              delayChildren: delay(0.02),
            },
          },
        }}
      >
        <motion.div variants={headerVariants} className="min-w-0 shrink-0">
          <Link
            href="/"
            scroll={false}
            className="inline-block cursor-pointer rounded-sm px-0.5 py-1 text-sm font-semibold uppercase tracking-normal text-black outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/35 sm:text-xl sm:text-2xl"
            style={frauncesDisplay}
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
          >
            Fabian Garza
          </Link>
        </motion.div>

        <motion.nav
          className="flex max-w-[62%] flex-wrap items-baseline justify-end gap-x-1 sm:max-w-none sm:gap-x-6 md:gap-x-10 lg:gap-x-14"
          aria-label="Primary"
          variants={navListVariants}
        >
          {NAV.map(({ id, label }, index) => {
            const isActive = activeSection === id;
            return (
              <motion.span
                key={id}
                variants={navItemVariants}
                className="inline-flex items-baseline gap-x-1"
              >
                {index > 0 ? (
                  <span
                    className="select-none text-[11px] leading-none text-black/35 sm:hidden"
                    aria-hidden
                  >
                    ,
                  </span>
                ) : null}
                <Link
                  href="/"
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className="relative inline-block px-0.5 py-1 font-medium lowercase text-[11px] text-black sm:text-xl sm:text-2xl"
                  style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(id);
                  }}
                >
                  <span className="relative z-0">{label}</span>
                  <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[42%]">
                    <NavStroke
                      visible={isActive}
                      asset={NAV_STROKE_ASSETS[id]}
                    />
                  </span>
                </Link>
              </motion.span>
            );
          })}
        </motion.nav>
      </motion.header>

      <main
        ref={mainRef}
        className="relative z-[1] h-full min-h-0 w-full overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth"
      >
        <ScrollFadeHeroBg scrollRootRef={mainRef} />
        <section
          id="hero"
          aria-label="Intro"
          className="relative flex min-h-dvh shrink-0 snap-start flex-col overflow-hidden"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="absolute left-[29px] right-[29px] top-[max(6.25rem,calc(env(safe-area-inset-top)+5.25rem))] z-10 max-w-[min(100%,22rem)] text-pretty text-left font-medium leading-[1.25] sm:max-w-md md:max-w-lg [font-size:clamp(1.375rem,4.8vw,2.35rem)]"
              style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
              variants={heroLineVariants}
            >
              <span
                className="pointer-events-none absolute left-0 top-0 z-0 block w-full translate-x-[2px] translate-y-[2.5px] text-left text-white"
                style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
                aria-hidden
              >
                {HERO_BIO}
              </span>
              <span className="relative z-10 block text-black">{HERO_BIO}</span>
            </motion.p>
            <motion.div
              className="absolute bottom-0 left-0 right-0 box-border flex flex-col items-end pr-[29px] pl-[29px] pb-[max(env(safe-area-inset-bottom,0px),min(32px,max(0.625rem,3vh)))] pt-40"
              variants={heroContainerVariants}
            >
              <h1 className="contents">
                <motion.span
                  className="relative box-border block w-fit max-w-full font-semibold uppercase leading-[0.92]"
                  style={{
                    ...frauncesDisplay,
                    fontSize: "clamp(2.75rem,11vw,8rem)",
                    letterSpacing: "-1%",
                  }}
                  variants={heroLineVariants}
                >
                  <span
                    className="pointer-events-none absolute left-0 top-0 z-0 block translate-x-[0.022em] translate-y-[0.038em] text-white"
                    style={{
                      ...frauncesDisplay,
                      fontSize: "clamp(2.75rem,11vw,8rem)",
                      letterSpacing: "-1%",
                    }}
                    aria-hidden
                  >
                    Developer
                  </span>
                  <span className="relative z-10 text-black">Developer</span>
                </motion.span>
                <motion.span
                  className="relative -mt-[0.06em] box-border block w-fit max-w-full whitespace-nowrap font-semibold uppercase leading-[0.92]"
                  style={{
                    ...frauncesDisplay,
                    fontSize: "clamp(2.75rem,11vw,8rem)",
                    letterSpacing: "-3%",
                  }}
                  variants={heroLineVariants}
                >
                  <span
                    className="pointer-events-none absolute left-0 top-0 z-0 block translate-x-[0.022em] translate-y-[0.038em] text-white"
                    style={{
                      ...frauncesDisplay,
                      fontSize: "clamp(2.75rem,11vw,8rem)",
                      letterSpacing: "-3%",
                    }}
                    aria-hidden
                  >
                    &{"\u00A0"}Designer
                  </span>
                  <span className="relative z-10 text-black">
                    &{"\u00A0"}Designer
                  </span>
                </motion.span>
              </h1>
            </motion.div>
          </motion.div>
        </section>

        <section
          id="about"
          className="min-h-dvh shrink-0 snap-start scroll-mt-[64px] px-[29px] pb-24 pt-[120px]"
        >
          <h2
            className="max-w-prose text-3xl font-semibold uppercase sm:text-4xl"
            style={frauncesDisplay}
          >
            About
          </h2>
          <p
            className="mt-6 max-w-prose text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
          >
            A short bio and what you care about as a developer & designer.
          </p>
        </section>

        <section
          id="work"
          className="min-h-dvh shrink-0 snap-start scroll-mt-[120px] px-[29px] pb-24 pt-24"
        >
          <h2
            className="max-w-prose text-3xl font-semibold uppercase sm:text-4xl"
            style={frauncesDisplay}
          >
            Work
          </h2>
          <p
            className="mt-6 max-w-prose text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
          >
            Selected projects and experiments — replace this copy with your real
            case studies.
          </p>
        </section>

        <section
          id="contact"
          className="min-h-dvh shrink-0 snap-start scroll-mt-[120px] px-[29px] pb-24 pt-24"
        >
          <h2
            className="max-w-prose text-3xl font-semibold uppercase sm:text-4xl"
            style={frauncesDisplay}
          >
            Contact
          </h2>
          <p
            className="mt-6 max-w-prose text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
          >
            Email, socials, or a form — wire this section to how people should reach
            you.
          </p>
        </section>
      </main>
    </div>
  );
}
