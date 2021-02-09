import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Style } from '../types';

const width = sv.marginSmall;
const height = sv.defaultMargin;
const foldSize = sv.marginExtraSmall;
const labelDisplacement = sv.marginExtraSmall;
const fontSize = '7px';
const borderColor = '#8C8C8C';

const FolderIcon = () => {
  return (
    <svg height="100%" viewBox="0 0 23 19">
      <path
        d="M20 2H7C5.89543 2 5 2.89543 5 4V6C5 7.10457 5.89543 8 7 8H20C21.1046 8 22 7.10457 22 6V4C22 2.89543 21.1046 2 20 2Z"
        fill={sv.neutralDark}
        stroke={borderColor}
      />
      <path
        d="M1 2.5C1 1.67157 1.67157 1 2.5 1H7.52658C8.03943 1 8.51674 1.26201 8.79207 1.69469L10.5329 4.43031C10.8083 4.86299 11.2856 5.125 11.7984 5.125H20.5C21.3284 5.125 22 5.79657 22 6.625V16.5C22 17.3284 21.3284 18 20.5 18H2.5C1.67157 18 1 17.3284 1 16.5V2.5Z"
        fill={sv.neutral}
        stroke={borderColor}
      />
    </svg>
  );
};

const styles = {
  root: css`
    display: inline-block;
    position: relative;
    border: 1.2px solid ${borderColor};
    border-image-slice: 1;
    width: ${width};
    height: ${height};
    margin-left: calc(${labelDisplacement} - 1px);
    background: linear-gradient(
      45deg,
      ${sv.white} calc(100% - 5px),
      rgba(255, 255, 255, 0) calc(100% - 5px),
      rgba(255, 255, 255, 0) 100%
    );
    clip-path: polygon(
      calc(100% - 7.5px) 0,
      100% 7.5px,
      100% 100%,
      -${labelDisplacement} 100%,
      -${labelDisplacement} 0
    );

    &::before {
      content: ' ';
      position: absolute;
      top: -1px;
      right: -1px;
      height: ${foldSize};
      width: ${foldSize};
      box-shadow: -1px 1px 0px 0.2px ${borderColor};
      border-bottom-left-radius: 1px;
      background: linear-gradient(
        45deg,
        ${sv.white} calc(50% - 0.5px),
        ${borderColor} calc(50% - 0.5px),
        ${borderColor} calc(50% + 0.5px),
        transparent calc(50% + 0.5px),
        transparent 100%
      );
    }
  `,
  withExtension: css`
    &::after {
      content: ' ';
      position: absolute;
      height: calc(${sv.marginExtraSmall} + 1px);
      width: calc(${sv.marginSmall} + 2px);
      bottom: 3px;
      left: calc(${labelDisplacement} * -1);
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-size: ${fontSize};
      color: ${sv.white};
      background: ${borderColor};
      letter-spacing: 0;
      padding-top: 1px;
      padding-left: 1px;
      font-family: ${sv.defaultFontFamily};
      font-weight: 400;
    }

    &[data-type]::after {
      content: attr(data-type);
    }
  `,
  archive: css`
    &::after {
      background: ${sv.neutralDarker};
    }
  `,
  model: css`
    &::after {
      background: ${sv.neutralDarkest};
    }
  `,
  document: css`
    &::after {
      background: ${sv.blue};
    }
  `,
  vector: css`
    &::after {
      background: ${sv.orange};
    }
  `,
  pdf: css`
    &::after {
      background: ${sv.red};
    }
  `,
  data: css`
    &::after {
      background: ${sv.green};
    }
  `,
  image: css`
    &::after {
      background: ${sv.blueDark};
    }
  `,
  video: css`
    &::after {
      background: ${sv.redLight};
    }
  `,
  sound: css`
    &::after {
      background: ${sv.greenDark};
    }
  `,
  folder: css`
    display: inline-block;
    height: 20px;
    margin-top: 3px;
  `,
};

type Archive = 'zip' | 'tar' | 'dmg' | 'jar' | 'rar';
type Model = 'dwg' | 'obj' | 'dae' | 'skp' | 'fbx' | '3ds';
type Document = 'doc' | 'rtf' | 'odt' | 'tex' | 'txt';
type Vector = 'svg' | 'ai';
type PDF = 'pdf';
type Data = 'xml' | 'csv' | 'xls';
type Image = 'jpg' | 'jpeg' | 'gif' | 'tif' | 'psd' | 'raw' | 'png';
type Video = 'webm' | 'mkv' | 'avi' | 'mov' | 'm4v' | 'mpeg' | 'mp4';
type Sound = 'mp3' | 'm4a' | 'ogg' | 'aac' | 'flac';

function _isArchive(type: string): type is Archive {
  return ['zip', 'tar', 'dmg', 'jar', 'rar'].includes(type);
}

function _isModel(type: string): type is Model {
  return ['dwg', 'obj', 'dae', 'skp', 'fbx', '3ds'].includes(type);
}

function _isDocument(type: string): type is Document {
  return ['doc', 'rtf', 'odt', 'tex', 'txt'].includes(type);
}

function _isVector(type: string): type is Vector {
  return ['svg', 'ai'].includes(type);
}

function _isPDF(type: string): type is PDF {
  return type === 'pdf';
}

function _isData(type: string): type is Data {
  return ['xml', 'csv', 'xls'].includes(type);
}

function _isImage(type: string): type is Image {
  return ['jpg', 'jpeg', 'gif', 'tif', 'psd', 'raw', 'png'].includes(type);
}

function _isVideo(type: string): type is Video {
  return ['webm', 'mkv', 'avi', 'mov', 'm4v', 'mpeg', 'mp4'].includes(type);
}

function _isSound(type: string): type is Sound {
  return ['mp3', 'm4a', 'ogg', 'aac', 'flac'].includes(type);
}

export type FileType = Archive | Model | Document | Vector | PDF | Data | Image | Video | Sound;

export interface FileIconProps {
  /** Determines the color and text shown in the icon, should be the extension of the file */
  type?: FileType | string;

  /** If given, the icon will be rendered as a folder. The file extension can still be given */
  asFolder?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const FileIcon = ({ style, type, asFolder, className }: FileIconProps) => {
  if (asFolder) {
    return (
      <div style={style} className={cx(styles.folder, className)}>
        <FolderIcon />
      </div>
    );
  }

  return (
    <div
      data-type={type}
      style={style}
      className={cx(
        styles.root,
        {
          [styles.withExtension]: type != null,
          [styles.archive]: type != null && _isArchive(type),
          [styles.model]: type != null && _isModel(type),
          [styles.document]: type != null && _isDocument(type),
          [styles.vector]: type != null && _isVector(type),
          [styles.pdf]: type != null && _isPDF(type),
          [styles.data]: type != null && _isData(type),
          [styles.image]: type != null && _isImage(type),
          [styles.video]: type != null && _isVideo(type),
          [styles.sound]: type != null && _isSound(type),
        },
        className,
      )}
    />
  );
};
