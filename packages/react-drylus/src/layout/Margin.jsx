import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import camelCase from 'lodash/camelCase';

import Sizes from '../base/Sizes';


const styles = {
  base: css`
    margin: ${sv.defaultMargin};
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
};


const Margin = ({
  children,
  size,
}) => {
  const isUniform = typeof size !== 'object';
  return (
    <div className={cx(styles.base, {
      [styles[camelCase(size)]]: isUniform && size,
    })}>
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
  ]).isRequired,

  /** The content of the margin wrapper */
  children: PropTypes.node,
};


export default Margin;
