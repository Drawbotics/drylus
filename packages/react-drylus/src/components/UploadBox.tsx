import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';

import { Category, Shade, Size } from '../enums';
import { Hint } from '../forms';
import { Margin } from '../layout';
import { SigningResult, WrapperRef, uploadFiles } from '../utils';
import { Upload } from '../utils/illustrations';
import { Text } from './Text';

const styles = {
  root: css`
    padding: ${sv.defaultPadding} ${sv.paddingExtraLarge};
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 2px dashed ${sv.neutral};
    width: 100%;
    max-width: 300px;
    transition: ${sv.transitionShort};

    &:hover {
      cursor: pointer;
      border-color: ${sv.brand};
    }

    > * {
      pointer-events: none;
    }
  `,
  fullWidth: css`
    max-width: none;
  `,
  active: css`
    border-color: ${sv.green};
    background: ${sv.greenLighter} !important;
  `,
  error: css`
    border-color: ${sv.red} !important;
  `,
};

export interface UploadHelperProps {
  /** Whatever is given as a child will be the trigger for the upload */
  children: React.ReactNode;

  /**
   * If true, more than one attachment can be selected
   * @default false
   */
  multiple?: boolean;

  /** URL where the file will be uploaded */
  uploadTargetUrl: string;

  /** Function called before the upload starts */
  onInit?: (files: FileList) => void;

  /** Function called before the start of each file upload */
  onStart?: (file: File) => void;

  /** Function called during the upload for each file */
  onProgress?: (file: File, e: ProgressEvent) => void;

  /** Function called at the end of each file upload */
  onFinish?: (file: File, signingResult?: SigningResult, result?: any) => void;

  /** Function called called if an error is thrown during each file upload */
  onError?: (file: File, error: Error) => void;

  /** Function called once all files have been uploaded */
  onComplete?: (uploads: Array<{ file: File; signingResult?: SigningResult }>) => void;

  /** Custom function to modify the file name before upload, note that a default sanitizer already removes whitespace */
  sanitize?: (filename: string) => string;
}

export const UploadHelper = ({
  multiple,
  uploadTargetUrl,
  children,
  ...rest
}: UploadHelperProps) => {
  const childrenRef = useRef<HTMLElement>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = inputRef.current?.files;
    if (files != null) {
      await uploadFiles(files, uploadTargetUrl, rest);
    }
  };

  const handleMouseClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (childrenRef.current != null) {
      childrenRef.current.style.cursor = 'pointer';
      childrenRef.current.addEventListener('click', handleMouseClick);
    }

    return () => {
      childrenRef.current?.removeEventListener('click', handleMouseClick);
    };
  });

  return (
    <Fragment>
      <WrapperRef setChildrenRef={(node) => (childrenRef.current = node)}>{children}</WrapperRef>
      <input
        multiple={multiple}
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={handleUploadFiles}
      />
    </Fragment>
  );
};

export interface UploadBoxProps extends UploadHelperProps {
  /** If true, the box takes all the space available */
  fullWidth?: boolean;

  /**
   * Text shown under the illustration
   * @default 'Drag and drop files here or just click to browse files'
   */
  label?: string;

  /** Triggered when the drop is over and the number of files is more than 0 and multiple is false */
  onMaxFilesExceeded?: VoidFunction;

  /** Callback that is triggered on dragEnter */
  onDragEnter?: VoidFunction;

  /** Callback that is triggered on dragLeave */
  onDragLeave?: VoidFunction;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string;
}

export const UploadBox = ({
  label = 'Drag and drop files here or just click to browse files',
  fullWidth,
  onDragEnter,
  onDragLeave,
  uploadTargetUrl,
  multiple,
  onMaxFilesExceeded,
  error,
  ...rest
}: UploadBoxProps) => {
  const [isDragEntered, setIsDragEntered] = useState(false);

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragEntered(false);
    if (onDragLeave != null) {
      onDragLeave();
    }
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleDragLeave(e);
    const { files } = e.dataTransfer;
    if (!multiple && files.length > 1 && onMaxFilesExceeded != null) {
      onMaxFilesExceeded();
    } else {
      await uploadFiles(files, uploadTargetUrl, rest);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragEntered(true);
    if (onDragEnter != null) {
      onDragEnter();
    }
  };

  return (
    <UploadHelper multiple={multiple} uploadTargetUrl={uploadTargetUrl} {...rest}>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
        className={cx(styles.root, {
          [styles.fullWidth]: fullWidth === true,
          [styles.active]: isDragEntered,
          [styles.error]: error != null && error !== false,
        })}>
        <Margin size={{ bottom: Size.SMALL }}>
          <Upload />
        </Margin>
        <Text shade={Shade.LIGHT} size={Size.SMALL}>
          {label}
        </Text>
      </div>
      {error && typeof error === 'string' ? <Hint category={Category.DANGER}>{error}</Hint> : null}
    </UploadHelper>
  );
};
