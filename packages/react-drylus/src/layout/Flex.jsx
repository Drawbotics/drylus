import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import camelCase from 'lodash/camelCase';
import sv from '@drawbotics/style-vars';
import Enum from '@drawbotics/enums';

import Sizes from '../base/Sizes';
import { getEnumAsClass } from '../utils';


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
  hSpacingExtraSmall: css`
    margin-top: calc(${sv.marginExtraSmall} * -1);

    & > div {
      padding-top: ${sv.paddingExtraSmall};
    }
  `,
  hSpacingSmall: css`
    margin-top: calc(${sv.marginSmall} * -1);

    & > div {
      padding-top: ${sv.paddingSmall};
    }
  `,
  hSpacingDefault: css`
    margin-top: calc(${sv.defaultMargin} * -1);

    & > div {
      padding-top: ${sv.defaultPadding};
    }
  `,
  hSpacingLarge: css`
    margin-top: calc(${sv.marginLarge} * -1);

    & > div {
      padding-top: ${sv.paddingLarge};
    }
  `,
  vSpacingExtraSmall: css`
    margin-left: calc(${sv.marginExtraSmall} * -1);

    & > div {
      padding-left: ${sv.paddingExtraSmall};
    }
  `,
  vSpacingSmall: css`
    margin-left: calc(${sv.marginSmall} * -1);

    & > div {
      padding-left: ${sv.paddingSmall};
    }
  `,
  vSpacingDefault: css`
    margin-left: calc(${sv.defaultMargin} * -1);

    & > div {
      padding-left: ${sv.defaultPadding};
    }
  `,
  vSpacingLarge: css`
    margin-left: calc(${sv.marginLarge} * -1);

    & > div {
      padding-left: ${sv.paddingLarge};
    }
  `,
};


export const FlexDirections = new Enum(
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


export const FlexItem = ({ children, flex }) => {
  const equalSpan = flex === true;
  const style = prefixFlex(flex);
  return (
    <div
      className={cx(styles.item, { [styles.equalSpan]: equalSpan })}
      style={flex && typeof flex !== 'boolean' ? style : null}>
      {children}
    </div>
  );
};


FlexItem.propTypes = {
  /** Determines how much space a flex item takes within the flex container. */
  flex: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ]),
};


const Flex = ({
  children,
  direction=FlexDirections.HORIZONTAL,
  justify=FlexJustify.CENTER,
  align=FlexAlign.CENTER,
  wrap=false,
  className,
  styles: extraStyles,
  vSpacing,
  hSpacing,
}) => {
  return (
    <div className={cx(styles.root, {
      [styles[getEnumAsClass(direction)]]: direction,
      [styles[camelCase(`JUSTIFY_${justify?.description}`)]]: justify,
      [styles[camelCase(`ALIGN_${align?.description}`)]]: align,
      [styles.wrap]: wrap,
      [styles[camelCase(`hSpacing${hSpacing?.description}`)]]: hSpacing,
      [styles[camelCase(`vSpacing${vSpacing?.description}`)]]: vSpacing,
    }, className)} styles={extraStyles}>
      {children}
    </div>
  );
};


Flex.propTypes = {
  /** Determines which way the flex layout should be */
  direction: PropTypes.oneOf([
    FlexDirections.HORIZONTAL,
    FlexDirections.VERTICAL,
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
  styles: PropTypes.object,

  /** If you need to customize the Flex container pass a custom className. E.g. if you want to use `display: inline-flex` */
  className: PropTypes.string,

  /** Used to set the vertical space (gutters) between each FlexItem */
  vSpacing: PropTypes.oneOf([ Sizes.EXTRA_SMALL, Sizes.SMALL, Sizes.DEFAULT, Sizes.LARGE ]),

  /** Used to set the horizontal space (gutters) between each FlexItem */
  hSpacing: PropTypes.oneOf([ Sizes.EXTRA_SMALL, Sizes.SMALL, Sizes.DEFAULT, Sizes.LARGE ]),
};


Flex.defaultProps = {
  direction: FlexDirections.HORIZONTAL,
  justify: FlexJustify.CENTER,
  align: FlexAlign.CENTER,
  wrap: false,
};


export default Flex;
