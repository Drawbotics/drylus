import React from 'react';
import PropTypes from 'prop-types';


const defaultOptions = {

};

const DateFormat = ({ value }) => {
  const date = value ?? new Date();
  const formatter = new Intl.DateTimeFormat(defaultOptions);
  return (
    <span>{formatter.format(date)}</span>
  );
};

DateFormat.propTypes = {
  /** If no date is passed, today is displayed */
  value: PropTypes.instanceOf(Date),
}


export default DateFormat;