import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import Flex, { FlexItem, FlexDirections, FlexAlign } from '../layout/Flex';
import { Sizes, Categories } from '../enums';
import Margin from '../layout/Margin';
import Hint from './Hint';


const styles = {
  root: css`
  `,
};


const InputGroup = ({
  hint,
  error,
  valid,
  children,
  style,
}) => {
  return (
    <div style={style} className={styles.root}>
      <Flex
        direction={FlexDirections.VERTICAL}
        align={FlexAlign.STRETCH}>
        {React.Children.map(children, (child, i) => (
          <FlexItem flex>
            <Margin size={{ top: i === 0 ? null : Sizes.EXTRA_SMALL }}>
              {React.cloneElement(child, {
                error: child.props.valid ? false : Boolean(error),
                valid: valid !== undefined ? valid : child.props.valid,
              })}
            </Margin>
          </FlexItem>
        ))}
      </Flex>
      {do{
        if (error && typeof error === 'string') {
          <Hint category={Categories.DANGER}>{error}</Hint>
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
};


export default InputGroup;
