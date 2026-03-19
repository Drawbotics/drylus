import React from 'react';
import { render } from '@testing-library/react';

import { Color, Size } from '../../enums';
import { SteppedProgressBar } from '../SteppedProgressBar';

describe('SteppedProgressBar', () => {
  describe('matches snapshot when', () => {
    it('has 4 steps', () => {
      const tree = render(<SteppedProgressBar steps={4} activeStep={0} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a color', () => {
      const tree = render(
        <SteppedProgressBar steps={4} activeStep={0} color={Color.BRAND} />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = render(
        <SteppedProgressBar steps={4} activeStep={0} size={Size.SMALL} />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a percentage', () => {
      const tree = render(
        <SteppedProgressBar steps={4} activeStep={0} percentage={0.4} />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
