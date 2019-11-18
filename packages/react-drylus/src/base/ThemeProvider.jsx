import React, { Fragment } from 'react';
import { cx, css } from 'emotion';
import { Global, css as globalCSS } from '@emotion/core';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import normalize from '../utils/normalize';


normalize();


export const staticStyles = `
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

  html, body {
    font-size: ${sv.defaultFontSize};
    line-height: ${sv.defaultLineHeight};
    letter-spacing: ${sv.defaultLetterSpacing};
    -webkit-font-smoothing: auto;
    -webkit-overflow-scrolling: touch;
  }
`


export const styles = {
  global: globalCSS(staticStyles),
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
    <Fragment>
      <Global styles={styles.global} />
      <div className={cx(styles.root, styles.wrapper)} style={style}>
        {children}
      </div>
    </Fragment>
  );
};


ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  
  /** Used for style overrides */
  style: PropTypes.object,
};


export default ThemeProvider;
