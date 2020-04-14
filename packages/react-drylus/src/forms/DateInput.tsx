import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';
import { CalendarProps } from 'react-calendar';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { createPortal } from 'react-dom';

import { themeStyles } from '../base';
import { Button, Icon } from '../components';
import { Align, Size } from '../enums';
import { Responsive, Style } from '../types';
import { isFunction, useResponsiveProps } from '../utils';
import { InputWithRef } from './Input';

const styles = {
  root: css`
    position: relative;

    input {
      white-space: nowrap;
    }
  `,
  calendarContainer: css`
    position: fixed;
    z-index: 99999;
    margin-top: calc(${sv.marginLarge} + ${sv.marginSmall});
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    width: 350px;
  `,
  visible: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  calendar: css`
    padding: ${sv.paddingSmall};
    border-radius: ${sv.defaultBorderRadius};
    box-shadow: ${sv.elevation2};
    background: ${sv.white};

    & > .react-calendar__navigation {
      margin-bottom: ${sv.marginExtraSmall};

      & button {
        color: ${sv.colorPrimary};

        &:disabled {
          cursor: not-allowed !important;
          background: ${sv.neutralLighter} !important;
          color: ${sv.colorDisabled} !important;
        }
      }

      > button.react-calendar__navigation__arrow {
        outline: none;
        border: none;
        height: ${sv.marginLarge};
        width: ${sv.marginLarge};
        border-radius: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${sv.neutralLight};
        line-height: ${sv.marginLarge};

        &:focus {
          border: none;
        }

        &:hover {
          cursor: pointer;
          background: ${sv.neutral};
        }

        &.react-calendar__navigation__next-button {
          margin-right: 5px;
        }

        &.react-calendar__navigation__prev-button {
          margin-left: 5px;
        }
      }

      > .react-calendar__navigation__label {
        pointer-events: none;
        appearance: none;
        border: none;
        background: none;
      }
    }

    & .react-calendar__month-view__weekdays {
      font-size: 0.9rem;
      color: ${sv.colorSecondary};
      text-align: center;
      margin-bottom: ${sv.marginExtraSmall};

      & abbr {
        text-decoration: none;
      }
    }
  `,
  tile: css`
    border: none;
    color: ${sv.colorPrimary};

    &:focus {
      outline: none;
    }

    & > abbr {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1000px;
      height: calc(${sv.defaultMargin} + 4px);
      width: calc(${sv.defaultMargin} + 4px);
      font-size: 0.95rem;

      &:hover {
        cursor: pointer;
        background: ${sv.neutralLight};
      }
    }

    &.react-calendar__tile {
      background: none;
    }

    &.react-calendar__tile--active {
      & > abbr {
        background: ${sv.brand} !important;
        color: ${sv.white} !important;
      }
    }

    &:disabled > abbr {
      cursor: not-allowed !important;
      background: transparent !important;
      color: ${sv.colorDisabled} !important;
    }

    &.react-calendar__month-view__days__day--neighboringMonth {
      color: ${sv.colorSecondary};
    }
  `,
  topRender: css`
    transform: translateY(calc(-100% - ${sv.marginLarge} - ${sv.defaultMargin}));
  `,
};

const DEFAULT_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export interface DateObject {
  day: number;
  month: number;
  year: number;
}

export function objectToDate(object: DateObject) {
  return new Date(object.year, object.month - 1, object.day);
}

export function dateToObject(date: Date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function _stringToDateObject(string: string) {
  const [year, month, day] = string.split('-');
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };
}

function objectToDateString(object: DateObject) {
  return `${object.year}-${String(object.month).padStart(2, '0')}-${String(object.day).padStart(
    2,
    '0',
  )}`;
}

function _getShouldRenderTop(box: DOMRect) {
  if (box?.bottom > window.innerHeight) {
    return true;
  }
  return false;
}

export interface DateInputProps {
  /** Can be empty string, or object containing day, month, year as numbers */
  value: ((name?: string) => DateObject | '') | DateObject | '';

  /** Triggered when the date is chosen from the calendar. If not given, the field is read-only */
  onChange?: (value: DateObject, name?: string) => void;

  /** Name of the form element (target.name) */
  name?: string;

  /**
   * Used to render the name of months in the calendar
   * @default 'en'
   */
  locale?: string;

  /** Disables the datepicker */
  disabled?: boolean;

  /** Text shown when no value is active */
  placeholder?: boolean;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | boolean;

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** See toLocaleDateString documentation */
  displayOptions?: Intl.DateTimeFormatOptions;

  /** See react-calendar documentation for extra options */
  calendarOptions?: CalendarProps;

  /** Follows format of value */
  maxDate?: DateObject;

  /** Follows format of value */
  minDate?: DateObject;

  /** Determines the date where the calendar should open by default. Follows format of value */
  activeStartDate?: DateObject;

  /** If true, a spinner is shown in the right corner, like with error and valid */
  loading?: boolean;

  /**
   * Determines on which side the picker is aligned
   * @default Align.LEFT
   */
  align?: Align.LEFT | Align.RIGHT;

  /**
   * Size of the input. Can be small or default
   * @default Size.DEFAULT
   */
  size?: Size.SMALL | Size.DEFAULT;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const DateInput = ({ responsive, ...rest }: DateInputProps) => {
  const {
    value: _value,
    onChange,
    locale = 'en',
    disabled,
    placeholder,
    displayOptions,
    valid,
    hint,
    error,
    name,
    maxDate,
    minDate,
    calendarOptions,
    activeStartDate,
    loading,
    style,
    align = Align.LEFT,
    size = Size.DEFAULT,
  } = useResponsiveProps<DateInputProps>(rest, responsive);

  const [outletElement, setOutletElement] = useState<HTMLElement>();
  const [isFocused, setFocused] = useState(false);
  const { screenSize, ScreenSizes } = useScreenSize();

  const isDesktop = screenSize > ScreenSizes.XL;

  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pickerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: Event) =>
      !pickerElement.current?.contains(e.target as Node) ? setFocused(false) : null;
    const handleWindowScroll = () => {
      if (isDesktop) {
        setFocused(false);
        inputRef?.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    window.addEventListener('scroll', handleWindowScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  useEffect(() => {
    const outlet = document.getElementById('picker-outlet');
    if (outlet == null) {
      const pickerOutlet = document.createElement('div');
      pickerOutlet.id = 'picker-outlet';
      document.body.appendChild(pickerOutlet);
      setOutletElement(pickerOutlet);
    } else {
      setOutletElement(outlet);
    }

    return () => {
      if (outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  const value = isFunction(_value) ? _value(name) : _value;
  const inputValue =
    value === ''
      ? value
      : isDesktop
      ? objectToDate(value).toLocaleDateString(locale, {
          ...DEFAULT_OPTIONS,
          ...displayOptions,
        })
      : objectToDateString(value);

  const pickerBox = pickerElement.current?.getBoundingClientRect();
  const rootBox = rootRef.current?.getBoundingClientRect();
  const topRender = pickerBox ? _getShouldRenderTop(pickerBox) : false;

  const handleOnChange = (v: string) => {
    if (isDesktop) {
      return v;
    } else if (onChange && Boolean(v)) {
      return onChange(_stringToDateObject(v), name);
    }
  };

  return (
    <div style={style} className={styles.root} ref={rootRef}>
      <InputWithRef
        suffix={
          onChange != null ? (
            <Button
              disabled={disabled}
              leading={<Icon name="calendar" />}
              onClick={() => inputRef.current?.focus()}
            />
          ) : null
        }
        disabled={disabled}
        valid={valid}
        error={error}
        hint={hint}
        loading={loading}
        value={inputValue}
        onChange={onChange != null ? handleOnChange : null}
        ref={inputRef}
        onFocus={onChange != null ? () => setFocused(true) : null}
        placeholder={placeholder}
        type={isDesktop ? null : 'date'}
        max={!isDesktop && maxDate ? objectToDateString(maxDate) : null}
        min={!isDesktop && minDate ? objectToDateString(minDate) : null}
        size={size}
      />
      {isDesktop &&
        outletElement &&
        createPortal(
          <div className={themeStyles.root}>
            <div
              style={{
                top: rootBox?.top,
                left:
                  align === Align.LEFT
                    ? rootBox?.left
                    : (rootBox?.left ?? 0) -
                        Math.abs((rootBox?.width ?? 0) - (pickerBox?.width ?? 0)) ?? undefined,
              }}
              ref={pickerElement}
              className={cx(styles.calendarContainer, {
                [styles.visible]: isFocused,
              })}>
              <Calendar
                {...calendarOptions}
                maxDate={maxDate && objectToDate(maxDate)}
                minDate={minDate && objectToDate(minDate)}
                className={cx(styles.calendar, {
                  [styles.topRender]: topRender,
                })}
                tileClassName={styles.tile}
                locale={locale}
                activeStartDate={activeStartDate && objectToDate(activeStartDate)}
                onChange={
                  onChange != null ? (v) => onChange(dateToObject(v as Date), name) : undefined
                }
                value={value === '' ? undefined : objectToDate(value)}
              />
            </div>
          </div>,
          document.getElementById('picker-outlet') as Element,
        )}
    </div>
  );
};
