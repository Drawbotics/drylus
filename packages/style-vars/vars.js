// -------------------
// VARS JS
//
// Variables File
// -------------------


module.exports = {
  // COLORS
  white: #fff,
  grey50: #fafafa,
  grey100: #f5f5f5,
  grey200: #eeeeee,
  grey300: #e0e0e0,
  grey400: #bdbdbd,
  grey500: #9e9e9e,
  grey600: #757575,
  grey700: #616161,
  grey800: #424242,
  grey900: #212121,

  brandPrimary: #2cb7c6,
  brandYellow: #ffaf3a,
  brandRed: #db4c60,
  brandGreen: #48b762,
  brandBlue: #42a5f5,
  brandOrange: #ff6d2f,

  lightBrandPrimary: #e7f2f4,
  lightBrandYellow: lighten(@brandYellow, 27%),
  lightBrandRed: lighten(@brandRed, 21%),
  lightBrandGreen: lighten(@brandGreen, 27%),
  lightBrandBlue: lighten(@brandBlue, 25%),
  lightBrandOrange: lighten(@brandOrange, 21%),

  backgroundAlt: #fafafa,

  facebookColor: #275a9b,
  twitterColor: #00a2f5,
  mailColor: #3e8ee7,
  linkedinColor: #0077b5,

  lighter-overlay: fade(@grey-900, 5%),
  light-overlay: fade(@grey-900, 10%),

  // BORDERS
  baseBorderRadius: 3px,
  baseBorderRadiusBig: (@baseBorderRadius * 1.5),

  // TYPOGRAPHY
  baseFontSize: 15px,
  baseFontFamily: "Open Sans", sansSerif,
  baseFontFamilyAlt: "brandonGrotesque", sansSerif,
  baseLineHeight: 1.5,
  textPrimaryDark: @grey700,
  textSecondaryDark: fade(@textPrimaryDark, 60%),
  textTertiaryDark: fade(@textPrimaryDark, 38%),
  textDisabledDark: fade(@textPrimaryDark, 20%),
  textPrimaryWhite: @white,
  textSecondaryDark: fade(@textPrimaryDark, 70%),
  textTertiaryDark: fade(@textPrimaryDark, 50%),
  textDisabledDark: fade(@textPrimaryDark, 35%),

  // SHADOWS
  shadowPenumbraColor: rgba(0, 0, 0, 0.14),
  shadowUmbraColor: rgba(0, 0, 0, 0.2),
  shadowAmbientColor: rgba(0, 0, 0, 0.12),

  // ELEVATIONS
  elevationMinus2: 0 2px 2px 0 @shadow-penumbra-color inset,
                   0 3px 1px -2px @shadow-umbra-color inset,
                   0 1px 5px 0 @shadow-ambient-color inset,
  elevationMinus1: 0 1px 2px @shadow-penumbra-color inset,
                   0 2px 3px -2px @shadow-umbra-color inset,
                   0 0 5px 0 @shadow-ambient-color inset,
  elevation0: none,
  elevation1: 0 1px 2px @shadow-penumbra-color,
              0 2px 3px -2px @shadow-umbra-color,
              0 0 5px 0 @shadow-ambient-color,
  elevation2: 0 2px 2px 0 @shadow-penumbra-color,
              0 3px 3px -2px @shadow-umbra-color,
              0 1px 5px 0 @shadow-ambient-color,
  elevation2: 0 2px 2px 0 @shadow-penumbra-color,
              0 3px 1px -2px @shadow-umbra-color,
              0 1px 5px 0 @shadow-ambient-color,
  elevation3: 0 3px 4px 0 @shadow-penumbra-color,
              0 3px 3px -2px @shadow-umbra-color,
              0 1px 8px 0 @shadow-ambient-color,
  elevation4: 0 4px 5px 0 @shadow-penumbra-color,
              0 1px 10px 0 @shadow-umbra-color,
              0 2px 4px -1px @shadow-ambient-color,
  elevation5: 0 6px 10px 0 @shadow-penumbra-color,
              0 3px 5px -1px @shadow-umbra-color,
              0 1px 18px 0 @shadow-ambient-color,
  elevation6: 0 8px 10px 1px @shadow-penumbra-color,
              0 5px 5px -3px @shadow-umbra-color,
              0 3px 14px 2px @shadow-ambient-color,
  elevation7: 0 16px 24px 2px @shadow-penumbra-color,
              0  8px 10px -5px @shadow-umbra-color,
              0  6px 30px 5px @shadow-ambient-color,
  elevation8: 0  9px 46px  8px @shadow-penumbra-color,
              0 24px 38px  3px @shadow-umbra-color,
              0 11px 15px -7px @shadow-ambient-color,

  // PADDINGS AND MARGINS
  basePadding: 30px,
  basePaddingSmall: (@basePadding / 2),
  baseMargin: 30px,

  // TRANSITIONS AND ANIMATIONS
  baseTransitionTime: 0.3s,
  baseTransitionTimeShort: (@base-transition-time / 2),

  // SIZES
  maxWidth: 1200px,

  // MEDIA QUERIES
  screenXs: ~'only screen and (max-width: 320px)',
  screenS: ~'only screen and (max-width: 375px)',
  screenM: ~'only screen and (max-width: 425px)',
  screenL: ~'only screen and (max-width: 768px)',
  screenXl: ~'only screen and (max-width: 1024px)',
  phoneS: @screen-xs,
  phone: @screen-s,
  phoneXl: @screen-m,
  ipad: @screen-l,
  desktopS: @screen-xl,
  phoneSLandscape: @ipad,
  phoneLandscape: @ipad,
  phoneXlLandscape: @ipad,
  ipadLandscape: @desktop-s,
  screenSOrM: ~'(max-width: 480px), (max-width: 768px)',
  greaterThanMaximumWidth: ~'only screen and (min-width: 1200px)',
  greaterThanMinimumWidth: ~'only screen and (min-width: 1024px)',

  // LEGACY MEDIA QUERIES
  screenXs_legacy: ~'only screen and (max-width: 320px)',
  screenS_legacy: ~'only screen and (max-width: 480px)',
  screenM_legacy: ~'only screen and (max-width: 768px)',
  screenL_legacy: ~'only screen and (max-width: 992px)',
  screenXl_legacy: ~'only screen and (max-width: 1200px)',
  screenSOrM_legacy: ~'(max-width: 480px), (max-width: 768px)',
  greaterThanMaximumWidth_legacy: ~'only screen and (min-width: 1200px)',
  greaterThanMinimumWidth_legacy: ~'only screen and (min-width: 1000px)',
};
