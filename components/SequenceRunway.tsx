export default function SequenceRunway() {
  return (
    <section id="sequence" className="relative h-[160vh] sm:h-[220vh]">
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-4">
        <div className="flex max-w-[92vw] items-center gap-2.5 rounded-sm border border-white/10 bg-black/30 px-3 py-2 font-mono text-[8px] tracking-[0.18em] text-cyber/70 backdrop-blur-md sm:gap-3 sm:px-4 sm:text-[10px] sm:tracking-[0.34em]">
          <span className="h-1.5 w-1.5 shrink-0 animate-led-blink rounded-full bg-cyber shadow-[0_0_8px_#00F0FF]" />
          <span className="sm:hidden">NEURAL SEQ // SCANNING</span>
          <span className="hidden sm:inline">
            NEURAL SEQUENCE // FINE-SCANNING ACTIVE
          </span>
        </div>
      </div>
    </section>
  );
}