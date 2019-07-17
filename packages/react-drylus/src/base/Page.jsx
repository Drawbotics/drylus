import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  root: css`
    height: 100vh;
    width: 100vw;
    flex: 1;
    min-height: 0;
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
  style: PropTypes.object,
};


export default Page;
