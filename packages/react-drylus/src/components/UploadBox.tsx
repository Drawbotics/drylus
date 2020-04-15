import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { ChangeEvent, Fragment, useEffect, useRef } from 'react';

import { Shade, Size } from '../enums';
import { Margin } from '../layout';
import { WrapperRef } from '../utils';
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
  `,
  fullWidth: css`
    max-width: none;
  `,
};

export interface UploadHelperProps {
  /** Whatever is given as a child will be the trigger for the upload */
  children: React.ReactNode;

  /**
   * If true, more than one attachment can be selected
   * @default true
   */
  multiple?: boolean;

  /** URL where the file will be uploaded */
  uploadTargetUrl: string;

  /** Function called before the upload starts */
  onInit?: (files: Array<any>) => void;

  /** Function called before the start of each file upload */
  onStart?: (file: any) => void;

  /** Function called during the upload for each file */
  onProgress?: (file: any, e: Event) => void;

  /** Function called at the end of each file upload */
  onFinish?: (file: any, signingResult: string, result: any) => void;

  /** Function called called if an error is thrown during each file upload */
  onError?: (file: any, error: Error) => void;

  /** Function called once all files have been uploaded */
  onComplete?: (files: Array<any>) => void;

  /** Custom function to modify the file name before upload */
  sanitize?: (filename: string) => string;
}

export const UploadHelper = ({
  multiple = true,
  // uploadTargetUrl,
  // onInit,
  // onStart,
  // onProgress,
  // onFinish,
  // onError,
  // onComplete,
  // sanitize,
  children,
}: UploadHelperProps) => {
  const childrenRef = useRef<HTMLElement>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleMouseClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (childrenRef.current != null) {
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
        onChange={handleOnChange}
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

  /** Callback that is triggered on dragEnter */
  onDragEnter?: VoidFunction;

  /** Callback that is triggered on dragLeave */
  onDragLeave?: VoidFunction;
}

export const UploadBox = ({
  label = 'Drag and drop files here or just click to browse files',
  fullWidth,
  onDragEnter,
  onDragLeave,
  ...rest
}: UploadBoxProps) => {
  return (
    <UploadHelper {...rest}>
      <div className={cx(styles.root, { [styles.fullWidth]: fullWidth === true })}>
        <Margin size={{ bottom: Size.SMALL }}>
          <Upload />
        </Margin>
        <Text shade={Shade.LIGHT} size={Size.SMALL}>
          {label}
        </Text>
      </div>
    </UploadHelper>
  );
};
