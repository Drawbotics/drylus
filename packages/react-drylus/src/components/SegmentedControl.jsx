import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import PropTypes from 'prop-types';

import { Categories, Sizes } from '../base';
import Badge from './Badge';
import Spinner from './Spinner';
import { CustomPropTypes } from '../utils';


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
    position: relative;
    display: flex;

    > * {
      z-index: 1;
    }

    &:hover {
      cursor: pointer;
      background: ${sv.neutral};
      color: ${sv.colorPrimary};
    }

    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${sv.white};
      border-radius: calc(${sv.defaultBorderRadius} - 1px);
      opacity: 0;
      transform: scale(0.2);
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
  active: css`
    &::before {
      opacity: 1;
      transform: scale(1);
    }

    &:hover {
      background: transparent;
    }
  `,
  disabled: css`
    background: none !important;
    color: ${sv.colorDisabled} !important;

    &:hover {
      cursor: not-allowed;
      background: none !important;
    }

    & > [data-element="extra"] {
      opacity: 0.5;
    }
  `,
  extra: css`
    display: inline-block;
    margin-left: ${sv.marginExtraSmall};
  `,
};


const SegmentedControl = ({
  value,
  onChange,
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
          <span>{option[labelKey]}</span>
          {do{
            if (option.loading === true) {
              <div data-element="extra" className={styles.extra}>
                <Spinner size={Sizes.SMALL} category={Categories.BRAND} />
              </div>
            }
            else if (option.bullet != null) {
              <div data-element="extra" className={styles.extra}>
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
  options: CustomPropTypes.optionsWith({
    bullet: PropTypes.number,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
  }),

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
  onChange: x => x,
};


export default SegmentedControl;
