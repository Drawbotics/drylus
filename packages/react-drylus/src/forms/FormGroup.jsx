import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Size } from '../enums';
import Flex, { FlexAlign, FlexDirection, FlexItem } from '../layout/Flex';
import Margin from '../layout/Margin';
import { useResponsiveProps } from '../utils/hooks';

const styles = {
  root: css`
    width: 100%;
  `,
};

const FormGroup = ({ responsive, ...rest }) => {
  const { label, input, horizontal, style } = useResponsiveProps(rest, responsive);

  return (
    <div style={style} className={styles.root}>
      <Flex
        direction={horizontal ? FlexDirection.HORIZONTAL : FlexDirection.VERTICAL}
        align={horizontal ? FlexAlign.CENTER : FlexAlign.STRETCH}>
        <FlexItem>
          <Margin size={horizontal ? { right: Size.SMALL } : { bottom: Size.EXTRA_SMALL }}>
            {label}
          </Margin>
        </FlexItem>
        <FlexItem flex>{input}</FlexItem>
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

export default FormGroup;
