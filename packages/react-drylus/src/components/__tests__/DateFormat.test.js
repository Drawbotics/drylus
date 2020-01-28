import React from 'react';
import { create } from 'react-test-renderer';
import get from 'lodash/get';

import '../../../__mocks__/date';
import DateFormat, { DateFormatShowTime } from '../DateFormat';


// Mock constant date is 01/01/2020
// Locale set to en-GB for consistency between tests
const locale = 'en-GB';

describe('DateFormat', () => {
  describe('matches the formatted output when', () => {
    it('is in more than 365 days', () => {
      const date = new Date('February 1, 2021');

      const tree = create(
        <DateFormat locale={locale} value={date} />
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('01/02/2021');
    });

    it('is in less than 365 days', () => {
      const date = new Date('June 1, 2020');
  
      const tree = create(
        <DateFormat locale={locale} value={date} />
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('1 June');
    });

    it('is in less than a week, and no time should show', () => {
      const date = new Date('January 4, 2020');
  
      const tree = create(
        <DateFormat
          locale={locale}
          showTime={DateFormatShowTime.NEVER}
          value={date} />
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Sat, 4 Jan');
    });

    it('is in less than a week, with specific time', () => {
      const date = new Date('January 4, 2020 18:00');
  
      const tree = create(
        <DateFormat locale={locale} value={date} />
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Sat, 4 Jan, 6:00 pm');
    });
    
    it('is in less than 2 days', () => {
      const date = new Date('January 2, 2020 8:00');
  
      const tree = create(
        <DateFormat locale={locale} value={date} />
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Tomorrow, 2 Jan, 8:00 am');
    });
  });
});