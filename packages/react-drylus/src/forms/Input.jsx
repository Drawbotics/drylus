import React, { useRef, useState } from 'react';
import { css, cx } from 'emotion';
import sv, { fade } from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import RoundIcon from '../components/RoundIcon';
import Sizes from '../base/Sizes';
import Categories from '../base/Categories';
import Hint from './Hint';
import { useEventListener } from '../utils/hooks';


const styles = {
  base: css`
    display: inline-block;
    position: relative;
    width: 100%;
  `,
  inputWrapper: css`
    display: flex;
    align-items: center;
  `,
  withIcon: css`
    position: relative;
    flex: 1;
  `,
  input: css`
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    border: none;
    border-radius: ${sv.defaultBorderRadius};
    appearance: button;
    width: 100%;
    outline: none !important;
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    transition: ${sv.defaultTransition};
    z-index: 1;

    &::placeholder {
      color: ${sv.colorSecondary};
    }

    &:hover {
      box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
    }

    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${sv.brand} !important;
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
  withValue: css`
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
  suffix: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  `,
};


const Input = ({
  value,
  onChange=x=>x,
  error,
  hint,
  prefix,
  suffix,
  ...rest,
}) => {
  const inputElement = useRef(null);
  const [isFocused, setFocused] = useState(false);
  const handleOnEvent = () => inputElement.current === document.activeElement ? setFocused(true) : setFocused(false);
  const handleOnChange = (e) => onChange(e.target.value, e.target.name);
  useEventListener('click', handleOnEvent);
  useEventListener('keydown', handleOnEvent);
  return (
    <div className={cx(styles.base, {
      [styles.withValue]: !! value,
      [styles.error]: error,
    })}>
      <div className={styles.inputWrapper}>
        {do{
          if (prefix) {
            <div className={cx(styles.fix, styles.prefix)}>
              {prefix}
            </div>
          }
        }}
        <div className={styles.withIcon}>
          {do{
            if (error) {
              <div className={cx(styles.icon, { [styles.hidden]: isFocused })} data-element="icon">
                <RoundIcon name="x" size={Sizes.SMALL} category={Categories.DANGER} />
              </div>
            }
            else if (value) {
              <div className={cx(styles.icon, { [styles.hidden]: isFocused })} data-element="icon">
                <RoundIcon name="check" size={Sizes.SMALL} category={Categories.SUCCESS} />
              </div>
            }
          }}
          <input
            ref={inputElement}
            onChange={handleOnChange}
            className={cx(styles.input, {
              [styles.straightLeft]: prefix,
              [styles.straightRight]: suffix,
            })}
            value={value}
            {...rest} />
        </div>
        {do{
          if (suffix) {
            <div className={cx(styles.fix, styles.suffix)}>
              {suffix}
            </div>
          }
        }}
      </div>
      {do{
        if (error) {
          <Hint error>{error}</Hint>
        }
        else if (hint) {
          <Hint>{hint}</Hint>
        }
      }}
    </div>
  );
};


Input.propTypes = {
  /** Value displayed in the field */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Disables the select */
  disabled: PropTypes.bool,

  /** Text shown when no value is active */
  placeholder: PropTypes.string,

  /** Triggered when the value is changed (typing) */
  onChange: PropTypes.func,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act */
  error: PropTypes.string,

  /** Node to be rendered in front of the input field, for not limited to text, button and select */
  prefix: PropTypes.string,

  /** Node to be rendered at the end of the input field, for not limited to text, button and select */
  suffix: PropTypes.string,
};


export default Input;
