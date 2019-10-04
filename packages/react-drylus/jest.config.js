/* eslint-disable */
const path = require('path');


module.exports = {
  verbose: false,
  testMatch: [
    '**/*.test.js',
    '**/*.test.jsx',
  ],
  // rootDir: '../../',
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
    '@drawbotics/drylus-style-vars$': path.resolve(__dirname, '../drylus-style-vars'),
    '@drawbotics/extract-emotion$': path.resolve(__dirname, '../extract-emotion'),
    '@drawbotics/icons$': path.resolve(__dirname, '../icons'),
    '@drawbotics/react-drylus$': path.resolve(__dirname, '../react-drylus'),
    '@drawbotics/vanilla-drylus$': path.resolve(__dirname, '../vanilla-drylus'),
  },
};
