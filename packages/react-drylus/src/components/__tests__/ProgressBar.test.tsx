import React from 'react';
import { create } from 'react-test-renderer';

import { Color, Size } from '../../enums';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  describe('matches snapshot when', () => {
    it('has a value', () => {
      const tree = create(<ProgressBar percentage={0.4} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a color', () => {
      const tree = create(<ProgressBar percentage={0.4} color={Color.BRAND} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = create(<ProgressBar percentage={0.4} size={Size.SMALL} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
