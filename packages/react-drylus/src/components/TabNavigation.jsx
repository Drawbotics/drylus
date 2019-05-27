import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


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
  item: css`
    padding: ${sv.defaultPadding} ${sv.paddingLarge};
    color: ${sv.colorSecondary};
    transition: ${sv.defaultTransition};
    position: relative;
    font-weight: 400;

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
};


const TabNavigation = ({
  value,
  onChange=x=>x,
  values,
  valueKey,
  labelKey,
  vertical,
}) => {
  return (
    <div className={styles.base}>
      {values.map((_value) => (
        <div
          key={_value[valueKey]}
          className={cx(styles.item, {
            [styles.active]: value === _value[valueKey],
          })}
          onClick={! _value.disabled ? () => onChange(_value[valueKey]) : null}>
          {_value[labelKey]}
        </div>
      ))}
    </div>
  );
};


TabNavigation.propTypes = {
  /** Determines the tabs which will be rendered */
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

  /** If true, the tabs are rendered in a vertical fashion, by default they take the full width of the container */
  vertical: PropTypes.bool,
};


TabNavigation.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  vertical: false,
};


export default TabNavigation;
