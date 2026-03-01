/* eslint-disable */
const path = require('path');


module.exports = {
  verbose: false,
  testMatch: [
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.test.ts',
    '**/*.test.tsx',
  ],
  transform: {
    '^.+\\.(js|jsx)?$': ['babel-jest', { rootMode: 'upward' }],
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    'use-screen-size/lib/',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/tmp/',
  ],
  setupFilesAfterEnv: [
    './jest.setup.js',
    'jest-expect-message',
  ],
  'moduleNameMapper': {
    '~': '<rootDir>',
    '^react$': path.resolve(__dirname, '../../node_modules/react'),
    '^react-dom$': path.resolve(__dirname, '../../node_modules/react-dom'),
    '^@drawbotics/use-screen-size$': '<rootDir>/__mocks__/@drawbotics/use-screen-size.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
      diagnostics: {
        ignoreCodes: [ 'TS2345' ],
      },
    },
  },
};
