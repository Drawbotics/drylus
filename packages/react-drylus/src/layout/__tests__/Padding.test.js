import React from 'react';
import { create } from 'react-test-renderer';

import Padding from '../Padding';
import { Sizes } from '../../base';


describe('Padding', () => {
  describe('matches snapshot when', () => {
    it('has a uniform size', () => {
      const tree = create(
        <Padding size={Sizes.LARGE}>
          Content
        </Padding>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a size only on 1 side', () => {
      const tree = create(
        <Padding size={{ left: Sizes.LARGE }}>
          Content
        </Padding>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a different size on each side', () => {
      const tree = create(
        <Padding
          size={{
            left: Sizes.LARGE,
            top: Sizes.SMALL,
            bottom: Sizes.DEFAULT,
            right: Sizes.EXTRA_SMALL,
          }}>
          Content
        </Padding>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has vertical and horizontal sizes', () => {
      const tree = create(
        <Padding
          size={{
            vertical: Sizes.LARGE,
            horizontal: Sizes.SMALL,
          }}>
          Content
        </Padding>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});