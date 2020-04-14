import sv, { lighten } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';
import { Responsive, Style } from 'src/types';

import { Category, Color, Size } from '../enums';
import { Deprecated, categoryEnumToColor, getEnumAsClass, useResponsiveProps } from '../utils';
import { Icon, IconType } from './Icon';

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
    }
  `,
  iconInherit: css`
    > i {
      font-size: inherit;
    }
  `,
  red: css`
    background: ${sv.redLight};
    color: ${sv.redDark};
  `,
  blue: css`
    background: ${sv.blueLight};
    color: ${sv.blueDark};
  `,
  green: css`
    background: ${sv.greenLight};
    color: ${sv.greenDark};
  `,
  orange: css`
    background: ${sv.orangeLight};
    color: ${sv.orangeDark};
  `,
  brand: css`
    background: ${sv.brandLight};
    color: ${sv.brandDark};
  `,
  inversed: css`
    color: ${sv.white};
    background: ${sv.neutralDarker};
  `,
  brandInversed: css`
    background: ${sv.brand};
  `,
  redInversed: css`
    background: ${sv.red};
  `,
  greenInversed: css`
    background: ${sv.green};
  `,
  orangeInversed: css`
    background: ${sv.orange};
  `,
  blueInversed: css`
    background: ${sv.blue};
  `,
};

export interface RoundIconProps {
  /** Name of the icon */
  name: IconType;

  /**
   * @default Size.DEFAULT
   * @kind Size
   * */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE | number;

  /** Makes the icon bold */
  bold?: boolean;

  /**
   * @deprecated use color instead
   * @kind Category
   */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;

  /** Modifies the way the color is shown */
  inversed?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

function _getClassNameForColor(color: Color, inversed?: boolean): string {
  return inversed ? `${getEnumAsClass(color)}Inversed` : getEnumAsClass(color);
}

export const RoundIcon = ({ responsive, ...rest }: RoundIconProps) => {
  const {
    name,
    size = Size.DEFAULT,
    category,
    bold,
    style: _style = {},
    color: _color,
    inversed,
  } = useResponsiveProps<RoundIconProps>(rest, responsive);

  const customSize = typeof size === 'number';
  const color = category ? categoryEnumToColor(category) : _color;
  const enumColor = color != null && color in Color ? (color as Color) : null;
  const className = enumColor != null ? _getClassNameForColor(enumColor, inversed) : null;
  const style =
    color != null && enumColor == null
      ? {
          ..._style,
          color: inversed ? undefined : color,
          background: inversed ? color : lighten(color, 52),
        }
      : _style;
  return (
    <div
      className={cx(styles.root, {
        [styles[customSize ? 'root' : getEnumAsClass<typeof styles>(size as Size)]]:
          size != null && !customSize,
        [styles.iconInherit]: customSize,
        [styles.inversed]: inversed,
        [styles[className as keyof typeof styles]]: enumColor != null,
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
