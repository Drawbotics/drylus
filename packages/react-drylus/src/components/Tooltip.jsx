import React, { Fragment, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
    position: absolute;
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
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

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


export const TooltipSides = {
  TOP: 'TOP',
  LEFT: 'LEFT',
  BOTTOM: 'BOTTOM',
  RIGHT: 'RIGHT',
};


function useRect() {
  const [ top, setTop ] = useState(0);
  const [ left, setLeft ] = useState(0);
  const [ height, setHeight ] = useState(0);
  const [ width, setWidth ] = useState(0);

  const rect = { top, left, height, width };
  const setRect = ({ top, left, height, width }) => {
    setTop(top);
    setLeft(left);
    setHeight(height);
    setWidth(width);
  };
  return {
    rect,
    setRect,
  };
}


function _getStyleForSide(side, rect, tooltipRect) {
  if (side === TooltipSides.TOP) {
    const difference = rect?.height < tooltipRect?.height ? tooltipRect?.height : 0;
    return {
      top: rect?.top - rect?.height - 8 - difference,
      left: rect?.left - (Math.abs(rect?.width - tooltipRect?.width) / 2),
    };
  }
  else if (side === TooltipSides.LEFT) {
    const difference = rect?.height < tooltipRect?.height ? tooltipRect?.height - rect?.height : 0;
    return {
      top: rect?.top + (Math.abs(rect?.height - tooltipRect?.height) / 2) - difference,
      left: rect?.left - tooltipRect?.width - 16,
    };
  }
  else if (side === TooltipSides.RIGHT) {
    const difference = rect?.height < tooltipRect?.height ? tooltipRect?.height - rect?.height : 0;
    return {
      top: rect?.top + (Math.abs(rect?.height - tooltipRect?.height) / 2) - difference,
      left: rect?.left + rect?.width + 16,
    };
  }
  else if (side === TooltipSides.BOTTOM) {
    return {
      top: rect?.top + rect?.height + 16,
      left: rect?.left - (Math.abs(rect?.width - tooltipRect?.width) / 2),
    };
  }
  else {
    console.warn(`${side} side value provided not supported`);
    return null;
  }
}


const Tooltip = ({ children, message, side }) => {
  const [ visible, setVisible ] = useState(false);
  const [ outletElement, setOutletElement ] = useState(null);
  const childrenRef = useRef();
  const tooltipRef = useRef();
  const { rect, setRect } = useRect();
  const tooltipRect = tooltipRef.current?.getBoundingClientRect();

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
      if (! visible && outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setVisible(true);
  }

  const handleMouseLeave = () => setVisible(false);

  useEffect(() => {
    if (childrenRef.current) {
      childrenRef.current.addEventListener('mouseenter', handleMouseEnter);
      childrenRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      childrenRef.current.removeEventListener('mouseover', handleMouseEnter);
      childrenRef.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  });

  if (! outletElement) return '';

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

  const tooltipStyle = _getStyleForSide(side, rect, tooltipRect);

  return (
    <Fragment>
      <Wrapper />
      {ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          className={cx(styles.root, {
            [styles.bottom]: side === TooltipSides.BOTTOM,
            [styles.left]: side === TooltipSides.LEFT,
            [styles.right]: side === TooltipSides.RIGHT,
            [styles.visible]: visible,
          })}
          style={tooltipStyle}>
          {message}
        </div>,
        document.getElementById('tooltips-outlet'),
      )}
    </Fragment>
  );
};


Tooltip.propTypes = {
  /** Text shown when the tooltip is visible */
  message: PropTypes.string.isRequired,

  /** Component wrapped by the tooltip */
  children: PropTypes.node.isRequired,

  side: PropTypes.oneOf([ TooltipSides.LEFT, TooltipSides.RIGHT, TooltipSides.TOP, TooltipSides.BOTTOM ]),
};


Tooltip.defaultProps = {
  side: TooltipSides.TOP,
};


export default Tooltip;
