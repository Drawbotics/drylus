module.exports = `
export enum Category {
  BRAND = 'BRAND',
  INFO = 'INFO',
  DANGER = 'DANGER',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  PRIMARY = 'PRIMARY',
}

export enum Size {
  EXTRA_SMALL = 'EXTRA_SMALL',
  SMALL = 'SMALL',
  DEFAULT = 'DEFAULT',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE',
  HUGE = 'HUGE',
  EXTRA_HUGE = 'EXTRA_HUGE',
  MASSIVE = 'MASSIVE',
}

export enum Tier {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
}

export enum Align {
  LEFT   = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum Position {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

// components/EmptyState
export enum EmptyStateVariation {
  DEFAULT = 'DEFAULT',
  PROCESSING = 'PROCESSING',
  NOT_FOUND = 'NOT_FOUND',
  NOT_ALLOWED = 'NOT_ALLOWED',
  FAILED = 'FAILED',
}

// components/TextLink
export enum LinkUnderlined {
  ALWAYS = 'ALWAYS',
  HOVER = 'HOVER',
}

// components/Flex
export enum FlexDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export enum FlexJustify {
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
  SPACE_AROUND = 'SPACE_AROUND',
  SPACE_BETWEEN = 'SPACE_BETWEEN',
  SPACE_EVENLY = 'SPACE_EVENLY',
}

export enum FlexAlign {
  STRETCH = 'STRETCH',
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
}

// Utils/date
export enum ShowDateTime {
  DEFAULT = 'DEFAULT',
  ALWAYS = 'ALWAYS',
  NEVER = 'NEVER',
}
`;
