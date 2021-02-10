import sv, { darken } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Shade } from '../enums';
import { Style } from '../types';
import { getEnumAsClass } from '../utils';

const styles = {
  root: css`
    color: inherit;
    text-decoration: none;
    transition: ${sv.transitionShort};

    &:hover {
      cursor: pointer;
    }
  `,
  brand: css`
    color: ${sv.brand};

    &:hover {
      color: ${sv.brandDark};
    }
  `,
  info: css`
    color: ${sv.blue};

    &:hover {
      color: ${sv.blueDark};
    }
  `,
  success: css`
    color: ${sv.green};

    &:hover {
      color: ${sv.greenDark};
    }
  `,
  warning: css`
    color: ${sv.orange};

    &:hover {
      color: ${sv.orangeDark};
    }
  `,
  danger: css`
    color: ${sv.red};

    &:hover {
      color: ${sv.redDark};
    }
  `,
  underlinedHover: css`
    &:hover {
      text-decoration: underline !important;
    }
  `,
  underlinedAlways: css`
    text-decoration: underline !important;
  `,
  dark: css`
    color: ${sv.colorPrimary};

    &:hover {
      color: ${darken(sv.colorPrimary, 50)};
    }
  `,
  medium: css`
    color: ${sv.colorSecondary};

    &:hover {
      color: ${sv.colorPrimary};
    }
  `,
  light: css`
    color: ${sv.colorTertiary};

    &:hover {
      color: ${sv.colorSecondary};
    }
  `,
};

export enum LinkUnderlined {
  ALWAYS = 'ALWAYS',
  HOVER = 'HOVER',
}

export interface TextLinkProps {
  /** Text of the link */
  children?: React.ReactNode;

  /**
   * @default Category.INFO
   * @kind Category
   * */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  shade?: Shade;

  /** @default LinkUnderlined.HOVER */
  underlined?: LinkUnderlined;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const TextLink = ({
  children,
  category = Category.INFO,
  underlined = LinkUnderlined.HOVER,
  style,
  shade,
  className,
  ...rest
}: TextLinkProps) => {
  return (
    <span
      style={style}
      className={cx(
        styles.root,
        {
          [styles[getEnumAsClass<typeof styles>(category)]]: category != null,
          [styles[getEnumAsClass<typeof styles>(shade)]]: shade != null,
          [styles.underlinedHover]: underlined === LinkUnderlined.HOVER,
          [styles.underlinedAlways]: underlined === LinkUnderlined.ALWAYS,
        },
        className,
      )}
      {...rest}>
      {children}
    </span>
  );
};
