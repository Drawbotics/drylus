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
    '/dist/',
  ],
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  moduleNameMapper: {
    '@drawbotics/drylus-style-vars$': "<rootDir>/../drylus-style-vars",
    '@drawbotics/extract-emotion$': "<rootDir>/../extract-emotion",
    '@drawbotics/icons$': "<rootDir>/../icons",
    '@drawbotics/react-drylus$': "<rootDir>/../react-drylus",
    '@drawbotics/vanilla-drylus$': "<rootDir>/../vanilla-drylus",
  },
};
