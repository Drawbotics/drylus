import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';

import { SplashScreen } from '../SplashScreen';

describe('SplashScreen', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => {
      return element;
    }) as any;
  });

  afterEach(() => {
    (ReactDOM.createPortal as any).mockClear();
  });

  describe('matches snapshot when', () => {
    it('is visible without text', () => {
      const tree = create(<SplashScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    // TODO put back when this is fixed https://github.com/framer/motion/issues/410
    // eslint-disable-next-line jest/no-commented-out-tests
    // it('is visible with some text', () => {
    //   const tree = create(<SplashScreen text="Loading..." />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  });
});
