/* eslint-disable */
import { createSerializer } from '@emotion/jest';

// Set up for jest to display css values in snapshot
expect.addSnapshotSerializer(
  createSerializer(),
);


// Mock crypto.randomUUID for deterministic snapshots
let uuidCounter = 0;
const originalRandomUUID = crypto.randomUUID?.bind(crypto);
crypto.randomUUID = () => `test-uuid-${++uuidCounter}`;
beforeEach(() => { uuidCounter = 0; });


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