import sv from '@drawbotics/drylus-style-vars';
import { useSyncExternalStore } from 'react';

export const ScreenSizes = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
} as const;

const HUGE = 6;

function parseMaxWidth(mediaQuery: string): number {
  const match = mediaQuery.match(/max-width: (\d+)/);
  return match ? parseInt(match[1]) : 0;
}

const breakpoints = [
  parseMaxWidth(sv.screenXs),
  parseMaxWidth(sv.screenS),
  parseMaxWidth(sv.screenM),
  parseMaxWidth(sv.screenL),
  parseMaxWidth(sv.screenXl),
];

function getScreenSize(): number {
  const width = window.innerWidth;
  for (let i = 0; i < breakpoints.length; i++) {
    if (width <= breakpoints[i]) return i + 1;
  }
  // Return a stable constant for screens > XL.
  // The original @drawbotics/use-screen-size returns raw pixel width here,
  // which causes a re-render on every pixel of resize on desktop — a severe
  // performance issue when 8+ components subscribe simultaneously.
  return HUGE;
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

export function useScreenSize() {
  const size = useSyncExternalStore(subscribe, getScreenSize);
  return { screenSize: size, ScreenSizes };
}
