import React, { useState, useEffect, useRef } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import Enum from '@drawbotics/enums';

import { Categories } from '../enums';
import Icon from './Icon';
import { getEnumAsClass } from '../utils';


const styles = {
  wrapper: css`
    position: relative;
    display: inline-block;
  `,
  trigger: css`
    &:hover {
      cursor: pointer;
    }
  `,
  root: css`
    position: absolute;
    z-index: 9999;
    top: 100%;
    margin-top: ${sv.marginExtraSmall};
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    padding: ${sv.paddingExtraSmall} 0;
  `,
  visible: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  bottom: css`
  `,
  top: css`
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: ${sv.marginExtraSmall};
  `,
  right: css`
    top: 0;
    margin-top: 0;
    margin-left: ${sv.marginExtraSmall};
    left: 100%;
  `,
  left: css`
    top: 0;
    margin-top: 0;
    margin-right: ${sv.marginExtraSmall};
    right: 100%;
  `,
  option: css`
    color: ${sv.colorPrimary};
    padding: 5px ${sv.paddingSmall};
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }

    > i {
      margin-right: ${sv.marginExtraSmall};
    }
  `,
  disabled: css`
    color: ${sv.colorDisabled};
    cursor: not-allowed;
    background: none;

    &:hover {
      cursor: not-allowed;
      color: ${sv.colorDisabled};
      background: none;
    }
  `,
  danger: css`
    color: ${sv.red};

    &:hover {
      color: ${sv.redDark};
      background: ${sv.redLighter};
    }
  `,
  success: css`
    color: ${sv.green};

    &:hover {
      color: ${sv.greenDark};
      background: ${sv.greenLighter};
    }
  `,
  warning: css`
    color: ${sv.orange};

    &:hover {
      color: ${sv.orangeDark};
      background: ${sv.orangeLighter};
    }
  `,
  separator: css`
    height: 1px;
    width: 100%;
    background: ${sv.neutralLight};
    margin: ${sv.marginExtraSmall} 0;
  `,
  title: css`
    padding: ${sv.paddingExtraSmall};
    font-size: 0.8rem;
    color: ${sv.colorTertiary};
    text-transform: uppercase;
  `,
};



export const DropdownSides = new Enum(
  'TOP',
  'LEFT',
  'BOTTOM',
  'RIGHT',
);


export const DropdownOption = ({
  text,
  category,
  disabled,
  onClick,
  onClickClose,
  icon,
  style,
}) => {
  return (
    <div
      style={style}
      className={cx(styles.option, {
        [styles[getEnumAsClass(category)]]: category,
        [styles.disabled]: disabled,
      })}
      onClick={disabled ? null : () => { onClickClose(); onClick(); }}>
      {do {
        if (icon) {
          <Icon name={icon} />
        }
      }}
      {text}
    </div>
  );
};

DropdownOption.propTypes = {
  /** Text displayed in the option */
  text: PropTypes.string.isRequired,

  /** If true, the option is not clickable */
  disabled: PropTypes.bool,

  /** Triggered when the option is clicked */
  onClick: PropTypes.func,

  /** Name of the icon to be shown on the left side */
  icon: PropTypes.string,

  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.WARNING,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
};

DropdownOption.defaultProps = {
  onClick: x=>x,
};


export const DropdownTitle = ({ text, style }) => {
  return (
    <div style={style} className={styles.title}>
      {text}
    </div>
  );
};

DropdownTitle.propTypes = {
  /** Value of the title */
  text: PropTypes.string.isRequired,

  /** Used for style overrides */
  style: PropTypes.object,
};


export const DropdownSeparator = () => {
  return (
    <div className={styles.separator} />
  );
};


const Dropdown = ({ children, trigger, side, style }) => {
  if (! React.isValidElement(trigger)) {
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
    <div style={style} className={styles.wrapper}>
      <div onClick={() => setDropdowOpen(true)} className={styles.trigger}>
        {trigger}
      </div>
      <div
        ref={ref}
        className={cx(styles.root, {
          [styles.visible]: isOpen,
          [styles[getEnumAsClass(side)]]: side,
        })}>
        {React.Children.map(children, (child) => React.cloneElement(child, {
          onClickClose: () => setDropdowOpen(false),
        }))}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  /** This will be the trigger of the dropdown, and relative to which the menu will be positioned */
  trigger: PropTypes.node,

  /** This is the content of the dropdown menu */
  children: PropTypes.node,

  side: PropTypes.oneOf([
    DropdownSides.LEFT,
    DropdownSides.RIGHT,
    DropdownSides.TOP,
    DropdownSides.BOTTOM,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
};

Dropdown.defaultProps = {
  side: DropdownSides.BOTTOM,
};


export default Dropdown;
