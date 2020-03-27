import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Icon, IconType } from '../components';
import { Size } from '../enums';
import { Flex, FlexItem, Margin } from '../layout';
import { WrapperRef } from '../utils';
import { DateInput, Input, MultiSelect, NumberInput, Select, TextArea } from './';

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
  hidden: css`
    display: none !important;
  `,
  buttons: css`
    position: absolute;
    top: calc(100% + ${sv.marginExtraSmall});
    right: 0;
    z-index: 999;
  `,
  button: css`
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};
    background: ${sv.neutralDarkest};
    color: ${sv.colorPrimaryInverse};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1000px;

    &:hover {
      cursor: pointer;
    }
  `,
};

function _isFocussableComponent(component: React.ReactNode): boolean {
  if (typeof component === 'object' && (component as React.ReactElement).type != null) {
    const elementType = (component as React.ReactElement).type;
    const originalType = (component as React.ReactElement).props.originalType;
    return (
      elementType === Input ||
      originalType === Input ||
      elementType === Select ||
      originalType === Select ||
      elementType === MultiSelect ||
      originalType === MultiSelect ||
      elementType === DateInput ||
      originalType === DateInput ||
      elementType === NumberInput ||
      originalType === NumberInput ||
      elementType === TextArea ||
      originalType === TextArea
    );
  }
  return false;
}

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  icon: IconType;
}

const ActionButton = ({ onClick, icon }: ActionButtonProps) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <Icon name={icon} />
    </div>
  );
};

export interface InlineEditProps {
  /** Element displayed within the content of the edit */
  children: React.ReactNode;

  /** Component (can be custom too) shown when the editable area is clicked */
  edit: React.ReactNode;

  /** Triggered when the confirm button is clicked */
  onClickConfirm: () => void;

  /**
   * If true, the component goes back to the initial state when clicking outside
   * @default true
   */

  exitOnClick?: boolean;

  /** Triggered when the cancel action is clicked or if the component is exited through exitOnClick. Used to reset the state on the edit component */
  onCancel: () => void;
}

export const InlineEdit = ({
  children,
  edit,
  onClickConfirm,
  exitOnClick = true,
  onCancel,
}: InlineEditProps) => {
  const childrenRef = useRef<HTMLElement>();
  const editRef = useRef<HTMLDivElement>(null);
  const childrenCSSClassCopy = useRef<DOMTokenList>();
  const childrenDisplayCopy = useRef<string>();
  const [editing, setIsEditing] = useState(false);

  const handleMouseLeave = () => {
    if (childrenRef.current != null) {
      childrenRef.current.classList.remove(styles.hovered);
      // artefact appears if we don't wait for display to go back to original state
      setTimeout(() => {
        if (childrenRef.current != null) {
          childrenRef.current.style.display = '';
        }
      }, 300);
    }
  };

  const handleMouseEnter = () => {
    if (childrenRef.current != null) {
      childrenRef.current.classList.add(styles.hovered);
      childrenRef.current.style.display =
        childrenDisplayCopy.current === 'inline' ? 'inline-block' : '';
    }
  };

  const handleMouseClick = () => {
    if (childrenRef.current != null) {
      childrenRef.current.classList.remove(styles.hovered);
      childrenRef.current.classList.add(styles.hidden);
      setIsEditing(true);
    }
  };

  const handleExitEditing = () => {
    if (childrenRef.current != null) {
      childrenRef.current.classList.remove(styles.hidden);
      setIsEditing(false);
    }
  };

  const handleWindowClick = (e: Event) => {
    if (
      e.target !== childrenRef.current &&
      !childrenRef.current?.contains(e.target as Node) &&
      e.target !== editRef.current &&
      !editRef.current?.contains(e.target as Node) &&
      exitOnClick
    ) {
      if (editing) {
        onClickConfirm();
      }
      handleExitEditing();
    }
  };

  useEffect(() => {
    if (childrenRef.current != null) {
      childrenRef.current.addEventListener('mouseenter', handleMouseEnter);
      childrenRef.current.addEventListener('mouseleave', handleMouseLeave);
      childrenRef.current.addEventListener('click', handleMouseClick);
      window.addEventListener('click', handleWindowClick, true);

      if (getComputedStyle(childrenRef.current).display !== 'none') {
        childrenCSSClassCopy.current = Object.assign({}, childrenRef.current.classList);
        childrenDisplayCopy.current = getComputedStyle(childrenRef.current).display;
        childrenRef.current.classList.add(styles.inlineEditChild);
      }
    }

    return () => {
      childrenRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      childrenRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      childrenRef.current?.removeEventListener('click', handleMouseClick);
      window.removeEventListener('click', handleWindowClick);
    };
  });

  return (
    <Fragment>
      {editing ? (
        <div
          ref={editRef}
          style={{
            color: 'initial',
            position: 'relative',
            width: '100%',
            display: childrenDisplayCopy.current === 'inline' ? 'inline-block' : undefined,
          }}
          className={Object.values(childrenCSSClassCopy.current ?? {}).join(' ')}>
          {_isFocussableComponent(edit)
            ? React.cloneElement(edit as React.ReactElement, { autoFocus: true })
            : edit}
          <div className={styles.buttons}>
            <Flex>
              <FlexItem>
                <Margin size={{ right: Size.EXTRA_SMALL }}>
                  <ActionButton
                    icon="x"
                    onClick={() => {
                      handleExitEditing();
                      onCancel();
                    }}
                  />
                </Margin>
              </FlexItem>
              <FlexItem>
                <ActionButton
                  icon="check"
                  onClick={() => {
                    handleExitEditing();
                    onClickConfirm();
                  }}
                />
              </FlexItem>
            </Flex>
          </div>
        </div>
      ) : null}
      <WrapperRef setChildrenRef={(node) => (childrenRef.current = node)}>{children}</WrapperRef>
    </Fragment>
  );
};
