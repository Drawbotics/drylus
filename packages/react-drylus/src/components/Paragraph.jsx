import React from 'react';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';


const styles = {
  root: css`
    color: ${sv.colorPrimary};
    line-height: calc(${sv.defaultLineHeight} * 1.5);
  `,
};


const Paragraph = ({ children }) => {
  return <p className={styles.root}>{children}</p>;
};


Paragraph.propTypes = {
  /** Text displayed by the paragraph */
  children: PropTypes.node,
};


export default Paragraph;
