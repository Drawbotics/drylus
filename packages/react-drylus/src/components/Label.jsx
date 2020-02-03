import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { styles as placeholderStyles } from './LoadingPlaceholder';

const styles = {
  root: css`
    display: inline-block;
    color: ${sv.colorTertiary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.88rem;

    @media ${sv.screenL} {
      font-size: 0.8rem;
    }
  `,
  ellipsized: css`
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};

const Label = ({ children, ellipsized, style, isPlaceholder }) => {
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.ellipsized]: ellipsized,
        [placeholderStyles.shimmer]: isPlaceholder,
      })}>
      {children}
    </div>
  );
};

Label.propTypes = {
  /** Just text for the label */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Cuts the text to stop at the max size of the container */
  ellipsized: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder: PropTypes.bool,
};

export default Label;
