import sv from '@drawbotics/drylus-style-vars';
import { IconKeys, Icons as IconValues } from '@drawbotics/icons/dist/drycons';
import { mapping } from '@drawbotics/icons/dist/drycons.js';
import { css, cx } from 'emotion';
import React from 'react';

import { Color, Shade } from '../enums';
import { OnClickCallback, Style } from '../types';
import { getEnumAsClass } from '../utils';

const styles = {
  root: css`
    color: inherit;
  `,
  bold: css`
    font-weight: bold !important;
  `,
  red: css`
    color: ${sv.red};
  `,
  blue: css`
    color: ${sv.blue};
  `,
  green: css`
    color: ${sv.green};
  `,
  orange: css`
    color: ${sv.orange};
  `,
  brand: css`
    color: ${sv.brand};
  `,
  primary: css`
    color: ${sv.colorPrimary};
  `,
  light: css`
    color: ${sv.colorTertiary};
  `,
  medium: css`
    color: ${sv.colorSecondary};
  `,
  dark: css`
    color: ${sv.colorPrimary};
  `,
  clickable: css`
    &:hover {
      cursor: pointer;
    }
  `,
};

export const Icons: Record<IconKeys, IconValues> = mapping;

export type IconType = IconValues;

export interface IconProps {
  /** Name of the icon */
  name: IconType;

  /** Makes icon bold */
  bold?: boolean;

  /** Triggered when the icon is clicked */
  onClick?: OnClickCallback<HTMLElement>;

  color?: Color;

  /** @kind Shade */
  shade?: Shade.DARK | Shade.MEDIUM | Shade.LIGHT;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const Icon = ({ name, bold, onClick, style, color, shade, className }: IconProps) => {
  return (
    <i
      style={style}
      className={cx(
        styles.root,
        `Drycon Drycon-${name}`,
        {
          [styles.bold]: bold != null,
          [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
          [styles[getEnumAsClass<typeof styles>(shade)]]: shade != null,
          [styles.clickable]: onClick != null,
        },
        className,
      )}
      onClick={onClick}
    />
  );
};
