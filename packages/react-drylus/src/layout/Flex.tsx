import { css, cx } from 'emotion';
import { motion } from 'framer-motion';
import camelCase from 'lodash/camelCase';
import React from 'react';

import { Direction, Easing, Size, Speed } from '../enums';
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

function _getSettingsFromSpeed(speed?: Speed) {
  switch (speed) {
    case Speed.FAST:
      return {
        stiffness: 300,
      };
    case Speed.SLOW:
      return {
        damping: 15,
      };
    default:
      return {};
  }
}

const flexItemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  small: {
    scale: 0.5,
  },
  up: {
    y: 10,
  },
  down: {
    y: -10,
  },
  right: {
    x: -10,
  },
  left: {
    x: 10,
  },
  final: {
    scale: 1,
    opacity: 1,
    y: 0,
    x: 0,
  },
};

export interface FlexItemProps {
  children: React.ReactNode;

  /** Determines how much space a flex item takes within the flex container. */
  flex?: number | boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  animated?: boolean;

  /** @private */
  animationSpeed?: Speed;

  /** @private */
  animationEasing?: Easing;
}

export const FlexItem = ({ responsive, ...rest }: FlexItemProps) => {
  const {
    children,
    flex,
    style = {},
    animated,
    animationSpeed,
    // animationEasing,
  } = useResponsiveProps(rest, responsive);
  const equalSpan = flex === true;
  const animationProps = animated
    ? {
        variants: flexItemVariants,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 300,
          ..._getSettingsFromSpeed(animationSpeed),
        },
      }
    : {};

  return (
    <motion.div
      {...animationProps}
      className={cx(styles.item, { [styles.equalSpan]: equalSpan })}
      style={flex && typeof flex !== 'boolean' ? { ...prefixFlex(flex), ...style } : style}>
      {children}
    </motion.div>
  );
};

const flexVariants = {
  final: (stagger: number = 0.2) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

function _getVariantFromDirection(direction?: Direction): keyof typeof flexItemVariants {
  switch (direction) {
    case Direction.TOP_DOWN:
      return 'down';
    case Direction.BOTTOM_UP:
      return 'up';
    case Direction.LEFT_RIGHT:
      return 'right';
    case Direction.RIGHT_LEFT:
      return 'left';
    default:
      return 'small';
  }
}

function _getStaggerFromSpeed(speed?: Speed): number {
  switch (speed) {
    case Speed.SLOW:
      return 0.3;
    case Speed.FAST:
      return 0.1;
    default:
      return 0.2;
  }
}

export interface FlexProps {
  children:
    | React.ReactElement<typeof FlexItem>
    | Array<React.ReactElement<typeof FlexItem> | null>
    | React.ReactElement<typeof FlexSpacer>
    | Array<React.ReactElement<typeof FlexSpacer> | null>
    | React.ReactNode;

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

  /** If true, flex children will be animated when entering */
  animated?: boolean;

  animationSpeed?: Speed;

  animationEasing?: Easing;

  /** Determines where the flex items will come in from (relative to their own position). If not specified, a scale animation is used rather than a translate one */
  animationDirection?: Direction;

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
    animated,
    animationSpeed,
    animationDirection,
    animationEasing,
  } = useResponsiveProps<FlexProps>(rest, responsive);

  const invalidChildren = React.Children.map(children as any, (x) => x).some(
    (child: React.ReactElement) =>
      child != null &&
      child.type !== FlexItem &&
      child.type !== FlexSpacer &&
      !child.type.toString().includes('fragment'),
  );
  if (invalidChildren) {
    console.warn('Flex should only accept FlexItem or FlexSpacer as children.');
  }

  const animationProps = animated
    ? {
        custom: _getStaggerFromSpeed(animationSpeed),
        variants: flexVariants,
        animate: 'final',
        initial: ['hidden', _getVariantFromDirection(animationDirection)],
      }
    : {};

  return (
    <motion.div
      {...animationProps}
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
      {children != null
        ? React.Children.map(children as any, (child) => {
            if (child?.type === FlexSpacer) {
              return React.cloneElement(
                child as React.ReactElement<typeof FlexSpacer>,
                { direction } as Partial<typeof FlexSpacer>,
              );
            }
            return animated
              ? React.cloneElement(
                  child as React.ReactElement<typeof FlexItem>,
                  { animated, animationSpeed, animationEasing } as Partial<typeof FlexItem>,
                )
              : child;
          })
        : null}
    </motion.div>
  );
};
