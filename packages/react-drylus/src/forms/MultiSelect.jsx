import React, { useRef, useEffect } from 'react';
import { renderToString } from 'react-dom/server'
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';
import Selectr from 'mobius1-selectr';

import Tag from '../components/Tag';


const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;

    & .selectr-container {
      position: relative;

      &::after {
        content: '\\ea99';
        font-family: 'drycons';
        color: ${sv.colorPrimary};
        position: absolute;
        top: calc(${sv.marginExtraSmall} * 1.3);
        font-size: 1.3rem;
        right: ${sv.marginSmall};
        pointer-events: none;
      }

      &.open {
        & .selectr-selected {
          box-shadow: inset 0px 0px 0px 2px ${sv.brand} !important;
        }

        & .selectr-options-container {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
      }
    }

    & .selectr-selected {
      background-color: ${sv.azureLight};
      padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
      padding-right: ${sv.paddingExtraLarge};
      border: none;
      border-radius: ${sv.defaultBorderRadius};
      width: 100%;
      box-shadow: inset 0px 0px 0px 1px ${sv.azure};
      transition: ${sv.defaultTransition};

      &:hover {
        box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
      }

      &:focus {
        outline: none !important;
      }
    }

    & .selectr-placeholder {
      color: ${sv.colorPrimary};
      letter-spacing: normal;
    }

    & .selectr-options {
      position: relative;
      overflow-x: auto;
      overflow-y: scroll;
      margin: 0;
      padding: 0;
    }

    & .selectr-input-container {
      display: none;
    }

    & .selectr-hidden {
      position: absolute;
      overflow: hidden;
      clip: rect(0,0,0,0);
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
    }

    & .selectr-options-container {
      position: absolute;
      z-index: 999;
      top: 100%;
      margin-top: ${sv.marginExtraSmall};
      min-width: 100%;
      background: ${sv.white};
      border-radius: ${sv.defaultBorderRadius};
      border: 1px solid ${sv.azure};
      overflow: hidden;
      box-shadow: ${sv.elevation2};
      opacity: 0;
      transform: translateY(-5px);
      pointer-events: none;
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }

    & .selectr-option {
      padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
      color: ${sv.colorPrimary};

      &:hover {
        cursor: pointer;
        background-color: ${sv.neutralLighter};
      }

      &.selected {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    & .selectr-tags {
      display: none;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: -9px !important;
    }

    & .selectr-label {
      display: none;
      overflow: hidden;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    & .has-selected {
      & .selectr-placeholder {
        display: none;
      }

      & .selectr-label {
        display: block;
        margin: -4px;
        padding: 0;
      }

      & .selectr-tags {
        display: flex;
      }
    }

    & .selectr-tag {
      position: relative;
      display: block;
      list-style: none;
      margin-right: 5px;
      margin-bottom: 5px;
    }

    & .selectr-tag-remove {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 100%;
      padding: 0;
      cursor: pointer;
      border: none;
      background-color: transparent;
      z-index: 2;

      &:focus {
        outline: none;
      }
    }
  `,
  disabled: css`
    & .selectr-container {
      &::after {
        color: ${sv.colorDisabled};
      }
    }

    & .selectr-selected {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      border-color: ${sv.neutralLight};
      box-shadow: none;
    }

    & .selectr-placeholder {
      color: ${sv.colorDisabled};
    }
  `,
};


function myRenderFunction(option) {
  return renderToString(<Tag inversed onClickRemove={x=>x}>{option.textContent.trim()}</Tag>);
}


const MultiSelect = ({
  values,
  options,
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
  const selectRef = useRef();

  useEffect(() => {
    new Selectr(selectRef.current, {multiple: true,
      searchable: false,
      placeholder,
      renderSelection: myRenderFunction,
    });
  }, []);

  const handleOnChange = (e) => onChange(e.target.value, e.target.name);
  return (
    <div className={cx(styles.root, {
      [styles.disabled]: disabled,
      [styles.valid]: Boolean(values) && valid,
      [styles.error]: error,
    })}>
      <select
        ref={selectRef}
        disabled={disabled}
        className={styles.select}
        onChange={handleOnChange}
        multiple
        {...rest}>
        {options.map((option) => (
          <option
            className={styles.option}
            key={option[valueKey]}
            name={option[labelKey]}
            value={option[valueKey]}
            disabled={option.disabled}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};


MultiSelect.propTypes = {
  /** The options to show in the list of options */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),

  /** Determines which values are currently active */
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /** Disables the multi select */
  disabled: PropTypes.bool,

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,

  /** Text shown when no value is selected */
  placeholder: PropTypes.string,

  /** Triggered when a new value is chosen, returns a value, key (label, value) pair */
  onChange: PropTypes.func.isRequired,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,
};


MultiSelect.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  placeholder: ' -- ',
  options: [],
};


export default MultiSelect;
