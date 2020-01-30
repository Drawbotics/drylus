/* eslint-disable */

const constantDate = new Date('2020-06-01 12:00');

Date = class extends Date {
  constructor(date) {
    if (date) {
      return super(date);
    }

    return constantDate;
  }
}

Intl = require('intl');

Intl.__disableRegExpRestore();