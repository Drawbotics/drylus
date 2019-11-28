import React from 'react';
import { create } from 'react-test-renderer';

import LoadingPlaceholder from '../LoadingPlaceholder';


describe('LoadingPlaceholder', () => {
  describe('matches snapshot when', () => {
    it('has no specified sizes', () => {
      const tree = create(
        <LoadingPlaceholder />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has custom sizes', () => {
      const tree = create(
        <LoadingPlaceholder height={200} width={100} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});