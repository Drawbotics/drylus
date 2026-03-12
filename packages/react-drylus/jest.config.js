/* eslint-disable */
const path = require('path');


module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  verbose: false,
  testMatch: [
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.test.ts',
    '**/*.test.tsx',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': ['babel-jest', { rootMode: 'upward' }],
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
    '^memoize$': '<rootDir>/../../node_modules/memoize/distribution/index.js',
    '^mimic-function$': '<rootDir>/../../node_modules/mimic-function/index.js',
    '^mapbox-gl$': '<rootDir>/src/__mocks__/mapbox-gl.js',
    'mapbox-gl/dist/mapbox-gl\\.css$': '<rootDir>/src/__mocks__/empty.js',
    '^react-map-gl(/mapbox)?$': '<rootDir>/src/__mocks__/react-map-gl.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-calendar|get-user-locale|memoize/|mimic-function|@wojtekmaj|uuid))',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
