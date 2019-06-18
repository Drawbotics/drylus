import React from 'react';
import { css, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import '../utils/normalize';


injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

  html {
    font-size: ${sv.defaultFontSize};
    line-height: ${sv.defaultLineHeight};
    letter-spacing: ${sv.defaultLetterSpacing};
  }

  a {
    cursor: default;
    text-decoration: none;
    color: initial;
  }
`;


const styles = {
  root: css`
    * {
      font-family: ${sv.defaultFontFamily};
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
