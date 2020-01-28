import React from 'react';
import PropTypes from 'prop-types';


const defaultOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const TimePeriod = {
  YEAR_AGO: -365,
  WEEK_AGO: -7,
  DAYS_AGO: -48,
  DAY_AGO: -24,
  IN_A_DAY: 24,
  IN_2_DAYS: 48,
  IN_A_WEEK: 7,
  IN_A_YEAR: 365,
  NOW: 0,
};

function _generateOptions(date) {
  const today = new Date();
  const hoursDifference = Math.round((date - today) / 36e5);
  const daysDifference = Math.round(hoursDifference / 24);

  // Time in the future
  if (daysDifference >= TimePeriod.IN_A_YEAR) {
    // 30/12/2021
    return defaultOptions;
  }
  else if (daysDifference >= TimePeriod.IN_A_WEEK) {
    // 6 May
    return { day: 'numeric', month: 'long' };
  }
  else if (hoursDifference >= TimePeriod.IN_2_DAYS) {
    // Mon, 3 Jan, 8:00 AM 
    return { day: 'numeric', month: 'short', weekday: 'short' };
  }
  else if (hoursDifference >= TimePeriod.IN_A_DAY) {
    // Tomorrow at 8:30 AM
  }
  else if (hoursDifference >= TimePeriod.NOW) {
    // Today at 1:32 PM
  }
  // Time in the past
  else if (hoursDifference >= TimePeriod.DAY_AGO) {
    // 1h32 ago
  }
  else if (hoursDifference >= TimePeriod.DAYS_AGO) {
    // Yesterday at 2:32 PM
  }
  else if (hoursDifference >= TimePeriod.WEEK_AGO) {
    // Last Mon 6 Jun, 8:00 AM
  }
  else if (hoursDifference >= TimePeriod.YEAR_AGO) {
    // 6 Apr
  }
  else {
    // 30/12/2019
    return defaultOptions;
  }

  return defaultOptions;
}

const DateFormat = ({ value, locale }) => {
  const date = value ?? new Date();
  const options = _generateOptions(date);
  // console.log(locale, options);
  const formatter = locale != null
    ? new Intl.DateTimeFormat(locale, options)
    : new Intl.DateTimeFormat(options);
  return (
    <span>{formatter.format(date)}</span>
  );
};

DateFormat.propTypes = {
  /** If no date is passed, today is displayed */
  value: PropTypes.instanceOf(Date),

  /** If not specified, takes the browser defined one */
  locale: PropTypes.string,
};


export default DateFormat;