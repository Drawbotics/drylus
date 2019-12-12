import React from 'react';
import { create } from 'react-test-renderer';

import Paragraph from '../Paragraph';
import { Align } from '../../enums';


describe('Paragraph', () => {
  describe('matches snapshot when', () => {
    it('is aligned to the left', () => {
      const tree = create(
        <Paragraph align={Align.LEFT}>
          Some content
        </Paragraph>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is aligned to the right', () => {
      const tree = create(
        <Paragraph align={Align.RIGHT}>
          Some content
        </Paragraph>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is center aligned', () => {
      const tree = create(
        <Paragraph align={Align.CENTER}>
          Some content
        </Paragraph>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});