import React from 'react';
import v4 from 'uuid/v4';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import PropTypes from 'prop-types';

import Hint from './Hint';
import Icon from '../components/Icon';
import { styles as placeholderStyles } from '../components/LoadingPlaceholder';
import { Size, Category } from '../enums';
import { getEnumAsClass } from '../utils';
import { useResponsiveProps } from '../utils/hooks';


const styles = {
  root: css`
    position: relative;
    display: inline-block;
  `,
  wrapper: css`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    &:hover {
      [data-element="sprite"] {
        background: ${sv.neutralDark};
      }
    }
  `,
  readOnly: css`
    pointer-events: none;

    [data-element="sprite"] {
      background: ${sv.neutralLight} !important;
    }

    [data-element="locked-icon"] {
      transform: scale(1);
      border-radius: 0;
      background: none;
      color: ${sv.colorSecondary};
    }
  `,
  disabled: css`
    cursor: not-allowed !important;

    > label {
      cursor: not-allowed !important;
      color: ${sv.colorDisabled};
    }
  `,
  error: css`
    [data-element="sprite"] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red};
    }

    [data-element="icon"] {
      background: ${sv.red};
    }
  `,
  checkbox: css`
    height: calc(${sv.defaultMargin} - 4px);
    width: calc(${sv.defaultMargin} - 4px);
    position: relative;
    overflow: hidden;
  `,
  input: css`
    visibility: hidden;

    &:checked + [data-element="sprite"] {
      [data-element="icon"] {
        transform: scale(1);
        border-radius: 0;
      }
      [data-element='locked-icon'] {
        background: ${sv.green};
        color: ${sv.colorPrimaryInverse};
      }
    }

    &:disabled + [data-element="sprite"] {
      cursor: not-allowed;
      background: ${sv.neutralLight} !important;

      [data-element="icon"] {
        opacity: 0.7;
      }
    }
  `,
  label: css`
    margin-left: ${sv.marginExtraSmall};
    color: ${sv.colorPrimary};
    position: relative;
    top: 1px;

    &:hover {
      cursor: pointer;
    }
  `,
  sprite: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: ${sv.defaultBorderRadius};
    background: ${sv.neutral};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: ${sv.transitionShort};
    overflow: hidden;
  `,
  iconLabel: css`
    cursor: inherit;
    color: ${sv.white};
    height: 100%;
    width: 100%;
    background: ${sv.green};
    line-height: ${sv.defaultMargin};
    transform: scale(0);
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
    border-radius: 100px;

    > i {
      font-size: 0.8rem;
    }
  `,
  large: css`
    > div {
      height: ${sv.marginLarge};
      width: ${sv.marginLarge};
    }

    [data-element="label"] {
      font-size: 1.1rem;
      margin-left: ${sv.marginSmall};
      top: 0;
    }

    [data-element="icon"], [data-element="locked-icon"] {
      line-height: calc(${sv.marginLarge} + 5px);

       > i {
         font-size: 1.2rem !important;
       }
    }
  `,
};



const Checkbox = ({
  responsive,
  ...rest
}) => {
  const {
    onChange,
    value,
    id,
    children,
    disabled,
    error,
    size,
    style,
    isPlaceholder,
    ...props
  } = useResponsiveProps(rest, responsive);

  const isChecked = !! value;

  const handleOnChange = (e) => {
    e.stopPropagation();
    onChange ? onChange( ! isChecked, e.target.name) : null;
  };

  const uniqId = id ? id : v4();
  const readOnly = onChange == null;
  return (
    <div style={style} className={styles.root}>
      <label className={cx(styles.wrapper, {
        [styles[getEnumAsClass(size)]]: size,
        [styles.disabled]: disabled,
        [styles.error]: error,
        [styles.readOnly]: readOnly,
        [placeholderStyles.shimmer]: isPlaceholder,
      })} htmlFor={uniqId}>
        <div className={styles.checkbox}>
          <input
            disabled={disabled}
            checked={isChecked}
            id={uniqId}
            type="checkbox"
            className={styles.input}
            onChange={handleOnChange}
            readOnly={readOnly}
            {...props} />
          <div data-element="sprite" className={styles.sprite}>
            {do {
              if (readOnly) {
                <label data-element="locked-icon" className={styles.iconLabel}>
                  <Icon name="lock" />
                </label>
              }
              else {
                <label data-element="icon" className={styles.iconLabel} htmlFor={uniqId}>
                  <Icon bold name="check" />
                </label>
              }
            }}
          </div>
        </div>
        {do{
          if (children) {
            <label data-element="label" className={styles.label} htmlFor={uniqId}>
              {children}
            </label>
          }
        }}
      </label>
      {do{
        if (error && typeof error === 'string') {
          <Hint category={Category.DANGER}>{error}</Hint>
        }
      }}
    </div>
  );
};


Checkbox.propTypes = {
  /** If passed, the text will be the label of the checkbox */
  children: PropTypes.string,

  /** Triggered when checkbox value is changed */
  onChange: PropTypes.func,

  /** If true, checkbox is not clickable */
  disabled: PropTypes.bool,

  /** Determines if checkbox is checked */
  value: PropTypes.bool,

  /** Name of the form element (target.name) */
  name: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** Size of the checkbox. Can be large or default */
  size: PropTypes.oneOf([Size.LARGE, Size.DEFAULT]),

  /** Used for style overrides */
  style: PropTypes.object,

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder: PropTypes.bool,

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


Checkbox.defaultProps = {
  size: Size.DEFAULT,
};


export default Checkbox;
