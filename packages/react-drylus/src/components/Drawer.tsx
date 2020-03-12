import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { themeStyles } from '../base';
import { Position, Size, Tier } from '../enums';
import { Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { Title } from './Title';

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
  drawerEnterActive: (width: string) => css`
    opacity: 1;
    width: ${width};
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  drawerEnterDone: (width: string) => css`
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

interface BaseDrawerProps {
  /** Content rendered within the drawer */
  children: React.ReactNode;

  /** Fixed content at the bottom of the drawer. Won't render if raw is true */
  footer?: React.ReactNode;

  /** Triggered when the "close" button is clicked */
  onClickClose?: () => void;

  /** Shown at the top left of the drawer, not rendered if raw is true */
  title?: string;

  /** Used for style overrides */
  style?: Style;
}

export const BaseDrawer = ({ children, onClickClose, footer, title, style }: BaseDrawerProps) => {
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
      {run(() => {
        if (title) {
          return (
            <div className={styles.title}>
              <Title size={4} noMargin>
                {title}
              </Title>
            </div>
          );
        }
      })}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{children}</div>
      </div>
      {run(() => {
        if (footer) {
          return <div className={styles.footer}>{footer}</div>;
        }
      })}
    </div>
  );
};

interface DrawerProps extends BaseDrawerProps {
  /** Determines if the drawer is visible or not */
  visible: boolean;

  /** If the drawer is in "asOverlay" mode, triggered when the overlay is clicked */
  onClickOverlay?: () => void;

  /** If true, the whole page is hidden with an overlay and the content of the drawer is rendered most visible */
  asOverlay?: boolean;

  /**
   * Width of the drawer
   * @default 400
   */
  width?: number | string;

  /**
   * If true, the children are rendered without decoration, you have to style your own drawer
   * @default false
   */
  raw?: boolean;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /**
   * Only applies when the drawer is used with "asOverlay"
   * @default Position.RIGHT
   */
  side?: Position.LEFT | Position.RIGHT;

  /**
   * Passed to the CSSTransition component to fire events at different points of the animation. See reactcommunity.org/react-transition-group docs
   * @default {}
   */
  cssTransitionCallbacks: {
    onEnter: () => void;
    onEntering: () => void;
    onEntered: () => void;
    onExit: () => void;
    onExiting: () => void;
    onExited: () => void;
  };
}

export const Drawer = ({ responsive, ...rest }: DrawerProps) => {
  const {
    children,
    footer,
    asOverlay: _asOverlay = false,
    visible,
    onClickClose,
    onClickOverlay,
    width: rawWidth,
    raw = false,
    title,
    side = Position.RIGHT,
    cssTransitionCallbacks = {},
  } = useResponsiveProps<DrawerProps>(rest, responsive);

  const [outletElement, setOutletElement] = useState<HTMLElement>();
  const overlayElement = useRef<HTMLDivElement>(null);
  const { screenSize, ScreenSizes } = useScreenSize();

  useEffect(() => {
    const outlet = document.getElementById('drawers-outlet');
    if (outlet == null) {
      const drawersOutlet = document.createElement('div');
      drawersOutlet.id = 'drawers-outlet';
      document.body.appendChild(drawersOutlet);
      setOutletElement(drawersOutlet);
    } else {
      setOutletElement(outlet);
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
      if (document.body.parentElement != null) {
        document.body.parentElement.style.position = 'fixed';
      }
    } else {
      document.body.style.overflow = 'initial';
      document.body.style.pointerEvents = 'auto';
      if (document.body.parentElement != null) {
        document.body.parentElement.style.position = '';
      }
    }
  }, [visible]);

  const width = run(() => {
    if (
      !responsive?.M?.width &&
      !responsive?.S?.width &&
      !responsive?.XS?.width &&
      screenSize <= ScreenSizes.M
    ) {
      return '100vw';
    } else {
      return typeof rawWidth === 'number' ? `${rawWidth}px` : rawWidth;
    }
  });

  const content = raw ? (
    children
  ) : (
    <BaseDrawer title={title} onClickClose={onClickClose} footer={footer}>
      {children}
    </BaseDrawer>
  );

  if (asOverlay) {
    if (outletElement == null) return '';
    const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayElement?.current && onClickOverlay != null) {
        onClickOverlay();
      }
    };

    return ReactDOM.createPortal(
      <div className={themeStyles.root}>
        <CSSTransition
          {...cssTransitionCallbacks}
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
      document.getElementById('drawers-outlet') as Element,
    );
  }

  return (
    <CSSTransition
      {...cssTransitionCallbacks}
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
