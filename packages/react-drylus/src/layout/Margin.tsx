import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import camelCase from 'lodash/camelCase';
import React from 'react';

import { Size } from '../enums';
import { Rectangular, Responsive, Style, Variable } from '../types';
import { useResponsiveProps } from '../utils';

const styles = {
  root: css`
    margin: ${sv.defaultMargin};

    @media ${sv.screenL} {
      margin: ${sv.marginSmall};
    }
  `,
  resetMargin: css`
    margin: 0;

    @media ${sv.screenL} {
      margin: 0;
    }
  `,
  extraSmall: css`
    margin: ${sv.marginExtraSmall};

    @media ${sv.screenL} {
      margin: calc(${sv.marginExtraSmall} / 2);
    }
  `,
  small: css`
    margin: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin: ${sv.marginExtraSmall};
    }
  `,
  large: css`
    margin: ${sv.marginLarge};

    @media ${sv.screenL} {
      margin: ${sv.defaultMargin};
    }
  `,
  extraLarge: css`
    margin: ${sv.marginExtraLarge};

    @media ${sv.screenL} {
      margin: ${sv.marginLarge};
    }
  `,
  huge: css`
    margin: ${sv.marginHuge};

    @media ${sv.screenL} {
      margin: ${sv.marginExtraLarge};
    }
  `,
  extraHuge: css`
    margin: ${sv.marginExtraHuge};

    @media ${sv.screenL} {
      margin: ${sv.marginHuge};
    }
  `,
  massive: css`
    margin: ${sv.marginMassive};

    @media ${sv.screenL} {
      margin: ${sv.marginExtraHuge};
    }
  `,
  extraSmallLeft: css`
    margin-left: ${sv.marginExtraSmall};

    @media ${sv.screenL} {
      margin-left: calc(${sv.marginExtraSmall} / 2);
    }
  `,
  extraSmallRight: css`
    margin-right: ${sv.marginExtraSmall};

    @media ${sv.screenL} {
      margin-right: calc(${sv.marginExtraSmall} / 2);
    }
  `,
  extraSmallTop: css`
    margin-top: ${sv.marginExtraSmall};

    @media ${sv.screenL} {
      margin-top: calc(${sv.marginExtraSmall} / 2);
    }
  `,
  extraSmallBottom: css`
    margin-bottom: ${sv.marginExtraSmall};

    @media ${sv.screenL} {
      margin-bottom: calc(${sv.marginExtraSmall} / 2);
    }
  `,
  smallLeft: css`
    margin-left: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin-left: ${sv.marginExtraSmall};
    }
  `,
  smallRight: css`
    margin-right: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin-right: ${sv.marginExtraSmall};
    }
  `,
  smallTop: css`
    margin-top: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin-top: ${sv.marginExtraSmall};
    }
  `,
  smallBottom: css`
    margin-bottom: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginExtraSmall};
    }
  `,
  defaultLeft: css`
    margin-left: ${sv.defaultMargin};

    @media ${sv.screenL} {
      margin-left: ${sv.marginSmall};
    }
  `,
  defaultRight: css`
    margin-right: ${sv.defaultMargin};

    @media ${sv.screenL} {
      margin-right: ${sv.marginSmall};
    }
  `,
  defaultTop: css`
    margin-top: ${sv.defaultMargin};

    @media ${sv.screenL} {
      margin-top: ${sv.marginSmall};
    }
  `,
  defaultBottom: css`
    margin-bottom: ${sv.defaultMargin};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginSmall};
    }
  `,
  largeLeft: css`
    margin-left: ${sv.marginLarge};

    @media ${sv.screenL} {
      margin-left: ${sv.defaultMargin};
    }
  `,
  largeRight: css`
    margin-right: ${sv.marginLarge};

    @media ${sv.screenL} {
      margin-right: ${sv.defaultMargin};
    }
  `,
  largeTop: css`
    margin-top: ${sv.marginLarge};

    @media ${sv.screenL} {
      margin-top: ${sv.defaultMargin};
    }
  `,
  largeBottom: css`
    margin-bottom: ${sv.marginLarge};

    @media ${sv.screenL} {
      margin-bottom: ${sv.defaultMargin};
    }
  `,
  extraLargeLeft: css`
    margin-left: ${sv.marginExtraLarge};

    @media ${sv.screenL} {
      margin-left: ${sv.marginLarge};
    }
  `,
  extraLargeRight: css`
    margin-right: ${sv.marginExtraLarge};

    @media ${sv.screenL} {
      margin-right: ${sv.marginLarge};
    }
  `,
  extraLargeTop: css`
    margin-top: ${sv.marginExtraLarge};

    @media ${sv.screenL} {
      margin-top: ${sv.marginLarge};
    }
  `,
  extraLargeBottom: css`
    margin-bottom: ${sv.marginExtraLarge};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginLarge};
    }
  `,
  hugeLeft: css`
    margin-left: ${sv.marginHuge};

    @media ${sv.screenL} {
      margin-left: ${sv.marginExtraLarge};
    }
  `,
  hugeRight: css`
    margin-right: ${sv.marginHuge};

    @media ${sv.screenL} {
      margin-right: ${sv.marginExtraLarge};
    }
  `,
  hugeTop: css`
    margin-top: ${sv.marginHuge};

    @media ${sv.screenL} {
      margin-top: ${sv.marginExtraLarge};
    }
  `,
  hugeBottom: css`
    margin-bottom: ${sv.marginHuge};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginExtraLarge};
    }
  `,
  extraHugeLeft: css`
    margin-left: ${sv.marginExtraHuge};

    @media ${sv.screenL} {
      margin-left: ${sv.marginHuge};
    }
  `,
  extraHugeRight: css`
    margin-right: ${sv.marginExtraHuge};

    @media ${sv.screenL} {
      margin-right: ${sv.marginHuge};
    }
  `,
  extraHugeTop: css`
    margin-top: ${sv.marginExtraHuge};

    @media ${sv.screenL} {
      margin-top: ${sv.marginHuge};
    }
  `,
  extraHugeBottom: css`
    margin-bottom: ${sv.marginExtraHuge};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginHuge};
    }
  `,
  massiveLeft: css`
    margin-left: ${sv.marginMassive};

    @media ${sv.screenL} {
      margin-left: ${sv.marginExtraHuge};
    }
  `,
  massiveRight: css`
    margin-right: ${sv.marginMassive};

    @media ${sv.screenL} {
      margin-right: ${sv.marginExtraHuge};
    }
  `,
  massiveTop: css`
    margin-top: ${sv.marginMassive};

    @media ${sv.screenL} {
      margin-top: ${sv.marginExtraHuge};
    }
  `,
  massiveBottom: css`
    margin-bottom: ${sv.marginMassive};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginExtraHuge};
    }
  `,
};

function _computeSize(sizeDescription: Rectangular) {
  let size: Variable = {};

  if (sizeDescription.horizontal) {
    size.left = sizeDescription.horizontal;
    size.right = sizeDescription.horizontal;
  }
  if (sizeDescription.vertical) {
    size.top = sizeDescription.vertical;
    size.bottom = sizeDescription.vertical;
  }

  return size;
}

function _isRectangular(size: any): size is Rectangular {
  return size.vertical || size.horizontal;
}

export interface MarginProps {
  /** Determines the amount of margin given to the component. If a single value, the margin is applied equally to each side */
  size?: Size | Rectangular | Variable;

  /** The content of the margin wrapper */
  children?: React.ReactNode;

  /** Prop to override any style if necessary, use sparingly */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Margin = ({ responsive, ...rest }: MarginProps) => {
  const { children, size: rawSize, style, className } = useResponsiveProps<MarginProps>(
    rest,
    responsive,
  );

  const isUniform = typeof rawSize !== 'object';

  const size = !isUniform && _isRectangular(rawSize) ? _computeSize(rawSize) : rawSize;
  return (
    <div
      className={cx(
        styles.root,
        {
          [styles[camelCase(size as Size) as keyof typeof styles]]: isUniform && size != null,
          [styles.resetMargin]: !isUniform,
          [styles[camelCase(`${(size as Variable)?.left}_LEFT`) as keyof typeof styles]]:
            !isUniform && (size as Variable)?.left != null,
          [styles[camelCase(`${(size as Variable)?.right}_RIGHT`) as keyof typeof styles]]:
            !isUniform && (size as Variable)?.right != null,
          [styles[camelCase(`${(size as Variable)?.top}_TOP`) as keyof typeof styles]]:
            !isUniform && (size as Variable)?.top != null,
          [styles[camelCase(`${(size as Variable)?.bottom}_BOTTOM`) as keyof typeof styles]]:
            !isUniform && (size as Variable)?.bottom != null,
        },
        className,
      )}
      style={style}>
      {children}
    </div>
  );
};
