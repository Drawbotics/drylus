import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { useThemeColor } from '../base';
import { Align, Shade, Size } from '../enums';
import { Flex, FlexAlign, FlexItem, FlexJustify, FlexSpacer, Grid, GridItem } from '../layout';
import { Responsive, Style } from '../types';
import { checkComponentProps, useResponsiveProps } from '../utils';
import { Icon } from './Icon';
import { Text } from './Text';

const styles = {
  item: css`
    position: relative;
    background: ${sv.backgroundColor};
    padding: ${sv.paddingExtraSmall};
    border-radius: ${sv.defaultBorderRadius};
    transition: box-shadow ease-in-out ${sv.transitionTimeShort};
  `,
  minimal: css`
    padding: 0;
    overflow: hidden;

    [data-element='controls'] {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      padding: ${sv.paddingExtraSmall};
      background: linear-gradient(rgba(0, 0, 0, 0.7), transparent);
    }

    i {
      color: ${sv.white} !important;
    }
  `,
  icon: css`
    display: flex;

    &:hover {
      cursor: pointer;

      i {
        color: ${sv.colorPrimary};
      }
    }
  `,
  content: css`
    display: flex;
  `,
};

export interface SortableItemProps {
  /** Title of the item */
  label: string;

  /** If given, the close button is made visible */
  onClickClose?: VoidFunction;

  /** Content of the item */
  children: React.ReactNode;

  /** @private */
  id: string;

  /** @private */
  minimal?: boolean;

  /** @private */
  align?: Align.TOP | Align.CENTER;
}

export const SortableItem = ({
  id,
  label,
  onClickClose,
  children,
  minimal,
  align,
}: SortableItemProps) => {
  const color = useThemeColor();
  // @ts-ignore Tests fail because jest thinks `id` is not a valid argument... go figure
  const { transform, transition, setNodeRef, attributes, listeners, active } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    zIndex: active?.id === id ? 999 : undefined,
    boxShadow:
      active?.id === id
        ? `${sv.elevation2}, 0px 0px 0px 2px ${sv[color.toLowerCase() as keyof typeof sv]}`
        : undefined,
  };

  const isListItem = align != null;

  return (
    <div
      className={cx(styles.item, { [styles.minimal]: minimal === true })}
      ref={setNodeRef}
      style={style}>
      <div style={{ marginBottom: isListItem ? 0 : sv.marginExtraSmall }} data-element="controls">
        <Flex justify={FlexJustify.START} align={align === Align.TOP ? FlexAlign.START : undefined}>
          <FlexItem style={{ display: 'flex' }}>
            <div className={styles.icon} {...attributes} {...listeners}>
              <Icon shade={Shade.MEDIUM} name="drag-and-drop" />
            </div>
          </FlexItem>
          <FlexSpacer size={Size.EXTRA_SMALL} />
          <FlexItem style={{ display: 'flex' }} flex={!isListItem}>
            <Text
              style={align === Align.TOP ? { marginTop: 2 } : undefined}
              inversed={minimal}
              size={Size.SMALL}>
              {label}
            </Text>
          </FlexItem>
          {isListItem ? (
            <FlexItem style={{ display: 'flex' }} flex>
              <div
                style={{ margin: `0px ${sv.marginExtraSmall}`, flex: 1 }}
                className={styles.content}
                data-element="content">
                {children}
              </div>
            </FlexItem>
          ) : null}
          {onClickClose != null ? (
            <FlexItem style={{ display: 'flex' }} className={styles.icon}>
              {/* TODO: modify with overlay */}
              <Icon shade={Shade.MEDIUM} onClick={onClickClose} name="x" />
            </FlexItem>
          ) : null}
        </Flex>
      </div>
      {!isListItem ? (
        <div className={styles.content} data-element="content">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export interface SortableGridProps {
  /** Array of items that will make up the grid. Need to have an ID property for the sorting */
  items: Array<{ id: string } & { [key: string]: string }>;

  /** Called once the item is dropped in its new position */
  onSortEnd: (items: this['items']) => void;

  /** Should all be of type SortableItem */
  children:
    | React.ReactElement<typeof SortableItem>
    | Array<React.ReactElement<typeof SortableItem> | null>
    | React.ReactNode;

  /**
   * If true, sortable items have a minimal look (used for galleries mostly)
   * @default false
   */
  minimal?: boolean;

  /** Number of columns for the grid */
  columns: number;

  /**
   * Space between items above and below
   * @kind Size
   */
  hGutters?: Size.EXTRA_SMALL | Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;

  /**
   * Space between items left and right
   * @kind Size
   */
  vGutters?: Size.EXTRA_SMALL | Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const SortableGrid = ({ responsive, ...rest }: SortableGridProps) => {
  const {
    children,
    columns,
    hGutters,
    vGutters,
    items,
    onSortEnd,
    style,
    className,
    minimal = false,
  } = useResponsiveProps<SortableGridProps>(rest, responsive);

  checkComponentProps({ children }, { children: SortableItem });

  const _handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over != null && active.id !== over.id) {
      const oldIndex = items.findIndex((a) => a.id === active.id);
      const newIndex = items.findIndex((a) => a.id === over.id);
      const updatedAssets = arrayMove(items, oldIndex, newIndex);
      onSortEnd(updatedAssets);
    }
  };

  return (
    <DndContext onDragEnd={_handleDragEnd}>
      <SortableContext items={items}>
        <Grid
          style={style}
          className={className}
          columns={columns}
          hGutters={hGutters}
          vGutters={vGutters}>
          {React.Children.toArray(children)
            .filter((c) => Boolean(c))
            .map((child, index) =>
              // eslint-disable-next-line react/no-children-prop
              React.createElement(GridItem, {
                key: items[index].id,
                children: React.cloneElement(
                  child as React.ReactElement<typeof SortableItem>,
                  { id: items[index].id, minimal } as Partial<typeof SortableItem>,
                ),
              }),
            )}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export interface SortableListProps {
  /** Array of items that will make up the grid. Need to have an ID property for the sorting */
  items: Array<{ id: string } & { [key: string]: string }>;

  /** Called once the item is dropped in its new position */
  onSortEnd: (items: this['items']) => void;

  /** Should all be of type SortableItem */
  children:
    | React.ReactElement<typeof SortableItem>
    | Array<React.ReactElement<typeof SortableItem> | null>
    | React.ReactNode;

  /**
   * Determines how the content of the items is aligned
   * @default Align.CENTER
   * @type Align
   */
  align?: Align.CENTER | Align.TOP;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const SortableList = ({ responsive, ...rest }: SortableListProps) => {
  const {
    children,
    items,
    onSortEnd,
    align = Align.CENTER,
    style = {},
    className,
  } = useResponsiveProps<SortableListProps>(rest, responsive);

  checkComponentProps({ children }, { children: SortableItem });

  const _handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over != null && active.id !== over.id) {
      const oldIndex = items.findIndex((a) => a.id === active.id);
      const newIndex = items.findIndex((a) => a.id === over.id);
      const updatedAssets = arrayMove(items, oldIndex, newIndex);
      onSortEnd(updatedAssets);
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={_handleDragEnd}>
      <SortableContext items={items}>
        {React.Children.toArray(children)
          .filter((c) => Boolean(c))
          .map((child, index) => (
            <div
              className={className}
              key={items[index].id}
              style={{ ...style, marginTop: index === 0 ? 0 : sv.marginSmall }}>
              {React.cloneElement(
                child as React.ReactElement<typeof SortableItem>,
                { id: items[index].id, align } as Partial<typeof SortableItem>,
              )}
            </div>
          ))}
      </SortableContext>
    </DndContext>
  );
};
