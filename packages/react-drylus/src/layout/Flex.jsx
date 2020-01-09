import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import camelCase from 'lodash/camelCase';
import Enum from '@drawbotics/enums';

import { getEnumAsClass, deprecateProperty } from '../utils';
import { useResponsiveProps } from '../utils/hooks';


const styles = {
  root: css`
    display: flex;
    margin: 0;
  `,
  horizontal: css`
    flex-direction: row;
  `,
  vertical: css`
    flex-direction: column;
  `,
  justifyStart: css`
    justify-content: flex-start;
  `,
  justifyEnd: css`
    justify-content: flex-end;
  `,
  justifyCenter: css`
    justify-content: center;
  `,
  justifySpaceAround: css`
    justify-content: space-around;
  `,
  justifySpaceBetween: css`
    justify-content: space-between;
  `,
  justifySpaceEvenly: css`
    justify-content: space-evenly;
  `,
  alignStretch: css`
    align-items: stretch;
  `,
  alignStart: css`
    align-items: flex-start;
  `,
  alignEnd: css`
    align-items: flex-end;
  `,
  alignCenter: css`
    align-items: center;
  `,
  wrap: css`
    flex-wrap: wrap;
  `,
  item: css`
  `,
  equalSpan: css`
    flex: 1;
  `,
};


/**
 * @deprecated and will be removed in version 6.0
 */
export const FlexDirections = deprecateProperty(new Enum(
  'HORIZONTAL',
  'VERTICAL',
), 'FlexDirections', 'FlexDirection');


export const FlexDirection = new Enum(
  'HORIZONTAL',
  'VERTICAL',
);


export const FlexJustify = new Enum(
  'START',
  'END',
  'CENTER',
  'SPACE_AROUND',
  'SPACE_BETWEEN',
  'SPACE_EVENLY',
);


export const FlexAlign = new Enum(
  'STRETCH',
  'START',
  'END',
  'CENTER',
);


function prefixFlex(value) {
  const prefixed = value < 1 ? `0 0 ${value * 100}%` : value;
  return {
    'WebkitFlex': prefixed,
    'msFlex': prefixed,
    flex: prefixed,
  };
}


export const FlexItem = ({
  responsive,
  ...rest,
}) => {
  const {
    children,
    flex,
    style,
  } = useResponsiveProps(rest, responsive);

  const equalSpan = flex === true;
  const pStyle = prefixFlex(flex);

  return (
    <div
      className={cx(styles.item, { [styles.equalSpan]: equalSpan })}
      style={flex && typeof flex !== 'boolean' ? { ...pStyle, ...style } : style}>
      {children}
    </div>
  );
};


FlexItem.propTypes = {
  /** Determines how much space a flex item takes within the flex container. */
  flex: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ]),

  /** Used for style overrides */
  style: PropTypes.object,

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


FlexItem.defaultProps = {
  style: {},
};


const Flex = ({
  responsive,
  ...rest,
}) => {
  const {
    children,
    direction = FlexDirection.HORIZONTAL,
    justify = FlexJustify.CENTER,
    align = FlexAlign.CENTER,
    wrap = false,
    className,
    style,
  } = useResponsiveProps(rest, responsive);

  const invalidChildren = React.Children
    .toArray(children)
    .some((child) => child != null && child.type !== FlexItem);
  if (invalidChildren) {
    console.warn('Flex should only accept FlexItem as children');
  }
  return (
    <div className={cx(styles.root, {
      [styles[getEnumAsClass(direction)]]: direction,
      [styles[camelCase(`JUSTIFY_${justify?.description}`)]]: justify,
      [styles[camelCase(`ALIGN_${align?.description}`)]]: align,
      [styles.wrap]: wrap,
    }, className)} style={style}>
      {children}
    </div>
  );
};


Flex.propTypes = {
  /** Determines which way the flex layout should be */
  direction: PropTypes.oneOf([
    FlexDirection.HORIZONTAL,
    FlexDirection.VERTICAL,
  ]),

  /** See flexbox justify-content */
  justify: PropTypes.oneOf([
    FlexJustify.START,
    FlexJustify.END,
    FlexJustify.CENTER,
    FlexJustify.SPACE_AROUND,
    FlexJustify.SPACE_BETWEEN,
    FlexJustify.SPACE_EVENLY,
  ]),

  /** See flexbox align-items */
  align: PropTypes.oneOf([
    FlexAlign.STRETCH,
    FlexAlign.START,
    FlexAlign.END,
    FlexAlign.CENTER,
  ]),

  /** See flexbox flex-wrap. If true, sets to `wrap` */
  wrap: PropTypes.bool,

  /** To override simple styles on the flex element, use only for properties that do not require prefixing */
  style: PropTypes.object,

  /** If you need to customize the Flex container pass a custom className. E.g. if you want to use `display: inline-flex` */
  className: PropTypes.string,

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


Flex.defaultProps = {
  direction: FlexDirection.HORIZONTAL,
  justify: FlexJustify.CENTER,
  align: FlexAlign.CENTER,
  wrap: false,
};


export default Flex;
