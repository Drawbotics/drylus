import { Global, css as globalCSS } from '@emotion/core';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { globalStyles, root } from '../utils/inject-global-styles';
import normalize from '../utils/normalize';

export const styles = {
  global: globalCSS(globalStyles),
  normalize: globalCSS(normalize),
  root: css(root),
  wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
};

const ThemeProvider = ({ children, style }) => {
  return (
    <Fragment>
      <Global styles={[styles.global, styles.normalize]} />
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
