import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Input from './Input';
import Icon from '../components/Icon';


const styles = {
  root: css`
    display: inline-block;
    width: 100%;

    & [data-element="suffix"] {
      padding: 0;
      align-items: stretch;
      overflow: hidden;
    }
  `,
  buttons: css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  button: css`
    flex: 1;
    padding: 0 ${sv.paddingSmall};
    display: flex;
    align-items: center;
    transition: ${sv.defaultTransition};
    border: none;

    &:hover {
      cursor: pointer;
      background: ${sv.azure};
    }

    &:focus {
      outline: none;
    }

    &:active {
      box-shadow: ${sv.insetActiveMedium};
    }

    & > i {
      font-size: 1rem;
    }
  `,
  disabled: css`
    > button {
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      color: ${sv.colorDisabled};

      &:hover {
        cursor: not-allowed;
        background: ${sv.neutralLight};
      }

      &:active {
        box-shadow: none;
      }
    }
  `,
};


const Countbox = ({
  value: rawValue,
  placeholder,
  disabled,
  onChange,
  hint,
  error,
  valid,
  renderValue,
}) => {
  const handleInputOnChange = (v) => {
    if (v === '-' || v === '') {
      onChange(v);
    }
    else if (Number(v) === 0 || Number(v)) {
      onChange(Number(v));
    }
  };

  const value = rawValue === '-' || rawValue === '' ? rawValue : Number(rawValue);

  if (value !== '-' && value !== '' && value !== 0 && ! value) {
    console.warn('Only numbers allowed as value for Countbox');
  }

  return (
    <div className={styles.root}>
      <Input
        error={error}
        hint={hint}
        valid={valid}
        onChange={handleInputOnChange}
        disabled={disabled}
        placeholder={placeholder}
        value={renderValue(value)}
        suffix={
          <div className={cx(styles.buttons, { [styles.disabled]: disabled })}>
            <button className={styles.button} onClick={() => disabled ? null : onChange((value || 0) + 1)}>
              <Icon name="plus" bold />
            </button>
            <button className={styles.button} onClick={() => disabled ? null : onChange((value || 0) - 1)}>
              <Icon name="minus" bold />
            </button>
          </div>
        } />
    </div>
  );
};


Countbox.propTypes = {
  /** Value displayed in the field */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['-', '']),
  ]).isRequired,

  /** Disables the countbox */
  disabled: PropTypes.bool,

  /** Text shown when no value is active */
  placeholder: PropTypes.string,

  /** Triggered when the value is changed (typing or clicking +/-) */
  onChange: PropTypes.func.isRequired,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,

  /** Use if you want to modify the way you display the value (string operations only) */
  renderValue: PropTypes.func,
};


Countbox.defaultProps = {
  renderValue: x=>x,
};


export default Countbox;
