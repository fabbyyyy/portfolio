"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { WORK_PROJECTS, type ProjectScreenshot } from "@/data/projects";

const frauncesDisplay = {
  fontFamily: "var(--font-fraunces), serif",
  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
  fontWeight: 600,
  fontSynthesis: "none" as const,
} as const;

const satoshi = {
  fontFamily: "var(--font-satoshi), sans-serif",
} as const;

const easeOut = [0.16, 1, 0.3, 1] as const;

function Screenshot({ image, sizes, onOpen }: {
  image: ProjectScreenshot;
  sizes: string;
  onOpen: (image: ProjectScreenshot, trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Enlarge screenshot: ${image.alt}`}
      aria-haspopup="dialog"
      onClick={(event) => onOpen(image, event.currentTarget)}
      className="block w-full cursor-zoom-in rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        loading="eager"
        sizes={sizes}
        className="block h-auto w-full rounded-lg border border-black/10"
      />
    </button>
  );
}

const halfWidthSizes = "(max-width: 767px) calc(100vw - 58px), (max-width: 1258px) 46vw, 576px";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const screenshotDialog = useRef<HTMLDialogElement>(null);
  const screenshotTrigger = useRef<HTMLButtonElement>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<ProjectScreenshot | null>(null);

  function openScreenshot(image: ProjectScreenshot, trigger: HTMLButtonElement) {
    screenshotTrigger.current = trigger;
    setSelectedScreenshot(image);
    screenshotDialog.current?.showModal();
  }

  // Resolve the page transition promise on mount
  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { __pageTransitionResolve?: () => void }).__pageTransitionResolve) {
      (window as unknown as { __pageTransitionResolve?: () => void }).__pageTransitionResolve?.();
      (window as unknown as { __pageTransitionResolve: (() => void) | null }).__pageTransitionResolve = null;
    }
  }, []);

  // Find project in the shared projects data
  const project = WORK_PROJECTS.find((p) => p.id === id);

  // Fallback if project is not found
  if (!project) {
    return (
      <div className="relative flex h-full min-h-dvh w-full flex-col items-center justify-center bg-[#C2DDD8] px-[29px] text-black">
        <h1 className="text-3xl font-semibold uppercase tracking-tight" style={frauncesDisplay}>
          Project Not Found
        </h1>
        <p className="mt-4 text-lg" style={satoshi}>
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-sm border border-black/25 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-black/5"
          style={satoshi}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const duration = (s: number) => (reduceMotion ? 0 : s);
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-[#C2DDD8] text-black">
      <nav aria-label="Project navigation" className="shrink-0 px-[29px] pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: duration(0.65), ease: easeOut }}
          >
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                const targetUrl = "/";
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
              className="group inline-flex min-h-11 items-center gap-3 text-sm font-bold lowercase tracking-widest text-black/70 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/35"
              style={satoshi}
            >
              <motion.span
                className="inline-block text-sm"
                variants={{
                  hover: { x: -4 },
                }}
                transition={{ duration: duration(0.25), ease: easeOut }}
              >
                ←
              </motion.span>
              <span className="relative">
                back to projects
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-black/40 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth px-[29px] pb-24">
        <div className="mx-auto max-w-[1200px] pt-8 sm:pt-12">
          <header className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration(0.65), ease: easeOut }}
              className="max-w-sm"
              style={satoshi}
            >
              <h1 className="sr-only">{project.title}</h1>
              {/* eslint-disable-next-line @next/next/no-img-element -- local SVG logo */}
              <img
                src={project.logo}
                alt=""
                draggable={false}
                className="mb-6 h-24 w-full max-w-[17rem] object-contain object-left"
                style={{ viewTransitionName: `project-image-${project.id}` }}
              />
              <p className="text-xl leading-snug text-black/85 sm:text-2xl">
                {project.summary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                {project.subtitle}
              </p>
            </motion.div>

            {project.cover && (
              <div className="md:col-span-2">
                <Screenshot
                  image={project.cover}
                  sizes="(max-width: 767px) calc(100vw - 58px), (max-width: 1258px) 64vw, 784px"
                  onOpen={openScreenshot}
                />
              </div>
            )}
          </header>

          <section className="mt-12 grid grid-cols-1 items-center gap-8 md:mt-20 md:grid-cols-2 md:gap-12">
            <div className="max-w-prose" style={satoshi}>
              <h2 className="mb-4 text-2xl text-black/90" style={frauncesDisplay}>
                About the project
              </h2>
              <p className="whitespace-pre-line text-base leading-relaxed text-black/80 sm:text-lg">
                {project.fullDetails}
              </p>
            </div>
            {project.overviewImage && (
              <Screenshot image={project.overviewImage} sizes={halfWidthSizes} onOpen={openScreenshot} />
            )}
          </section>

          {project.gallery?.map(({ heading, images }) => (
            <section key={heading} className="mt-12 md:mt-20">
              <h2 className="mb-5 text-2xl text-black/90 md:mb-8" style={frauncesDisplay}>
                {heading}
              </h2>
              <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-8">
                {images.map((image) => (
                  <Screenshot key={image.src} image={image} sizes={halfWidthSizes} onOpen={openScreenshot} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <dialog
        ref={screenshotDialog}
        aria-label="Screenshot preview"
        onClose={() => {
          setSelectedScreenshot(null);
          screenshotTrigger.current?.focus({ preventScroll: true });
        }}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="fixed inset-0 m-auto max-h-none max-w-[calc(100vw-2rem)] overflow-visible bg-transparent text-white backdrop:bg-black/85"
      >
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            aria-label="Close screenshot"
            onClick={() => screenshotDialog.current?.close()}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/15 text-2xl leading-none hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">×</span>
          </button>
          {selectedScreenshot && (
            <Image
              src={selectedScreenshot.src}
              alt={selectedScreenshot.alt}
              width={selectedScreenshot.width}
              height={selectedScreenshot.height}
              sizes="calc(100vw - 2rem)"
              className="h-auto max-h-[calc(100dvh-6rem)] w-auto max-w-full rounded-lg object-contain"
            />
          )}
        </div>
      </dialog>
    </div>
  );
}
