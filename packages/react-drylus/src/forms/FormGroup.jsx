import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import Flex, { FlexItem, FlexDirections, FlexAlign } from '../layout/Flex';
import { Sizes } from '../enums';
import Margin from '../layout/Margin';


const styles = {
  root: css`
    width: 100%;
  `,
};


const FormGroup = ({
  label,
  input,
  horizontal,
  style,
}) => {
  return (
    <div style={style} className={styles.root}>
      <Flex
        direction={horizontal ? FlexDirections.HORIZONTAL : FlexDirections.VERTICAL}
        align={horizontal ? FlexAlign.CENTER : FlexAlign.STRETCH}>
        <FlexItem>
          <Margin size={horizontal ? { right: Sizes.SMALL } : { bottom: Sizes.EXTRA_SMALL }}>
            {label}
          </Margin>
        </FlexItem>
        <FlexItem flex>
          {input}
        </FlexItem>
      </Flex>
    </div>
  );
};


FormGroup.propTypes = {
  /** The label of the group, should be a Label component */
  label: PropTypes.node.isRequired,

  /** Can be a single form component (e.g. Select) or an InputGroup, see doc for that */
  input: PropTypes.node.isRequired,

  /** If true, the label will be placed on the left, and the input on the right (center flex aligned) */
  horizontal: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,
};


export default FormGroup;
