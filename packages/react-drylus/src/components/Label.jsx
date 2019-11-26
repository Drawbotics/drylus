import React from 'react';
import { css, cx, keyframes } from 'emotion';
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
  withPlaceholderOverlay: css`
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


const Label = ({
  children,
  ellipsized,
  style,
  isPlaceholder,
}) => {
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.ellipsized]: ellipsized,
        [styles.withPlaceholderOverlay]: isPlaceholder,
      })}>
      {children}
    </div>
  );
};


Label.propTypes = {
  /** Just text for the label */
  children: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),

  /** Cuts the text to stop at the max size of the container */
  ellipsized: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder: PropTypes.bool,
};


export default Label;
