"use client";

import { motion } from "framer-motion";

interface Spec {
  code: string;
  label: string;
  value: string;
  unit: string;
  desc: string;
  accent: string;
  span: string;
}

const SPECS: Spec[] = [
  {
    code: "SYS-01",
    label: "NEURAL BANDWIDTH",
    value: "128",
    unit: "TB/s",
    desc: "Optical synapse array sustaining lossless bidirectional head-to-host transfer.",
    accent: "#00F0FF",
    span: "md:col-span-2",
  },
  {
    code: "SYS-02",
    label: "BIOCOMPATIBILITY",
    value: "99.98",
    unit: "RATE",
    desc: "Bio-lattice inertness rating across simulated tissue gradients.",
    accent: "#00FF66",
    span: "",
  },
  {
    code: "SYS-03",
    label: "RESPONSE LATENCY",
    value: "<0.1",
    unit: "ms",
    desc: "End-to-end signal travel from dendrite cortex to neural matrix.",
    accent: "#7000FF",
    span: "",
  },
  {
    code: "SYS-04",
    label: "TELEMETRY PACKETS",
    value: "9.6",
    unit: "M/s",
    desc: "Continuous vitals stream decoded by the on-board quantum co-processor.",
    accent: "#00F0FF",
    span: "",
  },
  {
    code: "SYS-05",
    label: "ENERGY SUSTAIN",
    value: "≈72",
    unit: "hrs",
    desc: "Cold-melt crystalline cell. Zero maintenance interval incepted.",
    accent: "#00FF66",
    span: "md:col-span-2",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SpecGrid() {
  return (
    <section id="specs" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-matrix">
              <span className="h-1.5 w-1.5 animate-led-blink rounded-full bg-matrix shadow-[0_0_8px_#00FF66]" />
              SPECIFICATION // VESSEL CORE
            </div>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tighter text-white sm:text-6xl">
              ENGINEERED TO
              <span className="text-cyber"> EXCEED</span>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-cyan-100/50">
            Bench-marked against a thousand synthetic operators. Every figure
            below verified under full-sensory load, not lab conditions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SPECS.map((spec, i) => (
            <motion.article
              key={spec.code}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              style={{ borderColor: `${spec.accent}22` }}
              className={`group relative overflow-hidden rounded-lg border bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.05] ${spec.span}`}
            >
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                style={{ backgroundColor: spec.accent }}
                aria-hidden="true"
              />
              <div className="mb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-white/35">
                <span>{spec.code}</span>
                <span className="h-px flex-1 mx-3 bg-white/10" />
                <span style={{ color: spec.accent }}>●</span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.28em] text-white/45">
                {spec.label}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="font-display text-5xl font-extrabold tracking-tighter text-white tabular-nums sm:text-6xl"
                >
                  {spec.value}
                </span>
                <span
                  className="font-mono text-[11px] tracking-[0.2em]"
                  style={{ color: spec.accent }}
                >
                  {spec.unit}
                </span>
              </div>
              <p className="mt-4 font-sans text-xs leading-relaxed text-cyan-100/50">
                {spec.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}