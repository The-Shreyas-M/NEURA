import { useEffect, useRef, useState } from "react";
import { FRAME_COUNT, buildFrameList } from "@/lib/frames";

export const CONCURRENCY = 6;

export interface PreloadState {
  loaded: number;
  total: number;
  progress: number;
  ready: boolean;
}

export interface UseFramePreloaderReturn {
  frames: (HTMLImageElement | undefined)[];
  state: PreloadState;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${url}`));
    img.src = url;
  });
}

export function useFramePreloader(): UseFramePreloaderReturn {
  const frameList = useRef<{ url: string; index: number }[]>(null!);
  if (!frameList.current) frameList.current = buildFrameList();

  const slots = useRef<(HTMLImageElement | undefined)[]>(
    new Array(FRAME_COUNT).fill(undefined)
  );

  const [state, setState] = useState<PreloadState>({
    loaded: 0,
    total: FRAME_COUNT,
    progress: 0,
    ready: false,
  });

  useEffect(() => {
    const total = slots.current.length;
    let cursor = 0;
    let loaded = 0;
    let disposed = false;

    const update = () => {
      const ready = Boolean(slots.current[0]);
      const progress = Math.min(100, Math.round((loaded / total) * 100));
      setState((prev) =>
        prev.progress === progress && prev.ready === ready
          ? prev
          : { loaded, total, progress, ready }
      );
    };

    const pump = () => {
      while (cursor < total && cursor - loaded < CONCURRENCY) {
        const slot = cursor;
        cursor += 1;
        loadImage(frameList.current[slot].url)
          .then((img) => {
            if (disposed) return;
            slots.current[slot] = img;
            loaded += 1;
            update();
            pump();
          })
          .catch(() => {
            if (disposed) return;
            loaded += 1;
            update();
            pump();
          });
      }
    };

    const id = requestAnimationFrame(() => pump());
    return () => {
      disposed = true;
      cancelAnimationFrame(id);
    };
  }, []);

  return { frames: slots.current, state };
}