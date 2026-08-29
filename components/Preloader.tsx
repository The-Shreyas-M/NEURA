"use client";

import { motion } from "framer-motion";
import type { PreloadState } from "@/lib/useFramePreloader";

interface PreloaderProps {
  state: PreloadState;
}

export default function Preloader({ state }: PreloaderProps) {

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      exit={{ opacity: 0, filter: "blur(6px)", scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 px-6">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-cyber/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyber shadow-[0_0_12px_#00F0FF]" />
          </motion.div>
          <motion.div
            className="absolute inset-3 rounded-full border border-neural/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neural shadow-[0_0_12px_#7000FF]" />
          </motion.div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-cyber">
            NC
          </div>
        </div>

        <div className="text-center font-mono text-[11px] tracking-[0.4em] text-cyan-100/70">
          [ INITIALIZING NEURA SYNTHESIS ... ]
        </div>

        <div className="h-px w-64 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-matrix via-cyber to-neural"
            animate={{ width: `${state.progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>

        <div className="flex w-64 items-center justify-between font-mono text-[10px] tracking-[0.3em] text-cyan-100/50">
          <span className="text-cyber tabular-nums">
            {state.progress}%
          </span>
          <span>
            FRAME {String(Math.min(state.loaded + 1, state.total)).padStart(3, "0")}/
            {String(state.total).padStart(3, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}