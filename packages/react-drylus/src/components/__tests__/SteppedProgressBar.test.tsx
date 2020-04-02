import React from 'react';
import { create } from 'react-test-renderer';

import { Color, Size } from '../../enums';
import { SteppedProgressBar } from '../SteppedProgressBar';

describe('SteppedProgressBar', () => {
  describe('matches snapshot when', () => {
    it('has 4 steps', () => {
      const tree = create(<SteppedProgressBar steps={4} activeStep={0} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a color', () => {
      const tree = create(
        <SteppedProgressBar steps={4} activeStep={0} color={Color.BRAND} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = create(
        <SteppedProgressBar steps={4} activeStep={0} size={Size.SMALL} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a percentage', () => {
      const tree = create(
        <SteppedProgressBar steps={4} activeStep={0} percentage={0.4} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
