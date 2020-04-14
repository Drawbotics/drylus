import React from 'react';

import { Category, Size } from '../enums';
import { Flex, FlexAlign, FlexDirection, FlexItem, Margin } from '../layout';
import { Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
import {
  Checkbox,
  Input,
  MultiSelect,
  NumberInput,
  RadioGroup,
  RangeInput,
  SearchInput,
  Select,
  TextArea,
} from './';
import { Hint } from './Hint';

export type InputGroupChild =
  | React.ReactElement<typeof MultiSelect>
  | React.ReactElement<typeof RangeInput>
  | React.ReactElement<typeof NumberInput>
  | React.ReactElement<typeof SearchInput>
  | React.ReactElement<typeof TextArea>
  | React.ReactElement<typeof Checkbox>
  | React.ReactElement<typeof RadioGroup>
  | React.ReactElement<typeof Input>
  | React.ReactElement<typeof Select>;

export interface InputGroupProps {
  /** Form components that will be grouped together */
  children: Array<InputGroupChild>; // TODO only allow form components

  /** Small text shown below the group, replaced by error if present */
  hint?: string;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message. Either will set "error: true" to all components in the group */
  error?: string | boolean;

  /** If true all elements display a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** If true, form elements will be aligned horizontally */
  horizontal?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const InputGroup = ({ responsive, ...rest }: InputGroupProps) => {
  const { hint, error, valid, children, style, horizontal } = useResponsiveProps<InputGroupProps>(
    rest,
    responsive,
  );

  return (
    <div style={style}>
      <Flex
        direction={horizontal ? FlexDirection.HORIZONTAL : FlexDirection.VERTICAL}
        align={FlexAlign.STRETCH}>
        {React.Children.map(children as any, (child, i) => {
          if (child != null) {
            const margin = i === 0 ? undefined : Size.EXTRA_SMALL;
            return (
              <FlexItem flex>
                <Margin
                  size={{
                    top: horizontal ? undefined : margin,
                    left: horizontal ? margin : undefined,
                  }}>
                  {React.cloneElement(child, {
                    error: child.props.valid ? false : Boolean(error),
                    valid: valid !== undefined ? valid : child.props.valid,
                  })}
                </Margin>
              </FlexItem>
            );
          }
        })}
      </Flex>
      {run(() => {
        if (error != null && typeof error === 'string') {
          return <Hint category={Category.DANGER}>{error}</Hint>;
        } else if (hint != null) {
          return <Hint>{hint}</Hint>;
        }
      })}
    </div>
  );
};
