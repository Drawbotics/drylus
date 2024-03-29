import Dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

import { getCurrentLocale, getTimeDifferenceFromToday } from '../';
import extendedLocales from './extended-locales';

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

export enum ShowDateTime {
  DEFAULT = 'DEFAULT',
  ALWAYS = 'ALWAYS',
  NEVER = 'NEVER',
}

Dayjs.extend(calendar);

export function generateDisplayedDate({
  date,
  options = {},
  locale = getCurrentLocale(),
}: {
  date: Date;
  options?: any;
  locale?: string;
}): string {
  const {
    hoursDifference,
    daysDifference,
    isTomorrow,
    isToday,
    isSameYear,
    minutesDifference,
  } = getTimeDifferenceFromToday(date);

  const localeRoot = locale.split('-')[0];

  let dateFormat = '';
  let timeFormat = undefined;

  // Time in the future
  if (daysDifference >= TimePeriod.IN_A_YEAR) {
    dateFormat = 'DD/MM/YYYY';
  } else if (daysDifference >= TimePeriod.IN_A_WEEK) {
    dateFormat = 'D MMM';

    if (!isSameYear) {
      dateFormat = dateFormat + ' YYYY';
    }
  } else if (hoursDifference >= TimePeriod.IN_2_DAYS) {
    dateFormat = 'ddd D MMM';
    timeFormat = 'HH:mm';
  } else if (hoursDifference >= TimePeriod.IN_A_DAY || isTomorrow) {
    dateFormat = 'D MMM';
    timeFormat = 'HH:mm';
  }
  // Time in the past
  else if (
    hoursDifference >= TimePeriod.DAY_AGO &&
    hoursDifference < TimePeriod.NOW &&
    isToday &&
    options.showTime !== ShowDateTime.NEVER
  ) {
    const relativeMinutesDiff = hoursDifference * 60 - minutesDifference;

    Dayjs.extend(relativeTime);

    if (extendedLocales[localeRoot as keyof typeof extendedLocales]) {
      Dayjs.extend(updateLocale);
      Dayjs.updateLocale(
        localeRoot,
        extendedLocales[localeRoot as keyof typeof extendedLocales].relative({
          relativeMinutesDiff,
          hoursDifference,
        }),
      );
    }

    return Dayjs(date)
      .locale(localeRoot)
      .fromNow();
  } else if (daysDifference >= TimePeriod.WEEK_AGO && hoursDifference < TimePeriod.DAYS_AGO) {
    dateFormat = 'ddd, D MMM';
    timeFormat = 'HH:mm';
  } else if (daysDifference >= TimePeriod.YEAR_AGO) {
    // 6 Apr
    dateFormat = 'D MMM';

    if (!isSameYear) {
      dateFormat = dateFormat + ' YYYY';
    }
  } else {
    dateFormat = 'DD/MM/YYYY';
  }

  if (options?.showTime === ShowDateTime.ALWAYS) {
    timeFormat = 'HH:mm';
  } else if (options?.showTime === ShowDateTime.NEVER) {
    timeFormat = undefined;
  }

  // If french or dutch, we don't show AM/PM
  if (!localeRoot.includes('fr') && !localeRoot.includes('nl')) {
    timeFormat = timeFormat ? timeFormat.replace(/HH/g, 'h') + ' A' : undefined;
  }

  if (options?.asArchive) {
    dateFormat = 'YYYY-MM-DD';
  }

  const outputFormat = options?.format ?? dateFormat + (timeFormat ? `, ${timeFormat}` : '');

  const withLocale = Dayjs(date).locale(localeRoot);

  const result = options?.format
    ? withLocale.format(outputFormat)
    : extendedLocales[localeRoot as keyof typeof extendedLocales]
    ? withLocale.calendar(
        undefined,
        extendedLocales[localeRoot as keyof typeof extendedLocales].calendar({
          format: outputFormat,
          withTime: options.showTime !== ShowDateTime.NEVER,
        }),
      )
    : withLocale.format(outputFormat);

  if (localeRoot.includes('fr')) {
    return result.replace(':', 'h');
  } else if (localeRoot.includes('nl')) {
    return result.replace(':', 'u');
  }

  return result;
}
