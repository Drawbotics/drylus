import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { Shade, Size } from '../enums';
import { Flex, FlexItem, FlexJustify, FlexSpacer, Margin } from '../layout';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';
import { AttachmentBox } from './AttachmentBox';
import { Icon } from './Icon';
import { Text } from './Text';

const styles = {
  root: css``,
};

export interface AttachmentListProps {
  /** List of attachments to display */
  children?:
    | React.ReactElement<typeof AttachmentBox>
    | Array<React.ReactElement<typeof AttachmentBox> | null>
    | React.ReactNode;

  /**
   * Displayed as the title of the list
   * @default 'Attachments'
   */
  label?: string;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const AttachmentList = ({ responsive, ...rest }: AttachmentListProps) => {
  const { children, label = 'Attachments', style } = useResponsiveProps<AttachmentListProps>(
    rest,
    responsive,
  );
  return (
    <div style={style} className={styles.root}>
      <Flex justify={FlexJustify.START}>
        <FlexItem>
          <Icon style={{ color: sv.colorSecondary }} name="link" />
        </FlexItem>
        <FlexSpacer size={Size.EXTRA_SMALL} />
        <FlexItem>
          <Text shade={Shade.MEDIUM} light>{`${label} (${React.Children.count(children)})`}</Text>
        </FlexItem>
      </Flex>
      {React.Children.map(children, (child) => (
        <Margin size={{ top: Size.SMALL }}>{child}</Margin>
      ))}
    </div>
  );
};
