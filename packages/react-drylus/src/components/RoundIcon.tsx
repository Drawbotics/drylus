import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';
import { Responsive, Style } from 'src/types';

import { Category, Color, Size } from '../enums';
import { Deprecated, categoryEnumToColor, getEnumAsClass, useResponsiveProps } from '../utils';
import { Icon, Icons } from './Icon';

const styles = {
  root: css`
    border-radius: 1000px;
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    color: ${sv.colorPrimary};
    background: ${sv.neutralLight};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > i {
      font-size: 1rem;
      margin-top: 1px;
    }
  `,
  small: css`
    height: ${sv.marginSmall};
    width: ${sv.marginSmall};

    > i {
      font-size: 0.65rem;
    }
  `,
  large: css`
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};

    > i {
      font-size: 1.3rem;
      margin-top: 0;
      margin-left: -1px;
    }
  `,
  iconInherit: css`
    > i {
      font-size: inherit;
    }
  `,
  red: css`
    color: ${sv.white};
    background: ${sv.red};
  `,
  blue: css`
    color: ${sv.white};
    background: ${sv.blue};
  `,
  green: css`
    color: ${sv.white};
    background: ${sv.green};
  `,
  orange: css`
    color: ${sv.white};
    background: ${sv.orange};
  `,
  brand: css`
    color: ${sv.white};
    background: ${sv.brand};
  `,
};

interface RoundIconProps {
  /** Name of the icon */
  name: keyof typeof Icons;

  /** @default Size.DEFAULT */
  size?: number | Size.SMALL | Size.DEFAULT | Size.LARGE;

  /** Makes the icon bold */
  bold?: boolean;

  /** @deprecated use color instead */
  /** @description uses enum Category */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @description uses enum Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const RoundIcon = ({ responsive, ...rest }: RoundIconProps) => {
  const {
    name,
    size = Size.DEFAULT,
    category,
    bold,
    style = {},
    color: _color,
  } = useResponsiveProps<RoundIconProps>(rest, responsive);

  const customSize = typeof size === 'number';
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
        [styles[customSize ? 'root' : getEnumAsClass<typeof styles>(size as Size)]]:
          size != null && !customSize,
        [styles.iconInherit]: customSize,
      })}
      style={
        customSize
          ? { height: size, width: size, fontSize: (size as number) * 0.5, ...style }
          : style
      }>
      <Icon name={name} bold={bold} />
    </div>
  );
};

RoundIcon.propTypes = {
  category: Deprecated,
};
