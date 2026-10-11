"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const contentY = useTransform(scrollY, [0, 480], [0, -90]);
  const gustFade = useTransform(scrollY, [200, 480], [1, 0]);
  const probeA = useTransform(scrollY, [0, 480], [0.05, 0.18]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-20 pt-24 sm:px-10 sm:pb-24"
    >
      {/* Ambient glow fields */}
      <motion.div
        style={{ opacity: probeA }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-neural/[0.13] blur-[120px]"
        aria-hidden="true"
      />
      <motion.div
        style={{ opacity: probeA }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-cyber/[0.10] blur-[110px]"
        aria-hidden="true"
      />

      <motion.div style={{ opacity: contentOpacity, y: contentY }}>
        {/* HUD meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
          className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[9px] tracking-[0.22em] text-cyan-100/50 sm:mb-6 sm:gap-x-6 sm:gap-y-2 sm:text-[10px] sm:tracking-[0.32em]"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-led-blink rounded-full bg-matrix shadow-[0_0_8px_#00FF66]" />
            BUILD 04.20.26
          </span>
          <span className="hidden sm:inline">// BIOMECHANICAL NEURAL INTERFACE</span>
          <span className="hidden text-neural sm:inline">// VESSEL CLASS: NC-SV1</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
          className="max-w-5xl font-display text-[12.5vw] font-extrabold uppercase leading-[0.92] tracking-tighter text-white [text-wrap:balance] sm:text-[9vw] sm:leading-[0.9] lg:text-[7.5rem]"
        >
          THE ARCHITECTURE
          <br />
          <span className="bg-gradient-to-r from-cyber via-matrix to-neural bg-clip-text text-transparent">
            OF TRANSCENDENCE
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md font-sans text-sm leading-relaxed text-cyan-100/60">
            A millimeter-precision cybernetic chassis engineered for full
            sensory integration. Scroll to witness the disassembly sequence —
            every servo, synapse, and lattice strand indexed in real time.
          </p>

          <a
            href="#sequence"
            className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-cyber sm:text-[11px] sm:tracking-[0.32em]"
          >
            <span className="animate-pulse-glow border border-cyber/30 bg-cyber/5 px-3 py-2.5 sm:py-2">
              <span className="sm:hidden">[ SCROLL TO EXPAND ↓ ]</span>
              <span className="hidden sm:inline">
                [ SCROLL TO EXPAND SCHEMATICS ↓ ]
              </span>
            </span>
            <span className="hidden h-px w-10 bg-cyber/40 transition-all group-hover:w-16 sm:block" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll gust line that consumes as you scroll into the sequence */}
      <motion.div
        style={{ opacity: gustFade }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyber/10 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}