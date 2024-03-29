import { AnimatePresence, Transition, Variant, motion } from 'framer-motion';
import get from 'lodash/get';
import React, { Fragment, useEffect, useState } from 'react';

import { Direction, Speed } from '../enums';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

export const itemVariants = {
  initial: {
    opacity: 0,
  },
  visible: (delay?: number) => ({
    opacity: 1,
    transition: {
      ...(delay ? { delay: delay / 1000 } : {}),
      type: 'tween',
    },
  }),
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

export function getVariantFromDirection(
  direction?: Direction,
): keyof Pick<typeof itemVariants, 'down' | 'up' | 'right' | 'left' | 'small'> {
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

export function getSettingsFromSpeed(speed?: Speed): Transition {
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
   * This option can be used to individually disable the exit animation if the option is set on the AnimationGroup (not considered if `staggerChildren` is set)
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

  /** In ms, time to wait before starting the animation */
  delay?: number;

  /** To override the root `div` element styles if needed */
  style?: Style;

  /** Passed to the root `div` element */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  noAnimate?: boolean;
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
    delay = 0,
    className,
  } = useResponsiveProps<AnimatedItemProps>(rest, responsive);

  const { exit: customExit = {}, enter: customEnter = {}, initial: customInitial = {} } = variants;

  const transitionOptions = {
    type: 'spring',
    damping: 17,
    stiffness: 400,
    ...getSettingsFromSpeed(speed),
    ...(noAnimate ? {} : { delay: delay / 1000 }),
    ...transition,
  };

  return (
    <motion.div
      style={style}
      className={className}
      custom={noAnimate ? undefined : delay}
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

  /** In ms, if given, the animation of the whole group will only begin once this time has passed */
  delay?: number;

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
    delay,
  }: {
    stagger: number;
    staggerDirection: number;
    delay?: number;
  }) => ({
    transition: {
      ...(delay ? { delayChildren: delay / 1000 } : {}),
      when: 'beforeChildren',
      staggerDirection,
      duration: stagger * 2,
      staggerChildren: stagger,
    },
  }),
  enter: ({
    stagger = 0.2,
    staggerDirection,
    delay,
  }: {
    stagger: number;
    staggerDirection: number;
    delay?: number;
  }) => ({
    transition: {
      ...(delay ? { delayChildren: delay / 1000 } : {}),
      when: 'beforeChildren',
      staggerDirection,
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
  delay,
}: AnimationGroupProps) => {
  const [exitBeforeEnter, setExitBeforeEnter] = useState<boolean>();

  const animationProps = {
    custom: {
      stagger: getStaggerFromSpeed(speed),
      staggerDirection: inversedStagger ? -1 : 1,
      delay,
    },
    variants: groupVariants,
    animate: staggerChildren ? ['enter', 'visible'] : undefined,
    initial: ['initial', getVariantFromDirection(direction)],
    exit: ['exit'],
  };

  const isFragmentWrapped =
    get(children, 'type') === Fragment || get(children, 'props.originalType') === Fragment;

  const processedChildren = React.Children.map(
    isFragmentWrapped ? (children as any).props.children : (children as any),
    (child) => {
      if (child?.type === AnimatedItem || child?.props.originalType === AnimatedItem) {
        return React.cloneElement(
          child as React.ReactElement<typeof AnimatedItem>,
          {
            direction,
            speed,
            delay,
            noAnimate: !!staggerChildren,
            animateExit: child.props.animateExit != null ? child.props.animateExit : animateExit,
          } as Partial<typeof AnimatedItem>,
        );
      }
      return child;
    },
  );

  const content = staggerChildren ? (
    <motion.div
      transition={inversedStagger ? { staggerDirection: -1 } : undefined}
      {...animationProps}>
      {processedChildren}
    </motion.div>
  ) : (
    processedChildren
  );

  if (animateExit) {
    useEffect(() => {
      if (exitBeforeEnter == null) {
        setExitBeforeEnter(React.Children.count(content) === 1);
      }
    }, []);

    return (
      <AnimatePresence key={exitBeforeEnter ? 1 : -1} exitBeforeEnter={exitBeforeEnter}>
        {children == null ? null : content}
      </AnimatePresence>
    );
  }

  return children == null ? null : content;
};
