export interface Phase {
  id: string;
  code: string;
  title: string;
  sub: string;
  tags: string[];
  start: number;
  end: number;
}

export const PHASES: Phase[] = [
  {
    id: "phase-01",
    code: "PHASE 01",
    title: "CRANIAL INTERFACE ASSEMBLY",
    sub: "Lattice bonding micro-servos onto the cortical carrier substrate.",
    tags: ["SERVO CAL. 0.0029°", "SURFACE: BIOLATTICE", "TORQUE: 5.4 N·m"],
    start: 0,
    end: 25,
  },
  {
    id: "phase-02",
    code: "PHASE 02",
    title: "QUANTUM SYNAPSE CO-PROCESSOR",
    sub: "Exploded micro-architecture exposed. Entanglement lattice online.",
    tags: ["QUBITS: 2,048", "COHERENCE: 99.97%", "CLOCK: 4.20 GHz"],
    start: 30,
    end: 60,
  },
  {
    id: "phase-03",
    code: "PHASE 03",
    title: "TITANIUM-CARBON BIO-LATTICE",
    sub: "CnC-milled exoskeleton weaving the load-bearing neural conduit.",
    tags: ["TENSILE: 240 GPa", "DENSITY: 1.9 g/cm³", "KINETIC SHIELD: ON"],
    start: 65,
    end: 85,
  },
  {
    id: "phase-04",
    code: "PHASE 04",
    title: "FULL NEURAL MATRIX SYNCHRONIZED",
    sub: "All 128 TB/s channels hot. Vessel integrity 99.98%. Awaiting operator.",
    tags: ["LINK SYNC: STABLE", "ENCRYPTION: AES-4096", "VESSEL: NEURA CORE"],
    start: 90,
    end: 100,
  },
];

export function activePhaseFor(progress: number): Phase | null {
  const percent = progress * 100;
  return (
    PHASES.find((p) => percent >= p.start && percent <= p.end) ?? null
  );
}