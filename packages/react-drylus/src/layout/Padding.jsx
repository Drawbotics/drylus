import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import camelCase from 'lodash/camelCase';

import Sizes from '../base/Sizes';


const styles = {
  root: css`
    padding: ${sv.defaultPadding};
  `,
  resetPadding: css`
    padding: 0;
  `,
  extraSmall: css`
    padding: ${sv.paddingExtraSmall};
  `,
  small: css`
    padding: ${sv.paddingSmall};
  `,
  large: css`
    padding: ${sv.paddingLarge};
  `,
  extraLarge: css`
    padding: ${sv.paddingExtraLarge};
  `,
  extraSmallLeft: css`
    padding-left: ${sv.paddingExtraSmall};
  `,
  extraSmallRight: css`
    padding-right: ${sv.paddingExtraSmall};
  `,
  extraSmallTop: css`
    padding-top: ${sv.paddingExtraSmall};
  `,
  extraSmallBottom: css`
    padding-bottom: ${sv.paddingExtraSmall};
  `,
  smallLeft: css`
    padding-left: ${sv.paddingSmall};
  `,
  smallRight: css`
    padding-right: ${sv.paddingSmall};
  `,
  smallTop: css`
    padding-top: ${sv.paddingSmall};
  `,
  smallBottom: css`
    padding-bottom: ${sv.paddingSmall};
  `,
  defaultLeft: css`
    padding-left: ${sv.defaultPadding};
  `,
  defaultRight: css`
    padding-right: ${sv.defaultPadding};
  `,
  defaultTop: css`
    padding-top: ${sv.defaultPadding};
  `,
  defaultBottom: css`
    padding-bottom: ${sv.defaultPadding};
  `,
  largeLeft: css`
    padding-left: ${sv.paddingLarge};
  `,
  largeRight: css`
    padding-right: ${sv.paddingLarge};
  `,
  largeTop: css`
    padding-top: ${sv.paddingLarge};
  `,
  largeBottom: css`
    padding-bottom: ${sv.paddingLarge};
  `,
  extraLargeLeft: css`
    padding-left: ${sv.paddingExtraLarge};
  `,
  extraLargeRight: css`
    padding-right: ${sv.paddingExtraLarge};
  `,
  extraLargeTop: css`
    padding-top: ${sv.paddingExtraLarge};
  `,
  extraLargeBottom: css`
    padding-bottom: ${sv.paddingExtraLarge};
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
