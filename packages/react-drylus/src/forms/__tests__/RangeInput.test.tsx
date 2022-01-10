import React from 'react';
import { create } from 'react-test-renderer';

import { RangeInput } from '../RangeInput';

describe('RangeInput', () => {
  describe('Tooltip', () => {
    it('should display minimum value when max and min are equal', () => {
      const componentNode = create(
        <RangeInput step={1} onChange={(x) => x} max={0} min={0} value={0} />,
      );
      const tooltipNode = componentNode.root.findAllByProps({ 'data-element': 'tooltip' })[0];
      expect(tooltipNode.children[0]).toEqual('0');
    });

    it('should display value', () => {
      const componentNode = create(
        <RangeInput step={1} onChange={(x) => x} max={100} min={0} value={13} />,
      );
      const tooltipNode = componentNode.root.findAllByProps({ 'data-element': 'tooltip' })[0];
      expect(tooltipNode.children[0]).toEqual('13');
    });
  });
});
