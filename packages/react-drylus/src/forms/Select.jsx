import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';


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
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      right: ${sv.marginSmall};
    }
  `,
  select: css`
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    border: none;
    appearance: button;
    width: 100%;
    outline: none !important;
    border: 1px solid ${sv.azure};
    transition: ${sv.defaultTransition};

    &:hover {
      border-color: ${sv.azureDark};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;
    }
  `,
  option: css`
    padding: 30px;
  `,
};


const Select = ({
  value,
  values=[],
  onChange,
  valueKey='value',
  labelKey='label',
  defaultValue,
  placeholder=' -- ',
  ...rest,
}) => {
  const handleOnChange = (e) => onChange(e.target.value, e.target.name);
  return (
    <div className={styles.base}>
      <select
        className={styles.select}
        value={value}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        {...rest}>
        {do {
          if (! value) {
            <option key={values.length} value={defaultValue}>{placeholder}</option>
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
    </div>
  );
};


Select.propTypes = {
  /** The values to show in the list of options */
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,

  /** Determines which value is currently active */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Disables the select */
  disabled: PropTypes.bool,
};


export default Select;
