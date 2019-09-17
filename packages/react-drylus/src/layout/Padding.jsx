import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import camelCase from 'lodash/camelCase';

import Sizes from '../base/Sizes';


const styles = {
  root: css`
    padding: ${sv.defaultPadding};

    @media ${sv.phoneLandscape} {
      padding: ${sv.paddingSmall};
    }
  `,
  resetPadding: css`
    padding: 0;

    @media ${sv.phoneLandscape} {
      padding: 0;
    }
  `,
  extraSmall: css`
    padding: ${sv.paddingExtraSmall};

    @media ${sv.phoneLandscape} {
      padding: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  small: css`
    padding: ${sv.paddingSmall};

    @media ${sv.phoneLandscape} {
      padding: ${sv.paddingExtraSmall};
    }
  `,
  large: css`
    padding: ${sv.paddingLarge};

    @media ${sv.phoneLandscape} {
      padding: ${sv.defaultPadding};
    }
  `,
  extraLarge: css`
    padding: ${sv.paddingExtraLarge};

    @media ${sv.phoneLandscape} {
      padding: ${sv.paddingLarge};
    }
  `,
  extraSmallLeft: css`
    padding-left: ${sv.paddingExtraSmall};

    @media ${sv.phoneLandscape} {
      padding-left: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  extraSmallRight: css`
    padding-right: ${sv.paddingExtraSmall};

    @media ${sv.phoneLandscape} {
      padding-right: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  extraSmallTop: css`
    padding-top: ${sv.paddingExtraSmall};

    @media ${sv.phoneLandscape} {
      padding-top: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  extraSmallBottom: css`
    padding-bottom: ${sv.paddingExtraSmall};

    @media ${sv.phoneLandscape} {
      padding-bottom: calc(${sv.paddingExtraSmall} / 2);
    }
  `,
  smallLeft: css`
    padding-left: ${sv.paddingSmall};

    @media ${sv.phoneLandscape} {
      padding-left: ${sv.paddingExtraSmall};
    }
  `,
  smallRight: css`
    padding-right: ${sv.paddingSmall};

    @media ${sv.phoneLandscape} {
      padding-right: ${sv.paddingExtraSmall};
    }
  `,
  smallTop: css`
    padding-top: ${sv.paddingSmall};

    @media ${sv.phoneLandscape} {
      padding-top: ${sv.paddingExtraSmall};
    }
  `,
  smallBottom: css`
    padding-bottom: ${sv.paddingSmall};

    @media ${sv.phoneLandscape} {
      padding-bottom: ${sv.paddingExtraSmall};
    }
  `,
  defaultLeft: css`
    padding-left: ${sv.defaultPadding};

    @media ${sv.phoneLandscape} {
      padding-left: ${sv.paddingSmall};
    }
  `,
  defaultRight: css`
    padding-right: ${sv.defaultPadding};

    @media ${sv.phoneLandscape} {
      padding-right: ${sv.paddingSmall};
    }
  `,
  defaultTop: css`
    padding-top: ${sv.defaultPadding};

    @media ${sv.phoneLandscape} {
      padding-top: ${sv.paddingSmall};
    }
  `,
  defaultBottom: css`
    padding-bottom: ${sv.defaultPadding};

    @media ${sv.phoneLandscape} {
      padding-bottom: ${sv.paddingSmall};
    }
  `,
  largeLeft: css`
    padding-left: ${sv.paddingLarge};

    @media ${sv.phoneLandscape} {
      padding-left: ${sv.defaultPadding};
    }
  `,
  largeRight: css`
    padding-right: ${sv.paddingLarge};

    @media ${sv.phoneLandscape} {
      padding-right: ${sv.defaultPadding};
    }
  `,
  largeTop: css`
    padding-top: ${sv.paddingLarge};

    @media ${sv.phoneLandscape} {
      padding-top: ${sv.defaultPadding};
    }
  `,
  largeBottom: css`
    padding-bottom: ${sv.paddingLarge};

    @media ${sv.phoneLandscape} {
      padding-bottom: ${sv.defaultPadding};
    }
  `,
  extraLargeLeft: css`
    padding-left: ${sv.paddingExtraLarge};

    @media ${sv.phoneLandscape} {
      padding-left: ${sv.paddingLarge};
    }
  `,
  extraLargeRight: css`
    padding-right: ${sv.paddingExtraLarge};

    @media ${sv.phoneLandscape} {
      padding-right: ${sv.paddingLarge};
    }
  `,
  extraLargeTop: css`
    padding-top: ${sv.paddingExtraLarge};

    @media ${sv.phoneLandscape} {
      padding-top: ${sv.paddingLarge};
    }
  `,
  extraLargeBottom: css`
    padding-bottom: ${sv.paddingExtraLarge};

    @media ${sv.phoneLandscape} {
      padding-bottom: ${sv.paddingLarge};
    }
  `,
};


const Padding = ({
  children,
  size,
  style,
}) => {
  const isUniform = typeof size !== 'object';
  return (
    <div className={cx(styles.root, {
      [styles[camelCase(size?.description)]]: isUniform && size,
      [styles.resetPadding]: ! isUniform,
      [styles[camelCase(`${size?.left?.description}_LEFT`)]]: ! isUniform && size?.left,
      [styles[camelCase(`${size?.right?.description}_RIGHT`)]]: ! isUniform && size?.right,
      [styles[camelCase(`${size?.top?.description}_TOP`)]]: ! isUniform && size?.top,
      [styles[camelCase(`${size?.bottom?.description}_BOTTOM`)]]: ! isUniform && size?.bottom,
    })} style={style}>
      {children}
    </div>
  );
};


Padding.propTypes = {
  /** Determines the amount of padding given to the component. If a single value, the padding is applied equally to each side */
  size: PropTypes.oneOfType([
    PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
    PropTypes.shape({
      left: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
      right: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
      bottom: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
      top: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
    }),
  ]),

  /** The content of the padding wrapper */
  children: PropTypes.node,

  /** Prop to override any style if necessary, use sparingly */
  style: PropTypes.object,
};


export default Padding;
