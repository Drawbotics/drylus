import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';
import { css, cx } from 'emotion';
import Calendar from 'react-calendar/dist/entry.nostyle';

import { InputWithRef } from './Input';
import Button from '../components/Button';
import Icon from '../components/Icon';


const styles = {
  root: css`
    position: relative;
  `,
  calendarContainer: css`
    position: absolute;
    z-index: 999;
    top: 100%;
    margin-top: ${sv.marginExtraSmall};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    width: 350px;
    background: ${sv.white};
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


const DatePicker = ({
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
}) => {
  const [ isFocused, setFocused ] = useState(false);
  const [ canBlur, setCanBlur ] = useState(true);

  const inputRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => ! rootRef.current.contains(e.target) ? setFocused(false) : null;

    rootRef.current.addEventListener('mousedown', () => setCanBlur(false));
    rootRef.current.addEventListener('mouseup', () => setCanBlur(true));
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      rootRef.current.removeEventListener('mousedown', () => setCanBlur(false));
      rootRef.current.removeEventListener('mouseup', () => setCanBlur(true));
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const inputValue = value === '' ? value : _objectToDate(value).toLocaleDateString(locale, {
    ...DEFAULT_OPTIONS,
    ...displayOptions,
  });

  return (
    <div className={styles.root} ref={rootRef}>
      <InputWithRef
        suffix={
          <Button
            disabled={disabled}
            leading={<Icon name="calendar" />}
            onClick={() => inputRef.current.focus()} />
        }
        disabled={disabled}
        valid={valid}
        error={error}
        hint={hint}
        value={inputValue}
        onChange={x=>x}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => canBlur ? setFocused(false) : null}
        placeholder={placeholder} />
      <div
        className={cx(styles.calendarContainer, {
          [styles.visible]: isFocused,
        })}>
        <Calendar
          {...calendarOptions}
          maxDate={maxDate && _objectToDate(maxDate)}
          minDate={minDate && _objectToDate(minDate)}
          className={styles.calendar}
          tileClassName={styles.tile}
          locale={locale}
          activeStartDate={activeStartDate && _objectToDate(activeStartDate)}
          onChange={(v) => onChange(_dateToObject(v), name)}
          value={value === '' ? null : _objectToDate(value)} />
      </div>
    </div>
  );
};


DatePicker.propTypes = {
  /** Can be empty string, or object containing day, month, year as numbers */
  value: PropTypes.oneOfType([
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
    }),
    PropTypes.oneOf(['']),
  ]).isRequired,

  /** Triggered when the date is chosen from the calendar */
  onChange: PropTypes.func.isRequired,

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
};


DatePicker.defaultProps = {
  locale: 'en',
};


export default DatePicker;
