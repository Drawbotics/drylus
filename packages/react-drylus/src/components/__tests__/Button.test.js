import React from 'react';
import { create } from 'react-test-renderer';

import Button from '../Button';
import {
  Size,
  Tier,
  Category,
} from '../../enums';
import Icon from '../Icon';


describe('Button', () => {
  describe('matches snapshot when', () => {
    it('is basic', () => {
      const tree = create(
        <Button>
          Some content
        </Button>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a category', () => {
      const tree = create(
        <Button category={Category.WARNING}>
          Some content
        </Button>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a tier', () => {
      const tree = create(
        <Button tier={Tier.SECONDARY}>
          Some content
        </Button>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = create(
        <Button size={Size.SMALL}>
          Some content
        </Button>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a leading component', () => {
      const tree = create(
        <Button leading={<Icon name="check" />}>
          Some content
        </Button>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a trailing component', () => {
      const tree = create(
        <Button trailing={<Icon name="check" />}>
          Some content
        </Button>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});