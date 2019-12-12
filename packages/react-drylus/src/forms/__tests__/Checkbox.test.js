import React from 'react';
import { create } from 'react-test-renderer';

import Checkbox from '../Checkbox';
import { Size } from '../../enums';


jest.mock('uuid/v4', () => {
  return jest.fn(() => 1);
});



describe('Checkbox', () => {
  const onChange = jest.fn();

  describe('matches snapshot when', () => {
    it('is not checked', () => {
      const tree = create(
        <Checkbox onChange={onChange} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is checked', () => {
      const tree = create(
        <Checkbox value={true} onChange={onChange} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a label', () => {
      const tree = create(
        <Checkbox onChange={onChange}>
          Label
        </Checkbox>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is read only', () => {
      const tree = create(
        <Checkbox value={true} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is large', () => {
      const tree = create(
        <Checkbox
          size={Size.LARGE}
          onChange={onChange} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
  describe('changes state when clicked', () => {
    let checked = false;

    expect(checked).toBeFalsy();

    const component = create(
      <Checkbox
        value={checked}
        onChange={(c) => checked = c}>
        Label
      </Checkbox>
    );

    const input = component.root.findByProps({ type: 'checkbox' });
    const changeEvent = new Event('change');
    Object.defineProperty(changeEvent, 'target', { writable: false, value: input });

    input.props.onChange(changeEvent);

    expect(checked).toBeTruthy();
  });
});
