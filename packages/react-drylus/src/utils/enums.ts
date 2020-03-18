import camelCase from 'lodash/camelCase';

import { Category, Color, Position, Shade, Size, Tier } from '../enums';

type Enum = Category | Color | Shade | Tier | Size | Position;

export function getEnumAsClass<T extends Record<string, string>>(enumVal?: Enum): keyof T {
  return camelCase(enumVal?.toLowerCase());
}

export function colorEnumToCategory(enumVal: Color): Category | undefined {
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
}

export function categoryEnumToColor(enumVal: Category): Color | undefined {
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
}

export function shadeEnumToTier(enumVal: Shade): Tier | undefined {
  switch (enumVal) {
    case Shade.DARK:
      return Tier.PRIMARY;
    case Shade.MEDIUM:
      return Tier.SECONDARY;
    case Shade.LIGHT:
      return Tier.TERTIARY;
  }
}

export function getIconForCategory(category: Category): string {
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
