import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import camelCase from 'lodash/camelCase';
import omit from 'lodash/omit';
import upperFirst from 'lodash/upperFirst';
import React from 'react';

import { Size } from '../enums';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

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
}

export const GridItem = ({ children, style, span = 1, columns = 1 }: GridItemProps) => {
  if (span > columns) {
    console.warn(`Warning: GridItem span cannot be more than number of columns`);
  }
  const withSpan = styles.withSpan(span);
  return (
    <div className={cx(styles.item, { [withSpan]: !!span })} style={style}>
      {children}
    </div>
  );
};

export interface GridProps {
  /** Should all be of type GridItem */
  children: React.ReactElement<typeof GridItem> | Array<React.ReactElement<typeof GridItem>>;

  /** Number of columns for the grid */
  columns: number;

  /** Space between items above and below */
  hGutters?: Size.EXTRA_SMALL | Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;

  /** Space between items left and right */
  vGutters: Size.EXTRA_SMALL | Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Grid = ({ responsive, ...rest }: GridProps) => {
  const { children, columns, hGutters, vGutters, style } = useResponsiveProps<GridProps>(
    rest,
    responsive,
  );

  const invalidChildren = React.Children.map(children, (x) => x).some(
    (child) => child != null && child.type !== GridItem,
  );
  if (invalidChildren) {
    console.warn('Grid should only accept GridItem as children');
  }
  return (
    <div
      className={cx(styles.root(columns), {
        [staticStyles[
          `hGutters${upperFirst(camelCase(hGutters ?? ''))}` as keyof typeof staticStyles
        ]]: hGutters != null,
        [staticStyles[
          `vGutters${upperFirst(camelCase(vGutters ?? ''))}` as keyof typeof staticStyles
        ]]: vGutters != null,
      })}
      style={style}>
      {React.Children.map(children, (child: React.ReactElement<typeof GridItem>) =>
        React.cloneElement(child, { columns } as Partial<typeof GridItem>),
      )}
    </div>
  );
};
