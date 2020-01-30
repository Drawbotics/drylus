import React from 'react';
import { create } from 'react-test-renderer';
import get from 'lodash/get';

import '../../../__mocks__/date';
import Text, { TextShowDateTime } from '../Text';
import { Category, Size } from '../../enums';


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

  describe('matches the formatted date output when the date', () => {
    it('is in more than 365 days', () => {
      const date = new Date('2021-10-01');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('01/10/2021');
    });

    it('is in less than 365 days, different year', () => {
      const date = new Date('2021-01-01');
  
      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('1 Jan 2021');
    });

    it('is in less than 365 days, same year', () => {
      const date = new Date('2020-10-01');
  
      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('1 Oct');
    });

    it('is in less than a week, and no time should show', () => {
      const date = new Date('2020-06-04');
  
      const tree = create(
        <Text
          dateOptions={{ showTime: TextShowDateTime.NEVER }}>
          {date}
        </Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Thu, 4 Jun');
    });

    it('is in less than a week, with specific time', () => {
      const date = new Date('2020-06-04 18:00');
  
      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Thu, 4 Jun, 6:00 PM');
    });
    
    it('is in less than 2 days', () => {
      const date = new Date('2020-06-02 8:00');
  
      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Tomorrow, 2 Jun, 8:00 AM');
    });

    it('is the same day, in the future', () => {
      const date = new Date('2020-06-01 15:00');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Today at 3:00 PM');
    });

    it('is the same day, in the past', () => {
      const date = new Date('2020-06-01 9:20');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('2h40 ago');
    });

    it('is the previous day', () => {
      const date = new Date('2020-05-31 13:00');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Yesterday at 1:00 PM');
    });

    it('is the previous week', () => {
      const date = new Date('2020-05-28 8:00');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('Last Thu, 28 May, 8:00 AM');
    });

    it('is less than 365 days ago, same year', () => {
      const date = new Date('2020-01-01');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('1 Jan');
    });

    it('is less than 365 days ago, different year', () => {
      const date = new Date('2019-10-01');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('1 Oct 2019');
    });

    it('is less than 365 days ago, different year, with specified time and display', () => {
      const date = new Date('2019-10-01 17:00');

      const tree = create(
        <Text dateOptions={{ showTime: TextShowDateTime.ALWAYS }}>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('1 Oct 2019, 5:00 PM');
    });

    it('is more than 365 days ago', () => {
      const date = new Date('2018-10-01');

      const tree = create(
        <Text>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('01/10/2018');
    });

    it('is a archived format', () => {
      const date = new Date('2018-10-01');

      const tree = create(
        <Text dateOptions={{ asArchive: true }}>{date}</Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('2018-10-01');
    });

    it('is a archived format, with time', () => {
      const date = new Date('2018-10-01 8:32');

      const tree = create(
        <Text
          dateOptions={{ asArchive: true, showTime: TextShowDateTime.ALWAYS }}>
          {date}
        </Text>
      ).toJSON();
      const children = get(tree, 'children[0]', '');
      
      expect(children).toEqual('2018-10-01, 8:32 AM');
    });
  });
});