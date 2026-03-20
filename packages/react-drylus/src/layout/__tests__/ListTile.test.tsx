import React from 'react';
import { render } from '@testing-library/react';

import { Button } from '../../components';
import { ListTile } from '../ListTile';

describe('ListTile', () => {
  describe('matches snapshot when', () => {
    it('has a title', () => {
      const tree = render(<ListTile title="Title" />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a subtitle', () => {
      const tree = render(<ListTile title="Title" subtitle="Subtitle" />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a custom title', () => {
      const tree = render(<ListTile title={<Button>Button</Button>} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a trailing and leading component', () => {
      const tree = render(
        <ListTile
          title="Title"
          trailing={<Button>Trailing</Button>}
          leading={<Button>Leading</Button>}
        />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('responds correctly to input and', () => {
    it('triggers when clicked', () => {
      let triggered = false;

      expect(triggered).toBeFalsy();

      const onClick = jest.fn(() => { triggered = true; });
      render(<ListTile title="Title" onClick={onClick} />);

      onClick();

      expect(triggered).toBeTruthy();
    });
  });
});
