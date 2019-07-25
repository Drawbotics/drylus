import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
    background: ${sv.backgroundColor};
  `,
  fullHeight: css`
    flex: 1;
  `,
  children: css`
    max-width: ${sv.maxWidthLarge};
    margin: auto;
  `,
  fullWidth: css`
    max-width: none;
  `,
};


const Content = ({ children, fullHeight, fullWidth }) => {
  return (
    <div className={cx(styles.root, {
      [styles.fullHeight]: fullHeight,
    })}>
      <div className={cx(styles.children, { [styles.fullWidth]: fullWidth })}>
        {children}
      </div>
    </div>
  );
};


Content.propTypes = {
  children: PropTypes.node.isRequired,

  /** If true, the content will take all the height available */
  fullHeight: PropTypes.bool,

  /** If true, the content will not be limited to 1200px */
  fullWidth: PropTypes.bool,
};


export default Content;
