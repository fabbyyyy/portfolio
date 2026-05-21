"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { WORK_PROJECTS } from "@/data/projects";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  
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
    <div className="relative h-full min-h-0 w-full bg-[#C2DDD8] text-black">
      {/* Dynamic details local scroll container */}
      <main className="relative z-[1] h-full min-h-0 w-full overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth px-[29px] pb-24 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="mx-auto max-w-[1200px] pt-12 sm:pt-20">
          
          {/* Back Button with Micro-Animation */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: duration(0.65), ease: easeOut }}
            className="mb-10 sm:mb-16"
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
              className="group inline-flex items-center gap-3 text-sm font-bold lowercase tracking-widest text-black/70 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/35"
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

          {(() => {
            const projectIndex = WORK_PROJECTS.findIndex((p) => p.id === id);
            const isEven = projectIndex % 2 === 0;
            
            return (
              <div
                className={`flex flex-col gap-8 md:flex-row md:items-start md:gap-16 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Project Image: 55% width on desktop */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: duration(0.95), delay: 0.1, ease: easeOut }}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.04] shadow-sm md:w-[55%] shrink-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- premium asset */}
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover"
                    draggable={false}
                    style={{
                      viewTransitionName: `project-image-${project.id}`
                    } as React.CSSProperties & { viewTransitionName?: string }}
                  />
                </motion.div>

                {/* Text & Content Block */}
                <div className="min-w-0 flex-1">
                  
                  {/* Title Block */}
                  <div className="mb-8">
                    <motion.h1
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: duration(0.85), ease: easeOut }}
                      className="text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-black sm:text-5xl md:text-6xl"
                      style={{
                        ...frauncesDisplay,
                        viewTransitionName: `project-title-${project.id}`
                      } as React.CSSProperties & { viewTransitionName?: string }}
                    >
                      {project.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: duration(0.85), delay: 0.15, ease: easeOut }}
                      className="mt-4 text-lg font-medium text-black/50 sm:text-xl"
                      style={satoshi}
                    >
                      {project.subtitle}
                    </motion.p>
                  </div>

                  {/* Details / Split Metadata Grid */}
                  <div className="border-t border-black/10 pt-8 flex flex-col gap-8">
                    
                    {/* Description block */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: duration(0.65), delay: 0.25, ease: easeOut }}
                      className="flex flex-col gap-3"
                      style={satoshi}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-black/45">
                        About the project
                      </h4>
                      <p className="text-lg leading-relaxed text-black/80 sm:text-xl font-normal">
                        {project.fullDetails || project.description}
                      </p>
                    </motion.div>
                    
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
