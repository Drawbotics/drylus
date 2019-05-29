import React, { useState, useContext, createContext } from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import Label from './Label';
import Icon from './Icon';


const RowsContext = createContext([{}, () => {}]);


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
  `,
  fullWidth: css`
    width: 100%;
  `,
  highlighted: css`
    tr {
      &:hover {
        background: ${sv.neutralLight};
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
    padding: calc(${sv.defaultPadding} - 4px) ${sv.defaultPadding};
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
        border-bottom: 1px solid ${sv.neutral};

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
    background: ${sv.neutralLightest};

    [data-nested] {
      background: ${sv.neutralLightest} !important;

      > tr {
        background: ${sv.neutralLightest} !important;
      }
    }
  `,
  noBorderBottom: css`
    border-bottom: none !important;
  `,
  highlightedRow: css`
    background: ${sv.neutral} !important;
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
};


export const TCell = ({
  children,
  head,
  asContainer,
  withChildToggle,
  onClickArrow,
  active,
}) => {
  const className = cx(styles.cell, {
    [styles.asContainer]: asContainer,
  });
  if (head) {
    return (
      <th className={className}>
        <Label>
          {children}
        </Label>
      </th>
    );
  }
  return (
    <td className={className} colSpan={asContainer ? '100' : null}>
      {do{
        if (withChildToggle) {
          <div className={styles.withToggle}>
            <Icon onClick={onClickArrow} name={active ? 'chevron-up' : 'chevron-down'} />
            {children}
          </div>
        }
        else {
          children
        }
      }}
    </td>
  );
};


export const TRow = ({ children, nested, parent, highlighted, alt, lastParentRow }) => {
  const [ rowsStates, handleSetRowState ] = useContext(RowsContext);
  const collapsed = nested && ! rowsStates[nested];
  return (
    <tr className={cx(styles.row, {
        [styles.collapsed]: collapsed,
        [styles.light]: ! alt,
        [styles.white]: alt,
        [styles.highlightedRow]: highlighted,
        [styles.noBorderBottom]: !! parent && ! rowsStates[parent] && lastParentRow,
      })}
      data-nested={nested || undefined}
      data-parent={parent || undefined}>
      {React.Children.toArray(children).filter((c) => Boolean(c)).map((child, key) => React.cloneElement(child, {
        ...child.props,
        key,
        asContainer: !! nested,
        withChildToggle: !! parent && key === 0,
        active: !! parent && rowsStates[parent],
        onClickArrow: parent ? () => handleSetRowState({ [parent]: ! rowsStates[parent] }) : null,
      }))}
    </tr>
  );
};


export const THead = ({ children }) => {
  return (
    <thead className={styles.header}>
      <TRow>
        {React.Children.toArray(children).filter((c) => Boolean(c)).map((child, key) => React.cloneElement(child, {
          ...child.props,
          key,
          head: true,
        }))}
      </TRow>
    </thead>
  );
};


export const TBody = ({ children }) => {
  let light = true;
  let i = 0;
  const childrenCount = React.Children.count(children);
  return (
    <tbody className={styles.body}>
      {React.Children.map(children, (child) => {
        light = child.props.nested ? light : ! light;
        i = i + 1;
        return React.cloneElement(child, { alt: light, lastParentRow: i === childrenCount - 1 });
      })}
    </tbody>
  );
};


function generateTable(data, header, renderCell, renderChildCell, i=0) {
  if (Array.isArray(data)) {
    return (
      <TBody>
        {data.map((rows, i) => generateTable(rows, header, renderCell, renderChildCell, i))}
      </TBody>
    );
  }
  else {
    const hasData = !! data.data;
    const row = hasData ? omit(data, 'data') : data;
    const uniqId = Object.values(row).reduce((memo, v) => `${memo}-${v}`, '');
    const renderData = renderCell || renderChildCell;
    const parentRow = (
      <TRow key={uniqId} parent={hasData ? uniqId : undefined}>
        {do{
          if (header) {
            header.map((key, i) => (
              <TCell key={`${i}-${row[key]}`}>{renderData(row[key], i, header.length)}</TCell>
            ))
          }
          else {
            Object.values(row).map((value, i, arr) => (
              <TCell key={`${i}-${value}`}>{renderData(value, i, arr.length)}</TCell>
            ))
          }
        }}
      </TRow>
    );

    if (hasData) {
      return [parentRow, (
        <TRow key={`${uniqId}-1`} nested={uniqId}>
          <TCell>
            <Table>
              {generateTable(data.data, undefined, null, renderChildCell)}
            </Table>
          </TCell>
        </TRow>
      )];
    }
    else {
      return parentRow;
    }
  }
}


const Table = ({
  children,
  fullWidth,
  withNesting,
  data,
  renderCell=x=>x,
  renderChildCell=x=>x,
  header,
  sortableBy,
  activeHeader,
  onClickHeader,
  highlighted,
}) => {
  const [rowsStates, setRowState] = useState({});
  const handleSetRowState = (state) => setRowState({ ...rowsStates, ...state });
  const hasNestedData = data && data.some((d) => d.data);
  if (data && (! header || header.length === 0)) {
    console.warn('`data` was passed as prop but no/empty header, cannot render');
  }
  return (
    <table className={cx(styles.root, {
      [styles.fullWidth]: fullWidth,
      [styles.leftPadded]: hasNestedData || withNesting || sortableBy,
      [styles.highlighted]: highlighted && ! (hasNestedData || withNesting),
    })}>
      <RowsContext.Provider value={[ rowsStates, handleSetRowState ]}>
        {do{
          if (data) {
            <>
              <THead>
                {header.map((v) => (
                  <TCell key={v}>
                    {do{
                      if (sortableBy?.includes(v)) {
                        <span className={styles.headerWithArrows} onClick={() => onClickHeader(v)}>
                          <span className={cx(styles.sortableIcons, {
                            [styles.up]: activeHeader?.key === v && activeHeader?.direction === 'asc',
                            [styles.down]: activeHeader?.key === v && activeHeader?.direction === 'desc',
                          })}>
                            <Icon name="chevron-up" />
                            <Icon name="chevron-down" />
                          </span>
                          {v}
                        </span>
                      }
                      else {
                        v
                      }
                    }}
                  </TCell>
                ))}
              </THead>
              {generateTable(data, header, renderCell, renderChildCell)}
            </>
          }
          else {
            children
          }
        }}
      </RowsContext.Provider>
    </table>
  );
};


Table.propTypes = {
  /** Will be THead and TBody */
  children: PropTypes.node,

  /** If true, the table takes the full width of the container, defaults to true */
  fullWidth: PropTypes.bool,

  /** If true, the table is given some padding on the left to accomodate for nesting controls. This prop is automatically added when using `data` with multiple levels */
  withNesting: PropTypes.bool,

  /** If passed, the table will be generated from this, and children will be ignored */
  data: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  })),

  /** Returns the child given to each row cell. Params (value, index, columns) */
  renderCell: PropTypes.func,

  /** Same as renderCell but applies to the children cells (nested) */
  renderChildCell: PropTypes.func,

  /** Array of strings to generate the header of the table (each string is a label). data prop keys will be filtered by these */
  header: PropTypes.arrayOf(PropTypes.string),

  /** Pass the keys of the attributes in the table which can be sorted. To be used with `data`. */
  sortableBy: PropTypes.arrayOf(PropTypes.string),

  /** Sets the currently sorted column. Object with 1 key corresponding to the current header, and a value of "asc" or "desc" for the sorting */
  activeHeader: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),

  /** Called when a sortable column header is clicked, returns the key of the clicked header */
  onClickHeader: PropTypes.func,

  /** Highlights the rows when hovered. Does not work on tables with nested data */
  highlighted: PropTypes.bool,
};


Table.defaultProps = {
  fullWidth: true,
};


export default Table;
