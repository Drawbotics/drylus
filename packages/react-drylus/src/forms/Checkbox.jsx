import React from 'react';
import v4 from 'uuid/v4';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Hint from './Hint';
import Icon from '../components/Icon';


const styles = {
  base: css`
    position: relative;
    display: inline-block;
  `,
  wrapper: css`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    &:hover {
      [data-element="sprite"] {
        background: ${sv.neutralDark};
      }
    }
  `,
  disabled: css`
    cursor: not-allowed !important;

    > label {
      cursor: not-allowed !important;
      color: ${sv.colorDisabled};
    }
  `,
  error: css`
    [data-element="sprite"] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red};
    }

    [data-element="icon"] {
      background: ${sv.red};
    }
  `,
  checkbox: css`
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    position: relative;
    overflow: hidden;
  `,
  input: css`
    visibility: hidden;

    &:checked + [data-element="sprite"] {
      [data-element="icon"] {
        transform: scale(1);
        border-radius: 0;
      }
    }

    &:disabled + [data-element="sprite"] {
      cursor: not-allowed;
      background: ${sv.neutralLight} !important;

      [data-element="icon"] {
        opacity: 0.7;
      }
    }
  `,
  label: css`
    margin-left: ${sv.marginExtraSmall};
    color: ${sv.colorPrimary};

    &:hover {
      cursor: pointer;
    }
  `,
  sprite: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: ${sv.defaultBorderRadius};
    background: ${sv.neutral};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: ${sv.defaultTransition};
    overflow: hidden;
  `,
  iconLabel: css`
    cursor: inherit;
    color: ${sv.white};
    height: 100%;
    width: 100%;
    background: ${sv.green};
    line-height: 34px;
    transform: scale(0);
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
    border-radius: 100px;
    font-size: 0.7rem;
  `,
};



const Checkbox = ({
  onChange,
  value,
  id,
  children,
  disabled,
  error,
  ...rest,
}) => {
  const isChecked = !! value;

  const handleOnChange = (e) => {
    e.stopPropagation();
    onChange ? onChange( ! isChecked, e.target.name) : null;
  };

  const uniqId = id ? id : v4();
  return (
    <div className={styles.base}>
      <label className={cx(styles.wrapper, {
        [styles.disabled]: disabled,
        [styles.error]: error,
      })} htmlFor={uniqId}>
        <div className={styles.checkbox}>
          <input
            disabled={disabled}
            checked={isChecked}
            id={uniqId}
            type="checkbox"
            className={styles.input}
            onChange={handleOnChange}
            {...rest} />
          <div data-element="sprite" className={styles.sprite}>
            <label data-element="icon" className={styles.iconLabel} htmlFor={uniqId}>
              <Icon bold name="check" />
            </label>
          </div>
        </div>
        {do{
          if (children) {
            <label className={styles.label} htmlFor={uniqId}>
              {children}
            </label>
          }
        }}
      </label>
      {do{
        if (error && typeof error === 'string') {
          <Hint error>{error}</Hint>
        }
      }}
    </div>
  );
};


Checkbox.propTypes = {
  /** If passed, the text will be the label of the checkbox */
  children: PropTypes.string,

  /** Triggered when checkbox value is changed */
  onChange: PropTypes.func,

  /** If true, checkbox is not clickable */
  disabled: PropTypes.bool,

  /** Determines if checkbox is checked */
  value: PropTypes.bool,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};


export default Checkbox;
