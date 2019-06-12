import React, { useState, forwardRef } from 'react';
import { css, cx } from 'emotion';
import sv, { fade } from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import RoundIcon from '../components/RoundIcon';
import Button from '../components/Button';
import Select from './Select';
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
  input: css`
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
  `,
  straightLeft: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `,
  straightRight: css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `,
  valid: css`
    input {
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
    input {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
    }
  `,
  hidden: css`
    opacity: 0;
    transform: scale(0);
  `,
  fix: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${fade(sv.azure, 30)};
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    border-radius: ${sv.defaultBorderRadius};
    padding: calc(${sv.paddingExtraSmall} * 1.5);
    color: ${sv.colorPrimary};
  `,
  prefix: css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: -1px;
  `,
  prefixComponent: css`
    padding: 0;

    select, button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: ${sv.defaultBorderRadius};
      border-bottom-left-radius: ${sv.defaultBorderRadius};
    }
    select {
      background-color: transparent;
    }
  `,
  suffix: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  `,
  suffixComponent: css`
    padding: 0;

    select, button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    select {
      background-color: transparent;
    }
  `,
  transparentButton: css`
    button {
      background-color: transparent;
    }
  `,
};


const Input = ({
  value,
  onChange,
  error,
  valid,
  hint,
  prefix,
  suffix,
  disabled,
  inputRef,
  ...rest,
}) => {
  const [ isFocused, setFocused ] = useState(false);

  const handleOnChange = (e) => onChange ? onChange(e.target.value, e.target.name) : null;

  const isPrefixComponent = prefix?.type === Button || prefix?.type === Select;
  const isSuffixComponent = suffix?.type === Button || suffix?.type === Select;
  return (
    <div className={cx(styles.root, {
      [styles.valid]: Boolean(value) && valid,
      [styles.error]: error,
    })}>
      <div className={styles.outerWrapper}>
        {do{
          if (prefix) {
            <div
              data-element="prefix"
              className={cx(styles.fix, styles.prefix, {
                [styles.prefixComponent]: isPrefixComponent,
                [styles.transparentButton]: ! prefix?.props?.category,
              })}>
              {prefix}
            </div>
          }
        }}
        <div className={styles.innerWrapper}>
          {do{
            if (error) {
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
          <input
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleOnChange}
            className={cx(styles.input, {
              [styles.straightLeft]: prefix,
              [styles.straightRight]: suffix,
            })}
            value={value}
            ref={inputRef}
            {...rest} />
        </div>
        {do{
          if (suffix) {
            <div
              data-element="suffix"
              className={cx(styles.fix, styles.suffix, {
                [styles.suffixComponent]: isSuffixComponent,
                [styles.transparentButton]: ! suffix?.props?.category,
              })}>
              {suffix}
            </div>
          }
        }}
      </div>
      {do{
        if (error && typeof error === 'string') {
          <Hint error>{error}</Hint>
        }
        else if (hint) {
          <Hint>{hint}</Hint>
        }
      }}
    </div>
  );
};


export const InputWithRef = forwardRef((props, ref) => {
  return <Input {...props} inputRef={ref} />
});


InputWithRef.displayName = 'Input';


Input.propTypes = {
  /** Value displayed in the field */
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,

  /** Disables the input */
  disabled: PropTypes.bool,

  /** Text shown when no value is active */
  placeholder: PropTypes.string,

  /** Triggered when the value is changed (typing) */
  onChange: PropTypes.func.isRequired,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,

  /** Node to be rendered in front of the input field, for now limited to text, Button and Select */
  prefix: PropTypes.node,

  /** Node to be rendered at the end of the input field, for now limited to text, Button and Select */
  suffix: PropTypes.node,
};


export default Input;
