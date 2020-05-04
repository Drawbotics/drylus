import { AnimatePresence, Transition, Variant, motion } from 'framer-motion';
import get from 'lodash/get';
import React, { Fragment } from 'react';

import { Direction, Speed } from '../enums';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

export const itemVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
    },
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
    y: 0,
    x: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
    },
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
   * The exit animation will be only a fade to opacity 0
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

  /** @private */
  noAnimate: boolean;
}

export const AnimatedItem = ({ responsive, ...rest }: AnimatedItemProps) => {
  const {
    children,
    speed = Speed.DEFAULT,
    direction,
    style,
    transition = {},
    variants = {},
    noAnimate,
    animateExit,
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
      animate={noAnimate ? undefined : ['enter', 'visible', 'customEnter']}
      exit={animateExit ? ['exit', 'customExit'] : undefined}
      variants={{ ...itemVariants, customEnter, customExit, customInitial }}
      transition={transitionOptions}>
      {children}
    </motion.div>
  );
};

export interface AnimationGroupProps {
  /** Some options require direct children be of AnimatedItem type */
  children: React.ReactNode;

  /**
   * Will set a delay between each AnimatedItem child: only works with DIRECT children
   * @default false
   */
  staggerChildren?: boolean;

  /** If true, last children come in first */
  inversedStagger?: boolean;

  /**
   * If true, any AnimatedItem will animate when unmounting, unless explicitely disabled by setting animateExit=false on the item
   * Note 1: for this to work, the AnimationGroup needs to be OUTSIDE the component being removed from the DOM
   * Note 2: this propagates to ALL AnimatedItems within the Group
   */
  animateExit?: boolean;

  /** Applies the `AnimatedItem` option of the same name to all the DIRECT `AnimatedItem` children */
  direction?: Direction;

  /** Applies the `AnimatedItem` option of the same name to all the DIRECT `AnimatedItem` children */
  speed?: Speed;
}

export const groupVariants = {
  visible: ({
    stagger = 0.2,
    staggerDirection,
  }: {
    stagger: number;
    staggerDirection: number;
  }) => ({
    transition: {
      staggerDirection,
      duration: stagger * 2,
      staggerChildren: stagger,
    },
  }),
  enter: ({ stagger = 0.2, staggerDirection }: { stagger: number; staggerDirection: number }) => ({
    transition: {
      staggerDirection,
      staggerChildren: stagger,
    },
  }),
  exit: ({ stagger = 0.2 }: { stagger: number }) => ({
    transition: {
      duration: stagger * 2,
      staggerChildren: stagger,
    },
  }),
};

export const AnimationGroup = ({
  children,
  direction,
  speed,
  staggerChildren = false,
  animateExit,
  inversedStagger,
}: AnimationGroupProps) => {
  const animationProps = {
    custom: { stagger: getStaggerFromSpeed(speed), staggerDirection: inversedStagger ? -1 : 1 },
    variants: groupVariants,
    animate: staggerChildren ? ['enter', 'visible'] : undefined,
    initial: ['initial', getVariantFromDirection(direction)],
    exit: ['exit'],
  };

  const isFragmentWrapped =
    get(children, 'type') === Fragment || get(children, 'props.originalType') === Fragment;

  const _children = React.Children.map(
    isFragmentWrapped ? (children as any).props.children : (children as any),
    (child) => {
      if (child?.type === AnimatedItem || child?.props.originalType === AnimatedItem) {
        return React.cloneElement(
          child as React.ReactElement<typeof AnimatedItem>,
          { direction, speed, noAnimate: !!staggerChildren, animateExit } as Partial<
            typeof AnimatedItem
          >,
        );
      }
      return child;
    },
  );

  const content = staggerChildren ? (
    <motion.div
      transition={inversedStagger ? { staggerDirection: -1 } : undefined}
      {...animationProps}>
      {_children}
    </motion.div>
  ) : (
    _children
  );

  if (animateExit) {
    return <AnimatePresence exitBeforeEnter>{children == null ? null : content}</AnimatePresence>;
  }

  return children == null ? null : content;
};
