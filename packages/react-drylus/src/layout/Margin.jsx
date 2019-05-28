import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import camelCase from 'lodash/camelCase';

import Sizes from '../base/Sizes';


const styles = {
  root: css`
    margin: ${sv.defaultMargin};
  `,
  resetMargin: css`
    margin: 0;
  `,
  extraSmall: css`
    margin: ${sv.marginExtraSmall};
  `,
  small: css`
    margin: ${sv.marginSmall};
  `,
  large: css`
    margin: ${sv.marginLarge};
  `,
  extraLarge: css`
    margin: ${sv.marginExtraLarge};
  `,
  extraSmallLeft: css`
    margin-left: ${sv.marginExtraSmall};
  `,
  extraSmallRight: css`
    margin-right: ${sv.marginExtraSmall};
  `,
  extraSmallTop: css`
    margin-top: ${sv.marginExtraSmall};
  `,
  extraSmallBottom: css`
    margin-bottom: ${sv.marginExtraSmall};
  `,
  smallLeft: css`
    margin-left: ${sv.marginSmall};
  `,
  smallRight: css`
    margin-right: ${sv.marginSmall};
  `,
  smallTop: css`
    margin-top: ${sv.marginSmall};
  `,
  smallBottom: css`
    margin-bottom: ${sv.marginSmall};
  `,
  defaultLeft: css`
    margin-left: ${sv.defaultMargin};
  `,
  defaultRight: css`
    margin-right: ${sv.defaultMargin};
  `,
  defaultTop: css`
    margin-top: ${sv.defaultMargin};
  `,
  defaultBottom: css`
    margin-bottom: ${sv.defaultMargin};
  `,
  largeLeft: css`
    margin-left: ${sv.marginLarge};
  `,
  largeRight: css`
    margin-right: ${sv.marginLarge};
  `,
  largeTop: css`
    margin-top: ${sv.marginLarge};
  `,
  largeBottom: css`
    margin-bottom: ${sv.marginLarge};
  `,
  extraLargeLeft: css`
    margin-left: ${sv.marginExtraLarge};
  `,
  extraLargeRight: css`
    margin-right: ${sv.marginExtraLarge};
  `,
  extraLargeTop: css`
    margin-top: ${sv.marginExtraLarge};
  `,
  extraLargeBottom: css`
    margin-bottom: ${sv.marginExtraLarge};
  `,
};


const Margin = ({
  children,
  size,
  style,
}) => {
  const isUniform = typeof size !== 'object';
  return (
    <div className={cx(styles.root, {
      [styles[camelCase(size)]]: isUniform && size,
      [styles.resetMargin]: ! isUniform,
      [styles[camelCase(`${size.left}_LEFT`)]]: ! isUniform && size.left,
      [styles[camelCase(`${size.right}_RIGHT`)]]: ! isUniform && size.right,
      [styles[camelCase(`${size.top}_TOP`)]]: ! isUniform && size.top,
      [styles[camelCase(`${size.bottom}_BOTTOM`)]]: ! isUniform && size.bottom,
    })} style={style}>
      {children}
    </div>
  );
};


Margin.propTypes = {
  /** Determines the amount of margin given to the component. If a single value, the margin is applied equally to each side */
  size: PropTypes.oneOfType([
    PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
    PropTypes.shape({
      left: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
      right: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
      bottom: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
      top: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.EXTRA_SMALL, Sizes.LARGE, Sizes.EXTRA_LARGE ]),
    }),
  ]),

  /** The content of the margin wrapper */
  children: PropTypes.node,

  /** Prop to override any style if necessary, use sparingly */
  style: PropTypes.object,
};


export default Margin;
