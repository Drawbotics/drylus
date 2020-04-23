import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import camelCase from 'lodash/camelCase';
import React from 'react';

import { Size } from '../enums';
import { Rectangular, Responsive, Style, Variable } from '../types';
import { useResponsiveProps } from '../utils';

const styles = {
  root: css`
    padding: ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding: ${sv.paddingSmall};
    }
  `,
  resetPadding: css`
    padding: 0;

    @media ${sv.screenL} {
      padding: 0;
    }
  `,
  extraSmall: css`
    padding: ${sv.paddingExtraSmall};

    @media ${sv.screenL} {
      padding: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  small: css`
    padding: ${sv.paddingSmall};

    @media ${sv.screenL} {
      padding: ${sv.paddingExtraSmall};
    }
  `,
  large: css`
    padding: ${sv.paddingLarge};

    @media ${sv.screenL} {
      padding: ${sv.defaultPadding};
    }
  `,
  extraLarge: css`
    padding: ${sv.paddingExtraLarge};

    @media ${sv.screenL} {
      padding: ${sv.paddingLarge};
    }
  `,
  huge: css`
    padding: ${sv.paddingHuge};

    @media ${sv.screenL} {
      padding: ${sv.paddingExtraLarge};
    }
  `,
  extraHuge: css`
    padding: ${sv.paddingExtraHuge};

    @media ${sv.screenL} {
      padding: ${sv.paddingHuge};
    }
  `,
  massive: css`
    padding: ${sv.paddingMassive};

    @media ${sv.screenL} {
      padding: ${sv.paddingExtraHuge};
    }
  `,
  extraSmallLeft: css`
    padding-left: ${sv.paddingExtraSmall};

    @media ${sv.screenL} {
      padding-left: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  extraSmallRight: css`
    padding-right: ${sv.paddingExtraSmall};

    @media ${sv.screenL} {
      padding-right: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  extraSmallTop: css`
    padding-top: ${sv.paddingExtraSmall};

    @media ${sv.screenL} {
      padding-top: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  extraSmallBottom: css`
    padding-bottom: ${sv.paddingExtraSmall};

    @media ${sv.screenL} {
      padding-bottom: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  smallLeft: css`
    padding-left: ${sv.paddingSmall};

    @media ${sv.screenL} {
      padding-left: ${sv.paddingExtraSmall};
    }
  `,
  smallRight: css`
    padding-right: ${sv.paddingSmall};

    @media ${sv.screenL} {
      padding-right: ${sv.paddingExtraSmall};
    }
  `,
  smallTop: css`
    padding-top: ${sv.paddingSmall};

    @media ${sv.screenL} {
      padding-top: ${sv.paddingExtraSmall};
    }
  `,
  smallBottom: css`
    padding-bottom: ${sv.paddingSmall};

    @media ${sv.screenL} {
      padding-bottom: ${sv.paddingExtraSmall};
    }
  `,
  defaultLeft: css`
    padding-left: ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding-left: ${sv.paddingSmall};
    }
  `,
  defaultRight: css`
    padding-right: ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding-right: ${sv.paddingSmall};
    }
  `,
  defaultTop: css`
    padding-top: ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding-top: ${sv.paddingSmall};
    }
  `,
  defaultBottom: css`
    padding-bottom: ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding-bottom: ${sv.paddingSmall};
    }
  `,
  largeLeft: css`
    padding-left: ${sv.paddingLarge};

    @media ${sv.screenL} {
      padding-left: ${sv.defaultPadding};
    }
  `,
  largeRight: css`
    padding-right: ${sv.paddingLarge};

    @media ${sv.screenL} {
      padding-right: ${sv.defaultPadding};
    }
  `,
  largeTop: css`
    padding-top: ${sv.paddingLarge};

    @media ${sv.screenL} {
      padding-top: ${sv.defaultPadding};
    }
  `,
  largeBottom: css`
    padding-bottom: ${sv.paddingLarge};

    @media ${sv.screenL} {
      padding-bottom: ${sv.defaultPadding};
    }
  `,
  extraLargeLeft: css`
    padding-left: ${sv.paddingExtraLarge};

    @media ${sv.screenL} {
      padding-left: ${sv.paddingLarge};
    }
  `,
  extraLargeRight: css`
    padding-right: ${sv.paddingExtraLarge};

    @media ${sv.screenL} {
      padding-right: ${sv.paddingLarge};
    }
  `,
  extraLargeTop: css`
    padding-top: ${sv.paddingExtraLarge};

    @media ${sv.screenL} {
      padding-top: ${sv.paddingLarge};
    }
  `,
  extraLargeBottom: css`
    padding-bottom: ${sv.paddingExtraLarge};

    @media ${sv.screenL} {
      padding-bottom: ${sv.paddingLarge};
    }
  `,
  hugeLeft: css`
    padding-left: ${sv.paddingHuge};

    @media ${sv.screenL} {
      padding-left: ${sv.paddingExtraLarge};
    }
  `,
  hugeRight: css`
    padding-right: ${sv.paddingHuge};

    @media ${sv.screenL} {
      padding-right: ${sv.paddingExtraLarge};
    }
  `,
  hugeTop: css`
    padding-top: ${sv.paddingHuge};

    @media ${sv.screenL} {
      padding-top: ${sv.paddingExtraLarge};
    }
  `,
  hugeBottom: css`
    padding-bottom: ${sv.paddingHuge};

    @media ${sv.screenL} {
      padding-bottom: ${sv.paddingExtraLarge};
    }
  `,
  extraHugeLeft: css`
    padding-left: ${sv.paddingExtraHuge};

    @media ${sv.screenL} {
      padding-left: ${sv.paddingHuge};
    }
  `,
  extraHugeRight: css`
    padding-right: ${sv.paddingExtraHuge};

    @media ${sv.screenL} {
      padding-right: ${sv.paddingHuge};
    }
  `,
  extraHugeTop: css`
    padding-top: ${sv.paddingExtraHuge};

    @media ${sv.screenL} {
      padding-top: ${sv.paddingHuge};
    }
  `,
  extraHugeBottom: css`
    padding-bottom: ${sv.paddingExtraHuge};

    @media ${sv.screenL} {
      padding-bottom: ${sv.paddingHuge};
    }
  `,
  massiveLeft: css`
    padding-left: ${sv.paddingMassive};

    @media ${sv.screenL} {
      padding-left: ${sv.paddingExtraHuge};
    }
  `,
  massiveRight: css`
    padding-right: ${sv.paddingMassive};

    @media ${sv.screenL} {
      padding-right: ${sv.paddingExtraHuge};
    }
  `,
  massiveTop: css`
    padding-top: ${sv.paddingMassive};

    @media ${sv.screenL} {
      padding-top: ${sv.paddingExtraHuge};
    }
  `,
  massiveBottom: css`
    padding-bottom: ${sv.paddingMassive};

    @media ${sv.screenL} {
      padding-bottom: ${sv.paddingExtraHuge};
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

export interface PaddingProps {
  /** Determines the amount of padding given to the component. If a single value, the padding is applied equally to each side */
  size?: Size | Rectangular | Variable;

  /** The content of the margin wrapper */
  children?: React.ReactNode;

  /** Prop to override any style if necessary, use sparingly */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Padding = ({ responsive, ...rest }: PaddingProps) => {
  const { children, size: rawSize, style } = useResponsiveProps<PaddingProps>(rest, responsive);

  const isUniform = typeof rawSize !== 'object';

  const size = !isUniform && _isRectangular(rawSize) ? _computeSize(rawSize) : rawSize;

  return (
    <div
      className={cx(styles.root, {
        [styles[camelCase(size as Size) as keyof typeof styles]]: isUniform && size != null,
        [styles.resetPadding]: !isUniform,
        [styles[camelCase(`${(size as Variable)?.left}_LEFT`) as keyof typeof styles]]:
          !isUniform && (size as Variable)?.left != null,
        [styles[camelCase(`${(size as Variable)?.right}_RIGHT`) as keyof typeof styles]]:
          !isUniform && (size as Variable)?.right != null,
        [styles[camelCase(`${(size as Variable)?.top}_TOP`) as keyof typeof styles]]:
          !isUniform && (size as Variable)?.top != null,
        [styles[camelCase(`${(size as Variable)?.bottom}_BOTTOM`) as keyof typeof styles]]:
          !isUniform && (size as Variable)?.bottom != null,
      })}
      style={style}>
      {children}
    </div>
  );
};
