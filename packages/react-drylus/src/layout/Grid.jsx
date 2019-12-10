import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import sv from '@drawbotics/drylus-style-vars';

import Sizes from '../enums/Sizes';
import { useResponsiveProps } from '../utils/hooks';


const styles = {
  root: (cols) => css`
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
  `,
  item: css`
  `,
  withSpan: (span) => css`
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


export const GridItem = ({
  children,
  style,
  span,
  columns,
}) => {
  if (span > columns) {
    console.warn(`Warning: GridItem span cannot be more than number of columns`);
  }
  const withSpan = styles.withSpan(span);
  return (
    <div className={cx(styles.item, { [withSpan]: span })} style={style}>
      {children}
    </div>
  );
};

GridItem.propTypes = {
  /** Content of the item */
  children: PropTypes.node.isRequired,

  /** How many columns should this item span */
  span: PropTypes.number,

  /** For custom overrides */
  style: PropTypes.object,
};


const Grid = ({
  responsive,
  ...rest,
}) => {
  const {
    children,
    columns,
    hGutters,
    vGutters,
    style,
  } = useResponsiveProps(rest, responsive);
  
  const invalidChildren = React.Children
    .toArray(children)
    .some((child) => child != null && child.type !== GridItem);
  if (invalidChildren) {
    console.warn('Grid should only accept GridItem as children');
  }
  return (
    <div
      className={cx(styles.root(columns), {
        [styles[`hGutters${upperFirst(camelCase(hGutters?.description))}`]]: hGutters,
        [styles[`vGutters${upperFirst(camelCase(vGutters?.description))}`]]: vGutters,
      })}
      style={style}>
      {React.Children.map(children, (child) => React.cloneElement(child, { columns }))}
    </div>
  );
};


Grid.propTypes = {
  /** Should all be of type GridItem */
  children: PropTypes.node.isRequired,

  /** Number of columns for the grid */
  columns: PropTypes.number.isRequired,

  /** Space between items above and below */
  hGutters: PropTypes.oneOf([
    Sizes.EXTRA_SMALL,
    Sizes.SMALL,
    Sizes.DEFAULT,
    Sizes.LARGE,
    Sizes.EXTRA_LARGE,
  ]),

  /** Space between items left and right */
  vGutters: PropTypes.oneOf([
    Sizes.EXTRA_SMALL,
    Sizes.SMALL,
    Sizes.DEFAULT,
    Sizes.LARGE,
    Sizes.EXTRA_LARGE,
  ]),

  /** For custom overrides */
  style: PropTypes.object,

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
};


export default Grid;
