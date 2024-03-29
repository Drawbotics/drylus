import React from 'react';
import { create } from 'react-test-renderer';

import { Collapsible } from '../Collapsible';
import { Text } from '../Text';

describe('Collapsible', () => {
  describe('matches snapshot when', () => {
    it('is not open', () => {
      const tree = create(
        <Collapsible title="Title" isOpen={false}>
          Collapsible content
        </Collapsible>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('it is open', () => {
      const tree = create(
        <Collapsible title="Title" isOpen={true}>
          Collapsible content
        </Collapsible>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('the title is a node', () => {
      const tree = create(
        <Collapsible title={<Text>The title</Text>} isOpen={true}>
          Collapsible content
        </Collapsible>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when interacted with', () => {
    it('opens when clicked', () => {
      let open = false;

      expect(open).toBeFalsy();

      const component = create(
        <Collapsible title="Title" isOpen={false} onClick={() => (open = true)}>
          Collapsible content
        </Collapsible>,
      );

      component.root.props.onClick();

      expect(open).toBeTruthy();
    });
  });
});
