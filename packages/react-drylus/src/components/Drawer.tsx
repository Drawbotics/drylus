import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { themeStyles } from '../base';
import { Position, Size, Tier } from '../enums';
import { OnClickCallback, Responsive, Style } from '../types';
import { fsv, run, useResponsiveProps } from '../utils';
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
};

export interface BaseDrawerProps {
  /** Content rendered within the drawer */
  children: React.ReactNode;

  /** Fixed content at the bottom of the drawer. Won't render if raw is true */
  footer?: React.ReactNode;

  /** Triggered when the "close" button is clicked */
  onClickClose?: OnClickCallback<HTMLElement>;

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

const variants = {
  hidden: { opacity: 0, width: 0 },
  visible: (width: number) => ({
    opacity: 1,
    width,
    transition: {
      ease: fsv.bouncyTransitionCurve,
      delay: fsv.transitionTimeShort,
      duration: fsv.defaultTransitionTime,
    },
  }),
};

export interface DrawerProps extends BaseDrawerProps {
  /** Determines if the drawer is visible or not */
  visible: boolean;

  /**
   * If the drawer is in "asOverlay" mode, triggered when the overlay is clicked
   * @deprecated Clicking the overlay will use onClickClose
   */
  onClickOverlay?: () => void;

  /**
   * If true, the whole page is hidden with an overlay and the content of the drawer is rendered most visible
   * @default false
   */
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
   * @kind Position
   */
  side?: Position.LEFT | Position.RIGHT;

  /** Called when the animation is started, and when it's over, respectively, see https://www.framer.com/api/motion/component/#motioncallbacks.onanimationstart */
  animationCallbacks?: {
    onAnimationStart: VoidFunction;
    onAnimationComplete: VoidFunction;
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
    width: rawWidth = 400,
    raw = false,
    title,
    side = Position.RIGHT,
    animationCallbacks,
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
    if (outletElement == null) return null;
    const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayElement?.current && onClickOverlay != null) {
        onClickOverlay();
      }
    };

    return ReactDOM.createPortal(
      <div className={themeStyles.root}>
        <AnimatePresence>
          {visible ? (
            <motion.div
              onAnimationComplete={animationCallbacks?.onAnimationComplete}
              onAnimationStart={animationCallbacks?.onAnimationStart}
              transition={{ duration: fsv.defaultTransitionTime, ease: 'easeInOut' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClickOverlay}
              className={cx(styles.overlay, {
                [styles.leftOverlay]: side === Position.LEFT,
              })}
              ref={overlayElement}>
              <motion.div
                custom={width}
                variants={variants}
                style={{ position: 'relative' }}
                initial="hidden"
                animate="visible"
                exit="hidden">
                <div data-element="wrapper" className={styles.wrapper} style={{ width }}>
                  {content}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>,
      document.getElementById('drawers-outlet') as Element,
    );
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          onAnimationComplete={animationCallbacks?.onAnimationComplete}
          onAnimationStart={animationCallbacks?.onAnimationStart}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width }}
          exit={{ opacity: 0, width: 0 }}
          className={styles.outerWrapper}>
          <div style={{ width }} className={styles.wrapper}>
            {content}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
