import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { styles as themeStyles } from '../base/ThemeProvider';
import { Position, Size, Tier } from '../enums';
import { useResponsiveProps } from '../utils/hooks';
import Button from './Button';
import Icon from './Icon';
import Title from './Title';

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
    z-index: 9999;
    pointer-events: auto;
    overscroll-behavior: none;

    & [data-element='wrapper'] {
      box-shadow: -5px 0px 15px ${sv.neutralDarker};
    }
  `,
  leftOverlay: css`
    justify-content: flex-start;
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
    display: flex;
    flex-direction: column;

    @media ${sv.screenL} {
      padding: ${sv.paddingSmall};
      padding-top: calc(${sv.paddingExtraLarge} + ${sv.paddingExtraSmall});
    }

    @media ${sv.screenM} {
      ${'' /* To account for bottom bar in mobile */}
      padding-bottom: 90px;
    }
  `,
  contentWrapper: css`
    flex: 1;
    width: 100%;
    overflow-x: visible;
    overflow-y: hidden;
  `,
  content: css`
    overflow-x: hidden;
    padding-top: ${sv.paddingExtraSmall};
    height: 100%;
  `,
  title: css`
    margin-top: ${sv.marginExtraSmall};
    margin-bottom: ${sv.marginExtraSmall};
  `,
  footer: css`
    padding-top: ${sv.defaultPadding};
    border-top: 1px solid ${sv.neutralLight};

    @media ${sv.screenL} {
      padding-top: ${sv.paddingSmall};
    }
  `,
  close: css`
    position: absolute;
    top: ${sv.marginSmall};
    left: ${sv.marginSmall};

    @media ${sv.screenL} {
      top: ${sv.marginExtraSmall};
      left: ${sv.marginExtraSmall};
    }
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

    & [data-element='wrapper'] {
      transform: translateX(100%);
    }
  `,
  drawerOverlayEnterLeft: css`
    opacity: 0;

    & [data-element='wrapper'] {
      transform: translateX(-100%);
    }
  `,
  drawerOverlayEnterActive: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element='wrapper'] {
      transform: translateX(0);
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
  drawerOverlayExit: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element='wrapper'] {
      transform: translateX(0);
    }
  `,
  drawerOverlayExitActive: css`
    opacity: 0.01;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element='wrapper'] {
      transform: translateX(100%);
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
  drawerOverlayExitActiveLeft: css`
    & [data-element='wrapper'] {
      transform: translateX(-100%);
    }
  `,
};

const BaseDrawer = ({ children, onClickClose, footer, title, style }) => {
  const { screenSize, ScreenSizes } = useScreenSize();
  return (
    <div style={style} className={styles.root}>
      <div className={styles.close}>
        <Button
          size={screenSize <= ScreenSizes.L ? Size.DEFAULT : Size.SMALL}
          onClick={onClickClose}
          tier={Tier.TERTIARY}
          leading={<Icon name="x" />}
        />
      </div>
      {do {
        if (title) {
          <div className={styles.title}>
            <Title size={4} noMargin>
              {title}
            </Title>
          </div>;
        }
      }}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{children}</div>
      </div>
      {do {
        if (footer) {
          <div className={styles.footer}>{footer}</div>;
        }
      }}
    </div>
  );
};

const Drawer = ({ responsive, ...rest }) => {
  const {
    children,
    footer,
    asOverlay: _asOverlay,
    visible,
    onClickClose,
    onClickOverlay,
    width: rawWidth,
    raw,
    title,
    side,
  } = useResponsiveProps(rest, responsive);

  const [outletElement, setOutletElement] = useState(null);
  const overlayElement = useRef();
  const { screenSize, ScreenSizes } = useScreenSize();

  useEffect(() => {
    if (!document.getElementById('drawers-outlet')) {
      const drawersOutlet = document.createElement('div');
      drawersOutlet.id = 'drawers-outlet';
      document.body.appendChild(drawersOutlet);
      setOutletElement(drawersOutlet);
    } else {
      setOutletElement(document.getElementById('drawers-outlet'));
    }

    return () => {
      if (!visible && outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  const asOverlay = _asOverlay || screenSize <= ScreenSizes.L;

  useEffect(() => {
    if (visible && asOverlay) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
      document.body.parentElement.style.position = 'fixed';
    } else {
      document.body.style.overflow = 'initial';
      document.body.style.pointerEvents = 'auto';
      document.body.parentElement.style.position = '';
    }
  }, [visible]);

  const width = do {
    if (
      !responsive?.M?.width &&
      !responsive?.S?.width &&
      !responsive?.XS?.width &&
      screenSize <= ScreenSizes.M
    ) {
      ('100vw');
    } else {
      typeof rawWidth === 'number' ? `${rawWidth}px` : rawWidth;
    }
  };

  const content = raw ? (
    children
  ) : (
    <BaseDrawer title={title} onClickClose={onClickClose} footer={footer}>
      {children}
    </BaseDrawer>
  );

  if (asOverlay) {
    if (!outletElement) return '';
    const handleClickOverlay = (e) =>
      e.target === overlayElement?.current ? onClickOverlay() : null;

    return ReactDOM.createPortal(
      <div className={themeStyles.root}>
        <CSSTransition
          in={visible}
          timeout={300}
          mountOnEnter
          unmountOnExit
          classNames={{
            enter:
              side === Position.LEFT ? styles.drawerOverlayEnterLeft : styles.drawerOverlayEnter,
            enterActive: styles.drawerOverlayEnterActive,
            exit: styles.drawerOverlayExit,
            exitActive: cx(styles.drawerOverlayExitActive, {
              [styles.drawerOverlayExitActiveLeft]: side === Position.LEFT,
            }),
          }}>
          <div
            onClick={handleClickOverlay}
            className={cx(styles.overlay, {
              [styles.leftOverlay]: side === Position.LEFT,
            })}
            ref={overlayElement}>
            <div data-element="wrapper" style={{ width }}>
              {content}
            </div>
          </div>
        </CSSTransition>
      </div>,
      document.getElementById('drawers-outlet'),
    );
  }

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      mountOnEnter
      unmountOnExit
      appear
      classNames={{
        enter: styles.drawerEnter,
        enterActive: styles.drawerEnterActive(width),
        enterDone: styles.drawerEnterDone(width),
        exit: styles.drawerExit,
        exitActive: styles.drawerExitActive,
      }}>
      <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>{content}</div>
      </div>
    </CSSTransition>
  );
};

Drawer.propTypes = {
  /** Content rendered within the drawer */
  children: PropTypes.node.isRequired,

  /** Fixed content at the bottom of the drawer. Won't render if raw is true */
  footer: PropTypes.node,

  /** Determines if the drawer is visible or not */
  visible: PropTypes.bool.isRequired,

  /** Triggered when the "close" button is clicked */
  onClickClose: PropTypes.func,

  /** If the drawer is in "asOverlay" mode, triggered when the overlay is clicked */
  onClickOverlay: PropTypes.func,

  /** If true, the whole page is hidden with an overlay and the content of the drawer is rendered most visible */
  asOverlay: PropTypes.bool,

  /** Width of the drawer */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** If true, the children are rendered without decoration, you have to style your own drawer */
  raw: PropTypes.bool,

  /** Shown at the top left of the drawer, not rendered if raw is true */
  title: PropTypes.string,

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

  /** Only applies when the drawer is used with "asOverlay" */
  side: PropTypes.oneOf([Position.LEFT, Position.RIGHT]),
};

Drawer.defaultProps = {
  asOverlay: false,
  width: 400,
  raw: false,
  onClickClose: (x) => x,
  onClickOverlay: (x) => x,
  side: Position.RIGHT,
};

export default Drawer;
