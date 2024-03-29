import { fade } from './colors';
import { add, divide, multiply, subtract } from './operations';

// COLORS
export const white = '#fff';
export const black = '#000';
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

export const orangeDark = '#a16d22';
export const orange = '#f8a00f';
export const orangeLight = '#f9ebd6';
export const orangeLighter = '#fff7eb';
export const warning = orange;

export const blueDark = '#2A41A2';
export const blue = '#3A78F2';
export const blueLight = '#CFD8FF';
export const blueLighter = '#E7EBFC';
export const info = blue;

export const greenDark = '#288A70';
export const green = '#3FBC9B';
export const greenLight = '#C1E8DE';
export const greenLighter = '#E7F5F1';
export const success = green;

export const pinkDark = '#852785';
export const pink = '#BB36BB';
export const pinkLight = '#EFDAEF';
export const pinkLighter = '#FEF3FE';

export const purpleDark = '#643790';
export const purple = '#8C46D1';
export const purpleLight = '#E1CEF5';
export const purpleLighter = '#F7F0FF';

export const violetDark = '#3B2F7D';
export const violet = '#5D4AC8';
export const violetLight = '#D4CFF3';
export const violetLighter = '#EFEDFF';

export const yellowDark = '#B49424';
export const yellow = '#FADB4A';
export const yellowLight = '#FFF0AB';
export const yellowLighter = '#FFF9DC';

export const lighterOverlay = fade(grey900, 5);
export const lightOverlay = fade(grey900, 10);
export const darkOverlay = fade(neutralDarker, 90);

// BORDERS
const baseBorderRadius = '4px';
export const defaultBorderRadius = baseBorderRadius;
export const borderRadiusLarge = multiply(baseBorderRadius, 2);
export const borderRadiusSmall = divide(baseBorderRadius, 2);

// TYPOGRAPHY
const baseFontSize = '14px';
export const defaultFontSize = baseFontSize;
export const defaultFontFamily = '"Rubik", sans-serif';
const baseLineHeight = '1.2';
export const defaultLineHeight = baseLineHeight;
const baseLetterSpacing = '0.04em';
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
export const elevation1 = `0 2px 10px ${fade(neutralDark, 10)}`;
export const elevation2 = `0 7px 14px ${fade(neutralDark, 20)}`;
export const elevation3 = `0 10px 17px ${shadowColor}`;
export const insetActive = `0 1px 6px ${neutralDarkest} inset`;
export const insetActiveMedium = `0 1px 6px ${neutralDark} inset`;
export const insetActiveLight = `0 1px 6px ${neutral} inset`;

// PADDINGS AND MARGINS
const basePadding = '24px';
export const defaultPadding = basePadding;
export const paddingSmall = subtract(basePadding, 8);
export const paddingExtraSmall = subtract(paddingSmall, 8);
export const paddingLarge = add(basePadding, 8);
export const paddingExtraLarge = add(paddingLarge, 8);
export const paddingHuge = multiply(paddingExtraSmall, 7);
export const paddingExtraHuge = multiply(basePadding, 3);
export const paddingMassive = multiply(basePadding, 5);
export const baseMargin = '24px';
export const defaultMargin = basePadding;
export const marginSmall = subtract(baseMargin, 8);
export const marginExtraSmall = subtract(marginSmall, 8);
export const marginLarge = add(baseMargin, 8);
export const marginExtraLarge = add(marginLarge, 8);
export const marginHuge = multiply(marginExtraSmall, 7);
export const marginExtraHuge = multiply(baseMargin, 3);
export const marginMassive = multiply(baseMargin, 5);

// TRANSITIONS AND ANIMATIONS
const baseTransitionTime = '0.3s';
export const defaultTransitionTime = baseTransitionTime;
export const transitionTimeShort = divide(baseTransitionTime, 2);
export const bouncyTransitionCurve = 'cubic-bezier(0.44, 0.11, 0.07, 1.29)';
export const defaultTransition = `all ${defaultTransitionTime} ease-in-out`;
export const transitionShort = `all ${transitionTimeShort} ease-in-out`;

// SIZES
export const maxWidthLarge = '1200px';
export const maxWidthMedium = '400px';

// MEDIA QUERIES
export const screenXs = 'only screen and (max-width: 320px)';
export const screenS = 'only screen and (max-width: 375px)';
export const screenM = 'only screen and (max-width: 425px)';
export const screenL = 'only screen and (max-width: 768px)';
export const screenXl = 'only screen and (max-width: 1024px)';
export const screenHuge = 'only screen and (min-width: 1024px)';

// To target specific screen ratios
export const phoneSLandscape = `${screenS} and (orientation: landscape)`;
export const phoneSPortrait = `${screenXs} and (orientation: portrait)`;

export const phoneLandscape = `${screenL} and (orientation: landscape)`;
export const phonePortrait = `${screenM} and (orientation: portrait)`;

export const tabletLandscape = `${screenXl} and (orientation: landscape)`;
export const tabletPortrait = `${screenL} and (orientation: portrait)`;

export const desktop = `${screenHuge} and (orientation: landscape)`;

export const greaterThanMaximumWidth = 'only screen and (min-width: 1200px)';
export const greaterThanMinimumWidth = 'only screen and (min-width: 1024px)';
