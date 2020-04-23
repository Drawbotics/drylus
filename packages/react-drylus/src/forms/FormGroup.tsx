import { css } from 'emotion';
import React from 'react';

import { Label } from '../components';
import { Size } from '../enums';
import { Flex, FlexAlign, FlexDirection, FlexItem, Margin } from '../layout';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';
import {
  Checkbox,
  Input,
  InputGroup,
  MultiSelect,
  NumberInput,
  RadioGroup,
  RangeInput,
  SearchInput,
  Select,
  TextArea,
} from './';

const styles = {
  root: css`
    width: 100%;
  `,
};

export interface FormGroupProps {
  /** The label of the group, should be a Label component */
  label: React.ReactElement<typeof Label>;

  /** Can be a single form component (e.g. Select) or an InputGroup, see doc for that */
  input:
    | React.ReactElement<typeof InputGroup>
    | React.ReactElement<typeof MultiSelect>
    | React.ReactElement<typeof RangeInput>
    | React.ReactElement<typeof NumberInput>
    | React.ReactElement<typeof SearchInput>
    | React.ReactElement<typeof TextArea>
    | React.ReactElement<typeof Checkbox>
    | React.ReactElement<typeof RadioGroup>
    | React.ReactElement<typeof Input>
    | React.ReactElement<typeof Select>;

  /** If true, the label will be placed on the left, and the input on the right (center flex aligned) */
  horizontal?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const FormGroup = ({ responsive, ...rest }: FormGroupProps) => {
  const { label, input, horizontal, style } = useResponsiveProps<FormGroupProps>(rest, responsive);

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
