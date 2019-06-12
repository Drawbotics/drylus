import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';
import { css, cx } from 'emotion';
import Calendar from 'react-calendar';

import { InputWithRef } from './Input';
import Button from '../components/Button';
import Icon from '../components/Icon';


const styles = {
  root: css`
    position: relative;
  `,
  calendar: css`
    position: absolute;
    z-index: 999;
    top: 100%;
    margin-top: ${sv.marginExtraSmall};
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
};


const DatePicker = ({
  value,
  onChange,
  locale,
  disabled,
  placeholder,
}) => {
  const [ isFocused, setFocused ] = useState(false);
  const inputRef = useRef(null);

  return (
    <div className={styles.root}>
      <InputWithRef
        suffix={
          <Button
            leading={<Icon name="calendar" />}
            onClick={() => inputRef.current.focus()} />
        }
        onChange={x=>x}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder} />
      <div
        className={cx(styles.calendar, {
          [styles.visible]: isFocused,
        })}>
        <Calendar
          onChange={onChange}
          value={value} />
      </div>
    </div>
  );
};


DatePicker.propTypes = {
  /** Should be given in a UTC format */
  value: PropTypes.instanceOf(Date),

  /** Triggered when the date is chosen from the calendar */
  onChange: PropTypes.func.isRequired,

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
};


DatePicker.defaultProps = {
  locale: 'en',
};


export default DatePicker;
