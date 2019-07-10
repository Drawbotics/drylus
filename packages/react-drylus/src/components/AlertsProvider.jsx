import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';

import { Categories, Sizes, Tiers } from '../base';
import {
  Margin,
  Flex,
  FlexItem,
  FlexAlign,
  FlexJustify,
} from '../layout';
import Icon from './Icon';
import Button from './Button';
import { getEnumAsClass } from '../utils';


const styles = {
  provider: css`
    position: fixed;
    z-index: 9999;
    bottom: ${sv.defaultMargin};
    left: ${sv.defaultMargin};
  `,
  root: css`
    display: inline-block;
    position: relative;
    padding: ${sv.paddingExtraSmall};
    padding-left: ${sv.defaultPadding};
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    box-shadow: ${sv.elevation2}, inset 0px 0px 0px 1px ${sv.neutralLight};
    max-width: 400px;
    color: ${sv.colorPrimary};
    overflow: hidden;

    [data-element="text"] {
      font-size: 0.95rem;
    }

    [data-element="icon"] {
      margin-top: -1px;
    }

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
    }
  `,
  danger: css`
    [data-element="icon"] {
      color: ${sv.red};
    }

    &::after {
      background: ${sv.red};
    }
  `,
  info: css`
    [data-element="icon"] {
      color: ${sv.blue};
    }

    &::after {
      background: ${sv.blue};
    }
  `,
  warning: css`
    [data-element="icon"] {
      color: ${sv.orange};
    }

    &::after {
      background: ${sv.orange};
    }
  `,
  success: css`
    [data-element="icon"] {
      color: ${sv.green};
    }

    &::after {
      background: ${sv.green};
    }
  `,
};


function _getIconForCategory(category) {
  switch (category) {
    case Categories.DANGER:
      return 'alert-circle';
    case Categories.SUCCESS:
      return 'check-circle';
    case Categories.WARNING:
      return 'alert-triangle';
    default:
      return 'info';
  }
}


export const Alert = ({
  id,
  text,
  category,
  onClickDismiss,
}) => {
  const icon = _getIconForCategory(category);
  return (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass(category)]]: category,
      })}>
      <Flex justify={FlexJustify.START} align={FlexAlign.START}>
        <FlexItem>
          <Margin size={{ right: Sizes.SMALL, top: Sizes.EXTRA_SMALL }}>
            <div data-element="icon">
              <Icon name={icon} />
            </div>
          </Margin>
        </FlexItem>
        <FlexItem flex>
          <Margin size={{ top: Sizes.EXTRA_SMALL, bottom: Sizes.EXTRA_SMALL }}>
            <span data-element="text">{text}</span>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ left: Sizes.DEFAULT }}>
            <Button
              size={Sizes.SMALL}
              onClick={() => onClickDismiss(id)}
              tier={Tiers.TERTIARY}
              leading={<Icon name="x" />} />
          </Margin>
        </FlexItem>
      </Flex>
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


const Context = React.createContext();


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
