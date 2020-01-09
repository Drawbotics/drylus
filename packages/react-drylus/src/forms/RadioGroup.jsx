import React from 'react';
import v4 from 'uuid/v4';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import PropTypes from 'prop-types';

import Hint from './Hint';
import Icon from '../components/Icon';
import { Category } from '../enums';
import { CustomPropTypes } from '../utils';
import { styles as placeholderStyles } from '../components/LoadingPlaceholder';
import { useResponsiveProps } from '../utils/hooks';


const styles = {
  radioGroup: css`
    display: inline-block;
  `,
  radioWrapper: css`
    margin-bottom: ${sv.marginExtraSmall};
  `,
  root: css`
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
  readOnly: css`
    pointer-events: none;

    [data-element="sprite"] {
      background: ${sv.neutralLight} !important;
    }

    [data-element="locked-icon"] {
      transform: scale(1);
      border-radius: 0;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${sv.colorSecondary};
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
    height: calc(${sv.defaultMargin} - 4px);
    width: calc(${sv.defaultMargin} - 4px);
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
      [data-element='locked-icon'] {
        background: ${sv.green};
        color: ${sv.colorPrimaryInverse};
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
    position: relative;
    top: 1px;

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
    transition: ${sv.transitionShort};
    overflow: hidden;
  `,
  iconLabel: css`
    cursor: inherit;
    color: ${sv.white};
    height: 100%;
    width: 100%;
    background: ${sv.green};
    line-height: ${sv.defaultMargin};
    transform: scale(0);
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
    border-radius: 100px;

    > i {
      font-size: 0.8rem;
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
  checked,
  children,
  isPlaceholder,
  readOnly,
  ...rest,
}) => {
  const id = v4();
  return (
    <div className={styles.root}>
      <label className={cx(styles.wrapper, {
        [styles.disabled]: disabled,
        [styles.error]: error,
        [styles.readOnly]: readOnly,
        [placeholderStyles.shimmer]: isPlaceholder,
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
            {do {
              if (readOnly) {
                <label data-element="locked-icon" className={styles.iconLabel}>
                  <Icon name="lock" />
                </label>
              }
              else {
                <label data-element="icon" className={styles.iconLabel} htmlFor={id}>
                  <Icon bold name="check" />
                </label>
              }
            }}
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
  responsive,
  ...rest,
}) => {
  const {
    value,
    onChange,
    options=[],
    valueKey='value',
    labelKey='label',
    error,
    className,
    hint,
    style,
    ...props
  } = useResponsiveProps(rest, responsive);

  const handleOnChange = (e) => {
    e.stopPropagation();
    onChange ? onChange(e.target.value, e.target.name) : null;
  };

  const readOnly = onChange == null;

  return (
    <div style={style} className={cx(styles.radioGroup, className)}>
      <div className={styles.radios}>
        {options.map((option) => (
          <div key={option[valueKey]} className={styles.radioWrapper}>
            <Radio
              readOnly={readOnly}
              error={!! error}
              onChange={handleOnChange}
              checked={value === option[valueKey]}
              value={option[valueKey]}
              disabled={option.disabled}
              {...props}>{option[labelKey]}</Radio>
          </div>
        ))}
      </div>
      {do{
        if (error && typeof error === 'string') {
          <Hint category={Category.DANGER}>{error}</Hint>
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
  options: CustomPropTypes.optionsWith({
    disabled: PropTypes.bool,
  }),

  /** Name of the form element (target.name) */
  name: PropTypes.string,

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

  /** Passed to the wrapper component, to override any styles */
  className: PropTypes.string,

  /** Small text shown below the group, replaced by error if present */
  hint: PropTypes.string,
  
  /** Used for style overrides */
  style: PropTypes.object,

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder: PropTypes.bool,

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
};


RadioGroup.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
};


export default RadioGroup;
