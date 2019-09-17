import React from 'react';
import { css, injectGlobal, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import normalize from '../utils/normalize';


injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

  html, body {
    font-size: ${sv.defaultFontSize};
    line-height: ${sv.defaultLineHeight};
    letter-spacing: ${sv.defaultLetterSpacing};
    -webkit-font-smoothing: auto;

    @media ${sv.phoneLandscape} {
      font-size: calc(${sv.defaultFontSize} - 1px);
    }
  }
`;


normalize();


export const styles = {
  root: css`
    * {
      font-family: ${sv.defaultFontFamily};
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    b, strong {
      font-weight: 500;
    }
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
};


const ThemeProvider = ({ children, style }) => {
  return (
    <div className={cx(styles.root, styles.wrapper)} style={style}>
      {children}
    </div>
  );
};


ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  
  /** Used for style overrides */
  style: PropTypes.object,
};


export default ThemeProvider;
