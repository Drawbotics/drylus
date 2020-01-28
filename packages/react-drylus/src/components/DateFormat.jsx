import React from 'react';
import PropTypes from 'prop-types';

const DateFormat = ({ value }) => {
  const date = value ?? new Date();
  return '';
};

DateFormat.propTypes = {
  /** If no date is passed, today is displayed */
  value: PropTypes.instanceOf(Date),
}


export default DateFormat;