import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import Enum from '@drawbotics/enums';

import { getEnumAsClass, deprecateProperty } from '../utils';
import { useResponsiveProps } from '../utils/hooks';
import { Position } from '../enums';


const styles = {
  layout: css`
    display: grid;
    width: 100%;
    height: 100%;
  `,
  top: css`
    grid-template-rows: max-content minmax(0, 1fr);

    > [data-element="layout-bar"] {
      grid-column: 1;
      grid-row: 1;
    }
    > [data-element="layout-content"] {
      grid-column: 1;
      grid-row: 2;
    }
  `,
  bottom: css`
    grid-template-rows: minmax(0, 1fr) max-content;

    > [data-element="layout-bar"] {
      grid-column: 1;
      grid-row: 2;
    }
    > [data-element="layout-content"] {
      grid-column: 1;
      grid-row: 1;
    }
  `,
  right: css`
    grid-template-columns: minmax(0, 1fr) max-content;

    > [data-element="layout-bar"] {
      grid-column: 2;
      grid-row: 1;
    }
    > [data-element="layout-content"] {
      grid-column: 1;
      grid-row: 1;
    }
  `,
  left: css`
    grid-template-columns: max-content minmax(0, 1fr);

    > [data-element="layout-bar"] {
      grid-column: 1;
      grid-row: 1;
    }
    > [data-element="layout-content"] {
      grid-column: 2;
      grid-row: 1;
    }
  `,
  bar: css`
    display: flex;
    flex-direction: column;
  `,
  content: css`
    display: flex;
    flex-direction: column;

    > [data-element="layout"] {
      flex: 1;
      height: auto !important;
    }
  `,
  scrollable: css`
    overflow: scroll;
  `,
};


/**
 * @deprecated and will be removed in version 6.0
 */
export const LayoutPositions = deprecateProperty(new Enum(
  'LEFT',
  'RIGHT',
  'BOTTOM',
  'TOP',
), 'LayoutPositions', 'Position');


const Layout = ({
  responsive,
  ...rest,
}) => {
  const {
    children,
    position,
    bar,
    fixed,
    barScrollable,
    style,
  } = useResponsiveProps(rest, responsive);
  
  return (
    <div
      style={style}
      data-element="layout"
      className={cx(styles.layout, {
        [styles[getEnumAsClass(position)]]: position,
      })}>
      <div className={cx(styles.bar, { [styles.scrollable]: barScrollable })} data-element="layout-bar">{bar}</div>
      <div className={cx(styles.content, { [styles.scrollable]: fixed })} data-element="layout-content">{children}</div>
    </div>
  );
};


Layout.propTypes = {
  /** Children can be of any type. You can pass another Layout if needed as well */
  children: PropTypes.node.isRequired,

  /** Component that will be displayed in addition to the children */
  bar: PropTypes.node.isRequired,

  /** Determines on which side of the layout the bar component will be shown */
  position: PropTypes.oneOf([
    Position.LEFT,
    Position.RIGHT,
    Position.TOP,
    Position.BOTTOM,
  ]).isRequired,

  /** If true the component will be fixed in place, and the children will scroll independently */
  fixed: PropTypes.bool,

  /** If false the sidebar container is not made scrollable */
  barScrollable: PropTypes.bool,

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


Layout.defaultProps = {
  barScrollable: true,
};


export default Layout;
