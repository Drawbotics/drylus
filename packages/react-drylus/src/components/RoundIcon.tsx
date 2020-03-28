import sv, { fade } from '@drawbotics/drylus-style-vars';
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
      margin-left: -1px;
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

  /** @default Size.DEFAULT */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE | number;

  /** Makes the icon bold */
  bold?: boolean;

  /** @deprecated use color instead */
  category?: Exclude<Category, Category.PRIMARY>;

  color?: Exclude<Color, Color.PRIMARY> | string;

  /** Modifies the way the color is shown */
  inversed?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

function _getClassNameForColor(
  color: RoundIconProps['color'],
  inversed: RoundIconProps['inversed'],
): string | undefined {
  if (color != null && Object.values(Color).includes(color as Color)) {
    return inversed ? `${getEnumAsClass(color as Color)}Inversed` : getEnumAsClass(color as Color);
  }
  return color;
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
  const className = _getClassNameForColor(color, inversed);
  const style =
    color != null && !Object.values(Color).includes(color as Color)
      ? {
          ..._style,
          color: inversed ? undefined : color,
          background: inversed ? color : fade(color, 30),
        }
      : _style;
  return (
    <div
      className={cx(styles.root, {
        // [styles[!customColor ? getEnumAsClass<typeof styles>(color as Color) : 'root']]:
        //   color != null,
        [styles[customSize ? 'root' : getEnumAsClass<typeof styles>(size as Size)]]:
          size != null && !customSize,
        [styles.iconInherit]: customSize,
        [styles.inversed]: inversed,
        [styles[className as keyof typeof styles]]: color != null,
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
