import React from 'react';
import { render } from '@testing-library/react';

import { Tile } from '../Tile';

describe('Tile', () => {
  describe('matches snapshot when', () => {
    it('has a title', () => {
      const tree = render(<Tile title="Title">Tile content</Tile>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('does not have a title', () => {
      const tree = render(<Tile>Tile content</Tile>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('does not have any padding', () => {
      const tree = render(<Tile noPadding>Tile content</Tile>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
