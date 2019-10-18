import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';

import SplashScreen from '../SplashScreen';


describe('SplashScreen', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  describe('matches snapshot when', () => {
    it('is visible without text', () => {
      const tree = create(
        <SplashScreen />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is visible with some text', () => {
      const tree = create(
        <SplashScreen text="Loading..." />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});