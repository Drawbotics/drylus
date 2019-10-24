import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import camelCase from 'lodash/camelCase';

import Sizes from '../base/Sizes';
import { useResponsiveProps } from '../utils/hooks';


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


const Margin = ({
  responsive,
  ...rest,
}) => {
  const { children, size, style } = useResponsiveProps(rest, responsive);

  const isUniform = typeof size !== 'object';
  return (
    <div className={cx(styles.root, {
      [styles[camelCase(size?.description)]]: isUniform && size,
      [styles.resetMargin]: ! isUniform,
      [styles[camelCase(`${size?.left?.description}_LEFT`)]]: ! isUniform && size?.left,
      [styles[camelCase(`${size?.right?.description}_RIGHT`)]]: ! isUniform && size?.right,
      [styles[camelCase(`${size?.top?.description}_TOP`)]]: ! isUniform && size?.top,
      [styles[camelCase(`${size?.bottom?.description}_BOTTOM`)]]: ! isUniform && size?.bottom,
    })} style={style}>
      {children}
    </div>
  );
};


Margin.propTypes = {
  /** Determines the amount of margin given to the component. If a single value, the margin is applied equally to each side */
  size: PropTypes.oneOfType([
    PropTypes.oneOf([
      Sizes.DEFAULT,
      Sizes.SMALL,
      Sizes.EXTRA_SMALL,
      Sizes.LARGE,
      Sizes.EXTRA_LARGE,
      Sizes.HUGE,
      Sizes.EXTRA_HUGE,
      Sizes.MASSIVE,
    ]),
    PropTypes.shape({
      left: PropTypes.oneOf([
        Sizes.DEFAULT,
        Sizes.SMALL,
        Sizes.EXTRA_SMALL,
        Sizes.LARGE,
        Sizes.EXTRA_LARGE,
        Sizes.HUGE,
        Sizes.EXTRA_HUGE,
        Sizes.MASSIVE,
      ]),
      right: PropTypes.oneOf([
        Sizes.DEFAULT,
        Sizes.SMALL,
        Sizes.EXTRA_SMALL,
        Sizes.LARGE,
        Sizes.EXTRA_LARGE,
        Sizes.HUGE,
        Sizes.EXTRA_HUGE,
        Sizes.MASSIVE,
      ]),
      bottom: PropTypes.oneOf([
        Sizes.DEFAULT,
        Sizes.SMALL,
        Sizes.EXTRA_SMALL,
        Sizes.LARGE,
        Sizes.EXTRA_LARGE,
        Sizes.HUGE,
        Sizes.EXTRA_HUGE,
        Sizes.MASSIVE,
      ]),
      top: PropTypes.oneOf([
        Sizes.DEFAULT,
        Sizes.SMALL,
        Sizes.EXTRA_SMALL,
        Sizes.LARGE,
        Sizes.EXTRA_LARGE,
        Sizes.HUGE,
        Sizes.EXTRA_HUGE,
        Sizes.MASSIVE,
      ]),
    }),
  ]),

  /** The content of the margin wrapper */
  children: PropTypes.node,

  /** Prop to override any style if necessary, use sparingly */
  style: PropTypes.object,

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
};


export default Margin;
