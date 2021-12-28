import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { Fragment, useState } from 'react';
import { GetTrackProps, Handles, Rail, Slider, SliderItem, Tracks } from 'react-compound-slider';

import { useThemeColor } from '../base';
import { Text, tooltipStyles } from '../components';
import { Category, Size } from '../enums';
import { Responsive, Style } from '../types';
import {
  ERROR_MESSAGES_JOIN_STRING,
  getEnumAsClass,
  isFunction,
  useResponsiveProps,
} from '../utils';
import { Hint } from './Hint';

const styles = {
  root: css`
    position: relative;
    width: 100%;
    user-select: none;
  `,
  disabled: css`
    cursor: not-allowed;
  `,
  rail: css`
    width: 100%;
    height: calc(${sv.marginExtraSmall} / 2);
    border-radius: calc(${sv.marginExtraSmall} / 2);
    background-color: ${sv.neutral};
  `,
  disabledRail: css`
    background-color: ${sv.neutralLighter};
    cursor: not-allowed;
  `,
  handle: css`
    top: 0;
    position: absolute;
    z-index: 2;
    width: ${sv.marginSmall};
    height: ${sv.marginSmall};
    border-radius: 1000px;
    background-color: ${sv.white};
    border: 4px solid ${sv.brand};
    margin-top: -6px;
    margin-left: -6px;
    cursor: pointer;
  `,
  blue: css`
    border-color: ${sv.blue};
  `,
  red: css`
    border-color: ${sv.red};
  `,
  orange: css`
    border-color: ${sv.orange};
  `,
  green: css`
    border-color: ${sv.green};
  `,
  disabledHandle: css`
    border-color: ${sv.neutral};
    cursor: not-allowed;
  `,
  track: css`
    top: 0;
    position: absolute;
    height: calc(${sv.marginExtraSmall} / 2);
    z-index: 1;
    background-color: ${sv.brand};
    border-radius: ${sv.defaultBorderRadius};
    cursor: pointer;
  `,
  blueTrack: css`
    background-color: ${sv.blue};
  `,
  redTrack: css`
    background-color: ${sv.red};
  `,
  orangeTrack: css`
    background-color: ${sv.orange};
  `,
  greenTrack: css`
    background-color: ${sv.green};
  `,
  disabledTrack: css`
    background-color: ${sv.neutral};
    cursor: not-allowed;
  `,
  labels: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${sv.marginSmall};
  `,
  tooltip: css`
    position: absolute;
    bottom: ${sv.defaultMargin};
    transform: translateX(calc(-50% + 3px));
    white-space: nowrap;
  `,
  visible: css`
    opacity: 1;
    transform: translate(calc(-50% + 3px), 0);
  `,
};

export interface RangeTooltipProps {
  value: React.ReactNode;

  visible: boolean;
}

const RangeTooltip = ({ value, visible }: RangeTooltipProps) => {
  return (
    <div
      data-element="tooltip"
      className={cx(tooltipStyles.root, styles.tooltip, {
        [styles.visible]: visible,
      })}>
      {value}
    </div>
  );
};

export interface HandleProps {
  handle: SliderItem;
  getHandleProps: (id: string, options: any) => any; // Broken at lib level
  renderValue?: (value: number) => string;
  disabled?: boolean;
  hideTooltip?: boolean;
  invalid?: boolean;
}

const Handle = ({
  handle,
  getHandleProps,
  renderValue,
  disabled,
  hideTooltip,
  invalid,
}: HandleProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const themeColor = useThemeColor();
  const { id, value, percent } = handle;

  const handleHideTooltip = () => {
    setTooltipVisible(false);
  };

  const handleShowTooltip = () => {
    setTooltipVisible(true);
    window.addEventListener('mouseup', handleHideTooltip);
  };

  return (
    <div
      style={{ left: `${percent}%` }}
      className={cx(styles.handle, {
        [styles[getEnumAsClass<typeof styles>(themeColor)]]: themeColor != null,
        [styles.disabledHandle]: disabled === true,
        [styles.red]: invalid === true,
      })}
      {...getHandleProps(
        id,
        disabled || hideTooltip
          ? {}
          : {
              onMouseEnter: handleShowTooltip,
              onMouseOut: handleHideTooltip,
              onTouchStart: handleShowTooltip,
              onTouchEnd: handleHideTooltip,
            },
      )}>
      {!hideTooltip ? (
        <RangeTooltip
          visible={tooltipVisible}
          value={renderValue != null ? renderValue(value) : value}
        />
      ) : null}
    </div>
  );
};

export interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  disabled?: boolean;
  invalid?: boolean;
}

const Track = ({ source, target, getTrackProps, disabled, invalid }: TrackProps) => {
  const themeColor = useThemeColor();
  return (
    <div
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      className={cx(styles.track, {
        [styles[`${getEnumAsClass(themeColor)}Track` as keyof typeof styles]]: themeColor != null,
        [styles.disabledTrack]: disabled === true,
        [styles.redTrack]: invalid === true,
      })}
      {...getTrackProps()}
    />
  );
};

export interface RangeInputProps<T, K = string> {
  /** The minimum value displayed on the input, and the minimum selectable value */
  min: number;

  /** The maximum value displayed on the input, and the maximum selectable value */
  max: number;

  /** If value is an array of numbers, then we display n handles, otherwise only 1 value shows 1 handle. If the value is larger than max, or smaller than min, the max or min will be used */
  value: ((name?: K) => T) | T;

  /** Determines the range between each value, can be float or int */
  step?: number;

  /** Name of the form element (target.name) */
  name?: K;

  /** Returns the value at the end of the slide (mouse up/touch end). For continuous updates while sliding use onUpdate */
  onChange: (value: T, name?: K) => void;

  /** Returns value but on every step changed by the handle: render intensive */
  onUpdate?: (value: T, name?: K) => void;

  /** Disables the slider */
  disabled?: boolean;

  /** Function to custom display the given value(s): (v) => {} */
  renderValue?: (value: number) => string;

  /** If true, the min and max values are not rendered below the slider */
  hideLabels?: boolean;

  /** If true, the min and max values are not shown in the slider when modified */
  hideTooltips?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** Used to trigger validation after an user switches inputs */
  validate?: (name?: K) => void;

  /** Error text (or function that returns an error text) to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string | string[] | ((name?: K) => string | string[] | undefined);
}

export const RangeInput = <T extends number | Array<number>, K extends string>({
  responsive,
  ...rest
}: RangeInputProps<T, K>) => {
  const {
    min,
    max,
    value: _value,
    step,
    onChange,
    onUpdate,
    disabled,
    renderValue,
    hideLabels,
    hideTooltips,
    name,
    className,
    style,
    error: _error,
    validate,
  } = useResponsiveProps<RangeInputProps<T, K>>(rest, responsive);
  const error = isFunction(_error) ? _error(name) : _error;
  const value = isFunction(_value) ? _value(name) : _value;

  const isMultiHandle = typeof value !== 'number' && (value as Array<number>).length > 1;
  const values: Array<number> = isMultiHandle ? (value as Array<number>) : [value as number];

  const minAndMaxAreEqual = min === max;
  const formatHandles = (handle: SliderItem) => {
    // handle.value will be NaN when min and max are equal.
    // When this condition is right, lets to set the minimum as a value by default.
    return isNaN(handle.value) ? { ...handle, value: minAndMaxAreEqual ? min : 0 } : handle;
  };

  return (
    <Fragment>
      <Slider
        rootStyle={style}
        disabled={disabled}
        onUpdate={(values) =>
          onUpdate != null ? onUpdate(isMultiHandle ? (values as any) : values[0], name) : undefined
        }
        onChange={(values) => onChange(isMultiHandle ? (values as any) : values[0], name)}
        onSlideEnd={() => validate?.(name)}
        mode={3}
        step={step}
        className={cx(styles.root, { [styles.disabled]: disabled === true }, className)}
        domain={[min, max]}
        values={values}>
        <Rail>
          {({ getRailProps }) => (
            <div
              className={cx(styles.rail, { [styles.disabledRail]: disabled === true })}
              {...getRailProps()}
            />
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map(formatHandles).map((handle) => (
                <Handle
                  hideTooltip={hideTooltips}
                  disabled={disabled}
                  renderValue={renderValue != null ? (v) => renderValue(v) : undefined}
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                  invalid={!!error}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={!isMultiHandle} right={false}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => (
                <Track
                  disabled={disabled}
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                  invalid={!!error}
                />
              ))}
            </div>
          )}
        </Tracks>
        {hideLabels !== true ? (
          <div className={cx(styles.labels)}>
            <div>
              <Text size={Size.SMALL}>{renderValue != null ? renderValue(min) : min}</Text>
            </div>
            <div>
              <Text size={Size.SMALL}>{renderValue != null ? renderValue(max) : max}</Text>
            </div>
          </div>
        ) : null}
      </Slider>
      {typeof error === 'string' ? (
        <Hint category={Category.DANGER}>{error}</Hint>
      ) : Array.isArray(error) ? (
        <Hint category={Category.DANGER}>{error.join(ERROR_MESSAGES_JOIN_STRING)}</Hint>
      ) : null}
    </Fragment>
  );
};
