import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Button, Icon, Spinner } from '../components';
import { Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { isFunction, run, useResponsiveProps } from '../utils';
import { InputWithRef } from './Input';

const styles = {
  root: css`
    position: relative;
  `,
  listWrapper: css`
    position: absolute;
    z-index: 999;
    min-width: 100%;
    pointer-events: none;
  `,
  list: css`
    margin-top: ${sv.marginExtraSmall};
    min-width: 100%;
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    max-height: 200px;
    overflow: auto;
  `,
  top: css`
    transform: translateY(calc(-100% - 20px - 40px));
  `,
  topOpen: css`
    transform: translateY(calc(-100% - 15px - 40px));
  `,
  topSmall: css`
    transform: translateY(calc(-100% - 20px - 30px));
  `,
  topSmallOpen: css`
    transform: translateY(calc(-100% - 15px - 30px));
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

function _getShouldRenderTop(box: DOMRect) {
  if (box?.bottom > window.innerHeight) {
    return true;
  }
  return false;
}

export interface SearchInputProps<T> {
  /** The list of items displayed under the input ('value, key' pairs) its completely up to you to generate this list */
  options?: Array<Option<T>>;

  /** The text passed to the input */
  value: ((name?: string) => string) | string;

  /** Name of the form element (target.name) */
  name?: string;

  /** Triggered when the text is changed, and when the search button is pressed */
  onChange: (value: Option<T>['value'], name?: string) => void;

  /** Triggered when one of the results is clicked, returns the corresponding option value */
  onClickResult?: (value: Option<T>['value']) => void;

  /**
   * Displayed when no results match the search
   * @default 'No results'
   */
  noResultLabel?: string;

  placeholder?: string;

  /** @deprecated Use loading instead */
  isLoading?: boolean;

  /** If true, the search button will display a spinner */
  loading?: boolean;

  /**
   * Size of the input. Can be small or default
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.SMALL | Size.DEFAULT;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const SearchInput = <T extends any>({ responsive, ...rest }: SearchInputProps<T>) => {
  const {
    options,
    value: _value,
    onChange,
    noResultLabel = 'No results',
    placeholder,
    isLoading,
    loading,
    name,
    style,
    onClickResult,
    size = Size.DEFAULT,
  } = useResponsiveProps<SearchInputProps<T>>(rest, responsive);
  const [isFocused, setFocused] = useState(false);
  const [canBlur, setCanBlur] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const value = isFunction(_value) ? _value(name) : _value;
  const shouldDisplayResults = value !== '' && isFocused;

  const listPanel = listRef.current?.getBoundingClientRect();
  const topRender = listPanel ? _getShouldRenderTop(listPanel) : false;

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
            leading={isLoading || loading ? <Spinner size={Size.SMALL} /> : <Icon name="search" />}
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
        size={size}
      />
      {run(() => {
        if (options == null) {
          return null;
        } else {
          return (
            <div ref={listRef} className={styles.listWrapper}>
              <div
                className={cx(styles.list, {
                  [styles.visible]: shouldDisplayResults,
                  [styles.top]: topRender,
                  [styles.topOpen]: topRender && isFocused,
                  [styles.topSmall]: topRender && size === Size.SMALL,
                  [styles.topSmallOpen]: topRender && size === Size.SMALL && isFocused,
                })}>
                {run(() => {
                  if (options.length === 0) {
                    return <div className={cx(styles.item, styles.noResult)}>{noResultLabel}</div>;
                  } else {
                    return options.map((option) => (
                      <div
                        key={option.value}
                        className={styles.item}
                        onClick={() => {
                          if (onClickResult != null) {
                            onClickResult(option.value);
                          }
                          setFocused(false);
                        }}>
                        {option.label}
                      </div>
                    ));
                  }
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
