import React from 'react';
import renderer from 'react-test-renderer';

import Collapsible from '../Collapsible';


describe('Collapsible', () => {
  describe('matches snapshot when', () => {
    it('is not open', () => {
      const tree = renderer.create(
        <Collapsible isOpen={false}>Collapsible title</Collapsible>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});