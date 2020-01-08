import React, { useState, useEffect, useRef } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import Enum from '@drawbotics/enums';

import Icon from './Icon';
import ListTile from '../layout/ListTile';
import Checkbox from '../forms/Checkbox';
import { CustomPropTypes, deprecateProperty } from '../utils';
import { Align } from '../enums';


const styles = {
  root: css`
    position: relative;
    display: inline-block;
  `,
  trigger: css`
    padding: calc(${sv.paddingExtraSmall} * 1.5 - 1px) ${sv.paddingSmall};
    border-radius: ${sv.defaultBorderRadius};
    box-shadow: inset 0 0 0 1px ${sv.neutral};
    color: ${sv.colorSecondary};
    transition: ${sv.transitionShort};
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
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
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
    transition: ${sv.transitionShort};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }
  `,
  option: css`
    display: flex;
    align-items: center;
    padding: 5px ${sv.paddingExtraSmall};
    transition: ${sv.transitionShort};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }
  `,
  smallPadding: css`
    padding: 5px ${sv.paddingSmall};
  `,
  defaultCursor: css`
    &:hover {
      cursor: default;
    }
  `,
  activeOption: css`
    font-weight: 500;
  `,
  label: css`
    flex: 1;
  `,
  fullWidth: css`
    width: 100%;
    flex: 1;

    [data-element="trigger"] {
      justify-content: center;
    }

    [data-element="panel"] {
      width: 100%;
    }
  `,
};


/**
 * @deprecated and will be removed in version 6.0
 */
export const FilterAlign = deprecateProperty(new Enum(
  'RIGHT',
  'LEFT',
), 'FilterAlign', 'Align');


const BaseFilter = ({
  clearLabel,
  label,
  children,
  onClear,
  align,
  active,
  style,
  fullWidth,
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
    <div
      style={style}
      ref={ref}
      className={cx(styles.root, {
        [styles.fullWidth]: fullWidth,
      })}>
      <div
        data-element="trigger"
        className={cx(styles.trigger, {
          [styles.active]: panelOpen || active,
        })}
        onClick={() => setPanelOpen( ! panelOpen)}>
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
      <div
        data-element="panel"
        className={cx(styles.panel, {
          [styles.visible]: panelOpen,
          [styles.rightAlign]: align === Align.RIGHT,
        })}
        onClick={() => setPanelOpen(false)}>
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
  align: PropTypes.oneOf([ Align.LEFT, Align.RIGHT ]),

  /** If true, the filter trigger is dark, and the close icon is shown to clear it when clicked */
  active: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  /** If true, the filter takes the whole space of the parent */
  fullWidth: PropTypes.bool,
};


BaseFilter.defaultProps = {
  clearLabel: 'Clear',
  align: Align.RIGHT,
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
  const currentLabel = value ? options.find((option) => String(option[valueKey]) === String(value))?.[labelKey] : label;
  return (
    <BaseFilter {...rest} label={currentLabel != null ? currentLabel : label} active={currentLabel != null && !! value}>
      {options.map((option) => (
        <div
          key={option[valueKey]}
          className={cx(styles.option, styles.smallPadding, {
            [styles.activeOption]: String(value) === String(option[valueKey]),
          })}
          onClick={() => onChange(option[valueKey])}>
          <div className={styles.label}>
            <ListTile title={option[labelKey]} leading={option.leading} />
          </div>
          {do {
            if (option.trailing != null) {
              option.trailing
            }
          }}
        </div>
      ))}
    </BaseFilter>
  );
};


SelectFilter.propTypes = {
  /** The items to show in the filter panel: value(string, number), label(string), leading(node), trailing(node) */
  options: CustomPropTypes.optionsWith({
    leading: PropTypes.node,
    trailing: PropTypes.node,
  }),

  /** Determines which value is currently active */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,

  /** Triggered when an option is clicked */
  onChange: PropTypes.func.isRequired,

  /** Used for style overrides */
  style: PropTypes.object,
};


SelectFilter.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
};


function getLabelForCheckboxFilter(label, options, values, valueKey, labelKey) {
  if (values == null) {
    return label;
  }
  else if (values.length === 1) {
    return options.find((option) => String(option[valueKey]) === String(values[0]))?.[labelKey];
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
  values,
  valueKey,
  labelKey,
  onChange,
  label,
  ...rest,
}) => {
  const currentLabel = getLabelForCheckboxFilter(label, options, values, valueKey, labelKey);
  return (
    <BaseFilter {...rest} label={currentLabel != null ? currentLabel : label} active={currentLabel != null && values.length > 0}>
      {options.map((option) => (
        <div key={option[valueKey]} className={cx(styles.option, styles.defaultCursor)}>
          <Checkbox
            onChange={(checked) => {
              checked
                ? onChange([...values, option[valueKey]])
                : onChange(values.filter((v) => String(v) !== String(option[valueKey])))
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
  /** The items to show in the filter panel: value(string, number), label(string) */
  options: CustomPropTypes.options,

  /** Determines which values are currently active */
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,

  /** Triggered when an option is clicked. Returns the list of currently selected elements */
  onChange: PropTypes.func.isRequired,

  /** Used for style overrides */
  style: PropTypes.object,
};


CheckboxFilter.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
};


export default BaseFilter;
