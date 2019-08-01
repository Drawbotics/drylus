import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import anime from 'animejs';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { styles as themeStyles } from '../base/ThemeProvider';


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
  splashEnter: css`
    opacity: 0;
  `,
  splashEnterActive: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  splashEnterDone: css`
  `,
  splashExit: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  splashExitActive: css`
    opacity: 0.01;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
};


const Context = React.createContext();


const SplashScreenProvider = ({ children }) => {
  const [ outletElement, setOutletElement ] = useState(null);
  const [ visible, setVisibility ] = useState(false);
  const [ state, setState ] = useState({});

  const { text } = state;

  const hide = () => {
    setVisibility(false);
    setTimeout(() => setState({}), 500);
  };

  const show = (options) => {
    setVisibility(true);
    setState(options);
  };

  const update = (options) => setState({ ...state, ...options });

  const handleEnter = () => {
    const timeline = anime.timeline({
      easing: 'easeInOutSine',
      duration: 1000,
      loop: true,
    });
    timeline.add({
      targets: '.first',
      strokeDashoffset: [anime.setDashoffset, 0],
    });
    timeline.add({
      targets: '.second',
      strokeDashoffset: [anime.setDashoffset, 0],
    }, 600);
    timeline.add({
      targets: '.third',
      duration: 500,
      strokeDashoffset: [anime.setDashoffset, 0],
    }, 1300);
    timeline.add({
      targets: `.${styles.animation}`,
      opacity: 0,
      duration: 300,
      scale: 0.7,
    });
  };

  useEffect(() => {
    if ( ! document.getElementById('splash-outlet')) {
      const splashOutlet = document.createElement('div');
      splashOutlet.id = 'splash-outlet';
      document.body.appendChild(splashOutlet);
      setOutletElement(splashOutlet);
    }
    else {
      setOutletElement(document.getElementById('splash-outlet'));
    }

    return () => {
      if (outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  if (! outletElement) return null;

  return (
    <Context.Provider value={{ show, hide, update }}>
      {children}
      {ReactDOM.createPortal(
        <div className={themeStyles.root}>
          <CSSTransition
            timeout={300}
            in={visible}
            mountOnEnter
            unmountOnExit
            onEnter={handleEnter}
            classNames={{
              enter: styles.splashEnter,
              enterActive: styles.splashEnterActive,
              exit: styles.splashExit,
              exitActive: styles.splashExitActive,
            }}>
            <div className={styles.root}>
              <div className={styles.animation}>
                <svg height="100%" width="100%" viewBox="0 0 300 300">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" style={{ stopColor: sv.brand, stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: sv.brandDark, stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <polygon className="first" id="1" stroke="url('#gradient')" fill="none" points="5,228 195,5 295,280" />
                  <polyline className="second" id="2" stroke="url('#gradient')" fill="none" points="5,228 132,188 295,280" />
                  <polyline className="third" id="3" stroke="url('#gradient')" fill="none" points="132,188 195,5" />
                </svg>
              </div>
              {do {
                if (text) {
                  <div className={styles.text}>
                    {text}
                  </div>
                }
              }}
            </div>
          </CSSTransition>
        </div>,
        document.getElementById('splash-outlet'),
      )}
    </Context.Provider>
  );
};

SplashScreenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default SplashScreenProvider;


export function useSplashScreen() {
  return React.useContext(Context);
}
