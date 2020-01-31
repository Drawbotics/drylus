/* eslint-disable */
const path = require('path');


module.exports = {
  verbose: false,
  testMatch: [
    '**/*.test.js',
    '**/*.test.jsx',
  ],
  transform: {
    '^.+\\.(js|jsx)?$': ['babel-jest', { rootMode: 'upward' }],
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
  ],
  setupFilesAfterEnv: [
    './jest.setup.js',
    'jest-expect-message',
  ],
  'moduleNameMapper': {
    '~': '<rootDir>',
  }
};
