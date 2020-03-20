import React from 'react';
import { create } from 'react-test-renderer';

import { Size } from '../../enums';
import { Padding } from '../Padding';

describe('Padding', () => {
  describe('matches snapshot when', () => {
    it('has a uniform size', () => {
      const tree = create(<Padding size={Size.LARGE}>Content</Padding>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a size only on 1 side', () => {
      const tree = create(<Padding size={{ left: Size.LARGE }}>Content</Padding>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a different size on each side', () => {
      const tree = create(
        <Padding
          size={{
            left: Size.LARGE,
            top: Size.SMALL,
            bottom: Size.DEFAULT,
            right: Size.EXTRA_SMALL,
          }}>
          Content
        </Padding>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has vertical and horizontal sizes', () => {
      const tree = create(
        <Padding
          size={{
            vertical: Size.LARGE,
            horizontal: Size.SMALL,
          }}>
          Content
        </Padding>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
