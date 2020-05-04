import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import { motion, useAnimation } from 'framer-motion';
import camelCase from 'lodash/camelCase';
import omit from 'lodash/omit';
import upperFirst from 'lodash/upperFirst';
import React, { useEffect, useRef } from 'react';

import { Size, Speed } from '../enums';
import { Responsive, Style } from '../types';
import { checkComponentProps, useResponsiveProps } from '../utils';

const styles = {
  root: (cols: number) => css`
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
  `,
  item: css``,
  withSpan: (span: number) => css`
    grid-column: span ${span};
  `,
  hGuttersExtraSmall: css`
    grid-row-gap: ${sv.marginExtraSmall};
  `,
  hGuttersSmall: css`
    grid-row-gap: ${sv.marginSmall};
  `,
  hGuttersDefault: css`
    grid-row-gap: ${sv.defaultMargin};
  `,
  hGuttersLarge: css`
    grid-row-gap: ${sv.marginLarge};
  `,
  hGuttersExtraLarge: css`
    grid-row-gap: ${sv.marginExtraLarge};
  `,
  vGuttersExtraSmall: css`
    grid-column-gap: ${sv.marginExtraSmall};
  `,
  vGuttersSmall: css`
    grid-column-gap: ${sv.marginSmall};
  `,
  vGuttersDefault: css`
    grid-column-gap: ${sv.defaultMargin};
  `,
  vGuttersLarge: css`
    grid-column-gap: ${sv.marginLarge};
  `,
  vGuttersExtraLarge: css`
    grid-column-gap: ${sv.marginExtraLarge};
  `,
};

const staticStyles = omit(styles, ['root', 'withSpan']);

const originIndex = 0;

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: (delayRef: React.MutableRefObject<number>) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: delayRef.current },
  }),
};

function _getDelayFromSpeed(speed?: Speed): number {
  switch (speed) {
    case Speed.FAST:
      return 0.0004;
    case Speed.SLOW:
      return 0.0015;
    default:
      return 0.0009;
  }
}

export interface GridItemProps {
  /** Content of the item */
  children: React.ReactNode;

  /**
   * How many columns should this item span
   * @default 1
   */
  span?: number;

  /** Used for style overrides */
  style?: Style;

  /** @private */
  columns?: number;

  /** @private */
  animated?: boolean;

  /** @private */
  animationSpeed?: Speed;

  /** @private */
  originOffset: React.MutableRefObject<{ top: number; left: number }>;

  /** @private */
  index: number;
}

export const GridItem = ({
  children,
  style,
  span = 1,
  columns = 1,
  animated,
  originOffset,
  index,
  animationSpeed,
}: GridItemProps) => {
  if (span > columns) {
    console.warn(`Warning: GridItem span cannot be more than number of columns`);
  }
  const withSpan = styles.withSpan(span);

  // Animation
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const delayPerPixel = _getDelayFromSpeed(animationSpeed);

  useEffect(() => {
    const element = ref.current;
    if (element == null) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (index === originIndex) {
      originOffset.current = offset.current;
    }
  }, [animated]);

  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    delayRef.current = d * delayPerPixel;
  }, [animated]);

  if (animated) {
    return (
      <motion.div
        variants={itemVariants}
        custom={delayRef}
        ref={ref}
        className={cx(styles.item, { [withSpan]: span != null })}
        style={style}>
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cx(styles.item, { [withSpan]: span != null })} style={style}>
      {children}
    </div>
  );
};

export interface GridProps {
  /** Should all be of type GridItem */
  children:
    | React.ReactElement<typeof GridItem>
    | Array<React.ReactElement<typeof GridItem> | null>
    | React.ReactNode;

  /** Number of columns for the grid */
  columns: number;

  /**
   * Space between items above and below
   * @kind Size
   */
  hGutters?: Size.EXTRA_SMALL | Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;

  /**
   * Space between items left and right
   * @kind Size
   */
  vGutters?: Size.EXTRA_SMALL | Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;

  /** If true, the grid items are animated following a stagger effect, as exemplified here https://miro.medium.com/max/2000/1*ShGeeuPIbLALrWwerNQvbw.gif */
  animated?: boolean;

  animationSpeed?: Speed;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Grid = ({ responsive, ...rest }: GridProps) => {
  const {
    children,
    columns,
    hGutters,
    vGutters,
    style,
    animated,
    animationSpeed,
  } = useResponsiveProps<GridProps>(rest, responsive);
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [animated]);

  checkComponentProps({ children }, { children: GridItem });

  return (
    <motion.div
      variants={{}}
      initial="hidden"
      animate={controls}
      className={cx(styles.root(columns), {
        [staticStyles[
          `hGutters${upperFirst(camelCase(hGutters ?? ''))}` as keyof typeof staticStyles
        ]]: hGutters != null,
        [staticStyles[
          `vGutters${upperFirst(camelCase(vGutters ?? ''))}` as keyof typeof staticStyles
        ]]: vGutters != null,
      })}
      style={style}>
      {React.Children.map(
        children as any,
        (child: React.ReactElement<typeof GridItem>, index: number) =>
          React.cloneElement(child, {
            columns,
            animated,
            originOffset,
            index,
            animationSpeed,
          } as Partial<typeof GridItem>),
      )}
    </motion.div>
  );
};
