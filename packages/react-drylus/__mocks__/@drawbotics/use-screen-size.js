const ScreenSizes = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
};

function useScreenSize() {
  return { screenSize: ScreenSizes.L, ScreenSizes };
}

function getScreenSize() {
  return ScreenSizes.L;
}

module.exports = { useScreenSize, getScreenSize };
