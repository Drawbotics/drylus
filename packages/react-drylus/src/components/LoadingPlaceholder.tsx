import sv from '@drawbotics/drylus-style-vars';
import { css, cx, keyframes } from 'emotion';
import React from 'react';

import { Responsive, Style } from '../types';
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

export interface LoadingPlaceholderProps {
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

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const LoadingPlaceholder = ({ responsive, ...rest }: LoadingPlaceholderProps) => {
  const { height = sv.defaultMargin, width = 200, style, className } = useResponsiveProps<
    LoadingPlaceholderProps
  >(rest, responsive);

  return <div className={cx(styles.shimmer, className)} style={{ height, width, ...style }} />;
};
