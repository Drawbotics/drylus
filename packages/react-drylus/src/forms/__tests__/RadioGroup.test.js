import React from 'react';
import { create } from 'react-test-renderer';

import RadioGroup from '../RadioGroup';


jest.mock('uuid/v4', () => {
  return jest.fn(() => 1);
});


describe('RadioGroup', () => {
  const onChange = jest.fn();

  describe('matches snapshot when', () => {
    it('is has no value', () => {
      const tree = create(
        <RadioGroup
          onChange={onChange}
          options={[{
            label: '1',
            value: '1',
          }, {
            label: '2',
            value: '3',
          }]} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is has a value', () => {
      const tree = create(
        <RadioGroup
          value="1"
          onChange={onChange}
          options={[{
            label: '1',
            value: '1',
          }, {
            label: '2',
            value: '3',
          }]} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is read only', () => {
      const tree = create(
        <RadioGroup
          value="1"
          options={[{
            label: '1',
            value: '1',
          }, {
            label: '2',
            value: '3',
          }]} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
  describe('changes state when clicked', () => {
    let value = null;

    expect(value).toBeNull();

    const component = create(
      <RadioGroup
        value={value}
        options={[{
          label: '1',
          value: '1',
        }, {
          label: '2',
          value: '3',
        }]}
        onChange={(v) => value = v} />
    );

    const input = component.root.findAllByProps({ type: 'radio' })[0];
    const changeEvent = new Event('change');
    Object.defineProperty(changeEvent, 'target', {
      writable: false,
      value: { value: input.props.value },
    });

    input.props.onChange(changeEvent);

    expect(value).toEqual('1');
  });
});