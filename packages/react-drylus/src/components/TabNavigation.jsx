import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv, { fade } from '@drawbotics/style-vars';

import Categories from '../base/Categories';
import Badge from './Badge';


const styles = {
  base: css`
    display: flex;
    align-items: flex-end;
    width: 100%;
    position: relative;

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: ${sv.neutral};
      z-index: 1;
    }
  `,
  vertical: css`
    flex-direction: column;
    align-items: stretch;

    &::after {
      content: none;
    }

    & > div {
      flex: 1;
      justify-content: space-between;
      color: ${sv.colorPrimary};
      border-bottom: 1px solid ${sv.neutral};

      &::after {
        top: 0;
        height: 100%;
        width: 0px;
      }
    }
  `,
  item: css`
    display: flex;
    align-items: center;
    padding: ${sv.defaultPadding} ${sv.paddingLarge};
    color: ${sv.colorSecondary};
    transition: ${sv.defaultTransition};
    position: relative;

    &:hover {
      cursor: pointer;
      color: ${sv.colorPrimary};
    }

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0px;
      background: ${sv.brand};
      z-index: 2;
      transition: ${sv.defaultTransition};
    }
  `,
  active: css`
    color: ${sv.colorPrimary};

    &::after {
      height: 3px;
    }
  `,
  verticalActive: css`
    background: ${fade(sv.brand, 15)};

    &::after {
      width: 4px !important;
    }
  `,
  disabled: css`
    color: ${sv.colorDisabled} !important;

    &:hover {
      cursor: not-allowed;
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


const TabNavigation = ({
  value,
  onChange=x=>x,
  options,
  valueKey,
  labelKey,
  vertical,
}) => {
  return (
    <div className={cx(styles.base, {
      [styles.vertical]: vertical,
    })}>
      {options.map((option) => (
        <div
          key={option[valueKey]}
          className={cx(styles.item, {
            [styles.active]: value === option[valueKey],
            [styles.verticalActive]: vertical && value === option[valueKey],
            [styles.disabled]: option.disabled,
          })}
          onClick={! option.disabled ? () => onChange(option[valueKey]) : null}>
          {option[labelKey]}
          {do{
            if (option.bullet) {
              <div data-element="bullet" className={styles.bullet}>
                {do{
                  if (vertical) {
                    option.bullet
                  }
                  else {
                    <Badge category={Categories.BRAND} value={option.bullet} max={99} />
                  }
                }}
              </div>
            }
          }}
        </div>
      ))}
    </div>
  );
};


TabNavigation.propTypes = {
  /** Determines the tabs which will be rendered */
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

  /** If true, the tabs are rendered in a vertical fashion, by default they take the full width of the container */
  vertical: PropTypes.bool,
};


TabNavigation.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  vertical: false,
};


export default TabNavigation;
