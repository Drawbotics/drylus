import React from 'react';
import { render } from '@testing-library/react';

import { Category, Size, Tier } from '../../enums';
import { Button } from '../Button';
import { Icon } from '../Icon';

describe('Button', () => {
  describe('matches snapshot when', () => {
    it('is basic', () => {
      const tree = render(<Button>Some content</Button>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a category', () => {
      const tree = render(<Button category={Category.WARNING}>Some content</Button>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a tier', () => {
      const tree = render(<Button tier={Tier.SECONDARY}>Some content</Button>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = render(<Button size={Size.SMALL}>Some content</Button>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a leading component', () => {
      const tree = render(<Button leading={<Icon name="check" />}>Some content</Button>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a trailing component', () => {
      const tree = render(<Button trailing={<Icon name="check" />}>Some content</Button>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
