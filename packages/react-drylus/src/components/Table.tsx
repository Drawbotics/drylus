import sv, { fade } from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import { motion } from 'framer-motion';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import toString from 'lodash/toString';
import React, {
  Fragment,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

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
      background: inherit;
    }

    & > td:first-of-type {
      background: inherit;
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
  activeHeader: css`
    span {
      color: ${sv.colorPrimary} !important;
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
      font-weight: bold;
    }
  `,
  up: css`
    > i:first-of-type {
      color: ${sv.colorPrimary};
      font-weight: bold;
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
  `,
  sticky: css`
    thead > tr > th:first-of-type,
    tbody > tr > td:first-of-type {
      position: sticky;
      left: 0;
      z-index: 999;
    }

    thead > tr > th:last-of-type,
    tbody > tr > td:last-of-type {
      position: sticky;
      right: 0;
      z-index: 999;
    }
  `,
  rightDivisor: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 100%;
    transform: translateX(-100%);
    box-shadow: inset -20px 0 10px -15px ${fade(sv.neutralDark, 20)};
    pointer-events: none;
    opacity: 1;
    transition: ${sv.defaultTransition};
    border-right: 1px solid ${sv.neutral};
  `,
  leftDivisor: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    transform: translateX(100%);
    box-shadow: inset 20px 0 10px -15px ${fade(sv.neutralDark, 20)};
    pointer-events: none;
    opacity: 1;
    transition: ${sv.defaultTransition};
    border-left: 1px solid ${sv.neutral};
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
  style?: Style;

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
  style,
  ...props
}: TCellProps) => {
  const { screenSize, ScreenSizes } = useScreenSize();

  const className = cx(styles.cell, {
    [styles.asContainer]: asContainer === true,
  });
  if (head) {
    return (
      <th className={className} style={style}>
        <Label>{children}</Label>
      </th>
    );
  }
  return (
    <td className={className} colSpan={asContainer ? 100 : undefined} style={style} {...props}>
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

const tableRowVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
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

  /** @private */
  animated?: boolean;
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
  animated,
}: TRowProps) => {
  console.log('rendering row');
  const [rowsStates, handleSetRowState] = useContext(RowsContext);
  const collapsed = nested && !rowsStates[nested];
  const animationProps =
    animated && !collapsed
      ? {
          variants: tableRowVariants,
          transition: {
            type: 'spring',
            damping: 20,
            stiffness: 300,
          },
        }
      : {};

  checkComponentProps({ children }, { children: TCell });

  return (
    <motion.tr
      {...animationProps}
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
    </motion.tr>
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

const tableBodyVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export interface TBodyProps {
  children:
    | React.ReactElement<typeof TRow>
    | Array<React.ReactElement<typeof TRow>>
    | React.ReactNode;

  /** If set, the rows will be animated when mounted. To be used only if the table is manually created i.e. without the `data` prop */
  animated?: boolean;
}

export const TBody = ({ children, animated }: TBodyProps) => {
  let light = true;
  let i = 0;
  const childrenCount = React.Children.count(children);
  const animationProps = animated
    ? {
        variants: tableBodyVariants,
        animate: 'visible',
        initial: 'hidden',
      }
    : {};

  checkComponentProps({ children }, { children: TRow });

  return (
    <motion.tbody {...animationProps} className={styles.body}>
      {React.Children.map(children as any, (child: React.ReactElement<typeof TRow>) => {
        light = (child.props as any).nested ? light : !light; // TODO find better
        i = i + 1;
        return React.cloneElement(child, {
          animated,
          alt: light,
          lastParentRow: i === childrenCount - 1,
        } as Partial<TRowProps>);
      })}
    </motion.tbody>
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
  rows: number;
  animated?: boolean;
}

const LoadingTable = ({ columns, animated, rows }: LoadingTableProps) => {
  return (
    <Fragment>
      <THead>
        {columns.map((column, i) => (
          <TCell key={i}>
            {typeof column === 'string' || typeof column === 'number' ? column : column.label}
          </TCell>
        ))}
      </THead>
      <TBody animated={animated}>
        {Array(rows)
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
          <TCell style={{ background: sv.white }}>
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
          <TCell colSpan={100} style={{ background: sv.white }}>
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

interface MemoizedTRowProps extends Omit<TRowProps, 'children'> {
  header?: HeaderData;
  memoData?: TableData;
  rowData: Omit<TableEntry, 'data'>;
  renderData: (data: ReactNode, row: number, column: number) => ReactNode;
}

const MemoizedTRow = React.memo(
  ({ header, rowData, renderData, ...rest }: MemoizedTRowProps) => {
    return (
      <TRow {...rest}>
        {run(() => {
          if (header != null) {
            return header.map((item: any, i: number) => {
              const path = typeof item === 'string' || typeof item === 'number' ? item : item.value;
              return (
                <TCell key={`${i}-${get(rowData, path)}`}>
                  {renderData(get(rowData, path), i, header.length)}
                </TCell>
              );
            });
          } else {
            return Object.values(rowData).map((value, i, arr) => (
              <TCell key={`${i}-${value}`}>{renderData(value, i, arr.length)}</TCell>
            ));
          }
        })}
      </TRow>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps.memoData, nextProps.memoData),
);

MemoizedTRow.displayName = 'TRow';

function _generateTable({
  data,
  memoDataValues,
  header,
  renderCell,
  renderChildCell = (x) => x,
  childHeader,
  onClickRow = () => {},
  clickable,
  activeRow,
  animated,
}: {
  data: Array<TableEntry> | TableEntry;
  memoDataValues?: Array<TableEntry> | TableEntry;
  header?: HeaderData;
  renderCell?: (data: React.ReactNode, i: number, span: number) => React.ReactNode;
  renderChildCell: (data: React.ReactNode, i: number, span: number) => React.ReactNode;
  childHeader?: Array<DataEntry>;
  onClickRow?: (row: TableEntry) => void;
  clickable?: boolean;
  activeRow?: TableEntry['id'];
  animated?: boolean;
}): React.ReactElement<typeof TBody> | Array<React.ReactElement<typeof TRow>> {
  if (Array.isArray(data)) {
    return (
      <TBody key="body" animated={animated}>
        {data
          .map((rows, i) =>
            _generateTable({
              data: rows,
              memoDataValues:
                memoDataValues != null && Array.isArray(memoDataValues)
                  ? memoDataValues[i]
                  : undefined,
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
    const rowData = hasData ? omit(data, 'data') : data;
    const uniqId = Object.values(rowData).reduce<string>((memo, v) => `${memo}-${toString(v)}`, '');
    const renderData = renderCell ?? renderChildCell;
    const parentRow = (
      <MemoizedTRow
        header={header}
        renderData={renderData}
        rowData={rowData}
        animated={animated}
        key={uniqId}
        parent={hasData ? uniqId : undefined}
        onClick={() => onClickRow(rowData)}
        clickable={clickable}
        highlighted={activeRow != null && rowData.id != null && activeRow === rowData.id}
      />
    );

    if (hasData) {
      return [
        parentRow,
        <TRow
          key={`${uniqId}-1`}
          nested={uniqId}
          onClick={() => onClickRow(rowData)}
          clickable={clickable}>
          <TCell>
            <Table>
              {
                _generateTable({
                  data: data.data ?? [],
                  memoDataValues:
                    memoDataValues != null && !Array.isArray(memoDataValues)
                      ? memoDataValues?.data
                      : [],
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
      console.log('no data');
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

  /** When given, each table row will be shallowly compared to prevent unnecessary renders. Should have the same structure as the data prop to enable 1-to-1 equivalence */
  memoDataValues?: TableData;

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

  /**
   * Used to determine the amount of rows the table should have when showing the loading state
   * @default 5
   */
  loadingRows?: number;

  /** Triggered when a row is clicked, returns the given data object for that row. If used with nested tables, it will only return the root row object value */
  onClickRow?: (row: TableEntry) => void;

  /** Will set the row with the same `id` property to "highlighted", useful when working with data generated tables */
  activeRow?: TableEntry['id'];

  /** If present, all the content of the table is replaced with this, used to show info when there is no data in the table */
  emptyContent?: React.ReactNode;

  /** If true, the table will stick to the parent width, but won't squish the content, rather will be scrollable horizontally. With automatic tables, the first and last column are made sticky. */
  scrollable?: boolean;

  /** If true, rows (excluding nested ones) will be animated when entering, only works in automatically generated tables. For manual tables, set `animated` in TBody */
  animated?: boolean;

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
  animated,
  style,
  loadingRows = 5,
  memoDataValues,
}: TableProps) => {
  const [rowsStates, setRowState] = useState<Record<string | number, boolean>>({});
  const { screenSize, ScreenSizes } = useScreenSize();
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [xScrollAmount, setXScrollAmount] = useState<number>();
  const [divisorHeight, setDivisorHeight] = useState<number>();

  checkComponentProps({ children }, { children: [TBody, THead] });

  const handleScrollTable = () => {
    if (scrollableRef.current != null && tableRef.current != null) {
      const { scrollLeft, clientWidth } = scrollableRef.current;
      const difference = tableRef.current.clientWidth - clientWidth;
      if (difference > 0) {
        const amount = scrollLeft / difference;
        setXScrollAmount(amount);
      }
    }
  };

  const handleResize = () => {
    const height = tableRef.current?.clientHeight;
    setDivisorHeight(height);

    if (scrollableRef.current != null && tableRef.current != null) {
      const { clientWidth } = scrollableRef.current;
      const difference = tableRef.current.clientWidth - clientWidth;
      if (difference === 0) {
        setXScrollAmount(undefined);
      } else {
        handleScrollTable();
      }
    }
  };

  useEffect(() => {
    if (scrollableRef.current != null) {
      scrollableRef.current.addEventListener('scroll', handleScrollTable, false);
      window.addEventListener('resize', handleResize, false);
      setTimeout(handleScrollTable, 50); // trigger calculation once
      setTimeout(handleResize, 50);
    }

    return () => {
      scrollableRef.current?.removeEventListener('scroll', handleScrollTable, false);
      window.removeEventListener('resize', handleResize, false);
    };
  }, [scrollableRef, tableRef]);

  useEffect(() => {
    handleScrollTable();
    handleResize();
  }, [data?.length, isLoading]);

  const handleSetRowState = (state: Record<string | number, boolean>) =>
    setRowState({ ...rowsStates, ...state });

  const hasNestedData = data != null ? data.some((d) => d.data) : false;

  const tableContents =
    data != null && !isLoading && !emptyContent
      ? [
          <THead key="head">
            {header.map((hItem, i) => {
              const value =
                typeof hItem === 'string' || typeof hItem === 'number' ? hItem : hItem.value;
              const label =
                typeof hItem === 'string' || typeof hItem === 'number' ? hItem : hItem.label;
              const cellContent =
                sortableBy?.includes(value) && screenSize > ScreenSizes.L ? (
                  <div
                    className={cx(styles.headerWithArrows, {
                      [styles.activeHeader]: activeHeader?.key === value,
                    })}
                    onClick={() => (onClickHeader != null ? onClickHeader(value) : null)}>
                    <div
                      className={cx(styles.sortableIcons, {
                        [styles.up]:
                          activeHeader?.key === value && activeHeader?.direction === 'asc',
                        [styles.down]:
                          activeHeader?.key === value && activeHeader?.direction === 'desc',
                      })}>
                      <Icon name="chevron-up" />
                      <Icon name="chevron-down" />
                    </div>
                    <span>{label}</span>
                  </div>
                ) : (
                  label
                );
              const noZIndex =
                xScrollAmount == null ||
                (i === 0 && xScrollAmount === 0) ||
                (i === header.length - 1 && xScrollAmount === 1);
              return (
                <TCell key={value} style={{ zIndex: noZIndex ? 'auto' : undefined }}>
                  {cellContent}
                  {i === 0 && scrollable ? (
                    <div
                      className={styles.leftDivisor}
                      style={{
                        height: divisorHeight,
                        opacity: xScrollAmount != null && xScrollAmount > 0 ? 1 : 0,
                      }}
                    />
                  ) : null}
                  {i === header.length - 1 && scrollable ? (
                    <div
                      className={styles.rightDivisor}
                      style={{
                        height: divisorHeight,
                        opacity: xScrollAmount != null && xScrollAmount < 1 ? 1 : 0,
                      }}
                    />
                  ) : null}
                </TCell>
              );
            })}
          </THead>,
          _generateTable({
            data,
            memoDataValues,
            header,
            renderCell,
            renderChildCell,
            childHeader,
            onClickRow,
            clickable,
            activeRow,
            animated,
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
      ref={tableRef}
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
            return <LoadingTable animated={animated} columns={header} rows={loadingRows} />;
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
            [styles.sticky]: header.length != 0 && xScrollAmount != null,
          })}>
          {table}
        </div>
      </div>
    );
  }

  return table;
};
