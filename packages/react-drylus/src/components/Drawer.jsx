import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import sv from '@drawbotics/style-vars';

import Button, { ButtonTiers } from './Button';
import Sizes from '../base/Sizes';


const styles = {
  outerWrapper: css`
    overflow: hidden;
    position: relative;
    height: 100%;
  `,
  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: ${sv.darkOverlay};
    display: flex;
    justify-content: flex-end;
    z-index: 99999;

    & [data-element="wrapper"] {
      box-shadow: -5px 0px 15px ${sv.neutralDarker};
    }
  `,
  wrapper: css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 99;
  `,
  root: css`
    position: relative;
    padding: ${sv.defaultPadding};
    padding-top: calc(${sv.paddingExtraLarge} + ${sv.paddingExtraSmall});
    background: ${sv.white};
    height: 100%;
  `,
  content: css`
    overflow: scroll;
    height: 100%;
  `,
  close: css`
    position: absolute;
    top: ${sv.marginExtraSmall};
    left: ${sv.marginExtraSmall};
  `,
  drawerEnter: css`
    opacity: 0;
    width: 0;
  `,
  drawerEnterActive: (width) => css`
    opacity: 1;
    width: ${width};
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  drawerEnterDone: (width) => css`
    width: ${width};
  `,
  drawerExit: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  drawerExitActive: css`
    opacity: 0.01;
    width: 0;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  drawerOverlayEnter: css`
    opacity: 0;

    & [data-element="wrapper"] {
      transform: translateX(100%);
    }
  `,
  drawerOverlayEnterActive: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element="wrapper"] {
      transform: translateX(0);
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
  drawerOverlayExit: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element="wrapper"] {
      transform: translateX(0);
    }
  `,
  drawerOverlayExitActive: css`
    opacity: 0.01;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element="wrapper"] {
      transform: translateX(100%);
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
};


const BaseDrawer = ({
  children,
  onClickClose,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.close}>
        <Button size={Sizes.SMALL} onClick={onClickClose} tier={ButtonTiers.TERTIARY} icon="x" />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};


const Drawer = ({
  children,
  asOverlay,
  visible,
  onClickClose=x=>x,
  onClickOverlay=x=>x,
  width: rawWidth,
  raw,
}) => {
  const [outletElement, setOutletElement] = useState(null);
  const overlayElement = useRef();
  useEffect(() => {
    if ( ! document.getElementById('drawers-outlet')) {
      const drawersOutlet = document.createElement('div');
      drawersOutlet.id = 'drawers-outlet';
      document.body.appendChild(drawersOutlet);
      setOutletElement(drawersOutlet);
    }
    else {
      setOutletElement(document.getElementById('drawers-outlet'));
    }

    return () => {
      if (! visible && outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  useEffect(() => {
    visible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';
  });

  const width = typeof rawWidth === 'number' ? `${rawWidth}px` : rawWidth;

  const content = raw ? children : <BaseDrawer onClickClose={onClickClose}>{children}</BaseDrawer>;

  if (asOverlay) {
    if (! outletElement) return '';
    const handleClickOverlay = (e) => e.target === overlayElement?.current ? onClickOverlay() : null;

    return ReactDOM.createPortal(
      <CSSTransition
        in={visible}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.drawerOverlayEnter,
          enterActive: styles.drawerOverlayEnterActive,
          exit: styles.drawerOverlayExit,
          exitActive: styles.drawerOverlayExitActive,
        }}>
        <div onClick={handleClickOverlay} className={styles.overlay} ref={overlayElement}>
          <div data-element="wrapper" style={{ width }}>
            {content}
          </div>
        </div>
      </CSSTransition>,
      document.getElementById('drawers-outlet'),
    );
  }

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: styles.drawerEnter,
        enterActive: styles.drawerEnterActive(width),
        enterDone: styles.drawerEnterDone(width),
        exit: styles.drawerExit,
        exitActive: styles.drawerExitActive,
      }}>
      <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
          {content}
        </div>
      </div>
    </CSSTransition>
  );
};


Drawer.propTypes = {
  /** Content rendered within the drawer */
  children: PropTypes.node.isRequired,

  /** Determines if the drawer is visible or not */
  visible: PropTypes.bool.isRequired,

  /** Triggered when the "close" button is clicked */
  onClickClose: PropTypes.func,

  /** If the drawer is in "asOverlay" mode, triggered when the overlay is clicked */
  onClickOverlay: PropTypes.func,

  /** If true, the whole page is hidden with an overlay and the content of the drawer is rendered most visible */
  asOverlay: PropTypes.bool,

  /** Width of the drawer */
  width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),

  /** If true, the children are rendered without decoration, you have to style your own drawer */
  raw: PropTypes.bool,
};


Drawer.defaultProps = {
  asOverlay: false,
  width: 400,
  raw: false,
};


export default Drawer;
