import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import { Slider, Handles, Tracks, Rail } from 'react-compound-slider';
import sv from '@drawbotics/drylus-style-vars';

import Text from '../components/Text';
import { styles as tooltipStyles } from '../components/Tooltip';
import { Size } from '../enums';


const styles = {
  root: css`
    position: relative;
    width: 100%;
    user-select: none;
  `,
  rail: css`
    width: 100%;
    height: calc(${sv.marginExtraSmall} / 2);
    border-radius: calc(${sv.marginExtraSmall} / 2);
    background-color: ${sv.neutralLight};
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

    &:hover {
      cursor: pointer;
    }
  `,
  track: css`
    top: 0;
    position: absolute;
    height: calc(${sv.marginExtraSmall} / 2);
    z-index: 1;
    background-color: ${sv.brand};
    border-radius: ${sv.defaultBorderRadius};

    &:hover {
      cursor: pointer;
    }
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
      className={styles.handle}
      {...getHandleProps(id, {
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
}) => {
  return (
    <div
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      className={styles.track}
      {...getTrackProps()} />
  );
};


const RangeInput = ({
  min,
  max,
  value,
  handles,
  step,
  onChange,
  onUpdate,
  disabled,
  renderValue,
}) => {
  const isMultiHandle = value.length > 1;
  const values = isMultiHandle ? value : [value];
  return (
    <Slider
      onUpdate={(values) => onUpdate(isMultiHandle ? values : values[0])}
      onChange={(values) => onChange(isMultiHandle ? values : values[0])}
      mode={3}
      step={step}
      className={styles.root}
      domain={[min, max]}
      values={values}>
      <Rail>
        {({ getRailProps }) => (
          <div className={styles.rail} {...getRailProps()} />
        )}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map((handle) => (
              <Handle
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
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>
      <div className={styles.labels}>
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
};

RangeInput.defaultProps = {
  renderValue: x=>x,
  onUpdate: x=>x,
}


export default RangeInput;