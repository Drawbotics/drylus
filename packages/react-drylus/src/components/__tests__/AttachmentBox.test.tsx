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
  url: 'https://www.aws.com',
};

describe('AttachmentBox', () => {
  describe('matches snapshot when', () => {
    it('is given the simplest attachment', () => {
      const tree = create(<AttachmentBox attachment={simplestAttachment} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('is given attachment with progress', () => {
      const tree = create(<AttachmentBox attachment={attachmentWithProgress} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('is given a completed attachment', () => {
      const tree = create(<AttachmentBox attachment={completedAttachment} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('can download attachment', () => {
      const tree = create(
        <AttachmentBox attachment={completedAttachment} onClickDownload={() => {}} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('can remove attachment', () => {
      const tree = create(
        <AttachmentBox attachment={simplestAttachment} onClickClose={() => {}} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
