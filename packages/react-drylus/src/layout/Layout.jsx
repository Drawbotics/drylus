import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  layout: css`
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr) max-content;
    grid-template-rows: max-content minmax(0, 1fr) max-content;
    width: 100%;
  `,
  left: css`
    grid-column: 1;
    grid-row: 2;
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
  // if (horizontalPreference) {
    return (
      <div className={styles.layout}>
        <div className={styles.left}>{left}</div>
        <div className={styles.top}>{top}</div>
        <div className={styles.content}>{children}</div>
        <div className={styles.bottom}>{bottom}</div>
        <div className={styles.right}>{right}</div>
      </div>
    );
  // }
  // return (
  //   <div className={styles.verticalContent}>
  //     <RefWrappedComponent withRef={topFixed} childRef={topRef} wrapperRef={topWrapperRef} content={top} />
  //     <div className={styles.horizontalContent}>
  //       <RefWrappedComponent withRef={leftFixed} childRef={leftRef} wrapperRef={leftWrapperRef} content={left} />
  //       <div className={styles.content}>
  //         {children}
  //       </div>
  //       <RefWrappedComponent withRef={rightFixed} childRef={rightRef} wrapperRef={rightWrapperRef} content={right} />
  //     </div>
  //     <RefWrappedComponent withRef={bottomFixed} childRef={bottomRef} wrapperRef={bottomWrapperRef} content={bottom} />
  //   </div>
  // );
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
