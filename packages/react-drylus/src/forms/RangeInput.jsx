import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import { Slider, Handles, Tracks, Rail } from 'react-compound-slider';
import sv from '@drawbotics/drylus-style-vars';

import Text from '../components/Text';
import { styles as tooltipStyles } from '../components/Tooltip';
import { Size } from '../enums';
import { useResponsiveProps } from '../utils/hooks';


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
    background-color: ${sv.neutralLight};
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


const Tooltip = ({ value, visible }) => {
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


const Handle = ({
  handle,
  getHandleProps,
  renderValue,
  disabled,
}) => {
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
      {...getHandleProps(id, disabled ? {} : {
        onMouseDown: handleShowTooltip,
        onMouseUp: handleHideTooltip,
        onTouchStart: handleShowTooltip,
        onTouchEnd: handleHideTooltip,
      })}>
      <Tooltip visible={tooltipVisible} value={renderValue(value)} />
    </div>
  );
};


const Track = ({
  source,
  target,
  getTrackProps,
  disabled,
}) => {
  return (
    <div
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      className={cx(styles.track, { [styles.disabledTrack]: disabled })}
      {...getTrackProps()} />
  );
};


const RangeInput = ({
  responsive,
  ...rest
}) => {
  const {
    min,
    max,
    value,
    step,
    onChange,
    onUpdate,
    disabled,
    renderValue,
  } = useResponsiveProps(rest, responsive);

  const isMultiHandle = value.length > 1;
  const values = isMultiHandle ? value : [value];

  return (
    <Slider
      disabled={disabled}
      onUpdate={(values) => onUpdate(isMultiHandle ? values : values[0])}
      onChange={(values) => onChange(isMultiHandle ? values : values[0])}
      mode={3}
      step={step}
      className={cx(styles.root, { [styles.disabled]: disabled })}
      domain={[min, max]}
      values={values}>
      <Rail>
        {({ getRailProps }) => (
          <div
            className={cx(styles.rail, { [styles.disabledRail]: disabled })}
            {...getRailProps()} />
        )}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map((handle) => (
              <Handle
                disabled={disabled}
                renderValue={renderValue}
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left={! isMultiHandle} right={false}>
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
      <div className={cx(styles.labels)}>
        <div className={styles.min}>
          <Text size={Size.SMALL}>{renderValue(min)}</Text>
        </div>
        <div className={styles.max}>
          <Text size={Size.SMALL}>{renderValue(max)}</Text>
        </div>
      </div>
    </Slider>
  );
};


RangeInput.propTypes = {
  /** The minimum value displayed on the input, and the minimum selectable value */
  min: PropTypes.number.isRequired,

  /** The maximum value displayed on the input, and the maximum selectable value */
  max: PropTypes.number.isRequired,

  /** If value is an array of numbers, then we display n handles, otherwise only 1 value shows 1 handle. If the value is larger than max, or smaller than min, the max or min will be used */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,

  /** Determines the range between each value, can be float or int */
  step: PropTypes.number,

  /** Returns the value at the end of the slide (mouse up/touch end). For continuous updates while sliding use onUpdate */
  onChange: PropTypes.func.isRequired,

  /** Returns value but on every step changed by the handle: render intensive */
  onUpdate: PropTypes.func,

  /** Disables the slider */
  disabled: PropTypes.bool,

  /** Function to custom display the given value(s): (v) => {} */
  renderValue: PropTypes.func,

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

RangeInput.defaultProps = {
  renderValue: x=>x,
  onUpdate: x=>x,
}


export default RangeInput;