import React, { useState, useEffect, useRef } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Icon from './Icon';


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
    min-width: 100%;
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    overflow: hidden;
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
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
    padding: ${sv.paddingExtraSmall}; ${sv.paddingSmall};
    margin: ${sv.marginExtraSmall} 0;
    color: ${sv.blue};
    transition: ${sv.defaultTransition};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }
  `,
};


export const FilterAlign = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};


const BaseFilter = ({
  clearLabel,
  label,
  children,
  onClear,
  align,
}) => {
  const ref = useRef();
  const [ active, setActive ] = useState(false);
  const handleDocumentClick = (e) => ! ref.current.contains(e.target) ? setActive(false) : null;
  const handleClickClear = () => {
    setActive(false);
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
        [styles.active]: active,
      })} onClick={() => setActive(true)}>
        {label}
        <Icon name={active ? 'chevron-up' : 'chevron-down'} />
      </div>
      <div className={cx(styles.panel, {
        [styles.visible]: active,
        [styles.rightAlign]: align === FilterAlign.RIGHT,
      })}>
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
};


BaseFilter.defaultProps = {
  clearLabel: 'Clear',
  align: FilterAlign.RIGHT,
};


export const SelectFilter = ({
  options,
}) => {
  return (
    <BaseFilter>
    </BaseFilter>
  );
};


SelectFilter.propTypes = {

};


export default BaseFilter;
