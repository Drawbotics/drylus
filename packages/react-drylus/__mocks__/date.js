/* eslint-disable */
const constantDate = new Date('January 1, 2020');

Date = class extends Date {
  constructor(date) {
    if (date) {
      return super(date);
    }

    return constantDate;
  }
}