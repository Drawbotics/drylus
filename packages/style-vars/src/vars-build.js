"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.phone = exports.phoneS = exports.screenXl = exports.screenL = exports.screenM = exports.screenS = exports.screenXs = exports.maxWidthMedium = exports.maxWidthLarge = exports.defaultTransition = exports.bouncyTransitionCurve = exports.transitionTimeShort = exports.defaultTransitionTime = exports.marginHuge = exports.marginExtraLarge = exports.marginLarge = exports.marginExtraSmall = exports.marginSmall = exports.defaultMargin = exports.baseMargin = exports.paddingHuge = exports.paddingExtraLarge = exports.paddingLarge = exports.paddingExtraSmall = exports.paddingSmall = exports.defaultPadding = exports.insetActiveLight = exports.insetActiveMedium = exports.insetActive = exports.elevation3 = exports.elevation2 = exports.elevation1 = exports.shadowColor = exports.colorDisabledInverse = exports.colorDisabled = exports.colorTertiaryInverse = exports.colorTertiary = exports.colorSecondaryInverse = exports.colorSecondary = exports.colorPrimaryInverse = exports.colorPrimary = exports.defaultLetterSpacing = exports.defaultLineHeight = exports.defaultFontFamily = exports.defaultFontSize = exports.borderRadiusSmall = exports.borderRadiusBig = exports.defaultBorderRadius = exports.darkOverlay = exports.lightOverlay = exports.lighterOverlay = exports.linkedinColor = exports.twitterColor = exports.facebookColor = exports.success = exports.greenLighter = exports.greenLight = exports.green = exports.greenDark = exports.info = exports.blueLighter = exports.blueLight = exports.blue = exports.blueDark = exports.warning = exports.orangeLighter = exports.orangeLight = exports.orange = exports.orangeDark = exports.error = exports.danger = exports.redLighter = exports.redLight = exports.red = exports.redDark = exports.azureLight = exports.azure = exports.azureDark = exports.backgroundColor = exports.neutralLighter = exports.neutralLight = exports.neutral = exports.neutralDark = exports.neutralDarker = exports.neutralDarkest = exports.brandLighter = exports.brandLight = exports.brand = exports.brandDark = exports.grey900 = exports.grey800 = exports.grey700 = exports.grey600 = exports.grey500 = exports.grey400 = exports.grey300 = exports.grey200 = exports.grey100 = exports.grey50 = exports.white = void 0;
exports.greaterThanMinimumWidth = exports.greaterThanMaximumWidth = exports.screenSOrM = exports.ipadLandscape = exports.phoneXlLandscape = exports.phoneLandscape = exports.phoneSLandscape = exports.desktopS = exports.ipad = exports.phoneXl = void 0;

const {
  fade
} = require('./colors');

const {
  m,
  d,
  s,
  a
} = require('./operations'); // COLORS


const white = '#fff';
exports.white = white;
const grey50 = '#fafafa';
exports.grey50 = grey50;
const grey100 = '#f5f5f5';
exports.grey100 = grey100;
const grey200 = '#eeeeee';
exports.grey200 = grey200;
const grey300 = '#e0e0e0';
exports.grey300 = grey300;
const grey400 = '#bdbdbd';
exports.grey400 = grey400;
const grey500 = '#9e9e9e';
exports.grey500 = grey500;
const grey600 = '#757575';
exports.grey600 = grey600;
const grey700 = '#616161';
exports.grey700 = grey700;
const grey800 = '#424242';
exports.grey800 = grey800;
const grey900 = '#212121';
exports.grey900 = grey900;
const brandDark = '#247488';
exports.brandDark = brandDark;
const brand = '#3DB5D0';
exports.brand = brand;
const brandLight = '#bee6ef';
exports.brandLight = brandLight;
const brandLighter = '#f1fbfc';
exports.brandLighter = brandLighter;
const neutralDarkest = '#172b4e';
exports.neutralDarkest = neutralDarkest;
const neutralDarker = '#425a70';
exports.neutralDarker = neutralDarker;
const neutralDark = '#879ba6';
exports.neutralDark = neutralDark;
const neutral = '#d3dce6';
exports.neutral = neutral;
const neutralLight = '#eaeff4';
exports.neutralLight = neutralLight;
const neutralLighter = '#f8f9fa';
exports.neutralLighter = neutralLighter;
const backgroundColor = '#F1F5F9';
exports.backgroundColor = backgroundColor;
const azureDark = '#C2CDF4';
exports.azureDark = azureDark;
const azure = '#E0E7FF';
exports.azure = azure;
const azureLight = '#F9FAFF';
exports.azureLight = azureLight;
const redDark = '#BF0E08';
exports.redDark = redDark;
const red = '#EC4C47';
exports.red = red;
const redLight = '#fae2e2';
exports.redLight = redLight;
const redLighter = '#fef6f6';
exports.redLighter = redLighter;
const danger = red;
exports.danger = danger;
const error = red;
exports.error = error;
const orangeDark = '#a16d22';
exports.orangeDark = orangeDark;
const orange = '#f8a00f';
exports.orange = orange;
const orangeLight = '#f9ebd6';
exports.orangeLight = orangeLight;
const orangeLighter = '#fff7eb';
exports.orangeLighter = orangeLighter;
const warning = orange;
exports.warning = warning;
const blueDark = '#2A41A2';
exports.blueDark = blueDark;
const blue = '#4673D1';
exports.blue = blue;
const blueLight = '#CFD8FF';
exports.blueLight = blueLight;
const blueLighter = '#E7EBFC';
exports.blueLighter = blueLighter;
const info = blue;
exports.info = info;
const greenDark = '#288A70';
exports.greenDark = greenDark;
const green = '#3FBC9B';
exports.green = green;
const greenLight = '#C1E8DE';
exports.greenLight = greenLight;
const greenLighter = '#E7F5F1';
exports.greenLighter = greenLighter;
const success = green;
exports.success = success;
const facebookColor = '#275a9b';
exports.facebookColor = facebookColor;
const twitterColor = '#00a2f5';
exports.twitterColor = twitterColor;
const linkedinColor = '#0077b5';
exports.linkedinColor = linkedinColor;
const lighterOverlay = fade(grey900, 5);
exports.lighterOverlay = lighterOverlay;
const lightOverlay = fade(grey900, 10);
exports.lightOverlay = lightOverlay;
const darkOverlay = fade(neutralDarker, 90); // BORDERS

exports.darkOverlay = darkOverlay;
const baseBorderRadius = '5px';
const defaultBorderRadius = baseBorderRadius;
exports.defaultBorderRadius = defaultBorderRadius;
const borderRadiusBig = m(baseBorderRadius, 1.5);
exports.borderRadiusBig = borderRadiusBig;
const borderRadiusSmall = d(baseBorderRadius, 1.5); // TYPOGRAPHY

exports.borderRadiusSmall = borderRadiusSmall;
const baseFontSize = '14px';
const defaultFontSize = baseFontSize;
exports.defaultFontSize = defaultFontSize;
const defaultFontFamily = '"Rubik", sans-serif';
exports.defaultFontFamily = defaultFontFamily;
const baseLineHeight = '1.2';
const defaultLineHeight = baseLineHeight;
exports.defaultLineHeight = defaultLineHeight;
const baseLetterSpacing = '0.04rem';
const defaultLetterSpacing = baseLetterSpacing;
exports.defaultLetterSpacing = defaultLetterSpacing;
const colorPrimary = neutralDarkest;
exports.colorPrimary = colorPrimary;
const colorPrimaryInverse = white;
exports.colorPrimaryInverse = colorPrimaryInverse;
const colorSecondary = neutralDark;
exports.colorSecondary = colorSecondary;
const colorSecondaryInverse = fade(white, 70);
exports.colorSecondaryInverse = colorSecondaryInverse;
const colorTertiary = fade(neutralDark, 70);
exports.colorTertiary = colorTertiary;
const colorTertiaryInverse = fade(white, 50);
exports.colorTertiaryInverse = colorTertiaryInverse;
const colorDisabled = fade(neutralDark, 50);
exports.colorDisabled = colorDisabled;
const colorDisabledInverse = fade(white, 30); // SHADOWS

exports.colorDisabledInverse = colorDisabledInverse;
const shadowColor = neutral; // ELEVATIONS

exports.shadowColor = shadowColor;
const elevation1 = `0 4px 8px ${shadowColor}`;
exports.elevation1 = elevation1;
const elevation2 = `0 7px 14px ${shadowColor}`;
exports.elevation2 = elevation2;
const elevation3 = `0 10px 17px ${shadowColor}`;
exports.elevation3 = elevation3;
const insetActive = `0 1px 6px ${neutralDarkest} inset`;
exports.insetActive = insetActive;
const insetActiveMedium = `0 1px 6px ${neutralDark} inset`;
exports.insetActiveMedium = insetActiveMedium;
const insetActiveLight = `0 1px 6px ${neutral} inset`; // PADDINGS AND MARGINS

exports.insetActiveLight = insetActiveLight;
const basePadding = '24px';
const defaultPadding = basePadding;
exports.defaultPadding = defaultPadding;
const paddingSmall = s(basePadding, 8);
exports.paddingSmall = paddingSmall;
const paddingExtraSmall = s(paddingSmall, 8);
exports.paddingExtraSmall = paddingExtraSmall;
const paddingLarge = a(basePadding, 8);
exports.paddingLarge = paddingLarge;
const paddingExtraLarge = a(paddingLarge, 8);
exports.paddingExtraLarge = paddingExtraLarge;
const paddingHuge = m(paddingExtraSmall, 7);
exports.paddingHuge = paddingHuge;
const baseMargin = '24px';
exports.baseMargin = baseMargin;
const defaultMargin = basePadding;
exports.defaultMargin = defaultMargin;
const marginSmall = s(baseMargin, 8);
exports.marginSmall = marginSmall;
const marginExtraSmall = s(marginSmall, 8);
exports.marginExtraSmall = marginExtraSmall;
const marginLarge = a(baseMargin, 8);
exports.marginLarge = marginLarge;
const marginExtraLarge = a(marginLarge, 8);
exports.marginExtraLarge = marginExtraLarge;
const marginHuge = m(marginExtraSmall, 7); // TRANSITIONS AND ANIMATIONS

exports.marginHuge = marginHuge;
const baseTransitionTime = '0.3s';
const defaultTransitionTime = baseTransitionTime;
exports.defaultTransitionTime = defaultTransitionTime;
const transitionTimeShort = d(baseTransitionTime, 2);
exports.transitionTimeShort = transitionTimeShort;
const bouncyTransitionCurve = 'cubic-bezier(0.44, 0.11, 0.07, 1.29)';
exports.bouncyTransitionCurve = bouncyTransitionCurve;
const defaultTransition = `all ${transitionTimeShort} ease-in-out`; // SIZES

exports.defaultTransition = defaultTransition;
const maxWidthLarge = '1200px';
exports.maxWidthLarge = maxWidthLarge;
const maxWidthMedium = '400px'; // MEDIA QUERIES

exports.maxWidthMedium = maxWidthMedium;
const screenXs = 'only screen and (max-width: 320px)';
exports.screenXs = screenXs;
const screenS = 'only screen and (max-width: 375px)';
exports.screenS = screenS;
const screenM = 'only screen and (max-width: 425px)';
exports.screenM = screenM;
const screenL = 'only screen and (max-width: 768px)';
exports.screenL = screenL;
const screenXl = 'only screen and (max-width: 1024px)';
exports.screenXl = screenXl;
const phoneS = screenXs;
exports.phoneS = phoneS;
const phone = screenS;
exports.phone = phone;
const phoneXl = screenM;
exports.phoneXl = phoneXl;
const ipad = screenL;
exports.ipad = ipad;
const desktopS = screenXl;
exports.desktopS = desktopS;
const phoneSLandscape = ipad;
exports.phoneSLandscape = phoneSLandscape;
const phoneLandscape = ipad;
exports.phoneLandscape = phoneLandscape;
const phoneXlLandscape = ipad;
exports.phoneXlLandscape = phoneXlLandscape;
const ipadLandscape = desktopS;
exports.ipadLandscape = ipadLandscape;
const screenSOrM = '(max-width: 480px), (max-width: 768px)';
exports.screenSOrM = screenSOrM;
const greaterThanMaximumWidth = 'only screen and (min-width: 1200px)';
exports.greaterThanMaximumWidth = greaterThanMaximumWidth;
const greaterThanMinimumWidth = 'only screen and (min-width: 1024px)';
exports.greaterThanMinimumWidth = greaterThanMinimumWidth;
