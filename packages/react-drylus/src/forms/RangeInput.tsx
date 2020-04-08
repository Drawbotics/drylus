import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useState } from 'react';
import { GetTrackProps, Handles, Rail, Slider, SliderItem, Tracks } from 'react-compound-slider';

import { Text, tooltipStyles } from '../components';
import { Size } from '../enums';
import { Responsive } from '../types';
import { isFunction, useResponsiveProps } from '../utils';

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
}

const Handle = ({ handle, getHandleProps, renderValue, disabled, hideTooltip }: HandleProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
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
      className={cx(styles.handle, { [styles.disabledHandle]: disabled })}
      {...getHandleProps(
        id,
        disabled || hideTooltip
          ? {}
          : {
              onMouseDown: handleShowTooltip,
              onMouseUp: handleHideTooltip,
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
}

const Track = ({ source, target, getTrackProps, disabled }: TrackProps) => {
  return (
    <div
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      className={cx(styles.track, { [styles.disabledTrack]: disabled })}
      {...getTrackProps()}
    />
  );
};

export interface RangeInputProps<T> {
  /** The minimum value displayed on the input, and the minimum selectable value */
  min: number;

  /** The maximum value displayed on the input, and the maximum selectable value */
  max: number;

  /** If value is an array of numbers, then we display n handles, otherwise only 1 value shows 1 handle. If the value is larger than max, or smaller than min, the max or min will be used */
  value: ((name?: string) => T) | T;

  /** Determines the range between each value, can be float or int */
  step?: number;

  /** Name of the form element (target.name) */
  name?: string;

  /** Returns the value at the end of the slide (mouse up/touch end). For continuous updates while sliding use onUpdate */
  onChange: (value: T) => void;

  /** Returns value but on every step changed by the handle: render intensive */
  onUpdate?: (value: T) => void;

  /** Disables the slider */
  disabled?: boolean;

  /** Function to custom display the given value(s): (v) => {} */
  renderValue?: (value: number) => string;

  /** If true, the min and max values are not rendered below the slider */
  hideLabels?: boolean;

  /** If true, the min and max values are not shown in the slider when modified */
  hideTooltips?: boolean;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const RangeInput = <T extends number | Array<number>>({
  responsive,
  ...rest
}: RangeInputProps<T>) => {
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
  } = useResponsiveProps<RangeInputProps<T>>(rest, responsive);

  const value = isFunction(_value) ? _value(name) : _value;

  const isMultiHandle = typeof value !== 'number' && (value as Array<number>).length > 1;
  const values: Array<number> = isMultiHandle ? (value as Array<number>) : [value as number];

  return (
    <Slider
      disabled={disabled}
      onUpdate={(values) =>
        onUpdate != null ? onUpdate(isMultiHandle ? (values as any) : values[0]) : undefined
      }
      onChange={(values) => onChange(isMultiHandle ? (values as any) : values[0])}
      mode={3}
      step={step}
      className={cx(styles.root, { [styles.disabled]: disabled })}
      domain={[min, max]}
      values={values}>
      <Rail>
        {({ getRailProps }) => (
          <div
            className={cx(styles.rail, { [styles.disabledRail]: disabled })}
            {...getRailProps()}
          />
        )}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map((handle) => (
              <Handle
                hideTooltip={hideTooltips}
                disabled={disabled}
                renderValue={renderValue != null ? (v) => renderValue(v) : undefined}
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
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
  );
};
