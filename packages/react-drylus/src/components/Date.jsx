import React from 'react';
import PropTypes from 'prop-types';


const Date = ({ value }) => {
  const date = value ?? new Date();
  return '';
};

Date.propTypes = {
  /** If no date is passed, today is displayed */
  value: PropTypes.instanceOf(Date),
}


export default Date;