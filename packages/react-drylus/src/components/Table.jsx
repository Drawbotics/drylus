import React, { useState, useContext, createContext, Fragment } from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import Label from './Label';
import Icon from './Icon';


const RowsContext = createContext([{}, () => {}]);


const styles = {
  base: css`
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

    [data-nested] ~ tr:not([data-row]):nth-of-type(even) {
      background: ${sv.neutralLighter};
    }

    [data-nested] ~ tr:not([data-row]):nth-of-type(odd) {
      background: ${sv.white};
    }

    [data-nested] ~ [data-nested] ~ tr:not([data-row]):nth-of-type(even) {
      background: ${sv.white};
    }

    [data-nested] ~ [data-nested] ~ tr:not([data-row]):nth-of-type(odd) {
      background: ${sv.neutralLighter};
    }

    [data-nested] tr {
      background: none !important;
    }
  `,
  fullWidth: css`
    width: 100%;
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
    padding-right: ${sv.defaultPadding};
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
    &:nth-of-type(even) {
      background: ${sv.white};

      & + [data-nested] {
        background: ${sv.white};
      }
    }

    &:nth-of-type(odd) {
      background: ${sv.neutralLighter};

      & + [data-nested] {
        background: ${sv.neutralLighter};
      }
    }

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


export const TRow = ({ children, nested, parent }) => {
  const [ rowsStates, handleSetRowState ] = useContext(RowsContext);
  const collapsed = nested && ! rowsStates[nested];
  return (
    <tr className={cx(styles.row, {
        [styles.collapsed]: collapsed,
      })}
      data-nested={nested || undefined}
      data-parent={parent || undefined}>
      {React.Children.map(children, (child, key) => React.cloneElement(child, {
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
        {React.Children.map(children, (child, key) => React.cloneElement(child, {
          ...child.props,
          key,
          head: true,
        }))}
      </TRow>
    </thead>
  );
};


export const TBody = ({ children }) => {
  return (
    <tbody className={styles.body}>
      {children}
    </tbody>
  );
};


function generateTable(data, i=0) {
  if (Array.isArray(data)) {
    return (
      <TBody>
        {data.map(generateTable)}
      </TBody>
    );
  }
  else {
    const hasData = !! data.data;
    const row = hasData ? omit(data, 'data') : data;
    const uniqId = Object.values(row).reduce((memo, v) => `${memo}-${v}`, `${i}`);
    return (
      <Fragment key={uniqId}>
        <TRow parent={hasData ? uniqId : undefined}>
          {Object.values(row).map((value, i) => (
            <TCell key={`${i}-${value}`}>{value}</TCell>
          ))}
        </TRow>
        {do{
          if (hasData) {
            <TRow nested={uniqId}>
              <TCell>
                <Table>
                  {generateTable(data.data)}
                </Table>
              </TCell>
            </TRow>
          }
        }}
      </Fragment>
    );
  }
}


const Table = ({
  children,
  fullWidth,
  withNesting,
  data,
  renderHeader,
  renderRow,
  header,
}) => {
  const [rowsStates, setRowState] = useState({});
  const handleSetRowState = (state) => setRowState({ ...rowsStates, ...state });
  const hasNestedData = data && data.some((d) => d.data);
  return (
    <table className={cx(styles.base, {
      [styles.fullWidth]: fullWidth,
      [styles.leftPadded]: hasNestedData || withNesting,
    })}>
      <RowsContext.Provider value={[ rowsStates, handleSetRowState ]}>
        {do{
          if (data) {
            generateTable(data)
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

  /** Returns the raw children given to the header cells, the value can be wrapped for customization. The values are derived from the `header` prop */
  renderHeader: PropTypes.func,

  /** Returns the children given to each row (i.e. an array of values). To enable customization you will have to map the TCell(s) in the TRow */
  renderRow: PropTypes.func,

  /** Array of strings to generate the header of the table (each string is a label). data prop keys will be filtered by these */
  header: PropTypes.arrayOf(PropTypes.string),
};


Table.defaultProps = {
  fullWidth: true,
};


export default Table;
