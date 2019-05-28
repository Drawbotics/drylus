import React from 'react';
import v4 from 'uuid/v4';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Hint from './Hint';
import Icon from '../components/Icon';
import { Sizes } from '../base';


const styles = {
  radioGroup: css`
    display: inline-block;
  `,
  radioWrapper: css`
    margin-bottom: ${sv.marginSmall};
  `,
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
  radio: css`
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
    border-radius: 1000px;
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
    line-height: ${sv.marginLarge};
    transform: scale(0);
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
    border-radius: 100px;

    > i {
      font-size: 1.1rem;
    }
  `,
  small: css`
    > div {
      height: ${sv.marginSmall};
      width: ${sv.marginSmall};
    }
    [data-element="icon"] {
      line-height: calc(${sv.marginSmall} + 1px);

       > i {
         font-size: 0.7rem;
       }
    }

    [data-element="label"] {
      font-size: 0.9rem;
    }
  `,
};


const Radio = ({
  value,
  onChange,
  valueKey='value',
  labelKey='label',
  disabled,
  error,
  size,
  checked,
  children,
  ...rest,
}) => {
  const id = v4();
  return (
    <div className={styles.base}>
      <label className={cx(styles.wrapper, {
        [styles[size?.toLowerCase()]]: size,
        [styles.disabled]: disabled,
        [styles.error]: error,
      })} htmlFor={id}>
        <div className={styles.radio}>
          <input
            disabled={disabled}
            checked={checked}
            value={value}
            id={id}
            type="radio"
            className={styles.input}
            onChange={onChange}
            {...rest} />
          <div data-element="sprite" className={styles.sprite}>
            <label data-element="icon" className={styles.iconLabel} htmlFor={id}>
              <Icon bold name="check" />
            </label>
          </div>
        </div>
        {do{
          if (children) {
            <label data-element="label" className={styles.label} htmlFor={id}>
              {children}
            </label>
          }
        }}
      </label>
    </div>
  );
};



const RadioGroup = ({
  value,
  onChange,
  options=[],
  valueKey='value',
  labelKey='label',
  error,
  size,
  className,
  hint,
  ...rest,
}) => {

  const handleOnChange = (e) => {
    e.stopPropagation();
    onChange ? onChange(e.target.value, e.target.name) : null;
  };

  return (
    <div className={cx(styles.radioGroup, className)}>
      <div className={styles.radios}>
        {options.map((option) => (
          <div key={option[valueKey]} className={styles.radioWrapper}>
            <Radio
              size={size}
              error={!! error}
              onChange={handleOnChange}
              checked={value === option[valueKey]}
              value={option[valueKey]}
              disabled={option.disabled}
              {...rest}>{option[labelKey]}</Radio>
          </div>
        ))}
      </div>
      {do{
        if (error && typeof error === 'string') {
          <Hint error>{error}</Hint>
        }
        else if (hint) {
          <Hint>{hint}</Hint>
        }
      }}
    </div>
  );
};


RadioGroup.propTypes = {
  /** Determines the radio components which will be rendered */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,

  /** Triggered when radio value is changed */
  onChange: PropTypes.func,

  /** If true, none of the checkboxes are clickable */
  disabled: PropTypes.bool,

  /** Determines which value is currently active */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** Size of the radio buttons. Can be small */
  size: PropTypes.oneOf([Sizes.SMALL, Sizes.DEFAULT]),

  /** Passed to the wrapper component, to override any styles */
  className: PropTypes.string,

  /** Small text shown below the group, replaced by error if present */
  hint: PropTypes.string,
};


RadioGroup.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  size: Sizes.DEFAULT,
};


export default RadioGroup;
