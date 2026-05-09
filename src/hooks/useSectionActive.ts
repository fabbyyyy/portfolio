"use client";

import { type RefObject, useEffect, useState } from "react";

export function useSectionActive(
  scrollRootRef: RefObject<HTMLElement | null>,
  sectionIds: readonly string[]
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let raf = 0;

    const ratios = new Map<string, number>();

    const pickActive = () => {
      let best: string | null = null;
      let bestR = 0;
      for (const id of sectionIds) {
        const r = ratios.get(id) ?? 0;
        if (r > bestR) {
          bestR = r;
          best = id;
        }
      }
      setActiveId(bestR > 0.08 ? best : null);
    };

    const attach = () => {
      if (cancelled) return;

      const root = scrollRootRef.current;
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (!root || elements.length === 0) {
        raf = requestAnimationFrame(attach);
        return;
      }

      for (const id of sectionIds) ratios.set(id, 0);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).id;
            if (sectionIds.includes(id)) {
              ratios.set(
                id,
                entry.isIntersecting ? entry.intersectionRatio : 0
              );
            }
          }
          pickActive();
        },
        {
          root,
          threshold: [
            0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.33, 0.5, 0.66, 0.75, 1,
          ],
          rootMargin: "-38% 0px -38% 0px",
        }
      );

      for (const el of elements) observer.observe(el);
    };

    attach();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [scrollRootRef, sectionIds]);

  return activeId;
}
