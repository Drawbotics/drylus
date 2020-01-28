import React from 'react';
import PropTypes from 'prop-types';

import Flex, { FlexItem, FlexDirection, FlexAlign } from '../layout/Flex';
import { Size, Category } from '../enums';
import Margin from '../layout/Margin';
import Hint from './Hint';
import { useResponsiveProps } from '../utils/hooks';


const InputGroup = ({
  responsive,
  ...rest
}) => {
  const {
    hint,
    error,
    valid,
    children,
    style,
  } = useResponsiveProps(rest, responsive);

  return (
    <div style={style}>
      <Flex
        direction={FlexDirection.VERTICAL}
        align={FlexAlign.STRETCH}>
        {React.Children.map(children, (child, i) => child != null ? (
          <FlexItem flex>
            <Margin size={{ top: i === 0 ? null : Size.EXTRA_SMALL }}>
              {React.cloneElement(child, {
                error: child.props.valid ? false : Boolean(error),
                valid: valid !== undefined ? valid : child.props.valid,
              })}
            </Margin>
          </FlexItem>
        ) : null)}
      </Flex>
      {do{
        if (error && typeof error === 'string') {
          <Hint category={Category.DANGER}>{error}</Hint>
        }
        else if (hint) {
          <Hint>{hint}</Hint>
        }
      }}
    </div>
  );
};


InputGroup.propTypes = {
  /** Form components that will be grouped together */
  children: PropTypes.node.isRequired,

  /** Small text shown below the group, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message. Either will set "error: true" to all components in the group */
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

  /** If true all elements display a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,

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


export default InputGroup;
