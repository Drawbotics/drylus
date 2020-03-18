import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { themeStyles } from '../base';
import { Position } from '../enums';
import { Style } from '../types';
import { Deprecated, WrapperRef, getStyleForSide } from '../utils';

const styles = {
  root: css`
    position: fixed;
    padding: ${sv.paddingExtraSmall} ${sv.defaultPadding};
    background: ${sv.white};
    color: ${sv.colorPrimary};
    border-radius: ${sv.defaultBorderRadius};
    font-size: 0.9rem;
    opacity: 0;
    z-index: 99999;
    max-width: 300px;
    text-align: center;
    transform: translate(0, -5px);
    transition: transform ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve},
      opacity ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    filter: drop-shadow(${sv.elevation2});
    pointer-events: none;

    &::after {
      content: ' ';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0px;
      height: 0px;
      border-left: ${sv.marginExtraSmall} solid transparent;
      border-right: ${sv.marginExtraSmall} solid transparent;
      border-top: ${sv.marginExtraSmall} solid ${sv.white};
    }
  `,
  bottom: css`
    transform: translate(0, 5px);

    &::after {
      top: calc(${sv.marginExtraSmall} * -1);
      border-bottom: ${sv.marginExtraSmall} solid ${sv.white};
      border-left: ${sv.marginExtraSmall} solid transparent;
      border-right: ${sv.marginExtraSmall} solid transparent;
      border-top: 0;
    }
  `,
  left: css`
    transform: translate(-5px, 0);

    &::after {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-left: ${sv.marginExtraSmall} solid ${sv.white};
      border-bottom: ${sv.marginExtraSmall} solid transparent;
      border-top: ${sv.marginExtraSmall} solid transparent;
      border-right: 0;
    }
  `,
  right: css`
    transform: translate(5px, 0);

    &::after {
      left: calc(${sv.marginExtraSmall} * -1);
      top: 50%;
      transform: translateY(-50%);
      border-right: ${sv.marginExtraSmall} solid ${sv.white};
      border-bottom: ${sv.marginExtraSmall} solid transparent;
      border-top: ${sv.marginExtraSmall} solid transparent;
      border-left: 0;
    }
  `,
  visible: css`
    opacity: 1;
    transform: translate(0, 0);
    pointer-events: auto;
  `,
};

interface PopoverProps {
  /** @deprecated use content instead */
  message?: React.ReactNode;

  /** Content shown when the tooltip is visible */
  content: React.ReactNode;

  /** Component wrapped by the Popover */
  children: React.ReactNode;

  /** @default Position.TOP */
  side?: Position;

  /**
   * If true, the popover will close when clicked
   * @default false
   */
  exitOnClick?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const Popover = ({
  children,
  message,
  content: _content,
  side = Position.TOP,
  style = {},
  exitOnClick = false,
}: PopoverProps) => {
  const [visible, setVisible] = useState(false);
  const [outletElement, setOutletElement] = useState<HTMLElement>();
  const childrenRef = useRef<HTMLElement>();
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverRect = popoverRef.current?.getBoundingClientRect();

  const content = _content != null ? _content : message;

  useEffect(() => {
    const outlet = document.getElementById('popovers-outlet');
    if (outlet == null) {
      const popoversOutlet = document.createElement('div');
      popoversOutlet.id = 'popovers-outlet';
      document.body.appendChild(popoversOutlet);
      setOutletElement(popoversOutlet);
    } else {
      setOutletElement(outlet);
    }

    return () => {
      if (!visible && outletElement != null) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  useEffect(() => {
    const handleWindowClick = (e: Event) => {
      if (
        (visible &&
          e.target !== childrenRef.current &&
          !childrenRef.current?.contains(e.target as Node) &&
          e.target !== popoverRef.current &&
          !popoverRef.current?.contains(e.target as Node)) ||
        exitOnClick
      ) {
        setVisible(false);
      }
    };

    const handleMouseClick = () => setVisible(true);

    const handleMouseLeave = () => setVisible(false);

    if (childrenRef.current != null) {
      childrenRef.current.style.cursor = 'pointer';
      childrenRef.current.addEventListener('click', handleMouseClick);
      window.addEventListener('click', handleWindowClick, true);
      window.addEventListener('scroll', handleMouseLeave, true);
    }

    return () => {
      childrenRef.current?.removeEventListener('click', handleMouseClick);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('scroll', handleMouseLeave);
    };
  });

  if (outletElement == null) return null;

  const popoverStyle = getStyleForSide({
    side,
    rect: childrenRef.current?.getBoundingClientRect(),
    rectComponent: popoverRect,
  });

  return (
    <Fragment>
      <WrapperRef setChildrenRef={(node) => (childrenRef.current = node)}>{children}</WrapperRef>
      {ReactDOM.createPortal(
        <div className={themeStyles.root}>
          <div
            ref={popoverRef}
            className={cx(styles.root, {
              [styles.bottom]: side === Position.BOTTOM,
              [styles.left]: side === Position.LEFT,
              [styles.right]: side === Position.RIGHT,
              [styles.visible]: visible,
            })}
            style={{ ...popoverStyle, ...style }}>
            {content}
          </div>
        </div>,
        document.getElementById('popovers-outlet') as Element,
      )}
    </Fragment>
  );
};

Popover.propTypes = {
  message: Deprecated,
};