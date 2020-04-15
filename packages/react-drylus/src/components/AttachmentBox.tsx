import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { Color, Size } from '../enums';
import { Flex, FlexItem, FlexJustify, ListTile, Margin, Padding } from '../layout';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';
import { Text } from './Text';

const styles = {
  root: css`
    background: ${sv.neutralLighter};
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.colorPrimary};
  `,
};

interface AttachmentBoxProps {
  /** Name of the file to be displayed */
  fileName: string;

  /** Progress of the download to be displyed */
  progress?: number;

  /** To control what should happen when download is clicked. If not provided download button is not displyed */
  onClickDownload?: () => void;

  /** To control what should happen when remove is clicked. If not provided remove button is not displyed */
  onClickClose?: () => void;
}

export const AttachmentBox = ({
  fileName,
  progress,
  onClickDownload,
  onClickClose,
}: AttachmentBoxProps) => {
  return (
    <div className={styles.root}>
      <Padding size={Size.EXTRA_SMALL}>
        <Flex justify={FlexJustify.SPACE_BETWEEN}>
          <FlexItem flex>
            <ListTile
              style={{ width: '100%' }}
              leading={<Icon name="file" />}
              title={<Text disabled={progress != null && progress !== 1}>{fileName}</Text>}
              subtitle={
                progress != null ? (
                  <ProgressBar size={Size.SMALL} color={Color.GREEN} percentage={progress} />
                ) : null
              }
            />
          </FlexItem>
          {onClickDownload != null && progress === 1 ? (
            <FlexItem>
              <Margin size={{ horizontal: Size.EXTRA_SMALL }}>
                <Icon onClick={onClickDownload} name="download" />
              </Margin>
            </FlexItem>
          ) : null}
          {onClickClose != null ? (
            <FlexItem>
              <Margin size={{ left: Size.EXTRA_SMALL }}>
                <Icon name="x" onClick={onClickClose} />
              </Margin>
            </FlexItem>
          ) : null}
        </Flex>
      </Padding>
    </div>
  );
};
