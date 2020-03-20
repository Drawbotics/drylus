import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import React from 'react';
import { Responsive, Style } from 'src/types';

import { Category, Shade, Size, Tier } from '../enums';
import {
  ShowDateTime,
  generateDisplayedDate,
  generateDisplayedPrice,
  getEnumAsClass,
  shadeEnumToTier,
  useResponsiveProps,
} from '../utils';

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

type TextChildren =
  | string
  | number
  | {
      currency?: string;
      value: number;
    }
  | Date;

interface TextProps {
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

  /** @default Size.DEFAULT */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;

  tier?: Tier;

  /** @default Shade.DARK */
  shade?: Shade;

  /**
   * Makes the text appear disabled, but still selectable
   * @default false
   */
  disabled?: boolean;

  children: TextChildren | Array<TextChildren>;

  category?: Exclude<Category, Category.PRIMARY>;

  /** Options to change the way the date is displayed, if provided. showTime toggles display of hour/minutes, format for dayjs overrides */
  dateOptions?: {
    showTime?: ShowDateTime.DEFAULT | ShowDateTime.NEVER | ShowDateTime.ALWAYS;
    asArchive?: boolean;
    format?: any;
  };

  /** Formatting options for the .toLocaleString method used internally when formatting numbers */
  priceOptions?: any;

  /**
   * Used to override the current locale if necessary (e.g. if the browser locale is not explicitely defined)
   * @default 'en'
   */
  locale?: string;

  /** Used for style overrides */
  style?: Style;

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
    } else if (child.value != null) {
      return generateDisplayedPrice({
        price: child,
        options: priceOptions,
        locale,
      });
    } else {
      console.warn('Unsupported Text child type. Please provde text, Date or Currency');
      return '';
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
    category,
    shade = Shade.DARK,
    style,
    light = false,
    dateOptions,
    priceOptions,
    locale = 'en',
  } = useResponsiveProps<TextProps>(rest, responsive);

  const tier = _tier ?? (shade ? shadeEnumToTier(shade) : null);

  const transformedChildren = isArray(children)
    ? [...children]
        .map((child) =>
          _processChild(child, {
            dateOptions,
            locale,
            priceOptions,
          }),
        )
        .join('')
    : _processChild(children, { dateOptions, locale, priceOptions });

  return (
    <span
      className={cx(styles.root, {
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
      })}
      style={style}>
      {transformedChildren}
    </span>
  );
};
