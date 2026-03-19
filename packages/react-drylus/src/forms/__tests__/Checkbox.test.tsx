import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Text } from '../../components';
import { Size } from '../../enums';
import { Checkbox } from '../Checkbox';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

describe('Checkbox', () => {
  const onChange = jest.fn();

  describe('matches snapshot when', () => {
    it('is not checked', () => {
      const tree = render(<Checkbox onChange={onChange} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is checked', () => {
      const tree = render(<Checkbox value={true} onChange={onChange} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a label', () => {
      const tree = render(<Checkbox onChange={onChange}>Label</Checkbox>).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('has a label as react node', () => {
      const tree = render(
        <Checkbox onChange={onChange}>
          <Text bold>Label</Text>
        </Checkbox>,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is read only', () => {
      const tree = render(<Checkbox value={true} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });

    it('is large', () => {
      const tree = render(<Checkbox size={Size.LARGE} onChange={onChange} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when interacted with', () => {
    it('changes state when clicked', () => {
      let checked = false;

      expect(checked).toBeFalsy();

      const { container } = render(
        <Checkbox value={checked} onChange={(c) => (checked = c)}>
          Label
        </Checkbox>,
      );

      const input = container.querySelector('input[type="checkbox"]')!;
      fireEvent.click(input);

      expect(checked).toBeTruthy();
    });
  });
});
