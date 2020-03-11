import { css, cx } from 'emotion';
import camelCase from 'lodash/camelCase';
import React from 'react';

import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

const styles = {
  root: css`
    display: flex;
    margin: 0;
  `,
  horizontal: css`
    flex-direction: row;
  `,
  vertical: css`
    flex-direction: column;
  `,
  justifyStart: css`
    justify-content: flex-start;
  `,
  justifyEnd: css`
    justify-content: flex-end;
  `,
  justifyCenter: css`
    justify-content: center;
  `,
  justifySpaceAround: css`
    justify-content: space-around;
  `,
  justifySpaceBetween: css`
    justify-content: space-between;
  `,
  justifySpaceEvenly: css`
    justify-content: space-evenly;
  `,
  alignStretch: css`
    align-items: stretch;
  `,
  alignStart: css`
    align-items: flex-start;
  `,
  alignEnd: css`
    align-items: flex-end;
  `,
  alignCenter: css`
    align-items: center;
  `,
  wrap: css`
    flex-wrap: wrap;
  `,
  item: css``,
  equalSpan: css`
    flex: 1;
  `,
};

export enum FlexDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export enum FlexJustify {
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
  SPACE_AROUND = 'SPACE_AROUND',
  SPACE_BETWEEN = 'SPACE_BETWEEN',
  SPACE_EVENLY = 'SPACE_EVENLY',
}

export enum FlexAlign {
  STRETCH = 'STRETCH',
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
}

function prefixFlex(value: number) {
  const prefixed = value < 1 ? `0 0 ${value * 100}%` : value;
  return {
    WebkitFlex: prefixed,
    msFlex: prefixed,
    flex: prefixed,
  };
}

interface FlexItemProps {
  children: React.ReactNode;

  /** Determines how much space a flex item takes within the flex container. */
  flex?: number | boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive;
}

export const FlexItem = ({ responsive, ...rest }: FlexItemProps) => {
  const { children, flex, style } = useResponsiveProps(rest, responsive);
  const equalSpan = flex === true;
  return (
    <div
      className={cx(styles.item, { [styles.equalSpan]: equalSpan })}
      style={flex && typeof flex !== 'boolean' ? { ...prefixFlex(flex), ...style } : style}>
      {children}
    </div>
  );
};

FlexItem.defaultProps = {
  style: {},
};

interface FlexProps {
  children: React.ReactElement<typeof FlexItem>;

  /** Determines which way the flex layout should be */
  direction?: FlexDirection;

  /** See flexbox justify-content */
  justify?: FlexJustify;

  /** See flexbox align-items */
  align?: FlexAlign;

  /** See flexbox flex-wrap. If true, sets to `wrap` */
  wrap?: boolean;

  /** To override simple styles on the flex element, use only for properties that do not require prefixing */
  style?: Style;

  /** If you need to customize the Flex container pass a custom className. E.g. if you want to use `display: inline-flex` */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive;
}

export const Flex = ({ responsive, ...rest }: FlexProps) => {
  const { children, direction, justify, align, wrap, className, style } = useResponsiveProps<
    FlexProps
  >(rest, responsive);

  const invalidChildren = React.Children.map(children, (x) => x).some(
    (child) => child != null && child.type !== FlexItem,
  );
  if (invalidChildren) {
    console.warn('Flex should only accept FlexItem as children');
  }
  return (
    <div
      className={cx(
        styles.root,
        {
          [styles[camelCase(direction) as keyof typeof styles]]: direction != null,
          [styles[camelCase(`JUSTIFY_${justify}`) as keyof typeof styles]]: justify != null,
          [styles[camelCase(`ALIGN_${align}`) as keyof typeof styles]]: align != null,
          [styles.wrap]: wrap,
        },
        className,
      )}
      style={style}>
      {children}
    </div>
  );
};

Flex.defaultProps = {
  direction: FlexDirection.HORIZONTAL,
  justify: FlexJustify.CENTER,
  align: FlexAlign.CENTER,
  wrap: false,
};
