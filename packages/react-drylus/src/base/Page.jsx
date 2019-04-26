import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  base: css`
    min-height: 100vh;
    display: flex;
  `,
};


const Page = ({ children }) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  );
};


Page.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Page;
