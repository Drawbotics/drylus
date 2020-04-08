import { css, cx } from 'emotion';
import camelCase from 'lodash/camelCase';
import React from 'react';

import { Size } from '../enums';
import { Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
import { Margin } from './Margin';

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

export interface FlexSpacerProps {
  /** Determines how much space a flex item takes within the flex container. */
  flex?: number | boolean;

  size: Size;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  direction?: FlexDirection;
}

export const FlexSpacer = ({ responsive, direction, ...rest }: FlexSpacerProps) => {
  const { size, flex, style = {} } = useResponsiveProps(rest, responsive);
  const equalSpan = flex === true;
  return (
    <div
      className={cx(styles.item, { [styles.equalSpan]: equalSpan })}
      style={flex && typeof flex !== 'boolean' ? { ...prefixFlex(flex), ...style } : style}>
      {run(() => {
        if (direction === FlexDirection.HORIZONTAL) {
          return <Margin size={{ right: size }} />;
        } else {
          return <Margin size={{ bottom: size }} />;
        }
      })}
    </div>
  );
};

export interface FlexItemProps {
  children: React.ReactNode;

  /** Determines how much space a flex item takes within the flex container. */
  flex?: number | boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const FlexItem = ({ responsive, ...rest }: FlexItemProps) => {
  const { children, flex, style = {} } = useResponsiveProps(rest, responsive);
  const equalSpan = flex === true;
  return (
    <div
      className={cx(styles.item, { [styles.equalSpan]: equalSpan })}
      style={flex && typeof flex !== 'boolean' ? { ...prefixFlex(flex), ...style } : style}>
      {children}
    </div>
  );
};

export interface FlexProps {
  children:
    | React.ReactElement<typeof FlexItem>
    | Array<React.ReactElement<typeof FlexItem>>
    | React.ReactElement<typeof FlexSpacer>
    | Array<React.ReactElement<typeof FlexSpacer>>;

  /**
   * Determines which way the flex layout should be
   * @default FlexDirection.HORIZONTAL
   */
  direction?: FlexDirection;

  /**
   * See flexbox justify-content
   * @default FlexJustify.CENTER
   */
  justify?: FlexJustify;

  /**
   * See flexbox align-items
   * @default FlexAlign.CENTER
   */
  align?: FlexAlign;

  /**
   * See flexbox flex-wrap. If true, sets to `wrap`
   * @default false
   */
  wrap?: boolean;

  /** To override simple styles on the flex element, use only for properties that do not require prefixing */
  style?: Style;

  /** If you need to customize the Flex container pass a custom className. E.g. if you want to use `display: inline-flex` */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Flex = ({ responsive, ...rest }: FlexProps) => {
  const {
    children,
    direction = FlexDirection.HORIZONTAL,
    justify = FlexJustify.CENTER,
    align = FlexAlign.CENTER,
    wrap = false,
    className,
    style,
  } = useResponsiveProps<FlexProps>(rest, responsive);

  const invalidChildren = React.Children.map(children, (x) => x).some(
    (child) =>
      child != null &&
      child.type !== FlexItem &&
      child.type !== FlexSpacer &&
      !child.type.toString().includes('fragment'),
  );
  if (invalidChildren) {
    console.warn('Flex should only accept FlexItem or FlexSpacer as children');
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
      {React.Children.map(children, (child) => {
        if (child?.type === FlexSpacer) {
          return React.cloneElement(
            child as React.ReactElement<typeof FlexSpacer>,
            { direction } as Partial<typeof FlexSpacer>,
          );
        }
        return child;
      })}
    </div>
  );
};
