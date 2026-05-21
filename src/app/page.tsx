"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useCallback, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { NavStroke, type NavStrokeAsset } from "@/components/NavStroke";
import { SocialNavLink } from "@/components/SocialNavLink";
import { ScrollFadeHeroBg } from "@/components/ScrollFadeHeroBg";
import { useSectionActive } from "@/hooks/useSectionActive";
import { frauncesItalic } from "./fonts";
import { WORK_PROJECTS } from "@/data/projects";

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

/** Hand-drawn strokes under contact social links — sizes match SVG root width/height */
const SOCIAL_STROKE_ASSETS: Record<
  "linkedin" | "github" | "twitter" | "instagram",
  NavStrokeAsset
> = {
  linkedin: { src: "/svgs/socials/linkedin.svg", width: 68, height: 37 },
  github: { src: "/svgs/socials/git.svg", width: 51, height: 24 },
  twitter: { src: "/svgs/socials/twt.svg", width: 55, height: 18 },
  instagram: { src: "/svgs/socials/gram.svg", width: 107, height: 23 },
};

const HERO_BIO =
  "i am a developer based in Mexico, currently studying at Tecnológico de Monterrey. I love art, music and automobiles.";

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

/** About + Contact intro paragraphs — same scale and Satoshi */
const sectionBodyClass =
  "max-w-[600px] text-lg font-medium leading-[1.55] tracking-wide text-black/80 sm:text-xl md:text-2xl";
const sectionBodySatoshi = {
  fontFamily: "var(--font-satoshi), sans-serif",
} as const;

// Project data imported from @/data/projects

export default function Home() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  /** Past hero — mint sections use solid header (no frosted gradient / blur seam) */
  const [headerOnContentSurface, setHeaderOnContentSurface] = useState(false);
  const activeSection = useSectionActive(mainRef, SECTION_IDS);

  /** Match hero-top header (gradient, no scroll blur) while Contact is active — pairs with painting fade-in */
  const headerHeroInitialLook = activeSection === "contact";

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

  // Scroll Restoration & Page Transition Resolution
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const saved = sessionStorage.getItem("portfolio-scroll-position");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) {
        main.scrollTop = parsed;
        main.scrollTo({ top: parsed, behavior: "instant" as unknown as ScrollBehavior });
      }
    }

    // Make sure we resolve in the next frame so the scroll is painted
    requestAnimationFrame(() => {
      if (typeof window !== "undefined" && (window as unknown as { __pageTransitionResolve?: () => void }).__pageTransitionResolve) {
        (window as unknown as { __pageTransitionResolve?: () => void }).__pageTransitionResolve?.();
        (window as unknown as { __pageTransitionResolve: (() => void) | null }).__pageTransitionResolve = null;
      }
    });
  }, []);

  const duration = (s: number) => (reduceMotion ? 0 : s);
  const delay = (s: number) => (reduceMotion ? 0 : s);

  const scrollTo = useCallback(
    (id: string) => {
      const main = mainRef.current;
      if (!main) return;
      if (id === "contact") {
        main.scrollTo({
          top: main.scrollHeight,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        return;
      }
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
        className={`pointer-events-auto fixed inset-x-0 top-0 z-20 flex w-full flex-row flex-wrap items-baseline justify-between gap-x-3 gap-y-2 px-[29px] pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] text-black transition-[backdrop-filter,background-color] ease-out max-sm:flex-nowrap sm:pb-10 sm:pt-[30px] ${headerOnContentSurface && !headerHeroInitialLook
          ? "bg-[#C2DDD8]/88 backdrop-blur-xl backdrop-saturate-150 [text-shadow:none]"
          : `bg-gradient-to-b from-[#C2DDD8]/72 via-[#C2DDD8]/38 to-transparent [text-shadow:0_1px_1px_rgba(255,255,255,0.35)] ${headerScrolled && !headerHeroInitialLook
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
        className="relative z-[1] h-full min-h-0 w-full scroll-pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth"
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
              className={`absolute left-[29px] right-[29px] top-[max(6.25rem,calc(env(safe-area-inset-top)+5.25rem))] z-10 text-pretty text-left ${sectionBodyClass}`}
              style={sectionBodySatoshi}
              variants={heroLineVariants}
            >
              {HERO_BIO}
            </motion.p>
            <motion.div
              className="absolute bottom-0 left-0 right-0 box-border flex flex-col items-end pr-[29px] pl-[29px] pb-[max(env(safe-area-inset-bottom,0px),min(32px,max(0.625rem,3vh)))] pt-40"
              variants={heroContainerVariants}
            >
              <motion.p
                className={`${frauncesItalic.className} mb-3 w-full text-right text-black sm:mb-4`}
                style={{
                  fontSize: "clamp(1.55rem,4.6vw,2.65rem)",
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                  fontSynthesis: "none",
                }}
                variants={heroLineVariants}
              >
                available for work
              </motion.p>
              <h1 className="contents">
                <motion.span
                  className="relative box-border block w-fit max-w-full font-semibold uppercase leading-[0.92] text-black"
                  style={{
                    ...frauncesDisplay,
                    fontSize: "clamp(2.75rem,11vw,8rem)",
                    letterSpacing: "-1%",
                  }}
                  variants={heroLineVariants}
                >
                  Developer
                </motion.span>
                <motion.span
                  className="relative -mt-[0.06em] box-border block w-fit max-w-full whitespace-nowrap font-semibold uppercase leading-[0.92] text-black"
                  style={{
                    ...frauncesDisplay,
                    fontSize: "clamp(2.75rem,11vw,8rem)",
                    letterSpacing: "-3%",
                  }}
                  variants={heroLineVariants}
                >
                  &{"\u00A0"}Designer
                </motion.span>
              </h1>
            </motion.div>
          </motion.div>
        </section>

        <section
          id="about"
          className="relative shrink-0 snap-start overflow-hidden"
          style={{ scrollMarginTop: "-6rem" }}
        >
          <div className="mx-auto flex min-h-dvh max-w-[1400px] flex-col items-stretch md:flex-row">
            {/* Left — Text */}
            <div className="flex flex-1 flex-col justify-center px-[29px] py-24 md:px-[clamp(2rem,5vw,5rem)] md:py-32">
              <h2
                className="text-3xl font-semibold uppercase leading-[1.1] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl"
                style={frauncesDisplay}
              >
                Hello, I Am Fabian
              </h2>
              <p
                className={`mt-8 ${sectionBodyClass}`}
                style={sectionBodySatoshi}
              >
                i use my passion and skills to create digital experiences, i love building thoughtful, and
                high quality software that connects with people. currently
                studying at tecnológico de monterrey, i love art, cars and music, but cover your ears if i start singing.
              </p>
            </div>

            {/* Right — Monarch image */}
            <div className="relative flex flex-1 items-end justify-center md:items-center md:justify-end">
              <img
                src="/images/monarch.png"
                alt="Monarch butterfly"
                className="pointer-events-none h-auto w-[80%] max-w-[480px] select-none object-contain md:w-full md:max-w-[560px]"
                draggable={false}
              />
            </div>
          </div>
        </section>

        <section
          id="work"
          className="min-h-dvh shrink-0 snap-start scroll-mt-[120px] px-[29px] pb-24 pt-8 sm:pt-10"
        >
          <h2
            className="mb-12 flex max-w-prose items-center gap-2.5 text-3xl font-semibold leading-[1.1] sm:text-4xl"
            style={frauncesDisplay}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative size tied to heading */}
            <img
              src="/images/bee.png"
              alt=""
              width={64}
              height={64}
              draggable={false}
              className="pointer-events-none h-[1.25em] w-[1.25em] shrink-0 select-none object-contain"
              aria-hidden
            />
            Selected work
          </h2>

          <div className="mx-auto flex max-w-[1200px] flex-col gap-20 md:gap-32">
            {WORK_PROJECTS.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <Link
                  key={project.id}
                  href={`/work/${project.id}`}
                  className="group block w-full cursor-pointer outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/35"
                  onClick={(e) => {
                    e.preventDefault();

                    const main = mainRef.current;
                    if (main) {
                      sessionStorage.setItem("portfolio-scroll-position", main.scrollTop.toString());
                    }

                    const targetUrl = `/work/${project.id}`;
                    if (typeof document !== "undefined" && "startViewTransition" in document) {
                      const transitionPromise = new Promise<void>((resolve) => {
                        let resolved = false;
                        const safeResolve = () => {
                          if (!resolved) {
                            resolved = true;
                            resolve();
                          }
                        };
                        (window as unknown as { __pageTransitionResolve: () => void }).__pageTransitionResolve = safeResolve;
                        setTimeout(safeResolve, 500);
                      });

                      document.startViewTransition(() => {
                        router.push(targetUrl);
                        return transitionPromise;
                      });
                    } else {
                      router.push(targetUrl);
                    }
                  }}
                >
                  <div
                    className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${isEven ? "" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Image Container: 55% width on desktop */}
                    <div className="aspect-[16/10] w-full overflow-hidden bg-black/[0.04] md:w-[55%] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element -- CMS/local assets */}
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width={800}
                        height={500}
                        draggable={false}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        style={{
                          viewTransitionName: `project-image-${project.id}`
                        } as React.CSSProperties & { viewTransitionName?: string }}
                      />
                    </div>

                    {/* Text Details Container */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-black transition-colors duration-300 group-hover:text-black/70 sm:text-5xl md:text-6xl"
                        style={{
                          ...frauncesDisplay,
                          viewTransitionName: `project-title-${project.id}`
                        } as React.CSSProperties & { viewTransitionName?: string }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="mt-4 text-lg font-medium text-black/50 sm:text-xl"
                        style={sectionBodySatoshi}
                      >
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          id="contact"
          className="relative z-[2] flex min-h-dvh shrink-0 snap-start flex-col px-[29px] pb-[max(env(safe-area-inset-bottom,0px),min(32px,max(0.625rem,3vh)))]"
        >
          {/* Top area — interest text on left */}
          <div className="flex flex-1 flex-col justify-start pt-[max(6rem,clamp(4rem,14vh,10rem))] md:flex-row md:justify-between">
            <p className={sectionBodyClass} style={sectionBodySatoshi}>
              I&apos;m interested in anything involving websites and native iOS
              applications.
            </p>

            {/* Right — Social links */}
            <nav
              className="mt-12 flex flex-col items-start gap-3 md:mt-0 md:items-end md:gap-3.5"
              aria-label="Social links"
            >
              {(
                [
                  {
                    id: "linkedin" as const,
                    label: "linkedin",
                    href: "https://linkedin.com/in/fabiangarzag",
                  },
                  {
                    id: "github" as const,
                    label: "github",
                    href: "https://github.com/fabbyyyy",
                  },
                  {
                    id: "twitter" as const,
                    label: "twitter",
                    href: "https://x.com/fabiangarzag",
                  },
                  {
                    id: "instagram" as const,
                    label: "instagram",
                    href: "https://instagram.com/fabbyyyy",
                  },
                ] as const
              ).map(({ id, label, href }) => (
                <SocialNavLink
                  key={id}
                  href={href}
                  label={label}
                  asset={SOCIAL_STROKE_ASSETS[id]}
                  className="text-lg font-semibold lowercase leading-snug tracking-tight text-black sm:text-xl md:text-2xl"
                  style={{ fontFamily: "var(--font-satoshi), sans-serif" }}
                />
              ))}
            </nav>
          </div>

          {/* Bottom-right — big mailto CTA */}
          <div className="flex justify-end pb-4 pt-12 md:pt-0">
            <a
              href="mailto:fabiangarzamx@gmail.com"
              className="block w-fit whitespace-nowrap text-right font-semibold uppercase leading-[0.92] text-black transition-opacity hover:opacity-60"
              style={{
                ...frauncesDisplay,
                fontSize: "clamp(2.75rem,11vw,8rem)",
                letterSpacing: "-1%",
              }}
            >
              Contact Me
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
