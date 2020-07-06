import 'dayjs/locale/fr';
import 'dayjs/locale/nl';
import 'dayjs/locale/en';

import last from 'lodash/last';
import tail from 'lodash/tail';

const en = {
  relative: ({
    hoursDifference,
    relativeMinutesDiff,
  }: {
    hoursDifference: number;
    relativeMinutesDiff: number;
  }) => ({
    relativeTime: {
      future: 'in %s',
      past: hoursDifference > 0 ? '%s ago' : `${hoursDifference * -1}h${relativeMinutesDiff} ago`,
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  }),
  calendar: ({ format, withTime = true }: { format: string; withTime: boolean }) => ({
    sameElse: format,
    nextWeek: format,
    lastDay: withTime ? `[yesterday at] h:mm A` : `[yesterday]`,
    sameDay: withTime ? `[today at] h:mm A` : `[today]`,
    lastWeek: `[last] ${format}`,
    nextDay: `[tomorrow], ${format}`,
  }),
};

const fr = {
  relative: ({
    hoursDifference,
    relativeMinutesDiff,
  }: {
    hoursDifference: number;
    relativeMinutesDiff: number;
  }) => ({
    relativeTime: {
      future: 'dans %s',
      past:
        hoursDifference > 0 ? 'il y a %s' : `il y a ${hoursDifference * -1}h${relativeMinutesDiff}`,
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans',
    },
  }),
  calendar: ({ format, withTime = true }: { format: string; withTime: boolean }) => ({
    sameElse: format,
    nextWeek: format,
    lastWeek: `${format.split(',')[0]} [passé],${tail(format.split(','))}`,
    nextDay: withTime
      ? `[demain], ${format.split(',').slice(0, -1)} [à]${last(format.split(','))}`
      : `[demain], ${format.split(',').slice(0, -1)}`,
    sameDay: withTime ? `[aujourd'hui à] HH:mm` : `[aujourd'hui]`,
  }),
};

const nl = {
  relative: ({
    hoursDifference,
    relativeMinutesDiff,
  }: {
    hoursDifference: number;
    relativeMinutesDiff: number;
  }) => ({
    relativeTime: {
      future: 'over %s',
      past:
        hoursDifference > 0
          ? '%s geleden'
          : `${hoursDifference * -1}u${relativeMinutesDiff} geleden`,
      s: 'een paar seconden',
      m: 'een minuut',
      mm: '%d minuten',
      h: 'een uur',
      hh: '%d uur',
      d: 'een dag',
      dd: '%d dagen',
      M: 'een maand',
      MM: '%d maanden',
      y: 'een jaar',
      yy: '%d jaar',
    },
  }),
  calendar: ({ format, withTime = true }: { format: string; withTime: boolean }) => ({
    sameElse: format,
    nextWeek: format,
    lastWeek: `[vorige] ${format}`,
    nextDay: withTime
      ? `[morgen], ${format.split(',').slice(0, -1)} [om]${last(format.split(','))}`
      : `[morgen], ${format.split(',').slice(0, -1)}`,
    sameDay: withTime ? `[vandaag om] HH:mm` : `[vandaag]`,
  }),
};

export default {
  en,
  fr,
  nl,
};
