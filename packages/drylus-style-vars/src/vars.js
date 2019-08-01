const { fade } = require('./colors');
const { m, d, s, a } = require('./operations');


// COLORS
export const white = '#fff';
export const grey50 = '#fafafa';
export const grey100 = '#f5f5f5';
export const grey200 = '#eeeeee';
export const grey300 = '#e0e0e0';
export const grey400 = '#bdbdbd';
export const grey500 = '#9e9e9e';
export const grey600 = '#757575';
export const grey700 = '#616161';
export const grey800 = '#424242';
export const grey900 = '#212121';

export const brandDark = '#247488';
export const brand = '#3DB5D0';
export const brandLight = '#bee6ef';
export const brandLighter = '#f1fbfc';

export const neutralDarkest = '#172b4e';
export const neutralDarker = '#425a70';
export const neutralDark = '#879ba6';
export const neutral = '#d3dce6';
export const neutralLight = '#eaeff4';
export const neutralLighter = '#f8f9fa';
export const backgroundColor = '#F1F5F9';

export const azureDark = '#C2CDF4';
export const azure = '#E0E7FF';
export const azureLight = '#F9FAFF';

export const redDark = '#BF0E08';
export const red = '#EC4C47';
export const redLight = '#F8C8C8';
export const redLighter = '#fae2e2';
export const danger = red;
export const error = red;

export const orangeDark = '#a16d22';
export const orange = '#f8a00f';
export const orangeLight = '#f9ebd6';
export const orangeLighter = '#fff7eb';
export const warning = orange;

export const blueDark = '#2A41A2';
export const blue = '#4673D1';
export const blueLight = '#CFD8FF';
export const blueLighter = '#E7EBFC';
export const info = blue;

export const greenDark = '#288A70';
export const green = '#3FBC9B';
export const greenLight = '#C1E8DE';
export const greenLighter = '#E7F5F1';
export const success = green;

export const facebookColor = '#275a9b';
export const twitterColor = '#00a2f5';
export const linkedinColor = '#0077b5';

export const lighterOverlay = fade(grey900, 5);
export const lightOverlay = fade(grey900, 10);
export const darkOverlay = fade(neutralDarker, 90);

// BORDERS
const baseBorderRadius = '5px';
export const defaultBorderRadius = baseBorderRadius;
export const borderRadiusLarge = m(baseBorderRadius, 1.5);
export const borderRadiusSmall = d(baseBorderRadius, 1.5);

// TYPOGRAPHY
const baseFontSize = '14px';
export const defaultFontSize = baseFontSize;
export const defaultFontFamily = '"Rubik", sans-serif';
const baseLineHeight = '1.2';
export const defaultLineHeight = baseLineHeight;
const baseLetterSpacing = '0.04rem';
export const defaultLetterSpacing = baseLetterSpacing;
export const colorPrimary = neutralDarkest;
export const colorPrimaryInverse = white;
export const colorSecondary = neutralDark;
export const colorSecondaryInverse = fade(white, 70);
export const colorTertiary = fade(neutralDark, 70);
export const colorTertiaryInverse = fade(white, 50);
export const colorDisabled = fade(neutralDark, 50);
export const colorDisabledInverse = fade(white, 30);

// SHADOWS
export const shadowColor = fade(neutralDark, 30);

// ELEVATIONS
export const elevation1 = `0 4px 8px ${shadowColor}`;
export const elevation2 = `0 7px 14px ${shadowColor}`;
export const elevation3 = `0 10px 17px ${shadowColor}`;
export const insetActive =`0 1px 6px ${neutralDarkest} inset`;
export const insetActiveMedium = `0 1px 6px ${neutralDark} inset`;
export const insetActiveLight = `0 1px 6px ${neutral} inset`;

// PADDINGS AND MARGINS
const basePadding = '24px';
export const defaultPadding = basePadding;
export const paddingSmall = s(basePadding, 8);
export const paddingExtraSmall = s(paddingSmall, 8);
export const paddingLarge = a(basePadding, 8);
export const paddingExtraLarge = a(paddingLarge, 8);
export const paddingHuge = m(paddingExtraSmall, 7);
export const baseMargin = '24px';
export const defaultMargin = basePadding;
export const marginSmall = s(baseMargin, 8);
export const marginExtraSmall = s(marginSmall, 8);
export const marginLarge = a(baseMargin, 8);
export const marginExtraLarge = a(marginLarge, 8);
export const marginHuge = m(marginExtraSmall, 7);

// TRANSITIONS AND ANIMATIONS
const baseTransitionTime = '0.3s';
export const defaultTransitionTime = baseTransitionTime;
export const transitionTimeShort = d(baseTransitionTime, 2);
export const bouncyTransitionCurve = 'cubic-bezier(0.44, 0.11, 0.07, 1.29)';
export const defaultTransition = `all ${transitionTimeShort} ease-in-out`;

// SIZES
export const maxWidthLarge = '1200px';
export const maxWidthMedium = '400px';

// MEDIA QUERIES
export const screenXs = 'only screen and (max-width: 320px)';
export const screenS = 'only screen and (max-width: 375px)';
export const screenM = 'only screen and (max-width: 425px)';
export const screenL = 'only screen and (max-width: 768px)';
export const screenXl = 'only screen and (max-width: 1024px)';
export const phoneS = screenXs;
export const phone = screenS;
export const phoneXl = screenM;
export const ipad = screenL;
export const desktopS = screenXl;
export const phoneSLandscape = ipad;
export const phoneLandscape = ipad;
export const phoneXlLandscape = ipad;
export const ipadLandscape = desktopS;
export const screenSOrM = '(max-width: 480px), (max-width: 768px)';
export const greaterThanMaximumWidth = 'only screen and (min-width: 1200px)';
export const greaterThanMinimumWidth = 'only screen and (min-width: 1024px)';
