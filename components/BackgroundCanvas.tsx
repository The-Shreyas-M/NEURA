"use client";

import { useEffect, useRef } from "react";
import { FRAME_COUNT } from "@/lib/frames";

const VOID = "#030303";

type FrameBuffer = (HTMLImageElement | undefined)[];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function resolveFrame(
  index: number,
  frames: FrameBuffer
): HTMLImageElement | null {
  const direct = frames[index];
  if (direct) return direct;
  for (let i = index - 1; i >= 0; i--) {
    const f = frames[i];
    if (f) return f;
  }
  for (
    let i = index + 1;
    i < Math.min(index + 16, frames.length);
    i++
  ) {
    const f = frames[i];
    if (f) return f;
  }
  return null;
}

function containFit(
  cw: number,
  ch: number,
  imgW: number,
  imgH: number
): { x: number; y: number; w: number; h: number } | null {
  const scale = Math.min(1, cw / imgW, ch / imgH);
  if (!Number.isFinite(scale) || scale <= 0) return null;
  const w = imgW * scale;
  const h = imgH * scale;
  return { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
}

function coverRect(
  cw: number,
  ch: number,
  imgW: number,
  imgH: number
): { x: number; y: number; w: number; h: number } {
  const scale = Math.max(cw / imgW, ch / imgH);
  const w = imgW * scale;
  const h = imgH * scale;
  return { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
}

const BLUR_BACKDROP_WIDTH = 96;

interface BackgroundCanvasProps {
  frames: FrameBuffer;
  baseColor?: string;
}

export default function BackgroundCanvas({
  frames,
  baseColor = VOID,
}: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const backdrop = document.createElement("canvas");
    const bctx = backdrop.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;

      // Ignore mobile URL-bar show/hide (height-only small jitter) to avoid
      // reallocating the canvas backing store on every scroll.
      if (width && nextW === width && Math.abs(nextH - height) < 140) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = nextW;
      height = nextH;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      // A <canvas> is a replaced element: `inset-0` alone does NOT stretch it —
      // the browser falls back to its intrinsic (backing-store) size, which on
      // high-DPR phones is 2-3x the viewport, pushing the centered frame off the
      // right edge. Pin the CSS box 1:1 to the drawing coordinates.
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let rafId = 0;
    let lastKey = { index: -1, w: -1, h: -1 };

    const draw = () => {
      const doc = document.documentElement;
      const maxY = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = clamp(window.scrollY / maxY, 0, 1);
      const index = clamp(
        Math.round(p * (FRAME_COUNT - 1)),
        0,
        FRAME_COUNT - 1
      );

      if (
        lastKey.index === index &&
        lastKey.w === width &&
        lastKey.h === height
      ) {
        return;
      }

      const img = resolveFrame(index, frames);
      if (!img) return;

      lastKey = { index, w: width, h: height };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 1) Liquid-glass backdrop: full-bleed blurred extension of the frame
      const bw = BLUR_BACKDROP_WIDTH;
      const bh = Math.max(2, Math.round(bw * (height / width)));
      backdrop.width = Math.max(2, bw);
      backdrop.height = bh;
      if (bctx) {
        const base = coverRect(bw, bh, img.width, img.height);
        bctx.drawImage(img, base.x, base.y, base.w, base.h);
        ctx.drawImage(backdrop, 0, 0, width, height);
        ctx.fillStyle = "rgba(3,3,3,0.28)";
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = baseColor;
        ctx.fillRect(0, 0, width, height);
      }

      // 2) Crisp native-resolution frame, perfectly centered
      const crisp = containFit(width, height, img.width, img.height);
      if (crisp) {
        ctx.drawImage(img, crisp.x, crisp.y, crisp.w, crisp.h);

        // Glass rim edge
        ctx.strokeStyle = "rgba(0,240,255,0.14)";
        ctx.lineWidth = 1;
        ctx.strokeRect(crisp.x + 0.5, crisp.y + 0.5, crisp.w - 1, crisp.h - 1);

        // Soft glass reflection sheen on the crisp panel
        const sheen = ctx.createLinearGradient(0, crisp.y, 0, crisp.y + crisp.h);
        sheen.addColorStop(0, "rgba(255,255,255,0.06)");
        sheen.addColorStop(0.14, "rgba(255,255,255,0.015)");
        sheen.addColorStop(0.5, "rgba(255,255,255,0)");
        sheen.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = sheen;
        ctx.fillRect(crisp.x, crisp.y, crisp.w, crisp.h);
      }
    };

    const loop = () => {
      draw();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    const onScroll = () => draw();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames, baseColor]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 50% 45%, transparent 58%, ${baseColor}26 82%, ${baseColor}52 100%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `linear-gradient(to bottom, ${baseColor}a6 0%, ${baseColor}1a 18%, ${baseColor}1a 82%, ${baseColor}a6 100%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}