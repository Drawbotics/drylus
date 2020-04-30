import { motion } from 'framer-motion';
import React from 'react';

import { Direction, Speed } from '../enums';
import { Responsive, Style } from '../types';

export interface AnimationVariants {
  initial?: object;
  enter?: object;
  exit?: object;
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

  /** To override the root `div` element styles if needed */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const AnimatedItem = ({ children }: AnimatedItemProps) => {
  return <motion.div>{children}</motion.div>;
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
  return <div>{children}</div>;
};
