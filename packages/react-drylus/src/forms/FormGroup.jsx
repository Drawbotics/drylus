import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import Flex, { FlexItem, FlexDirections, FlexAlign } from '../layout/Flex';
import { Sizes } from '../base';


const styles = {
  root: css`
    width: 100%;
  `,
};


const FormGroup = ({
  label,
  input,
  horizontal,
}) => {
  return (
    <div className={styles.root}>
      <Flex
        hSpacing={horizontal ? null : Sizes.SMALL}
        vSpacing={horizontal ? Sizes.SMALL : null}
        direction={horizontal ? FlexDirections.HORIZONTAL : FlexDirections.VERTICAL}
        align={horizontal ? FlexAlign.CENTER : FlexAlign.STRETCH}>
        <FlexItem>
          {label}
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
};


export default FormGroup;
