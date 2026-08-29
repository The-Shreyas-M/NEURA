"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const TERMINAL_LINES = [
  { k: "OPERATOR", v: "UNREGISTERED" },
  { k: "VESSEL", v: "NEURA CORE NC-SV1" },
  { k: "AUTH", v: "BIOMETRIC + PHAGE-CODE" },
  { k: "SHIPMENT", v: "T+72 HRS / Q3 2026" },
];

export default function CTAFooter() {
  const [reserved, setReserved] = useState(false);
  const reserveRef = useRef<HTMLAnchorElement>(null);

  return (
    <footer id="reserve" className="relative overflow-hidden px-6 pb-10 pt-28 sm:px-10 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber/40 to-transparent" />

      {/* Terminal grid floor */}
      <div
        className="pointer-events-none absolute inset-0 animate-grid-pan opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[720px] max-w-full -translate-x-1/2 translate-y-1/2 rounded-full bg-neural/[0.12] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14 text-center"
        >
          <div className="mb-4 font-mono text-[10px] tracking-[0.4em] text-cyber/70">
            [ TERMINAL // OPERATIONAL HANDOFF ]
          </div>
          <h2 className="font-display text-[11vw] font-extrabold uppercase leading-[0.9] tracking-tighter text-white sm:text-7xl lg:text-8xl">
            UPGRADE YOUR
            <br />
            <span className="bg-gradient-to-r from-matrix via-cyber to-neural bg-clip-text text-transparent">
              VESSEL
            </span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-[1fr_1.1fr]">
          {/* Terminal metadata card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-matrix shadow-[0_0_8px_#00FF66]" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.28em] text-cyan-100/50">
                neura://handshake
              </span>
            </div>
            <div className="divide-y divide-white/5 font-mono text-[10px] tracking-[0.22em]">
              {TERMINAL_LINES.map((line) => (
                <div key={line.k} className="flex justify-between px-4 py-3">
                  <span className="text-cyber/60">{line.k}</span>
                  <span className="text-cyan-100/70">{line.v}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3">
                <span className="text-cyber/60">STATUS</span>
                <span
                  className={reserved ? "text-matrix" : "text-cyan-100/70"}
                >
                  {reserved ? "RESERVED ✓" : "AWAITING INPUT"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Reserve CTA */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex flex-col items-center justify-center gap-8 rounded-lg border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md"
          >
            <p className="max-w-sm text-center font-sans text-sm leading-relaxed text-cyan-100/55">
              Field units are fabricated in single batches of 200. Confirming
              your reservation locks your vessel serial before general dispatch.
            </p>
            <a
              ref={reserveRef}
              href="#reserve"
              onClick={() => setReserved(true)}
              className={`relative w-full max-w-xs overflow-hidden rounded-md border px-8 py-4 text-center font-mono text-[12px] font-semibold tracking-[0.32em] transition-all duration-500 ${
                reserved
                  ? "border-matrix bg-matrix/10 text-matrix shadow-[0_0_36px_rgba(0,255,102,0.35)]"
                  : "border-cyber/50 bg-cyber/5 text-cyber hover:bg-cyber hover:text-black hover:shadow-[0_0_40px_rgba(0,240,255,0.55)]"
              }`}
            >
              {reserved ? "SERIAL LOCKED ✓" : "[ RESERVE NEURA CORE ]"}
            </a>
            <div className="font-mono text-[9px] tracking-[0.3em] text-white/30">
              NO DEPOSIT // CANCEL ANYTIME // JULIAN SERIAL NC-2026-###-###
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="relative mx-auto mt-20 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[9px] tracking-[0.28em] text-white/30 sm:flex-row sm:items-center">
        <span>© 2026 NEURA CORE INDUSTRIES // ALL RESERVED</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#top" className="transition-colors hover:text-cyber">EST. 2019</a>
          <a href="#top" className="transition-colors hover:text-cyber">PRIVACY</a>
          <a href="#top" className="transition-colors hover:text-cyber">ROBOTICS MANIFESTO</a>
        </div>
        <span className="text-cyber/50">SYS.STATUS: ONLINE</span>
      </div>
    </footer>
  );
}