"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import ScrollHUD from "@/components/ScrollHUD";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SequenceRunway from "@/components/SequenceRunway";
import SpecGrid from "@/components/SpecGrid";
import CTAFooter from "@/components/CTAFooter";
import { useFramePreloader } from "@/lib/useFramePreloader";

export default function Page() {
  const { frames, state } = useFramePreloader();

  const [bootCapped, setBootCapped] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setBootCapped(true), 700);
    return () => clearTimeout(id);
  }, []);

  const showPreloader = !state.ready && !bootCapped;

  return (
    <LenisProvider>
      {/* Fixed fullscreen frame sequence backdrop */}
      <BackgroundCanvas frames={frames} />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <SequenceRunway />
          <SpecGrid />
          <CTAFooter />
        </main>
      </div>

      <ScrollHUD frames={frames} />

      <AnimatePresence>
        {showPreloader && <Preloader state={state} />}
      </AnimatePresence>
    </LenisProvider>
  );
}