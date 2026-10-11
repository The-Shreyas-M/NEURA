"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { FRAME_COUNT } from "@/lib/frames";
import { PHASES, activePhaseFor, type Phase } from "@/lib/phases";

const EASE = [0.16, 1, 0.3, 1] as const;

interface TelemetryRefs {
  frame: HTMLElement | null;
  progress: HTMLElement | null;
  sync: HTMLElement | null;
}

interface ScrollHUDProps {
  frames: (HTMLImageElement | undefined)[];
}

function Corner({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-6 w-6 border-cyber/40 ${className}`}
      aria-hidden="true"
    />
  );
}

function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.28em] text-cyan-100/80 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-led-blink rounded-full"
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      aria-hidden="true"
    />
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollHUD({ frames }: ScrollHUDProps) {
  const progress = useMotionValue(0);
  const [activePhase, setActivePhase] = useState<Phase | null>(null);

  const refs = useRef<TelemetryRefs>({ frame: null, progress: null, sync: null });

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const doc = document.documentElement;
      const maxY = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = clamp(window.scrollY / maxY, 0, 1);

      progress.set(p);

      const index = clamp(
        Math.round(p * (FRAME_COUNT - 1)),
        0,
        FRAME_COUNT - 1
      );

      const phaseNow = activePhaseFor(p);
      setActivePhase((prev) => (prev === phaseNow ? prev : phaseNow));

      const r = refs.current;
      if (r.frame) r.frame.textContent = String(index + 1).padStart(3, "0");
      if (r.progress) r.progress.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
      if (r.sync) r.sync.textContent = frames[index] ? "STABLE" : "BUFFERING";

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [frames, progress]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 select-none" aria-hidden="true">
      {/* Panning grid */}
      <div
        className="absolute inset-0 animate-grid-pan opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scanline sweep */}
      <div className="animate-scanline absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber/50 to-transparent" />

      {/* Edge corners */}
      <Corner className="left-3 top-3 border-l border-t" />
      <Corner className="right-3 top-3 border-r border-t" />
      <Corner className="bottom-3 left-3 border-b border-l" />
      <Corner className="bottom-3 right-3 border-b border-r" />

      {/* Top-left status (desktop only — bottom telemetry covers mobile) */}
      <div className="absolute left-6 top-16 hidden max-w-[220px] flex-col gap-2 md:flex">
        <Chip>
          <StatusDot color="#00FF66" />
          STATUS: SYNAPSE LINKED
        </Chip>
        <Chip className="hidden sm:flex">
          <StatusDot color="#7000FF" />
          CORE: v4.20
        </Chip>
      </div>

      {/* Bottom-left telemetry */}
      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 grid grid-cols-[auto_auto] gap-x-5 gap-y-1 font-mono text-[9px] leading-relaxed tracking-[0.24em] text-cyan-100/60 sm:left-6 sm:gap-x-6 sm:text-[10px] sm:tracking-[0.28em]">
        <span className="text-cyber/50">FRAME</span>
        <span ref={(el) => { refs.current.frame = el; }}>000</span>
        <span className="text-cyber/50">SCRUB</span>
        <span ref={(el) => { refs.current.progress = el; }}>000%</span>
        <span className="text-cyber/50">LINK</span>
        <span ref={(el) => { refs.current.sync = el; }}>SYNCING</span>
      </div>

      {/* Right scrub rail (desktop only) */}
      <div className="absolute bottom-24 right-6 top-28 hidden flex-col items-center gap-3 sm:flex">
        <span className="font-mono text-[9px] tracking-[0.3em] text-cyber/50 [writing-mode:vertical-lr]">
          SCRUB PROGRESS
        </span>
        <div className="relative h-full w-px overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-matrix via-cyber to-neural"
            style={{ scaleY: progress }}
          />
        </div>
      </div>

      {/* Phase card (top-center) */}
      <div className="absolute left-1/2 top-[4.75rem] w-full max-w-xl -translate-x-1/2 px-4 sm:top-16">
        <AnimatePresence mode="wait">
          {activePhase ? (
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="w-full rounded-lg border border-white/10 bg-black/45 px-4 py-3.5 backdrop-blur-md sm:px-5 sm:py-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-cyber sm:text-[10px] sm:tracking-[0.4em]">
                    {activePhase.code}
                  </span>
                  <span className="h-px w-6 bg-cyber/40 sm:w-8" />
                </div>
                <div className="flex items-center gap-1.5">
                  {PHASES.map((ph) => (
                    <span
                      key={ph.id}
                      className={`h-1 w-4 rounded-full transition-colors duration-500 sm:w-5 ${
                        activePhase.id === ph.id ? "bg-cyber" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-base font-extrabold uppercase leading-tight tracking-tighter text-white sm:text-2xl">
                {activePhase.title}
              </h3>
              <p className="mt-1 hidden max-w-md font-mono text-[10px] leading-relaxed tracking-[0.2em] text-cyan-100/60 sm:block sm:text-[11px]">
                {activePhase.sub}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-3 sm:gap-2">
                {activePhase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-matrix/20 bg-matrix/5 px-2 py-1 font-mono text-[8px] tracking-[0.16em] text-matrix/80 sm:text-[9px] sm:tracking-[0.2em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="buffer-gap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[10px] tracking-[0.4em] text-cyber/40 animate-pulse-glow"
            >
              [ BUFFERING NEURAL STREAM ... ]
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}