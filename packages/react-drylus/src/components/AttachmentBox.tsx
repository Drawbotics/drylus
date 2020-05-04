import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import last from 'lodash/last';
import React, { Fragment } from 'react';

import { Color, Size } from '../enums';
import {
  Flex,
  FlexDirection,
  FlexItem,
  FlexJustify,
  FlexSpacer,
  ListTile,
  Padding,
} from '../layout';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';
import { FileIcon, FileType } from './FileIcon';
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
  onClickDownload?: VoidFunction;

  /** To control what should happen when remove is clicked. If not provided remove button is not displyed */
  onClickClose?: VoidFunction;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const AttachmentBox = ({ responsive, ...rest }: AttachmentBoxProps) => {
  const { fileName, progress, onClickDownload, onClickClose, style } = useResponsiveProps<
    AttachmentBoxProps
  >(rest, responsive);
  return (
    <div style={style} className={styles.root}>
      <Padding size={Size.EXTRA_SMALL}>
        <Flex direction={FlexDirection.HORIZONTAL} justify={FlexJustify.SPACE_BETWEEN}>
          <FlexItem flex style={{ display: 'flex' }}>
            <ListTile
              style={{ width: '100%' }}
              leading={<FileIcon type={last(fileName.split('.')) as FileType} />}
              title={<Text disabled={progress != null}>{fileName}</Text>}
              subtitle={
                progress != null ? (
                  <ProgressBar size={Size.SMALL} color={Color.GREEN} percentage={progress} />
                ) : null
              }
            />
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
