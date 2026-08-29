export default function SequenceRunway() {
  return (
    <section id="sequence" className="relative h-[180vh] sm:h-[220vh]">
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-sm border border-white/10 bg-black/30 px-4 py-2 font-mono text-[10px] tracking-[0.34em] text-cyber/70 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-led-blink rounded-full bg-cyber shadow-[0_0_8px_#00F0FF]" />
          NEURAL SEQUENCE // FINE-SCANNING ACTIVE
        </div>
      </div>
    </section>
  );
}