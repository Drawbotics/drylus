import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, useResponsiveProps } from '../utils';
import { Icon, IconType } from './Icon';

const largeHeight = sv.marginLarge;
const defaultHeight = sv.defaultMargin;
const smallHeight = sv.marginSmall;

const styles = {
  root: css`
    border-radius: 1000px;
    height: ${defaultHeight};
    width: ${defaultHeight};
    color: ${sv.colorPrimary};
    background: ${sv.neutralLight};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > i {
      font-size: 1.1em;
      margin-top: 1px;
    }
  `,
  small: css`
    height: ${smallHeight};
    width: ${smallHeight};

    > i {
      font-size: 0.65em;
      margin-left: 1px;
    }
  `,
  large: css`
    height: ${largeHeight};
    width: ${largeHeight};

    > i {
      font-size: 1.2em;
      margin-top: 1px;
    }
  `,
  iconInherit: css`
    > i {
      font-size: inherit;
    }
  `,
  red: css`
    background: ${sv.redLighter};
    color: ${sv.red};
  `,
  blue: css`
    background: ${sv.blueLighter};
    color: ${sv.blue};
  `,
  green: css`
    background: ${sv.greenLighter};
    color: ${sv.green};
  `,
  orange: css`
    background: ${sv.orangeLighter};
    color: ${sv.orange};
  `,
  brand: css`
    background: ${sv.brandLighter};
    color: ${sv.brand};
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

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE | string;

  /** Modifies the way the color is shown */
  inversed?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

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
    bold,
    style: _style = {},
    color,
    inversed,
    className: customClassName,
  } = useResponsiveProps<RoundIconProps>(rest, responsive);

  const customSize = typeof size === 'number';
  const enumColor = color != null && color in Color ? (color as Color) : null;
  const className = enumColor != null ? _getClassNameForColor(enumColor, inversed) : null;
  const style =
    color != null && enumColor == null
      ? {
          ..._style,
          color: inversed ? undefined : color,
          background: inversed ? color : fade(color, 15),
        }
      : _style;
  return (
    <div
      className={cx(
        styles.root,
        {
          [styles[customSize ? 'root' : getEnumAsClass<typeof styles>(size as Size)]]:
            size != null && !customSize,
          [styles.iconInherit]: customSize,
          [styles.inversed]: inversed === true,
          [styles[className as keyof typeof styles]]: enumColor != null,
        },
        customClassName,
      )}
      style={
        customSize
          ? { height: size, width: size, fontSize: (size as number) * 0.4, ...style }
          : style
      }>
      <Icon name={name} bold={bold} />
    </div>
  );
};
