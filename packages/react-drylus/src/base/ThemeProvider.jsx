import React from 'react';
import { css, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import '../utils/normalize';


injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

  html, body {
    font-size: ${sv.defaultFontSize};
    line-height: ${sv.defaultLineHeight};
    letter-spacing: ${sv.defaultLetterSpacing};
  }
`;


export const styles = {
  root: css`
    * {
      font-family: ${sv.defaultFontFamily};
    }

    a {
      cursor: default;
      text-decoration: none;
      color: initial;
    }

    b, strong {
      font-weight: 500;
    }
  `,
};


const ThemeProvider = ({ children, style }) => {
  return (
    <div className={styles.root} style={style}>
      {children}
    </div>
  );
};


ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};


export default ThemeProvider;
