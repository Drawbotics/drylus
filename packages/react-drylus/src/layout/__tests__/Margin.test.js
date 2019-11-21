import React from 'react';
import { create } from 'react-test-renderer';

import Margin from '../Margin';
import { Sizes } from '../../base';


describe('Margin', () => {
  describe('matches snapshot when', () => {
    it('has a uniform size', () => {
      const tree = create(
        <Margin size={Sizes.LARGE}>
          Content
        </Margin>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a size only on 1 side', () => {
      const tree = create(
        <Margin size={{ left: Sizes.LARGE }}>
          Content
        </Margin>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a different size on each side', () => {
      const tree = create(
        <Margin
          size={{
            left: Sizes.LARGE,
            top: Sizes.SMALL,
            bottom: Sizes.DEFAULT,
            right: Sizes.EXTRA_SMALL,
          }}>
          Content
        </Margin>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has vertical and horizontal sizes', () => {
      const tree = create(
        <Margin
          size={{
            vertical: Sizes.LARGE,
            horizontal: Sizes.SMALL,
          }}>
          Content
        </Margin>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});