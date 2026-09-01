# NEURA CORE

A cinematic, futuristic scrollytelling website — a glowing cybernetic interface that scrubs a 300-frame 4K sequence behind the entire page as you scroll. Built as a reference for "how does an award-style animated landing page actually work? — this one."

**Live demo → [https://the-shreyas-m.github.io/NEURA/](https://the-shreyas-m.github.io/NEURA/)**

---

## What it does

- **Fullscreen scrollytelling**: a 300-frame sequence plays behind everything, mapped 1:1 to page scroll progress — the whole page is the timeline.
- **Liquid-glass backdrop**: the crisp video sits dead-center at native resolution while both sides extend the same frames as a soft, blurred "liquid glass" reflection — no more black bars on wide screens.
- **Buttery scroll**: Lenis smoothing with a long glide on wheel, native momentum on touch.
- **Terminal HUD**: live phase tracker, telemetry readouts, scrub rail and scanline overlays that react to scroll — sits above the video, never over the content.
- **Instant boot**: the page unlocks the moment the first frame arrives (or a hard 700ms cap), remaining frames stream in the background.
- **Zero console errors**: inline SVG favicon, self-hosted fonts.

## Stack

- Next.js 14 (`output: "export"` → static site) + React 18 + TypeScript
- Tailwind CSS 3
- Framer Motion (micro-interactions)
- Lenis (smooth scrolling)
- Canvas 2D (DPR-aware frame rendering)

## Run locally

```bash
npm install
npm run dev
```

Static production build:

```bash
npm run build   # exports to ./out
```

## Deploy to GitHub Pages

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the static export and publishes it.

The site lives under the repository subpath, so the build is fed the base path via env (keeps local dev at `/` untouched):

```bash
NEXT_PUBLIC_BASE_PATH=/NEURA npm run build
```

## Project structure

```
app/                  # layout, metadata, hero + sections, preloader
components/           # BackgroundCanvas, ScrollHUD, LenisProvider, runway, sections
lib/                  # frame list/loader, phases, streaming preloader
public/video_frames/  # served 300-frame sequence
.github/workflows/    # Pages deploy pipeline
```

## Extending it

- Swap in your own sequence: drop `ezgif-frame-001.jpg … 300` into `public/video_frames/` and keep the count in `lib/frames.ts` ($FRAME_COUNT).
- Adjust scroll weight/feel in `components/LenisProvider.tsx`.
- Tune the phase boundaries in `lib/phases.ts`.