import React from 'react';
import { create } from 'react-test-renderer';

import { Tile } from '../Tile';

describe('Tile', () => {
  describe('matches snapshot when', () => {
    it('has a title', () => {
      const tree = create(<Tile title="Title">Tile content</Tile>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('does not have a title', () => {
      const tree = create(<Tile>Tile content</Tile>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('does not have any padding', () => {
      const tree = create(<Tile noPadding>Tile content</Tile>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
