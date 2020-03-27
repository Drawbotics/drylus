import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React, { useEffect, useRef } from 'react';

import { WrapperRef } from '../utils';

const styles = {
  inlineEditChild: css`
    border-radius: 1px;
    transition: background ${sv.transitionTimeShort} ease-in-out,
      box-shadow ${sv.transitionTimeShort} ease-in-out,
      padding ${sv.transitionTimeShort} ease-in-out;
  `,
  hovered: css`
    padding-left: 2px;
    padding-right: 2px;
    box-shadow: 0px 0px 0px 4px ${fade(sv.neutral, 50)};
    background: ${fade(sv.neutral, 50)};
  `,
};

export interface InlineEditProps {
  /** Element displayed within the content of the edit */
  children: React.ReactNode;

  /** Component (can be custom too) shown when the editable area is clicked */
  edit: React.ReactNode;

  /** Triggered when the confirm button is clicked */
  onClickConfirm: () => void;
}

export const InlineEdit = ({ children }: InlineEditProps) => {
  const childrenRef = useRef<HTMLElement>();

  const handleMouseLeave = () => {
    childrenRef.current?.classList.remove(styles.hovered);
  };

  const handleMouseEnter = () => {
    // console.dir(childrenRef.current);
    childrenRef.current?.classList.add(styles.hovered);
  };

  useEffect(() => {
    if (childrenRef.current != null) {
      childrenRef.current.addEventListener('mouseenter', handleMouseEnter);
      childrenRef.current.addEventListener('mouseleave', handleMouseLeave);
      childrenRef.current.classList.add(styles.inlineEditChild);
    }

    return () => {
      childrenRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      childrenRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <WrapperRef setChildrenRef={(node) => (childrenRef.current = node)}>{children}</WrapperRef>
  );
};
