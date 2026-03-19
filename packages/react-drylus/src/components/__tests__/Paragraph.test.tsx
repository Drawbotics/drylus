import React from 'react';
import { render } from '@testing-library/react';

import { Align } from '../../enums';
import { Paragraph } from '../Paragraph';

describe('Paragraph', () => {
  describe('matches snapshot when', () => {
    it('is aligned to the left', () => {
      const tree = render(<Paragraph align={Align.LEFT}>Some content</Paragraph>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is aligned to the right', () => {
      const tree = render(<Paragraph align={Align.RIGHT}>Some content</Paragraph>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is center aligned', () => {
      const tree = render(<Paragraph align={Align.CENTER}>Some content</Paragraph>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
