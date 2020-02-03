import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { useScreenSize } from '@drawbotics/use-screen-size';

import { InputWithRef } from './Input';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { styles as themeStyles } from '../base/ThemeProvider';
import { Align } from '../enums';
import { useResponsiveProps } from '../utils/hooks';


const styles = {
  root: css`
    position: relative;

    input {
      white-space: nowrap;
      min-height: 40px;
    }
  `,
  calendarContainer: css`
    position: fixed;
    z-index: 999;
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


function _objectToDate(object) {
  return new Date(object.year, object.month - 1, object.day);
}


function _dateToObject(date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function _stringToDateObject(string) {
  const [ year, month, day ] = string.split('-');
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };
}


function _objectToDateString(object) {
  return `${object.year}-${String(object.month).padStart(2, '0')}-${String(object.day).padStart(2, '0')}`;
}


function _getShouldRenderTop(box) {
  if (box?.bottom > window.innerHeight) {
    return true;
  }
  return false;
}


const DateInput = ({
  responsive,
  ...rest
}) => {
  const {
    value,
    onChange,
    locale,
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
    align,
  } = useResponsiveProps(rest, responsive);

  const [ outletElement, setOutletElement ] = useState(null);
  const [ isFocused, setFocused ] = useState(false);
  const { screenSize, ScreenSizes } = useScreenSize();

  const isDesktop = screenSize > ScreenSizes.XL;

  const inputRef = useRef(null);
  const rootRef = useRef(null);
  const pickerElement = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => ! pickerElement.current?.contains(e.target) ? setFocused(false) : null;
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
    if ( ! document.getElementById('picker-outlet')) {
      const pickerOutlet = document.createElement('div');
      pickerOutlet.id = 'picker-outlet';
      document.body.appendChild(pickerOutlet);
      setOutletElement(pickerOutlet);
    }
    else {
      setOutletElement(document.getElementById('picker-outlet'));
    }

    return () => {
      if (outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  const inputValue = value === '' ? value : (isDesktop ?_objectToDate(value).toLocaleDateString(locale, {
    ...DEFAULT_OPTIONS,
    ...displayOptions,
  }) : _objectToDateString(value));

  const pickerBox = pickerElement.current?.getBoundingClientRect();
  const rootBox = rootRef.current?.getBoundingClientRect();
  const topRender =  pickerBox ? _getShouldRenderTop(pickerBox) : false;

  const handleOnChange = (v) => {
    if (isDesktop) {
      return v;
    }
    else {
      return Boolean(v) && onChange(_stringToDateObject(v), name);
    }
  };

  return (
    <div style={style} className={styles.root} ref={rootRef}>
      <InputWithRef
        suffix={onChange != null
          ? <Button
            disabled={disabled}
            leading={<Icon name="calendar" />}
            onClick={() => inputRef.current.focus()} />
          : null
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
        type={isDesktop ? null : "date"}
        max={! isDesktop && maxDate ? _objectToDateString(maxDate) : null}
        min={! isDesktop && minDate ? _objectToDateString(minDate) : null} />
      {isDesktop && outletElement && createPortal(
        <div className={themeStyles.root}>
          <div
            style={{
              top: rootBox?.top,
              left: align === Align.LEFT
                ? rootBox?.left
                : (rootBox?.left - Math.abs(rootBox?.width - pickerBox?.width) || null),
            }}
            ref={pickerElement}
            className={cx(styles.calendarContainer, {
              [styles.visible]: isFocused,
            })}>
            <Calendar
              {...calendarOptions}
              maxDate={maxDate && _objectToDate(maxDate)}
              minDate={minDate && _objectToDate(minDate)}
              className={cx(styles.calendar, {
                [styles.topRender]: topRender,
              })}
              tileClassName={styles.tile}
              locale={locale}
              activeStartDate={activeStartDate && _objectToDate(activeStartDate)}
              onChange={onChange != null ? (v) => onChange(_dateToObject(v), name) : null}
              value={value === '' ? null : _objectToDate(value)} />
          </div>
        </div>,
        document.getElementById('picker-outlet'),
      )}
    </div>
  );
};


DateInput.propTypes = {
  /** Can be empty string, or object containing day, month, year as numbers */
  value: PropTypes.oneOfType([
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
    }),
    PropTypes.oneOf(['']),
  ]).isRequired,

  /** Triggered when the date is chosen from the calendar. If not given, the field is read-only */
  onChange: PropTypes.func,

  /** Name of the form element (target.name) */
  name: PropTypes.string,

  /** Used to render the name of months in the calendar */
  locale: PropTypes.string,

  /** Disables the datepicker */
  disabled: PropTypes.bool,

  /** Text shown when no value is active */
  placeholder: PropTypes.string,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,

  /** See toLocaleDateString documentation */
  displayOptions: PropTypes.object,

  /** See react-calendar documentation for extra options */
  calendarOptions: PropTypes.object,

  /** Follows format of value */
  maxDate: PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }),

  /** Follows format of value */
  minDate: PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }),

  /** Determines the date where the calendar should open by default. Follows format of value */
  activeStartDate: PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }),

  /** If true, a spinner is shown in the right corner, like with error and valid */
  loading: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  /** Determines on which side the picker is aligned */
  align: PropTypes.oneOf([ Align.LEFT, Align.RIGHT ]),

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
};


DateInput.defaultProps = {
  locale: 'en',
  align: Align.LEFT,
};


export default DateInput;
