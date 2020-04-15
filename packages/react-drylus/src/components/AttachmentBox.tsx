import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { Color, Size } from '../enums';
import { Flex, FlexItem, FlexJustify, ListTile, Margin, Padding } from '../layout';
import { run } from '../utils';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';
import { Text } from './Text';

interface AttachmentBoxProps {
  /** Details of the attachment to be displayed */
  attachment: {
    fileName: string;
    progress?: number;
  };

  /** To control what should happen when download is clicked. If not provided download button is not displyed */
  onClickDownload?: () => void;

  /** To control what should happen when remove is clicked. If not provided remove button is not displyed */
  onClickClose?: () => void;
}

const styles = {
  attachment: css`
    background: ${sv.neutralLighter};
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.colorPrimary};
  `,
};

export const AttachmentBox = ({
  attachment,
  onClickDownload,
  onClickClose,
}: AttachmentBoxProps) => {
  return (
    <div className={styles.attachment}>
      <Padding size={Size.EXTRA_SMALL}>
        <Flex justify={FlexJustify.SPACE_BETWEEN}>
          <FlexItem flex>
            <ListTile
              style={{ width: '100%' }}
              leading={<Icon name="file" />}
              title={
                <Text disabled={attachment.progress != null && attachment.progress !== 1}>
                  {attachment.fileName}
                </Text>
              }
              subtitle={run(() => {
                if (attachment.progress != null && attachment.progress !== 1) {
                  return (
                    <ProgressBar
                      size={Size.SMALL}
                      color={Color.GREEN}
                      percentage={attachment.progress}
                    />
                  );
                }
              })}
            />
          </FlexItem>
          <FlexItem>
            {run(() => {
              if (onClickDownload != null) {
                return (
                  <Margin size={{ horizontal: Size.EXTRA_SMALL }}>
                    <Icon
                      onClick={onClickDownload}
                      style={
                        attachment.progress != null && attachment.progress !== 1
                          ? { opacity: 0, pointerEvents: 'none' }
                          : undefined
                      }
                      name="download"
                    />
                  </Margin>
                );
              }
            })}
          </FlexItem>
          {run(() => {
            if (onClickClose != null) {
              return (
                <FlexItem>
                  <Margin size={{ left: Size.EXTRA_SMALL }}>
                    <Icon name="x" onClick={onClickClose} />
                  </Margin>
                </FlexItem>
              );
            }
          })}
        </Flex>
      </Padding>
    </div>
  );
};
