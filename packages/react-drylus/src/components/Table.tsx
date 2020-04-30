import sv, { fade } from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import get from 'lodash/get';
import omit from 'lodash/omit';
import React, { Fragment, createContext, useContext, useEffect, useRef, useState } from 'react';

import { placeholderStyles } from '../components';
import { Size } from '../enums';
import { Margin } from '../layout';
import { OnClickCallback, Style } from '../types';
import { checkComponentProps, run } from '../utils';
import { Icon } from './Icon';
import { Label } from './Label';

const RowsContext = createContext<
  [Record<string, boolean>, (val: Record<string, boolean>) => void]
>([{}, () => {}]);

const styles = {
  root: css`
    border-collapse: collapse;

    > tbody > tr[data-nested] {
      box-shadow: 0 5px 12px -5px ${sv.neutral} inset;

      & > td {
        padding-left: ${sv.paddingExtraLarge} !important;
      }
    }

    > tbody > tr[data-nested] > td > table > tbody > tr[data-nested] {
      box-shadow: none;
    }

    [data-nested] tr {
      background: none !important;
    }

    @media ${sv.screenL} {
      tbody {
        display: table;
        width: 100%;
      }
    }
  `,
  fullWidth: css`
    width: 100%;
  `,
  highlighted: css`
    tr {
      &:hover {
        background: ${sv.backgroundColor};
      }
    }
  `,
  leftPadded: css`
    > thead > tr > th:first-of-type {
      padding-left: ${sv.paddingHuge};
    }

    > tbody > tr > td:first-of-type {
      padding-left: ${sv.paddingHuge};
    }

    > tbody > tr[data-nested] > td {
      padding-left: calc(${sv.paddingExtraLarge} + ${sv.paddingHuge}) !important;
    }
  `,
  cell: css`
    text-align: left;
    padding: ${sv.paddingSmall} ${sv.defaultPadding};
  `,
  asContainer: css`
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-left: ${sv.defaultPadding};
    padding-right: ${sv.paddingHuge};
  `,
  header: css`
    border-bottom: 1px solid ${sv.neutral};

    & td:last-of-type {
      text-align: right;
    }

    & th {
      padding: ${sv.paddingSmall} ${sv.defaultPadding};
      background: ${sv.white} !important;

      &:last-of-type {
        text-align: right;
      }
    }

    @media ${sv.screenL} {
      display: none;
    }
  `,
  row: css`
    & > td:last-of-type {
      text-align: right;
    }

    & > th:last-of-type {
      text-align: right;
    }

    &[data-nested] > td > table {
      tr {
        border-bottom: 1px solid ${sv.neutralLight};

        &:last-of-type {
          border-bottom: none;
        }

        > td {
          padding-top: ${sv.paddingSmall};
          padding-bottom: ${sv.paddingSmall};

          &:first-of-type {
            padding-left: 0;
          }

          &:last-of-type {
            padding-right: 0;
          }
        }
      }
    }

    @media ${sv.screenL} {
      display: table-row-group;

      &[data-nested] {
        display: none;
      }

      > td {
        display: table-row;

        &:first-of-type {
          > div,
          &::before {
            padding-top: ${sv.paddingSmall};
          }
        }

        &:last-of-type {
          > div,
          &::before {
            padding-bottom: ${sv.paddingSmall};
          }
        }

        > div {
          display: table-cell;
          vertical-align: middle;
          padding: calc(${sv.paddingExtraSmall} / 2) ${sv.paddingSmall};
          width: 100%;
          text-align: left;
        }

        &::before {
          content: attr(data-th);
          display: table-cell;
          vertical-align: middle;
          color: ${sv.colorTertiary};
          text-transform: uppercase;
          font-weight: 500;
          font-size: 0.8rem;
          text-align: left;
          padding: calc(${sv.paddingExtraSmall} / 2) ${sv.paddingSmall};
        }
      }
    }
  `,
  white: css`
    background: ${sv.white};

    [data-nested] {
      background: ${sv.white} !important;

      > tr {
        background: ${sv.white} !important;
      }
    }
  `,
  light: css`
    background: ${sv.neutralLighter};

    [data-nested] {
      background: ${sv.neutralLighter} !important;

      > tr {
        background: ${sv.neutralLighter} !important;
      }
    }
  `,
  pointer: css`
    cursor: pointer;
  `,
  noBorderBottom: css`
    border-bottom: none !important;
  `,
  highlightedRow: css`
    background: ${sv.neutralLight} !important;
  `,
  collapsed: css`
    display: none;
  `,
  body: css`
    color: ${sv.colorPrimary};
  `,
  withToggle: css`
    position: relative;

    > i {
      position: absolute;
      left: calc(${sv.marginLarge} * -1);
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        cursor: pointer;
      }

      @media ${sv.screenL} {
        display: none;
      }
    }
  `,
  headerWithArrows: css`
    position: relative;
    transition: color ${sv.transitionTimeShort} ease-in-out;

    &:hover {
      cursor: pointer;
      color: ${sv.neutralDark};
    }
  `,
  sortableIcons: css`
    position: absolute;
    left: calc(${sv.marginLarge} * -1);
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    > i:first-of-type {
      margin-bottom: -3px;
    }

    > i:last-of-type {
      margin-top: -3px;
    }
  `,
  down: css`
    > i:last-of-type {
      color: ${sv.colorPrimary};
    }
  `,
  up: css`
    > i:first-of-type {
      color: ${sv.colorPrimary};
    }
  `,
  loadingBodyCell: css`
    display: inline-block;
    height: 20px;
    width: 70%;

    @media ${sv.screenL} {
      width: 100%;
      min-width: 100px;
    }
  `,
  emptyTableCell: css`
    padding: ${sv.defaultPadding};

    @media ${sv.screenL} {
      display: flex;
      align-items: center;
      margin-left: calc(${sv.marginLarge} * -1);
      padding: 0;
    }
  `,
  emptyTableHeader: css`
    padding-right: ${sv.paddingExtraSmall};
  `,
  scrollable: css`
    overflow: auto;

    &::after,
    &::before {
      content: ' ';
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 2;
      transition: ${sv.defaultTransition};
    }
  `,
  leftShadow: css`
    &::before {
      opacity: 1;
      box-shadow: inset 20px 0 10px -15px ${fade(sv.neutralDark, 20)};
    }
  `,
  rightShadow: css`
    &::after {
      opacity: 1;
      box-shadow: inset -20px 0 10px -15px ${fade(sv.neutralDark, 20)};
    }
  `,
};

export interface TCellProps extends React.TdHTMLAttributes<HTMLElement> {
  children: React.ReactNode;

  /** @private */
  head?: boolean;

  /** @private */
  asContainer?: boolean;

  /** @private */
  withChildToggle?: boolean;

  /** @private */
  onClickArrow?: () => void;

  /** @private */
  active?: boolean;

  /** @private */
  [x: string]: any;
}

export const TCell = ({
  children,
  head,
  asContainer,
  withChildToggle,
  onClickArrow,
  active,
  ...props
}: TCellProps) => {
  const { screenSize, ScreenSizes } = useScreenSize();

  const className = cx(styles.cell, {
    [styles.asContainer]: asContainer === true,
  });
  if (head) {
    return (
      <th className={className}>
        <Label>{children}</Label>
      </th>
    );
  }
  return (
    <td className={className} colSpan={asContainer ? 100 : undefined} {...props}>
      {run(() => {
        if (withChildToggle) {
          return (
            <div className={styles.withToggle}>
              <Icon onClick={onClickArrow} name={active ? 'chevron-up' : 'chevron-down'} />
              {children}
            </div>
          );
        } else {
          return screenSize <= ScreenSizes.L ? <div>{children}</div> : children;
        }
      })}
    </td>
  );
};

export interface TRowProps {
  /** Should be of type TCell */
  children:
    | React.ReactElement<typeof TCell>
    | Array<React.ReactElement<typeof TCell>>
    | React.ReactNode;

  /** If true sets the background to neutral */
  highlighted?: boolean;

  /** Triggered when any part of the row is clicked */
  onClick?: OnClickCallback<HTMLTableRowElement>;

  /** If true and `onClick` is provided, shows a pointer when hovering the row	 */
  clickable?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** @private */
  nested?: string;

  /** @private */
  parent?: string;

  /** @private */
  alt?: boolean;

  /** @private */
  lastParentRow?: boolean;
}

export const TRow = ({
  children,
  nested,
  parent,
  highlighted,
  alt,
  lastParentRow,
  onClick,
  clickable,
  style,
}: TRowProps) => {
  const [rowsStates, handleSetRowState] = useContext(RowsContext);
  const collapsed = nested && !rowsStates[nested];

  checkComponentProps({ children }, { children: TCell });

  return (
    <tr
      style={style}
      className={cx(styles.row, {
        [styles.collapsed]: !!collapsed,
        [styles.light]: !alt,
        [styles.white]: alt === true,
        [styles.pointer]: clickable === true && onClick != null,
        [styles.highlightedRow]: highlighted === true,
        [styles.noBorderBottom]: !!parent && !rowsStates[parent] && lastParentRow === true,
      })}
      onClick={onClick}
      data-nested={nested ?? undefined}
      data-parent={parent ?? undefined}>
      {React.Children.toArray(children)
        .filter((c) => Boolean(c))
        .map((child, key) =>
          React.cloneElement(
            child as React.ReactElement<typeof TCell>,
            {
              ...(child as React.ReactElement<typeof TCell>).props,
              key,
              asContainer: !!nested,
              withChildToggle: !!parent && key === 0,
              active: !!parent && rowsStates[parent],
              onClickArrow: parent
                ? () => handleSetRowState({ [parent]: !rowsStates[parent] })
                : null,
            } as Partial<TCellProps>,
          ),
        )}
    </tr>
  );
};

export interface THeadProps {
  children:
    | React.ReactElement<typeof TCell>
    | Array<React.ReactElement<typeof TCell>>
    | React.ReactNode;
}

export const THead = ({ children }: THeadProps) => {
  checkComponentProps({ children }, { children: TCell });

  return (
    <thead className={styles.header}>
      <TRow>
        {React.Children.toArray(children)
          .filter((c) => Boolean(c))
          .map((child, key) =>
            React.cloneElement(
              child as React.ReactElement<typeof TCell>,
              {
                ...(child as React.ReactElement<typeof TCell>).props,
                key,
                head: true,
              } as Partial<TCellProps>,
            ),
          )}
      </TRow>
    </thead>
  );
};

export interface TBodyProps {
  children:
    | React.ReactElement<typeof TRow>
    | Array<React.ReactElement<typeof TRow>>
    | React.ReactNode;
}

export const TBody = ({ children }: TBodyProps) => {
  let light = true;
  let i = 0;
  const childrenCount = React.Children.count(children);

  checkComponentProps({ children }, { children: TRow });

  return (
    <tbody className={styles.body}>
      {React.Children.map(children as any, (child: React.ReactElement<typeof TRow>) => {
        light = (child.props as any).nested ? light : !light; // TODO find better
        i = i + 1;
        return React.cloneElement(child, {
          alt: light,
          lastParentRow: i === childrenCount - 1,
        } as Partial<TRowProps>);
      })}
    </tbody>
  );
};

export interface TableEntry {
  id?: number | string;
  data?: Array<TableEntry>;
  [key: string]: NonNullable<any>;
}

export type TableData = Array<TableEntry>;

export type DataEntry = keyof Exclude<TableEntry, 'id' | 'data'> & string;

export type HeaderData = Array<DataEntry | { label: React.ReactNode; value: DataEntry }>;

export interface LoadingTableProps {
  columns: HeaderData;
}

const FakeTable = ({ columns }: LoadingTableProps) => {
  return (
    <Fragment>
      <THead>
        {columns.map((column, i) => (
          <TCell key={i}>
            {typeof column === 'string' || typeof column === 'number' ? column : column.label}
          </TCell>
        ))}
      </THead>
      <TBody>
        {Array(5)
          .fill(null)
          .map((...args) => (
            <TRow key={args[1]}>
              {columns.map((column, i) => (
                <TCell
                  key={i}
                  data-th={
                    typeof column === 'string' || typeof column === 'number' ? column : column.label
                  }>
                  <div className={cx(styles.loadingBodyCell, placeholderStyles.shimmer)} />
                </TCell>
              ))}
            </TRow>
          ))}
      </TBody>
    </Fragment>
  );
};

export interface EmptyTableProps {
  columns: HeaderData;
  emptyContent: React.ReactNode;
}

const EmptyTable = ({ columns, emptyContent }: EmptyTableProps) => {
  const { screenSize, ScreenSizes } = useScreenSize();
  if (screenSize <= ScreenSizes.L) {
    return (
      <TBody>
        <TRow>
          <TCell>
            <div className={styles.emptyTableCell}>
              <div className={styles.emptyTableHeader}>
                {columns.map((column, i) => (
                  <Margin key={i} size={{ top: i === 0 ? undefined : Size.DEFAULT }}>
                    <Label ellipsized>
                      {typeof column === 'string' || typeof column === 'number'
                        ? column
                        : column.label}
                    </Label>
                  </Margin>
                ))}
              </div>
              {emptyContent}
            </div>
          </TCell>
        </TRow>
      </TBody>
    );
  }
  return (
    <Fragment>
      <THead>
        {columns.map((column, i) => (
          <TCell key={i}>
            {typeof column === 'string' || typeof column === 'number' ? column : column.label}
          </TCell>
        ))}
      </THead>
      <TBody>
        <TRow>
          <TCell colSpan={100}>
            <div className={styles.emptyTableCell}>{emptyContent}</div>
          </TCell>
        </TRow>
      </TBody>
    </Fragment>
  );
};

function _addAttributesToCells(
  children?: [React.ReactElement<typeof THead>, React.ReactElement<typeof TBody>],
): React.ReactNode {
  if (children == null) return;
  if (children[0]?.type === THead && children[1]?.type === TBody) {
    // TODO fix .props as any
    const headerValues = (children[0].props as any).children.map(
      (child: React.ReactElement<typeof TCell>) => (child.props as any).children,
    );
    const transformedRows: typeof children[1] = React.Children.map(
      (children[1].props as any).children,
      (row) => {
        return React.cloneElement(row, {
          children: React.Children.map(row.props.children, (cell, index) =>
            React.cloneElement(cell, {
              'data-th': headerValues[index],
            }),
          ),
        });
      },
    );
    return (
      <Fragment>
        {children[0]}
        {React.cloneElement(children[1], { children: transformedRows } as Partial<typeof TBody>)}
      </Fragment>
    );
  } else {
    return children;
  }
}

function _generateTable({
  data,
  header,
  renderCell,
  renderChildCell = (x) => x,
  childHeader,
  onClickRow = () => {},
  clickable,
  activeRow,
}: {
  data: Array<TableEntry> | TableEntry;
  header?: HeaderData;
  renderCell?: (data: React.ReactNode, i: number, span: number) => React.ReactNode;
  renderChildCell: (data: React.ReactNode, i: number, span: number) => React.ReactNode;
  childHeader?: Array<DataEntry>;
  onClickRow?: (row: TableEntry) => void;
  clickable?: boolean;
  activeRow?: TableEntry['id'];
}): React.ReactElement<typeof TBody> | Array<React.ReactElement<typeof TRow>> {
  if (Array.isArray(data)) {
    return (
      <TBody key="body">
        {data
          .map((rows) =>
            _generateTable({
              data: rows,
              header,
              renderCell,
              renderChildCell,
              childHeader,
              onClickRow,
              clickable,
              activeRow,
            }),
          )
          .flat()}
      </TBody>
    );
  } else {
    const hasData = data.data != null;
    const row = hasData ? omit(data, 'data') : data;
    const uniqId = Object.values(row).reduce<string>((memo, v) => `${memo}-${v}`, '');
    const renderData = renderCell ?? renderChildCell;
    const parentRow = (
      <TRow
        key={uniqId}
        parent={hasData ? uniqId : undefined}
        onClick={() => onClickRow(row)}
        clickable={clickable}
        highlighted={activeRow != null && row.id != null && activeRow === row.id}>
        {run(() => {
          if (header != null) {
            return header.map((item, i) => {
              const path = typeof item === 'string' || typeof item === 'number' ? item : item.value;
              return (
                <TCell key={`${i}-${get(row, path)}`}>
                  {renderData(get(row, path), i, header.length)}
                </TCell>
              );
            });
          } else {
            return Object.values(row).map((value, i, arr) => (
              <TCell key={`${i}-${value}`}>{renderData(value, i, arr.length)}</TCell>
            ));
          }
        })}
      </TRow>
    );

    if (hasData) {
      return [
        parentRow,
        <TRow
          key={`${uniqId}-1`}
          nested={uniqId}
          onClick={() => onClickRow(row)}
          clickable={clickable}>
          <TCell>
            <Table>
              {
                _generateTable({
                  data: data.data ?? [],
                  header: childHeader,
                  renderCell: undefined,
                  renderChildCell,
                  clickable,
                }) as React.ReactElement<typeof TBody>
              }
            </Table>
          </TCell>
        </TRow>,
      ];
    } else {
      return [parentRow];
    }
  }
}

export interface TableProps {
  /** Will be THead and TBody, optional if using the auto generated table */
  children?:
    | [React.ReactElement<typeof THead>, React.ReactElement<typeof TBody>]
    | React.ReactElement<typeof TBody>
    | React.ReactNode;

  /**
   * If true, the table takes the full width of the container, defaults to true
   * @default false
   */
  fullWidth?: boolean;

  /** If true, the table is given some padding on the left to accomodate for nesting controls. This prop is automatically added when using `data` with multiple levels */
  withNesting?: boolean;

  /** If passed, the table will be generated from this, and children will be ignored */
  data?: TableData;

  /**
   * Returns the child given to each row cell. Params (value, index, columns)
   * @deprecated Use the data object directly instead
   */
  renderCell?: (data: React.ReactNode, i: number, span: number) => React.ReactNode;

  /**
   * Same as renderCell but applies to the children cells (nested)
   * @deprecated Use the data object directly instead
   */
  renderChildCell?: (data: React.ReactNode, i: number, span: number) => React.ReactNode;

  /** Array of strings to generate the header of the table (each string is a label). data prop keys will be filtered by these */
  header?: HeaderData;

  /** Array of strings to generate the order of the children of the table (each string is a key). data prop keys will be filtered by these */
  childHeader?: Array<DataEntry>;

  /** Pass the keys of the attributes in the table which can be sorted. To be used with `data`. */
  sortableBy?: Array<DataEntry>;

  /** Sets the currently sorted column. Object with 1 key corresponding to the current header, and a value of "asc" or "desc" for the sorting */
  activeHeader?: {
    key: DataEntry;
    direction: 'asc' | 'desc';
  };

  /** Called when a sortable column header is clicked, returns the key of the clicked header */
  onClickHeader?: (key: DataEntry) => void;

  /** Highlights the rows when hovered. Does not work on tables with nested data */
  highlighted?: boolean;

  /**
   * Displays a cursor when hovering a row if `onClickRow` is a function
   * @default false
   */
  clickable?: boolean;

  /** If true the content of the table will be overridden by a "fake" table with animated cells to show loading. You MUST pass header to render this */
  isLoading?: boolean;

  /** Triggered when a row is clicked, returns the given data object for that row. If used with nested tables, it will only return the root row object value */
  onClickRow?: (row: TableEntry) => void;

  /** Will set the row with the same `id` property to "highlighted", useful when working with data generated tables */
  activeRow?: TableEntry['id'];

  /** If present, all the content of the table is replaced with this, used to show info when there is no data in the table */
  emptyContent?: React.ReactNode;

  /** If true, the table will stick to the parent width, but won't squish the content, rather will be scrollable horizontally */
  scrollable?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const Table = ({
  children,
  fullWidth = true,
  withNesting,
  data,
  renderCell = (x) => x,
  renderChildCell = (x) => x,
  header = [],
  childHeader,
  sortableBy,
  activeHeader,
  onClickHeader,
  highlighted,
  isLoading,
  onClickRow,
  clickable = false,
  activeRow,
  emptyContent,
  scrollable,
  style,
}: TableProps) => {
  const [rowsStates, setRowState] = useState<Record<string | number, boolean>>({});
  const { screenSize, ScreenSizes } = useScreenSize();
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [xScrollAmount, setXScrollAmount] = useState<number>();

  checkComponentProps({ children }, { children: [TBody, THead] });

  const handleScrollTable = () => {
    if (scrollableRef.current != null && tableRef.current != null) {
      const { scrollLeft, clientWidth } = scrollableRef.current;
      const amount = scrollLeft / (tableRef.current.clientWidth - clientWidth);
      setXScrollAmount(amount);
    }
  };

  useEffect(() => {
    if (scrollableRef.current != null) {
      scrollableRef.current.addEventListener('scroll', handleScrollTable, false);
    }
    return () => {
      scrollableRef.current?.removeEventListener('scroll', handleScrollTable, false);
    };
  }, [scrollableRef.current == null]);

  const handleSetRowState = (state: Record<string | number, boolean>) =>
    setRowState({ ...rowsStates, ...state });

  const hasNestedData = data != null ? data.some((d) => d.data) : false;

  const tableContents =
    data != null && !isLoading && !emptyContent
      ? [
          <THead key="head">
            {header.map((hItem) => {
              const v =
                typeof hItem === 'string' || typeof hItem === 'number' ? hItem : hItem.value;
              return (
                <TCell key={v}>
                  {run(() => {
                    if (sortableBy?.includes(v) && screenSize > ScreenSizes.L) {
                      return (
                        <span
                          className={styles.headerWithArrows}
                          onClick={() => (onClickHeader != null ? onClickHeader(v) : null)}>
                          <span
                            className={cx(styles.sortableIcons, {
                              [styles.up]:
                                activeHeader?.key === v && activeHeader?.direction === 'asc',
                              [styles.down]:
                                activeHeader?.key === v && activeHeader?.direction === 'desc',
                            })}>
                            <Icon name="chevron-up" />
                            <Icon name="chevron-down" />
                          </span>
                          {typeof hItem === 'string' || typeof hItem === 'number'
                            ? hItem
                            : hItem.label}
                        </span>
                      );
                    } else {
                      return typeof hItem === 'string' || typeof hItem === 'number'
                        ? hItem
                        : hItem.label;
                    }
                  })}
                </TCell>
              );
            })}
          </THead>,
          _generateTable({
            data,
            header,
            renderCell,
            renderChildCell,
            childHeader,
            onClickRow,
            clickable,
            activeRow,
          }),
        ]
      : children;

  const transformedChildren =
    screenSize <= ScreenSizes.L ? _addAttributesToCells(tableContents as any) : tableContents;

  if (data && (!header || header.length === 0)) {
    console.warn('`data` was passed as prop but no/empty header, cannot render');
  }

  const table = (
    <table
      style={style}
      className={cx(styles.root, {
        [styles.fullWidth]: fullWidth,
        [styles.leftPadded]:
          (hasNestedData ||
            withNesting ||
            (sortableBy != null &&
              sortableBy.includes(typeof header[0] === 'string' ? header[0] : header[0].value))) &&
          screenSize > ScreenSizes.L,
        [styles.highlighted]: highlighted === true && !(hasNestedData || withNesting === true),
      })}>
      <RowsContext.Provider value={[rowsStates, handleSetRowState]}>
        {run(() => {
          if (header && isLoading) {
            return <FakeTable columns={header} />;
          } else if (header && emptyContent) {
            return <EmptyTable columns={header} emptyContent={emptyContent} />;
          } else {
            return transformedChildren;
          }
        })}
      </RowsContext.Provider>
    </table>
  );

  if (scrollable) {
    return (
      <div style={{ position: 'relative' }}>
        <div
          ref={scrollableRef}
          className={cx(styles.scrollable, {
            [styles.rightShadow]: xScrollAmount != null && xScrollAmount < 1,
            [styles.leftShadow]: xScrollAmount != null && xScrollAmount > 0,
          })}>
          <table
            ref={tableRef}
            style={style}
            className={cx(styles.root, {
              [styles.fullWidth]: fullWidth,
              [styles.leftPadded]:
                (hasNestedData ||
                  withNesting ||
                  (sortableBy != null &&
                    sortableBy.includes(
                      typeof header[0] === 'string' ? header[0] : header[0].value,
                    ))) &&
                screenSize > ScreenSizes.L,
              [styles.highlighted]:
                highlighted === true && !(hasNestedData || withNesting === true),
            })}>
            <RowsContext.Provider value={[rowsStates, handleSetRowState]}>
              {run(() => {
                if (header && isLoading) {
                  return <FakeTable columns={header} />;
                } else if (header && emptyContent) {
                  return <EmptyTable columns={header} emptyContent={emptyContent} />;
                } else {
                  return transformedChildren;
                }
              })}
            </RowsContext.Provider>
          </table>
        </div>
      </div>
    );
  }

  return table;
};
