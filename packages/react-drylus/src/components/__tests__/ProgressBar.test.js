import React from 'react';
import { create } from 'react-test-renderer';

import ProgressBar from '../ProgressBar';
import { Categories, Sizes } from '../../base';


describe('ProgressBar', () => {
  describe('matches snapshot when', () => {
    it('has a value', () => {
      const tree = create(
        <ProgressBar progress={0.4} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a category', () => {
      const tree = create(
        <ProgressBar progress={0.4} category={Categories.BRAND} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = create(
        <ProgressBar progress={0.4} size={Sizes.SMALL} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});