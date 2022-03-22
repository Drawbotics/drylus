import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { ReactNode } from 'react';
import Select, {
  ActionMeta,
  GroupBase,
  IndicatorsContainerProps,
  MultiValue,
  components,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Icon, RoundIcon, Spinner } from '../components';
import { Category, Color, Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { ERROR_MESSAGES_JOIN_STRING, isFunction, run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

const styles = {
  select: css`
    .drylus-multiselect__control {
      background-color: ${sv.azureLight};
      color: ${sv.colorPrimary};
      border: none;
      border-radius: ${sv.defaultBorderRadius};
      width: 100%;
      outline: none !important;
      box-shadow: inset 0px 0px 0px 1px ${sv.azure};
      transition: ${sv.transitionShort};
      letter-spacing: normal;

      padding-left: ${sv.paddingExtraSmall};
      padding-right: ${sv.paddingExtraSmall};

      &:hover {
        box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
      }
    }

    .drylus-multiselect__placeholder {
      color: ${sv.colorSecondary};
    }

    .drylus-multiselect__indicator-separator {
      display: none;
    }
    .drylus-multiselect__indicator {
      color: ${sv.colorPrimary};
    }
    .drylus-multiselect__option {
      color: ${sv.colorPrimary};

      &:hover {
        cursor: pointer;
        background-color: ${sv.neutralLighter};
      }
    }
    .drylus-multiselect__option--is-focused {
      background-color: ${sv.neutralLighter};
    }

    &:not(.drylus-multiselect--is-disabled) {
      .drylus-multiselect__multi-value {
        color: ${sv.white};
        background: ${sv.neutralDarker};
        cursor: pointer;
      }
      .drylus-multiselect__multi-value__label {
        color: inherit;
      }
    }
  `,
  valid: css`
    .drylus-multiselect__control {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
    }
  `,
  error: css`
    .drylus-multiselect__control {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
    }
  `,
  icon: css`
    pointer-events: none;
  `,
  disabled: css`
    .drylus-multiselect__control {
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;
      pointer-events: none;
      opacity: 0.6;
    }

    .drylus-multiselect__indicator {
      color: ${sv.colorDisabled};
    }
  `,
};

export interface MultiSelectOption<T> extends Option<T> {
  disabled?: boolean;
}

export interface MultiSelectProps<T, K = string> {
  /** The options to show in the list of options, note that label and value may differ depending on valueKey and labelKey */
  options: Array<MultiSelectOption<T>>;

  /** Determines which values are currently active */
  values:
    | ((name?: K) => Array<MultiSelectOption<T>['value']>)
    | Array<MultiSelectOption<T>['value']>;

  /** When using `allowTyping`, pass the function to modify the `options` array prop. Returns the new array of `options` on add/remove */
  onChangeOptions?: (value: Array<MultiSelectOption<T | string>>, name?: K) => void;

  /** Used in conjunction with `onChangeOptions`. Gets the label for the "create new ..." option in the menu. */
  formatCreateLabel?: (inputValue: string) => ReactNode;

  /** Name of the form element (target.name) */
  name?: K;

  /** Disables the multi select */
  disabled?: boolean;

  /**
   * Text shown when no value is selected
   * @default ' -- '
   */
  placeholder?: string;

  /** Triggered when a new value is chosen, returns the array of selected values. If not given, the field is read-only */
  onChange?: (value: Array<MultiSelectOption<T>['value']>, name?: K) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Used to trigger validation after an user switches inputs */
  validate?: (name?: K) => void;

  /** Error text (or function that returns an error text) to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string[] | string | ((name?: K) => string | string[] | undefined);

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** If true, a spinner is shown on the right corner, like with error and valid */
  loading?: boolean;

  /** If true the select is focused automatically on mount */
  autoFocus?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const MultiSelect = <T extends any, K extends string>({
  responsive,
  ...rest
}: MultiSelectProps<T, K>) => {
  const props = useResponsiveProps<MultiSelectProps<T, K>>(rest, responsive);

  const error = isFunction(props.error) ? props.error(props.name) : props.error;
  const values = isFunction(props.values) ? props.values(props.name) : props.values;

  const baseProps = {
    isMulti: true,
    options: props.options,
    isOptionDisabled: (option: MultiSelectOption<T>) => !!option.disabled,
    isDisabled: props.disabled,
    isSearchable: true,
    isClearable: false,
    defaultValue: null,
    value: props.options.filter((o) => {
      return values.includes(o.value);
    }),
    onChange: (
      options: MultiValue<MultiSelectOption<T>>,
      action: ActionMeta<MultiSelectOption<T>>,
    ) => {
      if (props.onChangeOptions && action.action === 'create-option') {
        props.onChangeOptions([...props.options, action.option]);
      }

      if (props.onChange) {
        props.onChange(
          options.map((o) => o.value),
          props.name,
        );
      }
    },
    autoFocus: props.autoFocus,
    placeholder: props.placeholder,
    classNamePrefix: 'drylus-multiselect',
    className: cx(styles.select, {
      [styles.disabled]: props.disabled,
      [styles.valid]: values?.length > 0 && props.valid === true,
      [styles.error]: error != null && error !== false,
    }),
    components: {
      IndicatorsContainer: (
        indicatorContainerProps: React.PropsWithChildren<
          IndicatorsContainerProps<MultiSelectOption<T>, true, GroupBase<MultiSelectOption<T>>>
        >,
      ) => {
        return (
          <>
            {run(() => {
              if (props.loading) {
                return (
                  <div className={styles.icon} data-element="icon">
                    <Spinner size={Size.SMALL} />
                  </div>
                );
              } else if (props.onChange == null) {
                return (
                  <div
                    className={styles.icon}
                    data-element="lock-icon"
                    style={{ color: sv.colorSecondary }}>
                    <Icon name="lock" />
                  </div>
                );
              } else if (error) {
                return (
                  <div className={styles.icon} data-element="icon">
                    <RoundIcon inversed name="x" size={Size.SMALL} color={Color.RED} />
                  </div>
                );
              } else if (values?.length > 0 && props.valid) {
                return (
                  <div className={styles.icon} data-element="icon">
                    <RoundIcon inversed name="check" size={Size.SMALL} color={Color.GREEN} />
                  </div>
                );
              }
            })}
            <components.IndicatorsContainer {...indicatorContainerProps} />
          </>
        );
      },
    },
  } as const;

  return (
    <div style={props.style} className={props.className}>
      {props.onChangeOptions ? (
        <CreatableSelect<MultiSelectOption<T>, true>
          {...baseProps}
          formatCreateLabel={
            props.onChangeOptions
              ? props.formatCreateLabel ?? ((inputValue) => `+ ${inputValue}`)
              : undefined
          }
        />
      ) : (
        <Select<MultiSelectOption<T>, true> {...baseProps} />
      )}
      {run(() => {
        if (error && typeof error === 'string') {
          return <Hint category={Category.DANGER}>{error}</Hint>;
        } else if (error && Array.isArray(error)) {
          return <Hint category={Category.DANGER}>{error.join(ERROR_MESSAGES_JOIN_STRING)}</Hint>;
        } else if (props.hint) {
          return <Hint>{props.hint}</Hint>;
        }
      })}
    </div>
  );
};
