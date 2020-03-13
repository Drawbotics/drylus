import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Style } from '../types';
import { placeholderStyles } from './LoadingPlaceholder';

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

interface LabelProps {
  /** Just text for the label */
  children?: string | React.ReactNode;

  /** Cuts the text to stop at the max size of the container */
  ellipsized?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;
}

export const Label = ({ children, ellipsized, style, isPlaceholder }: LabelProps) => {
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
