import { css, cx } from 'emotion';
import { motion } from 'framer-motion';
import camelCase from 'lodash/camelCase';
import React from 'react';

import {
  getSettingsFromSpeed,
  getStaggerFromSpeed,
  getVariantFromDirection,
  groupVariants,
  itemVariants,
} from '../components';
import { Direction, Size, Speed } from '../enums';
import { Responsive, Style } from '../types';
import { checkComponentProps, run, useResponsiveProps } from '../utils';
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

  size?: Size;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  direction?: FlexDirection;
}

export const FlexSpacer = ({ responsive, direction, ...rest }: FlexSpacerProps) => {
  const { size = Size.DEFAULT, flex, style = {}, className } = useResponsiveProps(rest, responsive);
  const equalSpan = flex === true;
  return (
    <div
      className={cx(styles.item, { [styles.equalSpan]: equalSpan }, className)}
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

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  animated?: boolean;

  /** @private */
  animationSpeed?: Speed;
}

export const FlexItem = ({ responsive, ...rest }: FlexItemProps) => {
  const { children, flex, style = {}, animated, animationSpeed, className } = useResponsiveProps(
    rest,
    responsive,
  );
  const equalSpan = flex === true;
  const animationProps = animated
    ? {
        variants: itemVariants,
        transition: {
          type: 'spring',
          damping: 17,
          stiffness: 350,
          ...getSettingsFromSpeed(animationSpeed),
        },
      }
    : {};

  const RootElement = animated ? motion.div : 'div';

  return (
    <RootElement
      {...animationProps}
      className={cx(styles.item, { [styles.equalSpan]: equalSpan }, className)}
      style={flex && typeof flex !== 'boolean' ? { ...prefixFlex(flex), ...style } : style}>
      {children}
    </RootElement>
  );
};

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

  /** If true, flex children will be animated when entering */
  animated?: boolean;

  animationSpeed?: Speed;

  /** Determines where the flex items will come in from (relative to their own position). If not specified, a scale animation is used rather than a translate one */
  animationDirection?: Direction;

  /** In ms, if given, the animation of the whole group will only begin once this time has passed */
  animationDelay?: number;

  /** If true, last children come in first when animating */
  inversedStagger?: boolean;

  /** To override simple styles on the flex element, use only for properties that do not require prefixing */
  style?: Style;

  /** Used for style overrides */
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
    animated,
    animationSpeed,
    animationDirection,
    inversedStagger,
    animationDelay,
  } = useResponsiveProps<FlexProps>(rest, responsive);

  checkComponentProps({ children }, { children: [FlexItem, FlexSpacer] });

  const animationProps = animated
    ? {
        custom: {
          stagger: getStaggerFromSpeed(animationSpeed),
          staggerDirection: inversedStagger ? -1 : 1,
          delay: animationDelay,
        },
        variants: groupVariants,
        animate: ['enter', 'visible'],
        initial: ['initial', getVariantFromDirection(animationDirection)],
      }
    : {};

  const RootElement = animated ? motion.div : 'div';

  return (
    <RootElement
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
                  { animated, animationSpeed } as Partial<typeof FlexItem>,
                )
              : child;
          })
        : null}
    </RootElement>
  );
};
