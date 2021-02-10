import { css, cx } from 'emotion';
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
  label: React.ReactElement<typeof Label> | React.ReactNode;

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
    | React.ReactElement<typeof Select>
    | React.ReactNode;

  /** If true, the label will be placed on the left, and the input on the right (center flex aligned) */
  horizontal?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const FormGroup = ({ responsive, ...rest }: FormGroupProps) => {
  const { label, input, horizontal, style, className } = useResponsiveProps<FormGroupProps>(
    rest,
    responsive,
  );

  return (
    <div style={style} className={cx(styles.root, className)}>
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
