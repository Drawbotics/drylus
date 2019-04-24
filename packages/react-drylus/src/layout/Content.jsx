import React from 'react';
import { css, cx } from 'emotion';
// import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  base: css`
    background: ${sv.neutralLight};
  `,
  fullHeight: css`
    height: 100%;
  `,
  fullWidth: css`
    max-width: none;
  `,
  children: css`
    max-width: ${sv.maxWidthLarge};
    margin: auto;
  `,
};


const Content = ({ children, fullHeight, fullWidth }) => {
  return (
    <div className={cx(styles.base, {
      [styles.fullHeight]: fullHeight,
    })}>
      <div className={cx(styles.children, { [styles.fullWidth]: fullWidth })}>
        {children}
      </div>
    </div>
  );
};


export default Content;
