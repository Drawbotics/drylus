import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  root: css`
    height: 100vh;
    width: 100vw;
    ${'' /* flex: 1;
    min-height: 0; */}
  `,
};

const Page = ({ children, style }) => {
  return (
    <div className={styles.root} style={style}>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,

  /** Used for style overrides */
  style: PropTypes.object,
};

export default Page;
