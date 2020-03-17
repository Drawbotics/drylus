import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Size } from '../enums';
import { Option, Style } from '../types';
import { run } from '../utils';
import { Badge } from './Badge';
import { Spinner } from './Spinner';

const styles = {
  root: css`
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

    & > a {
      display: flex;
      text-decoration: none;
    }
  `,
  vertical: css`
    flex-direction: column;
    align-items: stretch;

    &::after {
      content: none;
    }

    & > div,
    > a > div {
      flex: 1;
      justify-content: space-between;
      color: ${sv.colorPrimary};
      border-bottom: 1px solid ${sv.neutralLight};

      &::after {
        top: 0;
        height: 100%;
        width: 0px;
      }
    }

    & > div:last-of-type {
      border-bottom: none;
    }

    & > a:last-of-type {
      > div {
        border-bottom: none;
      }
    }
  `,
  item: css`
    display: flex;
    align-items: center;
    padding: ${sv.defaultPadding} ${sv.paddingExtraLarge};
    color: ${sv.colorSecondary};
    transition: ${sv.transitionShort};
    position: relative;

    &:hover {
      cursor: pointer;
      color: ${sv.colorPrimary};
      background: ${fade(sv.neutralLight, 50)};
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
      transition: ${sv.transitionShort};
    }
  `,
  active: css`
    color: ${sv.colorPrimary};

    &::after {
      height: 3px;
    }
  `,
  verticalActive: css`
    background: ${sv.neutralLight} !important;

    &::after {
      width: 4px !important;
    }
  `,
  disabled: css`
    color: ${sv.colorDisabled} !important;

    &:hover {
      cursor: not-allowed;
      background: none;
    }

    & > [data-element='trailing'] {
      opacity: 0.5;
    }
  `,
  trailing: css`
    display: inline-block;
    margin-left: ${sv.marginExtraSmall};
  `,
};

interface TabNavigationOption extends Option {
  /** Shows a small number beside the tab */
  bullet?: number;

  /** If true, the tab is not clickable */
  disabled?: boolean;

  /** If true, a spinner is shown beside the title */
  loading?: boolean;
}

interface TabNavigationProps {
  /** Determines the tabs which will be rendered */
  options: Array<TabNavigationOption>;

  /**
   * Used to pick each value in the options array
   * @default 'value'
   */
  valueKey?: string;

  /**
   * Used to pick each label in the options array
   * @default 'label'
   */
  labelKey?: string;

  /** Determines which value is currently active */
  value?: string | number;

  /** Triggered when a control is clicked */
  onChange?: (value: string | number) => void;

  /**
   * If true, the tabs are rendered in a vertical fashion, by default they take the full width of the container
   * @default false
   */
  vertical?: boolean;

  /** If set, the rendered options will be wrapped in the component, which will be given the value as href */
  linkComponent?: React.ReactNode;

  /** Used for style overrides */
  style?: Style;
}

export const TabNavigation = ({
  value,
  onChange,
  options,
  valueKey = 'value',
  labelKey = 'label',
  vertical = false,
  linkComponent: Link,
  style,
}: TabNavigationProps) => {
  const renderOption = (option: TabNavigationOption) => (
    <div
      style={style}
      key={String(option[valueKey as keyof TabNavigationOption])}
      className={cx(styles.item, {
        [styles.active]: value === option[valueKey as keyof TabNavigationOption],
        [styles.verticalActive]:
          vertical && value === option[valueKey as keyof TabNavigationOption],
        [styles.disabled]: option.disabled,
      })}
      onClick={
        !option.disabled && onChange != null
          ? () => onChange(option[valueKey as keyof TabNavigationOption] as string | number)
          : undefined
      }>
      {option[labelKey as keyof TabNavigationOption]}
      {run(() => {
        if (option.loading) {
          return (
            <div className={styles.trailing} data-element="trailing">
              <Spinner category={vertical ? undefined : Category.BRAND} size={Size.SMALL} />
            </div>
          );
        } else if (option.bullet != null) {
          return (
            <div data-element="trailing" className={styles.trailing}>
              {run(() => {
                if (vertical) {
                  return option.bullet;
                } else {
                  return (
                    <Badge category={Category.BRAND} value={option.bullet as number} max={99} />
                  );
                }
              })}
            </div>
          );
        }
      })}
    </div>
  );
  return (
    <div
      className={cx(styles.root, {
        [styles.vertical]: vertical,
      })}>
      {options.map((option) =>
        Link != null
          ? React.createElement(
              Link as React.ComponentClass<{ href?: string }>,
              {
                href: option.disabled
                  ? undefined
                  : String(option[valueKey as keyof TabNavigationOption]),
                key: String(option[valueKey as keyof TabNavigationOption]),
              },
              renderOption(option),
            )
          : renderOption(option),
      )}
    </div>
  );
};
