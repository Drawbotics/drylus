import React, { useState, useEffect, useRef } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';
import Enum from '@drawbotics/enums';

import Icon from './Icon';
import ListTile from './ListTile';
import Checkbox from '../forms/Checkbox';


const styles = {
  root: css`
    position: relative;
    display: inline-block;
  `,
  trigger: css`
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    border-radius: ${sv.defaultBorderRadius};
    box-shadow: inset 0 0 0 1px ${sv.neutral};
    color: ${sv.colorSecondary};
    transition: ${sv.defaultTransition};
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      box-shadow: inset 0px 0px 0px 1px ${sv.neutralDark};
      color: ${sv.colorPrimary};
    }

    > i {
      margin-left: 2px;
    }
  `,
  active: css`
    background: ${sv.neutralDarker} !important;
    color: ${sv.white} !important;
    box-shadow: inset 0 0 0 1px ${sv.neutralDarker} !important;
  `,
  panel: css`
    position: absolute;
    z-index: 999;
    top: 100%;
    margin-top: ${sv.marginExtraSmall};
    background: ${sv.white};
    min-width: 180px;
    width: 100%;
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    overflow: hidden;
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    padding-top: ${sv.paddingExtraSmall};
  `,
  rightAlign: css`
    right: 0;
  `,
  visible: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  clear: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    margin: ${sv.marginExtraSmall} 0;
    color: ${sv.blue};
    transition: ${sv.defaultTransition};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }
  `,
  option: css`
    display: flex;
    align-items: center;
    padding: 5px ${sv.paddingExtraSmall};
    transition: ${sv.defaultTransition};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }
  `,
  defaultCursor: css`
    &:hover {
      cursor: default;
    }
  `,
  activeOption: css`
    font-weight: bold;
  `,
};


export const FilterAlign = new Enum(
  'RIGHT',
  'LEFT',
);


const BaseFilter = ({
  clearLabel,
  label,
  children,
  onClear,
  align,
  active,
}) => {
  const ref = useRef();
  const [ panelOpen, setPanelOpen ] = useState(false);
  const handleDocumentClick = (e) => ! ref.current.contains(e.target) ? setPanelOpen(false) : null;
  const handleClickClear = () => {
    setPanelOpen(false);
    onClear();
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);
  return (
    <div ref={ref} className={styles.root}>
      <div className={cx(styles.trigger, {
        [styles.active]: panelOpen || active,
      })} onClick={() => setPanelOpen(true)}>
        {label}
        <Icon
          onClick={(e) => {
            if (active) {
              e.stopPropagation();
              onClear();
            }
          }}
          name={active ? 'x' : (panelOpen ? 'chevron-up' : 'chevron-down')} />
      </div>
      <div className={cx(styles.panel, {
        [styles.visible]: panelOpen,
        [styles.rightAlign]: align === FilterAlign.RIGHT,
      })} onClick={() => setPanelOpen(false)}>
        {children}
        <div className={styles.clear} onClick={handleClickClear}>
          {clearLabel}
        </div>
      </div>
    </div>
  );
};


BaseFilter.propTypes = {
  /** Text shown in the last row of the panel */
  clearLabel: PropTypes.string,

  /** The text shown when the filter is not active, or when more than 1 value is selected */
  label: PropTypes.string.isRequired,

  /** Triggered when the clear button is clicked */
  onClear: PropTypes.func,

  /** Content displayed within the filter panel */
  children: PropTypes.node,

  /** Determines on which side the panel is aligned */
  align: PropTypes.oneOf([ FilterAlign.LEFT, FilterAlign.RIGHT ]),

  /** If true, the filter trigger is dark, and the close icon is shown to clear it when clicked */
  active: PropTypes.bool,
};


BaseFilter.defaultProps = {
  clearLabel: 'Clear',
  align: FilterAlign.RIGHT,
};


export const SelectFilter = ({
  options,
  value,
  valueKey,
  labelKey,
  onChange,
  label,
  ...rest,
}) => {
  const currentLabel = value ? options.find((option) => option[valueKey] === value)?.[labelKey] : label;
  return (
    <BaseFilter {...rest} label={currentLabel} active={!! value}>
      {options.map((option) => (
        <div
          key={option[valueKey]}
          className={cx(styles.option, { [styles.activeOption]: value === option[valueKey] })}
          onClick={() => onChange(option[valueKey])}>
          <ListTile title={option[labelKey]} leading={option.leading} />
        </div>
      ))}
    </BaseFilter>
  );
};


SelectFilter.propTypes = {
  /** The items to show in the filter panel */
  options: PropTypes.arrayOf(PropTypes.shape({
    leading: PropTypes.node,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })),

  /** Determines which value is currently active */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,

  /** Triggered when an option is clicked */
  onChange: PropTypes.func.isRequired,
};


SelectFilter.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
};


function getLabelForCheckboxFilter(label, options, values, valueKey, labelKey) {
  if (values.length === 1) {
    return options.find((option) => option[valueKey] === values[0])?.[labelKey];
  }
  else if (values.length > 1) {
    return `${label} (${values.length})`;
  }
  else {
    return label;
  }
}


export const CheckboxFilter = ({
  options,
  values=[],
  valueKey,
  labelKey,
  onChange,
  label,
  ...rest,
}) => {
  const currentLabel = getLabelForCheckboxFilter(label, options, values, valueKey, labelKey);
  return (
    <BaseFilter {...rest} label={currentLabel} active={values.length > 0}>
      {options.map((option) => (
        <div key={option[valueKey]} className={cx(styles.option, styles.defaultCursor)}>
          <Checkbox
            onChange={(checked) => {
              checked
                ? onChange([...values, option[valueKey]])
                : onChange(values.filter((v) => v !== option[valueKey]))
            }}
            value={values.includes(option[valueKey])}>
            {option[labelKey]}
          </Checkbox>
        </div>
      ))}
    </BaseFilter>
  );
};


CheckboxFilter.propTypes = {
  /** The items to show in the filter panel */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })),

  /** Determines which values are currently active */
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,

  /** Triggered when an option is clicked. Returns (valueKey, boolean) where the second argument is true if checked, false if not */
  onChange: PropTypes.func.isRequired,
};


CheckboxFilter.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
};


export default BaseFilter;
