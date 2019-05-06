import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import RoundIcon from '../components/RoundIcon';
import Sizes from '../base/Sizes';
import Categories from '../base/Categories';
import Hint from './Hint';


const styles = {
  base: css`
    display: inline-block;
    position: relative;
    width: 100%;

    &::after {
      content: '\\ea29';
      font-family: 'drycons';
      color: ${sv.colorPrimary};
      position: absolute;
      top: calc(${sv.marginExtraSmall} * 1.3);
      font-size: 1.3rem;
      right: ${sv.marginSmall};
      pointer-events: none;
    }
  `,
  disabled: css`
    &::after {
      color: ${sv.colorDisabled};
    }
  `,
  select: css`
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    padding-right: ${sv.paddingExtraLarge};
    border: none;
    border-radius: ${sv.defaultBorderRadius};
    appearance: button;
    width: 100%;
    outline: none !important;
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    transition: ${sv.defaultTransition};

    &:hover {
      box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;
    }
  `,
  valid: css`
    > select {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  icon: css`
    pointer-events: none;
    position: absolute;
    top: calc(${sv.marginExtraSmall} * 1.5);
    right: calc(${sv.marginSmall} * 2 + ${sv.marginExtraSmall});
  `,
  error: css`
    > select {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
    }
  `,
};


const Select = ({
  value,
  values=[],
  onChange,
  valueKey='value',
  labelKey='label',
  placeholder=' -- ',
  disabled,
  hint,
  error,
  valid,
  ...rest,
}) => {
  const handleOnChange = (e) => onChange(e.target.value, e.target.name);
  return (
    <div className={cx(styles.base, {
      [styles.disabled]: disabled,
      [styles.valid]: !! value && valid,
      [styles.error]: error,
    })}>
      {do{
        if (error) {
          <div className={styles.icon}>
            <RoundIcon name="x" size={Sizes.SMALL} category={Categories.DANGER} />
          </div>
        }
        else if (value && valid) {
          <div className={styles.icon}>
            <RoundIcon name="check" size={Sizes.SMALL} category={Categories.SUCCESS} />
          </div>
        }
      }}
      <select
        disabled={disabled}
        className={styles.select}
        value={value}
        onChange={handleOnChange}
        {...rest}>
        {do {
          if (! value) {
            <option key={values.length}>{placeholder}</option>
          }
        }}
        {values.map((value) => (
          <option
            className={styles.option}
            key={value[valueKey]}
            name={value[labelKey]}
            value={value[valueKey]}
            disabled={value.disabled}>
            {value[labelKey]}
          </option>
        ))}
      </select>
      {do{
        if (error) {
          <Hint error>{error}</Hint>
        }
        else if (hint) {
          <Hint>{hint}</Hint>
        }
      }}
    </div>
  );
};


Select.propTypes = {
  /** The values to show in the list of options */
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),

  /** Determines which value is currently active */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Disables the select */
  disabled: PropTypes.bool,

  /** Used to pick each value in the values array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the values array */
  labelKey: PropTypes.string,

  /** Text shown when no value is selected */
  placeholder: PropTypes.string,

  /** Triggered when a new value is chosen, returns a value, key (label, value) pair */
  onChange: PropTypes.func,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,
};


Select.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  placeholder: ' -- ',
};


export default Select;
