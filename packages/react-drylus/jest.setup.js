/* eslint-disable */
import serializer from 'jest-emotion';

// Set up for jest to display css values in snapshot
expect.addSnapshotSerializer(
  serializer,
);


// Create missing function
window.URL.createObjectURL = function () { };


// Create fixed date
const constantDate = new Date('2020-06-01 12:00');

Date = class extends Date {
  constructor(date) {
    if (date) {
      return super(date);
    }

    return constantDate;
  }
}


// Fail tests if prop-types throw warning
const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};