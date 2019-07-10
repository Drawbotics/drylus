import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';

import { Categories, Sizes } from '../base';
import Margin from '../layout/Margin';


const styles = {
  provider: css`
    position: fixed;
    z-index: 9999;
    bottom: ${sv.defaultMargin};
    left: ${sv.defaultMargin};
  `,
  root: css`
    padding: ${sv.defaultPadding};
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    box-shadow: ${sv.elevation2};
  `,
};


const Context = React.createContext();


export const Alert = ({
  text,
  category,
  onClickDismiss,
}) => {
  return (
    <div className={styles.root}>
      {text}
    </div>
  );
};


Alert.propTypes = {
  /** Text shown within the alert */
  text: PropTypes.string.isRequired,

  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
  ]).isRequired,

  /** Triggered when the dismiss button is clicked */
  onClickDismiss: PropTypes.func,

  /** If you need to manually hide the alert, you can pass your own ID to call hide */
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};


const AlertsProvider = ({ children }) => {
  const [outletElement, setOutletElement] = useState(null);
  const [alerts, setAlerts] = React.useState([]);

  const show = (alertProps) => {
    const id = v4();
    setAlerts([ ...alerts, { id, ...alertProps } ]);
  };

  const hide = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  useEffect(() => {
    if ( ! document.getElementById('alerts-outlet')) {
      const alertsOutlet = document.createElement('div');
      alertsOutlet.id = 'alerts-outlet';
      document.body.appendChild(alertsOutlet);
      setOutletElement(alertsOutlet);
    }
    else {
      setOutletElement(document.getElementById('alerts-outlet'));
    }

    return () => {
      if (outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  if (! outletElement) return null;

  return (
    <Context.Provider value={{ show, hide }}>
      {children}
      {ReactDOM.createPortal(
        <div className={styles.provider}>
          {alerts.map((props) => (
            <Margin key={props.id} size={{ top: Sizes.SMALL }}>
              <Alert onClickDismiss={hide} {...props} />
            </Margin>
          ))}
        </div>,
        document.getElementById('alerts-outlet'),
      )}
    </Context.Provider>
  );
};


export default AlertsProvider;

export const useAlert = () => React.useContext(Context);
