const { fade } = require('./colors');
const bindObject = require('./bind-object');
const { m, d } = require('./operations');


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

  primaryDark: '#247488',
  primary: '#3DB5D0',
  primaryLight: '#bee6ef',
  primaryLighter: '#f1fbfc',

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

  orangeDark: '#a16d22',
  orange: '#f8a00f',
  orangeLight: '#f9ebd6',
  orangeLighter: '#fff7eb',

  blueDark: '#2A41A2',
  blue: '#4673D1',
  blueLight: '#CFD8FF',
  blueLighter: '#E7EBFC',

  greenDark: '#288A70',
  green: '#3FBC9B',
  greenLight: '#C1E8DE',
  greenLighter: '#E7F5F1',

  facebookColor: '#275a9b',
  twitterColor: '#00a2f5',
  linkedinColor: '#0077b5',

  lighterOverlay: (s) => fade(s.grey900, 5),
  lightOverlay: (s) => fade(s.grey900, 10),

  // BORDERS
  baseBorderRadius: '4px',
  baseBorderRadiusBig: (s) => m(s.baseBorderRadius, 1.5),

  // TYPOGRAPHY
  baseFontSize: '14px',
  baseFontFamily: '"Rubik", sans-serif',
  baseLineHeight: '1.2',
  baseLetterSpacing: '0.04rem',
  textPrimaryDark: (s) => s.neutralDarkest,
  textPrimaryWhite: (s) => s.white,
  textSecondaryDark: (s) => s.neutralDark,
  textTertiaryDark: (s) => fade(s.neutralDark, 70),
  textDisabledDark: (s) => fade(s.neutralDark, 50),

  // SHADOWS
  shadowColor: (s) => s.neutral,

  // ELEVATIONS
  elevation1: (s) => `0 4px 8px ${s.shadowColor}`,
  insetActive: (s) => `0 1px 6px ${s.neutralDarkest} inset`,
  insetActiveMedium: (s) => `0 1px 6px ${s.neutralDark} inset`,
  insetActiveLight: (s) => `0 1px 6px ${s.neutral} inset`,

  // PADDINGS AND MARGINS
  basePadding: '20px',
  basePaddingSmall: (s) => d(s.basePadding, 2),
  basePaddingLarge: (s) => m(s.basePadding, 1.5),
  baseMargin: (s) => s.basePadding,
  baseMarginSmall: (s) => d(s.baseMargin, 2),
  baseMarginLarge: (s) => m(s.baseMargin, 1.5),

  // TRANSITIONS AND ANIMATIONS
  baseTransitionTime: '0.3s',
  baseTransitionTimeShort: (s) => d(s.baseTransitionTime, 2),
  bouncyTransitionCurve: 'cubic-bezier(0.44, 0.11, 0.07, 1.29)',
  baseTransition: (s) => `all ${s.baseTransitionTimeShort} ease-in-out`,

  // SIZES
  maxWidthLarge: '1200px',
  maxWidthMedium: '400px',


  // MEDIA QUERIES
  screenXs: 'only screen and (max-width: 320px)',
  screenS: 'only screen and (max-width: 375px)',
  screenM: 'only screen and (max-width: 425px)',
  screenL: 'only screen and (max-width: 768px)',
  screenXl: 'only screen and (max-width: 1024px)',
  phoneS: (s) => s.screenXs,
  phone: (s) => s.screenS,
  phoneXl: (s) => s.screenM,
  ipad: (s) => s.screenL,
  desktopS: (s) => s.screenXl,
  phoneSLandscape: (s) => s.ipad,
  phoneLandscape: (s) => s.ipad,
  phoneXlLandscape: (s) => s.ipad,
  ipadLandscape: (s) => s.desktopS,
  screenSOrM: '(max-width: 480px), (max-width: 768px)',
  greaterThanMaximumWidth: 'only screen and (min-width: 1200px)',
  greaterThanMinimumWidth: 'only screen and (min-width: 1024px)',
});
