import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';


const styles = {
  base: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${sv.neutralLight};
    padding: 4px 2px;
    border-radius: ${sv.defaultBorderRadius};
  `,
  control: css`
    padding: ${sv.paddingExtraSmall} ${sv.defaultPadding};
    border-radius: calc(${sv.defaultBorderRadius} - 1px);
    white-space: nowrap;
    color: ${sv.colorSecondary};
    margin: 0 2px;
    transition: ${sv.defaultTransition};

    &:hover {
      cursor: pointer;
      background: ${sv.neutral};
      color: ${sv.colorPrimary};
    }
  `,
  active: css`
    background: ${sv.white};
    color: ${sv.colorPrimary};

    &:hover {
      background: ${sv.white};
    }
  `,
  disabled: css`
    background: none !important;
    color: ${sv.colorDisabled} !important;

    &:hover {
      cursor: not-allowed;
      background: none !important;
    }

    & > [data-element="bullet"] {
      opacity: 0.5;
    }
  `,
  bullet: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 5px 1px 5px;
    background: ${sv.brand};
    color: ${sv.white};
    border-radius: 1000px;
    font-size: 0.8rem;
    margin-left: ${sv.marginExtraSmall};
  `,
};


const SegmentedControl = ({
  value,
  onChange=x=>x,
  values,
  valueKey='value',
  labelKey='label',
}) => {
  return (
    <div className={styles.base}>
      {values.map((_value) => (
        <div
          key={_value[valueKey]}
          className={cx(styles.control, {
            [styles.active]: value === _value[valueKey],
            [styles.disabled]: _value.disabled,
          })}
          onClick={! _value.disabled ? () => onChange(_value[valueKey]) : null}>
          {_value[labelKey]}
          {do{
            if (_value.bullet) {
              <div data-element="bullet" className={styles.bullet}>
                {_value.bullet}
              </div>
            }
          }}
        </div>
      ))}
    </div>
  );
};


SegmentedControl.propTypes = {
  /** Determines the controls which will be rendered */
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    bullet: PropTypes.number,
    disabled: PropTypes.bool,
  })),

  /** Used to pick each value in the values array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the values array */
  labelKey: PropTypes.string,

  /** Determines which value is currently active */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Triggered when a control is clicked */
  onChange: PropTypes.func,
};


SegmentedControl.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
};


export default SegmentedControl;
