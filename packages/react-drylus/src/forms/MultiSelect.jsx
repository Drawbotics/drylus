import React, { useRef, useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import PropTypes from 'prop-types';
import { useScreenSize } from '@drawbotics/use-screen-size';


import Tag from '../components/Tag';
import RoundIcon from '../components/RoundIcon';
import Icon from '../components/Icon';
import Spinner from '../components/Spinner';
import Hint from './Hint';
import { Categories, Sizes } from '../base';
import { CustomPropTypes } from '../utils';


const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;

    &::after {
      content: '\\eaac';
      font-family: 'drycons';
      color: ${sv.colorPrimary};
      position: absolute;
      top: calc(${sv.marginExtraSmall} * 1.3);
      font-size: 1.3rem;
      right: ${sv.marginSmall};
      pointer-events: none;
    }

    & select {
      height: 1px;
      width: 1px;
      overflow: hidden;
      opacity: 0;
      position: absolute;
    }
  `,
  select: css`
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    padding-right: ${sv.paddingExtraLarge};
    border: none;
    border-radius: ${sv.defaultBorderRadius};
    width: 100%;
    outline: none !important;
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    transition: ${sv.transitionShort};
    letter-spacing: normal;

    &:hover {
      box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
    }
  `,
  readOnly: css`
    pointer-events: none;

    [data-element="select"] {
      box-shadow: none !important;
    }

    &::after {
      content: none;
    }

    [data-element="icon"] {
      right: ${sv.marginSmall};
    }
  `,
  active: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.brand} !important;
  `,
  disabled: css`
    & > [data-element="select"] {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;

      & > div {
        pointer-events: none;
        opacity: 0.6;
      }
    }

    &::after {
      color: ${sv.colorDisabled};
    }
  `,
  valid: css`
    > [data-element="select"] {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  error: css`
    > [data-element="select"] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  options: css`
    position: absolute;
    z-index: 999;
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
  `,
  open: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  option: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    color: ${sv.colorPrimary};

    &:hover {
      cursor: pointer;
      background-color: ${sv.neutralLighter};
    }
  `,
  disabledOption: css`
    pointer-events: none;
    color: ${sv.colorDisabled};
  `,
  value: css`
    margin-right: ${sv.marginExtraSmall};
    margin-bottom: ${sv.marginExtraSmall};
  `,
  values: css`
    display: flex;
    flex-wrap: wrap;
    margin: -4px;
    margin-bottom: -12px;
    margin-left: -8px;
  `,
  icon: css`
    pointer-events: none;
    position: absolute;
    top: calc(${sv.marginExtraSmall} * 1.5);
    right: calc(${sv.marginSmall} * 2 + ${sv.marginExtraSmall});
  `,
  placeholder: css`
    color: ${sv.colorSecondary};
  `,
};


const MultiSelect = ({
  values,
  options,
  onChange,
  valueKey,
  labelKey,
  placeholder,
  disabled,
  hint,
  error,
  valid,
  name,
  loading,
  style,
  ...rest,
}) => {
  const selectRef = useRef();
  const rootRef = useRef();
  const [ isFocused, setFocused ] = useState(false);
  const [ canBlur, setCanBlur ] = useState(true);
  const { screenSize, ScreenSizes } = useScreenSize();

  const handleDocumentClick = (e) => ! rootRef.current.contains(e.target) ? setFocused(false) : null;

  useEffect(() => {
    rootRef.current.addEventListener('mousedown', () => setCanBlur(false));
    rootRef.current.addEventListener('mouseup', () => setCanBlur(true));
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      rootRef.current.removeEventListener('mousedown', () => setCanBlur(false));
      rootRef.current.removeEventListener('mouseup', () => setCanBlur(true));
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  });

  const handleOnChange = (value) => {
    values.includes(value)
      ? onChange(values.filter((v) => v !== value), name)
      : onChange([ ...values, value ], name);
  };

  // used for mobile
  const handleSelectChange = (options) => {
    const selected = [].filter.call(options, (o) => o.selected).map((o) => o.value);
    onChange(selected);
  };

  const handleClickSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectRef.current.focus();
  };

  const handleClickRemove = (e, value) => {
    e.stopPropagation();
    onChange(values.filter((v) => v !== value));
  };

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.disabled]: disabled,
        [styles.readOnly]: onChange == null,
        [styles.valid]: values?.length > 0 && valid,
        [styles.error]: error,
      })}
      ref={rootRef}>
      {do{
        if (loading) {
          <div className={styles.icon}>
            <Spinner size={Sizes.SMALL} />
          </div>
        }
        else if (onChange == null) {
          <div className={styles.icon} data-element="icon" style={{ color: sv.colorSecondary }}>
            <Icon name="lock" />
          </div>
        }
        else if (error) {
          <div className={styles.icon}>
            <RoundIcon name="x" size={Sizes.SMALL} category={Categories.DANGER} />
          </div>
        }
        else if (values?.length > 0 && valid) {
          <div className={styles.icon}>
            <RoundIcon name="check" size={Sizes.SMALL} category={Categories.SUCCESS} />
          </div>
        }
      }}
      <div
        data-element="select"
        className={cx(styles.select, {
          [styles.active]: isFocused,
        })}
        onClick={onChange != null ? handleClickSelect : null}>
        {do {
          if (placeholder && values?.length === 0) {
            <div className={styles.placeholder}>
              {placeholder}
            </div>
          }
          else {
            <div className={styles.values}>
              {values.map((value) => (
                <div key={value} className={styles.value}>
                  <Tag inversed onClickRemove={onChange != null ? (e) => handleClickRemove(e, value) : null}>
                    {options.find((option) => option[valueKey] === value)[labelKey]}
                  </Tag>
                </div>
              ))}
            </div>
          }
        }}
      </div>
      {do {
        if (screenSize > ScreenSizes.XL) {
          <div className={cx(styles.options, {
            [styles.open]: isFocused,
          })}>
            {options.map((option) => (
              <div
                className={cx(styles.option, {
                  [styles.disabledOption]: option.disabled || values.includes(option[valueKey]),
                })}
                key={option[valueKey]}
                onClick={onChange != null ? () => handleOnChange(option[valueKey]) : null}>
                {option[labelKey]}
              </div>
            ))}
          </div>
        }
      }}
      {do{
        if (error && typeof error === 'string') {
          <Hint category={Categories.DANGER}>{error}</Hint>
        }
        else if (hint) {
          <Hint>{hint}</Hint>
        }
      }}
      <select
        disabled={disabled}
        ref={selectRef}
        onChange={onChange != null ? (e) => handleSelectChange(e.target.options) : null}
        onFocus={() => setFocused(true)}
        onBlur={() => canBlur ? setFocused(false) : null}
        values={values}
        readOnly={onChange == null}
        multiple
        {...rest}>
        {options.map((option) => (
          <option
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
  /** The options to show in the list of options, note that label and value may differ depending on valueKey and labelKey */
  options: CustomPropTypes.optionsWith({
    disabled: PropTypes.bool,
  }),

  /** Determines which values are currently active */
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,

  /** Name of the form element (target.name) */
  name: PropTypes.string,

  /** Disables the multi select */
  disabled: PropTypes.bool,

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,

  /** Text shown when no value is selected */
  placeholder: PropTypes.string,

  /** Triggered when a new value is chosen, returns a value, key (label, value) pair. If not given, the field is read-only */
  onChange: PropTypes.func,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,

  /** If true, a spinner is shown on the right corner, like with error and valid */
  loading: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,
};


MultiSelect.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  placeholder: ' -- ',
  options: [],
};


export default MultiSelect;
