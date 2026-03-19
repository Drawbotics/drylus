import React from 'react';
import { render } from '@testing-library/react';

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
      const tree = render(<AttachmentBox fileName={simplestAttachment.fileName} />).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
    it('is given attachment with progress', () => {
      const tree = render(
        <AttachmentBox
          fileName={attachmentWithProgress.fileName}
          progress={attachmentWithProgress.progress}
        />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
    it('is given a completed attachment', () => {
      const tree = render(
        <AttachmentBox
          fileName={completedAttachment.fileName}
          progress={completedAttachment.progress}
        />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
    it('can download attachment', () => {
      const tree = render(
        <AttachmentBox
          fileName={completedAttachment.fileName}
          progress={completedAttachment.progress}
          onClickDownload={() => {}}
        />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
    it('can remove attachment', () => {
      const tree = render(
        <AttachmentBox fileName={simplestAttachment.fileName} onClickClose={() => {}} />,
      ).container.firstChild;
      expect(tree).toMatchSnapshot();
    });
  });
});
