import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import last from 'lodash/last';
import React, { Fragment } from 'react';

import { Color, Size } from '../enums';
import { Flex, FlexDirection, FlexItem, FlexJustify, FlexSpacer, Margin, Padding } from '../layout';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';
import { FileIcon, FileType } from './FileIcon';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';
import { Text } from './Text';

const styles = {
  root: css`
    background: ${sv.backgroundColor};
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.colorPrimary};
  `,
};

interface AttachmentBoxProps {
  /** Name of the file to be displayed */
  fileName?: string;

  /** Progress of the download to be displyed */
  progress?: number;

  /** If given, shows the folder icon variant instead. Note, this overrides the fileName */
  asFolder?: boolean;

  /** To control what should happen when download is clicked. If not provided download button is not displyed */
  onClickDownload?: VoidFunction;

  /** To control what should happen when remove is clicked. If not provided remove button is not displyed */
  onClickClose?: VoidFunction;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const AttachmentBox = ({ responsive, ...rest }: AttachmentBoxProps) => {
  const { fileName, progress, onClickDownload, onClickClose, style, asFolder } = useResponsiveProps<
    AttachmentBoxProps
  >(rest, responsive);
  return (
    <div style={style} className={styles.root}>
      <Padding size={Size.EXTRA_SMALL}>
        <Flex direction={FlexDirection.HORIZONTAL} justify={FlexJustify.SPACE_BETWEEN}>
          <FlexItem flex style={{ display: 'flex', minWidth: 0 }}>
            <Flex style={{ width: '100%' }}>
              <FlexItem>
                <FileIcon
                  type={fileName != null ? (last(fileName.split('.')) as FileType) : undefined}
                  asFolder={asFolder}
                />
              </FlexItem>
              <FlexSpacer size={Size.EXTRA_SMALL} />
              <FlexItem flex style={{ minWidth: 0 }}>
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <Text disabled={progress != null}>{fileName}</Text>
                </div>
                {progress != null ? (
                  <Margin size={{ top: Size.EXTRA_SMALL }}>
                    <ProgressBar
                      style={{ backgroundColor: sv.neutral }}
                      size={Size.SMALL}
                      color={Color.GREEN}
                      percentage={progress}
                    />
                  </Margin>
                ) : null}
              </FlexItem>
            </Flex>
          </FlexItem>
          {onClickDownload != null ? (
            <Fragment>
              <FlexSpacer size={Size.SMALL} direction={FlexDirection.HORIZONTAL} />
              <FlexItem style={{ display: 'flex' }}>
                <Icon onClick={onClickDownload} name="download" />
              </FlexItem>
            </Fragment>
          ) : null}
          <FlexSpacer size={Size.EXTRA_SMALL} direction={FlexDirection.HORIZONTAL} />
          {onClickClose != null ? (
            <FlexItem style={{ display: 'flex' }}>
              <Icon name="x" onClick={onClickClose} />
            </FlexItem>
          ) : null}
        </Flex>
      </Padding>
    </div>
  );
};
