import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';


const styles = {
  root: css`
    height: 1px;
    width: 100%;
    flex: 1;
    background: ${sv.neutralLight};
  `,
  vertical: css`
    width: 1px;
    height: 100%;
  `,
};


const Separator = ({
  vertical,
}) => {
  return (
    <div className={cx(styles.root, { [styles.vertical]: vertical })} />
  );
};


Separator.propTypes = {
  /** If true, the separator is rendered in a vertical fashion, by default it takes the full width of the container */
  vertical: PropTypes.bool,
};


Separator.defaultProps = {
  vertical: false,
};


export default Separator;
