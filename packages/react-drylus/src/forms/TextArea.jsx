import React, { useState, forwardRef } from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import PropTypes from 'prop-types';

import RoundIcon from '../components/RoundIcon';
import Icon from '../components/Icon';
import Spinner from '../components/Spinner';
import Sizes from '../base/Sizes';
import Categories from '../base/Categories';
import Hint from './Hint';


const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;
  `,
  outerWrapper: css`
    display: flex;
    align-items: stretch;
  `,
  innerWrapper: css`
    position: relative;
    flex: 1;
    z-index: 1;
  `,
  textarea: css`
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    border: none;
    border-radius: ${sv.defaultBorderRadius};
    appearance: button;
    outline: none !important;
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    transition: ${sv.defaultTransition};
    z-index: 1;
    width: 100%;

    &::placeholder {
      color: ${sv.colorSecondary};
    }

    &:hover {
      box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
    }

    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${sv.brand} !important;
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;
    }

    &:read-only {
      box-shadow: none !important;
      cursor: default;
    }
  `,
  valid: css`
    textarea {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
    }
  `,
  icon: css`
    pointer-events: none;
    position: absolute;
    z-index: 2;
    top: calc(${sv.marginExtraSmall} * 1.5);
    right: ${sv.marginSmall};
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
  `,
  error: css`
    textarea {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
    }
  `,
  hidden: css`
    opacity: 0;
    transform: scale(0);
  `,
};


const RawTextArea = ({
  value,
  onChange,
  error,
  valid,
  hint,
  disabled,
  inputRef,
  className,
  loading,
  style,
  ...rest,
}) => {
  const [ isFocused, setFocused ] = useState(false);

  const handleOnChange = (e) => onChange ? onChange(e.target.value, e.target.name) : null;

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.valid]: Boolean(value) && valid,
        [styles.error]: error,
        [className]: Boolean(className),
      })}>
      <div className={styles.outerWrapper}>
        <div className={styles.innerWrapper}>
          {do{
            if (loading) {
              <div className={styles.icon} data-element="icon">
                <Spinner size={Sizes.SMALL} />
              </div>
            }
            else if (! onChange) {
              <div className={styles.icon} data-element="icon" style={{ color: sv.colorSecondary }}>
                <Icon name="lock" />
              </div>
            }
            else if (error) {
              <div className={cx(styles.icon, { [styles.hidden]: isFocused })} data-element="icon">
                <RoundIcon name="x" size={Sizes.SMALL} category={Categories.DANGER} />
              </div>
            }
            else if (Boolean(value) && valid) {
              <div className={cx(styles.icon, { [styles.hidden]: isFocused })} data-element="icon">
                <RoundIcon name="check" size={Sizes.SMALL} category={Categories.SUCCESS} />
              </div>
            }
          }}
          <textarea
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleOnChange}
            readOnly={! onChange}
            className={styles.textarea}
            value={value}
            ref={inputRef}
            {...rest} />
        </div>
      </div>
      {do{
        if (error && typeof error === 'string') {
          <Hint category={Categories.DANGER}>{error}</Hint>
        }
        else if (hint) {
          <Hint>{hint}</Hint>
        }
      }}
    </div>
  );
};


export const TextAreaWithRef = forwardRef((props, ref) => {
  return <RawTextArea {...props} inputRef={ref} />
});

TextAreaWithRef.displayName = 'Input';


const TextArea = (props) => {
  return <RawTextArea {...props} />;
};


TextArea.propTypes = {
  /** Value displayed in the field */
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,

  /** Name of the form element (target.name) */
  name: PropTypes.string,

  /** Disables the input */
  disabled: PropTypes.bool,

  /** Text shown when no value is active */
  placeholder: PropTypes.string,

  /** Triggered when the value is changed (typing). If not given, the field is read-only */
  onChange: PropTypes.func,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,

  /** Additional class name to override styles */
  className: PropTypes.string,

  /** If true, a spinner is shown on the right top corner, like with error and valid */
  loading: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,
};


export default TextArea;
