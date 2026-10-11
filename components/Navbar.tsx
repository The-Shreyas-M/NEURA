"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "01 // SEQUENCE", href: "#sequence" },
  { label: "02 // SPECS", href: "#specs" },
  { label: "03 // RESERVE", href: "#reserve" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`pt-safe flex items-center justify-between border-b px-4 pb-3 font-mono text-[10px] tracking-[0.28em] transition-all duration-500 sm:px-8 ${
          scrolled || open
            ? "border-white/10 bg-void/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3">
          <span className="h-2 w-2 animate-led-blink rounded-full bg-cyber shadow-[0_0_10px_#00F0FF]" />
          <span className="font-semibold text-cyber">NEURA&nbsp;CORE</span>
          <span className="hidden text-cyan-100/40 sm:inline">v4.20</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-cyan-100/50 transition-colors hover:text-cyber"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#reserve"
            className="group hidden items-center gap-2 border border-cyber/40 bg-cyber/5 px-3 py-2 text-cyber transition-all hover:bg-cyber hover:text-black hover:shadow-[0_0_24px_rgba(0,240,255,0.5)] sm:flex"
          >
            <span>[ RESERVE CORE ]</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center border border-cyber/30 bg-cyber/5 text-cyber transition-colors active:bg-cyber/20 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pb-safe border-b border-white/10 bg-void/95 px-5 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: EASE }}
                  className="border-b border-white/5 last:border-none"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-mono text-xs tracking-[0.28em] text-cyan-100/70 active:text-cyber"
                  >
                    {item.label}
                    <span className="text-cyber/50">→</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              className="mt-5 mb-1 flex items-center justify-center gap-2 border border-cyber/40 bg-cyber/5 px-4 py-3.5 font-mono text-[11px] tracking-[0.3em] text-cyber active:bg-cyber active:text-black"
            >
              [ RESERVE CORE ] →
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}