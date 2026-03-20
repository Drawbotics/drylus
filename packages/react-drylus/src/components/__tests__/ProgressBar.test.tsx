import React from 'react';
import { render } from '@testing-library/react';

import { Color, Size } from '../../enums';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  describe('matches snapshot when', () => {
    it('has a value', () => {
      const tree = render(<ProgressBar percentage={0.4} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a color', () => {
      const tree = render(<ProgressBar percentage={0.4} color={Color.BRAND} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = render(<ProgressBar percentage={0.4} size={Size.SMALL} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
