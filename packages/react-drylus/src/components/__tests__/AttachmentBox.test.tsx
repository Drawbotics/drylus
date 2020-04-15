import React from 'react';
import { create } from 'react-test-renderer';

import { AttachmentBox } from '../AttachmentBox';

const simplestAttachment = {
  id: '1',
  fileName: 'FirstFile.jpg',
};

const attachmentWithProgress = {
  id: '2',
  fileName: 'ProgressFile.jpg',
  progress: 0.5,
};

const completedAttachment = {
  id: '3',
  fileName: 'CompleteFile.jpg',
  progress: 1,
};

describe('AttachmentBox', () => {
  describe('matches snapshot when', () => {
    it('is given the simplest attachment', () => {
      const tree = create(<AttachmentBox fileName={simplestAttachment.fileName} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('is given attachment with progress', () => {
      const tree = create(
        <AttachmentBox
          fileName={attachmentWithProgress.fileName}
          progress={attachmentWithProgress.progress}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('is given a completed attachment', () => {
      const tree = create(
        <AttachmentBox
          fileName={completedAttachment.fileName}
          progress={completedAttachment.progress}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('can download attachment', () => {
      const tree = create(
        <AttachmentBox
          fileName={completedAttachment.fileName}
          progress={completedAttachment.progress}
          onClickDownload={() => {}}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('can remove attachment', () => {
      const tree = create(
        <AttachmentBox fileName={simplestAttachment.fileName} onClickClose={() => {}} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
