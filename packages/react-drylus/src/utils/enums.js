import camelCase from 'lodash/camelCase';

import { Category, Color, Shade, Tier } from '../enums';

export function getEnumAsClass(enumVal) {
  return camelCase(enumVal?.description?.toLowerCase());
}

export function colorEnumToCategory(enumVal) {
  switch (enumVal) {
    case Color.RED:
      return Category.DANGER;
    case Color.GREEN:
      return Category.SUCCESS;
    case Color.ORANGE:
      return Category.WARNING;
    case Color.BLUE:
      return Category.INFO;
  }
  return enumVal;
}

export function categoryEnumToColor(enumVal) {
  switch (enumVal) {
    case Category.DANGER:
      return Color.RED;
    case Category.SUCCESS:
      return Color.GREEN;
    case Category.WARNING:
      return Color.ORANGE;
    case Category.INFO:
      return Color.BLUE;
  }
  return enumVal;
}

export function shadeEnumToTier(enumVal) {
  switch (enumVal) {
    case Shade.DARK:
      return Tier.PRIMARY;
    case Shade.MEDIUM:
      return Tier.SECONDARY;
    case Shade.LIGHT:
      return Tier.TERTIARY;
  }
  return enumVal;
}

export function getIconForCategory(category) {
  switch (category) {
    case Category.DANGER:
      return 'alert-circle';
    case Category.SUCCESS:
      return 'check-circle';
    case Category.WARNING:
      return 'alert-triangle';
    default:
      return 'info';
  }
}
