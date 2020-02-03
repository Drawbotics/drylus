import React from 'react';
import { create } from 'react-test-renderer';
import get from 'lodash/get';

import { Category, Size } from '../../enums';
import Text from '../Text';


// Mock constant date is 01/06/2020 at 12pm
describe('Text', () => {
  describe('matches snapshot when it', () => {
    it('has children', () => {
      const tree = create(
        <Text>Text content</Text>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    
    it('is bold', () => {
      const tree = create(
        <Text bold>Text content</Text>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is light and inversed', () => {
      const tree = create(
        <Text light inversed>Text content</Text>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a size and category', () => {
      const tree = create(
        <Text size={Size.LARGE} category={Category.BRAND}>Text content</Text>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('matches expected output when it', () => {
    it('contains a date', () => {
      const date = new Date('2020-06-04 18:00');
  
      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Thu 4 Jun, 6:00 PM');
    });

    it('contains a price', () => {
     const price = { value: 10000, currency: 'GBP' };
  
      const tree = create(
        <Text>{price}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('£10,000');
    });
  });
});