import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
// import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
  `,
};


const BaseFilter = ({
  clearLabel,
}) => {
  return (
    <div className={styles.root}>

    </div>
  );
};


BaseFilter.propTypes = {
  /** Text shown in the last row of the panel */
  clearLabel: PropTypes.string,

  /** The text shown when the filter is not active, or when more than 1 value is selected */
  label: PropTypes.string.isRequired,

  /** Triggered when the clear button is clicked */
  onClear: PropTypes.func,

  /** Content displayed within the filter panel */
  children: PropTypes.node,
};


BaseFilter.defaultProps = {
  clearLabel: 'Clear',
};


export const SelectFilter = ({
  options,
}) => {
  return (
    <BaseFilter>
    </BaseFilter>
  );
};


SelectFilter.propTypes = {

};


export default BaseFilter;
