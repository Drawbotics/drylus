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
    '~': '<rootDir>'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
};
