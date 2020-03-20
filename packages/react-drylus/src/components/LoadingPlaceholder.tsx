import sv from '@drawbotics/drylus-style-vars';
import { css, keyframes } from 'emotion';
import React from 'react';

import { Responsive } from '../types';
import { useResponsiveProps } from '../utils/hooks';

const shimmer = keyframes`
  0% {
    background-position: -1200px 0;
  }
  100% {
    background-position: 1200px 0;
  }
`;

const styles = {
  shimmer: css`
    position: relative;
    pointer-events: none;

    &::after {
      content: ' ';
      position: absolute;
      z-index: 9;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: ${sv.neutral};
      border-radius: ${sv.defaultBorderRadius};
      overflow: hidden;
      background-image: linear-gradient(
        to right,
        ${sv.neutral} 8%,
        ${sv.neutralLight} 18%,
        ${sv.neutral} 33%
      );
      background-size: 1200px 100%;
      animation: ${shimmer} 2s forwards infinite linear;
    }
  `,
};

export const placeholderStyles = styles;

interface LoadingPlaceholderProps {
  /**
   * Determines the height of the placeholder
   * @default sv.defaultMargin
   */
  height?: number | string;

  /**
   * Determines the height of the placeholder
   * @default 200
   */
  width?: number | string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const LoadingPlaceholder = ({ responsive, ...rest }: LoadingPlaceholderProps) => {
  const { height = sv.defaultMargin, width = 200 } = useResponsiveProps<LoadingPlaceholderProps>(
    rest,
    responsive,
  );

  return <div className={styles.shimmer} style={{ height, width }} />;
};
