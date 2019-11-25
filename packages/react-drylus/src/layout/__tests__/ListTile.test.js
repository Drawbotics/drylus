import React from 'react';
import { create } from 'react-test-renderer';

import ListTile from '../ListTile';
import Button from '../../components/Button';


describe('ListTile', () => {
  describe('matches snapshot when', () => {
    it('has a title', () => {
      const tree = create(
        <ListTile title="Title" />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a subtitle', () => {
      const tree = create(
        <ListTile title="Title" subtitle="Subtitle" />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a custom title', () => {
      const tree = create(
        <ListTile title={<Button>Button</Button>} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a trailing and leading component', () => {
      const tree = create(
        <ListTile
          title="Title"
          trailing={<Button>Trailing</Button>}
          leading={<Button>Leading</Button>} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
  describe('triggers when clicked', () => {
    let triggered = false;

    expect(triggered).toBeFalsy();

    const component = create(
      <ListTile title="Title" onClick={() => triggered = true} />
    );

    component.root.props.onClick();
    
    expect(triggered).toBeTruthy();
  });
});