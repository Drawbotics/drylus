import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { useThemeColor } from '../base';
import { Shade, Size } from '../enums';
import { Flex, FlexItem, FlexJustify, FlexSpacer, Grid, GridItem } from '../layout';
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
  handle: css`
    &:hover {
      cursor: pointer;

      i {
        color: ${sv.colorPrimary};
      }
    }
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
}

export const SortableItem = ({ id, label, onClickClose, children }: SortableItemProps) => {
  const color = useThemeColor();
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

  return (
    <div className={styles.item} ref={setNodeRef} style={style}>
      <Flex justify={FlexJustify.START}>
        <FlexItem>
          <div className={styles.handle} {...attributes} {...listeners}>
            <Icon shade={Shade.MEDIUM} name="drag-and-drop" />
          </div>
        </FlexItem>
        <FlexSpacer size={Size.EXTRA_SMALL} />
        <FlexItem flex>
          <Text size={Size.SMALL}>{label}</Text>
        </FlexItem>
        {onClickClose != null ? (
          <FlexItem>
            {/* TODO: modify with overlay */}
            <Icon shade={Shade.MEDIUM} onClick={onClickClose} name="x" />
          </FlexItem>
        ) : null}
      </Flex>
      {children}
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
                key: index,
                children: React.cloneElement(
                  child as React.ReactElement<typeof SortableItem>,
                  { id: items[index].id } as Partial<typeof SortableItem>,
                ),
              }),
            )}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export const SortableList = () => {
  return <div></div>;
};
