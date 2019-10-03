import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../Button';


test('It should keep a $ in front of the input', () => {
  const { input } = render(<Button />);
  fireEvent.change(input, { target: { value: '23' } })
  expect(input.value).toBe('$23')
})