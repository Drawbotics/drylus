import React, { useState, useEffect, useRef } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';
import Enum from '@drawbotics/enums';


const styles = {
  wrapper: css`
    position: relative;
    display: inline-block;
  `,
  root: css`
    position: absolute;
    z-index: 999;
    top: 100%;
    margin-top: ${sv.marginExtraSmall};
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    overflow: hidden;
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  visible: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
};



export const DropdownSides = new Enum(
  'TOP',
  'LEFT',
  'BOTTOM',
  'RIGHT',
);


export const DropdownOption = () => {
  return (
    <div>

    </div>
  );
};


export const DropdownTitle = () => {
  return (
    <div>

    </div>
  );
};


export const DropdownSeparator = () => {
  return (
    <div>

    </div>
  );
};


const Dropdown = ({ children, menu, side }) => {
  if (! React.Children.only(children)) {
    console.warn('Dropdown only accepts a single child as trigger');
    return null;
  }

  const ref = useRef();
  const [ isOpen, setDropdowOpen ] = useState(false);

  const handleDocumentClick = (e) => ! ref.current.contains(e.target) ? setDropdowOpen(false) : null;
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div onClick={() => setDropdowOpen(true)}>
        {children}
      </div>
      <div
        ref={ref}
        className={cx(styles.root, {
          [styles.visible]: isOpen,
        })}>
        {menu}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  /** This will be the trigger of the dropdown, and relative to which the menu will be positioned */
  children: PropTypes.node,

  /** This is the content of the dropdown menu */
  menu: PropTypes.node,

  side: PropTypes.oneOf([
    DropdownSides.LEFT,
    DropdownSides.RIGHT,
    DropdownSides.TOP,
    DropdownSides.BOTTOM,
  ]),
};


export default Dropdown;
