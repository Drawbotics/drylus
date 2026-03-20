import React from 'react';
import { render } from '@testing-library/react';

import { Category, Size } from '../../enums';
import { Text } from '../Text';
import { TextLink } from '../TextLink';

// Mock constant date is 01/06/2020 at 12pm
describe('Text', () => {
  describe('matches snapshot when it', () => {
    it('has children', () => {
      const tree = render(<Text>Text content</Text>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is bold', () => {
      const tree = render(<Text bold>Text content</Text>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is light and inversed', () => {
      const tree = render(
        <Text light inversed>
          Text content
        </Text>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a size and category', () => {
      const tree = render(
        <Text size={Size.LARGE} category={Category.BRAND}>
          Text content
        </Text>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has Text and TextLink as children', () => {
      const tree = render(
        <Text>
          Text content <Text>nested</Text> with a <TextLink>link</TextLink>
        </Text>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
  describe('matches expected output when it', () => {
    it('contains a date', () => {
      const date = new Date('2020-06-04 18:00');

      const { container } = render(<Text>{date}</Text>);
      const children = container.textContent;

      expect(children).toEqual('Thu 4 Jun, 6:00 PM');
    });

    it('contains a price', () => {
      const price = { value: 10000, currency: 'GBP' };

      const { container } = render(<Text>{price}</Text>);
      const children = container.textContent;

      expect(children).toEqual('£10,000');
    });
  });
});
