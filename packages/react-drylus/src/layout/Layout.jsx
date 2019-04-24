import React, { useRef, useEffect } from 'react';
import { css } from 'emotion';


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
      leftRef.current.style.height = '100%';
    }

    if (rightFixed && rightWrapperRef.current && rightRef.current) {
      const widthDiff = rightRef.current.clientWidth;
      rightWrapperRef.current.style.width = `${widthDiff}px`;
      rightRef.current.style.position = 'fixed';
      rightRef.current.style.right = 0;
      rightRef.current.style.height = '100%';
    }

    if (topFixed && topWrapperRef.current && topRef.current) {
      const heightDiff = topRef.current.clientHeight;
      if (! topFloating) {
        topWrapperRef.current.style.height = `${heightDiff}px`;
      }
      topRef.current.style.position = 'fixed';
      topRef.current.style.width = '100%';
    }

    if (bottomFixed && bottomWrapperRef.current && bottomRef.current) {
      const heightDiff = bottomRef.current.clientHeight;
      if (! bottomFloating) {
        bottomWrapperRef.current.style.height = `${heightDiff}px`;
      }
      bottomRef.current.style.position = 'fixed';
      bottomRef.current.style.bottom = 0;
      bottomRef.current.style.width = '100%';
    }
  });

  if (horizontalPreference) {
    return (
      <div className={styles.horizontalContent}>
        {do{
          if (leftFixed) {
            <div ref={leftWrapperRef}>
              <div ref={leftRef}>
                {left}
              </div>
            </div>
          }
          else {
            left
          }
        }}
        <div className={styles.verticalContent}>
          {top}
          <div className={styles.content}>
            {children}
          </div>
          {bottom}
        </div>
        {do{
          if (rightFixed) {
            <div ref={rightWrapperRef}>
              <div ref={rightRef}>
                {right}
              </div>
            </div>
          }
          else {
            right
          }
        }}
      </div>
    );
  }
  return (
    <div className={styles.verticalContent}>
      {do{
        if (topFixed) {
          <div ref={topWrapperRef}>
            <div ref={topRef}>
              {top}
            </div>
          </div>
        }
        else {
          top
        }
      }}
      <div className={styles.horizontalContent}>
        {left}
        <div className={styles.content}>
          {children}
        </div>
        {right}
      </div>
      {do{
        if (bottomFixed) {
          <div ref={bottomWrapperRef}>
            <div ref={bottomRef}>
              {bottom}
            </div>
          </div>
        }
        else {
          bottom
        }
      }}
    </div>
  );
};


export default Layout;
