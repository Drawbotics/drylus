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
        <SplashScreen visible={true} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is visible with some text', () => {
      const tree = create(
        <SplashScreen visible={true} text="Loading..." />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('does not appear in the dom when not visible', () => {
    const tree = create(
      <SplashScreen visible={false} />
    ).toJSON();
    expect(tree).toBe(null);
  });
});