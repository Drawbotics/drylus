import React from 'react';
import { render } from '@testing-library/react';

import { LoadingPlaceholder } from '../LoadingPlaceholder';

describe('LoadingPlaceholder', () => {
  describe('matches snapshot when', () => {
    it('has no specified sizes', () => {
      const tree = render(<LoadingPlaceholder />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has custom sizes', () => {
      const tree = render(<LoadingPlaceholder height={200} width={100} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
