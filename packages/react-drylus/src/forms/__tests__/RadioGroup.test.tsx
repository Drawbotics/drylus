import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { RadioGroup } from '../RadioGroup';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

describe('RadioGroup', () => {
  const onChange = jest.fn();

  describe('matches snapshot when', () => {
    it('is has no value', () => {
      const tree = render(
        <RadioGroup
          onChange={onChange}
          options={[
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '3',
            },
          ]}
        />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is has a value', () => {
      const tree = render(
        <RadioGroup
          value="1"
          onChange={onChange}
          options={[
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '3',
            },
          ]}
        />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is read only', () => {
      const tree = render(
        <RadioGroup
          value="1"
          options={[
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '3',
            },
          ]}
        />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when interacted with', () => {
    it('changes state when clicked', () => {
      let value = undefined;

      expect(value).toBeUndefined();

      const { container } = render(
        <RadioGroup
          value={value}
          options={[
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '3',
            },
          ]}
          onChange={(v) => (value = v)}
        />,
      );

      const input = container.querySelectorAll('input[type="radio"]')[0]!;
      fireEvent.click(input);

      expect(value).toEqual('1');
    });
  });
});
