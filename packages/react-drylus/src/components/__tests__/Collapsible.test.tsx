import React from 'react';
import { render } from '@testing-library/react';

import { Collapsible } from '../Collapsible';
import { Text } from '../Text';

describe('Collapsible', () => {
  describe('matches snapshot when', () => {
    it('is not open', () => {
      const tree = render(
        <Collapsible title="Title" isOpen={false}>
          Collapsible content
        </Collapsible>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is open', () => {
      const tree = render(
        <Collapsible title="Title" isOpen={true}>
          Collapsible content
        </Collapsible>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('the title is a node', () => {
      const tree = render(
        <Collapsible title={<Text>The title</Text>} isOpen={true}>
          Collapsible content
        </Collapsible>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when interacted with', () => {
    it('opens when clicked', () => {
      let open = false;

      expect(open).toBeFalsy();

      const onClick = jest.fn(() => { open = true; });
      render(
        <Collapsible title="Title" isOpen={false} onClick={onClick}>
          Collapsible content
        </Collapsible>,
      );

      onClick();

      expect(open).toBeTruthy();
    });
  });
});
