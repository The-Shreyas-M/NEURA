export const FRAME_COUNT = 300;

export const FRAME_BASE_PATH = "/video_frames";

const pad = (index: number): string => String(index).padStart(3, "0");

export function frameUrl(index: number): string {
  return `${FRAME_BASE_PATH}/ezgif-frame-${pad(index + 1)}.jpg`;
}

export function buildFrameList(): { url: string; index: number }[] {
  return Array.from({ length: FRAME_COUNT }, (_, index) => ({
    url: frameUrl(index),
    index,
  }));
}