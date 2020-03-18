import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Button, Icon, Spinner } from '../components';
import { Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
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

interface SearchInputProps {
  /** The list of items displayed under the input ('value, key' pairs) its completely up to you to generate this list */
  options?: Array<Option>;

  /** The text passed to the input */
  value: string;

  /** Name of the form element (target.name) */
  name?: string;

  /** Triggered when the text is changed, and when the search button is pressed */
  onChange: () => void;

  /** Triggered when one of the results is clicked, returns the corresponding option value */
  onClickResult?: (value: Option['value']) => void;

  /**
   * Displayed when no results match the search
   * @default 'No results'
   */
  noResultLabel?: string;

  placeholder?: string;

  /** If true, the search button will display a spinner */
  isLoading?: boolean;

  /**
   * Used to pick each value in the options array
   * @default 'value'
   */
  valueKey?: string;

  /**
   * Used to pick each label in the options array
   * @default 'label'
   */
  labelKey: string;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const SearchInput = ({ responsive, ...rest }: SearchInputProps) => {
  const {
    options,
    value,
    onChange,
    noResultLabel = 'No results',
    placeholder,
    isLoading,
    name,
    style,
    valueKey = 'value',
    labelKey = 'label',
    onClickResult,
  } = useResponsiveProps<SearchInputProps>(rest, responsive);
  const [isFocused, setFocused] = useState(false);
  const [canBlur, setCanBlur] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const shouldDisplayResults = value !== '' && isFocused;

  const handleDocumentClick = (e: Event) =>
    !rootRef.current?.contains(e.target as Node) ? setFocused(false) : null;

  useEffect(() => {
    rootRef.current?.addEventListener('mousedown', () => setCanBlur(false));
    rootRef.current?.addEventListener('mouseup', () => setCanBlur(true));
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      rootRef.current?.removeEventListener('mousedown', () => setCanBlur(false));
      rootRef.current?.removeEventListener('mouseup', () => setCanBlur(true));
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  });
  return (
    <div style={style} className={styles.root} ref={rootRef}>
      <InputWithRef
        prefix={
          <Button
            leading={isLoading ? <Spinner size={Size.SMALL} /> : <Icon name="search" />}
            onClick={() => inputRef.current?.focus()}
          />
        }
        value={value}
        onChange={onChange}
        name={name}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => (canBlur ? setFocused(false) : null)}
        placeholder={placeholder}
      />
      {run(() => {
        if (options == null) {
          return null;
        } else {
          return (
            <div
              className={cx(styles.list, {
                [styles.visible]: shouldDisplayResults,
              })}>
              {run(() => {
                if (options.length === 0) {
                  return <div className={cx(styles.item, styles.noResult)}>{noResultLabel}</div>;
                } else {
                  return options.map((option) => (
                    <div
                      key={option[valueKey as keyof Option]}
                      className={styles.item}
                      onClick={() => {
                        if (onClickResult != null) {
                          onClickResult(option[valueKey as keyof Option]);
                        }
                        setFocused(false);
                      }}>
                      {option[labelKey as keyof Option]}
                    </div>
                  ));
                }
              })}
            </div>
          );
        }
      })}
    </div>
  );
};
