import React from 'react';
import { render } from '@testing-library/react';

import { Size } from '../../enums';
import { Padding } from '../Padding';

describe('Padding', () => {
  describe('matches snapshot when', () => {
    it('has a uniform size', () => {
      const tree = render(<Padding size={Size.LARGE}>Content</Padding>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a size only on 1 side', () => {
      const tree = render(<Padding size={{ left: Size.LARGE }}>Content</Padding>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a different size on each side', () => {
      const tree = render(
        <Padding
          size={{
            left: Size.LARGE,
            top: Size.SMALL,
            bottom: Size.DEFAULT,
            right: Size.EXTRA_SMALL,
          }}>
          Content
        </Padding>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has vertical and horizontal sizes', () => {
      const tree = render(
        <Padding
          size={{
            vertical: Size.LARGE,
            horizontal: Size.SMALL,
          }}>
          Content
        </Padding>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
