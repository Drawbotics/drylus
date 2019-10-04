import { createSerializer } from 'jest-emotion';


// Set up for jest to display css values in snapshot
expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer: (className, index) => className,
  })
);


// Create missing function
window.URL.createObjectURL = function() {};


// Fail tests if prop-types throw warning
const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};