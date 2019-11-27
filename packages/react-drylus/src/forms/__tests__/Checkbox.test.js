import React from 'react';
import { create } from 'react-test-renderer';

import Checkbox from '../Checkbox';
import { Sizes } from '../../base';


describe('Checkbox', () => {
  const onChange = jest.fn();
  const id = 1;  // otherwise snapshots differ every time

  describe('matches snapshot when', () => {
    it('is not checked', () => {
      const tree = create(
        <Checkbox onChange={onChange} id={id} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is checked', () => {
      const tree = create(
        <Checkbox value={true} onChange={onChange} id={id} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a label', () => {
      const tree = create(
        <Checkbox onChange={onChange} id={id}>
          Label
        </Checkbox>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is read only', () => {
      const tree = create(
        <Checkbox value={true} id={id} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is small', () => {
      const tree = create(
        <Checkbox
          id={id}
          size={Sizes.SMALL}
          onChange={onChange} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
  // describe('changes state when clicked', () => {
  //   let checked = false;

  //   expect(checked).toBeFalsy();

  //   let component;
  //   act(() => {
  //     component = create(
  //       <Checkbox
  //         value={checked}
  //         onChange={(c) => checked = c}>
  //         Label
  //       </Checkbox>
  //     );
  //   });

  //   // const label = component.findByProps({ 'data-element': 'label' });
  //   const input = component.findByProps({ type: 'checkbox' });

  //   act(() => {
  //     input.dispatchEvent(new Event('change'));
  //   });
    
  //   // act(() => {
  //   //   label.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  //   // });
    
  //   expect(checked).toBeTruthy();
  // });
});
