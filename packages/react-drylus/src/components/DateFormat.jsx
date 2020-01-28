import React from 'react';
import PropTypes from 'prop-types';
import Enum from '@drawbotics/enums';
import omit from 'lodash/omit';


const defaultTranslations = {
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',
};


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

export const DateFormatShowTime = new Enum(
  'DEFAULT',
  'ALWAYS',
  'NEVER',
);

function _getCurrentLocale() {
  if (navigator.languages != null && navigator.languages.length != null) {
    return navigator.languages[0];
  }
  else {
    return navigator.userLanguage
      || navigator.language
      || navigator.browserLanguage
      || 'en-GB';
  }
}

function _getDifferenceFromToday(date) {
  const today = new Date();
  const hoursDifference = Math.round((date - today) / 36e5);
  const daysDifference = Math.round(hoursDifference / 24);

  return {
    hoursDifference,
    daysDifference,
  };
}

function _generateOptions({ date, showTime, activeLocale }) {
  const { hoursDifference, daysDifference } = _getDifferenceFromToday(date);
  let options = {};

  // Time in the future
  if (daysDifference >= TimePeriod.IN_A_YEAR) {
    options = defaultOptions;
  }
  else if (daysDifference >= TimePeriod.IN_A_WEEK) {
    options = { day: 'numeric', month: 'long' };
  }
  else if (hoursDifference >= TimePeriod.IN_2_DAYS) {
    options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    };
  }
  else if (hoursDifference >= TimePeriod.IN_A_DAY) {
    // Tomorrow at 8:30 AM
    options = {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    };
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
    options = defaultOptions;
  }

  // If french or dutch, we omit AM/PM
  if (activeLocale.includes('fr') || activeLocale.includes('nl')) {
    options.hour12 = false;
  }
  else {
    options.hour12 = true;
  }

  if (showTime === DateFormatShowTime.ALWAYS) {
    options = {
      ...options,
      hour: 'numeric',
      minute: '2-digit',
    };
  }
  else if (showTime === DateFormatShowTime.NEVER) {
    options = omit(options, ['hour', 'minute']);
  }

  return options;
}

const DateFormat = ({ value, locale, showTime }) => {
  const date = value ?? new Date();
  const activeLocale = locale ?? _getCurrentLocale();
  const options = _generateOptions({ date, showTime, activeLocale });
  const formatter = new Intl.DateTimeFormat(activeLocale, options);

  const { hoursDifference } = _getDifferenceFromToday(date);

  // const prefix = hoursDifference

  return (
    <span>{formatter.format(date)}</span>
  );
};

DateFormat.propTypes = {
  /** If no date is passed, today is displayed */
  value: PropTypes.instanceOf(Date),

  /** If not specified, takes the browser defined one */
  locale: PropTypes.string,

  /** Shows the hour/minutes, default depends on the distance from today */
  showHour: PropTypes.oneOf([
    DateFormatShowTime.DEFAULT,
    DateFormatShowTime.ALWAYS,
    DateFormatShowTime.NEVER,
  ]),
};

DateFormat.defaultProps = {
  showHour: DateFormatShowTime.DEFAULT,
};


export default DateFormat;