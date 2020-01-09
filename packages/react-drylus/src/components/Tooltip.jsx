import React, { Fragment, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import Enum from '@drawbotics/enums';

import { styles as themeStyles } from '../base/ThemeProvider';
import { useRect } from '../utils/hooks';
import { getStyleForSide, CustomPropTypes, deprecateProperty } from '../utils';
import { Position } from '../enums';
import { useResponsiveProps } from '../utils/hooks';


export const styles = {
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


/**
 * @deprecated and will be removed in version 6.0
 */
export const TooltipSides = deprecateProperty(new Enum(
  'TOP',
  'LEFT',
  'BOTTOM',
  'RIGHT',
), 'TooltipSides', 'Position');


const Tooltip = ({
  responsive,
  ...rest,
}) => {
  const {
    children,
    message,
    content: _content,
    side,
    style,
  } = useResponsiveProps(rest, responsive);

  const [ visible, setVisible ] = useState(false);
  const [ outletElement, setOutletElement ] = useState(null);
  const childrenRef = useRef();
  const tooltipRef = useRef();
  const { rect, setRect } = useRect();
  const tooltipRect = tooltipRef.current?.getBoundingClientRect();

  const content = _content != null ? _content : message;

  useEffect(() => {
    if ( ! document.getElementById('tooltips-outlet')) {
      const tooltipsOutlet = document.createElement('div');
      tooltipsOutlet.id = 'tooltips-outlet';
      document.body.appendChild(tooltipsOutlet);
      setOutletElement(tooltipsOutlet);
    }
    else {
      setOutletElement(document.getElementById('tooltips-outlet'));
    }

    return () => {
      if (! visible && outletElement != null) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  useEffect(() => {
    let timeout = null;

    const handleMouseEnter = () => {
      timeout = setTimeout(() => setVisible(true), 200);
    }

    const handleMouseLeave = () => {
      clearTimeout(timeout);
      setVisible(false);
    };

    if (childrenRef.current != null) {
      childrenRef.current.addEventListener('mouseenter', handleMouseEnter);
      childrenRef.current.addEventListener('mouseleave', handleMouseLeave);

      window.addEventListener('scroll', handleMouseLeave, true);
    }

    return () => {
      childrenRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      childrenRef.current?.removeEventListener('mouseleave', handleMouseLeave);

      window.removeEventListener('scroll', handleMouseLeave);
    };
  });

  if (outletElement == null) return '';

  class Wrapper extends React.Component {
    componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDOM.findDOMNode(this);
      childrenRef.current = node;
      setRect(node.getBoundingClientRect());
    }

    render() {
      return children;
    }
  }

  const tooltipStyle = getStyleForSide({
    side,
    rect,
    rectComponent: tooltipRect,
    sides: Position,
  });

  return (
    <Fragment>
      <Wrapper />
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
        document.getElementById('tooltips-outlet'),
      )}
    </Fragment>
  );
};


Tooltip.propTypes = {
  /** DEPRECATED */
  message: CustomPropTypes.mutuallyExclusive('content', {
    type: PropTypes.node,
    deprecated: true,
  }),

  /** Content shown when the tooltip is visible */
  content: CustomPropTypes.mutuallyExclusive('message', {
    type: PropTypes.node,
    required: true,
  }),

  /** Component wrapped by the tooltip */
  children: PropTypes.node.isRequired,

  side: PropTypes.oneOf([ Position.LEFT, Position.RIGHT, Position.TOP, Position.BOTTOM ]),

  /** Used for style overrides */
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


Tooltip.defaultProps = {
  side: Position.TOP,

  style: {},
};


export default Tooltip;
