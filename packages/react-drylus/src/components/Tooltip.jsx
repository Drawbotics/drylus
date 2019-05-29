import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import PropTypes from 'prop-types';


const styles = {
  root: css`

  `,
};


const Tooltip = ({ children, message }) => {
  const [ visible ] = useState(false);
  const [ outletElement, setOutletElement ] = useState(null);

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

  if (! outletElement) return '';

  return (
    <Fragment>
      {children}
      {ReactDOM.createPortal(
        <div className={styles.root}>
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
};


export default Tooltip;
