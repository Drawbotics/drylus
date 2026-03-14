const ScreenSizes = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
};

export function useScreenSize() {
  return { screenSize: ScreenSizes.L, ScreenSizes };
}

export function getScreenSize() {
  return ScreenSizes.L;
}
