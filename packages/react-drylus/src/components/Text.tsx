/* eslint-disable no-use-before-define */
import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import React, { Fragment } from 'react';

import { Category, Color, Shade, Size, Tier } from '../enums';
import { Responsive, Style } from '../types';
import {
  ShowDateTime,
  colorEnumToCategory,
  generateDisplayedDate,
  generateDisplayedPrice,
  getEnumAsClass,
  shadeEnumToTier,
  useResponsiveProps,
} from '../utils';
import { TextLink } from './TextLink';

export {
  generateDisplayedPrice as formatPrice,
  ShowDateTime,
  generateDisplayedDate as formatDate,
} from '../utils';

const styles = {
  root: css`
    display: inline;
  `,
  bold: css`
    font-weight: 500;
    letter-spacing: 0.01rem;
  `,
  light: css`
    font-weight: 300;
    letter-spacing: 0.06rem;
  `,
  primary: css`
    color: ${sv.colorPrimary};
  `,
  secondary: css`
    color: ${sv.colorSecondary};
  `,
  tertiary: css`
    color: ${sv.colorTertiary};
  `,
  disabled: css`
    color: ${sv.colorDisabled};
  `,
  primaryInversed: css`
    color: ${sv.colorPrimaryInverse};
  `,
  secondaryInversed: css`
    color: ${sv.colorSecondaryInverse};
  `,
  tertiaryInversed: css`
    color: ${sv.colorTertiaryInverse};
  `,
  disabledInversed: css`
    color: ${sv.colorDisabledInverse};
  `,
  small: css`
    font-size: 0.9rem;
  `,
  default: css`
    font-size: 1rem;
  `,
  large: css`
    font-size: 1.1rem;
  `,
  brand: css`
    color: ${sv.brand};
  `,
  success: css`
    color: ${sv.success};
  `,
  danger: css`
    color: ${sv.danger};
  `,
  warning: css`
    color: ${sv.warning};
  `,
  info: css`
    color: ${sv.info};
  `,
};

type Price = {
  currency?: string;
  value: number;
};

export type TextChildren =
  | string
  | React.ReactElement<typeof Text>
  | React.ReactElement<typeof TextLink>
  | number
  | Price
  | Date
  | React.ReactNode;

export interface TextProps {
  /**
   * Makes the text visible on dark backgrounds
   * @default false
   */
  inversed?: boolean;

  /** @default false */
  bold?: boolean;

  /**
   * The opposite of bold, will set the font weight to 300 (useful with `inversed` on dark backgrounds)
   * @default false
   */
  light?: boolean;

  /**
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.DEFAULT | Size.SMALL | Size.LARGE;

  tier?: Tier;

  /** @default Shade.DARK */
  shade?: Shade;

  /**
   * Makes the text appear disabled, but still selectable
   * @default false
   */
  disabled?: boolean;

  children: TextChildren | Array<TextChildren> | React.ReactNode;

  /** @kind Category */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE | Color.PRIMARY;

  /** Options to change the way the date is displayed, if provided. showTime toggles display of hour/minutes, format for dayjs overrides */
  dateOptions?: {
    showTime?: ShowDateTime;
    asArchive?: boolean;
    format?: any;
  };

  /** Formatting options for the .toLocaleString method used internally when formatting numbers */
  priceOptions?: any;

  /**
   * Used to override the current locale if necessary (e.g. if the browser locale is not explicitely defined)
   */
  locale?: string;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

function _processChild(
  child: TextChildren,
  {
    dateOptions,
    locale,
    priceOptions,
  }: {
    dateOptions: TextProps['dateOptions'];
    locale: TextProps['locale'];
    priceOptions: TextProps['priceOptions'];
  },
) {
  if (isObject(child)) {
    if (child instanceof Date) {
      return generateDisplayedDate({
        date: child,
        options: dateOptions,
        locale,
      });
    } else if ((child as Price).value != null) {
      return generateDisplayedPrice({
        price: child as Price,
        options: priceOptions,
        locale,
      });
    } else {
      return child;
    }
  }
  return child;
}

export const Text = ({ responsive, ...rest }: TextProps) => {
  const {
    inversed = false,
    bold = false,
    size = Size.DEFAULT,
    tier: _tier,
    disabled = false,
    children,
    category: _category,
    color,
    shade = Shade.DARK,
    style,
    light = false,
    dateOptions,
    priceOptions,
    locale,
    className,
  } = useResponsiveProps<TextProps>(rest, responsive);

  const tier = _tier ?? (shade ? shadeEnumToTier(shade) : null);
  const category = color ? colorEnumToCategory(color) : _category;

  const transformedChildren = isArray(children)
    ? [...children].map((child) =>
        _processChild(child, {
          dateOptions,
          locale,
          priceOptions,
        }),
      )
    : _processChild(children, { dateOptions, locale, priceOptions });

  return (
    <span
      className={cx(
        styles.root,
        {
          [styles.bold]: bold,
          [styles.light]: light,
          [styles.primary]: tier === Tier.PRIMARY && !disabled && !inversed,
          [styles.secondary]: tier === Tier.SECONDARY && !disabled && !inversed,
          [styles.tertiary]: tier === Tier.TERTIARY && !disabled && !inversed,
          [styles.disabled]: disabled && !inversed,
          [styles.primaryInversed]: tier === Tier.PRIMARY && !disabled && inversed,
          [styles.secondaryInversed]: tier === Tier.SECONDARY && !disabled && inversed,
          [styles.tertiaryInversed]: tier === Tier.TERTIARY && !disabled && inversed,
          [styles.disabledInversed]: disabled && inversed,
          [styles.small]: size === Size.SMALL,
          [styles.default]: size === Size.DEFAULT,
          [styles.large]: size === Size.LARGE,
          [styles[getEnumAsClass<typeof styles>(category)]]:
            category != null && !disabled && !inversed,
        },
        className,
      )}
      style={style}>
      <Fragment>{transformedChildren}</Fragment>
    </span>
  );
};
