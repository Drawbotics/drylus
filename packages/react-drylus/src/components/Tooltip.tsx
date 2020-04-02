import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { themeStyles } from '../base';
import { Position } from '../enums';
import { Responsive, Style } from '../types';
import { Deprecated, WrapperRef, getStyleForSide, useResponsiveProps } from '../utils';

const styles = {
  root: css`
    position: fixed;
    padding: ${sv.paddingExtraSmall} ${sv.defaultPadding};
    background: ${sv.neutralDarkest};
    color: ${sv.colorPrimaryInverse};
    border-radius: ${sv.defaultBorderRadius};
    font-size: 0.9rem;
    opacity: 0;
    pointer-events: none;
    z-index: 99999;
    max-width: 300px;
    text-align: center;
    transform: translate(0, -5px);
    transition: transform ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve},
      opacity ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

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
      border-top: ${sv.marginExtraSmall} solid ${sv.neutralDarkest};
    }
  `,
  bottom: css`
    transform: translate(0, 5px);

    &::after {
      top: calc(${sv.marginExtraSmall} * -1);
      border-bottom: ${sv.marginExtraSmall} solid ${sv.neutralDarkest};
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
      border-left: ${sv.marginExtraSmall} solid ${sv.neutralDarkest};
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
      border-right: ${sv.marginExtraSmall} solid ${sv.neutralDarkest};
      border-bottom: ${sv.marginExtraSmall} solid transparent;
      border-top: ${sv.marginExtraSmall} solid transparent;
      border-left: 0;
    }
  `,
  visible: css`
    opacity: 1;
    transform: translate(0, 0);
  `,
};

export const tooltipStyles = styles;

interface TooltipProps {
  /** @deprecated use 'content' instead */
  message?: React.ReactNode;

  /** Content shown when the tooltip is visible */
  content: React.ReactNode;

  /** Component wrapped by the tooltip */
  children: React.ReactNode;

  /** @default Position.TOP */
  side?: Position;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

interface HTMLElementWithDisabled extends HTMLElement {
  disabled?: boolean;
}

export const Tooltip = ({ responsive, ...rest }: TooltipProps) => {
  const {
    children,
    message,
    content: _content,
    side = Position.TOP,
    style = {},
  } = useResponsiveProps<TooltipProps>(rest, responsive);

  const [visible, setVisible] = useState(false);
  const [outletElement, setOutletElement] = useState<HTMLElement>();
  const childrenRef = useRef<HTMLElementWithDisabled>();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipRect = tooltipRef.current?.getBoundingClientRect();

  const content = _content != null ? _content : message;

  useEffect(() => {
    const outlet = document.getElementById('tooltips-outlet');
    if (outlet == null) {
      const tooltipsOutlet = document.createElement('div');
      tooltipsOutlet.id = 'tooltips-outlet';
      document.body.appendChild(tooltipsOutlet);
      setOutletElement(tooltipsOutlet);
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
    let timeout: ReturnType<typeof setTimeout>;

    const handleMouseEnter = () => {
      timeout = setTimeout(() => setVisible(true), 200);
    };

    const handleMouseLeave = () => {
      clearTimeout(timeout);
      setVisible(false);
    };

    if (childrenRef.current != null) {
      if (childrenRef.current.disabled) {
        childrenRef.current.addEventListener('pointerenter', handleMouseEnter);
        childrenRef.current.addEventListener('pointerleave', handleMouseLeave);
      } else {
        childrenRef.current.addEventListener('mouseenter', handleMouseEnter);
        childrenRef.current.addEventListener('mouseleave', handleMouseLeave);
      }

      window.addEventListener('scroll', handleMouseLeave, true);
    }

    return () => {
      childrenRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      childrenRef.current?.removeEventListener('pointerenter', handleMouseEnter);
      childrenRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      childrenRef.current?.removeEventListener('pointerleave', handleMouseLeave);

      window.removeEventListener('scroll', handleMouseLeave);
    };
  });

  if (outletElement == null) return null;

  const tooltipStyle = getStyleForSide({
    side,
    rect: childrenRef.current?.getBoundingClientRect(),
    rectComponent: tooltipRect,
  });

  return (
    <Fragment>
      <WrapperRef setChildrenRef={(node) => (childrenRef.current = node)}>{children}</WrapperRef>
      {ReactDOM.createPortal(
        <div className={themeStyles.root}>
          <div
            ref={tooltipRef}
            className={cx(styles.root, {
              [styles.bottom]: side === Position.BOTTOM,
              [styles.left]: side === Position.LEFT,
              [styles.right]: side === Position.RIGHT,
              [styles.visible]: visible,
            })}
            style={{ ...tooltipStyle, ...style }}>
            {content}
          </div>
        </div>,
        document.getElementById('tooltips-outlet') as Element,
      )}
    </Fragment>
  );
};

Tooltip.propTypes = {
  category: Deprecated,
};
