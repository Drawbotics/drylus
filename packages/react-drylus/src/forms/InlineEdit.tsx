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
    const elementWithType = component as React.ReactElement;
    return (
      elementWithType?.type === Input ||
      elementWithType?.type === Select ||
      elementWithType?.type === MultiSelect ||
      elementWithType?.type === DateInput ||
      elementWithType?.type === NumberInput ||
      elementWithType?.type === TextArea
    );
  }
  return false;
}

interface ActionButtonProps {
  onClick: () => void;
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
}

export const InlineEdit = ({ children, edit, onClickConfirm }: InlineEditProps) => {
  const childrenRef = useRef<HTMLElement>();
  const childrenCSSClassCopy = useRef<DOMTokenList>();
  const [editing, setIsEditing] = useState(false);

  const handleMouseLeave = () => {
    childrenRef.current?.classList.remove(styles.hovered);
  };

  const handleMouseEnter = () => {
    childrenRef.current?.classList.add(styles.hovered);
  };

  const handleMouseClick = () => {
    if (childrenRef.current != null) {
      childrenRef.current.classList.remove(styles.hovered);
      childrenRef.current.style.display = 'none';
      setIsEditing(true);
    }
  };

  const handleClickActionButton = () => {
    if (childrenRef.current != null) {
      childrenRef.current.style.display = '';
      setIsEditing(false);
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
        <div
          style={{ color: 'initial', position: 'relative' }}
          className={childrenCSSClassCopy.current?.value}>
          {_isFocussableComponent(edit)
            ? React.cloneElement(edit as React.ReactElement, { autoFocus: true })
            : edit}
          <div className={styles.buttons}>
            <Flex>
              <FlexItem>
                <Margin size={{ right: Size.EXTRA_SMALL }}>
                  <ActionButton icon="x" onClick={handleClickActionButton} />
                </Margin>
              </FlexItem>
              <FlexItem>
                <ActionButton
                  icon="check"
                  onClick={() => {
                    handleClickActionButton();
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
