import React from 'react';
import { create } from 'react-test-renderer';

import Title from '../Title';
import { Align } from '../../enums';


describe('Title', () => {
  describe('matches snapshot when', () => {
    it('has a h1 size', () => {
      const tree = create(
        <Title size={1}>Title content</Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a h2 size', () => {
      const tree = create(
        <Title size={2}>Title content</Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a h3 size', () => {
      const tree = create(
        <Title size={3}>Title content</Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a h4 size', () => {
      const tree = create(
        <Title size={4}>Title content</Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('does not have margins', () => {
      const tree = create(
        <Title noMargin>Title content</Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a node as children', () => {
      const tree = create(
        <Title size={2}>
          <span style={{ fontWeight: 500 }}>Some </span> content
        </Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is aligned to the right', () => {
      const tree = create(
        <Title align={Align.RIGHT}>
         Some content
        </Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is center aligned', () => {
      const tree = create(
        <Title align={Align.CENTER}>
         Some content
        </Title>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});