import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  layout: css`
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr) max-content;
    grid-template-rows: max-content minmax(0, 1fr) max-content;
    width: 100%;
  `,
  topDown: css`
    > [data-element="left"], [data-element="right"] {
      grid-row: 1 / span 3;
    }

    > [data-element="top"], [data-element="bottom"] {
      grid-column: 2;
    }
   `,
  left: css`
    grid-column: 1;
    grid-row: 2;
  `,
  leftFixed: css`
    
  `,
  right: css`
    grid-column: 3;
    grid-row: 2;
  `,
  top: css`
    grid-column: 1 / span 3;
    grid-row: 1;
  `,
  bottom: css`
    grid-column: 1 / span 3;
    grid-row: 3;
  `,
  content: css`
    grid-column: 2;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    ${'' /* overflow: scroll; */}
  `,
};


const Layout = ({
  children,
  top,
  topFixed,
  topFloating,
  bottom,
  bottomFixed,
  bottomFloating,
  left,
  leftFixed,
  right,
  rightFixed,
  horizontalPreference,
}) => {
  return (
    <div className={cx(styles.layout, { [styles.topDown]: horizontalPreference })}>
      <div className={cx(styles.left, { [styles.leftFixed]: leftFixed })} data-element="left">{left}</div>
      <div className={styles.top} data-element="top">{top}</div>
      <div className={styles.content} data-element="content">{children}</div>
      <div className={styles.bottom} data-element="bottom">{bottom}</div>
      <div className={styles.right} data-element="right">{right}</div>
    </div>
  );
};


Layout.propTypes = {
  /** Children can be of any type. You can pass another Layout if needed as well */
  children: PropTypes.node.isRequired,

  /** Changes the flow from top-bottom to left-right */
  horizontalPreference: PropTypes.bool,

  /** Component to be rendered at the top, bottom, left or right of the layout */
  top: PropTypes.element,
  bottom: PropTypes.element,
  left: PropTypes.element,
  right: PropTypes.element,

  /** If true, the top component will stay fixed in position */
  topFixed: PropTypes.bool,

  /** Used with topFixed. If true the top component will overlap the content */
  topFloating: PropTypes.bool,

  /** If true, the bottom component will stay fixed in position */
  bottomFixed: PropTypes.bool,

  /** Used with bottomFixed. If true the bottom component will overlap the content */
  bottomFloating: PropTypes.bool,

  /** If true, the left component will stay fixed in position */
  leftFixed: PropTypes.bool,

  /** If true, the right component will stay fixed in position */
  rightFixed: PropTypes.bool,
};


export default Layout;
