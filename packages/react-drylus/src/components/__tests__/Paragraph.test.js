import React from 'react';
import { create } from 'react-test-renderer';

import Paragraph, { ParagraphAlign } from '../Paragraph';


describe('Paragraph', () => {
  describe('matches snapshot when', () => {
    it('is aligned to the left', () => {
      const tree = create(
        <Paragraph align={ParagraphAlign.LEFT}>
          Some content
        </Paragraph>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is aligned to the right', () => {
      const tree = create(
        <Paragraph align={ParagraphAlign.RIGHT}>
          Some content
        </Paragraph>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is center aligned', () => {
      const tree = create(
        <Paragraph align={ParagraphAlign.CENTER}>
          Some content
        </Paragraph>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});