"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      syncTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
      lerp: 0.06,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}