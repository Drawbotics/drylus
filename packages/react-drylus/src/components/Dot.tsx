import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Color, Size } from '../enums';
import { Style } from '../types';
import { getEnumAsClass } from '../utils';

const styles = {
  root: css`
    display: inline-block;
    border-radius: 1000px;
    height: ${sv.marginExtraSmall};
    width: ${sv.marginExtraSmall};
    background: ${sv.neutral};
  `,
  large: css`
    height: calc(${sv.marginSmall} - 4px);
    width: calc(${sv.marginSmall} - 4px);
  `,
  brand: css`
    background: ${sv.brand};
  `,
  green: css`
    background: ${sv.green};
  `,
  red: css`
    background: ${sv.red};
  `,
  orange: css`
    background: ${sv.orange};
  `,
  blue: css`
    background: ${sv.blue};
  `,
  primary: css`
    background: ${sv.colorPrimary};
  `,
};

export interface DotProps {
  /** Can be either a Color or a hex string */
  color?: Color | string;

  /**
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.DEFAULT | Size.LARGE;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const Dot = ({ style, color, className, size }: DotProps) => {
  const isEnumColor = color != null && color in Color;
  return (
    <div
      style={{ ...style, backgroundColor: isEnumColor ? undefined : color }}
      className={cx(
        styles.root,
        {
          [styles.large]: size === Size.LARGE,
          [styles[getEnumAsClass<typeof styles>(color as Color)]]: isEnumColor,
        },
        className,
      )}
    />
  );
};
