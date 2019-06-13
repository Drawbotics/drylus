import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  layout: css`
    display: grid;
    width: 100%;
    height: 100%;
  `,
  top: css`
    grid-template-rows: max-content minmax(0, 1fr);

    > [data-element="bar"] {
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

    > [data-element="bar"] {
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

    > [data-element="bar"] {
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

    > [data-element="bar"] {
      grid-column: 1;
      grid-row: 1;
    }
    > [data-element="layout-content"] {
      grid-column: 2;
      grid-row: 1;
    }
  `,
  bar: css`
    overflow: scroll;
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


export const LayoutPositions = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  TOP: 'TOP',
};


const Layout = ({
  children,
  position,
  bar,
  fixed,
}) => {
  return (
    <div data-element="layout" className={cx(styles.layout, {
      [styles[position.toLowerCase()]]: position,
    })}>
      <div className={styles.bar} data-element="bar">{bar}</div>
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
  position: PropTypes.oneOf(Object.keys(LayoutPositions)).isRequired,

  /** If true the component will be fixed in place, and the children will scroll independently */
  fixed: PropTypes.bool,
};


export default Layout;
