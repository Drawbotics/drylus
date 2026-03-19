import React from 'react';
import { render } from '@testing-library/react';

import { Size } from '../../enums';
import { Margin } from '../Margin';

describe('Margin', () => {
  describe('matches snapshot when', () => {
    it('has a uniform size', () => {
      const tree = render(<Margin size={Size.LARGE}>Content</Margin>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a size only on 1 side', () => {
      const tree = render(<Margin size={{ left: Size.LARGE }}>Content</Margin>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a different size on each side', () => {
      const tree = render(
        <Margin
          size={{
            left: Size.LARGE,
            top: Size.SMALL,
            bottom: Size.DEFAULT,
            right: Size.EXTRA_SMALL,
          }}>
          Content
        </Margin>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has vertical and horizontal sizes', () => {
      const tree = render(
        <Margin
          size={{
            vertical: Size.LARGE,
            horizontal: Size.SMALL,
          }}>
          Content
        </Margin>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
