import React, { useState, useRef } from 'react';
import sv from '@drawbotics/style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';

import { InputWithRef } from './Input';
import Button from '../components/Button';


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


const SearchInput = ({
  options,
  value,
  onChange,
  noResultLabel,
  placeholder,
}) => {
  const [ isFocused, setFocused ] = useState(false);
  const inputRef = useRef(null);

  const shouldDisplayResults = value !== '' && isFocused;
  return (
    <div className={styles.root}>
      <InputWithRef
        prefix={<Button icon="search" onClick={() => inputRef.current.focus()} />}
        onChange={onChange}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder} />
      <div className={cx(styles.list, {
        [styles.visible]: shouldDisplayResults,
      })}>
        {do {
          if (options.length === 0) {
            <div className={cx(styles.item, styles.noResult)}>
              {noResultLabel}
            </div>
          }
          else {
            options.map((option) => (
              <div key={option} className={styles.item} onClick={() => onChange(option)}>
                {option}
              </div>
            ))
          }
        }}
      </div>
    </div>
  );
};


SearchInput.propTypes = {
  /** The list of items displayed under the input */
  options: PropTypes.arrayOf(PropTypes.string),

  /** The text passed to the input */
  value: PropTypes.string.isRequired,

  /** Triggered when the text is changed, and when the search button is pressed */
  onChange: PropTypes.func.isRequired,

  /** Displayed when no results match the search */
  noResultLabel: PropTypes.string,

  placeholder: PropTypes.string,
};


SearchInput.defaultProps = {
  noResultLabel: 'No results',
};


export default SearchInput;
