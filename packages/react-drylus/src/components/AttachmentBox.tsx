import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { Color, Size } from '../enums';
import { Flex, FlexItem, FlexJustify, ListTile, Margin, Padding } from '../layout';
import { run } from '../utils';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';
import { Text } from './Text';

interface AttachmentProps {
  attachment: {
    readonly id: string;
    readonly fileName: string;
    progress?: { percentage?: number };
    attachmentId?: string;
    url?: string;
  };
  onClickRemoveAttachment?: (attachmentId: string) => void;
}

const styles = {
  attachment: css`
    background: ${sv.neutralLighter};
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.colorPrimary};
  `,
};

export const AttachmentBox = ({ attachment, onClickRemoveAttachment }: AttachmentProps) => {
  const handleDownload = () => {
    if (attachment.url != null) {
      window.open(attachment.url);
    }
  };

  return (
    <div className={styles.attachment}>
      <Padding size={Size.EXTRA_SMALL}>
        <Flex justify={FlexJustify.SPACE_BETWEEN}>
          <FlexItem flex>
            <ListTile
              style={{ width: '100%' }}
              leading={<Icon name="file" />}
              title={<Text disabled={attachment.url == null}>{attachment.fileName}</Text>}
              subtitle={run(() => {
                if (attachment.progress != null && attachment.progress.percentage !== 1) {
                  return (
                    <ProgressBar
                      size={Size.SMALL}
                      color={Color.GREEN}
                      percentage={attachment.progress.percentage}
                    />
                  );
                }
              })}
            />
          </FlexItem>
          <FlexItem>
            {run(() => {
              if (attachment.url != null) {
                return (
                  <Margin size={{ horizontal: Size.EXTRA_SMALL }}>
                    <Icon
                      onClick={handleDownload}
                      style={
                        attachment.url == null ? { opacity: 0, pointerEvents: 'none' } : undefined
                      }
                      name="download"
                    />
                  </Margin>
                );
              }
            })}
          </FlexItem>
          {run(() => {
            if (onClickRemoveAttachment != null) {
              return (
                <FlexItem>
                  <Margin size={{ left: Size.EXTRA_SMALL }}>
                    <Icon name="x" onClick={() => onClickRemoveAttachment(attachment.id)} />
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
