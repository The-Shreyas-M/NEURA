"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "01 // SEQUENCE", href: "#sequence" },
  { label: "02 // SPECS", href: "#specs" },
  { label: "03 // RESERVE", href: "#reserve" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-3 font-mono text-[10px] tracking-[0.28em] transition-all duration-500 sm:px-8 ${
          scrolled
            ? "border-white/10 bg-void/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-3">
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

        <a
          href="#reserve"
          className="group flex items-center gap-2 border border-cyber/40 bg-cyber/5 px-3 py-2 text-cyber transition-all hover:bg-cyber hover:text-black hover:shadow-[0_0_24px_rgba(0,240,255,0.5)]"
        >
          <span>[ RESERVE CORE ]</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </motion.header>
  );
}