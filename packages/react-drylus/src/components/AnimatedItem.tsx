import { Transition, Variant, motion } from 'framer-motion';
import React from 'react';

import { Direction, Speed } from '../enums';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

export const itemVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  small: {
    scale: 0.7,
  },
  up: {
    y: 20,
  },
  down: {
    y: -20,
  },
  right: {
    x: -20,
  },
  left: {
    x: 20,
  },
  enter: {
    scale: 1,
    opacity: 1,
    y: 0,
    x: 0,
  },
};

export function getVariantFromDirection(direction?: Direction): keyof typeof itemVariants {
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

export function getStaggerFromSpeed(speed?: Speed): number {
  switch (speed) {
    case Speed.SLOW:
      return 0.3;
    case Speed.FAST:
      return 0.1;
    default:
      return 0.2;
  }
}

export function getSettingsFromSpeed(speed?: Speed) {
  switch (speed) {
    case Speed.FAST:
      return {
        damping: 20,
        mass: 0.7,
        stiffness: 250,
      };
    case Speed.SLOW:
      return {
        stiffness: 350,
        damping: 25,
        mass: 2,
      };
    default:
      return {};
  }
}

export interface AnimationVariants {
  initial?: Variant;
  enter?: Variant;
  exit?: Variant;
}

export interface AnimatedItemProps {
  /** The elements that will be animated */
  children: React.ReactNode;

  /**
   * Animates when unmounting, only possible if AnimationGroup wraps the component
   * The exit animation will be the opposite of the enter animation i.e. if scale 0.5 -> 1, then exit = 1 -> 0.5
   * This option can be used to individually animate one item within AnimationGroup, or disabling it as well if the option is set on the AnimationGroup
   */
  animateExit?: boolean;

  /**
   * If no direction is provided, the item uses the "scale up, fade in" animation
   * With direction, the component is moved (in the given direction) and faded in, no scale
   */
  direction?: Direction;

  /**
   * Speed of the animation
   * @default DEFAULT
   */
  speed?: Speed;

  /**
   * Used to override each animation variant, see https://www.framer.com/api/motion/animation/#variants
   * Each variant can be overriden separately: `initial`, `enter` (framer `animate` equivalent), `exit`
   */
  variants?: AnimationVariants;

  /** To override the default transition settings (these also change depending on the speed and direction) */
  transition?: Transition;

  /** To override the root `div` element styles if needed */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const AnimatedItem = ({ responsive, ...rest }: AnimatedItemProps) => {
  const {
    children,
    speed = Speed.DEFAULT,
    direction,
    style,
    transition = {},
    variants = {},
  } = useResponsiveProps<AnimatedItemProps>(rest, responsive);

  const { exit: customExit = {}, enter: customEnter = {}, initial: customInitial = {} } = variants;

  const transitionOptions = {
    type: 'spring',
    damping: 17,
    stiffness: 400,
    ...getSettingsFromSpeed(speed),
    ...transition,
  };

  return (
    <motion.div
      style={style}
      initial={['initial', getVariantFromDirection(direction), 'customInitial']}
      animate={['enter', 'customEnter']}
      exit={['exit', 'customExit']}
      variants={{ ...itemVariants, customEnter, customExit, customInitial }}
      transition={transitionOptions}>
      {children}
    </motion.div>
  );
};

export interface AnimationGroupProps {
  /** Should be of AnimatedItem type */
  children:
    | React.ReactElement<typeof AnimatedItem>
    | Array<React.ReactElement<typeof AnimatedItem> | null>
    | React.ReactNode;

  /**
   * Will set a delay between each AnimatedItem child
   * @default true
   */
  staggerChildren: boolean;

  /**
   * If true, any AnimatedItem will animate when unmounting, unless explicitely disabled by setting animateExit=false on the item
   * Note 1: for this to work, the AnimationGroup needs to be OUTSIDE the component being removed from the DOM
   * Note 2: this propagates to ALL AnimatedItems within the Group
   */
  animateExit?: boolean;
}

export const AnimationGroup = ({ children }: AnimationGroupProps) => {
  return <motion.div>{children}</motion.div>;
};
