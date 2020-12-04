import sv from '@drawbotics/drylus-style-vars';
import anime from 'animejs';
import { css } from 'emotion';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { themeStyles } from '../base';
import { fsv } from '../utils';

const styles = {
  root: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999999;
    background: ${sv.grey900};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  animation: css`
    width: 130px;
    height: 130px;
    position: relative;

    > svg {
      stroke-width: 7;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: black;
    }
  `,
  text: css`
    margin-top: ${sv.marginLarge};
    color: ${sv.colorTertiary};
  `,
};

export interface SplashScreenProps {
  /** Displayed under the animated logo */
  text?: string;
}

export const SplashScreen = ({ text }: SplashScreenProps) => {
  const [outletElement, setOutletElement] = useState<HTMLElement>();

  const handleAnimationStart = () => {
    const timeline = anime.timeline({
      easing: 'easeInOutSine',
      duration: 1000,
      loop: true,
    });
    timeline.add({
      targets: '.first',
      strokeDashoffset: [anime.setDashoffset, 0],
    });
    timeline.add(
      {
        targets: '.second',
        strokeDashoffset: [anime.setDashoffset, 0],
      },
      600,
    );
    timeline.add(
      {
        targets: '.third',
        duration: 500,
        strokeDashoffset: [anime.setDashoffset, 0],
      },
      1300,
    );
    timeline.add({
      targets: `.${styles.animation}`,
      opacity: 0,
      duration: 300,
      scale: 0.7,
    });
  };

  useEffect(() => {
    const outlet = document.getElementById('splash-outlet');
    if (outlet == null) {
      const splashOutlet = document.createElement('div');
      splashOutlet.id = 'splash-outlet';
      document.body.appendChild(splashOutlet);
      setOutletElement(splashOutlet);
    } else {
      setOutletElement(outlet);
    }

    return () => {
      if (outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  if (!outletElement) return null;

  return ReactDOM.createPortal(
    <div className={themeStyles.root}>
      <motion.div
        className={styles.root}
        onAnimationStart={handleAnimationStart}
        transition={{ duration: fsv.defaultTransitionTime, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div className={styles.animation}>
          <svg height="100%" width="100%" viewBox="0 0 300 300">
            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                gradientUnits="userSpaceOnUse">
                <stop offset="0%" style={{ stopColor: sv.brand, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: sv.brandDark, stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <polygon
              className="first"
              id="1"
              stroke="url('#gradient')"
              fill="none"
              points="5,228 195,5 295,280"
            />
            <polyline
              className="second"
              id="2"
              stroke="url('#gradient')"
              fill="none"
              points="5,228 132,188 295,280"
            />
            <polyline
              className="third"
              id="3"
              stroke="url('#gradient')"
              fill="none"
              points="132,188 195,5"
            />
          </svg>
        </div>
        {text != null ? <div className={styles.text}>{text}</div> : null}
      </motion.div>
    </div>,
    document.getElementById('splash-outlet') as Element,
  );
  // eslint-disable-next-line no-unreachable
  return <div></div>; // NOTE: proptypes fail if no "concrete" element is returned
};
