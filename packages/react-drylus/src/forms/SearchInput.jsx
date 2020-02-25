import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import Button from '../components/Button';
import Icon from '../components/Icon';
import Spinner from '../components/Spinner';
import Size from '../enums/Size';
import { CustomPropTypes } from '../utils';
import { useResponsiveProps } from '../utils/hooks';
import { InputWithRef } from './Input';

const styles = {
  root: css`
    position: relative;
  `,
  list: css`
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
  `,
  visible: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  item: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    color: ${sv.colorPrimary};

    &:hover {
      cursor: pointer;
      background-color: ${sv.neutralLighter};
    }
  `,
  noResult: css`
    pointer-events: none;
  `,
};

const SearchInput = ({ responsive, ...rest }) => {
  const {
    options,
    value,
    onChange,
    noResultLabel,
    placeholder,
    isLoading,
    name,
    style,
    valueKey,
    labelKey,
    onClickResult,
  } = useResponsiveProps(rest, responsive);
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const shouldDisplayResults = value !== '' && isFocused;
  return (
    <div style={style} className={styles.root}>
      <InputWithRef
        prefix={
          <Button
            leading={isLoading ? <Spinner size={Size.SMALL} /> : <Icon name="search" />}
            onClick={() => inputRef.current.focus()}
          />
        }
        value={value}
        onChange={onChange}
        name={name}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
      />
      {do {
        if (options == null) {
          return null;
        } else {
          <div
            className={cx(styles.list, {
              [styles.visible]: shouldDisplayResults,
            })}>
            {do {
              if (options.length === 0) {
                <div className={cx(styles.item, styles.noResult)}>{noResultLabel}</div>;
              } else {
                options.map((option) => (
                  <div
                    key={option[valueKey]}
                    className={styles.item}
                    onClick={() => onClickResult(option[valueKey])}>
                    {option[labelKey]}
                  </div>
                ));
              }
            }}
          </div>;
        }
      }}
    </div>
  );
};

SearchInput.propTypes = {
  /** The list of items displayed under the input ('value, key' pairs) its completely up to you to generate this list */
  options: CustomPropTypes.options,

  /** The text passed to the input */
  value: PropTypes.string.isRequired,

  /** Name of the form element (target.name) */
  name: PropTypes.string,

  /** Triggered when the text is changed, and when the search button is pressed */
  onChange: PropTypes.func.isRequired,

  /** Triggered when one of the results is clicked, returns the corresponding option value */
  onClickResult: PropTypes.func,

  /** Displayed when no results match the search */
  noResultLabel: PropTypes.string,

  placeholder: PropTypes.string,

  /** If true, the search button will display a spinner */
  isLoading: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),

  /** Used to pick each value in the options array */
  valueKey: PropTypes.string,

  /** Used to pick each label in the options array */
  labelKey: PropTypes.string,
};

SearchInput.defaultProps = {
  noResultLabel: 'No results',
  valueKey: 'value',
  labelKey: 'label',
};

export default SearchInput;
