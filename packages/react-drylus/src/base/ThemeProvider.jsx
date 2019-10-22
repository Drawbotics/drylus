import React, { Fragment } from 'react';
import { css, cx } from 'emotion';
import { Global } from '@emotion/core';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import normalize from '../utils/normalize';


normalize();


export const styles = {
  global: css`
    @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

    html, body {
      font-size: ${sv.defaultFontSize};
      line-height: ${sv.defaultLineHeight};
      letter-spacing: ${sv.defaultLetterSpacing};
      -webkit-font-smoothing: auto;
      -webkit-overflow-scrolling: touch;
    }
  `,
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
