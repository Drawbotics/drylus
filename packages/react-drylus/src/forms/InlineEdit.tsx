import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React, { Fragment, useEffect, useRef, useState } from 'react';

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

export const InlineEdit = ({ children, edit }: InlineEditProps) => {
  const childrenRef = useRef<HTMLElement>();
  const childrenCSSClassCopy = useRef<DOMTokenList>();
  const [editing, setIsEditing] = useState(false);

  const handleMouseLeave = () => {
    childrenRef.current?.classList.remove(styles.hovered);
  };

  const handleMouseEnter = () => {
    // console.dir(childrenRef.current);
    childrenRef.current?.classList.add(styles.hovered);
  };

  const handleMouseClick = () => {
    if (childrenRef.current != null) {
      childrenRef.current.classList.remove(styles.hovered);
      childrenRef.current.style.display = 'none';
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (childrenRef.current != null) {
      childrenRef.current.addEventListener('mouseenter', handleMouseEnter);
      childrenRef.current.addEventListener('mouseleave', handleMouseLeave);
      childrenRef.current.addEventListener('click', handleMouseClick);
      childrenCSSClassCopy.current = childrenRef.current.classList;
      childrenRef.current.classList.add(styles.inlineEditChild);
    }

    return () => {
      childrenRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      childrenRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      childrenRef.current?.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <Fragment>
      {editing ? (
        <div style={{ color: 'initial' }} className={childrenCSSClassCopy.current?.value}>
          {edit}
        </div>
      ) : null}
      <WrapperRef setChildrenRef={(node) => (childrenRef.current = node)}>{children}</WrapperRef>
    </Fragment>
  );
};
