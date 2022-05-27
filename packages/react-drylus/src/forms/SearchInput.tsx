import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Button, Icon, Spinner } from '../components';
import { Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { getIconContent, isFunction, run, useResponsiveProps } from '../utils';
import { InputWithRef } from './Input';

const defaultHeight = sv.marginExtraLarge;
const smallHeight = sv.marginLarge;

const styles = {
  root: css`
    position: relative;
  `,
  listWrapper: css`
    position: absolute;
    z-index: 1;
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
    max-height: 210px;
    overflow: auto;
  `,
  top: css`
    transform: translateY(calc(-100% - 20px - ${defaultHeight}));
  `,
  topOpen: css`
    transform: translateY(calc(-100% - 15px - ${defaultHeight}));
  `,
  topSmall: css`
    transform: translateY(calc(-100% - 20px - ${smallHeight}));
  `,
  topSmallOpen: css`
    transform: translateY(calc(-100% - 15px - ${smallHeight}));
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
  minimal: css`
    input {
      padding-left: ${sv.paddingExtraLarge};
      background: transparent;
      border-bottom-left-radius: ${sv.defaultBorderRadius};
      border-top-left-radius: ${sv.defaultBorderRadius};
    }

    > [data-element='input-root'] > div > {
      position: relative;

      &::after {
        position: absolute;
        content: ${getIconContent('search')};
        font-family: 'drycons';
        top: 50%;
        transform: translateY(-50%);
        left: ${sv.paddingSmall};
        color: ${sv.colorSecondary};
        font-size: 1.3em;
      }
    }
  `,
  smallMinimal: css`
    input {
      padding-left: ${sv.paddingLarge} !important;
    }

    > [data-element='input-root'] > div > {
      &::after {
        left: ${sv.paddingExtraSmall};
        font-size: 1em;
      }
    }
  `,
  loading: css`
    > [data-element='input-root'] > div > {
      &::after {
        content: none;
      }
    }
  `,
  spinner: css`
    position: absolute;
    top: calc(${sv.marginExtraSmall} + 4px);
    left: calc(${sv.marginExtraSmall} + 4px);
  `,
};

function _getShouldRenderTop(box: DOMRect) {
  if (box?.bottom > window.innerHeight) {
    return true;
  }
  return false;
}

export interface SearchInputProps<T, K = string> {
  /** The list of items displayed under the input ('value, key' pairs) its completely up to you to generate this list */
  options?: Array<Option<T>>;

  /** The text passed to the input */
  value: ((name?: K) => string) | string;

  /** Name of the form element (target.name) */
  name?: K;

  /** Triggered when the text is changed, and when the search button is pressed */
  onChange: (value: Option<T>['value'], name?: K) => void;

  /** Triggered when one of the results is clicked, returns the corresponding option value */
  onClickResult?: (value: Option<T>['value']) => void;

  /**
   * Displayed when no results match the search
   * @default 'No results'
   */
  noResultLabel?: string;

  placeholder?: string;

  /** If true, the search button will display a spinner */
  loading?: boolean;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Used to trigger validation after an user switches inputs */
  validate?: (name?: K) => void;

  /** Error text (or function that returns an error text) to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string | string[] | ((name?: K) => string | string[] | undefined);

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** If true, the input will blend more with its surroundings. This variant should be used when the search is not within a form */
  minimal?: boolean;

  /**
   * Size of the input. Can be small or default
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.SMALL | Size.DEFAULT;

  /** If true, the results list is shown even if no value is provided. Still, it shows only when the input is in focus */
  alwaysShowResults?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const SearchInput = <T extends any, K extends string>({
  responsive,
  ...rest
}: SearchInputProps<T, K>) => {
  const {
    options,
    value: _value,
    onChange,
    noResultLabel = 'No results',
    placeholder,
    loading,
    name,
    style,
    onClickResult,
    hint,
    error: _error,
    validate,
    valid,
    size = Size.DEFAULT,
    minimal,
    alwaysShowResults,
    className,
    ...props
  } = useResponsiveProps<SearchInputProps<T, K>>(rest, responsive);
  const error = isFunction(_error) ? _error(name) : _error;
  const [isFocused, setFocused] = useState(false);
  const [canBlur, setCanBlur] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const value = isFunction(_value) ? _value(name) : _value;
  const shouldDisplayResults = (alwaysShowResults || value !== '') && isFocused;
  const isLoading = loading === true;

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
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles.minimal]: minimal === true,
          [styles.smallMinimal]: minimal === true && size === Size.SMALL,
          [styles.loading]: isLoading,
        },
        className,
      )}
      ref={rootRef}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner size={Size.SMALL} />
        </div>
      ) : null}
      <InputWithRef
        leading={
          minimal ? null : (
            <Button
              tabIndex={-1}
              leading={isLoading ? <Spinner size={Size.SMALL} /> : <Icon name="search" />}
              onClick={() => inputRef.current?.focus()}
            />
          )
        }
        error={error}
        validate={validate}
        hint={hint}
        valid={valid}
        value={value}
        onChange={onChange}
        name={name}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => (canBlur ? setFocused(false) : null)}
        placeholder={placeholder}
        size={size}
        {...props}
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
                        key={option.value as string}
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
