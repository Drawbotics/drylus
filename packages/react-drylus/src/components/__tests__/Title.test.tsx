import React from 'react';
import { render } from '@testing-library/react';

import { Align } from '../../enums';
import { Title } from '../Title';

describe('Title', () => {
  describe('matches snapshot when', () => {
    it('has a h1 size', () => {
      const tree = render(<Title size={1}>Title content</Title>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a h2 size', () => {
      const tree = render(<Title size={2}>Title content</Title>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a h3 size', () => {
      const tree = render(<Title size={3}>Title content</Title>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a h4 size', () => {
      const tree = render(<Title size={4}>Title content</Title>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('does not have margins', () => {
      const tree = render(<Title noMargin>Title content</Title>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a node as children', () => {
      const tree = render(
        <Title size={2}>
          <span style={{ fontWeight: 500 }}>Some </span> content
        </Title>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is aligned to the right', () => {
      const tree = render(<Title align={Align.RIGHT}>Some content</Title>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is center aligned', () => {
      const tree = render(<Title align={Align.CENTER}>Some content</Title>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
