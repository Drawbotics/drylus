import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css } from '@emotion/css';
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
    cursor: pointer;
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
    z-index: 1;
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
  const childrenRef = useRef<HTMLElement | null>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const childrenCSSClassCopy = useRef<DOMTokenList>(undefined);
  const childrenDisplayCopy = useRef<string>(undefined);
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

  const editingRef = useRef(editing);
  const exitOnClickRef = useRef(exitOnClick);
  const onCancelRef = useRef(onCancel);
  useEffect(() => {
    editingRef.current = editing;
    exitOnClickRef.current = exitOnClick;
    onCancelRef.current = onCancel;
  });

  useEffect(() => {
    const handleWindowClick = (e: Event) => {
      if (
        e.target !== childrenRef.current &&
        !childrenRef.current?.contains(e.target as Node) &&
        e.target !== editRef.current &&
        !editRef.current?.contains(e.target as Node) &&
        exitOnClickRef.current
      ) {
        if (editingRef.current) {
          onCancelRef.current();
          handleExitEditing();
        }
      }
    };

    const el = childrenRef.current;
    if (el != null) {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('click', handleMouseClick);
      window.addEventListener('click', handleWindowClick, false);

      if (getComputedStyle(el).display !== 'none') {
        childrenCSSClassCopy.current = Object.assign({}, el.classList);
        childrenDisplayCopy.current = getComputedStyle(el).display;
        el.classList.add(styles.inlineEditChild);
      }
    }

    return () => {
      el?.removeEventListener('mouseenter', handleMouseEnter);
      el?.removeEventListener('mouseleave', handleMouseLeave);
      el?.removeEventListener('click', handleMouseClick);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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
