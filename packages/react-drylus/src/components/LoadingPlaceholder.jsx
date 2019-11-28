import React from 'react';
import { css, keyframes } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';


const shimmer = keyframes`
  0% {
    background-position: -1200px 0;
  }
  100% {
    background-position: 1200px 0;
  }
`;

const styles = {
  root: css`
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
      background: ${sv.neutralLight};
      border-radius: ${sv.defaultBorderRadius};
      overflow: hidden;
      background: linear-gradient(to right,
        ${sv.neutralLight} 8%,
        ${sv.neutralLighter} 18%,
        ${sv.neutralLight} 33%
      );
      background-size: 1200px 100%;
      animation: ${shimmer} 2s forwards infinite linear;
    }
  `,
};


const LoadingPlaceholder = ({ height, width }) => {
  return (
    <div
      className={styles.root}
      style={{ height, width }} />
  );
};


LoadingPlaceholder.propTypes = {
  /** Determines the height of the placeholder */
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,

  /** Determines the height of the placeholder */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};


LoadingPlaceholder.defaultProps = {
  height: sv.defaultMargin,
  width: 200,
};


export default LoadingPlaceholder;