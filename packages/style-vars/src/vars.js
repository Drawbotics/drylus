const { fade } = require('./colors');
const bindObject = require('./bind-object');
const { m, d, s, a } = require('./operations');


module.exports = bindObject({
  // COLORS
  white: '#fff',
  grey50: '#fafafa',
  grey100: '#f5f5f5',
  grey200: '#eeeeee',
  grey300: '#e0e0e0',
  grey400: '#bdbdbd',
  grey500: '#9e9e9e',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',

  brandDark: '#247488',
  brand: '#3DB5D0',
  brandLight: '#bee6ef',
  brandLighter: '#f1fbfc',

  neutralDarkest: '#172b4e',
  neutralDarker: '#425a70',
  neutralDark: '#879ba6',
  neutral: '#d3dce6',
  neutralLight: '#eaeff4',
  neutralLighter: '#f6f7fa',

  redDark: '#BF0E08',
  red: '#EC4C47',
  redLight: '#fae2e2',
  redLighter: '#fef6f6',
  danger: (v) => v.red,
  error: (v) => v.red,

  orangeDark: '#a16d22',
  orange: '#f8a00f',
  orangeLight: '#f9ebd6',
  orangeLighter: '#fff7eb',
  warning: (v) => v.orange,

  blueDark: '#2A41A2',
  blue: '#4673D1',
  blueLight: '#CFD8FF',
  blueLighter: '#E7EBFC',
  info: (v) => v.blue,

  greenDark: '#288A70',
  green: '#3FBC9B',
  greenLight: '#C1E8DE',
  greenLighter: '#E7F5F1',
  success: (v) => v.green,

  facebookColor: '#275a9b',
  twitterColor: '#00a2f5',
  linkedinColor: '#0077b5',

  lighterOverlay: (v) => fade(v.grey900, 5),
  lightOverlay: (v) => fade(v.grey900, 10),

  // BORDERS
  baseBorderRadius: '4px',
  defaultBorderRadius: (v) => v.baseBorderRadius,
  borderRadiusBig: (v) => m(v.baseBorderRadius, 1.5),

  // TYPOGRAPHY
  baseFontSize: '14px',
  defaultFontSize: (v) => v.baseFontSize,
  defaultFontFamily: '"Rubik", sans-serif',
  baseLineHeight: '1.2',
  defaultLineHeight: (v) => v.baseLineHeight,
  baseLetterSpacing: '0.04rem',
  defaultLetterSpacing: (v) => v.baseLetterSpacing,
  colorPrimary: (v) => v.neutralDarkest,
  colorPrimaryInverse: (v) => v.white,
  colorSecondary: (v) => v.neutralDark,
  colorSecondaryInverse: (v) => fade(v.white, 70),
  colorTertiary: (v) => fade(v.neutralDark, 70),
  colorTertiaryInverse: (v) => fade(v.white, 50),
  colorDisabled: (v) => fade(v.neutralDark, 50),
  colorDisabledInverse: (v) => fade(v.white, 30),

  // SHADOWS
  shadowColor: (v) => v.neutral,

  // ELEVATIONS
  elevation1: (v) => `0 4px 8px ${v.shadowColor}`,
  insetActive: (v) => `0 1px 6px ${v.neutralDarkest} inset`,
  insetActiveMedium: (v) => `0 1px 6px ${v.neutralDark} inset`,
  insetActiveLight: (v) => `0 1px 6px ${v.neutral} inset`,

  // PADDINGS AND MARGINS
  basePadding: '24px',
  defaultPadding: (v) => v.basePadding,
  paddingSmall: (v) => s(v.basePadding, 8),
  paddingExtraSmall: (v) => s(v.paddingSmall, 8),
  paddingLarge: (v) => a(v.basePadding, 8),
  paddingExtraLarge: (v) => a(v.paddingLarge, 8),
  paddingHuge: (v) => m(v.paddingExtraSmall, 7),
  baseMargin: '24px',
  defaultMargin: (v) => v.basePadding,
  marginSmall: (v) => s(v.baseMargin, 8),
  marginExtraSmall: (v) => s(v.marginSmall, 8),
  marginLarge: (v) => a(v.baseMargin, 8),
  marginExtraLarge: (v) => a(v.marginLarge, 8),
  marginHuge: (v) => m(v.marginExtraSmall, 7),

  // TRANSITIONS AND ANIMATIONS
  baseTransitionTime: '0.3s',
  defaultTransitionTime: (v) => v.baseTransitionTime,
  transitionTimeShort: (v) => d(v.baseTransitionTime, 2),
  bouncyTransitionCurve: 'cubic-bezier(0.44, 0.11, 0.07, 1.29)',
  defaultTransition: (v) => `all ${v.transitionTimeShort} ease-in-out`,

  // SIZES
  maxWidthLarge: '1200px',
  maxWidthMedium: '400px',

  // MEDIA QUERIES
  screenXs: 'only screen and (max-width: 320px)',
  screenS: 'only screen and (max-width: 375px)',
  screenM: 'only screen and (max-width: 425px)',
  screenL: 'only screen and (max-width: 768px)',
  screenXl: 'only screen and (max-width: 1024px)',
  phoneS: (v) => v.screenXs,
  phone: (v) => v.screenS,
  phoneXl: (v) => v.screenM,
  ipad: (v) => v.screenL,
  desktopS: (v) => v.screenXl,
  phoneSLandscape: (v) => v.ipad,
  phoneLandscape: (v) => v.ipad,
  phoneXlLandscape: (v) => v.ipad,
  ipadLandscape: (v) => v.desktopS,
  screenSOrM: '(max-width: 480px), (max-width: 768px)',
  greaterThanMaximumWidth: 'only screen and (min-width: 1200px)',
  greaterThanMinimumWidth: 'only screen and (min-width: 1024px)',
});
