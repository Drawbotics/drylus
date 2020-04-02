import React from 'react';
import { create } from 'react-test-renderer';

import { Size } from '../../enums';
import { Margin } from '../Margin';

describe('Margin', () => {
  describe('matches snapshot when', () => {
    it('has a uniform size', () => {
      const tree = create(<Margin size={Size.LARGE}>Content</Margin>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a size only on 1 side', () => {
      const tree = create(<Margin size={{ left: Size.LARGE }}>Content</Margin>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a different size on each side', () => {
      const tree = create(
        <Margin
          size={{
            left: Size.LARGE,
            top: Size.SMALL,
            bottom: Size.DEFAULT,
            right: Size.EXTRA_SMALL,
          }}>
          Content
        </Margin>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has vertical and horizontal sizes', () => {
      const tree = create(
        <Margin
          size={{
            vertical: Size.LARGE,
            horizontal: Size.SMALL,
          }}>
          Content
        </Margin>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
