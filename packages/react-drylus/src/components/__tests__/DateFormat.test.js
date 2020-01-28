import React from 'react';
import { create } from 'react-test-renderer';
import get from 'lodash/get';

import '../../../__mocks__/date';
import DateFormat from '../DateFormat';

// Mock constant date is 01/01/2020

describe('DateFormat', () => {
  describe('matches the formatted output when', () => {
    it('is in more than 365 days', () => {
      const date = new Date('February 1, 2021');

      const tree = create(
        <DateFormat locale="en-GB" value={date} />
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('01/02/2021');
    });

    it('is in less than 365 days', () => {
      const date = new Date('June 1, 2020');
  
      const tree = create(
        <DateFormat locale="fr-FR" value={date} />
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('1 June');
    });
  });
});