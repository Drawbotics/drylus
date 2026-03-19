import React from 'react';
import { render } from '@testing-library/react';

import { RangeInput } from '../RangeInput';

describe('RangeInput', () => {
  describe('Tooltip', () => {
    it('should display minimum value when max and min are equal', () => {
      const { container } = render(
        <RangeInput step={1} onChange={(x) => x} max={0} min={0} value={0} />,
      );
      const tooltipNode = container.querySelector('[data-element="tooltip"]')!;
      expect(tooltipNode.textContent).toEqual('0');
    });

    it('should display value', () => {
      const { container } = render(
        <RangeInput step={1} onChange={(x) => x} max={100} min={0} value={13} />,
      );
      const tooltipNode = container.querySelector('[data-element="tooltip"]')!;
      expect(tooltipNode.textContent).toEqual('13');
    });
  });
});
