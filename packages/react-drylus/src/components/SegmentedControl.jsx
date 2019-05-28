import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Categories from '../base/Categories';
import Badge from './Badge';


const styles = {
  root: css`
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
    display: inline-block;
    margin-left: ${sv.marginExtraSmall};
  `,
};


const SegmentedControl = ({
  value,
  onChange=x=>x,
  options,
  valueKey,
  labelKey,
}) => {
  return (
    <div className={styles.root}>
      {options.map((option) => (
        <div
          key={option[valueKey]}
          className={cx(styles.control, {
            [styles.active]: value === option[valueKey],
            [styles.disabled]: option.disabled,
          })}
          onClick={! option.disabled ? () => onChange(option[valueKey]) : null}>
          {option[labelKey]}
          {do{
            if (option.bullet) {
              <div data-element="bullet" className={styles.bullet}>
                <Badge category={Categories.BRAND} value={option.bullet} max={99} />
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
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    bullet: PropTypes.number,
    disabled: PropTypes.bool,
  })),

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
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
