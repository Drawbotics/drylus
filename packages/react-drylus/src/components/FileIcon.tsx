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
  type: FileType;
  /** Used for style overrides */
  style?: Style;
}

export const FileIcon = ({ style, type }: FileIconProps) => {
  return (
    <div
      data-type={type}
      style={style}
      className={cx(styles.root, {
        [styles.archive]: _isArchive(type),
        [styles.model]: _isModel(type),
        [styles.document]: _isDocument(type),
        [styles.vector]: _isVector(type),
        [styles.pdf]: _isPDF(type),
        [styles.data]: _isData(type),
        [styles.image]: _isImage(type),
        [styles.video]: _isVideo(type),
        [styles.sound]: _isSound(type),
      })}
    />
  );
};
