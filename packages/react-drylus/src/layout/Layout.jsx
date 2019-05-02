import React, { useRef, useEffect } from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  verticalContent: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  `,
  horizontalContent: css`
    display: flex;
    flex: 1;
    min-height: 0;
  `,
  content: css`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  `,
};


const RefWrappedComponent = ({ withRef, childRef, wrapperRef, content='' }) => {
  if (withRef) {
    return (
      <div ref={wrapperRef}>
        <div ref={childRef}>
          {content}
        </div>
      </div>
    );
  }
  else {
    return content;
  }
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
  const leftRef = useRef(null);
  const leftWrapperRef = useRef(null);

  const rightRef = useRef(null);
  const rightWrapperRef = useRef(null);

  const topRef = useRef(null);
  const topWrapperRef = useRef(null);

  const bottomRef = useRef(null);
  const bottomWrapperRef = useRef(null);

  useEffect(() => {
    if (leftFixed && leftWrapperRef.current && leftRef.current) {
      const widthDiff = leftRef.current.clientWidth;
      leftWrapperRef.current.style.width = `${widthDiff}px`;
      leftRef.current.style.position = 'fixed';
      leftRef.current.style.zIndex = '9999';
      leftRef.current.style.height = '100%';
    }

    if (rightFixed && rightWrapperRef.current && rightRef.current) {
      const widthDiff = rightRef.current.clientWidth;
      rightWrapperRef.current.style.width = `${widthDiff}px`;
      rightRef.current.style.position = 'fixed';
      rightRef.current.style.right = 0;
      rightRef.current.style.zIndex = '9999';
      rightRef.current.style.height = '100%';
    }

    if (topFixed && topWrapperRef.current && topRef.current) {
      const heightDiff = topRef.current.clientHeight;
      if (! topFloating) {
        topWrapperRef.current.style.height = `${heightDiff}px`;
      }
      topRef.current.style.position = 'fixed';
      topRef.current.style.zIndex = '9999';
      topRef.current.style.width = '100%';
    }

    if (bottomFixed && bottomWrapperRef.current && bottomRef.current) {
      const heightDiff = bottomRef.current.clientHeight;
      if (! bottomFloating) {
        bottomWrapperRef.current.style.height = `${heightDiff}px`;
      }
      bottomRef.current.style.position = 'fixed';
      bottomRef.current.style.bottom = 0;
      bottomRef.current.style.zIndex = '9999';
      bottomRef.current.style.width = '100%';
    }
  });

  if (horizontalPreference) {
    return (
      <div className={styles.horizontalContent}>
        <RefWrappedComponent withRef={leftFixed} childRef={leftRef} wrapperRef={leftWrapperRef} content={left} />
        <div className={styles.verticalContent}>
          <RefWrappedComponent withRef={topFixed} childRef={topRef} wrapperRef={topWrapperRef} content={top} />
          <div className={styles.content}>
            {children}
          </div>
          <RefWrappedComponent withRef={bottomFixed} childRef={bottomRef} wrapperRef={bottomWrapperRef} content={bottom} />
        </div>
        <RefWrappedComponent withRef={rightFixed} childRef={rightRef} wrapperRef={rightWrapperRef} content={right} />
      </div>
    );
  }
  return (
    <div className={styles.verticalContent}>
      <RefWrappedComponent withRef={topFixed} childRef={topRef} wrapperRef={topWrapperRef} content={top} />
      <div className={styles.horizontalContent}>
        <RefWrappedComponent withRef={leftFixed} childRef={leftRef} wrapperRef={leftWrapperRef} content={left} />
        <div className={styles.content}>
          {children}
        </div>
        <RefWrappedComponent withRef={rightFixed} childRef={rightRef} wrapperRef={rightWrapperRef} content={right} />
      </div>
      <RefWrappedComponent withRef={bottomFixed} childRef={bottomRef} wrapperRef={bottomWrapperRef} content={bottom} />
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
