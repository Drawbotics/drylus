import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  root: css`
    height: 100vh;
    width: 100vw;
  `,
};


const Page = ({ children }) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
};


Page.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Page;
